import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { ApiLocation, Result } from "types/types";

function useGet ():[(ne_lng:number,sw_lng:number,ne_lat:number,sw_lat:number)=>Promise<void>,Result<ApiLocation[], PostgrestError | null>,boolean] {
  const [result, setresult] = useState<
    Result<ApiLocation[], PostgrestError | null>
  >({
    data: [],
    error: null,
  });

  const [loading, setloading] = useState<boolean>(false)
  return [
    async (ne_lng:number,sw_lng:number,ne_lat:number,sw_lat:number) => {
      setloading(true)
      const { data, error } = await supabase.rpc("get_locations",{
          ne_lng,
          sw_lng,
          ne_lat,
          sw_lat
      })
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

      setloading(false)
    },result,loading
  ];
};

export default useGet;
