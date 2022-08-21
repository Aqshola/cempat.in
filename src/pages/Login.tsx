import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "hooks/auth/useLogin";
import Button from "components/Button/Button";
import FormInput from "components/Input/FormInput";
import splitbee from "@splitbee/web";
import { googleProvider } from "hooks/auth/useOAuthGoogle";
import HelmetTitle from "components/Helper/HelmetTitle";
import { motion } from "framer-motion";
import { opacityPageTransition } from "lib/Transition";
import Alert from "components/Alert/Alert";

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
      email: formData.email,
    });
  };

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
      <HelmetTitle title="Cempat.in | Login" />
      <motion.div className="loginpage transition-all pb-96 bg-green-primary h-screen md:py-8 px-7 md:px-32">
        <div className="md:w-[450px] w-full mx-auto">
          <motion.h1
            initial={{
              opacity: 0,
              translateX: -100,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            transition={{
              delay: 2,
              duration: 1.5,
              type: "spring",
              stiffness: 200,
            }}
            className="text-3xl text-white leading-snug"
          >
            Halo <span className="handwave">👋</span> <br />
            Selamat datang kembali
          </motion.h1>
          <div className="mt-5 mx-auto bg-white py-10 px-5 rounded-lg shadow-auth-box">
            <Alert show={!!error} variant="danger">
              {error?.message && "email atau password kamu salah"}
            </Alert>
            <form className="space-y-5 mt-5" onSubmit={_handleLogin}>
              <FormInput
                placeholder="email@email.com"
                id="email"
                type={"email"}
                label="Email"
                name="email"
                invalidmsg="Masukin email yang valid ya"
                onChange={_setformData}
              />
              <FormInput
                placeholder="*****"
                id="password"
                type={"password"}
                label="Password"
                name="password"
                invalidmsg="Passwordnya yang bener dong"
                onChange={_setformData}
              />
              <Link
                to={"/lupa-sandi"}
                className="text-sm font-light font-nunito"
              >
                Lupa Password ?
              </Link>
              <Button disabled={loading} loading={loading} className="w-full" size="lg">
                Login
              </Button>
            </form>
            <p className="text-center text-sm font-light my-4 font-nunito">
              atau
            </p>
            <Button
              variant="outline-gray"
              className="w-full flex justify-center gap-5"
              onClick={googleProvider}
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
      </motion.div>
    </motion.div>
  );
}

export default Login;
