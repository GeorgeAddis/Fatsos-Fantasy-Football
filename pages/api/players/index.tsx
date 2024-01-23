// pages/api/players/index.ts
import { getAllPlayers } from '../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const players = await getAllPlayers();
            return res.status(200).json(players);
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
