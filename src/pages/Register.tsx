import React from 'react'
import { BsGoogle } from "react-icons/bs";
import Landmark from "components/Icon/Landmark";
import { Link } from 'react-router-dom';



function Register() {
  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 flex flex-col px-16 py-28 items-center">
        <h1 className="text-4xl font-semibold text-green-primary">Halo!</h1>
        <h1 className="text-lg text-green-primary mt-2">Selamat Datang</h1>
        <form action="" className="mt-14 w-80">
        <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              required
              name="username"
              id="username"
              placeholder="Username"
              className="p-2 border border-green-primary rounded-md placeholder:text-sm text-sm"
            />
          </div>
          <div className="flex mt-5 flex-col gap-2">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Email"
              className="p-2 border border-green-primary rounded-md placeholder:text-sm text-sm"
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
              className="p-2 border border-green-primary rounded-md placeholder:text-sm text-sm"
            />
          </div>
          <button className="text-white py-2 px-3 bg-green-primary rounded-md mt-5 text-sm w-full">
            Register
          </button>
          
        </form>
        <button className="mt-5 border shadow-sm w-80 py-2 px-3 rounded-md flex items-center text-green-primary">
          <BsGoogle />
          <span className="ml-2 text-sm text-center w-full">
            Register dengan Google
          </span>
        </button>
        <p  className="mt-auto text-sm text-gray-500">Sudah punya akun? <Link to="/login" className="font-semibold text-green-primary">Yuk Masuk</Link> </p>
      </div>
      <div className=" hidden col-span-1 md:flex flex-col items-center justify-center bg-green-primary">
        <div id="Logo">
          <Landmark className="fill-white"/>
        </div>
        <h1 className="text-3xl text-white font-medium mt-5">Cempat.in</h1>
        <p className="text-white mt-2">Gabung dan bagikan cerita tiap tempat yang kamu kunjungi</p>
      </div>
      
    </div>
  )
}

export default Register