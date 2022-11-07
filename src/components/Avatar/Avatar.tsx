import clsx from "clsx";
import React from "react";

type AvatarProps = {
  size?: "lg" | "md" | "sm";
  className?:string;
  name:string
};

const AvatarSize: {
  [key: string]: string;
} = {
  lg: "w-32 h-32",
  md: "w-14 h-14",
  sm: "w-10 h-10",
};

export default function Avatar({size="md", className,name}: AvatarProps) {
  const splitName=name.split(" ");
  const avatarName=splitName.length>1?splitName[0][0]+splitName[splitName.length-1][0]:splitName[0][0]+splitName[0][splitName[0].length-1][0]
  return (
    <div
      id="profile"
      className={clsx(
        "rounded-full bg-blue-primary text-white font-extrabold flex items-center justify-center font-nunito uppercase",
        AvatarSize[size],
        className
      )}
    >
      {avatarName}
    </div>
  );
}
