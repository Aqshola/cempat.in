import Button from "components/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";




export default function NotFound() {
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
    </div>
  );
}
