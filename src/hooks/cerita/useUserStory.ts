import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, ApiLocation, Story } from "types/types";
import { PostgrestError } from "@supabase/supabase-js";






function useUserStory(): [
  (user_id: string) => Promise<void>,
  Result<Story[], PostgrestError | null>,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [result, setresult] = useState<
    Result<Story[], PostgrestError | null>
  >({
    data: [],
    error: null,
  });

  return [
    async (user_id: string) => {
      setloading(true);
      const { data, error } = await supabase
        .from("cerita")
        .select("*")
        .eq("user_id", user_id);

      if (data) {
        setresult({
          data,
          error: null,
        });
      } else {
        setresult({
          data: [],
          error: error,
        });
      }

      setloading(false);
    },
    result,
    loading,
  ];
}

export default useUserStory;
