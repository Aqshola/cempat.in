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
  boolean|null,
  boolean
] {
  const [loading, setloading] = useState<boolean>(false);
  const [found, setfound] = useState<boolean|null>(null);

  return [
    async (username: string) => {
      setloading(true);
      const { data, error } = await supabase
        .from("user")
        .select("username")
        .eq("username", username);

      if(data && data.length>0){
        setfound(true);
      }else{
        setfound(false)
      }
      setloading(false)
    },
    found,
    loading,
  ];
}
