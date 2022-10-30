import { PostgrestError } from "@supabase/supabase-js";
import supabase from "lib/supabase";
import { useState } from "react";
import { ApiLocation, Result, Story } from "types/types";


export default function useSortedUserStory():[(username:string)=>Promise<void>,Result<ApiLocation[],PostgrestError|null>,boolean]{
    const [result, setresult] = useState<Result<ApiLocation[],PostgrestError|null>>({
        data:[],
        error:null
    })
    const [loading, setloading] = useState<boolean>(true)

    return [
        async (username :string)=>{
            
            setloading(true)
            const {data,error}=await supabase.rpc("user_journey",{
                username_param:username
            })
            console.log(data);
            

            if(data){
                setresult({
                    data,
                    error:null
                })
            }else{
                setresult({
                    data:[],
                    error:error
                })
            }
            setloading(false)
        },
        result,
        loading
    ]



}