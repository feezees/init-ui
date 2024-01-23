import type { NextApiRequest, NextApiResponse } from "next";
import { fileBuff } from "../../../utils/file";
const fs = require('fs');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = './components';

    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error(err);
            return;
        }

        // Время создания файла
        console.log(stats);
    });
    res.send(52);
}