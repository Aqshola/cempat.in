import Landmark from "components/Icon/Landmark";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "hooks/auth/useLogin";
import ErrorBox from "components/Error/ErrorBox";
import Button from "components/Button/Button";
import FormInput from "components/Input/FormInput";
import { FiMail } from "react-icons/fi";
import splitbee from "@splitbee/web";
import { googleProvider } from "hooks/auth/useOAuthGoogle";
import { BsGoogle } from "react-icons/bs";
import HelmetTitle from "components/Helper/HelmetTitle";

/**
 * TODO: Add google login
 * TODO: Forget Password ✅
 *
 */

function Login() {
  // const [formData, setformData] = useState({ email: "", password: "" });
  // const [login, error, loading] = useLogin();

  // const _setformData = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setformData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const _handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   login(formData.email, formData.password);
  //   splitbee.user.set({
  //     email: formData.email
  //   })
  // };

  // useEffect(() => {
  //   if(!loading && error){
  //     splitbee.reset()
  //   }
  // }, [loading])

  const [inputInvalid, setinputInvalid] = useState<boolean>(false);

  return (
    <>
      <HelmetTitle title="Cempat.in | Login"/>
      <div className="pb-96 bg-green-primary h-screen md:py-8 px-7 md:px-32">
        <div className="md:w-[450px] mx-auto">
          <h1 className="text-3xl text-white leading-snug">
            Halo 👋 <br />
            Selamat datang kembali
          </h1>
          <div className="mt-5 mx-auto bg-white py-16 px-5 rounded-lg shadow-auth-box">
            <form className="space-y-5">
              <FormInput
                placeholder="email@email.com"
                id="email"
                type={"email"}
                label="Email"
              />
              <FormInput
                placeholder="*****"
                id="password"
                type={"password"}
                label="Password"
              />
              <Link
                to={"/lupa-sandi"}
                className="text-sm font-light font-nunito"
              >
                Lupa Password ?
              </Link>
              <Button className="w-full" size="lg">
                Login
              </Button>
            </form>
            <p className="text-center text-sm font-light my-4 font-nunito">
              atau
            </p>
            <Button
              variant="outline-gray"
              className="w-full flex justify-center gap-5"
            >
              <span>
                <img src="/icon/filled/google-icon-filled.svg" alt="google" />
              </span>
              Login dengan Google
            </Button>
            <p className="mt-2 text-sm text-center">
              Belum punya akun?{" "}
              <Link to={"/register"} className="font-bold">
                Yuk gabung
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
