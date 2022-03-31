import supabase from "lib/supabase";
import React, { useState } from "react";

function useLogout(): [() => void, { logout: any; error: any }, boolean] {
  const [data, setdata] = useState({
    logout: false,
    error: null,
  });
  const [loading, setloading] = useState<boolean>(false);
  return [
    async () => {
      setloading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setdata({
          logout: true,
          error: null,
        });
      } else {
        setdata({
          logout: false,
          error: error,
        });
      }
      setloading(false);
    },
    data,
    loading,
  ];
}

export default useLogout;
