import React, { FC, MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { observer } from "mobx-react-lite";

const Layout: FC<{ children: React.ReactElement }> = ({ children }) => {
    return (
        <div className='h-screen bg-slate-900 w-full text-white'>
            <div className='mx-auto w-[1440px] border-2 h-full overflow-y-scroll custom-scrollbar'>
                {children}
            </div>
        </div>
    )
}

const useToggleClass = (elementRef: MutableRefObject<HTMLElement | null>, toggledClasses: string[], delay) => {
    useLayoutEffect(() => {
        setTimeout(() => {
            const div = elementRef?.current as HTMLElement | null;
            if (!div) {
                return;
            }
            toggledClasses.forEach((className) => div.classList.toggle(className))

        }, delay);
    }, [elementRef])
}

const MovedFromLeft: FC<{delay?: number}> = ({delay = 0}) => {
    const divRef = useRef(null);
    useToggleClass(divRef, ['scale-x-0', 'opacity-0'], delay)

    return (
        <>
            <div ref={divRef} className={`text-3xl p-4 duration-300 scale-x-0 opacity-0`}>content 💀</div>
        </>

    )
}

const Index: FC = () => {
    return (
        <Layout>
            <>
                <MovedFromLeft />
                <MovedFromLeft delay={100} />
                <MovedFromLeft delay={200} />
            </>
        </Layout>
    )
};

export default observer(Index);