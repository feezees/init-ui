import axios from "axios"
import { useLayoutEffect, useRef, useState } from "react";

const sButton = "bg-red-500 w-40 h-10 rounded-lg";

export default function () {
    const [value, setValue] = useState<any>();
    const ref = useRef<HTMLInputElement>(null);

    const [categories, setCategories] = useState<string[]>([]);
    useLayoutEffect(() => {
        axios.get('/api/loveka/getCategories').catch((err) => console.log(err)).then(res => setCategories(res?.data))
    }, []);

    const handleClick = () => {
        const path = location.origin;
        const url = new URL(path + '/api/loveka/getCategories');

        if (!ref.current?.value) {
            return;
        }

        url.searchParams.set('value', ref.current.value);
        axios.get(url.href).catch((err) => setValue(err)).then(res => setValue(res?.data))
    }

    return (
        <div>
            {value && value.map((el: {srcSmall: string}) => <img className="h-[64px] w-[64px] border-2" src={el.srcSmall} />)}
            {categories.length && categories.map((category, index) => <p key={index}>{category}</p>)}
            <input type="text" ref={ref} defaultValue='cake' />
            <button className={sButton} onClick={handleClick}>{JSON.stringify(value)}</button>
        </div>
    )
}