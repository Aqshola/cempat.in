import { PostgrestError } from "@supabase/supabase-js";
import { convertToRaw, EditorState } from "draft-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Location, Result, Story } from "types/types";
import { teleModeration } from "hooks/helper/useTele";

export default function useCreate(): [
  (
    coor: Location,
    title: string,
    content: EditorState,
    user_id: string
  ) => Promise<void>,
  Result<Story|any, PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<Result<Story|any, PostgrestError | null>>({
    data: null,
    error: null,
  });
  const [loading, setloading] = useState<boolean>(false);

  return [
    async (
      coor: Location,
      title: string,
      content: EditorState,
      user_id: string
    ) => {
      setloading(true);
      const { data, error } = await supabase.from("cerita").insert({
        place_name: coor.place_name,
        lng: coor.lng,
        lat: coor.lat,
        title,
        content: JSON.stringify(convertToRaw(content.getCurrentContent())),
        user_id,
      });

      if (data) {
        setresult({
          data,
          error: null,
        });

        teleModeration(data[0].id||" ", title, content.getCurrentContent().getPlainText(), "create");
      } else {
        setresult({
          data: null,
          error,
        });
      }
      setloading(false);
    },
    result,
    loading,
  ];
}
