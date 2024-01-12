'use client'

import { useCallback, useEffect, useState } from "react"
import { Searchbar } from "./ui/searchbar"
import { Photocard } from "./ui/card"
import { Button, Spinner } from "@nextui-org/react" 
import { fetchList, type photo } from "./actions/fetchData"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { IconArrowBackUp } from "@tabler/icons-react"

export default function Page() {
  const [items, setItems] = useState ([])
  const [isLoading, setIsLoading] = useState (false)
  const [error, setError] = useState (false)
  const [index, setIndex] = useState (3)


  const fetchData = useCallback(async()=>{
    if (isLoading) return;
    setIsLoading(true)

    let images: any = await fetchList()
    console.log (images)
    setItems(items.concat(images))
    setIndex(index + 1)
    setIsLoading(false)
  }, [index, isLoading])


  useEffect(()=>{
    const getData = async ()=>{
      setIsLoading (true)
      let images: any = await fetchList()
      setItems(items.concat(images))
      setIsLoading(false)
    }
    getData()
  }, [])


  useEffect(()=>{
    const handleScroll = ()=>{
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20){
        fetchData()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }

  }, [fetchData])

  return (<main className="p-4">
    <Searchbar></Searchbar>
    <ul>
      {items.map((i:Random|undefined)=>{
        if (i){
          return <li className="mb-6" key={i.id}>
          <Photocard authorName={i.user.name} photoTitle={i.alt_description? i.alt_description.toString(): ''} url={i.urls.small} key={i.id} avatar={i.user.profile_image.small}></Photocard>
          </li>
        }else{
        }
        return <p className="text-center">Misy blem an! mbola tsisy mesure mipetraka fa ndana ataovy reload le page</p>
      })}
    </ul>
    {isLoading && <div className="flex justify-center"><Spinner className="mx-auto"></Spinner></div>}
  </main>
  )
}
