import { addListing } from '@/lib/listingService';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const id = await addListing();
    res.status(200).json({ id });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}