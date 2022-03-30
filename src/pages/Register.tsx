import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import Landmark from "components/Icon/Landmark";
import { Link } from "react-router-dom";
import useRegis from "hooks/auth/useRegis";
import ErrorBox from "components/Error/ErrorBox";

function Register() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [regis, data, loading] = useRegis();

  const _setformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const _register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password, username } = formData;
    regis(email, password, username);

    if (data.error) {
      setformData({
        email: "",
        username: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (data.error) {
      setformData({
        email: "",
        username: "",
        password: "",
      });
    }
  }, [data.error]);

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 flex flex-col px-16 py-28 items-center">
        <h1 className=" font-semibold text-green-primary text-center">
          <span className="text-4xl">Halo!</span>
           <br />
           <span className="text-lg">Selamat Datang</span>
        </h1>

        <div className="w-80 mt-5">
          <ErrorBox
            showError={!!data.error}
            message={data.error?.message || ""}
          />
        </div>
        <form action="" className="w-80 mt-2" onSubmit={_register}>
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              value={formData.username}
              onChange={_setformData}
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
              value={formData.email}
              onChange={_setformData}
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
              value={formData.password}
              onChange={_setformData}
              type="password"
              required
              name="password"
              id="password"
              placeholder="Password"
              className="p-2 border border-green-primary rounded-md placeholder:text-sm text-sm"
            />
          </div>
          <button
            className="text-white py-2 px-3 bg-green-primary rounded-md mt-5 text-sm w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "loading..." : "Register"}
          </button>
        </form>
        <button className="mt-5 border shadow-sm w-80 py-2 px-3 rounded-md flex items-center text-green-primary">
          <BsGoogle />
          <span className="ml-2 text-sm text-center w-full">
            Register dengan Google
          </span>
        </button>
        <p className="mt-auto text-sm text-gray-500">
          Sudah punya akun?{" "}
          <Link to="/login" className="font-semibold text-green-primary">
            Yuk Masuk
          </Link>{" "}
        </p>
      </div>
      <div className=" hidden col-span-1 md:flex flex-col items-center justify-center bg-green-primary">
        <div id="Logo">
          <Landmark className="fill-white" />
        </div>
        <h1 className="text-3xl text-white font-medium mt-5">Cempat.in</h1>
        <p className="text-white mt-2">
          Gabung dan bagikan cerita tiap tempat yang kamu kunjungi
        </p>
      </div>
    </div>
  );
}

export default Register;
