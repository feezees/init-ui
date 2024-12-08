import axios from "axios"
import { useLayoutEffect, useRef, useState } from "react";

const sButton = "bg-red-500 w-40 h-10 rounded-lg";

export default function () {
    const [value, setValue] = useState();
    const inputRef = useRef<HTMLInputElement>(null);

    const [categories, setCategories] = useState<string[]>([]);
    useLayoutEffect(() => {
        axios.get('/api/loveka/getCategories').catch((err) => console.log(err)).then(res => setCategories(res?.data))
    }, []);

    const handleClick = () => {
        const path = location.origin;
        const url = new URL(path + '/api/issue/lexica');
        const s = inputRef?.current?.value.replaceAll(' ', '-') as string
        console.log('#52 ', s)

        url.searchParams.set('value', s);
        axios.get(url.href).catch().then(res => {

            const src = res.data.images[0].src;
            const q = src.split('/')
            const w = q[q.length - 1];
            const prefix = 'https://image.lexica.art/'
            const [full, small] = [prefix + 'md/', prefix + 'sm/']

            console.log('#52 ', full + w)
        });
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-slate-900">
            <input type="text" defaultValue="cats" ref={inputRef} />
            <button className={sButton} onClick={handleClick}>XD</button>
        </div>
    )
}