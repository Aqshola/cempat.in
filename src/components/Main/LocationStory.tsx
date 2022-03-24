import RightNav from "components/Nav/RightNav";
import React, { useState } from "react";
import StoryDetail from "./StoryDetail";
import StoryList from "./StoryList";

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
};

function LocationStory({ titleEditor, ...props }: Props) {
  const [showDetail, setshowDetail] = useState(false);
  const _showDetailStory=(value:boolean)=>{
    setshowDetail(value)
  }

  return (
    <RightNav {...props}>
      <h1 className="text-green-primary font-semibold mt-10 text-2xl">
        Hutan Kota
      </h1>
      {showDetail ? <StoryDetail showDetail={_showDetailStory} /> : <StoryList showDetail={_showDetailStory}/>}
    </RightNav>
  );
}

export default LocationStory;
