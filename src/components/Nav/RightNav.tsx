import React, { useRef} from "react";
import useOutsideClick from "helper/useOutsideClick";
import { CgClose } from "react-icons/cg";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  children:React.ReactNode
  
};

export default function RightNav({
  onCloseEditor,
  onOutsideEditor,
  showEditor,
  children
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
        "transition-all duration-500 min-h-screen w-full md:w-1/2 absolute right-0 top-0 bg-white z-20 py-7 px-4 flex flex-col " +
        (showEditor ? "translate-x-0 visible" : " translate-x-full invisible")
      }
    >
      <button className="w-fit h-fit" onClick={onCloseEditor}>
        <CgClose className="w-6 h-6 text-[#03C88E]" />
      </button>

      {children}
    </div>
  );
}
