import { db } from '@/lib/firebaseAdmin';
import { v4 as uuidv4 } from 'uuid';

const COLLECTION = 'listings';

export async function addListing(listingData = {}) {
  const id = uuidv4();
  await db.collection(COLLECTION).doc(id).set({
    ...listingData,
    createdAt: new Date(),
    isCompleted: false
  });
  return id;
}

export async function getAllListings() {
  const snapshot = await db.collection(COLLECTION).get();
  const listings = {};
  snapshot.forEach(doc => {
    listings[doc.id] = doc.data();
  });
  return listings;
}

export async function getListingById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  return doc.exists ? doc.data() : null;
}

export async function updateListing(id, updates) {
  await db.collection(COLLECTION).doc(id).update({
    ...updates,
    isCompleted: true
  });
}

export async function deleteListing(id) {
  await db.collection(COLLECTION).doc(id).delete();
}
