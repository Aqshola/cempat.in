import clsx from "clsx";
import TimelineList from "components/Timeline/TimelineList";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export default function Timeline({}: Props) {
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
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
        <TimelineList />
      </div>
    </section>
  );
}
