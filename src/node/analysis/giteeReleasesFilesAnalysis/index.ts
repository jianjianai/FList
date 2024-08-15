import { abFolders, addFileToFileTree, Folder, joinFile } from "../../base/files.js";
import { Analysis } from "../../base/AllAnalysis.js";


/**
 * 代表一个gitee仓库
 * 参数说明:https://gitee.com/api/v5/swagger#/getV5ReposOwnerRepoReleases
 * */
export interface GithubRepository {
    user: string
    repository: string,
    direction?: 'desc' | 'asc',
    access_token?: string,
    page?: number,
    per_page?: number
}

/**
 * 从GitHub仓库的releases中解析文件信息
 * */
export function giteeReleasesFilesAnalysis(config: GithubRepository): Analysis {
    return async () => {
        const fileTree: Folder = { children: [], name: "giteeReleasesFilesAnalysisRoot" };
        let tagInfo
        try {
            const requrl = new URL(`https://gitee.com/api/v5/repos/${config.user}/${config.repository}/releases`);
            if (config.direction) {
                requrl.searchParams.set('direction', config.direction);
            }
            if (config.access_token) {
                requrl.searchParams.set('access_token', config.access_token);
            }
            if (config.page) {
                requrl.searchParams.set('page', config.page.toString());
            }
            if (config.per_page) {
                requrl.searchParams.set('per_page', config.per_page.toString());
            }
            tagInfo = await fetch(requrl);
        } catch (e) {
            throw new Error("Gitee Api 请求失败! 请检查网络是否畅通。" + e);
        }
        if (!tagInfo.ok) {
            throw new Error("仓库名称或者用户名错误，或者达到Gitee速率限制,详细信息:" + tagInfo.status + " " + tagInfo.statusText + " " + tagInfo.url + " " + await tagInfo.text());
        }
        const jsonData = await tagInfo.json() as {
            tag_name: string,
            name: string,
            body: string,
            created_at: string,
            assets: {
                browser_download_url: string,
                name: string,
            }[]
        }[];
        for(const {tag_name,name,body,created_at,assets} of jsonData){
            const tagFolder:Folder = {
                title:name,
                content:body,
                children:[],
                updateTime:new Date(created_at).getTime(),
                size:0,
                name:"giteeReleasesTagRoot"
            };
            for(const {browser_download_url,name} of assets){
                joinFile(tagFolder,{
                    downloadUrl:browser_download_url,
                    updateTime:new Date(created_at).getTime(),
                    name:name,
                    downloadCorsAllow: "loose", 
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
    };
}