import RightNav from "components/Nav/RightNav";
import React, { useState } from "react";
import StoryBox from './StoryBox'

type Props = {
  onOutsideEditor: () => void;
  showEditor: boolean;
  onCloseEditor: () => void;
  titleEditor?: string;
};

function StoryList({ titleEditor, ...props }: Props) {
  const [showDetail, setshowDetail] = useState(false);
  const _showDetailStory=(value:boolean)=>{
    setshowDetail(value)
  }

  return (
    <RightNav {...props}>
      <h1 className="text-green-primary font-semibold mt-10 text-2xl">
        Hutan Kota
      </h1>
      <div className="mt-10 flex flex-col gap-4">
        <StoryBox showDetail={_showDetailStory}/>
        <StoryBox showDetail={_showDetailStory}/>
        <StoryBox showDetail={_showDetailStory}/>
      </div>
      
    </RightNav>
  );
}

export default StoryList;
