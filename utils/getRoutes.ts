import { heading } from "discord.js";
import { IDBRouteDto } from "../types/dto";

export let defalutLinks = [
    {
        href: '/',
        heading: 'home',
        description: '',
    },
] as IDBRouteDto[];

export const getRoutes = (role: 'admin' | 'moder' | 'driver' | 'tg') => {
    if (role === 'tg') {
        return [
            ...defalutLinks,
            {
                href: '/issue/ws',
                heading: '/issue/ws',
                description: ''
            },
            {
                href: '/loveka',
                heading: '/loveka',
                description: ''
            }
        ]
    }

    if (role === 'admin') {
        return [
            ...defalutLinks,
            {
                href: '/admin',
                heading: 'admin page',
                description: '',
            },
            {
                href: '/moder',
                heading: 'moder page',
                description: '',
            },
        ]
    }

    if (role === 'moder') {
        return [
            ...defalutLinks,
            {
                href: '/moder',
                heading: 'moder page',
                description: '',
            },
        ]
    }

    return defalutLinks;
}