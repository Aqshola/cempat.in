import clsx from "clsx";
import TimelineList from "components/Timeline/TimelineList";
import useGetListPost from "hooks/timeline/useGetListPost";
import React, { useEffect, useRef, useState } from "react";
import { Story } from "types/types";
import {
  setSessionStorage,
  getSessionStorage,
} from "hooks/helper/useSessionStorage";
import useRefreshTimeline from "hooks/timeline/useRefreshTimeline";
import { BiRefresh } from "react-icons/bi";
import Button from "components/Button/Button";
import { sideNavStore } from "store/navStore";

export default function Timeline() {
  const { setTimelineAction } = sideNavStore((state) => state);
  const listParent = useRef<HTMLDivElement>(null);
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

  const [bottomLoading, setbottomLoading] = useState<boolean>(false);

  const [getList, result, loadingList] = useGetListPost();
  const [timelineData, settimelineData] = useState<Story[]>([]);

  const [refreshData, resultRefresh, loadingRefresh] = useRefreshTimeline();

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
        refreshData(timelineData[0].created_at);
        clearTimeout(timeout);
      }, 500);
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
    scrollDownUpdate();
  }

  function scrollDownUpdate() {
    if (listParent.current) {
      const { scrollTop, scrollHeight, clientHeight } = listParent.current;
      const bottomPosition = scrollTop + clientHeight;

      if (bottomPosition >= scrollHeight) {
        let sessionTimeline = getSessionStorage("timeline") as Story[];
        let timeout = setTimeout(() => {
          getList(sessionTimeline.length || 0);
          clearTimeout(timeout);
        }, 500);
        setbottomLoading(true);
      }
    }
  }

  function refreshDesktop() {
    let sessionTimeline = getSessionStorage("timeline") as Story[];
    if (sessionTimeline.length > 0) {
      listParent.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setLoading(true);
      setTimeout(() => {
        refreshData(sessionTimeline[0].created_at);
      }, 1000);
    }
  }

  useEffect(() => {
    if (!loadingRefresh) {
      if (resultRefresh.data.length > 0) {
        settimelineData([...resultRefresh.data, ...timelineData]);
      }
      setLoading(false);
    }
  }, [loadingRefresh]);

  useEffect(() => {
    setTimelineAction(refreshDesktop);
    let sessionTimeline = getSessionStorage("timeline") as Story[];
    if (!sessionTimeline || sessionTimeline.length === 0) {
      getList(0);
    } else {
      settimelineData(sessionTimeline);
    }
  }, []);

  useEffect(() => {
    if (!loadingList) {
      settimelineData([...timelineData, ...result.data]);
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
      } else {
        setbottomLoading(false);
      }
    }
  }, [loadingList]);

  useEffect(() => {
    if (timelineData.length > 0) {
      setSessionStorage("timeline", timelineData);
    }
  }, [timelineData]);

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
      <div className="md:flex gap-5 justify-center w-full items-center hidden">
        <h1 className="top-12 text-xl font-semibold font-nunito  capitalize text-black hidden md:inline">
          Timeline
        </h1>
      </div>

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
            key={el.id}
            lat={el.lat}
            lng={el.lng}
            id={el.id}
            createdAt={el.created_at}
            title={el.title}
            placeName={el.place_name || ""}
            username={el.user.username}
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
