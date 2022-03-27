import supabase from "lib/Supabase";
import React, { useState } from "react";
import { User, ApiError } from "@supabase/supabase-js";

export function useLogin(): [
  (email: string, password: string) => void,
  {
    user: User | null;
    error: ApiError | null;
  },
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setdata] = useState<{
    user: User | null;
    error: ApiError | null;
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
      setdata({ user, error });
      setloading(false);
    },
    data,
    loading,
  ];
}
