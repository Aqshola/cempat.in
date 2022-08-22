import React from "react";


type Props = {
  leftElement?:React.ReactNode
  rightText?:string
  detail?:React.ReactNode
  title:string
};

export default function ListBox({...props}: Props) {
  return (
    <div className="transition-shadow cursor-pointer list-box flex flex-col p-3 border border-green-primary rounded-md">
      <div className="flex justify-between items-center">
        {props.leftElement}
        <h5 className="truncate font-semibold text-xl text-green-primary">{props.title}</h5>
        <p className="text-xs font-nunito font-light">{props.rightText}</p>
      </div>
      {props.detail}
    </div>
  );
}
