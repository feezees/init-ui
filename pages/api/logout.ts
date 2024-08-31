import type { NextApiRequest, NextApiResponse } from "next";
import { IDbTokenDto } from "../../types/dto";
import { files } from "../../utils/file";

const users = files.parsedFile("./db/users.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const tokens = files.parsedFile("./db/tokens.json");
  console.log("tokens", tokens);

  const sessionToken = req.cookies.sessionToken;
  console.log("sessionToken", sessionToken);

  const TokenToLogout = tokens.find((el: IDbTokenDto) => el.sessionToken === sessionToken);
  if (TokenToLogout) {
    res.status(401);
  }

  const idToLogout = TokenToLogout ? TokenToLogout.id : undefined;

  if (!idToLogout) {
    res.status(401);
  }

  const newTokens = tokens.filter((el: IDbTokenDto) => el.id !== idToLogout);
  res.setHeader("Set-Cookie", String(`sessionToken=undefined; Max-Age=0`));

  const stringToSave = JSON.stringify(newTokens);
  files.saveFile("./db/tokens.json", stringToSave);

  res.status(200).send({});
}
