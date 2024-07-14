export async function downloadProxy(request: Request): Promise<Response> {
    const prefix = "/down/";
    const requestUrl = new URL(request.url);
    let downUrlString = requestUrl.pathname+requestUrl.search;
    if(downUrlString.startsWith(prefix)){
        downUrlString = downUrlString.substring(prefix.length);
    }else{
        return new Response("download prefix not");
    }
    let downUrl:URL;
    try{
        downUrl = new URL(downUrlString);
    }catch(error){
        return new Response("url error: "+error);
    }
    const res = await fetch(downUrl,request);
    const headers = new Headers(res.headers);

    if (res.status >= 300 && res.status < 400) {
        const loto = headers.get("Location");
        if(loto){
            let goURL = new URL(loto,downUrl);
            headers.set("Location",requestUrl.origin+prefix+goURL);
        }
    }

    return new Response(res.body as any,{
        headers:headers,
        status:res.status
    })
}