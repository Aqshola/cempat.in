import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import RightNav from "components/Nav/RightNav";
import useInfoLatLong from "hooks/helper/useInfoLatLong";
import Button from "components/Button/Button";
import useCreate from "hooks/cerita/useCreate";
import { authStore } from "store/authStore";
import { sideNavStore } from "store/navStore";
import { Location } from "types/types";
import useScreenSize from "hooks/helper/useScreenSize";
import { BottomSheet, BottomSheetRef } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { CgClose } from "react-icons/cg";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  infoLocation: Location | null;
  onSaveEditor: (T: any) => void;
};

export default function EditorSection({
  infoLocation,
  onSaveEditor,
  ...props
}: Props) {
  const [getInfo] = useInfoLatLong();
  const [placeName, setplaceName] = useState<any>();
  const [formData, setformData] = useState({
    title: "",
    content: EditorState.createEmpty(),
  });
  const [create, result, loading] = useCreate();
  const user = authStore((state) => state.authData);
  const showSideNav = sideNavStore((state) => state.showSideNav);
  const [getSize, screenSize] = useScreenSize();
  const sheetRef = useRef<BottomSheetRef>(null);
  async function gettingInfo() {
    if (infoLocation) {
      let info = await getInfo(infoLocation.lng, infoLocation.lat);
      setplaceName(info.features[0].text);
    }
  }

  function _setTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setformData({ ...formData, title: e.target.value });
  }

  function _setContent(editorState: EditorState) {
    setformData({ ...formData, content: editorState });
  }

  function _createStory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (user) {
      if (
        convertToRaw(formData.content.getCurrentContent()).blocks.every(
          (b) => b.text.trim() === ""
        )
      ) {
        toast("Tulis cerita dulu ya", {
          position: "bottom-right",
          hideProgressBar: true,
          autoClose: 1000,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        create(
          {
            lat: infoLocation?.lat || 0,
            lng: infoLocation?.lng || 0,
            place_name: infoLocation?.place_name || placeName,
          },
          formData.title,
          formData.content,
          user.user_id
        );
      }
    }
  }

  useEffect(() => {
    if (!loading && !result.error) {
      if (result.data) {
        showSideNav(false);
        let res = result.data[0];
        onSaveEditor({ ...res });
        props.onCloseEditor();
        setformData({
          title: "",
          content: EditorState.createEmpty(),
        });
      }
    }
  }, [loading, result.error]);

  useEffect(() => {
    if (props.showEditor) {
      gettingInfo();
    }
  }, [props.showEditor]);

  useEffect(() => {
    getSize();
  });

  if (screenSize >= 768) {
    return (
      <>
        <RightNav
          title={
            <h2 className="text-center font-nunito text-2xl font-bold">
              {infoLocation?.place_name ? infoLocation.place_name : placeName}
            </h2>
          }
          {...props}
          onCloseEditor={() => {
            setplaceName(null);
            props.onCloseEditor();
          }}
        >
          <form onSubmit={_createStory}>
            <div className="w-full mt-5">
              <input
                required
                aria-label="judul cerita"
                name="title"
                type="text"
                placeholder="Judul Cerita"
                className="text-green-primary outline-none border-none text-2xl placeholder:text-2xl  w-full font-medium"
                onChange={_setTitle}
                value={formData.title}
              />
              <Editor
                ariaLabel="isi cerita"
                placeholder="Yuk tulis ceritamu disini"
                editorState={formData.content}
                onEditorStateChange={_setContent}
                toolbarHidden={true}
              />
            </div>
            <Button loading={loading} className="float-right mt-20">
              Simpan
            </Button>
          </form>
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
      className="w-full z-50 absolute bottom-0 py-5"
      blocking={true}
      ref={sheetRef}
    >
      <div className="px-6 flex items-center">
        <button
          className="w-fit h-fit"
          onClick={() => {
            props.onCloseEditor();
          }}
        >
          <CgClose className="w-6 h-6" />
        </button>
        <h1 className="w-full text-center font-nunito font-bold text-lg">
          {infoLocation?.place_name ? infoLocation.place_name : placeName}
        </h1>
      </div>

      <div className="px-6 py-5">
        <form onSubmit={_createStory}>
          <div className="w-full mt-5 mb-20">
            <input
              required
              aria-label="judul cerita"
              name="title"
              type="text"
              placeholder="Judul Cerita"
              className="text-green-primary outline-none border-none text-2xl placeholder:text-2xl  w-full font-medium"
              onChange={_setTitle}
              value={formData.title}
            />
            <Editor
              ariaLabel="isi cerita"
              placeholder="Yuk tulis ceritamu disini"
              editorState={formData.content}
              onEditorStateChange={_setContent}
              toolbarHidden={true}
            />
          </div>
          <Button loading={loading} className="float-right">
            Simpan
          </Button>
        </form>
      </div>
    </BottomSheet>
  );
}
