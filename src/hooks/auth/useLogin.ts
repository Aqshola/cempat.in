import supabase from "lib/Supabase";
import React, { useState } from "react";
import { User, ApiError, PostgrestError } from "@supabase/supabase-js";

type UserData = {
  user_id: string;
  email: string;
  username: string;
};
export default function useLogin(): [
  (email: string, password: string) => void,
  {
    user: UserData | null;
    error: ApiError | null | PostgrestError;
  },
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setdata] = useState<{
    user: UserData | null;
    error: ApiError | null | PostgrestError;
  }>({
    user: null,
    error: null,
  });

  return [
    async (email: string, password: string) => {
      setloading(true);
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        setdata({ user: null, error });
      }

      if (user) {
        const { data, error: ErrorSelect } = await supabase
          .from("user")
          .select("username, id, user_id")
          .eq("user_id", user.id);
        if (data) {
          setdata({
            user: {
              user_id: data[0].user_id,
              username: data[0].username,
              email: user.email || "",
            },
            error: null,
          });
        } else {
          setdata({
            user: null,
            error: ErrorSelect,
          });
        }
      }

      setloading(false);
    },
    data,
    loading,
  ];
}
