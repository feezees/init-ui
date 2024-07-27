import { NextApiRequest, NextApiResponse } from "next";
import { parsedFile } from "../../../utils/file";
import { NextResponse } from "next/server";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        let counters = parsedFile('./db/counters.json') as Record<string, number>;
        const tgusers = parsedFile('./db/tgusers.json');

        const sortedCounters = Object.entries(counters).sort((a, b) => b[1] - a[1]);
        const pares = sortedCounters.map(([key, value]) => ({ username: tgusers[key].username, count: value }));

        console.log('pares',pares);
        return res.status(200).send(pares);
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
