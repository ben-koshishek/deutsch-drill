import Dexie, { type Table } from 'dexie';
import type { DrillDirection } from './types';

interface Progress {
  id?: number;
  deckId: string;
  wordId: string;
  direction: DrillDirection;
  streak: number;
}

interface CircleCount {
  id?: number;
  deckId: string;
  circles: number;
}

class DrillDatabase extends Dexie {
  progress!: Table<Progress>;
  circles!: Table<CircleCount>;

  constructor() {
    super('deutschdrill');
    this.version(1).stores({
      progress: '++id, [deckId+wordId+direction]'
    });
    this.version(2).stores({
      progress: '++id, [deckId+wordId+direction]',
      circles: '++id, deckId'
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

// Circle tracking functions
export async function getCircleCount(deckId: string): Promise<number> {
  const record = await db.circles.where({ deckId }).first();
  return record?.circles ?? 0;
}

export async function incrementCircle(deckId: string): Promise<number> {
  const existing = await db.circles.where({ deckId }).first();
  const newCount = (existing?.circles ?? 0) + 1;

  if (existing) {
    await db.circles.update(existing.id!, { circles: newCount });
  } else {
    await db.circles.add({ deckId, circles: newCount });
  }

  return newCount;
}

export async function resetCircles(deckId: string): Promise<void> {
  await db.circles.where({ deckId }).delete();
}

// Full reset: progress + circles
export async function resetDeckFull(deckId: string): Promise<void> {
  await Promise.all([
    db.progress.where({ deckId }).delete(),
    db.circles.where({ deckId }).delete()
  ]);
}
