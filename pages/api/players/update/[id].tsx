// pages/api/players/update/[id].ts
import { updatePlayer } from '../../../../utils/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'PUT') {
        try {
            const player = await updatePlayer(Number(id), req.body);
            return res.status(200).json(player);
        } catch (error) {
            return res.status(500).json({ message: (error as Error).message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
