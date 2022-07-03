import React, { useState } from "react";

type Props = {};

export default function TimelineList() {
  
  return (
    <div
      className="flex w-full border-b-2 py-2 border-green-primary gap-5 items-start text-sm bg-white"
      
    >
      <div className="font-nunito w-7 h-7 font-bold bg-blue-primary rounded-full flex justify-center items-center text-white">
        L
      </div>

      <div className="flex flex-col">
        <div className="w-full flex gap-4">
          <p className="font-semibold">Lalatina</p>
          <p>
            {" "}
            <span className="font-bold text-gray-400">.</span> 14.30
          </p>
        </div>
        <p className="mt-2 ">
          Menulis{" "}
          <span className="font-bold text-green-primary uppercase">API</span> di{" "}
          <span className="font-bold"> Lalatina</span>
        </p>
      </div>
    </div>
  );
}
