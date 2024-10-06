import {DownProxy} from "../../base/AllAnalysis.js";
import {writeFileSync} from "fs";
import {path} from "vuepress/utils";
import {downloadProxy} from "./worker/cloudflarePagesDownloadPorxy.js";
import {onExtendsBundlerOptions, onGenerated} from "../../base/eventManager.js";
import {ProxyOptions} from "vite";


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


const includesPrefx = "/down/"+Math.random().toString(36).substring(2)+"/";
const proxyConfig:{[path:string]:string} = {}
/**
 * 代理这些文件的下载并生成下载允许的路由列表
 * */
export function getDownProxyRoutes(){
    return {
        "version": 1,
        "include": [includesPrefx+"**"],
        "exclude": []
    };
}

async function cloudflarePagesReleaseConfigurationFile(destPath:string){
    writeFileSync(path.join(destPath,"_routes.json"),JSON.stringify(getDownProxyRoutes()));
    writeFileSync(path.join(destPath,"_worker.js"),`${downloadProxy.toString()}\nconst proxyConfig = ${JSON.stringify(proxyConfig)}\nexport default {fetch:(req)=>downloadProxy(req,proxyConfig)};`);
}

/**
 * 如果被引用了就注册生成配置文件的事件
 * */
onGenerated(async (app)=>cloudflarePagesReleaseConfigurationFile(app.dir.dest()));
/**
 * 配置dev代理和cloudflare一样工作
 * */
onExtendsBundlerOptions(async (options,app)=>{
    if (app.options.bundler.name === '@vuepress/bundler-vite') {
        const proxy:Record<string, string | ProxyOptions> = {};
        for (const proxyConfigKey in proxyConfig) {
            const proxyConfigValue = proxyConfig[proxyConfigKey];
            proxy[proxyConfigKey] = {
                target: new URL(proxyConfigValue).toString(),
                changeOrigin: true,
                rewrite: () => "",
                followRedirects: true,
            };
        }
        options.viteOptions ??= {};
        options.viteOptions.server ??= {};
        options.viteOptions.server.proxy = {...options.viteOptions.server.proxy,...proxy};
    }
});

async function cloudflarePagesDownProxyInner(sourceUrl:string,fileName:string,contentType?:string):Promise<string>{
    const downProxyPath = includesPrefx+`${hashCode(sourceUrl)}/${encodeURIComponent(fileName)}`;
    proxyConfig[downProxyPath] = sourceUrl;
    return downProxyPath;
}


/**
 * 使用cloudflare pages的下载代理
 * */
export function cloudflarePagesDownProxy():DownProxy{
    return (sourceUrl,fileName,contentType)=>cloudflarePagesDownProxyInner(sourceUrl,fileName,contentType);
}




