import { ApiError, PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { authStore } from "store/authStore";

function useRegis(): [
  (email: string, password: string, username: string) => Promise<void>,
  ApiError | PostgrestError | null,
  boolean
] {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState<ApiError | PostgrestError | null>(null);
  const { setAuthStatus } = authStore((state) => state);

  return [
    async (email: string, password: string, username: string) => {
      setloading(true);
      seterror(null);

      //check if username exist
      const { data: checkUser } = await supabase
        .from("user")
        .select("username")
        .eq("username", username)
        .single();

      if (checkUser) {
        seterror({
          code: "409",
          message: "Username sudah digunakan",
          details: "",
          hint: "",
        });
        setAuthStatus(false, null);
      } else {
        const { user, error: authError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (authError) {
          seterror(authError);
          setAuthStatus(false, null);
        }

        if (user) {
          const { data, error: insertError } = await supabase
            .from("user")
            .insert([
              {
                username,
                user_id: user.id,
                email,
              },
            ]);

          if (insertError) {
            seterror(insertError);
            setAuthStatus(false, null);
          }

          if (data) {
            setAuthStatus(true, {
              email,
              username,
              user_id: user.id,
            });
          }
        }
      }
      setloading(false);
    },
    error,
    loading,
  ];
}

export default useRegis;
