import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import clsx from "clsx";
type Props = {
  className?: string;
  totalPage: number;
};

export default function Paginate({ ...props }: Props) {
  return (
    <div
      className={clsx(
        "flex gap-3 items-center  w-full justify-center md:justify-start md:w-fit mt-10",
        props.className
      )}
    >
      <button className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito">
        <HiChevronDoubleLeft className="w-5  h-5" />
      </button>
      <button className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito">
        <MdKeyboardArrowLeft className="w-5  h-5" />
      </button>
      {[...Array(props.totalPage)].slice(1, 4).map((el, i) => (
        <button
          key={i}
          className="border border-green-primary w-9 h-9 text-sm flex justify-center items-center rounded-lg p-2 text-green-primary font-nunito"
        >
          {i + 1}
        </button>
      ))}
      <button className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito">
        <MdKeyboardArrowRight className="w-5  h-5" />
      </button>
      <button className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito">
        <HiChevronDoubleRight className="w-5  h-5" />
      </button>
    </div>
  );
}
