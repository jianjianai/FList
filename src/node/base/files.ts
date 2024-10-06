import { DownloadCorsAllow } from "../../type/index.js";

export interface FilesInfo{
    name:string,
    title?:string,
    content?:string
    updateTime?:number,
    size?:number,
}
export interface File extends FilesInfo{
    downloadUrl:string,
    downloadCorsAllow:DownloadCorsAllow,
    contentType?:string
}
export interface Folder extends FilesInfo{
    children:Array<File|Folder>
}

/**
 * 判断是否是文件
 * */
export function isFile(file:File|Folder){
    return !(file as Folder).children
}

/**
 * 将文件放到文件夹中，如果有同名文件则重命名
 * */
export function joinFile(folder:Folder,file:File):void{
    for (let i = 0; true; i++) {
        file.name = file.name+(i?`(${i})`:'');
        if(folder.children.some((value)=>value.name === file.name)){
            continue;
        }
        folder.children.push(file);
        return;
    }
}

/**
 * 合并两个文件夹，也就把第二个文件夹中的文件全部放到第一个文件夹中
 * */
export function abFolders(folder1:Folder,folder2:Folder){
    for (const children of folder2.children) {
        if(isFile(children)){
            joinFile(folder1,children as File);
        }else {
            joinFolder(folder1,children as Folder);
        }
    }
    if (folder1.content && folder2.content){
        folder1.content += "\n\n" + folder2.content;
    }else if(folder2.content) {
        folder1.content = folder2.content;
    }
    if (folder1.title && folder2.title){
        folder1.title += " " + folder2.title;
    }else if(folder2.title){
        folder1.title = folder2.title;
    }
}

/**
 * 将文件夹放到文件夹
 * */
export function joinFolder(folder1:Folder,folder2:Folder){
    for (let i = 0; true; i++) {
        folder2.name = folder2.name+(i?`(${i})`:'');
        const someFile = folder1.children.find((value)=>value.name === folder2.name);
        if(!someFile){
            folder1.children.push(folder2);
            return;
        }
        if(someFile && !isFile(someFile)){
            abFolders(someFile as Folder,folder2);
            return;
        }
    }
}

/**
 * 将文件或者文件夹放到文件夹中
 * */
export function joinFolderOrFile(folder1:Folder,folder2:Folder|File){
    if (isFile(folder2)) {
        joinFile(folder1,folder2 as File);
    }else {
        joinFolder(folder1,folder2 as Folder);
    }
}

/**
 * 将文件或者文件夹放到指定path的文件夹中,如果path中的文件夹不存在则创建文件夹。
 * 例如path为 /文件夹/文件夹/文件夹/ 则传入 "[文件夹,文件夹,文件夹]"
 * */
export function addFileToFileTree(baseFileTree:Folder,pathArray:string[],file:File|Folder):void{
    let folder = baseFileTree;
    for (let i = 0; i < pathArray.length; i++) {
        let folderName = pathArray[i];
        for (let i = 0; true; i++) {
            folderName = folderName+(i?`(${i})`:'');
            let comeNameFile = folder.children.find((value)=>value.name === folderName);
            if(!comeNameFile){
                comeNameFile = {name:folderName,children:[]};
                folder.children.push(comeNameFile);
            }
            if(isFile(comeNameFile)){
                continue;
            }
            folder = comeNameFile as Folder;
            break;
        }
    }
    joinFolderOrFile(folder,file);
}

/**
 * 获取指定path的文件或者文件夹
 */
export function getFileByPath(baseFileTree:Folder,pathArray:string[]):File|Folder|undefined{
    let folder:Folder | File = baseFileTree;
    for (let i = 0; i < pathArray.length; i++) {
        if(isFile(folder)){
            return;
        } 
        let folderName = pathArray[i];
        let comeNameFile:Folder | File |undefined = (folder as Folder).children.find((value)=>value.name === folderName);
        if(!comeNameFile){
            return;
        }
        folder = comeNameFile;
    }
    return folder;
}

/**
 * 递归文件夹中的所有文件
 * */
export function deepGetAllFile(folder:Folder):File[]{
    const files:File[] = [];
    for (const children of folder.children) {
        if(isFile(children)){
            files.push(children as File);
        }else {
            files.push(...deepGetAllFile(children as Folder))
        }
    }
    return files;
}


/**
 * 根据文件夹中的文件重新计算文件夹的大小和更新时间
 * */
export function reCalcFolder(folder:Folder):void{
    folder.size = 0;
    folder.updateTime = 0;
    for (const childrenKey in folder.children) {
        const children = folder.children[childrenKey];
        if(isFile(children)){
            const file = children as File;
            folder.size += file.size || 0;
            folder.updateTime = Math.max(folder.updateTime,file.updateTime || 0);
        }else {
            const folderChildren = children as Folder;
            reCalcFolder(folderChildren);
            folder.size += folderChildren.size || 0;
            folder.updateTime = Math.max(folder.updateTime,folderChildren.updateTime || 0);
        }
    }
}
