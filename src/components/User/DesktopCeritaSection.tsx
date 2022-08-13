import React from "react";
import { MdLocationPin } from "react-icons/md";
import ListBox from "components/Peta/UserSection/ListBox";
import { Story } from "types/types";
import parseDateString from "hooks/helper/parseDateString";
import { usePaginate, Paginate } from "components/Pagination/Paginate";

type Props = {
  listStory: Story[];
};

export default function DesktopCeritaSection({ ...props }: Props) {
  const [pageState, handlerPage] = usePaginate();

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-center font-semibold font-nunito text-2xl mb-5">
        Cerita yang ditulis
      </h2>
      <div className="px-10 flex flex-col gap-5 mb-5 min-h-[400px]">
        {props.listStory
          .slice(
            pageState.active * pageState.length,
            pageState.active * pageState.length + pageState.length
          )
          .map((item) => (
            <ListBox
              key={item.id}
              title={item.title}
              rightText={parseDateString(item.created_at)}
              detail={
                <div className="flex gap-1 items-center mt-3">
                  <MdLocationPin />
                  <p className="font-nunito text-xs font-medium">
                    {item.place_name}
                  </p>
                </div>
              }
            />
          ))}
      </div>
      <Paginate
        id="desktop-cerita"
        // buttonCallback={_navigatePage}
        className="mt-auto mx-auto self-end"
        pageState={pageState}
        pageStateHandler={handlerPage}
        totalPage={props.listStory.length}
      />
    </div>
  );
}
