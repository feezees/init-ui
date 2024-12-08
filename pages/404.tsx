import { useRouter } from "next/router";

export default function () {
  const router = useRouter();

  return (
    <div className="h-screen w-screen bg-slate-900">
      zxc

      <div className=" absolute left-1/2  -translate-x-1/2 top-1/2 transform -translate-y-1/2 flex flex-col gap-8 z-50  text-[10rem] text-slate-300 font-bold ">
        <button onClick={() => router.back()}>GO BACK</button>
      </div>
      <div className=" absolute left-1/2  -translate-x-1/2 top-1/2 transform -translate-y-1/2  text-[40rem] text-slate-500 font-bold blur-xl max-h-[100%] overflow-hidden">
        404
      </div>
    </div>
  );
}
