import { observer } from "mobx-react-lite";
import Link from "next/link";

export const sButton = `py-2 px-4 border-2 border-zinc-800 bg-twitchpink hover:bg-twitchdarkpink rounded-md`;

const Index = () => {
  return (
    <div className="flex flex-col">
      <Link href='/projects/slot'> slot </Link>
      <Link href='/projects/self-control'> self-control </Link>
      <Link href='/issue/movedFromLeft'> movedFromLeft </Link>
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
      <Link href='/login'> login </Link>
    </div>
  );
};

export default observer(Index);
