import Landmark from "components/Icon/Landmark";
import React, { useState } from "react";
import { Link} from "react-router-dom";
import useLogin from "hooks/auth/useLogin";
import ErrorBox from "components/Error/ErrorBox";
import Button from "components/Button/Button";

/**
 * TODO: Add google login
 * TODO: Forget Password
 * TODO: Rememmber me
 */

function Login() {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [login, error,loading] = useLogin();
      


  const _setformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const _handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);
  };

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 flex flex-col px-16 py-28 items-center">
        <h1 className=" font-semibold text-green-primary text-center">
          <span className="text-4xl">Halo!</span>
          <br />
          <span className="text-lg">Selamat Datang Kembali</span>
        </h1>
        <div className="w-80 mt-5">
          {!!error && <ErrorBox message={error.message} />}
        </div>
        <form className="mt-5 w-80" onSubmit={_handleLogin}>
          <div className="flex flex-col gap-2">
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
          <Button className="mt-5 w-full block mx-auto" loading={loading}>
            Login
          </Button>
          {/* <button className="text-white py-2 px-3 bg-green-primary rounded-md mt-5 text-sm w-full">
            {loading ? "loading..." : "Login"}
          </button> */}
          {/* <div className="flex justify-between items-center mt-2">
            <div className="flex items-center ">
              <input type="checkbox" name="remember-me" id="remember-me" />
              <label
                htmlFor="remember-me"
                className="ml-1 text-gray-400 text-xs"
              >
                Ingat saya
              </label>
            </div>
            <a href="/" className="text-xs ">
              Lupa Password?
            </a>
          </div> */}
        </form>

        {/* <button className="mt-5 border shadow-sm w-80 py-2 px-3 rounded-md flex items-center text-green-primary">
          <BsGoogle />
          <span className="ml-2 text-sm text-center w-full">
            Login dengan Google
          </span>
        </button> */}
        <p className="mt-auto text-sm text-gray-500">
          belum punya akun?{" "}
          <Link to="/register" className="font-semibold text-green-primary">
            Gabung Yuk
          </Link>{" "}
        </p>
      </div>

      <div className=" hidden col-span-1 md:flex flex-col items-center justify-center bg-green-primary">
        <div id="Logo">
          <Landmark className="fill-white" />
        </div>
        <h1 className="text-3xl text-white font-medium mt-5">Cempat.in</h1>
        <p className="text-white mt-2">
          Cerita tiap tempat yang kamu kunjungin
        </p>
      </div>
    </div>
  );
}

export default Login;
