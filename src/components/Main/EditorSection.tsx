import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import RightNav from "components/Nav/RightNav";
import useInfoLatLong from "hooks/helper/useInfoLatLong";
import Button from "components/Button/Button";
import useCreate from "hooks/cerita/useCreate";
import { authStore } from "store/authStore";
import { sideNavStore } from "store/navStore";
import { Location } from "types/types";
type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  infoLocation: Location| null;
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

  const gettingInfo = async () => {
    if (infoLocation) {
      let info = await getInfo(infoLocation.lng, infoLocation.lat);
      setplaceName(info.features[0].text);
    }
  };

  const _setTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, title: e.target.value });
  };

  const _setContent = (editorState: EditorState) => {
    setformData({ ...formData, content: editorState });
  };

  const _createStory = () => {
    if (user) {
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
  };

  useEffect(() => {
    if (!loading && !result.error) {
      if(result.data){
        showSideNav(false);
        let res=result.data[0]
        console.log(result.data)
        onSaveEditor({...res});
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

  return (
    <RightNav
      {...props}
      onCloseEditor={() => {
        setplaceName(null);
        props.onCloseEditor();
      }}
    >
      <h1 className="text-green-primary font-semibold mt-10 text-2xl">
        {infoLocation?.place_name ? infoLocation.place_name : placeName}
      </h1>

      <div className="mt-10 w-full border-t py-5">
        <input
          aria-label="judul cerita"
          name="title"
          type="text"
          placeholder="Judul Cerita..."
          className="text-green-primary text-lg placeholder:text-lg  w-full"
          onChange={_setTitle}
          value={formData.title}
        />
        <Editor
          ariaLabel="isi cerita"
          placeholder="Tulis ceritamu disini"
          editorState={formData.content}
          onEditorStateChange={_setContent}
          toolbarHidden={true}
        />
      </div>

      <Button
        loading={loading}
        onClick={_createStory}
        className="self-end mt-20"
      >
        Simpan
      </Button>
    </RightNav>
  );
}
