import Landmark from "components/Icon/Landmark";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "hooks/auth/useLogin";
import ErrorBox from "components/Error/ErrorBox";
import Button from "components/Button/Button";
import FormInput from "components/Input/FormInput";
import {FiMail} from "react-icons/fi"
import splitbee from '@splitbee/web';
import {googleProvider} from "hooks/auth/useOAuthGoogle"
import {BsGoogle} from "react-icons/bs"

/**
 * TODO: Add google login 
 * TODO: Forget Password ✅
 * 
 */

function Login() {
  const [formData, setformData] = useState({ email: "", password: "" });
  const [login, error, loading] = useLogin();
  

  const _setformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const _handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);
    splitbee.user.set({
      email: formData.email
    })
  };

  

  useEffect(() => {
    if(!loading && error){
      splitbee.reset()
    }
  }, [loading])
  

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 flex flex-col px-16 py-32 items-center">
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
            <FormInput
              value={formData.email}
              onChange={_setformData}
              type="email"
              required
              name="email"
              id="email"
              placeholder="Email"
              label="Email"
              logo={<FiMail className="w-5 h-5 text-gray-500"/>}
            />
          </div>
          <div className="flex flex-col gap-2 mt-7">
            <FormInput value={formData.password}
              onChange={_setformData}
              type="password"
              required
              name="password"
              id="password"
              placeholder="Password" label="Password"
              minLength={6}
              />
            
          </div>
          <Button className="mt-5 w-full block mx-auto" loading={loading}>
            Login
          </Button>

          <div className="flex justify-between items-center mt-2">
            <Link to="/lupa-sandi" className="text-xs ">
              Lupa kata sandi?
            </Link>
          </div>
        </form>

        <button className="mt-5 border shadow-sm w-80 py-2 px-3 rounded-md flex items-center text-green-primary" type="button" onClick={googleProvider}>
          <BsGoogle />
          <span className="ml-2 text-sm text-center w-full">
            Login dengan Google
          </span>
        </button>
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
        <Link to={"/"} className="text-3xl text-white font-medium mt-5">Cempat.in</Link>
        <p className="text-white mt-2">
          Cerita tiap tempat yang kamu kunjungin
        </p>
      </div>
    </div>
  );
}

export default Login;
