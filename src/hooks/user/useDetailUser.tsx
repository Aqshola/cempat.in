import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Story, Result, User, ApiLocation } from "types/types";

type ResultDetail = {
  user: User;
  story: Story[];
  location: ApiLocation[];
};
export default function useDetailUser(): [
  (username: string) => Promise<void>,
  Result<ResultDetail | null, PostgrestError | null>,
  boolean
] {
  const [result, setresult] = useState<
    Result<ResultDetail | null, PostgrestError | null>
  >({
    data: null,
    error: null,
  });

  const [loading, setloading] = useState<boolean>(true);
  return [
    async (username: string) => {
      setloading(true);

      //GET USER DATA
      const { data: UserData, error: ErrorUser } = await supabase
        .from("user")
        .select("user_id, username")
        .eq("username", username)
        .single();

      ///GET USER STORY AND LOCATION
      if (UserData) {
        const { data: StoryData, error: ErrorStory } = await supabase
          .from("cerita")
          .select("*")
          .eq("user_id", UserData.user_id)
          .order("created_at", {
            ascending: false,
          });

        const { data: LocationData, error: ErrorLocation } = await supabase.rpc(
          "get_user_locations",
          {
            lookup_user: UserData.user_id,
          }
        );

        if (StoryData && LocationData) {
          setresult({
            data: {
              user: UserData,
              story: StoryData,
              location: LocationData,
            },
            error: null,
          });
        } else {
          setresult({
            data: null,
            error: ErrorStory || ErrorLocation,
          });
        }
      } else {
        setresult({
          data: null,
          error: ErrorUser,
        });
      }

      setloading(false);
    },
    result,
    loading,
  ];
}
