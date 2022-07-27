import Button from "components/Button/Button";
import HelmetTitle from "components/Helper/HelmetTitle";
import FormInput from "components/Input/FormInput";
import { useFinishRegisGoogle, redirectLogin } from "hooks/auth/useOAuthGoogle";
import useSession from "hooks/auth/useSession";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckUsername } from "hooks/auth/useCheckUsername";
import Alert from "components/Alert/Alert";

export default function RegisUsername() {
  const [username, setusername] = useState<string>("");
  const [finishGoogle, error, loading] = useFinishRegisGoogle();
  const [checkUsername, found, loadingCheck] = useCheckUsername();

  const _finishRegis = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    finishGoogle(username);
  };
  const navigate = useNavigate();
  const [getSession] = useSession();
  const [valid, setvalid] = useState(false)

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

  useEffect(() => {
    if(!loadingCheck){
      setvalid(found)
    }
  }, [loadingCheck])
  

  return (
    <>
      <HelmetTitle title="Buat Username" />
      <div className="h-screen px-5 md:px-16 py-28 w-full">
        <div className="w-full md:w-96 md:mx-auto">
          <h1 className="text-center text-3xl font-semibold font-nunito ">
            Halo, Selamat datang <span className="handwave">👋</span> <br />
          </h1>
          <p className="text-center text-xl mt-2 font-light font-nunito mb-5">
            yuk isi{" "}
            <span className="font-semibold text-green-primary">username</span>{" "}
            kamu sebelum lanjut
          </p>
          <Alert variant="danger" show={true}>Yah, username udah dipake </Alert>
          <form className="mt-5" onSubmit={_finishRegis}>
            <FormInput
              loading={loadingCheck}
              label="Username"
              required
              type="text"
              placeholder="Username"
              minLength={6}
              onChange={(e) => setusername(e.target.value)}
              debounce={true}
              debounceCallback={() => {
                if (username.trim() !== "") {
                  checkUsername(username);
                }
              }}
            />
            {error && (
              <p className="text-xs font-medium text-red-500 mt-1">
                {error?.message}
              </p>
            )}
            <Button disabled={ loadingCheck || valid} className="w-full mt-5" loading={loading}>
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
