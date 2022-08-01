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

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
  viewData: ApiLocation;
  handleHelmetTitle?: (title: string, desc: string | null) => void;
};

function DetailStory({ titleEditor, viewData, ...props }: Props) {
  const navigate = useNavigate();
  const user_id = authStore((state) => state.authData?.user_id);
  const [getDetail, result, loading] = useDetail();
  const [searchParams] = useSearchParams();
  const idParams = searchParams.get("id");
  const [edit, setedit] = useState<boolean>(false);
  const [formData, setformData] = useState({
    title: "",
    content: EditorState.createEmpty(),
  });
  const sheetRef = useRef<BottomSheetRef>(null);
  const [updateCerita, resultUpdate, loadingUpdate] = useUpdate();

  const _handleEdit = (value: boolean) => {
    setedit(value);
    if (edit) {
      if (result.data?.content) {
        let editorState = EditorState.createWithContent(
          convertFromRaw(JSON.parse(result.data?.content))
        );
        setformData({ ...formData, content: editorState });
      }
    }
  };

  const _setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, title: e.target.value });
  };

  const _setContent = (editorState: EditorState) => {
    setformData({ ...formData, content: editorState });
  };

  const handleOnClose = () => {
    if (props.handleHelmetTitle) {
      props.handleHelmetTitle("Peta", null);
    }
    props.onCloseEditor();
    _handleEdit(false);
    // navigate("/peta")
  };
  const [getSize, screenSize] = useScreenSize();

  useEffect(() => {
    if (!idParams) {
      handleOnClose();
    } else {
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
          let title = result.data.title.split("");
          title[0] = title[0].toUpperCase();

          props.handleHelmetTitle(
            "Cerita " + title.join(""),
            result.data.content.slice(0, 100)
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
    if (!loadingUpdate && !resultUpdate.error) {
      setedit(false);
      props.onCloseEditor();
    }
  }, [loadingUpdate, resultUpdate.error]);

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
          {!loading && edit && result.data && (
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
            </>
          )}

          {result.data && edit && user_id === result.data?.user_id && (
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
          {!loading && edit && result.data && (
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
            </>
          )}

          {result.data && edit && user_id === result.data?.user_id && (
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
        </div>
      </div>
    </BottomSheet>
  );
}

export default DetailStory;
