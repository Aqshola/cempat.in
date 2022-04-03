import supabase from "lib/supabase";
import React, { useState } from "react";
import { ApiError, PostgrestError } from "@supabase/supabase-js";
import { authStore } from "store/authStore";

export default function useLogin(): [
  (email: string, password: string) => Promise<void>,
  ApiError | PostgrestError | null,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const { setAuthStatus } = authStore((state) => state);
  const [error, seterror] = useState<ApiError | PostgrestError | null>(null);

  return [
    async (email: string, password: string) => {
      setloading(true);
      seterror(null);
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
      });

      if (error) {
        seterror(error);
        setAuthStatus(false, null);
      }

      if (user) {
        const { data, error: ErrorSelect } = await supabase
          .from("user")
          .select("username, id, user_id, email")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setAuthStatus(true, data);
        } else {
          seterror(ErrorSelect);
          setAuthStatus(false, null);
        }
      }

      setloading(false);
    },
    error,
    loading,
  ];
}
