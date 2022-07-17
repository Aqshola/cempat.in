import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
type Props = {
  className?: string;
  totalPage: number;
};

export default function Paginate({ ...props }: Props) {
  const generatedArray = Array.from(Array(props.totalPage).keys());
  const [slicedArray, setslicedArray] = useState(generatedArray.slice(0, 3));
  const xOffset = 100;
  const variants = {
    enter: (direction: any) => ({
      x: direction > 0 ? xOffset : -xOffset,
      opacity: 0,
    }),
    active: {
      x: 0,
      opacity: 1,
      transition: { delay: 0.2 },
    },
    exit: (direction: any) => ({
      x: direction > 0 ? -xOffset : xOffset,
      opacity: 0,
    }),
  };

  const [active, setactive] = useState<number>(1);
  const [firstIndex, setfirstIndex] = useState<number>(slicedArray[0]);
  const [lastIndex, setLastIndex] = useState(
    slicedArray[slicedArray.length - 1] + 1
  );

  function _handlePage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    page: number
  ) {
    setactive(page);
    console.log(e.currentTarget.offsetLeft);

    if (page > 1 && page < props.totalPage) {
      if (page < slicedArray[slicedArray.length - 1] + 1) {
        if (page === slicedArray[0] + 1) {
          setfirstIndex(page - 2);
          setLastIndex(page);
          let sliced = generatedArray.slice(page - 2, page + 1);
          setslicedArray(sliced);
        } else {
          setLastIndex(slicedArray[slicedArray.length - 1] + 1);
          setfirstIndex(slicedArray[0]);
        }
      } else {
        setLastIndex(page + 2);
        setfirstIndex(page);
        let sliced = generatedArray.slice(page - 1, page + 2);
        setslicedArray(sliced);
      }
    } else if (page === 1) {
      setslicedArray(generatedArray.slice(0, 3));
      setfirstIndex(page);
      setLastIndex(page + 2);
    } else if (page === props.totalPage) {
      setfirstIndex(page - 2);
      setLastIndex(page);
      setslicedArray(generatedArray.slice(page - 2, page + 1));
    }

    let listBtn = Array.from(
      document.getElementsByClassName(
        "btn-num"
      ) as HTMLCollectionOf<HTMLElement>
    );
    listBtn.forEach((e) => {
      e.style.transform = `translateX(${-(36 * (page - 2))}px)`;
    });
  }

  return (
    <div
      className={clsx(
        "flex gap-3 items-center  w-full justify-center md:justify-start md:w-fit",
        props.className
      )}
    >
      <div
        className={clsx(
          "transition-all flex",
          active > 1 && ["opacity-100"],
          active === 1 && ["opacity-0"]
        )}
      >
        <button
          onClick={(e) => _handlePage(e, 1)}
          disabled={active === 1}
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <HiChevronDoubleLeft className="w-5  h-5" />
        </button>
        <button
          disabled={active === 1}
          onClick={(e) => _handlePage(e, active - 1)}
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <MdKeyboardArrowLeft className="w-5  h-5" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          className="flex gap-2 overflow-hidden  px-2 w-28"
          initial={{
            x: 100,
          }}
          animate={{
            x: 0,
          }}
        >
          {generatedArray.map((el) => (
            <button
              onClick={(e) => {
                _handlePage(e, el + 1);
              }}
              key={el + 1}
              className={clsx(
                "border btn-num w-9 h-9 transition-all text-sm flex justify-center items-center rounded-lg p-2  font-nunito",
                active !== el + 1 && [
                  "border-green-primary text-green-primary",
                ],
                active === el + 1 && [
                  "border-transparent bg-green-primary text-white",
                ]
              )}
            >
              {el + 1}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>

      <div
        className={clsx(
          "transition-all flex",
          active < props.totalPage && ["opacity-100"],
          active === props.totalPage && ["opacity-0"]
        )}
      >
        <button
          disabled={active === props.totalPage}
          onClick={(e) => _handlePage(e, active + 1)}
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <MdKeyboardArrowRight className="w-5  h-5" />
        </button>
        <button
          onClick={(e) => _handlePage(e, props.totalPage)}
          disabled={active === props.totalPage}
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <HiChevronDoubleRight className="w-5  h-5" />
        </button>
      </div>
    </div>
  );
}
