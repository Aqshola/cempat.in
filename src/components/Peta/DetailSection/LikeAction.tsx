import Button from "components/Button/Button";
import formatLikeNumber from "hooks/helper/formatLikeNumber";
import React from "react";

type Props = {
  loading:boolean;
  likeCallback:()=>void
  unlikeCallback:()=>void
  likeCount:number;
  unlikeCount:number
  status:"like"|"unlike"|null
};

export default function LikeAction({...props}: Props) {
  return (
    <div className="flex gap-2 w-full">
      <Button
        loading={props.loading}
        size="sm"
        variant="outline-gray"
        onClick={props.likeCallback}
      >
        <span className="flex items-center gap-2">
          <img
            src={`/icon/${
                  props.status === "like"
                            ? "filled"
                            : "outline"
                        }/like-logo-${
                  props.status === "like" ? "filled" : "outline"
            }.svg`}
            alt="like"
          />
          {formatLikeNumber(props.likeCount)}
        </span>
      </Button>
      <Button
        loading={props.loading}
        size="sm"
        variant="outline-gray"
        onClick={props.unlikeCallback}
      >
        <span className="flex items-center gap-2">
          <img
            src={`/icon/${
              props.status === "unlike" ? "filled" : "outline"
            }/unlike-logo-${
              props.status === "unlike" ? "filled" : "outline"
            }.svg`}
            alt="unlike"
          />
          {formatLikeNumber(props.unlikeCount)}
        </span>
      </Button>
    </div>
  );
}
