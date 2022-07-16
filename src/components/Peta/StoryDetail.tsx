import React from "react";

type Props = {showDetail:((...T:any)=>void)};

function StoryDetail({showDetail}: Props) {
  return (
    <>
      <button className="w-fit mt-10 text-sm" onClick={()=>showDetail(false)}>Back to list</button>
      <div className="border-t">
        <h1 className="mt-5 text-xl font-semibold">Lalatina</h1>
        <p className="font-light text-sm mt-5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad facilis
          animi numquam veniam. Pariatur laboriosam quibusdam earum optio
          doloribus autem.
        </p>
      </div>
    </>
  );
}

export default StoryDetail;
