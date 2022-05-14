import supabase from "lib/supabase";

export default async function checkUsername(username: string):Promise<boolean> {
  const { data } = await supabase
    .from("user")
    .select("username")
    .eq("username", username)
    .single();

  return !!data;
}



