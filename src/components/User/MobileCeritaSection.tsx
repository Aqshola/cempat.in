import React from "react";

import ListBox from "components/Peta/UserSection/ListBox";

import { MdLocationPin } from "react-icons/md";
// import Paginate from "components/Pagination/Paginate";

type Props = {};

export default function MobileCeritaSection({}: Props) {
  return (
    <section id="mobile-view" className="md:hidden">
     
      <div className="mt-5 px-5 flex flex-col gap-2">
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
      {/* <Paginate totalPage={10} key={"mobile"} className="mt-10"/> */}
    </section>
  );
}
