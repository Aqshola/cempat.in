import Button from "components/Button/Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authStore } from "store/authStore";

type Props = {};

export default function NotFound() {
  const isLogin = authStore((state) => state.isAuth);
  const navigate=useNavigate();
  return (
    <div className="h-screen flex items-center  flex-col w-full">

      <img src="/illust/notfound-illust.png" aria-label="tidak ditemukan"/>
      <h1 className="font-nunito text-xl md:text-4xl  text-center font-bold">
        Yah, Halaman yang kamu cari gaada
      </h1>

      <p className="font-light font-nunito md:text-2xl text-center mt-1 md:mt-3">
        Yuk balik ke yang udah pasti ada{" "}
      </p>
      <div>
        <Button className="mt-9" size="xl" onClick={()=>navigate("/")}>
          Kembali ke awal
        </Button>
      </div>
      {/* <p className="mt-2">Yuk balik ke {isLogin?<Link className="underline hover:bg-green-primary transition-all p-0.5 rounded-sm hover:text-white hover:no-underline" to={"/peta"}>Peta</Link>:<Link className="underline hover:bg-green-primary transition-all p-0.5 rounded-sm hover:text-white hover:no-underline" to={"/"}>Halaman awal</Link>}</p> */}
    </div>
  );
}
