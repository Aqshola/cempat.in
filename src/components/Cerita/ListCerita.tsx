import Button from "components/Button/Button";

import useDelete from "hooks/cerita/useDelete";
import parseDateString from "hooks/helper/parseDateString";
import React, { useRef } from "react";
import { MdPlace } from "react-icons/md";
import { authStore } from "store/authStore";
import { Location } from "types/types";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  coor: Location;
  id: string;
  title: string;
  place_name: string;
  date: string;
  deleteCallback: (...T: any) => void;
};

function ListCerita({
  id,
  title,
  place_name,
  date,
  coor,
  deleteCallback,
}: Props) {
  const user_id = authStore((state) => state.authData?.user_id);
  const [deleteCerita] = useDelete();
  const ListCeritaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const _handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const _handleClick = () => {
    navigate(`/peta?lat=${coor.lat}&lng=${coor.lng}&id=${id}`);
  };

  return (
    <div
      onClick={_handleClick}
      ref={ListCeritaRef}
      className="w-full h-full border-2 border-green-primary p-3 cursor-pointer"
    >
      <div className="flex items-center">
        <Link
          to={`/peta?lat=${coor.lat}&lng=${coor.lng}&id=${id}`}
          className="p-1 hover:bg-green-primary hover:text-white transition-all text-green-primary rounded-sm"
        >
          <h1 className="text-xl font-semibold justify-center">{title}</h1>
        </Link>
        <p className="text-xs ml-auto">{parseDateString(date)}</p>
      </div>
      <div className="flex items-end">
        <p className="mt-5 font-medium w-48 text-xs flex items-end gap-2">
          <span>
            <MdPlace className="w-5 h-5" />
          </span>
          <span className="truncate">{place_name}</span>
        </p>
        <div className="flex gap-3 ml-auto">
          <Button
            type="button"
            size="sm"
            variant="danger"
            onClick={_handleDelete}
          >
            Hapus
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ListCerita;
