import { Session } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "store/authStore";
import { UserData } from "types/types";
import useLogout from "./useLogout";


function useSession(): [() => void, boolean] {
  const [loading, setloading] = useState<boolean>(false);
  const { setAuthStatus } = authStore((state) => state);
  const [logout] = useLogout();
  const navigate=useNavigate()

  return [
    async () => {
      setloading(true);
      const session = supabase.auth.session();
      
      
      if (session?.user) {
        const { data } = await supabase
          .from("user")
          .select("username, email, id, user_id")
          .eq("user_id", session.user?.id)
          .single();

        if (data) {
          setAuthStatus(true, data);
        }else{
          setAuthStatus(false, null);
          navigate("/register/username");

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
