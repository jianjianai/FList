import {abFolders, addFileToFileTree, Folder, joinFile} from "../../base/files.js";
import {Analysis} from "../../base/AllAnalysis.js";


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
    const fileTree:Folder = {children:[],name:"githubReleasesRoot"};
    let tagInfo
    try {
        tagInfo = await fetch(`https://api.github.com/repos/${user}/${repository}/releases`);
    }catch (e){
        throw new Error("Github Api 请求失败! 请检查网络是否畅通。"+e);
    }
    if(!tagInfo.ok){
        throw new Error("仓库名称或者用户名错误，或者达到GitHub速率限制,详细信息:"+tagInfo.status+" "+tagInfo.statusText+" "+tagInfo.url+" "+await tagInfo.text());
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
            size:number,
            content_type:string
        }[]
    }[];
    for(const {tag_name,name,body,published_at,assets} of jsonData){
        const tagFolder:Folder = {
            title:name,
            content:body,
            children:[],
            updateTime:new Date(published_at).getTime(),
            size:0,
            name:"githubReleasesTagRoot"
        };
        for(const {browser_download_url,size,name,updated_at,content_type} of assets){
            joinFile(tagFolder,{
                url:browser_download_url,
                updateTime:new Date(updated_at).getTime(),
                size:size,
                contentType:content_type,
                name:name
            });
        }
        let tagPath:string = tag_name;
        if(tagPath=="root"){
            tagPath = "";
        }
        if(tagPath.startsWith("root/")){
            tagPath = tagPath.substring(5);
        }
        if(tagPath){
            const pathArray= tagPath.split("/");
            tagFolder.name = pathArray.pop()!;
            addFileToFileTree(fileTree,pathArray,tagFolder);
        }else {
            abFolders(fileTree,tagFolder);
        }
    }
    return fileTree;
}


/**
 * 从GitHub仓库的releases中解析文件信息
 * */
export function githubReleasesFilesAnalysis(config:GithubRepository):Analysis{
    return ()=>githubReleasesFileTree(config);
}