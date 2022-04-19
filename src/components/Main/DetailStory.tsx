import RightNav from "components/Nav/RightNav";
import useDetail from "hooks/cerita/useDetail";
import React, { useEffect, useState } from "react";
import { ApiLocation } from "types/types";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useSearchParams } from "react-router-dom";
import { data } from "autoprefixer";
import parseDateString from "hooks/helper/parseDateString";

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
  const [searchParams] = useSearchParams();
  const idParams = searchParams.get("id");

  useEffect(() => {
    getDetail(Number(idParams) || 0);
  }, [idParams]);

  if (!loading && result.data) {
    editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(result.data?.content))
    );
  }
  return (
    <RightNav
      {...props}
      title={
        <p className="font-medium">
          {viewData.place_name || result.data?.place_name}
        </p>
      }
    >
      {loading ? (
        <span
          aria-label="loading"
          className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
        ></span>
      ) : (
        <>
          <p className="text-right text-xs mt-10">
            Ditulis oleh {" "}
            <span className="font-semibold">{result.data?.user.username}</span>,{" "}
            {result.data?.created_at? parseDateString(result.data?.created_at || " "):""}
          </p>
          <h1 className="text-green-primary font-semibold text-3xl mt-2">
            {result.data?.title}
          </h1>

          <div className="mt-1">
            <Editor
              editorClassName="text-sm font-poppins"
              editorState={editorState}
              readOnly={true}
              toolbarHidden={true}
            />
          </div>
        </>
      )}
    </RightNav>
  );
}

export default DetailStory;
