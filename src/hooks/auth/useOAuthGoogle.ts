import { ApiError, PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { authStore } from "store/authStore";
import {checkUsername} from "./useCheckUsername";

export function useFinishRegisGoogle(): [
  (username: string) => Promise<void>,
  ApiError | PostgrestError | null,
  boolean
] {
  const { setAuthStatus } = authStore((state) => state);
  const [error, seterror] = useState<ApiError | PostgrestError | null>(null);
  const [loading, setloading] = useState<boolean>(false);

  return [
    async (username: string) => {
      setloading(true);

      const checkUser = await checkUsername(username);

      if (checkUser) {
        seterror({
          code: "409",
          message: "Username sudah digunakan",
          details: "",
          hint: "",
        });
        setAuthStatus(false, null);
      } else {
        const userData = supabase.auth.user();

        if (userData) {
          const { data, error: insertError } = await supabase
            .from("user")
            .insert([
              {
                username,
                user_id: userData.id,
                email: userData.email,
              },
            ]);
          if (insertError) {
            seterror(insertError);
            setAuthStatus(false, null);
          }

          if (data) {
            setAuthStatus(true, {
              email: userData.email || "",
              username,
              user_id: userData.id,
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

export async function googleProvider() {
  const urlOrigin = window.location.origin;
  try {
    await supabase.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: `${urlOrigin}/register/username`,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export async function redirectLogin(): Promise<
  "username" | "login" | "unregister"
> {
  const user = supabase.auth.user();
  if (user) {
    const { data } = await supabase
      .from("user")
      .select("username, id, user_id, email")
      .eq("user_id", user.id)
      .single();
    if (data) {
      return "login";
    }
    return "username";
  }
  return "unregister";
}
