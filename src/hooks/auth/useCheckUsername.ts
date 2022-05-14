import supabase from "lib/supabase";

export default async function checkUsername(username: string):Promise<boolean> {
  const { data } = await supabase
    .from("user")
    .select("username")
    .eq("username", username)
    .single();

  return !!data;
}

// export default function useCheckUsername():[(username:string)=>Promise<void>, boolean, boolean] {
//   const [loading, setloading] = useState<boolean>(false);
//   const [result, setresult] = useState<boolean>(false);
//   return [
//     async (username: string) => {
//       const { data } = await supabase
//         .from("user")
//         .select("username")
//         .eq("username", username)
//         .single();

//       if (data) {
//         setresult(data);
//       }
//       setloading(false);
//     },
//     result,
//     loading,
//   ];
// }
