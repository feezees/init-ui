import type { NextApiRequest, NextApiResponse } from "next";
import { IDbTokenDto, IDbUserDto } from "../../types/dto";
import { files } from "../../utils/file";
import { getRoutes } from "../../utils/getRoutes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sessionToken = req.cookies.sessionToken;

  if (!sessionToken) {
    res.status(401);
  }

  const tokens = files.parsedFile("./db/tokens.json");

  const sessionTokenValid = tokens.find((t: IDbTokenDto) => t.sessionToken === sessionToken);

  if (!sessionTokenValid) {
    res.send("wrong token");
    return;
  }

  const users = files.parsedFile("./db/users.json");
  const user = users.find((u: IDbUserDto) => u.id === sessionTokenValid.id);

  res.send({
    links: getRoutes(user.role)
  });
}
