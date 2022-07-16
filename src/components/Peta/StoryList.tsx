import React from 'react'
import StoryBox from './StoryBox'

type Props = {showDetail:(T:any)=>void}

function StoryList({showDetail}: Props) {
  return (
    <div className="mt-10 flex flex-col gap-4">
        <StoryBox showDetail={showDetail}/>
        <StoryBox showDetail={showDetail}/>
        <StoryBox showDetail={showDetail}/>
      </div>
  )
}

export default StoryList