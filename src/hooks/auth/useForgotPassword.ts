import { ApiError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { Result } from "types/types";

export function useForgotPassword(): [
  (email: string) => Promise<void>,
  Result<boolean | null, ApiError | null>,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [result, setresult] = useState<Result<boolean | null, ApiError | null>>(
    {
      data: null,
      error: null,
    }
  );

  return [
    async (email: string) => {
      setloading(true);
      const urlOrigin = window.location.origin;

      const { data } = await supabase
        .from("user")
        .select("email")
        .eq("email", email);

      console.log(data)

      if (!data || data.length === 0) {
        setresult({
          data: false,
          error: {
            message: "Email tidak ditemukan",
            status: 400,
          },
        });
      } else {
        const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
          redirectTo: `${urlOrigin}/lupa-sandi`,
        });

        if (error) {
          setresult({
            data: false,
            error,
          });
        } else {
          setresult({
            data: true,
            error: null,
          });
        }
      }

      setloading(false);
    },
    result,
    loading,
  ];
}

export function useUpdatePassword(): [
  (pass: string, confirm_pass: string) => Promise<void>,
  ApiError | null,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<ApiError | null>(null);

  return [
    async (token: string, pass: string) => {
      setloading(true);
      const { error } = await supabase.auth.api.updateUser(token, {
        password: pass,
      });

      if (error) {
        seterror(error);
      }

      setloading(false);
    },
    error,
    loading,
  ];
}
