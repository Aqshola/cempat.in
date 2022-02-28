import React, { useRef, useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import useOutsideClick from "helper/useOutsideClick";
import { CgClose } from "react-icons/cg";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor: string;
  onSaveEditor: () => void;
};

export default function EditorSection({
  titleEditor,
  onCloseEditor,
  onOutsideEditor,
  showEditor,
  onSaveEditor
}: Props) {
  const [editorState, seteditorState] = useState(EditorState.createEmpty());
  const rightNavRef = useRef(null);
  useOutsideClick(rightNavRef, () => {
    onOutsideEditor();
  });
  return (
    <div
      ref={rightNavRef}
      id="right-nav"
      className={
        "transition-all duration-500 min-h-screen w-full md:w-1/2 absolute right-0 top-0 bg-white z-20 py-7 px-4 flex flex-col " +
        (showEditor ? "translate-x-0 visible" : " translate-x-full invisible")
      }
    >
      <button className="w-fit h-fit" onClick={onCloseEditor}>
        <CgClose className="w-6 h-6 text-[#03C88E]" />
      </button>
      <h1 className="text-[#03C88E] font-semibold mt-10 text-2xl">
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
          "rounded-lg px-3 py-2 text-sm md:text-base w-fit self-end mt-20 font-semibold bg-[#03C88E] text-white"
        }
      >
        Simpan
      </button>
    </div>
  );
}
