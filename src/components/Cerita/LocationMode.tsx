import React, { useState } from "react";
import {  Location } from "types/types";
import BoxMobile from "components/Cerita/BoxMobile";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
} from "react-icons/hi";

import clsx from "clsx"
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import Paginate from "components/Pagination/Paginate";

type Props = {
  data: Location[];
  screenSize:number
};

const columns: ColumnDef<Location>[] = [
    {
      header: "No",
      accessorFn: (info, index) => index + 1,
      cell: (info) => info.getValue(),
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
    
   
  ];

export default function LocationMode({screenSize, ...props }: Props) {
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
    <div className="mt-10 md:mt-5 w-full  md:w-[800px]">
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
          <table className="mt-5 w-full rounded-xl border-spacing-0 border-separate border overflow-hidden">
            <thead className="bg-[#F1F2F3]">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="font text-center font-nunito font-base  px-8 py-3"
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
              
            {table.getRowModel().rows.length === 0 &&(
              <tr>
                <td colSpan={6} className="px-8 py-3 text-center tracking-wide">Yah,kamu pernah kemana-mana nih 😟</td>
              </tr>
            ) }
              {table.getRowModel().rows.length >0 && table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={clsx(
                        "px-8 py-3 text-center",
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
            
            {props.data.map((item,index)=>(
                <BoxMobile title={item.place_name} key={index}/>
            ))}
          </div>
        )}
        <Paginate totalPage={table.getPageCount()} className="ml-auto mt-5"/>
      </div>
  );
}
