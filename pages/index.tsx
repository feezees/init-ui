import { observer } from "mobx-react-lite";
import Link from "next/link";
import { RootStore } from "../store/RootStore";

export const sButton = `py-2 px-4 border-2 border-zinc-800 bg-twitchpink hover:bg-twitchdarkpink rounded-md`;
export const sLink = 'font-medium text-blue-600 dark:text-blue-500 hover:underline';
export const sList = "mb-2 text-lg font-semibold text-gray-900 dark:text-white";
export const sUl = "max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400";

const Index = () => {
  const links = RootStore.user.links;

  return (
    <>
      <div className="flex flex-col p-4">

        <h2 className={sList}>links</h2>
        <ul className={sUl}>
          {links.length && links.map((linkItem) => (
            <li>
              <Link href={linkItem.href} key={linkItem.href} className={sLink} >{linkItem.heading}</Link>
            </li>
          ))}
        </ul>

        {/* <Link href='/projects/slot'> slot </Link>
        <Link href='/projects/self-control'> self-control </Link>
        _
        <Link href='/ui/scroll-slide'> scroll-slide </Link>
        <Link href='/ui/trading-dashboard-ui'> trading-dashboard-ui </Link>
        _
        <Link href='/issue/dnd'> dnd </Link>
        <Link href='/issue/ws'> ws </Link>
        <Link href='/issue/infinity-scroll'> infinity-scroll </Link>
        <Link href='/issue/pagination'> pagination </Link>
        <Link href='/issue/triple-dropbox'> triple-dropbox </Link>
        _
        <Link href='/404'> 404 </Link>
        <Link href='/login'> login </Link> */}
      </div>

      <script async src="https://telegram.org/js/telegram-web-app.js"></script>
    </>

  );
};

export default observer(Index);
