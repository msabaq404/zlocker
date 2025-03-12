import { PostgrestError } from "@supabase/supabase-js";

export default function errored(errors: (PostgrestError | null)[]) { 
    if(errors.reduce( (p, c) => p || c)){
        alert("We screwed up");
    }
}