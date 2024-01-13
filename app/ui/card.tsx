import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react"
import { Image,Dropdown, DropdownItem, Button, ButtonGroup, DropdownTrigger, DropdownMenu } from "@nextui-org/react"
import {  IconChevronDown } from "@tabler/icons-react"
import { Random } from "unsplash-js/dist/methods/photos/types"
import { triggerDownload } from "../actions/fetchData"
import { useEffect, useState } from "react"
import Link from "next/link"
import { saveAs } from 'file-saver'

const tsc = require ('string-to-color')
const capitalize = (string: string)=> string[0].toUpperCase() + string.slice(1)


export function Photocard (props:{photo:Random}){
    const [option, setOption] = useState(['0'])
    const urls = [
        props.photo.urls.full,
        props.photo.urls.regular,
        props.photo.urls.small
    ]

    async function downloadPhoto(){
        try{
            const name = props.photo.alt_description?.split(' ').slice(0, 3).join('-') + '.jpg'
            const url = urls[Number.parseInt(option[0])]
            alert (name + ' downloading...')
            saveAs(url, name)
            await triggerDownload(props.photo.links.download_location)
        }catch (err){
            console.error (err)
        }
    }


    function handleOption(e: any){
        setOption(e)
    }

    return(<Card className="max-w-[400px] mx-auto">
        
        <CardHeader className="flex-col">
            <div className="flex gap-2 items-center w-full">
                <Avatar src={props.photo.user.profile_image.small} style={{backgroundColor: tsc(props.photo.user.name)}} name={`${props.photo.user.name[0].toUpperCase()}`} alt="author avatar" size="sm" className={`mb-2 text-white`}></Avatar>
                <p className="text-xs">by <span className="underline">{props.photo.user.name}</span></p>
                
            </div>
            <Image src={props.photo.urls.small} alt={props.photo.alt_description? props.photo.alt_description: ''}></Image>
        </CardHeader>
        <CardBody>
            <h1 className="mb-4">{capitalize(props.photo.alt_description? props.photo.alt_description: '')}</h1>
            <section className="flex flex-col gap-4">
                <ButtonGroup color="primary" className="justify-start">
                <Button onClick={downloadPhoto}>Download</Button>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button isIconOnly>
                                <IconChevronDown></IconChevronDown>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu 
                            disallowEmptySelection 
                            defaultSelectedKeys={option}
                            aria-label="Size options"
                            selectedKeys={option}
                            selectionMode="single"
                            onSelectionChange={handleOption}
                            className="max-w-[300px]"
                        >
                            <DropdownItem key={'0'}>
                                Large
                            </DropdownItem>
                            <DropdownItem key={'1'}>
                                Medium
                            </DropdownItem>
                            <DropdownItem key={'2'}>
                                Small
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </ButtonGroup>
            </section>
        </CardBody>
    </Card>)
}