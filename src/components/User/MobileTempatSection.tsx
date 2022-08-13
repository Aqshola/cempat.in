import React from "react";
import ListBox from "components/Peta/UserSection/ListBox";
import { MdLocationPin } from "react-icons/md";
import { ApiLocation } from "types/types";
import { usePaginate, Paginate } from "components/Pagination/Paginate";

type Props = {
  listLocation: ApiLocation[];
};

export default function MobileTempatSection({ ...props }: Props) {
  const [pageState, handlerPage] = usePaginate();
  return (
    <section id="mobile-view" className="md:hidden">
      <div className="mt-5 px-5 flex flex-col gap-2 min-h-[300px]">
        {props.listLocation
          .slice(
            pageState.active * pageState.length,
            pageState.active * pageState.length + pageState.length
          )
          .map((item) => (
            <ListBox
              leftElement={
                <MdLocationPin className="w-7 h-7 text-green-primary" />
              }
              title={item.place_name || ""}
              rightText={""}
            />
          ))}
      </div>
      <Paginate
        // buttonCallback={_navigatePage}
        className="mt-10"
        pageState={pageState}
        pageStateHandler={handlerPage}
        totalPage={props.listLocation.length}
      />
    </section>
  );
}
