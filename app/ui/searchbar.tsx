'use client'
import { Input } from "@nextui-org/react"
import { IconSearch } from "@tabler/icons-react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"

export function Searchbar (props: any){
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const {replace} = useRouter()

    const handleSearch = useDebouncedCallback((value: string)=>{
        const params = new URLSearchParams(searchParams)
        if (value){
            params.set('query', value)
        }else{
            params.delete ('query')
        }
        replace(`${pathname}?${params.toString()}`)
        props.search()
        props.reinitialize([])
    }, 500)
    return (
        <Input defaultValue={searchParams.get('query')?.toString()} onChange={(e)=>{handleSearch(e.target.value)}} aria-label="Search a photo" size="sm" radius="full" className="mx-auto max-w-[600px] mb-8" startContent={<IconSearch></IconSearch>}></Input>
    )
}