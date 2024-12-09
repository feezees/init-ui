import { observer } from "mobx-react-lite"
import Link from "next/link"
import { sButton } from "../pages"
import { RootStore } from "../store/RootStore"

export const sLink = `p-2 bg-twitchdarkpink text-twitchgray hover:text-twitchhovergrey active:text-twitchpink hover`

const homeLink = {
    href: "/",
    heading: "home"
}

const Header = () => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex bg-slate-600 ">
                <Link href={homeLink.href} className={sLink}>{homeLink.heading}</Link>
            </div>

            <button className={sButton} onClick={() => RootStore.auth.logout()}>
                logout
            </button>
        </div>
    )
}

export default observer(Header)