import {DownProxy} from "../../base/AllAnalysis.js";
import {writeFile} from "fs";
import {path} from "vuepress/utils";
import {downloadProxy} from "./worker/cloudflarePagesDownloadPorxy.js";
import {onGenerated} from "../../base/eventManager.js";


/**
 * 生成一个字符串的hashcode
 * */
function hashCode(string:string):number {
    let hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
        chr = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}


const includes:string[] = [];
const proxyConfig:{[path:string]:string} = {}
/**
 * 代理这些文件的下载并生成下载允许的路由列表
 * */
export function getDownProxyRoutes(){
    return {
        "version": 1,
        "include": includes,
        "exclude": []
    };
}

async function cloudflarePagesReleaseConfigurationFile(destPath:string){
    await new Promise((r)=>writeFile(path.join(destPath,"_routes.json"),JSON.stringify(getDownProxyRoutes()),r));
    await new Promise((r)=>writeFile(path.join(destPath,"_worker.js"),`${downloadProxy.toString()}\nconst proxyConfig = ${JSON.stringify(proxyConfig)}\nexport default {fetch:(req)=>downloadProxy(req,proxyConfig)};`,r));
}

/**
 * 如果被引用了就注册生成配置文件的事件
 * */
onGenerated(async (app)=>cloudflarePagesReleaseConfigurationFile(app.dir.dest()));

async function cloudflarePagesDownProxyInner(sourceUrl:string):Promise<string>{
    const downProxyPath = `/down/${hashCode(sourceUrl)}/${sourceUrl.substring(sourceUrl.lastIndexOf("/")+1)}`;
    const routerPath = `/down/${hashCode(sourceUrl)}/*`;
    proxyConfig[downProxyPath] = sourceUrl;
    includes.push(routerPath);
    return downProxyPath;
}


/**
 * 使用cloudflare pages的下载代理
 * */
export function cloudflarePagesDownProxy():DownProxy{
    return (sourceUrl)=>cloudflarePagesDownProxyInner(sourceUrl);
}




