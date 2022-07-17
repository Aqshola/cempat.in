import RightNav from "components/Nav/RightNav";
import useDetail from "hooks/cerita/useDetail";
import React, { useEffect, useRef, useState } from "react";
import { ApiLocation } from "types/types";
import { convertFromRaw, EditorState } from "draft-js";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Button from "components/Button/Button";
import { getLocalStorage, setLocalStorage } from "hooks/helper/useLocalStorage";
import splitbee from "@splitbee/web";
import useScreenSize from "hooks/helper/useScreenSize";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { CgClose } from "react-icons/cg";
import { MdLocationPin } from "react-icons/md";
import ListBox from "./UserSection/ListBox";
import Avatar from "components/Avatar/Avatar";

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
  const navigate=useNavigate()
  const [getDetail, result, loading] = useDetail();
  const [searchParams] = useSearchParams();

 
  const [formData, setformData] = useState({
    title: "",
    content: EditorState.createEmpty(),
  });
  const sheetRef = useRef<BottomSheetRef>(null);
  
  const idParams = searchParams.get("user");

  const handleOnClose = () => {
    props.onCloseEditor();

    if (props.handleHelmetTitle) {
      props.handleHelmetTitle(
        "Peta",
        null
      );
    }

    navigate("/peta")

  };
  const [getSize, screenSize] = useScreenSize();

  useEffect(() => {
    if (!idParams) {
      handleOnClose();
    } else {
      if (props.handleView) {
        props.handleView();
      }
      getDetail(Number(idParams) || 0);
    }
  }, [idParams]);

  useEffect(() => {
    if (!loading) {
      if (result.data) {
        let editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(result.data?.content))
        );
        setformData({
          ...formData,
          title: result.data.title,
          content: editorState,
        });

        if (props.handleHelmetTitle) {
          
          
          
          props.handleHelmetTitle(
            result.data.user.username,
            null
          );
        }

        // splitbee.track("view story", {
        //   id: result.data.id,
        //   title: result.data.title,
        //   place_name: result.data.place_name,
        //   coordinat: result.data.lat + " - " + result.data.lng,
        // });
      } else {
        let localData = getLocalStorage<ApiLocation[]>("list_location");
        if (localData) {
          localData = localData.filter(
            (location) => location.id !== Number(Number(idParams))
          );
          setLocalStorage("list_location", localData);
        }
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
              <Avatar className="mx-auto" />
              <Link to={"/user/1"} className="w-full">
                <Button size="xs" className="w-fit mx-auto mt-2">
                  Lihat profil seutuhnya
                </Button>
              </Link>
              <div className="mt-9">
                <h3 className="mb-7 text-xl font-semibold font-nunito">
                  Cerita
                </h3>
                <div className="flex flex-col space-y-3">
                  <ListBox
                    title="Lalatina"
                    rightText={"13 Hari yang lalu"}
                    detail={
                      <div className="flex gap-1 items-center mt-3">
                        <MdLocationPin />
                        <p className="font-nunito text-xs font-medium">
                          Taman Solo
                        </p>
                      </div>
                    }
                  />
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
        <button
          className="w-fit h-fit"
          onClick={handleOnClose}
        >
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
                Yah, cerita yang kamu cari udah gaada
              </h1>
            </>
          )}

          {!loading && result.data && (
            <div className="flex flex-col">
              <Avatar className="mx-auto" />
              <Link to={"/user/1"} className="w-full">
                <Button size="xs" className="w-fit mx-auto mt-2">
                  Lihat profil seutuhnya
                </Button>
              </Link>
              <div className="mt-9">
                <h3 className="mb-7 text-xl font-semibold font-nunito">
                  Cerita
                </h3>
                <div className="flex flex-col space-y-3">
                  <ListBox
                    title="Lalatina"
                    rightText={"13 Hari yang lalu"}
                    detail={
                      <div className="flex gap-1 items-center mt-3">
                        <MdLocationPin />
                        <p className="font-nunito text-xs font-medium">
                          Taman Solo
                        </p>
                      </div>
                    }
                  />
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
