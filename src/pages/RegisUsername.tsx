import Button from "components/Button/Button";
import HelmetTitle from "components/Helper/HelmetTitle";
import FormInput from "components/Input/FormInput";
import { useFinishRegisGoogle, redirectLogin } from "hooks/auth/useOAuthGoogle";
import useSession from "hooks/auth/useSession";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisUsername() {
  const [username, setusername] = useState<string>("");
  const [finishGoogle, error, loading] = useFinishRegisGoogle();

  const _finishRegis = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    finishGoogle(username);
  };
  const navigate = useNavigate();
  const [getSession] = useSession();

  const checkUserStatus = async () => {
    setTimeout(async () => {
      const result = await redirectLogin();

      if (result === "login") {
        getSession();
        setTimeout(() => {
          navigate("/peta");
        }, 500);
      } else if (result === "unregister") {
        navigate("/register?error=unregister");
      }
    }, 500);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <>
      <HelmetTitle title="Buat Username" />
      <div className="h-screen px-16 py-28 w-full">
        <div className="w-96 mx-auto">
          <h1 className="text-center text-3xl font-semibold font-nunito ">Halo, Selamat datang <span className="handwave">👋</span> <br /></h1>
          <p className="text-center text-xl mt-2 font-light font-nunito">
            yuk isi <span className="font-semibold text-green-primary">username</span>  kamu sebelum lanjut
          </p>

          <form className="mt-14" onSubmit={_finishRegis}>
            <FormInput
              label="Username"
              required
              type="text"
              placeholder="Username"
              minLength={6}
              onChange={(e) => setusername(e.target.value)}
            />
            {error && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {error?.message}
              </p>
            )}
            <Button className="w-full mt-5" loading={loading}>
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
