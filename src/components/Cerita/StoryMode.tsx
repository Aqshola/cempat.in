import React, { useEffect, useState } from "react";
import { Story } from "types/types";
import StoryBoxMobile from "components/Cerita/BoxMobile";

import clsx from "clsx";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { usePaginate, Paginate } from "components/Pagination/Paginate";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import parseDateString from "hooks/helper/parseDateString";
import { useAnimation, motion } from "framer-motion";
import { sideNavStore } from "store/navStore";

type Props = {
  data: Story[];
  screenSize: number;
  deleteCallback?: (id: string, place_name: string) => void;
};

export default function StoryMode({ screenSize, ...props }: Props) {
  const animation = useAnimation();
  const navigate = useNavigate();
  const { setMobileNavTitle } = sideNavStore((state) => state);

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
      cell: (info) => parseDateString(info.getValue()),
    },
    {
      header: "Aksi",
      accessorFn: (info) => (
        <div className="flex gap-5">
          <Link
            to={`/peta?id=${info.id}&&lat=${info.lat}&&lng=${info.lng}`}
            aria-label="Update"
            className="w-6 h-6  flex justify-center items-center rounded-lg  bg-blue-primary "
          >
            <img src="/icon/filled/update-logo-filled.svg" alt="Edit" />
          </Link>

          <button
            onClick={async () => {
              if (props.deleteCallback) {
                props.deleteCallback(info.id, info.place_name || "");
              }
            }}
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

  const [dataTable, setDataTable] = useState(() => [...props.data]);
  const [pageState, handlerPage] = usePaginate();

  const [searchValue, setsearchValue] = useState<string>("");
  const [searchPageLength, setsearchPageLength] = useState<number>(0);

  const [searchParams] = useSearchParams();

  const queryPage = searchParams.get("page");

  const table = useReactTable({
    data: dataTable,
    manualPagination: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    setMobileNavTitle("Cerita");
  }, []);

  useEffect(() => {
    setDataTable([...props.data]);
    table.setPageSize(pageState.length);
    setsearchPageLength(props.data.length);
  }, [props.data]);

  useEffect(() => {
    if (queryPage) {
      handlerPage({
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
    navigate(`/cerita?page=${e + 1}`);
  }

  function _searchStory(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim() === "") {
      setsearchPageLength(props.data.length);
    } else {
      setsearchValue(e.target.value);
      let totalSearchLength = props.data.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      ).length;

      setsearchPageLength(Math.ceil(totalSearchLength / pageState.length));
    }
  }

  async function _deleteList(id: string, place_name: string) {
    await animation.start((j) => {
      if (j === id) {
        return {
          opacity: 0,
          h: 0,
          x: -100,
        };
      }
      return {
        opacity: 1,
        position: "relative",
        y: 0,
      };
    });

    if (props.deleteCallback) {
      props.deleteCallback(id, place_name);
    }
  }

  return (
    <div className="mt-10 md:mt-5 w-full">
      <div className="flex border-2 w-full rounded-xl border-[#F1F2F3] md:w-fit py-3 px-5 items-center gap-5 ml-auto">
        <label htmlFor="search">
          <img src="/icon/outline/search-logo-outline.svg" alt="" />
        </label>
        <input
          id="search"
          type="text"
          onChange={_searchStory}
          className="outline-none w-full focus:outline-none text-sm placeholder:text-sm"
          placeholder="Cari judul atau tempat"
        />
      </div>
      {screenSize >= 720 && (
        <div className="w-full md:overflow-x-scroll lg:overflow-hidden  min-h-[300px]">
          <table className="mt-5 rounded-xl w-full border-spacing-0 border-separate border overflow-hidden">
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
                  <td
                    colSpan={6}
                    className="px-8 py-3 text-center tracking-wide"
                  >
                    Yah,kamu belum punya cerita nih 😟
                  </td>
                </tr>
              )}
              {table.getRowModel().rows.length > 0 &&
                table
                  .getRowModel()
                  .rows.filter((item) => {
                    let judul = item.getValue("judul") as string;
                    return judul
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .slice(
                    pageState.active * pageState.length,
                    pageState.active * pageState.length + pageState.length
                  )
                  .map((row) => (
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
        </div>
      )}

      {screenSize < 720 && (
        <div className="mt-5 space-y-3 min-h-[300px]">
          {props.data.length === 0 && (
            <div className="px-8 py-3 text-center tracking-wide" >Yah,kamu belum punya cerita nih 😟</div>
          )}
          {props.data.length > 0 &&
            props.data
              .filter((item) =>
                item.title.toLowerCase().includes(searchValue.toLowerCase())
              )
              .slice(
                pageState.active * pageState.length,
                pageState.active * pageState.length + pageState.length
              )
              .map((item, index) => (
                <motion.div key={item.id} custom={item.id} animate={animation}>
                  <StoryBoxMobile
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
                            <td className="pl-1">
                              {" "}
                              {parseDateString(item.created_at)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    }
                    actionView={true}
                    actionElement={
                      <div className="flex gap-2 self-end ml-auto w-fit">
                        <Link
                          to={`/peta?id=${item.id}&&lat=${item.lat}&&lng=${item.lng}`}
                          aria-label="Update"
                          className="w-6 h-6  flex justify-center items-center rounded-lg  bg-blue-primary "
                        >
                          <img
                            src="/icon/filled/update-logo-filled.svg"
                            alt="Edit"
                          />
                        </Link>
                        <button
                          aria-label="Delete"
                          className="w-6 h-6  flex justify-center items-center rounded-lg  bg-red-primary "
                          onClick={() => {
                            _deleteList(item.id, item.place_name || "");
                          }}
                        >
                          <img
                            src="/icon/filled/delete-logo-filled.svg"
                            alt="Edit"
                          />
                        </button>
                      </div>
                    }
                  />
                </motion.div>
              ))}
        </div>
      )}

      <Paginate
        buttonCallback={_navigatePage}
        className="ml-auto mt-5"
        pageState={pageState}
        pageStateHandler={handlerPage}
        totalPage={searchPageLength}
      />
    </div>
  );
}
