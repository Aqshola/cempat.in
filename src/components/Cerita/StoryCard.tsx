import React from "react";
import clsx from "clsx";

type Props = {
  Icon: React.ReactNode;
  title: string;
  action?: () => any;
  active: boolean;
  count: number;
};

export default function StoryCard({ ...props }: Props) {
  return (
    <div
      aria-label={"action " + props.title}
      onClick={props.action}
      className={clsx(
        "cursor-pointer w-fit h-fit p-4 md:p-6 border-2  rounded-lg transition-all",
        !props.active && ["shadow-story-card text-green-primary border-green-primary  bg-white"],
        props.active && ["bg-green-primary text-white border-transparent"],
      )}
    >
      <div className="flex justify-evenly items-center">
        <h2 className="font-nunito font-medium text-3xl">
          {props.count.toLocaleString()}
        </h2>
        {props.Icon}
      </div>
      <p className="w-full">{props.title}</p>
    </div>
  );
}
