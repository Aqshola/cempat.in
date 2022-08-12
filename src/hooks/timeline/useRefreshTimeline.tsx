import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, Story } from "types/types";

export default function useRefreshTimeline(): [
  (date: string) => Promise<void>,
  Result<Story[], PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<Result<Story[], PostgrestError | null>>({
    data: [],
    error: null,
  });

  const [loading, setloading] = useState<boolean>(true);

  return [
    async (date: string) => {
      setloading(true);
      
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
        .gt("created_at", date)
        .order("created_at", {
          ascending: false,
        });

      if (data) {
        
        setresult({
          data: data,
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


function formatedTimestamp (newD:Date) {
    const date = newD.toISOString().split('T')[0];
    const time = newD.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }