import { NextApiRequest, NextApiResponse } from "next";
import { parsedFile, saveFile } from "../../../utils/file";

const counters = parsedFile('./db/counters.json');
let queryCounter = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.id) {
        res.send(undefined);
        return;
    }

    if (queryCounter < 5) {
        queryCounter++;
    }

    if (req.body.id && !counters[req.body.id]) {
        counters[req.body.id] = 1;
    }

    if (counters[req.body.id]) {
        counters[req.body.id] = counters[req.body.id] + 1;
    }

    if (queryCounter === 5) {
        saveFile('./db/counters.json', counters);
        queryCounter = 0;
    }

    res.send(counters[req.body.id]);
}