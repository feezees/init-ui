
import type { NextApiRequest, NextApiResponse } from "next";
import TelegramBot from "node-telegram-bot-api";
import { parsedFile, saveFile } from "../../utils/file";
import { tg } from "../../settings";

const { token, webAppUrl } = tg as Record<string, string>;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('#52 ', process.env.TG_BOT_TOKEN)
    const bot = new TelegramBot(token, { polling: true });
    bot.on("message", async (msg: any, match: any) => {

        try {
            const tgUserId = msg.from.id;
            const tgUsers = parsedFile("../init-ui/db/tgusers.json");

            if (!tgUsers[tgUserId]) {
                console.log('new user');
                tgUsers[tgUserId] = msg.from;
                saveFile("../init-ui/db/tgusers.json", tgUsers);
            } else {
                console.log('user already registered');
            }
        } catch (err) {
            console.log('err');
            return;
        };

        const chatId = msg.chat.id;
        const text = msg.text;
        if (text === "/start") {
            await bot.sendMessage(chatId, "Wassup www", {
                //
                reply_markup: {
                    inline_keyboard: [[{ text: "Start tap", web_app: { url: webAppUrl } }]],
                },
            });
        }
    });

    res.send('pong');
}   