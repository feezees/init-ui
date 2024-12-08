'use client'

import axios from "axios";
import { Spinner } from "flowbite-react";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useGetTgUser } from "../../hooks/useGetTgUser";
import { DOMEN } from "../../settings";

export const Image = ({ src }: { src: string }) => {
    const [value, setValue] = useState<any>();

    useEffect(() => {
        axios.post('/api/get-image', { image: src }).catch(err => console.log(err)).then(res => setValue(res));
    }, [])

    return (
        <>
            {value &&
                <div className="relative flex overflow-hidden object-contain h-full w-full justify-center items-center">
                    <img
                        src={`data:image/jpeg;base64,${value.data.payload}`}
                        className='object-cover  overflow-hidden rounded-full '
                    />
                </div>
            }
        </>
    )
}

function Index() {
    const [counter, setCounter] = useState<number | undefined>();
    const tgData = useGetTgUser();
    const router = useRouter();
    const [counterLoading, setCounterLoading] = useState<boolean>(true);
    const [tapError, setTapError] = useState<boolean>(false);

    const backToHome = useCallback(() => {
        if (router) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        if (!tgData.id || !tgData.username) {
            backToHome()
        }
    }, [tgData])

    useLayoutEffect(() => {
        if (tgData?.username && tgData?.id) {
            if (!counter) {
                axios.post(`${DOMEN}/api/increment/increment`, tgData).then((res) => {
                    setCounter(res.data);
                    setCounterLoading(false);
                })
            }
        }
    }, [tgData])

    const handleIncrement = useCallback(() => {
        if (!counter) {
            return;
        }

        setCounter(counter + 1);

        axios.post(`${DOMEN}/api/increment/increment`, tgData).then((res) => {
        }).catch(err => {
            setTapError(true);
        })
    }, [counter])

    return (
        <div className="flex flex-col justify-center items-center h-full w-full">
            {counterLoading && <div className="w-full py-8 flex justify-center items-center">
                <Spinner color="purple" aria-label="Purple spinner example" />
            </div>}

            {tapError && <div className="w-full py-8 flex justify-center items-center">
                <Link href={'/'}>Error, go home</Link>
            </div>}

            {!counterLoading && <div className="flex flex-col gap-4">
                <h1>Increment</h1>
                <p className="text-yellow-200">{JSON.stringify(tgData)}</p>

                <button className="" onClick={handleIncrement}>
                    <Image src="notcoin.png" />
                </button>

                <h2 className="text-yellow-200 text-center">{counter}</h2>
            </div>
            }
        </div>
    )
}

export default observer(Index);