import { PostgrestError } from "@supabase/supabase-js";

import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, Story } from "types/types";

export default function useDetail(): [
  (id: number) => Promise<void>,
  Result<Story | null, PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<
    Result<Story | null, PostgrestError | null>
  >({
    data: null,
    error: null,
  });

  const [loading, setloading] = useState<boolean>(false);

  return [
    async (id: number) => {
      setloading(true);
      const { data, error } = await supabase
        .from("cerita")
        .select("*, user:user(username)")
        .eq("id", id)
        .single();

        console.log(data);

      if (data) {
        setresult({
          data: data,
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
