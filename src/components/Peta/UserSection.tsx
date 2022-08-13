import RightNav from "components/Nav/RightNav";
import React, { useEffect, useRef} from "react";
import { ApiLocation, Story } from "types/types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Button from "components/Button/Button";
import useScreenSize from "hooks/helper/useScreenSize";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { CgClose } from "react-icons/cg";
import { MdLocationPin } from "react-icons/md";
import ListBox from "./UserSection/ListBox";
import Avatar from "components/Avatar/Avatar";
import useDetailUser from "hooks/user/useDetailUser";
import parseDateString from "hooks/helper/parseDateString";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
  viewData: ApiLocation;
  handleView?: () => void;
  handleHelmetTitle?: (title: string, desc: string | null) => void;
};

function UserSection({ titleEditor, viewData, ...props }: Props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [getUserDetail, result, loading] = useDetailUser();

  const sheetRef = useRef<BottomSheetRef>(null);

  const idParams = searchParams.get("user");

  const handleOnClose = () => {
    props.onCloseEditor();

    if (props.handleHelmetTitle) {
      props.handleHelmetTitle("Peta", null);
    }

    navigate("/peta");
  };
  const [getSize, screenSize] = useScreenSize();

  useEffect(() => {
    if (idParams) {
      if (props.handleView) {
        props.handleView();
      }
      getUserDetail(idParams);
    }
  }, [idParams]);

  useEffect(() => {
    if (!loading) {
      if (result.data) {
        if (props.handleHelmetTitle) {
          props.handleHelmetTitle(result.data.user.username, null);
        }

        // splitbee.track("view story", {
        //   id: result.data.id,
        //   title: result.data.title,
        //   place_name: result.data.place_name,
        //   coordinat: result.data.lat + " - " + result.data.lng,
        // });
      } else {
        // let localData = getLocalStorage<ApiLocation[]>("list_location");
        // if (localData) {
        //   localData = localData.filter(
        //     (location) => location.id !== Number(Number(idParams))
        //   );
        //   setLocalStorage("list_location", localData);
        // }
      }
    }
  }, [loading, result.data]);

  useEffect(() => {
    getSize();
  });

  if (screenSize >= 768) {
    return (
      <>
        <RightNav
          title={
            <h2 className="text-center font-nunito text-2xl font-bold">
              Profil
            </h2>
          }
          {...props}
          onCloseEditor={handleOnClose}
        >
          <div className="pb-5">
            {loading && (
              <span
                aria-label="loading"
                className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36 block"
              ></span>
            )}
          </div>
          {!loading && !result.data && (
            <>
              <h1 className="text-green-primary text-xl text-center">
                Yah, pengguna yang kamu cari gak ketemu nih
              </h1>
            </>
          )}

          {!loading && result.data && (
            <div className="flex flex-col">
              <Avatar
                name={result.data.user.username}
                className="mx-auto"
              />
              <h2 className="text-center font-nunito font-medium text-xl mt-2 capitalize">
                {result.data.user.username}
              </h2>
              <Link to={"/user/1"} className="w-full flex justify-center mt-5">
                <Button size="xs" className="w-fit">
                  Lihat profil seutuhnya
                </Button>
              </Link>
              <div className="mt-9">
                <h3 className="mb-7 text-xl font-semibold font-nunito">
                  Cerita
                </h3>
                <div className="flex flex-col space-y-3">
                  {result.data.story.slice(0, 4).map((story: Story) => (
                    <ListBox
                      title={story.title}
                      rightText={parseDateString(story.created_at)}
                      detail={
                        <div className="flex gap-1 items-center mt-3">
                          <MdLocationPin />
                          <p className="font-nunito text-xs font-medium">
                            {story.place_name}
                          </p>
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </RightNav>
      </>
    );
  }
  return (
    <BottomSheet
      snapPoints={({ maxHeight }) => [
        maxHeight - maxHeight / 10,
        maxHeight / 4,
        maxHeight * 0.6,
      ]}
      open={props.showEditor}
      className="w-full z-50 absolute bottom-0"
      blocking={true}
      ref={sheetRef}
    >
      <div className="px-6 flex items-center">
        <button className="w-fit h-fit" onClick={handleOnClose}>
          <CgClose className="w-6 h-6" />
        </button>
        <h1 className="w-full text-center font-nunito font-bold text-lg">
          Profil
        </h1>
      </div>

      <div className="px-6 mt-9">
        <div className="pb-5">
          {loading && (
            <span
              aria-label="loading"
              className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36 block"
            ></span>
          )}

          {!loading && !result.data && (
            <>
              <h1 className="text-green-primary text-xl text-center">
                Yah, Profil yang kamu cari udah gaada
              </h1>
            </>
          )}

          {!loading && result.data && (
            <div className="flex flex-col">
              <Avatar
                className="mx-auto"
                name={result.data.user.username}
              />
              <h2 className="text-center font-nunito font-medium text-xl mt-2 capitalize">
                {result.data.user.username}
              </h2>
              <Link to={`/user/${result.data.user.username}`} className="w-full flex justify-center mt-5">
                <Button size="xs" className="w-fit">
                  Lihat profil seutuhnya
                </Button>
              </Link>
              <div className="mt-9">
                <h3 className="mb-7 text-xl font-semibold font-nunito">
                  Cerita
                </h3>
                <div className="flex flex-col space-y-3">
                  {result.data.story.slice(0, 4).map((story: Story) => (
                    <ListBox
                      title={story.title}
                      rightText={parseDateString(story.created_at)}
                      detail={
                        <div className="flex gap-1 items-center mt-3">
                          <MdLocationPin />
                          <p className="font-nunito text-xs font-medium">
                            {story.place_name}
                          </p>
                        </div>
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}

export default UserSection;
