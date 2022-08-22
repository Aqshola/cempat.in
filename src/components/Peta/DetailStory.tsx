import RightNav from "components/Nav/RightNav";
import useDetail from "hooks/cerita/useDetail";
import React, { useEffect, useRef, useState } from "react";
import { ApiLocation } from "types/types";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import parseDateString from "hooks/helper/parseDateString";
import Button from "components/Button/Button";
import { authStore } from "store/authStore";
import useUpdate from "hooks/cerita/useUpdate";
import { getLocalStorage, setLocalStorage } from "hooks/helper/useLocalStorage";
import splitbee from "@splitbee/web";
import useScreenSize from "hooks/helper/useScreenSize";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { CgClose } from "react-icons/cg";
import useLiking from "hooks/cerita/useLiking";
import useGetLiking from "hooks/cerita/useGetLiking";
import toast from "react-hot-toast";
import LikeAction from "./DetailSection/LikeAction";
import clsx from "clsx";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
  viewData: ApiLocation;
  handleHelmetTitle?: (title: string, desc: string | null) => void;
  flying: (lng: number, lat: number) => void;
};

function DetailStory({ titleEditor, viewData, ...props }: Props) {
  const isAuth = authStore((state) => state.isAuth);
  const navigate = useNavigate();
  const user_id = authStore((state) => state.authData?.user_id);
  const [getDetail, result, loading] = useDetail();
  const [updateCerita, resultUpdate, loadingUpdate] = useUpdate();
  const [postLike, likeResult, loadingLike] = useLiking();
  const [getLike, likingResult, loadingLiking] = useGetLiking();
  const [getSize, screenSize] = useScreenSize();
  const sheetRef = useRef<BottomSheetRef>(null);

  const [searchParams] = useSearchParams();
  const idParams = searchParams.get("id");

  const [edit, setedit] = useState<boolean>(false);
  const [formData, setformData] = useState({
    title: "",
    content: EditorState.createEmpty(),
  });

  const [likingData, setlikingData] = useState<{
    like_count: number;
    unlike_count: number;
    status: "like" | "unlike" | null;
  }>({
    like_count: 0,
    unlike_count: 0,
    status: null,
  });

  function _handleEdit(value: boolean) {
    setedit(value);
    if (edit) {
      if (result.data?.content) {
        let editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(result.data?.content))
        );
        setformData({ ...formData, content: editorState });
      }
    }
  }

  function _setTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({ ...formData, title: e.target.value });
  }

  function _setContent(editorState: EditorState) {
    setformData({ ...formData, content: editorState });
  }

  function handleOnClose() {
    if (props.handleHelmetTitle) {
      props.handleHelmetTitle("Peta", null);
    }
    props.onCloseEditor();
    _handleEdit(false);
    // navigate("/peta")
  }

  function _postLike(action: "like" | "unlike") {
    if (result.data) {
      postLike(user_id || "", result.data.id, action);
    }
  }

  function _shareStory() {
    if (!navigator.canShare) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link berhasil dicopy", {
        position: "top-center",
        className: "bg-green-primary font-poppins font-medium",
      });
    } else {
      navigator.share({
        url: window.location.href,
        title: `${formData.title} di ${result.data?.place_name}`,
        text: "Baca cerita lengkapnya di Cempat.in",
      });
    }
  }

  function _updateCerita() {
    let plainContent = formData.content.getCurrentContent().getPlainText();

    if (formData.title.trim() === "" || plainContent.trim() === "") {
      toast.error("Hayoo, judul dan isi gaboleh kosong yaa");
      return;
    }
    updateCerita(viewData.id || 0, user_id || "", {
      title: formData.title,
      content: formData.content,
    });

    if (result.data?.title) {
      result.data.title = formData.title;
    }
  }

  useEffect(() => {
    if (!idParams) {
      handleOnClose();
    } else {
      getDetail(Number(idParams) || 0);
      if (user_id) {
        getLike(user_id, idParams);
      }
    }
  }, [idParams]);

  useEffect(() => {
    if (!loading) {
      if (result.data) {
        props.flying(result.data.lng, result.data.lat);
        let editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(result.data?.content))
        );
        setformData({
          ...formData,
          title: result.data.title,
          content: editorState,
        });

        if (props.handleHelmetTitle) {
          let title = result.data.title.split("");
          title[0] = title[0].toUpperCase();

          props.handleHelmetTitle(
            "Cerita " + title.join(""),
            result.data.content.slice(0, 100)
          );
        }

        splitbee.track("view story", {
          id: result.data.id,
          title: result.data.title,
          place_name: result.data.place_name,
          coordinat: result.data.lat + " - " + result.data.lng,
        });
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
    if (!loadingUpdate && !resultUpdate.error) {
      setedit(false);
      props.onCloseEditor();
    }
  }, [loadingUpdate, resultUpdate.error]);

  useEffect(() => {
    if (!loadingLiking) {
      if (likingResult.data) {
        setlikingData(likingResult.data);
      }
    }
  }, [loadingLiking]);

  useEffect(() => {
    if (!loadingLike) {
      if (user_id && idParams) {
        getLike(user_id, idParams);
      }
    }
  }, [loadingLike]);

  useEffect(() => {
    getSize();
  });

  if (screenSize >= 768) {
    return (
      <>
        <RightNav
          title={
            <h2 className="text-center font-nunito text-2xl font-bold">
              {viewData.place_name || result.data?.place_name}
            </h2>
          }
          {...props}
          onCloseEditor={() => {
            handleOnClose();
            navigate("/peta");
          }}
          leftEvent={
            user_id === result.data?.user_id &&
            !edit && (
              <Button
                onClick={() => _handleEdit(true)}
                size="sm"
                variant={edit ? "secondary" : "primary"}
              >
                Ubah
              </Button>
            )
          }
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
                Yah, cerita yang kamu cari udah gaada
              </h1>
            </>
          )}
          {!loading && edit && result.data && isAuth && (
            <input
              aria-label="judul cerita"
              name="title"
              type="text"
              onChange={_setTitle}
              placeholder="Judul Cerita..."
              className="text-green-primary outline-none border rounded p-1 border-green-primary text-lg placeholder:text-lg  w-full"
              value={formData.title}
            />
          )}

          {!loading && result.data && (
            <>
              <h1 className="capitalize text-2xl text-center text-green-primary font-bold">
                {result.data?.title}
              </h1>
              <h2 className="text-center font-nunito mt-2">
                oleh{" "}
                <Link
                  to={`?user=${result.data?.user.username}`}
                  className="hover:cursor-pointer capitalize hover:underline underline-offset-1 transition-all"
                >
                  {result.data?.user.username}
                </Link>
              </h2>
              <h3 className="text-xs font-light font-nunito text-center">
                {result.data.created_at
                  ? parseDateString(result.data.created_at)
                  : ""}
              </h3>
              <div className="mt-5">
                <Editor
                  ariaLabel="isi cerita"
                  placeholder="Tulis ceritamu disini"
                  editorState={formData.content}
                  onEditorStateChange={_setContent}
                  toolbarHidden={true}
                  readOnly={edit ? false : true}
                />
              </div>

              {/* LIKING */}
              {!edit && (
                <div className="mt-10 flex justify-between">
                  {isAuth && (
                    <LikeAction
                      likeCallback={() => _postLike("like")}
                      unlikeCallback={() => _postLike("unlike")}
                      likeCount={likingData.like_count}
                      unlikeCount={likingData.unlike_count}
                      loading={loadingLike || loadingLiking}
                      status={likingData.status}
                    />
                  )}
                  <div className="flex justify-end w-full">
                    <Button size="sm" variant="vanilla">
                      <span
                        className="flex items-center justify-self-end gap-2 ml-auto"
                        onClick={_shareStory}
                      >
                        <img
                          src={`/icon/outline/share-logo-outline.svg`}
                          alt="share"
                        />
                        Share
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {result.data && edit && user_id === result.data?.user_id && isAuth && (
            <div className="mt-5 flex justify-end gap-5">
              <Button variant="secondary" onClick={() => _handleEdit(false)}>
                Batal
              </Button>
              <Button
                loading={loadingUpdate}
                onClick={() => {
                  updateCerita(viewData.id || 0, user_id || "", {
                    title: formData.title,
                    content: formData.content,
                  });

                  if (result.data?.title) {
                    result.data.title = formData.title;
                  }
                }}
              >
                Simpan
              </Button>
            </div>
          )}
        </RightNav>
      </>
    );
  }

  return (
    <BottomSheet
      initialFocusRef={false}
      snapPoints={({ maxHeight }) => {
        return [maxHeight - maxHeight / 10, 400, 330];
      }}
      open={props.showEditor}
      className="w-full z-50 absolute bottom-0"
      blocking={true}
      ref={sheetRef}
    >
      <div className="px-6 flex items-center ">
        <button
          className="w-fit h-fit"
          onClick={() => {
            handleOnClose();
            navigate("/peta");
          }}
        >
          <CgClose className="w-6 h-6" />
        </button>
        <h1 className="w-full text-center font-nunito font-bold text-lg">
          {viewData.place_name || result.data?.place_name}
        </h1>
        <div>
          {user_id === result.data?.user_id && !edit && (
            <Button
              onClick={() => _handleEdit(true)}
              size="xs"
              variant={edit ? "secondary" : "primary"}
            >
              Ubah
            </Button>
          )}
        </div>
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
          {!loading && edit && result.data && isAuth && (
            <>
              <label
                htmlFor="judul-input"
                className="mb-1 font-nunito font-medium"
              >
                Judul
              </label>
              <input
                id="judul-input"
                aria-label="judul cerita"
                name="title"
                type="text"
                onChange={_setTitle}
                placeholder="Judul Cerita..."
                className="text-green-primary outline-none border-b focus:border-b-2 transition-all rounded p-1 border-b-green-primary text-lg placeholder:text-lg  w-full"
                value={formData.title}
              />
            </>
          )}

          {!loading && result.data && (
            <>
              {!edit && (
                <>
                  <h1 className="capitalize text-2xl text-center text-green-primary font-bold">
                    {result.data?.title}
                  </h1>
                  <h2 className="text-center font-nunito mt-2">
                    oleh{" "}
                    <Link
                      to={`?user=${result.data?.user.username}`}
                      className="hover:cursor-pointer capitalize hover:underline underline-offset-1 transition-all"
                    >
                      {result.data?.user.username}
                    </Link>
                  </h2>
                  <h3 className="text-xs font-light font-nunito text-center">
                    {result.data.created_at
                      ? parseDateString(result.data.created_at)
                      : ""}
                  </h3>
                </>
              )}

              {edit && (
                <label className="mb-1 mt-10 flex font-nunito font-medium">Content</label>
              )}
              <div
                className={clsx(
                  "mt-5",
                  edit && ["mt-0 border-b border-b-blue-primary rounded"]
                )}
              >
                <Editor
                  ariaLabel="isi cerita"
                  placeholder="Tulis ceritamu disini"
                  editorState={formData.content}
                  onEditorStateChange={_setContent}
                  toolbarHidden={true}
                  readOnly={edit ? false : true}
                />
              </div>
              {/* LIKING */}
              {!edit && (
                <div className="mt-10 flex justify-between">
                  {isAuth && (
                    <LikeAction
                      likeCallback={() => _postLike("like")}
                      unlikeCallback={() => _postLike("unlike")}
                      likeCount={likingData.like_count}
                      unlikeCount={likingData.unlike_count}
                      loading={loadingLike || loadingLiking}
                      status={likingData.status}
                    />
                  )}
                  <div className="flex w-full justify-end">
                    <Button size="sm" variant="vanilla" onClick={_shareStory}>
                      <span className="flex items-center gap-2">
                        <img
                          src={`/icon/outline/share-logo-outline.svg`}
                          alt="share"
                        />
                        Share
                      </span>
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}

          {result.data && edit && user_id === result.data?.user_id && (
            <div className="mt-5 flex justify-end gap-5">
              <Button variant="secondary" onClick={() => _handleEdit(false)}>
                Batal
              </Button>
              <Button loading={loadingUpdate} onClick={_updateCerita}>
                Simpan
              </Button>
            </div>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}

export default DetailStory;
