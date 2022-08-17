import supabase from "lib/supabase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "store/authStore";
import useLogout from "./useLogout";

function useSession(): [() => void, boolean] {
  const [loading, setloading] = useState<boolean>(true);
  const { setAuthStatus } = authStore((state) => state);
  const [logout] = useLogout();
  const navigate = useNavigate();

  return [
    async (link: string = "/") => {
      setloading(true);
      const session = supabase.auth.session();

      if (session?.user) {
        const { data } = await supabase
          .from("user")
          .select("username, email, id, user_id")
          .eq("user_id", session.user?.id)

        if (data && data.length>0) {
          setAuthStatus(true, data[0]);
        } else {
          setAuthStatus(false, null);
          if(link!=="/"){
            navigate(link);
          }
        }
      } else {
        logout();
      }
      setloading(false);
    },
    loading,
  ];
}

export default useSession;
