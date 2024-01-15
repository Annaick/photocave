import Home from "./ui/home"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Photocave: Download high quality images for free. Over 5 Millions images available',
  description: 'Photocave is a simple platform to search and download images in different sizes.',
  creator: 'Tiana Annaick',
  openGraph: {
    title: 'Photocave - over 5 millions images',
    description: 'A simple plateform where you can look and download images for free',
    images: [{
      url: '/photocave.png'
    }]
  }
}


export default function Page() {
  return (<Home>    
  </Home>)
}
