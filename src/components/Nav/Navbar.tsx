import React from 'react'
import { Link } from "react-router-dom";


export default function Navbar() {
  return (
    <div className="w-full flex px-5 md:px-10  p-5">
        <Link
          to={"/"}
          className="font-bold text-green-primary text-xl overflow-hidden"
        >
          CempatIn
        </Link>
        <div className="ml-auto flex gap-5 items-center  h-fit ">
          <Link
            to={"/register"}
            className="text-sm hover:shadow transition-shadow py-1 px-2"
          >
            Gabung
          </Link>

          <Link
            to={"/login"}
            className="hover:shadow transition-shadow text-sm py-1 px-2 btn bg-green-primary text-white rounded"
          >
            Masuk
          </Link>
        </div>
      </div>
  )
}