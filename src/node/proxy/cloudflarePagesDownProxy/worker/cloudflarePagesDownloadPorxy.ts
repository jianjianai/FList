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
    let headers = new Headers(request.headers);
    headers.delete("host");
    headers.delete("referer");
    headers.delete("origin");
    let res = await fetch(downUrl,{
        method:request.method,
        headers:headers,
        body:request.body
    });
    return new Response(res.body as any,{
        headers:res.headers,
        status:res.status
    })
}