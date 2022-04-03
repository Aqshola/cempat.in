import { PostgrestError } from "@supabase/supabase-js";
import { convertToRaw, EditorState } from "draft-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Location, Result } from "types/types";

export default function useCreate (): [(coor:Location,title:string, content:EditorState, user_id:string)=>Promise<void>, Result<any,PostgrestError|null>, boolean] {
  const [result, setresult] = useState<Result<any, PostgrestError | null>>({
    data: null,
    error: null,
  });
  const [loading, setloading] = useState<boolean>(false);

  return [
    async (coor: Location, title: string, content: EditorState, user_id: string) => {
      setloading(true);
      const { data, error } = await supabase.from("cerita").insert({
        place_name: coor.place_name,
        lng: coor.lng,
        lat: coor.lat,
        title,
        content:JSON.stringify(convertToRaw(content.getCurrentContent())),
        user_id,
      });

      if (data) {
        setresult({
          data,
          error: null,
        });
      } else {
        setresult({
          data: null,
          error,
        });
      }
      setloading(false);
    },
    result,
    loading,
  ];
};


