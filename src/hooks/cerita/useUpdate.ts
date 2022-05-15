import { PostgrestError } from "@supabase/supabase-js";
import { convertToRaw, EditorState } from "draft-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, Story } from "types/types";
import {teleModeration} from "hooks/helper/useTele"

export default function useUpdate():[(id: number,
    user_id: string,
    {
      title,
      content,
    }: {
      title: string;
      content: any;
    })=>Promise<void>,Result<any, PostgrestError | null>,boolean] {
  const [result, setresult] = useState<Result<Story|any, PostgrestError | null>>({
    data: null,
    error: null,
  });

  const [loading, setloading] = useState<boolean>(false);
  return [
    async (
      id: number,
      user_id: string,
      {
        title,
        content,
      }: {
        title: string;
        content: EditorState;
      }
    ) => {
      setloading(true);
      const { data, error } = await supabase
        .from("cerita")
        .update({
          title,
          content:JSON.stringify(convertToRaw(content.getCurrentContent())),
        })
        .match({ id, user_id });

      if (data) {
        setresult({
          data,
          error: null,
        });
        teleModeration(data[0].id||" ", title, content.getCurrentContent().getPlainText(), "Update");
      } else {
        setresult({
          data,
          error: error,
        });
      }
      setloading(false);
    },
    result,
    loading
  ];
}
