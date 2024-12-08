"use client";

import axios from "axios";
import { Carousel, Spinner } from "flowbite-react";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import { Item, PlaceCategoriesResponse } from "../../types/loveka";

// images taked from https://www.freepik.com/

const sImage = 'w-max h-full border-2 rounded-xl border-twitchdarkpink hover:border-twitchpink';
const sCarouselWrapper = "h-56 sm:h-64 xl:h-80 2xl:h-96";

const CategoryHeading = ({ text }: { text: string }) => <div className="absolute left-0 bottom-0 w-full bg-sky-500/50">
    <p className="text-5xl text-white pl-4 pt-1 pb-2">{text}</p>
</div>

export const Image = ({ src }: { src: string }) => {
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

const LovekaTabs = ({ refetch }: { refetch: (value: string) => void }) => {
    const tabs = [
        {
            id: 'place-id-1',
            title: '100m | 5 000 items',
        },
        {
            id: 'place-id-2',
            title: '1200m | 50 000 items',
        },
        {
            id: 'place-id-3',
            title: 'other',
        },
    ]

    const [currentTab, setCurrentTab] = useState<string>(tabs[0].id);
    const sButtonBased = 'px-4 py-1 text-slate-300 rounded-t-xl ';

    useLayoutEffect(() => {
        refetch(currentTab);
    }, [currentTab])

    useEffect(() => {
        refetch(currentTab);
    }, [currentTab])

    return (
        <div className="flex">
            {tabs.map(el => <button
                className={sButtonBased + (currentTab === el.id ? 'bg-sky-500/50' : 'bg-sky-500/10')}
                onClick={() => setCurrentTab(el.id)}>
                {el.title}
            </button>)}
        </div>
    )
}

const PlaceCategory = ({ item: { title, img } }: { item: Item }) => {

    const PlaceImage = ({ src }: { src: string }) => {
        const [value, setValue] = useState<any>();

        useEffect(() => {
            axios.post('/api/get-image', { image: src }).catch(err => console.log(err)).then(res => setValue(res));
        }, [])

        return (
            <div className="h-16 w-16">
                {value && <img
                    src={`data:image/jpeg;base64,${value.data.payload}`}
                    className='object-cover h-16 w-16  rounded-xl'
                />
                }
            </div>
        )
    }

    return (
        <div className="flex gap-2 bg-blue-600 rounded-xl p-2 h-20 w-full">
            <PlaceImage src={img} />
            <p className="text-xl text-white">{title}</p>
        </div>
    )
}

export default function Index() {
    const [scLoading, setScLoading] = useState<boolean>(false);
    const [placeCategories, setPlaceCategories] = useState<Item[]>([]);

    const fetchSubCategory = (value: string) => {
        setScLoading(true);
        axios.get('/api/loveka/getCategories', { params: { type: 'place', value } })
            .catch((err) => console.log(err))
            .then((res) => {
                setScLoading(false);
                setPlaceCategories((res?.data as PlaceCategoriesResponse).items);
                console.log(res)
            })
    }

    return <div className="h-screen w-screen p-4 overflow-scroll">
        <LovekaHeading text="Loveka" />

        <div className={sCarouselWrapper}>
            <Carousel draggable={true}>
                {categories.map((image, index) => <Image key={index} src={image} />)}
            </Carousel>
        </div>

        <div className="mt-6">
            <LovekaTabs refetch={fetchSubCategory} />
        </div>

        {scLoading && <div className="w-full py-8 flex justify-center items-center">
            <Spinner color="info" aria-label="Info spinner example" />
        </div>}

        {categories && !scLoading && (
            <div className="w-full py-8 gap-2 flex justify-center items-center flex-col">
                {placeCategories.map(el => <PlaceCategory item={el} />)}
            </div>
        )}


    </div>;
}
