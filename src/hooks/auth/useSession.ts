import { Session } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { UserData } from "types/types";

function useSession(): [() => void, UserData | null, boolean] {
  const [loading, setloading] = useState<boolean>(false);
  const [data, setdata] = useState<UserData | null>(null);

  return [
    async () => {
      setloading(true)
      const session = supabase.auth.session();
      if (session) {
        const { data } = await supabase
          .from("user")
          .select("username, email, id, user_id")
          .eq("user_id", session.user?.id)
          .single();

        if (data) {
          setdata({
            email: data.email,
            user_id: data.user_id,
            username: data.username,
          });
        }
      }else{
        supabase.auth.onAuthStateChange(async (_event,session)=>{
          const { data } = await supabase
            .from("user")
            .select("username, id, user_id")
            .eq("user_id", session?.user?.id)
            .single();
          if (data) {
            setdata({
              email: data.email,
              user_id: data.user_id,
              username: data.username,
            });
          }
        })
      }
      setloading(false)
    },
    data,
    loading,
  ];
}

export default useSession;
