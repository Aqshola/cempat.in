import React from "react";

import ListBox from "components/Peta/UserSection/ListBox";

import { MdLocationPin } from "react-icons/md";
import { Story } from "types/types";
import parseDateString from "hooks/helper/parseDateString";
import { usePaginate, Paginate } from "components/Pagination/Paginate";

type Props = {
  listStory:Story[]
};

export default function MobileCeritaSection({...props}: Props) {
  const [pageState, handlerPage] = usePaginate();
  return (
    <section id="mobile-view" className="md:hidden">
      <div className="mt-5 px-5 flex flex-col gap-2 min-h-[400px]">
        {props.listStory.slice(
            pageState.active * pageState.length,
            pageState.active * pageState.length + pageState.length
          ).map((item)=>(
          <ListBox
          key={item.id}
            title={item.title}
            rightText={parseDateString(item.created_at)}
            detail={
              <div className="flex gap-1 items-center mt-3">
                <MdLocationPin />
                <p className="text-ellipsis font-nunito text-xs font-medium">{item.place_name}</p>
              </div>
            }
          />
        ))}
      </div>
      <Paginate
        // buttonCallback={_navigatePage}
        className="mt-10"
        pageState={pageState}
        pageStateHandler={handlerPage}
        totalPage={props.listStory.length}
      />
    </section>
  );
}
