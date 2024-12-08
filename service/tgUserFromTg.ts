export const tgUserFromTg = (tg: any) => {
    return tg && tg?.initDataUnsafe?.user?.username && tg.initDataUnsafe.user?.id ? {
        username: tg?.initDataUnsafe?.user?.username,
        id: tg.initDataUnsafe.user?.id,
    } : {
        username: undefined,
        id: undefined,
    }
}