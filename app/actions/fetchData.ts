'use server'

import { cp } from "fs"
import { createApi } from "unsplash-js"
import { revalidatePath } from "next/cache"
import { Photos } from "unsplash-js/dist/methods/search/types/response"
import { Random } from "unsplash-js/dist/methods/photos/types"

let accessKey: string = process.env.ACCESS_KEY? process.env.ACCESS_KEY: ''
const unsplash = createApi({
    accessKey: accessKey  
})

export type photo={
    id:number;
    width: number;
    height: number;
    urls:{large: string; regular: string; raw: string; small: string};
    color: string | null;
    user: {
        username: string;
        name: string
    }
}



export async function fetchList (){
    revalidatePath('/')
    try{
        const response = await unsplash.photos.getRandom({count: 10})
        if (response.errors){
            throw new Error (response.errors[0])
        }else{
            const data = response.response
            return data;
        }
    }catch (error){
        return console.error ('Error: ' + error)
    }
    finally{
        revalidatePath('/')
    }
}