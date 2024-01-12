'use server'

import { cp } from "fs"
import { createApi } from "unsplash-js"

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
    try{
        const response = await unsplash.photos.getRandom({count: 10})
        //const response = await unsplash.photos.list({page: page, perPage: limit})
        if (response.errors){
            throw new Error (response.errors[0])
        }else{
            const data = response.response
            console.log (data)
            return data;
        }
    }catch (error){
        console.error ('Error: ' + error)
    }
}