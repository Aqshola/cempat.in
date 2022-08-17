import React, { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import Landmark from "components/Icon/Landmark";
import { Link, useParams, useSearchParams } from "react-router-dom";
import useRegis from "hooks/auth/useRegis";
import ErrorBox from "components/Error/ErrorBox";
import FormInput from "components/Input/FormInput";
import { FiMail, FiUser } from "react-icons/fi";
import Button from "components/Button/Button";
import splitbee from "@splitbee/web";
import { googleProvider } from "hooks/auth/useOAuthGoogle";
import HelmetTitle from "components/Helper/HelmetTitle";
import { motion } from "framer-motion";
import { opacityPageTransition } from "lib/Transition";
import Alert from "components/Alert/Alert";
import { useCheckUsername } from "hooks/auth/useCheckUsername";

/**
 * TODO: Onchange check username and email
 */
function Register() {
  const [searchParams] = useSearchParams();

  const errorUnregister = searchParams.get("error");
  const [formData, setformData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [regis, error, loading] = useRegis();
  const [checkUsername, found, loadingCheck] = useCheckUsername();

  function _setformData(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function _register(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    regis(formData.email, formData.password, formData.username);
    splitbee.user.set({
      email: formData.email,
    });
  }

  useEffect(() => {
    if (!loading && error) {
      splitbee.reset();
    }
  }, [loading]);

  return (
    <motion.div
      variants={opacityPageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <HelmetTitle title="Gabung" />
      <div className="bg-green-primary min-h-screen px-7 pb-10 md:px-32">
        <div className="md:w-[450px] mx-auto">
          <h1 className="text-3xl text-white leading-snug">
            Halo <span className="handwave">👋</span> <br />
            Selamat datang
          </h1>
          <div className="mt-5 mx-auto bg-white py-10 px-5 rounded-lg shadow-auth-box">
            <Alert show={!!errorUnregister || !!found} variant="danger">
              {!!errorUnregister && "Yah, akun belum kedaftar nih"}
              {found && "Yah, username udah dipake"}
            </Alert>
            <form className="space-y-5 mt-5" onSubmit={_register}>
              <FormInput
                name="username"
                debounce={true}
                debounceCallback={() => checkUsername(formData.username)}
                loading={loadingCheck}
                onChange={_setformData}
                required
                placeholder="Username"
                id="username"
                type={"text"}
                label="Username"
                leftButton={
                  <img
                    src="/icon/filled/username-logo-filled.svg"
                    aria-label="Username"
                  />
                }
              />
              <FormInput
                onChange={_setformData}
                required
                placeholder="email@email.com"
                id="email"
                type={"email"}
                label="Email"
                name="email"
              />
              <FormInput
                onChange={_setformData}
                required
                placeholder="*****"
                id="password"
                type={"password"}
                label="Password"
                name="password"
              />
              <Button
                className="w-full"
                size="lg"
                disabled={
                  loadingCheck ||
                  found ||
                  formData.username.trim() === "" ||
                  formData.email.trim() === "" ||
                  formData.password.trim() === ""
                }
              >
                Register
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
              Register dengan Google
            </Button>
            <p className="mt-2 text-sm text-center">
              Sudah punya akun?{" "}
              <Link to={"/login"} className="font-bold">
                Yuk login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
