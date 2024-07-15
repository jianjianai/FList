import {abFolders, addFileToFileTree, Folder} from "../base/files.js";


/**
 * 代表一个github仓库
 * */
export interface GithubRepository{
    user:string
    repository:string
}

/**
 * 从GitHub仓库的releases中解析文件信息
 * */
async function githubReleasesFileTree({user,repository}:GithubRepository):Promise<Folder>{
    const fileTree:Folder = {children:{},size:0,updateTime:0};
    const tagInfo = await fetch(`https://api.github.com/repos/${user}/${repository}/releases`);
    if(!tagInfo.ok){
        throw new Error(tagInfo.statusText+" "+tagInfo.statusText+" "+tagInfo.url+" "+await tagInfo.text());
    }
    const jsonData = await tagInfo.json() as {
        tag_name:string,
        name:string,
        body:string,
        published_at:string,
        assets:{
            browser_download_url:string,
            name:string,
            updated_at:string,
            size:number
        }[]
    }[];
    for(const {tag_name,name,body,published_at,assets} of jsonData){
        const tagFolder:Folder = {title:name,content:body,children:{},updateTime:new Date(published_at).getTime(),size:0};
        for(const {browser_download_url,size,name,updated_at} of assets){
            addFileToFileTree(tagFolder,name,{url:browser_download_url,updateTime:new Date(updated_at).getTime(),size:size});
        }
        let tagPath:string = tag_name;
        if(tagPath=="root"){
            tagPath = "";
        }
        if(tagPath.startsWith("root/")){
            tagPath = tagPath.substring(5);
        }
        if(tagPath){
            addFileToFileTree(fileTree,tagPath,tagFolder);
        }else {
            abFolders(fileTree,tagFolder);
        }
    }
    return fileTree;
}


/**
 * 从GitHub仓库的releases中解析文件信息
 * */
export function githubReleasesFilesAnalysis(config:GithubRepository){
    return ()=>githubReleasesFileTree(config);
}