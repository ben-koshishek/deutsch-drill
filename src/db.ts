import Dexie, { type Table } from 'dexie';
import type { DrillDirection } from './types';

interface Progress {
  id?: number;
  deckId: string;
  wordId: string;
  direction: DrillDirection;
  streak: number;
}

interface BestTime {
  id?: number;
  deckId: string;
  timeMs: number;
}

class DrillDatabase extends Dexie {
  progress!: Table<Progress>;
  bestTimes!: Table<BestTime>;

  constructor() {
    super('deutschdrill');
    this.version(1).stores({
      progress: '++id, [deckId+wordId+direction]'
    });
    this.version(2).stores({
      progress: '++id, [deckId+wordId+direction]',
      circles: '++id, deckId'
    });
    // Version 3: migrate from circles to bestTimes
    this.version(3).stores({
      progress: '++id, [deckId+wordId+direction]',
      bestTimes: '++id, deckId',
      circles: null // Delete the circles table
    });
  }
}

export const db = new DrillDatabase();

export async function getProgress(
  deckId: string,
  wordId: string,
  direction: DrillDirection
): Promise<number> {
  const record = await db.progress
    .where({ deckId, wordId, direction })
    .first();
  return record?.streak ?? 0;
}

export async function setProgress(
  deckId: string,
  wordId: string,
  direction: DrillDirection,
  streak: number
): Promise<void> {
  const existing = await db.progress
    .where({ deckId, wordId, direction })
    .first();

  if (existing) {
    await db.progress.update(existing.id!, { streak });
  } else {
    await db.progress.add({ deckId, wordId, direction, streak });
  }
}

export async function getDeckProgress(
  deckId: string
): Promise<Map<string, number>> {
  const records = await db.progress.where({ deckId }).toArray();
  const map = new Map<string, number>();
  for (const r of records) {
    map.set(`${r.wordId}_${r.direction}`, r.streak);
  }
  return map;
}

export async function resetDeckProgress(deckId: string): Promise<void> {
  await db.progress.where({ deckId }).delete();
}

// Best time tracking functions
export async function getBestTime(deckId: string): Promise<number | null> {
  const record = await db.bestTimes.where({ deckId }).first();
  return record?.timeMs ?? null;
}

export interface UpdateBestTimeResult {
  isNewBest: boolean;
  previousBest: number | null;
  currentTime: number;
}

export async function updateBestTime(
  deckId: string,
  timeMs: number
): Promise<UpdateBestTimeResult> {
  const existing = await db.bestTimes.where({ deckId }).first();
  const previousBest = existing?.timeMs ?? null;
  const isNewBest = previousBest === null || timeMs < previousBest;

  if (isNewBest) {
    if (existing) {
      await db.bestTimes.update(existing.id!, { timeMs });
    } else {
      await db.bestTimes.add({ deckId, timeMs });
    }
  }

  return { isNewBest, previousBest, currentTime: timeMs };
}

export async function resetBestTime(deckId: string): Promise<void> {
  await db.bestTimes.where({ deckId }).delete();
}

// Full reset: progress + best time
export async function resetDeckFull(deckId: string): Promise<void> {
  await Promise.all([
    db.progress.where({ deckId }).delete(),
    db.bestTimes.where({ deckId }).delete()
  ]);
}

// Batch query: Get progress and best times for multiple decks in fewer queries
export interface BatchDeckStats {
  progress: Map<string, Map<string, number>>; // deckId -> (wordId_direction -> streak)
  bestTimes: Map<string, number | null>;       // deckId -> timeMs
}

export async function getBatchDeckStats(deckIds: string[]): Promise<BatchDeckStats> {
  // Fetch all progress and best times in parallel
  const [allProgress, allBestTimes] = await Promise.all([
    db.progress.where('deckId').anyOf(deckIds).toArray(),
    db.bestTimes.where('deckId').anyOf(deckIds).toArray()
  ]);

  // Organize progress by deckId
  const progressMap = new Map<string, Map<string, number>>();
  for (const deckId of deckIds) {
    progressMap.set(deckId, new Map());
  }
  for (const record of allProgress) {
    const deckMap = progressMap.get(record.deckId);
    if (deckMap) {
      deckMap.set(`${record.wordId}_${record.direction}`, record.streak);
    }
  }

  // Organize best times by deckId
  const bestTimesMap = new Map<string, number | null>();
  for (const deckId of deckIds) {
    bestTimesMap.set(deckId, null);
  }
  for (const record of allBestTimes) {
    bestTimesMap.set(record.deckId, record.timeMs);
  }

  return { progress: progressMap, bestTimes: bestTimesMap };
}
