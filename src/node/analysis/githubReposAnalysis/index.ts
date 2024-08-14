import { Folder, joinFile } from "../../base/files.js";

/**
 * 代表一个github仓库
 * */
export interface GithubRepository {
    //github用户名
    user: string
    //仓库名
    repository: string,
    //根路径
    rootPath?: string,
    //github token
    authorizationToken?: string,
    //github分支
    ref?: string,
    //最大深度
    maxDeep?: number
}

export function githubReposAnalysis(config: GithubRepository): () => Promise<Folder> {
    return async (): Promise<Folder> => {
        async function getPath(path: string, dirName: string, hasDeep: number): Promise<Folder> {
            const headers = new Headers();
            headers.set("Accept", "application/vnd.github+json");
            if (config.authorizationToken) {
                headers.set("Authorization", `Bearer ${config.authorizationToken}`);
            }
            headers.set("X-GitHub-Api-Version", "2022-11-28");
            const url = new URL(`https://api.github.com/repos/${config.user}/${config.repository}/contents/${path}`);
            if (config.ref) {
                url.searchParams.set("ref", config.ref);
            }
            let res;
            try {
                res = await fetch(url, {
                    headers: headers
                });
            } catch (e) {
                throw new Error("Github Api 请求失败! 请检查网络是否畅通。" + e+" "+url);
            }
            if (!res.ok) {
                throw new Error("仓库名称或者用户名错误，或者达到GitHub速率限制,详细信息:" + res.status + " " + res.statusText + " " + res.url + " " + await res.text());
            }
            const resJsons = await res.json() as {
                name: string,
                path: string,
                size: number,
                download_url?: string,
                type: "file" | "dir",
            }[];
            const folder: Folder = {
                name: dirName,
                children: []
            };
            for (const resJson of resJsons) {
                if (resJson.type == "file") {
                    folder.children.push({
                        name: resJson.name,
                        url: resJson.download_url!,
                        size: resJson.size
                    });
                    if(resJson.name.toLocaleUpperCase()=="README.MD"){
                        try{
                            folder.content=await (await fetch(resJson.download_url!)).text();
                        }catch(e){
                            throw new Error("Github Api 请求失败! 请检查网络是否畅通。" + e+" "+resJson.download_url);   
                        }
                    }
                } else if (resJson.type == "dir") {
                    if (hasDeep > 0) {
                        folder.children.push(await getPath(resJson.path, resJson.name, hasDeep - 1));
                    }
                }
            }
            return folder;
        }
        return await getPath(config.rootPath || "", "githubReposAnalysisRoot", config.maxDeep || 10);
    }
}