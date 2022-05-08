import RightNav from "components/Nav/RightNav";
import useDetail from "hooks/cerita/useDetail";
import React, { useEffect, useState } from "react";
import { ApiLocation } from "types/types";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useSearchParams } from "react-router-dom";
import parseDateString from "hooks/helper/parseDateString";
import Button from "components/Button/Button";
import { authStore } from "store/authStore";
import useUpdate from "hooks/cerita/useUpdate";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
  viewData: ApiLocation;
};

function DetailStory({ titleEditor, viewData, ...props }: Props) {
  const user_id = authStore((state) => state.authData?.user_id);
  const [getDetail, result, loading] = useDetail();
  const [searchParams] = useSearchParams();
  const idParams = searchParams.get("id");
  const [edit, setedit] = useState<boolean>(false);
  const [formData, setformData] = useState({
    title: "",
    content: EditorState.createEmpty(),
  });
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
    props.onCloseEditor();
    _handleEdit(false);
  };

  useEffect(() => {
    getDetail(Number(idParams) || 0);
  }, [idParams]);

  useEffect(() => {
    if (loading && result.data) {
      let editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(result.data?.content))
      );
      setformData({
        ...formData,
        title: result.data.title,
        content: editorState,
      });
    }
  }, [loading, result.data]);

  useEffect(() => {
    if (!loadingUpdate && !resultUpdate.error) {
      setedit(false);
      props.onCloseEditor();
    }
  }, [loadingUpdate, resultUpdate.error]);

  return (
    <RightNav
      {...props}
      onCloseEditor={handleOnClose}
      title={
        <p className="font-medium">
          {viewData.place_name || result.data?.place_name}
        </p>
      }
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
      {loading ? (
        <span
          aria-label="loading"
          className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
        ></span>
      ) : (
        <div className="pb-5">
          {edit ? (
            <input
              aria-label="judul cerita"
              name="title"
              type="text"
              onChange={_setTitle}
              placeholder="Judul Cerita..."
              className="text-green-primary outline-none border rounded p-1 border-green-primary text-lg placeholder:text-lg  w-full"
              value={formData.title}
            />
          ) : (
            <h1 className="text-3xl text-center text-green-primary font-semibold">
              {result.data?.title}
            </h1>
          )}

          {result.data ? (
            <>
              <h5 className="text-xs text-center mt-3">
                Oleh{" "}
                <span className="font-semibold">
                  {result.data?.user.username}
                </span>{" "}
                <br />
                <span className="mt-2">
                  {result.data.created_at
                    ? parseDateString(result.data.created_at)
                    : ""}
                </span>
              </h5>
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
          ) : (
            <>
              <h1 className="text-green-primary text-xl text-center">
                Yah, cerita yang kamu cari udah gaada
              </h1>
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
                }}
              >
                Simpan
              </Button>
            </div>
          )}
        </div>
      )}
    </RightNav>
  );
}

export default DetailStory;
