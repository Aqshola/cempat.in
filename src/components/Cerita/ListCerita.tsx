import React from "react";

type Props = {};

function ListCerita({}: Props) {
  return (
    <div className="w-full border-2 border-green-primary p-5 cursor-pointer">
      <div className="flex items-end">
        <h1 className="text-xl font-semibold text-green-primary flex-grow justify-center">
          Cerita Kita
        </h1>
        <p className="text-sm">20 Februari 2022</p>
      </div>
      <div className="flex items-end">
        <p className="mt-5 font-medium text-sm flex-grow">Hutan Kota</p>
        <div className="flex gap-3">
          <button className="text-xs font-medium">Baca</button>
          <button className="text-xs font-medium text-red-500">Hapus</button>
        </div>
      </div>
    </div>
  );
}

export default ListCerita;
