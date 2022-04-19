import ListCerita from "components/Cerita/ListCerita";
import useUserStory from "hooks/cerita/useUserStory";
import React, { useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { authStore } from "store/authStore";
import { sideNavStore } from "store/navStore";
import { ApiLocation, Story } from "types/types";

type Props = {};

function Cerita({}: Props) {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  const [getUserStory, data, loading] = useUserStory();
  const user_id = authStore((state) => state.authData?.user_id);

  useEffect(() => {
    getUserStory(user_id || "");
  }, []);

  return (
    <div className="relative md:px-10 px-5 w-full">
      <div className={"py-5 transition-all flex items-center"}>
        <button
          className={sideNav ? "opacity-0 invisible" : " opacity-100 visible"}
          onClick={() => showSideNav(true)}
          disabled={sideNav}
        >
          <GiHamburgerMenu className="w-7 h-7 " />
        </button>
        <span className="text-center w-full">
          <h1 className="text-xl font-semibold">Cerita yang ditulis</h1>
        </span>
      </div>
      <div >
        {loading ? (
          "Loading ..."
        ) : (
          <div id="list-cerita" className="mt-10 flex flex-col gap-5">
            {data.data.map((cerita: Story) => (
              <Link
                key={cerita.id}
                to={`/main?lat=${cerita.lat}&lng=${cerita.lng}&id=${cerita.id}`}
              >
                <ListCerita
                  title={cerita.title}
                  place_name={cerita.place_name || ""}
                  date={cerita.created_at}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cerita;
