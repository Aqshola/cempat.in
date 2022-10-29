import { PostgrestError } from "@supabase/supabase-js";
import { Pagination } from "@tanstack/react-table";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, Story } from "types/types";

export default function useGetListPost(): [
  (skip: number) => Promise<void>,
  Result<Story[], PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<Result<Story[], PostgrestError | null>>({
    data: [],
    error: null,
  });

  const [paginateInfinite, setpaginateInfinite] = useState({
    from: 0,
    to: 10,
    limit: 10,
  });

  const [loading, setloading] = useState<boolean>(true);
  return [
    async (skip: number = 0) => {
      setloading(true);
      let from = paginateInfinite.from;
      let to = paginateInfinite.from + paginateInfinite.limit;

      

      const { data: Count } = await supabase
        .from("cerita")
        .select("count(*")
        .single();

        

      if (Count) {
        if (skip === 0 && paginateInfinite.from === 0) {
          
          from = 0;
          to = paginateInfinite.limit;
        } else if (skip >= Count.count) {
          
          from = Count.count + 1;
          to = Count.count + paginateInfinite.limit;
        } else if (skip > 0) {
          
          from = skip;
          to = skip + paginateInfinite.limit;
        }

        

        
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
      } else {
        setresult({
          data: [],
          error: null,
        });
      }
      setloading(false);
    },
    result,
    loading,
  ];
}
