export async function download(Name: string, Url: string){
    //setLoading (true)
    const name = Name
    const url = Url

    await fetch (url, {method: 'GET'})
    .then (response => response.arrayBuffer())
    .then ((data)=>{
        const blob = new Blob([data])
        const downloadURL = URL.createObjectURL(blob)
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