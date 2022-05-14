import { ApiError, PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { authStore } from "store/authStore";
import { Result } from "types/types";
import checkUsername from "./useCheckUsername";
import useCheckUsername from "./useCheckUsername";

export function useLoginGoogle(): [
  () => Promise<void>,
  boolean,
  ApiError | PostgrestError | null
] {
  const setAuthStatus = authStore((state) => state.setAuthStatus);
  const [loading, setloading] = useState<boolean>(false);
  const [error, seterror] = useState<ApiError | PostgrestError | null>(null);
  return [
    async () => {
      setloading(true);
      const { user, error } = await supabase.auth.signIn({
        provider: "google",
      });

      if (error) {
        seterror(error);
        setAuthStatus(false, null);
        setloading(false);
        return;
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
    loading,
    error,
  ];
}

export function useInitRegistGoogle(): [
  () => Promise<void>,
  boolean,
  Result<
    | {
        email: string;
        user_id: string;
      }
    | any,
    PostgrestError | ApiError | null
  >
] {
  const setAuthStatus = authStore((state) => state.setAuthStatus);
  const [loading, setloading] = useState<boolean>(false);
  const [result, setresult] = useState<
    Result<
      | {
          email: string;
          user_id: string;
        }
      | any,
      PostgrestError | ApiError | null
    >
  >({
    data: null,
    error: null,
  });

  return [
    async () => {
      setloading(true);
      const { user, error } = await supabase.auth.signIn(
        {
          provider: "google",
        },
        {
          redirectTo: "http://localhost:3000/register/username",
        }
      );

      if (error) {
        setresult({
          data: null,
          error,
        });
        setAuthStatus(false, null);
        setloading(false);
        return;
      }

      if (user) {
        setresult({
          data: {
            email: user.email,
            user_id: user.id,
          },
          error: null,
        });
      }
      setloading(false);
    },
    loading,
    result,
  ];
}

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
