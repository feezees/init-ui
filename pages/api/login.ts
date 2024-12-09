import { faker } from "@faker-js/faker";
import type { NextApiRequest, NextApiResponse } from "next";
import { IDbTokenDto, IDbUserDto } from "../../types/dto";
import { parsedFile, saveFile } from "../../utils/file";
import { getRoutes } from "../../utils/getRoutes";

export default function handler(req: NextApiRequest, res: NextApiResponse) {


  const method = req.method;

  if (method === "POST") {
    const authType = req.body.authType;
    if (authType === "tg") {
      if (req.body?.username && req.body?.id) {
        const users = parsedFile("./db/tgusers.json");
        console.log('#users', users, req.body);

        res.send({
          links: getRoutes('tg')
        });
        return;
      }

      res.status(500).json({ message: 'error' });
      return;
    }

    const users = parsedFile("./db/users.json") as IDbUserDto[];
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

    const tokens = parsedFile("./db/tokens.json");
    tokens.push({ id: userWithLogin.id, refreshToken, sessionToken });
    saveFile("./db/tokens.json", tokens);

    res.setHeader("Set-Cookie", `sessionToken=${sessionToken}; refreshToken=${refreshToken}`);

    res.send({
      status: 200,
      refreshToken,
      sessionToken,
      links: getRoutes(userWithLogin.role)
    });
  }

  if (method === 'PUT') {
    const sessionToken = req.cookies.sessionToken;

    if (!sessionToken) {
      res.status(401);
    }

    const tokens = parsedFile("./db/tokens.json");

    const sessionTokenValid = tokens.find((t: IDbTokenDto) => t.sessionToken === sessionToken);

    if (!sessionTokenValid) {
      // wrong token
      res.status(401).send('wrong token');
      return;
    }

    const users = parsedFile("./db/users.json");
    const user = users.find((u: IDbUserDto) => u.id === sessionTokenValid.id);

    res.send({
      links: getRoutes(user.role)
    });
  }

  if (method === 'DELETE') {
    const tokens = parsedFile("./db/tokens.json");
    const sessionToken = req.cookies.sessionToken;

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
    saveFile("./db/tokens.json", newTokens);

    res.status(200).send({});
  }

}
