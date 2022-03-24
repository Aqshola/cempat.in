import React from "react";

type Props = {showDetail:(...T:any)=>void};

const StoryBox = ({showDetail}: Props) => {
  return (
    <div className="w-full p-4 border border-green-primary cursor-pointer" onClick={()=>showDetail(true)}>
      <div className="items-center flex justify-between">
        <h2 className="font-semibold text-lg ">Cerita Kita Bersama</h2>
        <p className="text-xs float-right font-light">20 Februari 2022</p>
      </div>
      <p className="text-xs mt-4 font-medium text-green-primary">User Lalatina </p>
    </div>
  );
};

export default StoryBox;
