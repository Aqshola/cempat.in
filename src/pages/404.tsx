import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authStore } from "store/authStore";

type Props = {};

export default function NotFound() {
  const isLogin=authStore(state=>state.isAuth)
  return (
    <div className="min-h-screen flex items-center justify-center flex-col w-full">
      <h1 className="text-2xl text-green-primary text-center font-semibold">Yah, Halaman ini belum ada nih</h1>
      <p className="mt-2">Yuk balik ke {isLogin?<Link className="underline hover:bg-green-primary transition-all p-0.5 rounded-sm hover:text-white hover:no-underline" to={"/peta"}>Peta</Link>:<Link className="underline hover:bg-green-primary transition-all p-0.5 rounded-sm hover:text-white hover:no-underline" to={"/"}>Halaman awal</Link>}</p>
    </div>
  );
}
