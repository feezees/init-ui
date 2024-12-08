import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const pageSize = req.body.pageSize;
    const getString = () => faker.lorem.words(10);
    res.send(new Array(pageSize).fill(undefined).map(el => getString()));
}