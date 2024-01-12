export function timeout (){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>resolve('yess'), 3000)
    })
}