'use client'

import { useCallback, useEffect, useState } from "react"
import { Searchbar } from "./ui/searchbar"
import { Photocard } from "./ui/card"
import { Button, Spinner } from "@nextui-org/react" 
import { fetchList } from "./actions/fetchData"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { IconRotate } from "@tabler/icons-react"
import { SearchParams } from "unsplash-js/dist/methods/search"
import { useSearchParams } from "next/navigation"


export default function Page() {
  const [items, setItems] = useState ([])
  const [isLoading, setIsLoading] = useState (false)
  const [error, setError] = useState (false)
  const [index, setIndex] = useState (1)

  const searchParams = useSearchParams()


  const fetchData = useCallback(async()=>{
    const search = searchParams.get('query') || undefined
    if (isLoading) return;
    setIsLoading(true)

    let images: any = await fetchList(search).catch (()=>{setError(true)})
    console.log (images)
    setItems(items.concat(images))
    setIndex(index + 1)
    setIsLoading(false)
  }, [index, isLoading])

  const getData = async ()=>{
    const search = searchParams.get('query') || undefined
    setIsLoading (true)
    let images: any = await fetchList(search).catch (()=>{setError(true)})
    setItems(items.concat(images))
    setIsLoading(false)
  }

  useEffect(()=>{ 
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

  async function handleError(){
    setError (false)
    await getData()
  }

  
  useEffect  (()=>{
    console.log (error)
  }, [error])


  return (<main className="p-4">
    <Searchbar search={fetchData} reinitialize ={setItems}></Searchbar>
    <ul>
      {items.map((i:Random|undefined)=>{
        if (i){
          return <li className="mb-6" key={i.id}>
          <Photocard photo={i}></Photocard>
          </li>
        }
      })}
    </ul>
    {error && <div className="flex flex-col justify-center items-center gap-2 mt-16">
      <p>Oups! An error occured</p>
      <Button startContent={<IconRotate></IconRotate>} variant="bordered" onClick={handleError}>reload</Button>
      </div>}
    {isLoading && !error && <div className="flex justify-center"><Spinner className="mx-auto"></Spinner></div>}
  </main>
  )
}
