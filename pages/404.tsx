import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useLayoutEffect } from "react";

import { io } from "socket.io-client";

const config = {
  domen: "https://xfhkntg2-3000.inc1.devtunnels.ms"
}

const domen = config.domen;

export default function () {
  const router = useRouter();

  useLayoutEffect(() => {
    const socket = io('https://localhost:3000');
    
    console.log("@zxc domen ", domen);

    socket.on("connect", () => {
      const engine = socket.io.engine;
      console.log(engine.transport.name); // in most cases, prints "polling"

      console.log("@zxc socket.id"); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("error", () => {
      console.log("@zxc err"); // x8WIv7-mJelg7on_ALbx
    });

    socket.connect();

  }, [])

  console.log('@router', router.asPath);
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
