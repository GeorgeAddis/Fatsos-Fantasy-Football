// pages/api/rankings/[type].ts
import { getAllPositionsRankings } from '../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { type } = req.query;
        const limit = parseInt(req.query.limit as string) || 200; // Default to 200 if no limit provided

        try {
            const rankings = await getAllPositionsRankings(type as string, limit);
            return res.status(200).json(rankings);
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
