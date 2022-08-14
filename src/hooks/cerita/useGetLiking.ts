import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result } from "types/types";

type liking = {
  like_count: number;
  unlike_count: number;
  status: "like" | "unlike" |null;
};
export default function useGetLiking():[(user_id:string, story_id:string)=>Promise<void>,  Result<liking | null, PostgrestError | null>, boolean] {
  const [result, setresult] = useState<
    Result<liking | null, PostgrestError | null>
  >({
    data: null,
    error: null,
  });

  const [loading, setloading] = useState<boolean>(false);
  return [
    async function (user_id: string, story_id: string) {
      setloading(true);

      const { data, error } = await supabase
        .rpc("get_likes", {
          param_user_id: user_id,
          param_story_id: story_id,
        })

      if (data) {
        setresult({
          data: data[0],
          error: null,
        });
      } else {
        setresult({
          data: null,
          error: error,
        });
      }

      setloading(false);
    },
    result,
    loading,
  ];
}
