import { Session } from "@supabase/supabase-js";
import supabase from "lib/Supabase";
import React, { useState } from "react";

function useSession(): [() => void, Session | null, boolean] {
  const [loading, setloading] = useState<boolean>(false);
  const [session, setsession] = useState<Session | null>(null);
  return [
    () => {
      supabase.auth.onAuthStateChange((_event, session) => {
        setloading(true);
        setsession(session);
        setloading(false);
      });
    },
    session,
    loading,
  ];
}

export default useSession;
