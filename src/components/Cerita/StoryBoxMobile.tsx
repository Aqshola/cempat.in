import clsx from "clsx";
import React, { useState } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiChevronRight,
} from "react-icons/hi";
type Props = {};

export default function StoryBoxMobile({}: Props) {
  const [open, setopen] = useState<boolean>(false);
  return (
    <div className="transition-all flex overflow-hidden flex-col py-3 px-2 border border-green-primary rounded">
      <div className="flex gap-5 text-green-primary font-nunito">
        <button
          className={clsx("transition-all", open && ["rotate-90"])}
          onClick={() => setopen(!open)}
        >
          <HiChevronRight className="w-5 h-5 text-green-primary" />
        </button>
        <h2>A Story within place</h2>
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
      </div>
      <div
        className={clsx(
          "transition-all ",
          open && ["mt-2 h-auto opacity-100"],
          !open && ["mt-0 opacity-0 h-0"]
        )}
      >
        <table className="text-sm font-nunito">
          <tbody>
            <tr>
              <td>Lokasi</td>
              <td>:</td>
              <td className="pl-1">Jakarta</td>
            </tr>
            <tr>
              <td>Koordinat</td>
              <td>:</td>
              <td className="pl-1"> -6.914744, 107.60981</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td>:</td>
              <td className="pl-1">2020-01-01</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
