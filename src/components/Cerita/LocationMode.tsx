import React, { useEffect, useState } from "react";
import { Location } from "types/types";
import BoxMobile from "components/Cerita/BoxMobile";

import clsx from "clsx";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import usePaginate from "components/Pagination/Paginate";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {
  data: Location[];
  screenSize: number;
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
    id: "lokasi",
  },
  {
    header: "Koordinat",
    accessorFn: (info) => info.lat + "," + info.lng,
    cell: (info) => info.getValue(),
  },
];

export default function LocationMode({ screenSize, ...props }: Props) {
  const [dataTable, setDataTable] = useState(() => [...props.data]);
  const [Paging, pageState, setPageState] = usePaginate(props.data.length);
  const [searchValue, setsearchValue] = useState<string>("");
  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    onGlobalFilterChange: setsearchValue,
    globalFilterFn: (row, columnId, value, addMeta) => {
      const valueRow = row.getValue(columnId) as string;
      return valueRow.toLowerCase().includes(searchValue.toLowerCase());
    },

    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchValue,
    },
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const queryPage = searchParams.get("page");

  useEffect(() => {
    setDataTable([...props.data]);
    table.setPageSize(pageState.length);
  }, [props.data]);

  useEffect(() => {
    if (queryPage) {
      setPageState({
        length: 5,
        active: Number(queryPage) - 1,
      });
    }
  }, [queryPage]);

  useEffect(() => {
    if (queryPage && table) {
      table.setPageSize(pageState.length);
      table.setPageIndex(Number(queryPage) - 1);
    }
  }, [queryPage, table]);

  useEffect(() => {
    table.setPageIndex(Number(queryPage) - 1);
  }, [pageState.active]);

  function _navigatePage(e: number) {
    navigate(`/cerita?mode=lokasi&page=${e + 1}`);
  }

  function _searchStory(e: React.ChangeEvent<HTMLInputElement>) {
    setsearchValue(e.target.value);
  }

  return (
    <div className="mt-10 md:mt-5 w-full">
      <div className="flex border-2 w-full rounded-xl border-[#F1F2F3] md:w-fit py-3 px-5 items-center gap-5 ml-auto">
        <label htmlFor="search">
          <img src="/icon/outline/search-logo-outline.svg" alt="" />
        </label>
        <input
          onChange={_searchStory}
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
                    className={clsx(
                      "font font-nunito font-base  px-8 py-3",
                      header.id !== "lokasi" && ["text-center "],
                      header.id === "lokasi" && ["text-left"]
                    )}
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
                  Yah,kamu pernah kemana-mana nih 😟
                </td>
              </tr>
            )}
            {table.getRowModel().rows.length > 0 &&
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className={clsx(
                        "px-8 py-3 ",
                        cell.column.id !== "lokasi" && ["text-center"],
                        cell.column.id === "lokasi" && [
                          "font-semibold text-green-primary text-left",
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
          {props.data
            .filter((item) =>
              item.place_name?.toLowerCase().includes(searchValue.toLowerCase())
            )
            .slice(
              pageState.active * pageState.length,
              (pageState.active * pageState.length) + pageState.length
            )
            .map((item, index) => (
              <BoxMobile title={item.place_name} key={index} />
            ))}
        </div>
      )}
      <Paging className="ml-auto mt-5" buttonCallback={_navigatePage} />
    </div>
  );
}
