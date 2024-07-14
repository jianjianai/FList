export type File = {
    url:string,
    updateTime:number,
    size:number,
}
export type Folder = {
    title?:string,
    content?:string
    children:{
        [name:string]:File|Folder
    },
    updateTime:number,
    size:number,
}

/**
 * 判断是否是文件
 * */
export function isFile(file:File|Folder){
    return !(file as Folder).children
}

/**
 * 合并文件和文件夹
 * */
export function joinFile(folder:Folder,name:string,file:File):void{
    for(let i=0; true ; i++){
        const nameEndFx = name+(i?`(${i})`:'');
        if(!folder.children[nameEndFx]){
            folder.children[nameEndFx] = file;
            return;
        }
    }
}

/**
 * 合并两个文件夹
 * */
export function abFolders(folder1:Folder,folder2:Folder){
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

/**
 * 将文件夹放到文件夹
 * */
export function joinFolder(folder1:Folder,name:string,folder2:Folder){
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

/**
 * 将文件或者文件夹放到文件夹中
 * */
export function joinFolderOrFile(folder1:Folder,name:string,folder2:Folder|File){
    if (isFile(folder2)) {
        joinFile(folder1,name,folder2 as File);
    }else {
        joinFolder(folder1,name,folder2 as Folder);
    }
}

/**
 * 将文件或者文件夹放到指定path中,如果path中的文件夹不存在则创建文件夹。
 * path的格式为 "文件夹/文件夹/文件夹/文件名"
 * 或者 "文件夹/文件夹/文件夹"
 * */
export function addFileToFileTree(baseFileTree:Folder,path:string,file:File|Folder):void{
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


/**
 * 递归文件夹中的所有文件
 * */
export function deepGetAllFile(folder:Folder):File[]{
    const files:File[] = [];
    for (const childrenKey in folder.children) {
        const children = folder.children[childrenKey];
        if(isFile(children)){
            files.push(children as File);
        }else {
            files.push(...deepGetAllFile(children as Folder))
        }
    }
    return files;
}
