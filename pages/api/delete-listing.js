import { deleteListing, getListingById } from '@/services/listingService';
import { auth } from '@/lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing listing ID' });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const userEmail = decodedToken.email;

    const listing = await getListingById(id);

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.createdBy !== userEmail) {
      return res.status(403).json({ message: 'You are not authorized to delete this listing' });
    }

    await deleteListing(id);

    return res.status(200).json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
