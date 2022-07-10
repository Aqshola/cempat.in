import clsx from "clsx";
import React, { useState } from "react";
import {
  HiChevronRight,
} from "react-icons/hi";
type Props = {
  actionView?: boolean;
  detailView?: boolean;
  detailElement?: React.ReactNode;
  actionElement?: React.ReactNode;
  title: string | null | undefined;
};

export default function StoryBoxMobile({ ...props }: Props) {
  const [open, setopen] = useState<boolean>(false);
  return (
    <div className="transition-all flex overflow-hidden flex-col py-3 px-2 border border-green-primary rounded">
      <div className="flex gap-5 text-green-primary font-nunito">
        {props.detailView && (
          <button
            className={clsx("transition-all", open && ["rotate-90"])}
            onClick={() => setopen(!open)}
          >
            <HiChevronRight className="w-5 h-5 text-green-primary" />
          </button>
        )}
        <h2>{props.title}</h2>
        {props.actionView && props.actionElement}
      </div>
      <div
        className={clsx(
          "transition-all ",
          open && ["mt-2 h-auto opacity-100"],
          !open && ["mt-0 opacity-0 h-0"]
        )}
      >
        {props.detailView && props.detailElement}
      </div>
    </div>
  );
}
