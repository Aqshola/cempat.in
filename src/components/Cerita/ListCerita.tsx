import parseDateString from "hooks/helper/parseDateString";
import React from "react";

type Props = {
  title:string,
  place_name:string
  date:string
};

function ListCerita({title,place_name,date}: Props) {
  return (
    <div className="w-full border-2 border-green-primary p-5 cursor-pointer">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-green-primary flex-grow justify-center">
          {title}
        </h1>
        <p className="text-xs">{parseDateString(date)}</p>
      </div>
      <div className="flex items-end">
        <p className="mt-5 font-medium text-sm flex-grow">{place_name}</p>
        <div className="flex gap-3">
          <button className="text-xs font-medium">Baca</button>
          <button className="text-xs font-medium text-red-500">Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default ListCerita;
