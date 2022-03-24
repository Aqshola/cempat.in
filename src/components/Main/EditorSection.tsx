import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import RightNav from "components/Nav/RightNav";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor: string;
  onSaveEditor: () => void;
};

export default function EditorSection({
  titleEditor,
  onSaveEditor,
  ...props
}: Props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  
  return (
    <RightNav {...props}>
      <h1 className="text-green-primary font-semibold mt-10 text-2xl">
        {titleEditor}
      </h1>
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
