import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, Story } from "types/types";

export default function useGetListPost(): [
  (limit: number, from: number, to: number) => Promise<void>,
  Result<Story[], PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<Result<Story[], PostgrestError | null>>({
    data: [],
    error: null,
  });

  const [loading, setloading] = useState<boolean>(true);
  return [
    async (limit: number = 10, from: number, to: number) => {
      setloading(true);
      const { data: Count } = await supabase.from("cerita").select("count(*");
      if (Count) {
        if (Count[0].count <= from + 1) {
          setresult({
            data: [],
            error: null,
          });
        } else {
          const { data, error } = await supabase
            .from("cerita")
            .select(
              `id,
              lng,lat,
              place_name,title,
              created_at,
              user(
                  username
              )
              `
            )
            .limit(limit)
            .range(from, to)
            .order("created_at", {
              ascending: false,
            });

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
        }
      }

      setloading(false);
    },
    result,
    loading,
  ];
}
