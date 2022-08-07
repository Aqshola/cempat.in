import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result, ApiLocation} from "types/types";
import { PostgrestError } from "@supabase/supabase-js";


export default function useGetLocations(): [
  (user_id: string) => void,
  Result<ApiLocation[], PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<
    Result<ApiLocation[], PostgrestError | null>
  >({
    data: [],
    error: null,
  });

  const [loading, setloading] = useState<boolean>(false);

  return [
    async (user_id: string) => {
      setloading(true);
      const { data, error } = await supabase.rpc("get_user_locations", {
        lookup_user:user_id
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
