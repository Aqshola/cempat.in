import RightNav from "components/Nav/RightNav";
import useDetail from "hooks/cerita/useDetail";
import React, { useEffect, useState } from "react";
import { ApiLocation } from "types/types";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useSearchParams } from "react-router-dom";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
  viewData: ApiLocation;
};

function DetailStory({ titleEditor, viewData, ...props }: Props) {
  const [getDetail, result, loading] = useDetail();
  let editorState = EditorState.createEmpty();
  const [searchParams]=useSearchParams()
  const idParams=searchParams.get("id")

  
  useEffect(() => {
    getDetail(Number(idParams)|| 0);
  }, [idParams]);

  if (!loading && result.data) {
    editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(result.data?.content))
    );
  }
  return (
    <RightNav
      {...props}
      title={<p className="font-medium">{viewData.place_name || result.data?.place_name}</p>}
    >
      {loading ? (
        <span
          aria-label="loading"
          className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
        ></span>
      ) : (
        <>
          <h1 className="text-green-primary font-semibold mt-10 text-2xl">
            {result.data?.title}
          </h1>
          <div className="mt-2">
            <Editor
              editorClassName="text-sm font-poppins"
              editorState={editorState}
              readOnly={true}
              toolbarHidden={true}
            />
          </div>
          {/* <p className="text-sm mt-5 font-light">{result.data?.content}</p> */}
        </>
      )}
    </RightNav>
  );
}

export default DetailStory;
