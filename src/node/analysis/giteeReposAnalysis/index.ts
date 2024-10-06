import { Folder,isFile } from "../../base/files.js";

/**
 * 代表一个github仓库
 * */
export interface GiteeRepository {
    //gitee用户名
    user: string
    //仓库名
    repository: string,
    //根路径
    rootPath?: string,
    //gitee分支
    ref?: string,
    //gitee 用户授权码
    access_token?: string,
    //最大深度
    maxDeep?: number
    //隐藏readme文件
    hideReadme?: boolean
}

export function giteeReposAnalysis(config: GiteeRepository): () => Promise<Folder> {
    return async (): Promise<Folder> => {
        async function getPath(path: string, dirName: string, hasDeep: number): Promise<Folder> {
            const headers = new Headers();
            headers.set("Content-Type", "application/json;charset=UTF-8");
            const url = new URL(`https://gitee.com/api/v5/repos/${config.user}/${config.repository}/contents/${path}`);
            if (config.access_token) {
                url.searchParams.set("access_token", config.access_token);
            }
            if (config.ref) {
                url.searchParams.set("ref", config.ref);
            }
            let res;
            try {
                res = await fetch(url, {
                    headers: headers
                });
            } catch (e) {
                throw new Error("Gitee Api 请求失败! 请检查网络是否畅通。" + e + " " + url);
            }
            if (!res.ok) {
                throw new Error("仓库名称或者用户名错误，或者达到Gitee速率限制,详细信息:" + res.status + " " + res.statusText + " " + res.url + " " + await res.text());
            }
            const resJsons = await res.json() as {
                name: string,
                path: string,
                size: null,
                download_url?: string,
                type: "file" | "dir",
            }[];
            const folder: Folder = {
                name: dirName,
                children: []
            };
            for (const resJson of resJsons) {
                if (resJson.type == "file") {
                    //特性1: 如果是README.MD文件，就获取内容,设置到content中
                    let pushThis = true;
                    if (resJson.name.toLocaleUpperCase() == "README.MD") {
                        try {
                            folder.content = await (await fetch(resJson.download_url!)).text();
                        } catch (e) {
                            throw new Error("Gitee Api 请求失败! 请检查网络是否畅通。" + e + " " + resJson.download_url);
                        }
                        //如果隐藏readme文件就不添加这个文件
                        if (config.hideReadme){
                            pushThis = false;
                        }
                    }
                    if (pushThis){
                        folder.children.push({
                            name: resJson.name,
                            downloadUrl: resJson.download_url!,
                            // size: resJson.size
                            downloadCorsAllow: "verystrict",
                        });
                    }
                } else if (resJson.type == "dir") {
                    if (hasDeep > 0) {
                        folder.children.push(await getPath(resJson.path, resJson.name, hasDeep - 1));
                    }
                }
            }

            //特性2: 如果是 [name].README.MD 文件,就查找 [name] 文件然后设置到[name]文件的content中
            for (let i = 0; i < folder.children.length; i++) {
                const child = folder.children[i];
                const endWith = ".README.MD";
                if (!child.name.toUpperCase().endsWith(endWith)) {
                    continue;
                }
                const name = child.name.substring(0, child.name.length - endWith.length);
                const cF = folder.children.find((value) => value.name == name && isFile(value));
                if (!cF) {
                    continue;
                }
                //如果隐藏readme文件就删除
                if (config.hideReadme){
                    folder.children.splice(i,1);
                    i--;
                }
                try{
                    cF.content=await (await fetch(child.downloadUrl)).text();
                }catch(e) {
                    throw new Error("Gitee Api 请求失败! 请检查网络是否畅通。" + e + " " + child.downloadUrl);
                }
            }

            return folder;
        }
        return await getPath(config.rootPath || "", "githubReposAnalysisRoot", config.maxDeep || 10);
    }
}