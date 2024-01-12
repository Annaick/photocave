'use client'

import { useCallback, useEffect, useState } from "react"
import { Searchbar } from "./ui/searchbar"
import { Photocard } from "./ui/card"
import { Spinner } from "@nextui-org/react" 
import { fetchList, type photo } from "./actions/fetchData"

export default function Page() {
  const [items, setItems] = useState ([])
  const [isLoading, setIsLoading] = useState (false)
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
      {items.map((i:any)=>(
        <li className="mb-6" key={i.id}>
          <Photocard authorName={i.user.name} photoTitle={i.alt_description} url={i.urls.small} key={i.id}  ></Photocard>
        </li>
      ))}
    </ul>
    {isLoading && <div><Spinner className="mx-auto"></Spinner></div>}
  </main>
  )
}
