import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result } from "types/types";



type summary={
    total_place:number,
    total_story:number
  }

export default  function useUserSummary():[(username:string)=>void,Result<summary,PostgrestError | null>, boolean] {
  const [loading, setloading] = useState(true);
  const [result, setresult] = useState<Result<summary,PostgrestError | null>>({
    data: {
      total_place: 0,
      total_story: 0,
    },
    error: null,
  });

  return [
    async (username: string) => {
      setloading(true);
      const { data, error } = (await supabase.rpc("user_summary", {
        uname: username,
      })) as any;
      if (data) {
        setresult({
          data: data[0],
          error: null,
        });
      } else {
        setresult({
          ...result,
          error: error,
        });
      }
      setloading(false);
    },
    result,
    loading
  ];
}
