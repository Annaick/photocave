'use server'

import { cp } from "fs"
import { createApi } from "unsplash-js"
import { revalidatePath } from "next/cache"
import { Photos } from "unsplash-js/dist/methods/search/types/response"

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



export async function fetchList (query: string, page: number){
    revalidatePath('/**')
    try{
        let response
        if (query == ''){
            response = await unsplash.photos.getRandom({count: 4}, {cache: 'no-store'})
            if (response.errors){
                throw new Error (response.errors[0])
            }else{
                revalidatePath('/**')
                const data = response.response
                console.log (data)
                return data;
            }
        }else{
            response = await unsplash.search.getPhotos({query: query, perPage: 4, page:  page})
            if (response.errors){
                throw new Error (response.errors[0])
            }else{
                revalidatePath('/**')
                
                const data = response.response.results
                console.log (data)
                return data;
            }
        }
    }catch (error){
        return new Error ('Error: ' + error)
    }
    finally{
        revalidatePath('/**')
    }
}

export async function triggerDownload (url: string) {
    try{
        await unsplash.photos.trackDownload({downloadLocation: url})
    }catch (err){
        console.error(err)
    }
}