import ListCerita from "components/Cerita/ListCerita";
import useUserStory from "hooks/cerita/useUserStory";
import { getLocalStorage, setLocalStorage } from "hooks/helper/useLocalStorage";
import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronRight,
} from "react-icons/hi";

import { authStore } from "store/authStore";
import { sideNavStore } from "store/navStore";
import { Story, ApiLocation } from "types/types";
import StroyCard from "components/Cerita/StroyCard";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";
import Button from "components/Button/Button";
import useScreenSize from "hooks/helper/useScreenSize";
import StoryBoxMobile from "components/Cerita/StoryBoxMobile";

const dummyCerita: Story[] = [
  {
    title: "Lalatina",
    content: "Lalatina adalah cerita yang menceritakan tentang kehidupan",
    id: "sasa",
    user_id: "sasasa",
    created_at: "2020-01-01",
    user: {
      username: "sasa",
    },
    lat: -6.914744,
    lng: 107.60981,
    place_name: "Holy Land",
  },
  {
    title: "Lalatina",
    content: "Lalatina adalah cerita yang menceritakan tentang kehidupan",
    id: "sasa",
    user_id: "sasasa",
    created_at: "2020-01-01",
    user: {
      username: "sasa",
    },
    lat: -6.914744,
    lng: 107.60981,
    place_name: "Holy Land",
  },
];

const columns: ColumnDef<Story>[] = [
  {
    header: "No",
    accessorFn: (info, index) => index + 1,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "title",
    header: "Cerita",
    cell: (info) => info.getValue(),
    id: "judul",
  },
  {
    accessorKey: "place_name",
    header: "Lokasi",
    cell: (info) => info.getValue(),
  },
  {
    header: "Koordinat",
    accessorFn: (info) => info.lat + "," + info.lng,
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
    cell: (info) => info.getValue(),
  },
  {
    header: "Aksi",
    accessorFn: (info) => (
      <div className="flex gap-5">
        <button
          aria-label="Update"
          className="w-6 h-6  flex justify-center items-center rounded-lg  bg-blue-primary "
        >
          <img src="/icon/filled/update-logo-filled.svg" alt="Edit" />
        </button>
        <button
          aria-label="Delete"
          className="w-6 h-6  flex justify-center items-center rounded-lg  bg-red-primary "
        >
          <img src="/icon/filled/delete-logo-filled.svg" alt="Edit" />
        </button>
      </div>
    ),
    cell: (info) => info.getValue(),
  },
];

function Cerita() {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  const [storyList, setstoryList] = useState<Story[]>([]);
  const [getUserStory, data, loading] = useUserStory();
  const user_id = authStore((state) => state.authData?.user_id);

  const [dataTable, setDataTable] = React.useState(() => [...dummyCerita]);
  const [getSize, screenSize] = useScreenSize();
  const [listMode, setlistMode] = useState<"cerita" | "lokasi">("cerita");

  useEffect(() => {
    getSize();
  });

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: 10,
    debugTable: true,
  });

  // useEffect(() => {
  //   getUserStory(user_id || "");
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     setstoryList(data.data);
  //   }
  // }, [loading]);

  // const deleteCallback = (id: string) => {
  //   setstoryList(storyList.filter((story) => story.id !== id));
  //   let localData = getLocalStorage<ApiLocation[]>("list_location");
  //   if (localData) {
  //     localData = localData.filter((location) => location.id !== Number(id));
  //     setLocalStorage("list_location", localData);
  //   }

  // };

  return (
    <div className="h-screen py-32 md:py-12 px-5 w-full md:px-14">
      <h1 className="top-12 text-xl font-semibold font-nunito  capitalize text-black w-full text-center hidden md:inline">
        Cerita
      </h1>
      <div className="md:mt-10 flex gap-10 justify-between md:justify-start">
        <StroyCard
          action={() => {
            setlistMode("cerita");
          }}
          active={listMode === "cerita"}
          title="Cerita ditulis"
          count={24}
          Icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              className={
                listMode === "cerita" ? "fill-white" : "fill-green-primary"
              }
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.2535 2.14902C13.1247 2.07856 12.9803 2.04163 12.8335 2.04163C12.6867 2.04163 12.5423 2.07856 12.4135 2.14902L3.30183 7.11902C3.10949 7.22401 2.93727 7.36226 2.79316 7.52735L12.8335 13.0025L22.8738 7.52502C22.7296 7.36036 22.5574 7.22252 22.3652 7.11785L13.2535 2.14785V2.14902ZM2.3335 18.375V9.26918L12.4135 14.7677C12.5423 14.8381 12.6867 14.8751 12.8335 14.8751C12.9803 14.8751 13.1247 14.8381 13.2535 14.7677L23.3335 9.26918V18.375C23.3335 19.3806 22.934 20.3451 22.2229 21.0561C21.5119 21.7672 20.5474 22.1667 19.5418 22.1667H6.12516C5.11955 22.1667 4.15513 21.7672 3.44405 21.0561C2.73297 20.3451 2.3335 19.3806 2.3335 18.375V18.375ZM24.5013 8.76285C25.0381 9.10547 25.4798 9.57787 25.7857 10.1364C26.0916 10.6949 26.2517 11.3216 26.2513 11.9583V18.9583C26.2513 20.5828 25.606 22.1407 24.4574 23.2894C23.3087 24.438 21.7508 25.0833 20.1263 25.0833H9.62633C8.98914 25.0841 8.36204 24.9242 7.80307 24.6183C7.2441 24.3124 6.77133 23.8705 6.4285 23.3333H20.1252C21.2855 23.3333 22.3983 22.8724 23.2188 22.0519C24.0392 21.2315 24.5002 20.1187 24.5002 18.9583V8.76285H24.5013Z"
                fill="inherit"
              />
            </svg>
          }
        />
        <StroyCard
          action={() => {
            setlistMode("lokasi");
          }}
          active={listMode === "lokasi"}
          title="Tempat dikunjungi"
          count={24}
          Icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              xmlns="http://www.w3.org/2000/svg"
              className={
                listMode === "lokasi" ? "fill-white" : "fill-green-primary"
              }
            >
              <path
                d="M10.388 19.25H14.609C14.5922 19.444 14.5837 19.6386 14.5833 19.8334C14.5833 21.2345 15.1165 22.5879 16.0673 23.9027C15.4373 25.0215 14.7175 25.6655 14 25.6655C12.6035 25.6655 11.2 23.2225 10.4557 19.5942L10.388 19.2512V19.25ZM10.1197 17.5H15.0197C15.5936 16.0354 16.6838 14.8315 18.0845 14.1155V14.0012C18.0845 13.2009 18.0542 12.4204 17.9958 11.6679H10.0042L9.96567 12.2372C9.86429 13.9926 9.91582 15.7535 10.1197 17.5V17.5ZM21 13.4167C21.8557 13.4155 22.703 13.5861 23.4916 13.9183C24.2802 14.2506 24.994 14.7378 25.5908 15.351C25.7329 14.1224 25.6805 12.879 25.4357 11.6667H19.754L19.7983 12.4332C19.8158 12.7925 19.8263 13.1565 19.8322 13.5229C20.2102 13.4529 20.6022 13.4167 21 13.4167ZM3.577 19.2512H8.60067C9.02533 21.6802 9.7475 23.7475 10.6913 25.193C7.72512 24.3127 5.22836 22.2933 3.74733 19.5767L3.577 19.2512ZM2.5655 11.6679H8.24717C8.12512 13.3851 8.13799 15.1093 8.28567 16.8245L8.35217 17.5012H2.86533C2.27437 15.6133 2.17082 13.6066 2.56433 11.6679H2.5655ZM17.4347 3.00653L17.3087 2.80819C19.0427 3.32287 20.6338 4.23266 21.9569 5.46608C23.28 6.6995 24.2991 8.22294 24.934 9.91669H19.579C19.2103 7.09803 18.4625 4.67603 17.4347 3.00653V3.00653ZM10.549 2.85136L10.6913 2.80819C9.6635 4.38319 8.89933 6.69203 8.49333 9.40336L8.421 9.91669H3.06833C3.69423 8.24641 4.69377 6.74135 5.99052 5.51659C7.28727 4.29182 8.84689 3.37978 10.5502 2.85019L10.549 2.85136ZM14 2.33569C15.5388 2.33569 17.087 5.30136 17.7497 9.54919L17.8045 9.91669H10.1955C10.8267 5.47286 12.418 2.33569 14 2.33569ZM26.25 19.8334C26.25 18.441 25.6969 17.1056 24.7123 16.121C23.7277 15.1365 22.3924 14.5834 21 14.5834C19.6076 14.5834 18.2723 15.1365 17.2877 16.121C16.3031 17.1056 15.75 18.441 15.75 19.8334C15.75 22.0069 17.4067 24.2842 20.65 26.7167C20.751 26.7924 20.8738 26.8334 21 26.8334C21.1262 26.8334 21.249 26.7924 21.35 26.7167C24.5933 24.2842 26.25 22.0069 26.25 19.8334ZM19.25 19.8334C19.25 19.3692 19.4344 18.9241 19.7626 18.5959C20.0908 18.2677 20.5359 18.0834 21 18.0834C21.4641 18.0834 21.9092 18.2677 22.2374 18.5959C22.5656 18.9241 22.75 19.3692 22.75 19.8334C22.75 20.2975 22.5656 20.7426 22.2374 21.0708C21.9092 21.399 21.4641 21.5834 21 21.5834C20.5359 21.5834 20.0908 21.399 19.7626 21.0708C19.4344 20.7426 19.25 20.2975 19.25 19.8334Z"
                fill="inherit"
              />
            </svg>
          }
        />
      </div>

      <div className="mt-10 md:mt-5 w-full  md:w-fit">
        <div className="flex border-2 w-full rounded-xl border-[#F1F2F3] md:w-fit py-3 px-5 items-center gap-5 ml-auto">
          <label htmlFor="search">
            <img src="/icon/outline/search-logo-outline.svg" alt="" />
          </label>
          <input
            id="search"
            type="text"
            className="outline-none focus:outline-none text-sm placeholder:text-sm"
            placeholder="Cari judul atau tempat"
          />
        </div>
        {screenSize >= 720 && (
          <table className="mt-5 rounded-xl border-spacing-0 border-separate border overflow-hidden">
            <thead className="bg-[#F1F2F3]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="font font-nunito font-base  px-8 py-3"
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={clsx(
                        "px-8 py-3",
                        cell.column.id === "judul" && [
                          "font-semibold text-green-primary",
                        ]
                      )}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {screenSize < 720 && (
          <div className="mt-5 space-y-3">
            <StoryBoxMobile />
            <StoryBoxMobile />
          </div>
        )}
        <div className="flex gap-3 items-center ml-auto w-full justify-center md:justify-start md:w-fit mt-5">
          <button className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito">
            <HiChevronDoubleLeft className="w-5  h-5" />
          </button>
          <button className="border-gray-100 w-7 h-7 text-sm flex justify-center items-center rounded-lg  font-nunito">
            <MdKeyboardArrowLeft className="w-5  h-5" />
          </button>
          {[...Array(table.getPageCount())].slice(1, 4).map((el, i) => (
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
      </div>

      {/* <div className={"py-5 transition-all flex items-center"}>
        <button
          className={sideNav ? "opacity-0 invisible" : " opacity-100 visible"}
          onClick={() => showSideNav(true)}
          disabled={sideNav}
        >
          <GiHamburgerMenu className="w-7 h-7 " />
        </button>
        <span className="text-center w-full">
          <h1 className="text-xl font-semibold">Cerita yang ditulis</h1>
        </span>
      </div>
      <div>
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <span
              aria-label="loading"
              className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
            ></span>
          </div>
        ) : (
          <div
            id="list-cerita"
            className="transition-all mt-10 grid grid-cols-12 gap-5 "
          >
            {storyList.length > 0 ? (
              storyList.map((cerita: Story) => (
                <div
                  className="md:col-span-3 col-span-12 h-full"
                  key={cerita.id}
                >
                  <ListCerita
                    deleteCallback={deleteCallback}
                    coor={{
                      lat: cerita.lat,
                      lng: cerita.lng,
                    }}
                    id={cerita.id}
                    title={cerita.title}
                    place_name={cerita.place_name || ""}
                    date={cerita.created_at}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-12 text-center font-medium text-lg text-pink-500">
                <h1 className="w-full">
                  kamu belum punya cerita nih, <br />
                  yuk tulis ceritamu
                </h1>
              </div>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Cerita;
