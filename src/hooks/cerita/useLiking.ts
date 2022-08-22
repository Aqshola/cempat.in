import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result } from "types/types";

export default function useLiking(): [
  (
    user_id: string,
    story_id: string,
    action: "like" | "unlike"
  ) => Promise<void>,
  Result<"like" | "unlike"  | null, PostgrestError | null>,
  boolean
] {
  const [loading, setloading] = useState(false);
  const [result, setresult] = useState<
    Result<"like" | "unlike"  | null, PostgrestError | null>
  >({
    data: null,
    error: null,
  });
  return [
    async function (
      user_id: string,
      story_id: string,
      action: "like" | "unlike" 
    ) {
      setloading(true);

      //Check if users already like
      const { data, error } = await supabase
        .from("likes")
        .select("*")
        .match({
          story_id: story_id,
          user_id: user_id,
        })

      if (data && data.length>0) {
        //Check if users like twice, then delete
        if (data[0].status === action) {
          await supabase.from("likes").delete().match({
            story_id: story_id,
            user_id: user_id,
          });
          setresult({
            data: null,
            error: null,
          });
        } else {
          await supabase
            .from("likes")
            .update({
              status: action,
            })
            .match({
              story_id: story_id,
              user_id: user_id,
            });

          setresult({
            data: action,
            error: null,
          });
        }
      } else {
        await supabase.from("likes").insert({
          story_id: story_id,
          user_id: user_id,
          status: action,
        });

        setresult({
          data: action,
          error: null,
        });
      }
      setloading(false);
    },
    result,
    loading,
  ];
}
