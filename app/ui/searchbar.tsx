import { Input } from "@nextui-org/react"
import { IconSearch } from "@tabler/icons-react"

export function Searchbar (){
    return (
        <Input aria-label="Search a photo" size="sm" radius="full" className="mx-auto max-w-[600px] mb-8" startContent={<IconSearch></IconSearch>}></Input>
    )
}