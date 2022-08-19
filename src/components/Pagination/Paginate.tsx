import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import clsx from "clsx";

type PAGE_STATE = {
  length: number;
  active: number;
};

type Props = {
  id?: string;
  className?: string;
  buttonCallback?: (page: number) => void;
  totalPage: number;
  pageState: PAGE_STATE;
  pageStateHandler: ({ ...props }: PAGE_STATE) => void;
};

export function Paginate({ ...props }: Props) {
  const generatedArray = Array.from(
    Array(Math.ceil(props.totalPage / props.pageState.length)).keys()
  );

  let identifier = props.id ? `btn-num-${props.id}` : `btn-num`;
  function _handlePage(page: number) {
    props.pageStateHandler({ ...props.pageState, active: page });
  }

  function _generateTranslate(page: number) {
    let translateStyle = `translateX(${-(36 * (page - 1))}px)`;

    if (page === 0) {
      translateStyle = `translateX(0px)`;
    } else if (page === props.totalPage) {
      translateStyle = `translateX(${-(36 * props.totalPage)}px)`;
    }

    return translateStyle;
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
          props.pageState.active > 0 && ["opacity-100"],
          props.pageState.active === 0 && ["opacity-0"]
        )}
      >
        <button
          onClick={(e) => {
            _handlePage(0);
            if (props.buttonCallback) {
              props.buttonCallback(0);
            }
          }}
          disabled={props.pageState.active === 0}
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <HiChevronDoubleLeft className="w-5  h-5" />
        </button>
        <button
          disabled={props.pageState.active === 0}
          onClick={(e) => {
            _handlePage(props.pageState.active - 1);
            if (props.buttonCallback) {
              props.buttonCallback(props.pageState.active - 1);
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
            style={{
              transform:
                props.pageState.active > 0
                  ? _generateTranslate(props.pageState.active)
                  : "",
            }}
            className={clsx(
              "border  w-9 h-9 transition-all text-sm flex justify-center items-center rounded-lg p-2  font-nunito",
              identifier,
              props.pageState.active !== el && [
                "border-green-primary text-green-primary",
              ],
              props.pageState.active === el && [
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
          props.pageState.active <
            Math.ceil(props.totalPage / props.pageState.length) - 1 && [
            "opacity-100",
          ],
          props.pageState.active ===
            Math.ceil(props.totalPage / props.pageState.length) - 1 && [
            "opacity-0",
          ]
        )}
      >
        <button
          disabled={
            props.pageState.active ===
            Math.ceil(props.totalPage / props.pageState.length) - 1
          }
          onClick={(e) => {
            _handlePage(props.pageState.active + 1);
            if (props.buttonCallback) {
              props.buttonCallback(props.pageState.active + 1);
            }
          }}
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <MdKeyboardArrowRight className="w-5  h-5" />
        </button>
        <button
          onClick={(e) => {
            _handlePage(
              Math.ceil(props.totalPage / props.pageState.length) - 1
            );
            if (props.buttonCallback) {
              props.buttonCallback(
                Math.ceil(props.totalPage / props.pageState.length) - 1
              );
            }
          }}
          disabled={
            props.pageState.active ===
            Math.ceil(props.totalPage / props.pageState.length) - 1
          }
          className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito"
        >
          <HiChevronDoubleRight className="w-5  h-5" />
        </button>
      </div>
    </div>
  );
}

export function usePaginate(): [
  PAGE_STATE,
  ({ ...props }: PAGE_STATE) => void
] {
  const [pageState, setpageState] = useState<PAGE_STATE>({
    length: 5,
    active: 0,
  });

  function _setPageData({ ...props }: PAGE_STATE) {
    setpageState({
      ...props,
    });
  }

  return [pageState, _setPageData];
}
