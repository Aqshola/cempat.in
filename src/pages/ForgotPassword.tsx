import React, { useEffect, useState } from "react";
import Button from "components/Button/Button";
import {
  useForgotPassword,
  useUpdatePassword,
} from "hooks/auth/useForgotPassword";

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
  const [stepForgot, setstepForgot] = useState<
    "email" | "email-sent" | "new-password" | "password-finish"
  >("email");
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
        console.log(errorUpdate);
        if (!loadingUpdate && !errorUpdate) {
          setstepForgot("password-finish");
        }
      } else {
        // toast("Konfirmasi sandi harus sama dengan kata sandi baru", {
        //   position: "top-center",
        //   hideProgressBar: true,
        //   autoClose: 5000,
        //   closeOnClick: true,
        //   draggable: true,
        //   progress: undefined,
        // });
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
      // toast("Yah, user tidak ditemukan", {
      //   position: "top-center",
      //   hideProgressBar: true,
      //   autoClose: 5000,
      //   closeOnClick: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      setstepForgot("email");
    }
  }, [loading, error]);

  useEffect(() => {
    if ((!loading && error) || (!loadingUpdate && errorUpdate)) {
      // toast("Terjadi kesalahan saat update kata sandi", {
      //   position: "top-center",
      //   hideProgressBar: true,
      //   autoClose: 5000,
      //   closeOnClick: true,
      //   draggable: true,
      //   progress: undefined,
      // });
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

      {stepForgot === "email-sent" && <EmailSent />}

      {stepForgot === "new-password" && (
        <NewPassword
          changePassword={(e) =>
            setpasword({ ...pasword, new_pass: e.target.value })
          }
          changePasswordRepeat={(e) =>
            setpasword({ ...pasword, confirm_pass: e.target.value })
          }
        />
      )}

      {stepForgot === "password-finish" && (
        <PasswordFinish/>
      )}

      {/* <ToastContainer bodyClassName={"font-semibold text-red-500"} /> */}
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

function EmailSent() {
  return (
    <>
      <img src="/illust/found-success-illust.png" aria-label="Lupa password" />
      <h1 className="text-center text-xl md:text-3xl font-bold font-nunito">
        Wah akun kamu ketemu nih
      </h1>
      <p className="text-center font-light md:text-xl mt-3 font-nunito">
        Email reset passwordnya udah dikirim ya
      </p>
      <Link to={"/"} className="mt-10 font-medium text-center hover:underline">
        <Button>Kembali ke Halaman awal</Button>
      </Link>
    </>
  );
}

type newPassword = {
  changePassword: (e: any) => any;
  changePasswordRepeat: (e: any) => any;
};

function NewPassword({ ...props }: newPassword) {
  return (
    <>
      <img src="/illust/found-success-illust.png" aria-label="Lupa password" />
      <h1 className="text-xl font-bold font-nunito md:text-3xl">
        Yuk buat password yang baru
      </h1>
      <p className=" md:text-xl font-nunito font-light mt-3">
        Buat yang bener ya, jangan sampai lupa lagi
      </p>

      <div className="mt-5 space-y-5">
        <FormInput
          onChange={props.changePassword}
          className="w-80  md:w-96 mt-5"
          placeholder="Password Baru"
          id="new-password"
          type={"password"}
          label="Password baru"
        />

        <FormInput
          onChange={props.changePasswordRepeat}
          className="w-80  md:w-96 mt-5"
          placeholder="Konfirmasi Password"
          id="confirm-password"
          type={"password"}
          label="Konfirmasi Password"
        />
      </div>
      <Button className="mt-5">Ubah Password</Button>
    </>
  );
}

function PasswordFinish() {
  return (<>
    <img src="/illust/reset-success-illust.png" aria-label="Lupa password" className="mt-5" />
    <h1 className="text-center text-xl md:text-3xl font-bold font-nunito">
      Yey, reset password berhasil
    </h1>
    <p className="text-center font-light md:text-xl mt-3 font-nunito">
      Kamu udah bisa lanjut ya sekarang
    </p>
    <Link to={"/login"} className="mt-10 font-medium text-center hover:underline">
      <Button>Login</Button>
    </Link>
  </>);
}
