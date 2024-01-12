import { Card, CardHeader, CardBody, Avatar } from "@nextui-org/react"
import { Image,Dropdown, DropdownItem, Button } from "@nextui-org/react"

const tsc = require ('string-to-color')
const capitalize = (string: string)=> string[0].toUpperCase() + string.slice(1)


export function Photocard (props: {authorName: string, photoTitle: string, url:string}){

    return(<Card className="max-w-[400px] mx-auto">
        
        <CardHeader className="flex-col">
            <div className="flex gap-2 items-center w-full">
                <Avatar style={{backgroundColor: tsc(props.authorName)}} name={`${props.authorName[0].toUpperCase()}`} alt="author avatar" size="sm" className={`mb-2 text-white`}></Avatar>
                <p className="text-xs">by <span className="underline">{props.authorName}</span></p>
                
            </div>
            <Image src={props.url}></Image>
        </CardHeader>
        <CardBody>
            <h1>{capitalize(props.photoTitle)}</h1>
            <section className="flex flex-col gap-4">
                <div>
                    <Dropdown>
                        <DropdownItem>
                            heyu
                        </DropdownItem>
                        <DropdownItem>
                            fds
                        </DropdownItem>
                        <DropdownItem>
                            dfqfq
                        </DropdownItem>
                    </Dropdown>
                    <Button>
                        Click
                    </Button>
                </div>
            </section>
        </CardBody>
    </Card>)
}