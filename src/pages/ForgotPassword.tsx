import React, { useEffect, useState } from "react";
import Button from "components/Button/Button";
import {
  useForgotPassword,
  useUpdatePassword,
} from "hooks/auth/useForgotPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogout from "hooks/auth/useLogout";
import { Link } from "react-router-dom";
import supabase from "lib/supabase";
import FormInput from "components/Input/FormInput";

export default function ForgotPassword() {
  const [forgotPassword, error, loading] = useForgotPassword();
  const [updatePassword, errorUpdate, loadingUpdate] = useUpdatePassword();

  const [email, setemail] = useState<string>("");
  const [pasword, setpasword] = useState({
    new_pass: "",
    confirm_pass: "",
  });
  const [stepForgot, setstepForgot] = useState<string>("email");
  const [recoveryToken, setrecoveryToken] = useState("");

  const [logout] = useLogout();

  const _handleForgot = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (stepForgot === "email") {
      forgotPassword(email);
      if (!loading && !error) {
        setstepForgot("email-sent");
      }
    } else if (stepForgot === "new-password") {
      if (pasword.new_pass === pasword.confirm_pass) {
        updatePassword(recoveryToken, pasword.new_pass);
        if (!loadingUpdate && !errorUpdate) {
          setstepForgot("password-finish");
        }
      } else {
        toast("Konfirmasi sandi harus sama dengan kata sandi baru", {
          position: "top-center",
          hideProgressBar: true,
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        supabase.auth.signOut();
      }
    });
  }, []);

  useEffect(() => {
    const fullLocation = window.location;
    if (fullLocation.hash) {
      const hash = fullLocation.hash.substring(1);
      const query = new URLSearchParams(hash);
      const error_code = query.get("error_code");
      const type = query.get("type");

      if (error_code) {
        logout();
      }

      if (type === "recovery") {
        const access_token = query.get("access_token");
        if (access_token) {
          setrecoveryToken(access_token);
        }
        setstepForgot("new-password");
        logout();
      }
    }
  }, []);

  useEffect(() => {
    if (!loading && error) {
      toast("Yah, user tidak ditemukan", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setstepForgot("email");
    }
  }, [loading, error]);

  useEffect(() => {
    if (!loading && error) {
      toast("Terjadi kesalahan saat update kata sandi", {
        position: "top-center",
        hideProgressBar: true,
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      setstepForgot("email");
    }
  }, [loadingUpdate, errorUpdate]);

  return (
    <form
      className="min-h-screen w-full flex items-center flex-col"
      onSubmit={_handleForgot}
    >
      {stepForgot === "email" && (
        <EmailStep
          loading={loading}
          emailChange={(e) => setemail(e.target.value)}
        />
      )}

      {stepForgot === "email-sent" && (
        <>
          <h1 className="text-center text-4xl font-semibold text-green-primary">
            Email sudah dikirim, silahkan cek kotak masuk email
          </h1>
          <Link
            to={"/"}
            className="mt-10 font-medium text-center hover:underline"
          >
            Kembali ke halaman utama
          </Link>
        </>
      )}

      {stepForgot === "new-password" && (
        <>
          <h1 className="text-center text-4xl font-semibold text-green-primary">
            Buat sandi baru
          </h1>
          <div className="mt-10 flex flex-col gap-2">
            <label htmlFor="password">Sandi baru</label>
            <input
              onChange={(e) =>
                setpasword({ ...pasword, new_pass: e.target.value })
              }
              minLength={6}
              type="password"
              className="border-2 p-2 w-80  md:w-96 border-green-primary rounded-md"
              id="password"
            />
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <label htmlFor="confirm-password">Konfirmasi Sandi baru</label>
            <input
              onChange={(e) =>
                setpasword({ ...pasword, confirm_pass: e.target.value })
              }
              type="password"
              className="border-2 p-2 w-80  md:w-96 rounded-md"
              id="confirm-password"
              minLength={6}
            />
          </div>
          <Button className="mt-5">Ubah kata sandi</Button>
        </>
      )}

      {stepForgot === "password-finish" && (
        <>
          <h1 className="text-center text-4xl font-semibold text-green-primary">
            Berhasil ubah kata sandi
          </h1>
          <Link
            to={"/login"}
            className="mt-10 font-medium text-center hover:underline"
          >
            Kembali ke halaman masuk
          </Link>
        </>
      )}

      <ToastContainer bodyClassName={"font-semibold text-red-500"} />
    </form>
  );
}

//Email Step
type propsEmailStep = {
  loading: boolean;
  emailChange: (e: any) => any;
};
function EmailStep({ ...props }: propsEmailStep) {
  return (
    <>
      <img
        src="/illust/forgot-password-illust.png"
        aria-label="Lupa password"
      />
      <h1 className="text-xl font-bold font-nunito md:text-3xl">
        Lupa Password?
      </h1>
      <p className=" md:text-xl font-nunito font-light mt-3">
        Yuk tulis <span className="font-bold">email</span> yang kamu pake
      </p>

      <FormInput
        hideLabel={true}
        onChange={props.emailChange}
        className="w-80  md:w-96 mt-5"
        placeholder="email@email.com"
        id="email"
        type={"email"}
        label="Email"
      />
      <Button loading={props.loading} className="mt-5">
        Kirim email
      </Button>
    </>
  );
}
