// pages/api/players/delete/[id].ts
import { deletePlayer } from '../../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            await deletePlayer(Number(id));
            return res.status(200).json({ message: 'Player deleted successfully' });
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
