'use client'

import { useCallback, useEffect, useState } from "react"
import { Searchbar } from "../ui/searchbar"
import { Photocard } from "../ui/card"
import { Button, Spinner } from "@nextui-org/react" 
import { fetchList } from "../actions/fetchData"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { IconRotate } from "@tabler/icons-react"
import { useSearchParams } from "next/navigation"
import { nanoid } from "nanoid"


export default function Home() {
  const searchParams = useSearchParams()

  const [query, setQuery] = useState (searchParams.get('query'))
  const [items, setItems] = useState ([])
  const [isLoading, setIsLoading] = useState (false)
  const [error, setError] = useState (false)
  const [index, setIndex] = useState (3)

  useEffect (()=>{
    setItems([])
    setIndex (1)
    getData()
  }, [query])
  
  const getData = async ()=>{
    if (isLoading) return 

    const search = query || ''
    setIsLoading (true)

    let images: any = await fetchList(search, index).catch (()=>{setError(true)})

    setItems(prev=>prev.concat(images))
    setIndex(index + 1)

    setIsLoading(false)
  }


  useEffect(()=>{
    const handleScroll = ()=>{
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 60){
        getData()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }

  }, [getData])

  async function handleError(){
    setError (false)
    await getData()
  }

  
  useEffect  (()=>{
    console.log (error)
  }, [error])


  return (<main className="p-4">
    <Searchbar setQuery={setQuery}></Searchbar>
    <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {items.map((i:Random|undefined)=>{
        if (i){
          return <li className="mb-6" key={nanoid(12)}>
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
