import React from "react";
import ListBox from "components/Peta/UserSection/ListBox";
import { MdLocationPin } from "react-icons/md";
import { ApiLocation } from "types/types";
import { usePaginate, Paginate } from "components/Pagination/Paginate";
import { Link } from "react-router-dom";

type Props = {
  listLocation: ApiLocation[];
};

export default function MobileTempatSection({ ...props }: Props) {
  const [pageState, handlerPage] = usePaginate();
  return (
    <section id="mobile-view" className="md:w-1/2 mx-auto">
      <div className="mt-5 px-5 flex flex-col gap-2 min-h-[300px]">
        {props.listLocation
          .slice(
            pageState.active * pageState.length,
            pageState.active * pageState.length + pageState.length
          )
          .map((item) => (
            <Link to={`/peta?lat=${item.lat}&&lng=${item.lng}`} key={item.id}>
            
              <ListBox
                leftElement={
                  <MdLocationPin className="w-7 h-7 text-green-primary" />
                }
                title={item.place_name || ""}
                rightText={""}
              />
            </Link>
          ))}
      </div>
      <Paginate
        className="mt-10 ml-auto"
        pageState={pageState}
        pageStateHandler={handlerPage}
        totalPage={props.listLocation.length}
      />
    </section>
  );
}
