import ListCerita from "components/Cerita/ListCerita";
import useUserStory from "hooks/cerita/useUserStory";
import { getLocalStorage, setLocalStorage } from "hooks/helper/useLocalStorage";
import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { authStore } from "store/authStore";
import { sideNavStore } from "store/navStore";
import { Story, ApiLocation } from "types/types";

function Cerita() {
  const { showSideNav, sideNav } = sideNavStore((state) => state);
  const [storyList, setstoryList] = useState<Story[]>([]);
  const [getUserStory, data, loading] = useUserStory();
  const user_id = authStore((state) => state.authData?.user_id);

  // useEffect(() => {
  //   getUserStory(user_id || "");
  // }, []);

  // useEffect(() => {
  //   if (!loading) {
  //     setstoryList(data.data);
  //   }
  // }, [loading]);

  // const deleteCallback = (id: string) => {
  //   setstoryList(storyList.filter((story) => story.id !== id));
  //   let localData = getLocalStorage<ApiLocation[]>("list_location");
  //   if (localData) {
  //     localData = localData.filter((location) => location.id !== Number(id));
  //     setLocalStorage("list_location", localData);
  //   }

  // };

  return (
    <div className="h-screen">
      ss
      {/* <div className={"py-5 transition-all flex items-center"}>
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
      <div>
        {loading ? (
          <div className="h-full flex justify-center items-center">
            <span
              aria-label="loading"
              className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
            ></span>
          </div>
        ) : (
          <div
            id="list-cerita"
            className="transition-all mt-10 grid grid-cols-12 gap-5 "
          >
            {storyList.length > 0 ? (
              storyList.map((cerita: Story) => (
                <div
                  className="md:col-span-3 col-span-12 h-full"
                  key={cerita.id}
                >
                  <ListCerita
                    deleteCallback={deleteCallback}
                    coor={{
                      lat: cerita.lat,
                      lng: cerita.lng,
                    }}
                    id={cerita.id}
                    title={cerita.title}
                    place_name={cerita.place_name || ""}
                    date={cerita.created_at}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-12 text-center font-medium text-lg text-pink-500">
                <h1 className="w-full">
                  kamu belum punya cerita nih, <br />
                  yuk tulis ceritamu
                </h1>
              </div>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Cerita;
