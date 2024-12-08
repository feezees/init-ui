import type { NextApiRequest, NextApiResponse } from "next";

import { imageBuffer } from "../../utils/file";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const imageName = req.body.image;

        const coinsPathPrefix = `./db/img/`;

        res.setHeader("Content-Type", "image/jpg");

        try {
            res.send({
                status: 0,
                payload: imageBuffer(coinsPathPrefix + imageName),
            });
        } catch (e) {
            res.send({
                status: 1,
                payload: "image not found",
            });
        }

        return;
    }

    res.status(500).json({ message: "error" });
}