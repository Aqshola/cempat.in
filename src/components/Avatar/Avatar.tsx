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
  const avatarName=name.charAt(0)+name.charAt(name.length-1)
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
