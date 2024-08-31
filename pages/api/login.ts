import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";
import { IDbUserDto } from "../../types/dto";
import { files } from "../../utils/file";
import { getRoutes } from "../../utils/getRoutes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = files.parsedFile("./db/users.json") as IDbUserDto[];
  const userWithLogin = users.find((user) => user.login === req.body.login);

  if (!userWithLogin) {
    res.send("user not found");
    return;
  }

  const correctPass = userWithLogin.password === req.body.password;
  if (!correctPass) {
    res.send("wrong password");
    return;
  }

  const refreshToken = faker.datatype.uuid();
  const sessionToken = faker.datatype.uuid();

  const tokens = files.parsedFile("./db/tokens.json");
  tokens.push({ id: userWithLogin.id, refreshToken, sessionToken });
  const stringToSave = JSON.stringify(tokens);
  files.saveFile("./db/tokens.json", stringToSave);
  
  res.setHeader("Set-Cookie", `sessionToken=${sessionToken}; refreshToken=${refreshToken}`);

  res.send({
    status: 200,
    refreshToken,
    sessionToken,
    links: getRoutes(userWithLogin.role)
  });
}
