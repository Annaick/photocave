export async function download(Name: string, Url: string){
    //setLoading (true)
    const name = Name
    const url = Url

    await fetch (url, {method: 'GET'})
    .then (response => response.blob())
    .then ((data)=>{
        const downloadURL = URL.createObjectURL(data)
        const link = document.createElement('a')
        link.href = downloadURL
        link.setAttribute('download', name)
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
    })
    .catch ((err)=>{console.error (err)})

//    setLoading (false)
}