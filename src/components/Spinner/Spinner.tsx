import clsx from "clsx";
import React from "react";

type Props = {
  loading: boolean;
};

export default function Spinner({ ...props }: Props) {
  return (
    <span
      aria-label="loading"
      className={clsx(
        "m-auto border-t-4 border-t-green-primary rounded-full w-8 h-8 transition-all border-green-200  border-4  mx-auto block",
        props.loading && ["h-8  animate-spin opacity-100"],
        !props.loading && ["h-0 opacity-0   overflow-hidden"]
      )}
    ></span>
  );
}
