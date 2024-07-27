// https://lexica.art/api/v1/search?q=apples

import { NextApiRequest, NextApiResponse } from "next";
import { parsedFile, saveFile } from "../../../utils/file";
import axios from "axios";
import { Item } from "../../../types/loveka";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const categories = ['cake', 'drinks', 'bread'];
    const cached = parsedFile('./db/loveka/getCategories.json');

    
    if (!req.query?.value) {
        res.send(categories)
        return
    }

    const query = req.query?.value as string;
    const categoryType = req.query?.type as string;

    if (categoryType) {

        // class Item {
        //     public id: string;
        //     public title: string;
        //     public img: string;

        //     constructor(id: string, title: string, img: string) {
        //         this.id = id;
        //         this.title = title;
        //         this.img = img;
        //     }
        // }

        const responseBody = {
            items: [
                new Item('category-item-id-1', 'cakes', 'cake.jpg'),
                new Item('category-item-id-2', 'drinks', 'drinks.avif'),
                new Item('category-item-id-2', 'bread', 'bread.jpg'),
            ]
        }

        res.send(responseBody);

        return;
    }


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