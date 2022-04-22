import { ApiError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";

export function useForgotPassword(): [
  (email: string) => Promise<void>,
  ApiError | null,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<ApiError | null>(null);

  return [
    async (email: string) => {
      setloading(true);
      const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/lupa-sandi",
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
