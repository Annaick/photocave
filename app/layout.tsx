'use client'


import { Inter } from 'next/font/google'
import { Providers } from './provider'
import './globals.css'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Link } from '@nextui-org/react'
import { IconBrandGithub, IconMoon, IconSun } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [locale] = useState ((): boolean =>{
    if (typeof window != "undefined"){
      let save = localStorage.getItem ('darkMode')
      if (save == null || save == undefined){
        return false
      }
      return JSON.parse(save)
    }
    return false
  })
  const [darkMode, setDarkMode] = useState (locale)
  const [selectedMode, setSelectedMode] = useState<boolean>()



  useEffect (()=>{
    window.localStorage.setItem('darkMode', JSON.stringify(darkMode))
    setSelectedMode(darkMode)
  }, [locale, darkMode])

  return (
    <html lang="en" className={selectedMode?'dark' :'light'}>
      <body className={inter.className}>
          <Navbar>
            <NavbarBrand>
              .photocave
            </NavbarBrand>
            <NavbarContent className='justify-end'>
              <NavbarItem className='ml-auto'>
                <Link isExternal href='https://github.com/Annaick/photocave'><Button radius='full' isIconOnly aria-label='Go to github' variant='light'><IconBrandGithub></IconBrandGithub></Button></Link>
              </NavbarItem>
              <NavbarItem>
                <Button onClick={()=>{setDarkMode(!darkMode)}} radius='full' isIconOnly aria-label='Switch theme' variant='light'>
                  {selectedMode?<IconMoon></IconMoon>: <IconSun></IconSun>}
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
          <Providers>
            {children}
          </Providers>
      </body>
    </html>
  )
}
