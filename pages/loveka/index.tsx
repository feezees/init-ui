"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel, CustomFlowbiteTheme, FlowbiteCarouselTheme, Tabs } from "flowbite-react";
import Link from "next/link";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
    
// images taked from https://www.freepik.com/

const sImage = 'w-max h-full border-2 rounded-xl border-twitchdarkpink hover:border-twitchpink';
const sCarouselWrapper = "h-56 sm:h-64 xl:h-80 2xl:h-96";

const CategoryHeading = ({ text }: { text: string }) => <div className="absolute left-0 bottom-0 w-full bg-sky-500/50">
    <p className="text-5xl text-white pl-4 pt-1 pb-2">{text}</p>
</div>

const Image = ({ src }: { src: string }) => {
    const [value, setValue] = useState<any>();
    const categoryTitle = src.split('.')[0];

    useEffect(() => {
        axios.post('/api/get-image', { image: src }).catch(err => console.log(err)).then(res => setValue(res));
    }, [])

    return (
        <>
            {value &&
                <Link href={`/loveka/category?value=${categoryTitle}`}>
                    <div className="relative flex overflow-hidden object-contain h-full w-full justify-center items-center bg-pink-900">
                        <div className="absolute left-0 bottom-0  w-full h-full bg-sky-500/30" />
                        <CategoryHeading text={categoryTitle} />
                        <img
                            src={`data:image/jpeg;base64,${value.data.payload}`}
                            className='object-cover  rounded-xl'
                        />
                    </div>
                </Link>
            }
        </>
    )
}

const sHeading = "text-yellow-200 tracking-tighter mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"

export const LovekaHeading = ({ text }: { text: string }) => <Link href={'/loveka'}><h1 className={sHeading + ' text-yellow-200'} >{text}</h1></Link>

const categories = ['cake.jpg', 'drinks.avif', 'bread.jpg'];

const LovekaTabs = () => {
    return (
        <Tabs aria-label="Default tabs" variant="default">
            <Tabs.Item active title="100m | 5 000 items" icon={HiUserCircle} />
            <Tabs.Item title="1200m | 50 000 items" icon={MdDashboard} />
        </Tabs>
    );
}

export default function Index() {
    return <div className="h-screen w-screen p-4">
        <LovekaHeading text="Loveka" />

        <div className={sCarouselWrapper}>
            <Carousel draggable={true}>
                {categories.map((image, index) => <Image key={index} src={image} />)}
            </Carousel>
        </div>

        <div className="mt-6">
            <LovekaTabs />
        </div>


    </div>;
}
