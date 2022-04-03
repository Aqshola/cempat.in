import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";

import { Result } from "types/types";

export default function useDelete(): [
  (id: string) => void,
  Result<any, PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<Result<any, PostgrestError | null>>({
    data: null,
    error: null,
  });
  const [loading, setloading] = useState<boolean>(false);
  return [
    async (id: string) => {
      setloading(true);
      const { data, error } = await supabase
        .from("cerita")
        .delete()
        .match({ id: id });

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
    loading,
  ];
}
