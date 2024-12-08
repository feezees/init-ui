import axios from "axios";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { useEffect } from "react";
import { sLink } from "../../pages";
import Header from "../Header";

const Index = observer(() => {
    useEffect(() => {
        axios.get('/api/issue/files').catch((err) => console.log(err)).then(res => console.log(res))
    }, [])

    return <div className="w-screen h-screen border-2 border-pink-300  bg-twitchdarkbg text-twitchgrey">
        <div className="w-full mx-auto">
            <Header />
            files
        </div>
    </div >
})

export default Index;