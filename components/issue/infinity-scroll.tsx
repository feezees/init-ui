import { faker } from "@faker-js/faker";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";

type User = { id: string, img: string }
interface ServerData { data: User[] };

const sScrollToTop = "h-[64px] w-[64px] absolute bottom-[8px] right-[32px] rounded-full hover:text-black  bg-twitchdarkbg hover:bg-twitchdarkpink duration-300 flex justify-center items-center"
const sGrid = "border-2 h-[100%] grid justify-center grid-cols-1 gap-8 overflow-y-scroll  overflow-x-hidden custom-scrollbar"

export const prefix = 'https://image.lexica.art/'
export const [full, small] = [prefix + 'full_webp/', prefix + 'sm2_webp/']
const pageSize = 4;

const getObserver = (onIntersection: IntersectionObserverCallback) => new IntersectionObserver(onIntersection, {
    root: null,   // default is the viewport
    threshold: 1 // percentage of target's visible area. Triggers "onIntersection"
})

const Index = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [list, setList] = useState<User[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios.get<unknown, ServerData>('/api/issue/infinity-scroll')
            .then(res => {
                if (res?.data) {
                    setUsers(res.data)
                    setList(res.data.slice(0, 4))
                }
            })
    }, [])

    const dividerAfter = useRef(null);
    const dividerBefore = useRef(null);

    useEffect(() => {
        let array = [...list, ...users.slice(list.length, list.length + pageSize)]
        console.log('@', list);

        if (page > 0) {
            setList(array)
        }
    }, [page])

    if (typeof window !== "undefined") {
        useEffect(() => {
            let debounceFlag = false;

            // callback is called on intersection change
            function onIntersection() {
                if (!debounceFlag) {
                    debounceFlag = true;
                    setPage(prev => prev + 1);
                    setTimeout(() => debounceFlag = false, 10);
                }
            }

            // define an observer instance
            let observer = getObserver(onIntersection);

            // connect observer to HTMLElement
            dividerAfter.current && observer.observe(dividerAfter.current)
        }, [])
    }

    const handleScrollToTop = () => (dividerBefore?.current as unknown as HTMLElement).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    return (
        <div className=" bg-[#0E0E0E] h-screen px-4 w-full  text-white">
            <button onClick={handleScrollToTop} className={sScrollToTop}> ^ </button>
            <div className={sGrid} id='scroll-container'>
                <div ref={dividerBefore} ></div>
                {list.map((el, idx) => <img key={el.id} alt={el.id} src={small + el.img} className="h-[300px] mx-auto" />)}
                <div ref={dividerAfter}></div>
            </div>
        </div>
    )
}

export default Index;
