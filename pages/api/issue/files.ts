import type { NextApiRequest, NextApiResponse } from "next";
const fs = require('fs');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = './components';

    fs.stat(filePath, (err: any, stats: any) => {
        if (err) {
            console.error(err);
            return;
        }

        // Время создания файла
        console.log(stats);
    });
    res.send(52);
}