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

      const { data: Count } = await supabase
        .from("cerita")
        .select("count(*")
        .single();
      if (Count) {
        if (paginateInfinite.from >= Count.count || skip>=Count.count) {
          let totalCount = Count.count as number;
          setpaginateInfinite({
            ...paginateInfinite,
            from: totalCount,
            to: totalCount + 10,
          });
          setresult({
            data: [],
            error: null,
          });
        } else {
          if (paginateInfinite.from === 0 && skip > 0) {
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
              .range(skip, skip + paginateInfinite.limit)
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
            setpaginateInfinite({
              limit: 10,
              from: skip,
              to: skip + paginateInfinite.limit,
            });
          } else {
            const newFrom =
              (paginateInfinite.from + 1) * paginateInfinite.limit + 1;
            const newTo = newFrom + paginateInfinite.limit;
            setpaginateInfinite({
              limit: 10,
              from: newFrom,
              to: newTo,
            });

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
              .range(paginateInfinite.from, paginateInfinite.to)
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
      }
      setloading(false);
    },
    result,
    loading,
  ];
}
