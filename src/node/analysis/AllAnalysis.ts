import {githubReleasesFileTree, GithubRepository} from "./GithubReleasesFilesAnalysis.js";
import {abFolders, addFileToFileTree, deepGetAllFile, Folder} from "../base/files.js";


export type DownProxy = (sourceUrl:string)=>Promise<string>;

interface AnalysisConfigBase{
    /**一个函数,接收源url,返回下载url*/
    downProxy?:DownProxy,
    /**挂载路径*/
    mountPath?:string,
}
export type AnalysisConfig = AnalysisConfigBase & (
    { type:"githubReleases", config:GithubRepository }
);

/**
 * 从配置文件加载文件树
 * */
async function analysis(config:AnalysisConfig):Promise<Folder>{
    switch (config.type) {
        case "githubReleases":
            return githubReleasesFileTree(config.config);
    }
}

/**
 *  加载配置文件并执行代理
 * */
async function analysisAndDownProxy(config:AnalysisConfig):Promise<Folder>{
    const folder:Folder = await analysis(config);
    if(!config.downProxy){
        return folder;
    }
    const downProxy = config.downProxy;
    const allFile = deepGetAllFile(folder).map(async (file) => file.url = await downProxy(file.url));
    await Promise.all(allFile);
    return folder;
}

/**
 * 从配置文件加载文件树
 * */
export async function allAnalysis(config:AnalysisConfig[]):Promise<Folder>{
    const rootFolder:Folder = {children:{},size:0,updateTime:0};
    for (let configElement of config) {
        const f = await analysisAndDownProxy(configElement);
        let mountPath = configElement.mountPath || "";
        if(mountPath.startsWith("/")){
            mountPath = mountPath.substring(1);
        }
        if(mountPath.endsWith("/")){
            mountPath = mountPath.substring(0,mountPath.length-1);
        }
        if(mountPath) {
            addFileToFileTree(rootFolder, mountPath, f);
        }else {
            abFolders(rootFolder, f);
        }
    }
    return rootFolder;
}