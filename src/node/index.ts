import {createPage, Page, Theme} from "vuepress";
import { getDirname, path } from 'vuepress/utils'
import {FrontmatterChildrenFileData, FrontmatterFileData} from "../type/index.js";

const __dirname = getDirname(import.meta.url)

export function FileList(repositoryList:{path:string,user:string,repository:string}[]):Theme{
    return ()=>{
        return {
            name:"FList",
            clientConfigFile: path.join(__dirname, "../client/index.ts"),
            onInitialized:async (app)=>{
                type File = {
                    url:string,
                    updateTime:number,
                    size:number,
                }
                type Folder = {
                    title?:string,
                    content?:string
                    children:{
                        [name:string]:File|Folder
                    },
                    updateTime:number,
                    size:number,
                }
                //判断是否是文件
                function isFile(file:File|Folder){
                    return !(file as Folder).children
                }
                //合并文件和文件夹
                function joinFile(folder:Folder,name:string,file:File):void{
                    for(let i=0; true ; i++){
                        const nameEndFx = name+(i?`(${i})`:'');
                        if(!folder.children[nameEndFx]){
                            folder.children[nameEndFx] = file;
                            return;
                        }
                    }
                }
                //合并两个文件夹
                function abFolders(folder1:Folder,folder2:Folder){
                    for (const childrenKey in folder2.children) {
                        let intoFile = folder2.children[childrenKey];
                        if(isFile(intoFile)){
                            joinFile(folder1,childrenKey,intoFile as File);
                        }else {
                            joinFolder(folder1,childrenKey,intoFile as Folder);
                        }
                    }
                    if (folder1.content){
                        folder1.content += "\n\n" + folder2.content;
                    }else {
                        folder1.content = folder2.content;
                    }
                    if (folder1.title){
                        folder1.title += " " + folder2.title;
                    }else {
                        folder1.title = folder2.title;
                    }
                }
                //将文件夹放到文件夹
                function joinFolder(folder1:Folder,name:string,folder2:Folder){
                    for (let i = 0; true; i++) {
                        const nameEndFx = name+(i?`(${i})`:'');
                        if(folder1.children[nameEndFx] && !isFile(folder1.children[nameEndFx])){
                            abFolders(folder1.children[nameEndFx] as Folder,folder2);
                            return;
                        }
                        if(!folder1.children[nameEndFx]){
                            folder1.children[nameEndFx] = folder2;
                            return;
                        }
                    }
                }
                //将文件或者文件夹放到文件夹中
                function joinFolderOrFile(folder1:Folder,name:string,folder2:Folder|File){
                    if (isFile(folder2)) {
                        joinFile(folder1,name,folder2 as File);
                    }else {
                        joinFolder(folder1,name,folder2 as Folder);
                    }
                }

                function addFileToFileTree(baseFileTree:Folder,path:string,file:File|Folder):void{
                    const theIndex = path.indexOf("/");
                    if(theIndex<0){
                        joinFolderOrFile(baseFileTree,path,file);
                        return;
                    }
                    const left = path.substring(0,theIndex);
                    const right = path.substring(theIndex+1);
                    for (let i = 0; true; i++) {
                        const nameEndFx = left+(i?`(${i})`:'');
                        if (!baseFileTree.children[nameEndFx]) {
                            baseFileTree.children[nameEndFx] = {children:{},updateTime:0,size:0};
                        }
                        if(!isFile(baseFileTree.children[nameEndFx])){
                            addFileToFileTree(baseFileTree.children[nameEndFx] as Folder,right,file);
                            break;
                        }
                    }
                }
                const fileTree:Folder = {children:{},size:0,updateTime:0};

                for (let {path,user,repository} of repositoryList){
                    if(path && !path.endsWith("/")){
                        path = path+"/";
                    }
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
                        let endPath = path+tagPath;
                        if(endPath){
                            addFileToFileTree(fileTree,endPath,tagFolder);
                        }else {
                            abFolders(fileTree,tagFolder);
                        }

                    }
                }

                const pagePromises:Promise<Page>[] = [];

                function createFileTreeToPage(path:string,folder:Folder){
                    //给自己创建页面
                    const childrenData:FrontmatterChildrenFileData[] = [];
                    for (let childrenKey in folder.children) {
                        const children = folder.children[childrenKey];
                        childrenData.push({
                            name:childrenKey,
                            size:children.size,
                            updateTime:children.updateTime,
                            isFolder:!isFile(children)
                        });
                    }
                    console.log(path+"/",85748);
                    pagePromises.push(createPage(app,{
                        path: path+"/",
                        frontmatter:{
                            layout: 'Folder',
                            children: childrenData,
                            title: folder.title,
                            hasContent : !!folder.content,
                        },
                        content:folder.content,
                    }));
                    //给子文件夹和文件创建页面
                    for (let childrenName in folder.children) {
                        let childrenNameFile = folder.children[childrenName];
                        //如果是文件夹则递归
                        if(!isFile(childrenNameFile)){
                            createFileTreeToPage(path+"/"+childrenName,childrenNameFile as Folder);
                            continue;
                        }
                        //如果是文件则给文件创建
                        childrenNameFile = childrenNameFile as File;
                        console.log(path+"/"+childrenName+"/",84765);
                        const data:FrontmatterFileData = {
                            url:childrenNameFile.url,
                            size:childrenNameFile.size,
                            updateTime:childrenNameFile.updateTime,
                            name:childrenName
                        }
                        pagePromises.push(createPage(app,{
                            path:path+"/"+childrenName+"/",
                            frontmatter:{
                                layout: 'File',
                                title: childrenName,
                                file:data
                            }
                        }));
                    }
                }

                console.log("---------------------------")
                createFileTreeToPage("",fileTree);
                app.pages.push(... await Promise.all(pagePromises));

            }
        }
    }
}