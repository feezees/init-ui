import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs/promises';
import { parsedFile } from "../../../utils/file";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // res.status(500).json({ message: 'error' });

    if (req.method === 'GET') {
        if (req.query.dto) {
            const dtos = parsedFile(`./db/${req.query.dto}.json`);
            res.send({ dtos });

            return;
        }

        const files = await fs.readdir('./db/');
        const jsons = files.filter(el => el.endsWith('.json'));
        const fileNames = jsons.map(el => el.split('.json')[0]);

        res.send({ dtos: fileNames });
    }
}