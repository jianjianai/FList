import {DownProxy} from "../../analysis/AllAnalysis.js";
import {writeFile} from "fs";
import {path} from "vuepress/utils";
import {downloadProxy} from "./worker/cloudflarePagesDownloadPorxy.js";

const includes:string[] = [];
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

export const cloudflarePagesDownProxy:DownProxy = async (sourceUrl:string):Promise<string>=>{
    const downProxyPath = `/down/${sourceUrl}`;
    includes.push(downProxyPath);
    return downProxyPath;
}

export async function cloudflarePagesReleaseConfigurationFile(destPath:string){
    await new Promise((r)=>writeFile(path.join(destPath,"_routes.json"),JSON.stringify(getDownProxyRoutes()),r));
    await new Promise((r)=>writeFile(path.join(destPath,"_worker.js"),`${downloadProxy.toString()}\nexport default { fetch:downloadProxy };`,r));
}