import { auth } from '@/lib/firebaseAdmin';
import {
  getListingById,
  updateListing,
  deleteListing,
} from '@/lib/listingService';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    headers,
    body,
  } = req;

  const authHeader = headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    const userEmail = decodedToken.email;

    switch (method) {
      case 'GET': {
        const data = await getListingById(id);
        if (!data) return res.status(404).json({ error: 'Listing not found' });
        return res.status(200).json({ id, ...data });
      }

      case 'PUT': {
        if (!body || typeof body !== 'object') {
          return res.status(400).json({ error: 'Invalid request body' });
        }

        await updateListing(id, {
          ...body,
          updatedAt: new Date().toISOString(),
          updatedBy: userEmail,
        });

        return res.status(200).json({ message: 'Listing updated successfully', id });
      }

      case 'DELETE': {
        await deleteListing(id);
        return res.status(200).json({ message: 'Listing deleted successfully', id });
      }

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    console.error('Error in [id].js:', err);
    return res.status(401).json({ error: 'Unauthorized or invalid token' });
  }
}
