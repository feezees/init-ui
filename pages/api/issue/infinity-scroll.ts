import type { NextApiRequest, NextApiResponse } from "next";
import { files } from "../../../utils/file";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const users = files.parsedFile("./db/issue/infinity-scroll.json");
    res.send(users);
}