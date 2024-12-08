import axios from "axios";
import { Spinner } from "flowbite-react";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";

export default function Index() {
    const [list, setList] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useLayoutEffect(() => {
        axios.get('/api/increment/top').then((res) => {
            setLoading(false);
            setList(res.data);
        }).catch(err => {
            setError(true);
            setLoading(false);
        })
    }, [])

    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            <div className="w-full py-8 flex justify-center items-center">
                {error && <Link href={'/'}>Error, go home</Link>}
                {loading && <Spinner color="purple" />}

                {!error && !loading && list.length && <div className="w-full py-8 flex flex-col gap-4 justify-center items-center text-yellow-100">
                    {list.map((el: { username: string, count: number }) => <div className="w-full flex justify-between pl-4 pr-4"><p >{el.username}</p> <p>{el.count}</p></div>)}
                </div>}
            </div>
        </div>
    )
}