import React, { useRef } from "react";
import useOutsideClick from "hooks/helper/useOutsideClick";
import { CgClose } from "react-icons/cg";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: (...T:any) => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  leftEvent?:React.ReactNode

};

export default function RightNav({
  onCloseEditor,
  onOutsideEditor,
  showEditor,
  children,
  title,
  leftEvent
}: Props) {
  const rightNavRef = useRef(null);
  useOutsideClick(rightNavRef, () => {
    onOutsideEditor();
  });
  return (
    <div
      ref={rightNavRef}
      id="right-nav"
      className={
        "transition-all hidden  duration-500 h-screen overflow-y-scroll w-full md:w-2/5 absolute right-0 top-0 bg-white z-30 px-4 md:flex flex-col  rounded-l-3xl" +
        (showEditor ? "translate-x-0 visible" : " translate-x-full invisible")
      }
    >
      <div className="flex gap-5 items-center sticky top-0 bg-white py-7 z-30">
        <button className="w-fit h-fit" onClick={onCloseEditor}>
          <CgClose className="w-6 h-6" />
        </button>
        <span className="w-full">{title}</span>
        <span className="ml-auto">{leftEvent}</span>
      </div>

      {children}
    </div>
  );
}
