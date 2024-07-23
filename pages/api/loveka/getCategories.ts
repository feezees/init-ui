// https://lexica.art/api/v1/search?q=apples

import { NextApiRequest, NextApiResponse } from "next";
import { parsedFile, saveFile } from "../../../utils/file";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const categories = ['cake', 'drinks', 'bread'];
    const cached = parsedFile('./db/loveka/getCategories.json');

    if (!req.query?.value) {
        res.send(categories)
        return
    }

    const query = req.query?.value as string;
    const cachedValue = cached[query];

    if (cachedValue) {
        // return cached
        res.send(cachedValue);
        return;
    } else {
        // set cached
        const response = await axios.get(`https://lexica.art/api/v1/search?q=${query}`);
        cached[query] = response.data.images;
        saveFile('./db/loveka/getCategories.json', JSON.stringify(cached))
        res.send(cached[query]);
        return;
    }

    res.send(52)
    return;
}