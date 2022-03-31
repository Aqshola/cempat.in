import { ApiError, PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";

import { UserData } from "types/types";

function useRegis(): [
  (email: string, password: string, name: string) => void,
  {
    user: UserData | null;
    error: ApiError | PostgrestError | null;
  },
  boolean
] {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState<{
    user: UserData | null;
    error: ApiError | PostgrestError | null;
  }>({
    user: null,
    error: null,
  });

  return [
    async (email: string, password: string, username: string) => {
      setdata({
        user:null,
        error:null,
      })
      setloading(true);


      const { user, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setdata({ user: null, error: authError });
        setloading(false);
        return;
      }

      if (user) {
        const { data, error: insertError } = await supabase
          .from("user")
          .insert([
            {
              username,
              user_id: user.id,
              email
            },
          ]);

        if (insertError) {
          setdata({ user: null, error: insertError });
          setloading(false);
          return;
        }

        if (data) {
          setdata({
            user: data[0],
            error: null,
          });
        }
      }
      setloading(false);
      return;
    },
    data,
    loading,
  ];
}

export default useRegis;
