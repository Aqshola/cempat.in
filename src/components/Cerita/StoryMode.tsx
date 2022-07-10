import React, { useState } from "react";
import { Story } from "types/types";
import StoryBoxMobile from "components/Cerita/BoxMobile";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

import clsx from "clsx";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { data } from "autoprefixer";

type Props = {
  data: Story[];
  screenSize: number;
};

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

export default function StoryMode({ screenSize, ...props }: Props) {
  const [dataTable, setDataTable] = useState(() => [...props.data]);

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: 10,
    debugTable: true,
  });

  return (
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
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-8 py-3 text-center tracking-wide">
                  Yah,kamu belum punya cerita nih 😟
                </td>
              </tr>
            )}
            {table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.map((row) => (
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
          {props.data.map((item, index) => (
            <StoryBoxMobile
              key={index}
              title={item.title}
              detailView={true}
              detailElement={
                <table className="text-sm font-nunito">
                  <tbody>
                    <tr>
                      <td>Lokasi</td>
                      <td>:</td>
                      <td className="pl-1">{item.place_name}</td>
                    </tr>
                    <tr>
                      <td>Koordinat</td>
                      <td>:</td>
                      <td className="pl-1">
                        {" "}
                        {item.lat}, {item.lng}
                      </td>
                    </tr>
                    <tr>
                      <td>Tanggal</td>
                      <td>:</td>
                      <td className="pl-1">{item.created_at}</td>
                    </tr>
                  </tbody>
                </table>
              }
              actionView={true}
              actionElement={
                <div className="flex gap-2 self-end ml-auto w-fit">
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
              }
            />
          ))}
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
  );
}
