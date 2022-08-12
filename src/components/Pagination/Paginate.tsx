import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import clsx from "clsx";
type Props = {
  className?: string;
  buttonCallback?: (page: number) => void;
};

type PAGE_STATE = {
  length: number;
  active: number;
};
export default function Paginate(
  totalPage: number
): [
  ({ ...props }: Props) => JSX.Element,
  PAGE_STATE,
  ({ ...props }: PAGE_STATE) => void
] {
  const [pageState, setpageState] = useState<PAGE_STATE>({
    length: 5,
    active: 0,
  });
  const generatedArray = Array.from(
    Array(Math.ceil(totalPage / pageState.length)).keys()
  );
  function _handlePage(page: number) {
    setpageState({ ...pageState, active: page });
    let listBtn = Array.from(
      document.getElementsByClassName(
        "btn-num"
      ) as HTMLCollectionOf<HTMLElement>
    );
    listBtn.forEach((e) => {
      e.style.transform = `translateX(${-(36 * (page - 2))}px)`;
      
    });

  }

  function _setPageData({ ...props }: PAGE_STATE) {
    setpageState({
      ...props,
    });
  }



  const PageElement = React.useMemo(() => {
    const PageList = ({ ...props }: Props) => (
      <div
        className={clsx(
          "flex gap-3 items-center  w-full justify-center md:justify-start md:w-fit",
          props.className
        )}
      >
        <div
          className={clsx(
            "transition-all flex",
            pageState.active > 0 && ["opacity-100"],
            pageState.active === 0 && ["opacity-0"]
          )}
        >
          <button
            onClick={(e) => {
              _handlePage(0);
              if (props.buttonCallback) {
                props.buttonCallback(0);
              }
            }}
            disabled={pageState.active === 0}
            className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
          >
            <HiChevronDoubleLeft className="w-5  h-5" />
          </button>
          <button
            disabled={pageState.active === 0}
            onClick={(e) => {
              _handlePage(pageState.active - 1);
              if (props.buttonCallback) {
                props.buttonCallback(pageState.active - 1);
              }
            }}
            className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
          >
            <MdKeyboardArrowLeft className="w-5  h-5" />
          </button>
        </div>

        <div className="flex gap-2 overflow-hidden  px-2 w-28">
          {generatedArray.map((el) => (
            <button
              onClick={(e) => {
                if (props.buttonCallback) {
                  props.buttonCallback(el);
                }
                _handlePage(el);
              }}
              key={el}
              className={clsx(
                "border btn-num w-9 h-9 transition-all text-sm flex justify-center items-center rounded-lg p-2  font-nunito",
                pageState.active !== el && [
                  "border-green-primary text-green-primary",
                ],
                pageState.active === el && [
                  "border-transparent bg-green-primary text-white",
                ]
              )}
            >
              {el + 1}
            </button>
          ))}
        </div>

        <div
          className={clsx(
            "transition-all flex",
            pageState.active < Math.ceil(totalPage / pageState.length) - 1 && [
              "opacity-100",
            ],
            pageState.active ===
              Math.ceil(totalPage / pageState.length) - 1 && ["opacity-0"]
          )}
        >
          <button
            disabled={
              pageState.active === Math.ceil(totalPage / pageState.length) - 1
            }
            onClick={(e) => {
              _handlePage(pageState.active + 1);
              if (props.buttonCallback) {
                props.buttonCallback(pageState.active + 1);
              }
            }}
            className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
          >
            <MdKeyboardArrowRight className="w-5  h-5" />
          </button>
          <button
            onClick={(e) => {
              _handlePage(Math.ceil(totalPage / pageState.length) - 1);
              if (props.buttonCallback) {
                props.buttonCallback(
                  Math.ceil(totalPage / pageState.length) - 1
                );
              }
            }}
            disabled={
              pageState.active === Math.ceil(totalPage / pageState.length) - 1
            }
            className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
          >
            <HiChevronDoubleRight className="w-5  h-5" />
          </button>
        </div>
      </div>
    );

    return PageList;
  }, [pageState, generatedArray]);

  return [PageElement, pageState, _setPageData];
}
