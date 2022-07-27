import supabase from "lib/supabase";
import { useState } from "react";

export async function checkUsername(username: string): Promise<boolean> {
  const { data } = await supabase
    .from("user")
    .select("username")
    .eq("username", username)
    .single();

  return !!data;
}

export function useCheckUsername(): [
  (username: string) => Promise<void>,
  boolean,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [found, setfound] = useState<boolean>(false);

  return [
    async (username: string) => {
      setloading(true);
      const { data, error } = await supabase
        .from("user")
        .select("username")
        .eq("username", username);
      
      setloading(false)
      setfound(!!data?.length);
    },
    found,
    loading,
  ];
}
