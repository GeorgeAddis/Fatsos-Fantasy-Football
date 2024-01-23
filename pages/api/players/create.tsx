// // pages/api/players/create.ts
// import { createPlayer } from '../../../utils/db';
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method === 'POST') {
//         try {
//             const player = await createPlayer(req.body);
//             return res.status(200).json(player);
//         } catch (error) {
//             return res.status(500).json({ message: (error as Error).message });
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
