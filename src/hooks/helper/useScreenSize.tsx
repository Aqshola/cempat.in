import React, { useState } from 'react'



export default function useScreenSize():[Function,number] {
const [screenSize, setscreenSize] = useState<number>(0)
  return [
    function(){
        if(window){
            window.addEventListener("resize",()=>{
                setscreenSize(window.innerWidth)
            })
        }
    },
    screenSize
  ]
}