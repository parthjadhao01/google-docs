import {parseAsString,useQueryState} from "nuqs";

export function useSerchParam(key : string){
    return useQueryState(
        key,
        parseAsString.withDefault("").withOptions({clearOnDefault : true}),

    )
}