// https://www.behance.net/gallery/181803423/Cinescope-CMS-UIUX

import { faker } from "@faker-js/faker";
import axios from "axios";
import { useEffect, useState } from "react";

const selfie = 'https://image.lexica.art/full_webp/2f687167-83e6-4a7f-aaf7-6bc8cb399387';
import { ComputerDesktopIcon , ArrowRightIcon} from "@heroicons/react/24/solid";
import { title } from "process";

export const User = ({ src }: { src: string }) => {
    const [value, setValue] = useState<any>();
    const categoryTitle = src.split('.')[0];

    useEffect(() => {
        axios.post('/api/get-image', { image: src }).catch(err => console.log(err)).then(res => setValue(res));
    }, [])

    return (
        <>
            {value &&
                <div className="overflow-hidden object-contain  w-full flex items-center gap-2 p-2 bg-zinc-900 rounded-xl">
                    <img
                        src={selfie}
                        // src={`data:image/jpeg;base64,${value.data.payload}`}
                        className='object-cover  rounded-xl w-12'
                    />
                    <div className="flex flex-col gap-2">
                        <p>{faker.name.firstName()}</p>
                        <p>{faker.name.lastName()}</p>
                    </div>
                </div>
            }
        </>
    )
}

export const Menu = () => {
    const a = [
        [
            {
                rowType: 'full',
                icon: <ComputerDesktopIcon />,
                title: 'Media Library'
            }
        ],
        [
            {
                rowType: 'full',
                icon: <ArrowRightIcon />,
                title: 'Content'
            },
            {
                rowType: 'full',
            }
        ]
    ]
    return (
        <div className="w-full h-full bg-zinc-900 flex-col gap-4 p-2">
            <p>menu</p>
        </div>
    )
}

const Sidebar = () => {
    return (
        <div className="w-[320px] h-full flex flex-col gap-4 border-2">

            <User src="/cinescope/logo.png" />

            <Menu />

        </div>
    )
}

const Main = () => {
    return (
        <div className="w-full h-full bg-zinc-900 flex-col gap-4 ">
            <p>main</p>
        </div>
    )
}

export default function Index() {
    return (
        <div className="bg-black p-4 w-full  h-screen flex justify-center items-center ">
            <div className="w-[1440px] h-full flex gap-4">
                <Sidebar />
                <Main />
            </div>
        </div>
    )
}