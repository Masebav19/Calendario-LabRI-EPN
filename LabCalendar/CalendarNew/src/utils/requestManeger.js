export async function fetchRequet ({ReqType, ReqRoute, ReqData}) {
    if (ReqType === 'GET'){
        try {
            const result = await fetch(`http://172.31.36.30:4001/time/${ReqRoute}`)
            const data = await result.json()
            return data  
        } catch {
            return {}
        }
    }else {
        try {
            const result = await fetch(`http://172.31.36.30:4001/time/${ReqRoute}`,{
                method: ReqType,
                headers: {"Content-Type": "application/json"},
                body: JSON.parse(ReqData)
            })
            const data = await result.json()
            return data   
        } catch {
            return {}
        }
    }
}
