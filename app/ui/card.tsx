import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react"
import { Image,Dropdown, DropdownItem, Button, ButtonGroup, DropdownTrigger, DropdownMenu } from "@nextui-org/react"
import { IconChevronCompactDown, IconDownload, IconChevronDown } from "@tabler/icons-react"
import { useState } from "react"

const tsc = require ('string-to-color')
const capitalize = (string: string)=> string[0].toUpperCase() + string.slice(1)


export function Photocard (props: {authorName: string, photoTitle: string, url:string, avatar: string}){
    const [option, setOption] = useState('large')
    function handleOption(e: any){
        setOption(e)
    }

    return(<Card className="max-w-[400px] mx-auto">
        
        <CardHeader className="flex-col">
            <div className="flex gap-2 items-center w-full">
                <Avatar src={props.avatar} style={{backgroundColor: tsc(props.authorName)}} name={`${props.authorName[0].toUpperCase()}`} alt="author avatar" size="sm" className={`mb-2 text-white`}></Avatar>
                <p className="text-xs">by <span className="underline">{props.authorName}</span></p>
                
            </div>
            <Image src={props.url} alt={props.photoTitle}></Image>
        </CardHeader>
        <CardBody>
            <h1 className="mb-4">{capitalize(props.photoTitle)}</h1>
            <section className="flex flex-col gap-4">
                <ButtonGroup color="primary" className="justify-start">
                    <Button>Download</Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly>
                                <IconChevronDown></IconChevronDown>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            disallowEmptySelection 
                            aria-label="Size options"
                            selectedKeys={option}
                            selectionMode="single"
                            onSelectionChange={handleOption}
                            className="max-w-[300px]"
                        >
                            <DropdownItem key={'large'}>
                                Large
                            </DropdownItem>
                            <DropdownItem key={'medium'}>
                                Medium
                            </DropdownItem>
                            <DropdownItem key={'small'}>
                                Small
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ButtonGroup>
            </section>
        </CardBody>
    </Card>)
}