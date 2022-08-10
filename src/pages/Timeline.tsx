import clsx from "clsx";
import TimelineList from "components/Timeline/TimelineList";
import useGetListPost from "hooks/timeline/useGetListPost";
import React, { useEffect, useRef, useState } from "react";
import { Story } from "types/types";

type Props = {};

export default function Timeline({}: Props) {
  const listParent = useRef<HTMLDivElement>(null);
  const noDataRef = useRef<HTMLDivElement>(null);
  const [currentScroll, setcurrentScroll] = useState<number>(-1);
  const [touchStart, settouchStart] = useState({
    x: 0,
    y: 0,
  });
  const [Loading, setLoading] = useState<boolean>(false);

  const [touchEnd, settouchEnd] = useState({
    x: 0,
    y: 0,
  });

  const [paginateInfinite, setpaginateInfinite] = useState({
    from: 0,
    to: 10,
    limit: 10,
  });

  const [bottomLoading, setbottomLoading] = useState<boolean>(false);

  const [getList, result, loadingList] = useGetListPost();
  const [timelineData, settimelineData] = useState<Story[]>([]);

  
  function onTouchStart(e: React.TouchEvent<HTMLElement>) {
    const touch = e.targetTouches[0];
    settouchStart({
      x: touch.screenX,
      y: touch.screenY,
    });
  }

  function onTouchEnd(e: React.TouchEvent<HTMLElement>) {
    const touch = e.changedTouches[0];
    settouchEnd({
      x: touch.screenX,
      y: touch.screenY,
    });

    swipeCheck();
  }

  function swipeCheck() {
    const changeY = touchStart.y - touchEnd.y;
    const changeX = touchStart.x - touchEnd.x;

    if (isPullDown(changeY, changeX)) {
      setLoading(true);
      let timeout = setTimeout(() => {
        setLoading(false);
        clearTimeout(timeout);
      }, 2000);
    }
  }

  function isPullDown(dY: number, dX: number) {
    return (
      dY < 0 &&
      ((Math.abs(dX) <= 100 && Math.abs(dY) >= 200) ||
        (Math.abs(dX) / Math.abs(dY) <= 0.3 && dY >= 60))
    );
  }
  function onScroll(e: React.UIEvent<HTMLElement, UIEvent>) {
    setcurrentScroll(e.currentTarget.scrollTop);
  }

  useEffect(() => {
    getList(paginateInfinite.limit, paginateInfinite.from, paginateInfinite.to);
  }, []);

  useEffect(() => {
    if (!loadingList) {
      settimelineData([...timelineData, ...result.data]);
      if (result.data.length === 0) {
        if (result.data.length === 0) {
          setTimeout(() => {
            if (listParent.current) {
              const scrollTop = listParent.current.scrollHeight || 0;
              listParent.current.scrollTo({
                top: scrollTop - 1000,
                behavior: "smooth",
              });
            }
            setbottomLoading(false);
          }, 1000);
        }
      }else{
        setbottomLoading(false);
      }
    }
  }, [loadingList]);

  useEffect(() => {
    if (listParent.current) {
      listParent.current.addEventListener(
        "scroll",
        () => {
          if (listParent.current) {
            const { scrollTop, scrollHeight, clientHeight } =
              listParent.current;
            const bottomPosition = scrollTop + clientHeight;

            if (bottomPosition >= scrollHeight) {
              console.log("lebih");
              const newFrom =
                (paginateInfinite.from + 1) * paginateInfinite.limit + 1;
              const newTo = newFrom + paginateInfinite.limit;


                getList(newFrom, newTo, paginateInfinite.limit);

                setpaginateInfinite({
                  ...paginateInfinite,
                  from: newFrom,
                  to: newTo,
                });

                setbottomLoading(true);
              
            }
          }
        },
        {
          passive: true,
        }
      );
    }
  }, [listParent]);

  return (
    <section
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onScroll={onScroll}
      ref={listParent}
      className={clsx(
        "h-screen py-32 md:py-12 px-5 w-full md:px-14 overflow-y-scroll transition-all",
        currentScroll > 0 && [" bg-white z-50"]
      )}
    >
      <h1 className="top-12 text-xl font-semibold font-nunito  capitalize text-black w-full text-center hidden md:inline">
        Timeline
      </h1>

      <span
        aria-label="loading"
        className={clsx(
          "m-auto border-t-4 border-t-green-primary rounded-full w-8 h-8 transition-all border-green-200  border-4  mx-auto block",
          Loading && ["h-8  animate-spin opacity-100"],
          !Loading && ["h-0 opacity-0   overflow-hidden"]
        )}
      ></span>

      <div className="flex flex-col gap-4 w-full md:mt-10">
        {timelineData.map((el) => (
          <TimelineList
            createdAt={el.created_at}
            title={el.title}
            placeName={el.place_name || ""}
            username={el.user.username}
            key={el.id}
          />
        ))}
      </div>

      <span
        aria-label="loading"
        className={clsx(
          "mt-5 m-auto border-t-4  border-t-green-primary rounded-full w-8 h-8 transition-all border-green-200  border-4  mx-auto block",
          bottomLoading && ["h-8  animate-spin opacity-100"],
          !bottomLoading && ["h-0 opacity-0   overflow-hidden"]
        )}
      ></span>
    </section>
  );
}
