import type { Activity } from '../context/ThemeContext';
import { getDb } from './settings';

type ActivityRow = Omit<Activity, 'solved'> & { solved: number };

export async function loadActivities(): Promise<Activity[]> {
  const db = await getDb();
  // rowid keeps insertion order, matching how the in-memory list behaved
  const rows = await db.getAllAsync<ActivityRow>(
    'SELECT * FROM activities ORDER BY rowid ASC'
  );
  return rows.map((r) => ({ ...r, solved: r.solved === 1 }));
}

export async function insertActivity(a: Activity): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT INTO activities (id, title, details, imageUri, date, solved) VALUES (?, ?, ?, ?, ?, ?)',
    a.id,
    a.title,
    a.details,
    a.imageUri,
    a.date,
    a.solved ? 1 : 0
  );
}

export async function updateActivityRow(a: Activity): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'UPDATE activities SET title = ?, details = ?, imageUri = ?, date = ?, solved = ? WHERE id = ?',
    a.title,
    a.details,
    a.imageUri,
    a.date,
    a.solved ? 1 : 0,
    a.id
  );
}