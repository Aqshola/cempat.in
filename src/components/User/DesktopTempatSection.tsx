import React from "react";
import { MdLocationPin } from "react-icons/md";
// import Paginate from "components/Pagination/Paginate";
import ListBox from "components/Peta/UserSection/ListBox";
import { ApiLocation } from "types/types";
import { usePaginate, Paginate } from "components/Pagination/Paginate";

type Props = {
  listLocation: ApiLocation[];
};

export default function DesktopTempatSection({ ...props }: Props) {
  const [pageState, handlerPage] = usePaginate();
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-center font-semibold font-nunito text-2xl mb-5">
        Tempat yang dikunjungi
      </h2>
      <div className="px-10 flex flex-col gap-5 mb-5">
        {props.listLocation
          .slice(
            pageState.active * pageState.length,
            pageState.active * pageState.length + pageState.length
          )
          .map((item,i) => (
            <ListBox
            key={i+"cerita"}
              leftElement={
                <MdLocationPin className="w-7 h-7 text-green-primary" />
              }
              title={item.place_name || ""}
              rightText={""}
            />
          ))}
      </div>
      <Paginate
        id="desktop-tempat"
        className="mt-auto mx-auto self-end"
        pageState={pageState}
        pageStateHandler={handlerPage}
        totalPage={props.listLocation.length}
      />
    </div>
  );
}
