import React from "react";
import { MdLocationPin } from "react-icons/md";
import Paginate from "components/Pagination/Paginate";
import ListBox from "components/Peta/UserSection/ListBox";
type Props = {};

export default function DesktopTempatSection({}: Props) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-center font-semibold font-nunito text-2xl mb-5">
        Tempat yang dikunjungi
      </h2>
      <div className="px-10 flex flex-col gap-5 mb-5">
        <ListBox
          leftElement={<MdLocationPin className="w-7 h-7 text-green-primary" />}
          title="Taman Solo"
          rightText={""}
        />
      </div>
      {/* <Paginate
        totalPage={10}
        key={"desktop-tempat"}
        className="mt-auto mx-auto self-end"
      /> */}
    </div>
  );
}
