import { tgUserFromTg } from "../service/tgUserFromTg";

export const useGetTgUser = () => {
    if (typeof window === 'undefined') return {
        username: undefined,
        id: undefined
    }
    const tg = window?.Telegram?.WebApp;

    return tgUserFromTg(tg);
}