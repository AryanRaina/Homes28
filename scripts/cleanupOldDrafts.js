import { db } from '@/lib/firebaseAdmin';

const COLLECTION = 'listings';

export async function cleanupOldDrafts() {
  const now = new Date();
  const cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

  const snapshot = await db.collection(COLLECTION)
    .where('isCompleted', '==', false)
    .where('createdAt', '<', cutoff)
    .get();

  const batch = db.batch();

  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log(`Deleted ${snapshot.size} stale incomplete listings.`);
}
