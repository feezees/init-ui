import { discord } from "../../settings";
import type { NextApiRequest, NextApiResponse } from "next";

const Discord = require("discord.js");
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const m = {
        "content": "This is a message with components",
        "components": [
            {
                "type": 1,
                "components": [
                    {
                        "type": 2,
                        "label": "Click me!",
                        "style": 1,
                        "custom_id": "click_one"
                    }
                ]

            }
        ]
    }

    client.on("messageCreate", (message: { content: string; channel: { send: (arg: any) => void; }; }) => {
        if (message.content.startsWith("ping")) {
            message.channel.send(m);
        }
    });

    client.on('')
    
    client.login(discord);

    res.send('pong');
}   