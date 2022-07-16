import React from "react";
import { MdLocationPin } from "react-icons/md";
import Paginate from "components/Pagination/Paginate";
import ListBox from "components/Main/UserSection/ListBox";
type Props = {};

export default function DesktopTempatSection({}: Props) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-center font-semibold font-nunito mb-2">
        Tempat yang dikunjungi
      </h2>
      <div className="px-10 flex flex-col gap-5 mb-5">
        <ListBox
          title="Lalatina"
          rightText={"13 Hari yang lalu"}
          detail={
            <div className="flex gap-1 items-center mt-3">
              <MdLocationPin />
              <p className="font-nunito text-xs font-medium">Taman Solo</p>
            </div>
          }
        />
      </div>
      <Paginate totalPage={10} key={"desktop-tempat"} className="mt-auto mx-auto self-end" />
    </div>
  );
}
