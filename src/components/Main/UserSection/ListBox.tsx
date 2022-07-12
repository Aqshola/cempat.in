import React from "react";
import {MdLocationPin} from "react-icons/md"

type Props = {};

export default function ListBox({}: Props) {
  return (
    <div className="flex flex-col p-3 border border-green-primary rounded-md">
      <div className="flex justify-between items-center">
        <h5 className="font-bold text-xl text-green-primary">Lalatina</h5>
        <p className="text-xs font-nunito font-light"> 13 Hari yang lalu</p>
      </div>
      <div className="flex gap-1 items-center mt-3">
        <MdLocationPin />
        <p className="font-nunito text-xs font-medium">Taman Solo</p>
      </div>
    </div>
  );
}
