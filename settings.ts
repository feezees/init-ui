const dev = false;
export const DOMEN = dev ? 'http://localhost:3000' : "";
export const discord = process.env.DISCORD_BOT_TOKEN;
export const PORT = dev ? `3000` : `3001`;
export const tg = { token: process.env.TG_BOT_TOKEN, webAppUrl: process.env.TG_BOT_WEB_APP_URL };