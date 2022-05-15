import Button from "components/Button/Button";
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
        navigate("/");
      }
    }, 500);
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <div className="h-screen px-16 py-28 w-full">
      <div className="w-96 mx-auto">
        <h1 className="text-center text-2xl">Halo, Selamat datang 👋</h1>
        <p className="text-center text-sm mt-2 font-light">
          yuk isi username kamu sebelum lanjut
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
          <Button className="mt-5 mx-auto" loading={loading}>
            Simpan
          </Button>
        </form>
      </div>
    </div>
  );
}
