export async function downloadProxy(request: Request,proxyConfig:{[path:string]:string}): Promise<Response> {
    const requestUrl = new URL(request.url);
    let downUrlString = proxyConfig[requestUrl.pathname];
    if(!downUrlString){
        return new Response("not found",{status:404});
    }
    let downUrl:URL;
    try{
        downUrl = new URL(downUrlString);
    }catch(error){
        return new Response("url error: "+error,{status:404});
    }
    let reqConfig:RequestInit = {
        method:request.method,
        headers:request.headers,
        body:request.body
    }
    let res = await fetch(downUrl,reqConfig);
    let count = 0;
    let lastUrl = downUrl;
    while (true){
        count++;
        if(count>10){
            return new Response("redirect too many",{status:500});
        }
        const headers = new Headers(res.headers);
        if (res.status >= 300 && res.status < 400) {
            const loto = headers.get("Location");
            if(loto){
                lastUrl = new URL(loto,lastUrl);
                res = await fetch(lastUrl,reqConfig);
                continue;
            }
        }
        return new Response(res.body as any,{
            headers:headers,
            status:res.status
        })
    }
}