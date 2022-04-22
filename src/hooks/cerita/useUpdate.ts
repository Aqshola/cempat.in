import { PostgrestError } from "@supabase/supabase-js";
import { convertToRaw, EditorState } from "draft-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, Story } from "types/types";

export default function useUpdate():[(id: number,
    user_id: string,
    {
      title,
      content,
    }: {
      title: string;
      content: any;
    })=>Promise<void>,Result<any, PostgrestError | null>,boolean] {
  const [result, setresult] = useState<Result<any, PostgrestError | null>>({
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
