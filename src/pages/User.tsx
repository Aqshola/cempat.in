import Avatar from "components/Avatar/Avatar";
import React, { useEffect } from "react";
import Button from "components/Button/Button";
import DesktopCeritaSection from "components/User/DesktopCeritaSection";
import DesktopTempatSection from "components/User/DesktopTempatSection";
import MobileCeritaSection from "components/User/MobileCeritaSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import MobileTempatSection from "components/User/MobileTempatSection";
import useDetailUser from "hooks/user/useDetailUser";

export default function User() {
  const [searchParam] = useSearchParams();
  const mode = searchParam.get("mode");
  const navigate = useNavigate();
  const { username } = useParams();
  const [getDetailUser, result, loading] = useDetailUser();

  function _handleMode(mode: string) {
    navigate(`?mode=${mode}`);
  }

  useEffect(() => {
    if (username) {
      getDetailUser(username);
    }
  }, [username]);

  return (
    <section
      id="user-profile"
      className="h-screen w-full pb-3 transition-all relative"
    >
      <div className="w-full h-56 bg-green-primary flex justify-center items-center">
        <p className="text-white  font-light font-nunito text-4xl ">
          Cempat.in
        </p>
      </div>
      <div className="gap-2 relative">
        <div className="absolute flex-col md:px-6  w-full  -top-5 gap-1 md:gap-2 flex items-center">
          <Avatar initial="sa" />
          <h1 className="text-xl font-semibold text-blue-primary font-nunito capitalize">
            {result.data?.user.username}
          </h1>
        </div>

        <section id="mobile-switch" className="md:hidden">
          <div className="pt-24 flex gap-2 justify-center">
            <Button
              className={clsx(
                mode !== "cerita" && !mode && ["border border-green-primary"]
              )}
              variant={
                mode === "cerita" || !mode ? "primary" : "outline-primary"
              }
              size="sm"
              onClick={() => _handleMode("cerita")}
            >
              Cerita
            </Button>
            <Button
              className={clsx(
                mode !== "tempat" && ["border border-green-primary"]
              )}
              variant={mode === "tempat" ? "primary" : "outline-primary"}
              size="sm"
              onClick={() => _handleMode("tempat")}
            >
              Tempat
            </Button>
          </div>
        </section>

        {loading && (
          <span
          aria-label="loading"
          className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36 block"
        ></span>
        )}
        {result.data && !loading && (
          <>
            {(mode === "cerita" || !mode) && (
              <MobileCeritaSection listStory={result.data?.story} />
            )}
            {mode === "tempat" && <MobileTempatSection listLocation={result.data.location}/>}

            <section
              id="desktop-view"
              className="w-full hidden md:grid grid-cols-2 py-24"
            >
              <div className="col-span-1">
                <DesktopCeritaSection listStory={result.data.story}/>
              </div>
              <div className="col-span-1">
                <DesktopTempatSection listLocation={result.data.location}/>
              </div>
            </section>
          </>
        )}
        {!result.data && !loading && (
          <div className="text-lg text-center font-medium font-nunito">Yah, profil yang kamu cari gaada 😟</div>
        )}
      </div>
    </section>
  );
}
