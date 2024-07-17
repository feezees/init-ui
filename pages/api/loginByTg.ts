import type { NextApiRequest, NextApiResponse } from "next";
import { IDbTokenDto, IDbUserDto } from "../../types/dto";
import { getRoutes } from "../../utils/getRoutes";
import { parsedFile } from "../../utils/file";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.body?.user) {
        res.send({
            links: getRoutes('tg')
        });
        return;
    }

    res.status(500).json({ message: 'error' });
}
