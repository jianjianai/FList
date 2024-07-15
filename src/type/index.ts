import {PageFrontmatter} from "vuepress";


export interface FolderPageFrontmatter extends PageFrontmatter{
    layout: 'Folder',
    hasContent : boolean,//是否有内容
    children: FrontmatterChildrenFileData[],
}

export type FrontmatterChildrenFileData ={
    name:string,
    size:number,
    updateTime:number,
    isFolder:boolean
}

export interface FilePageFrontmatter extends PageFrontmatter{
    layout: 'File',
    file: FrontmatterFileData
}

export type FrontmatterFileData = {
    name:string,
    url:string,
    size:number,
    updateTime:number,
    contentType?:string
}