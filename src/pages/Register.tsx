import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import Landmark from "components/Icon/Landmark";
import { Link } from "react-router-dom";
import useRegis from "hooks/auth/useRegis";
import ErrorBox from "components/Error/ErrorBox";
import FormInput from "components/Input/FormInput";
import {FiMail, FiUser} from "react-icons/fi"
import Button from "components/Button/Button";
import splitbee from '@splitbee/web';
import {useInitRegistGoogle} from "hooks/auth/useOAuthGoogle"

/**
 * TODO: Onchange check username and email
 */
function Register() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [regis, error, loading] = useRegis();
  const [initRegisGoogle,loadingGoogle]=useInitRegistGoogle()

  const _setformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const _register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    regis(formData.email, formData.password, formData.username);
    splitbee.user.set({
      email: formData.email
    })
  };



  useEffect(() => {
    if(!loading && error){
      splitbee.reset()
      splitbee.track("Sign In")
    }
  }, [loading])

  return (
    <div className="w-full grid grid-cols-2 h-screen">
      <div className="col-span-2 md:col-span-1 flex flex-col px-16 py-28 items-center">
        <h1 className=" font-semibold text-green-primary text-center">
          <span className="text-4xl">Halo!</span>
          <br />
          <span className="text-lg">Selamat Datang</span>
        </h1>
        <div className="w-80 mt-5">
          {!!error && <ErrorBox message={error.message} />}
        </div>
        <form action="" className="w-80 mt-5" onSubmit={_register}>
          <div className="flex flex-col gap-2">
            <FormInput
              value={formData.username}
              onChange={_setformData}
              type="text"
              required
              name="username"
              id="username"
              placeholder="Username"
              label="Username"
              logo={<FiUser className="w-5 h-5 text-gray-500"/>}
              minLength={4}
            />
          </div>
          <div className="flex mt-5 flex-col gap-2">
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
          <div className="flex flex-col gap-2 mt-5">
            <FormInput
              value={formData.password}
              onChange={_setformData}
              type="password"
              required
              name="password"
              id="password"
              placeholder="Password"
              label="Password"
              minLength={6}
            />
          </div>
          <div className="mt-5 w-full">
          <Button loading={loading} className="w-full">Register</Button>
          </div>
        </form>

        <button className="mt-5 border shadow-sm w-80 py-2 px-3 rounded-md flex items-center text-green-primary" onClick={initRegisGoogle}>
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
        <Link to={"/"} className="text-3xl text-white font-medium mt-5">Cempat.in</Link>
        <p className="text-white mt-2">
          Gabung dan bagikan cerita tiap tempat yang kamu kunjungi
        </p>
      </div>
    </div>
  );
}

export default Register;
