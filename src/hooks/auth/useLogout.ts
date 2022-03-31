import supabase from "lib/supabase";
import React, { useState } from "react";
import { authStore } from "store/authStore";
import { ApiError, PostgrestError } from "@supabase/supabase-js";

function useLogout():[()=>Promise<void>,ApiError|PostgrestError|null,boolean] {
  const [loading, setloading] = useState<boolean>(false);
  const { setAuthStatus } = authStore(state => state);
  const [error, seterror] = useState<ApiError|null>(null)
  return [
    async () => {
      setloading(true);
      const { error } = await supabase.auth.signOut();
      if(error){
        seterror(error)
      }else{
        setAuthStatus(false,null)
      }
      setloading(false);
    },
    error,
    loading,
  ];
}

export default useLogout;
