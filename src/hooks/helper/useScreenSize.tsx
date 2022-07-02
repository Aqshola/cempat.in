import React, { useState } from 'react'



export default function useScreenSize():[Function,number] {
const [screenSize, setscreenSize] = useState<number>(window.innerWidth)
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