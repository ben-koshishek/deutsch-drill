import Dexie, { type Table } from 'dexie';
import type { DrillDirection } from './types';

interface Progress {
  id?: number;
  deckId: string;
  wordId: string;
  direction: DrillDirection;
  streak: number;
}

interface LastRun {
  id?: number;
  deckId: string;
  timeMs: number;
  mistakes: number;
}

class DrillDatabase extends Dexie {
  progress!: Table<Progress>;
  lastRuns!: Table<LastRun>;

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
    // Version 4: add mistakes field to bestTimes (no schema change needed, just data)
    this.version(4).stores({
      progress: '++id, [deckId+wordId+direction]',
      bestTimes: '++id, deckId'
    }).upgrade(tx => {
      // Add mistakes: 0 to existing records
      return tx.table('bestTimes').toCollection().modify(record => {
        if (record.mistakes === undefined) {
          record.mistakes = 0;
        }
      });
    });
    // Version 5: rename bestTimes to lastRuns (stores most recent run, not best)
    this.version(5).stores({
      progress: '++id, [deckId+wordId+direction]',
      lastRuns: '++id, deckId',
      bestTimes: null // Delete the old table
    }).upgrade(async tx => {
      // Migrate data from bestTimes to lastRuns
      const oldRecords = await tx.table('bestTimes').toArray();
      for (const record of oldRecords) {
        await tx.table('lastRuns').add({
          deckId: record.deckId,
          timeMs: record.timeMs,
          mistakes: record.mistakes ?? 0
        });
      }
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

// Last run tracking functions
export interface LastRunRecord {
  timeMs: number;
  mistakes: number;
}

export async function getLastRun(deckId: string): Promise<LastRunRecord | null> {
  const record = await db.lastRuns.where({ deckId }).first();
  if (!record) return null;
  return { timeMs: record.timeMs, mistakes: record.mistakes ?? 0 };
}

export interface UpdateLastRunResult {
  isPerfect: boolean;
  previousTime: number | null;
  previousMistakes: number | null;
  currentTime: number;
  currentMistakes: number;
}

export async function updateLastRun(
  deckId: string,
  timeMs: number,
  mistakes: number
): Promise<UpdateLastRunResult> {
  const existing = await db.lastRuns.where({ deckId }).first();
  const previousTime = existing?.timeMs ?? null;
  const previousMistakes = existing?.mistakes ?? null;
  const isPerfect = mistakes === 0;

  // Always save the most recent run
  if (existing) {
    await db.lastRuns.update(existing.id!, { timeMs, mistakes });
  } else {
    await db.lastRuns.add({ deckId, timeMs, mistakes });
  }

  return { isPerfect, previousTime, previousMistakes, currentTime: timeMs, currentMistakes: mistakes };
}

export async function resetLastRun(deckId: string): Promise<void> {
  await db.lastRuns.where({ deckId }).delete();
}

// Full reset: progress + last run
export async function resetDeckFull(deckId: string): Promise<void> {
  await Promise.all([
    db.progress.where({ deckId }).delete(),
    db.lastRuns.where({ deckId }).delete()
  ]);
}

// Batch query: Get progress and last runs for multiple decks in fewer queries
export interface BatchDeckStats {
  progress: Map<string, Map<string, number>>; // deckId -> (wordId_direction -> streak)
  lastRuns: Map<string, LastRunRecord | null>;  // deckId -> { timeMs, mistakes }
}

export async function getBatchDeckStats(deckIds: string[]): Promise<BatchDeckStats> {
  // Fetch all progress and last runs in parallel
  const [allProgress, allLastRuns] = await Promise.all([
    db.progress.where('deckId').anyOf(deckIds).toArray(),
    db.lastRuns.where('deckId').anyOf(deckIds).toArray()
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

  // Organize last runs by deckId
  const lastRunsMap = new Map<string, LastRunRecord | null>();
  for (const deckId of deckIds) {
    lastRunsMap.set(deckId, null);
  }
  for (const record of allLastRuns) {
    lastRunsMap.set(record.deckId, { timeMs: record.timeMs, mistakes: record.mistakes ?? 0 });
  }

  return { progress: progressMap, lastRuns: lastRunsMap };
}
