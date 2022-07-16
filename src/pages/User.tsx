import Avatar from "components/Avatar/Avatar";
import ListBox from "components/Peta/UserSection/ListBox";
import React from "react";
import Button from "components/Button/Button";
import { MdLocationPin } from "react-icons/md";
import Paginate from "components/Pagination/Paginate";
import DesktopCeritaSection from "components/User/DesktopCeritaSection";
import DesktopTempatSection from "components/User/DesktopTempatSection";
import MobileCeritaSection from "components/User/MobileCeritaSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import MobileTempatSection from "components/User/MobileTempatSection";

export default function User() {
  const [searchParam] = useSearchParams();
  const mode = searchParam.get("mode");
  const navigate = useNavigate();
  function _handleMode(mode: string) {
    navigate(`?mode=${mode}`);
  }
  return (
    <section
      id="user-profile"
      className="h-screen w-full overflow-y-scroll pb-3 transition-all relative"
    >
      <div className="w-full h-56 bg-green-primary flex justify-center items-center">
        <p className="text-white  font-light font-nunito text-4xl ">
          Cempat.in
        </p>
      </div>
      <div className="gap-2 relative">
        <div className="absolute flex-col md:px-6 md:flex-row w-full  -top-5 gap-1 md:gap-2 flex items-center">
          <Avatar />
          <h1 className="mt-2 text-xl font-nunito">Aqshol Afid</h1>
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

        {(mode === "cerita" || !mode) && <MobileCeritaSection />}
        {mode === "tempat" && <MobileTempatSection />}
        

        <section
          id="desktop-view"
          className="w-full hidden md:grid grid-cols-2 py-24"
        >
          <div className="col-span-1">
            <DesktopCeritaSection />
          </div>
          <div className="col-span-1">
            <DesktopTempatSection />
          </div>
        </section>
      </div>
    </section>
  );
}
