import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs/promises';
import { parsedFile, saveFile } from "../../../utils/file";
import { readFile } from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query?.value as string;
    const files = await fs.readdir('./db/lexica');

    try {
        if (query.match('/')) {
            throw new Error('query match / ');
        }
        const list = files.map(el => el.split('.json')[0]);
        const has = list.includes(query);

        if (!has) {
            const response = await axios.get(`https://lexica.art/api/v1/search?q=${query}`);
            saveFile(`./db/lexica/${query}.json`, response.data);
            res.send(response.data);
            return
        } else {
            const f = parsedFile(`./db/lexica/${query}.json`);
            res.send(f);
            return;
        }
    } catch (err) {
        res.send('lexica err');
        return;
    }
}