export async function createRecord(collection,payload){
    let response = await fetch(`http://localhost:8000/${collection}`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(payload)
    })
    return await response.json()
} 


export async function createMultipatDataRecord(collection,payload){
    let response = await fetch(`http://localhost:8000/${collection}`,{
        method:"POST",
        headers:{
            
        },
        body:payload
    })
    return await response.json()
} 

export async function getRecord(collection,payload){
    let response = await fetch(`http://localhost:8000/${collection}`,{
        method:"GET",
        headers:{
            "content-type":"application/json"
        }
    })
    return await response.json()  
}

export async function updateRecord(collection,payload){
    let response = await fetch(`http://localhost:8000/${collection}/${payload.id}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json"
        }
    })
    return await response.json()  
}

export async function updateMultipatDataRecord(collection,payload){
    let response = await fetch(`http://localhost:8000/${collection}/${payload.id}`,{
        method:"PUT",
        headers:{
            
        },
        body:payload
    })
    return await response.json()  
}

export async function deleteRecord(collection,payload){
    let response = await fetch(`http://localhost:8000/${collection}/${payload.id}`,{
        method:"DELETE",
        headers:{
            "content-type":"application/json"
        }
    })
    return await response.json() 
}