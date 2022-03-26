import React, { useEffect, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import RightNav from "components/Nav/RightNav";
import useInfoLatLong from "helper/useInfoLatLong";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  infoLocation: { lng: number; lat: number,name?:string|null } | null;
  onSaveEditor: () => void;
};

export default function EditorSection({
  infoLocation,
  onSaveEditor,
  ...props
}: Props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const [getInfo] = useInfoLatLong();
  const [placeName, setplaceName] = useState<any>()
  const gettingInfo = async () => {
    if (infoLocation) {
      let info = await getInfo(infoLocation.lng, infoLocation.lat);
      console.log(info)
      setplaceName(info.features[0].text)
    }
  };

  useEffect(() => {
    if (props.showEditor) {
      gettingInfo();
    }
  }, [props.showEditor]);

  return (
    <RightNav {...props}>
      <h1 className="text-green-primary font-semibold mt-10 text-2xl">{infoLocation?.name? infoLocation.name:placeName}</h1>
      <div className="mt-10 w-full">
        <Editor
          placeholder="Tulis ceritamu disini"
          editorState={editorState}
          onEditorStateChange={seteditorState}
          toolbar={{
            options: ["inline", "fontSize", "list", "textAlign", "history"],
            inline: { inDropdown: false },
            list: { inDropdown: true },
            textAlign: { inDropdown: false },
            link: { inDropdown: true },
            history: { inDropdown: true },
          }}
        />
      </div>

      <button
        onClick={onSaveEditor}
        className={
          "rounded-lg px-3 py-2 text-sm md:text-base w-fit self-end mt-20 font-semibold bg-green-primary text-white"
        }
      >
        Simpan
      </button>
    </RightNav>
  );
}
