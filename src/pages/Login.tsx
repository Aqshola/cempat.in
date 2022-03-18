import Landmark from "components/Icon/Landmark";
import React from "react";
import { BsGoogle } from "react-icons/bs";
import { Link } from "react-router-dom";


function Login() {
  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 flex flex-col px-16 py-28 items-center">
        <h1 className="text-4xl font-semibold text-[#03C88E]">Hi!</h1>
        <h1 className="text-lg text-[#03C88E] mt-2">Selamat Datang kembali</h1>
        <form action="" className="mt-14 w-80">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Email"
              className="p-2 border border-[#03C88E] rounded-md placeholder:text-sm text-sm"
            />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              required
              name="email"
              id="email"
              placeholder="Password"
              className="p-2 border border-[#03C88E] rounded-md placeholder:text-sm text-sm"
            />
          </div>
          <button className="text-white py-2 px-3 bg-[#03C88E] rounded-md mt-5 text-sm w-full">
            Login
          </button>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center ">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label htmlFor="remember-me" className="ml-1 text-gray-400 text-xs">Ingat saya</label>
            </div>
            <a href="/" className="text-xs ">Lupa Password?</a>
          </div>
        </form>
        <button className="mt-5 border shadow-sm w-80 py-2 px-3 rounded-md flex items-center text-[#03C88E]">
          <BsGoogle />
          <span className="ml-2 text-sm text-center w-full">
            Login dengan Google
          </span>
        </button>
        <p  className="mt-auto text-sm text-gray-500">belum punya akun? <Link to="/register" className="font-semibold text-[#03C88E]">Gabung Yuk</Link> </p>
      </div>
      <div className=" hidden col-span-1 md:flex flex-col items-center justify-center bg-[#03C88E]">
        <div id="Logo">
          <Landmark className="fill-white"/>
        </div>
        <h1 className="text-3xl text-white font-medium mt-5">Cempat.in</h1>
        <p className="text-white mt-2">Cerita tiap tempat yang kamu kunjungin</p>
      </div>
      
    </div>
  );
}

export default Login;
