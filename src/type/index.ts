import {PageFrontmatter} from "vuepress";

export interface PageFilesInfo{
    name:string,
    updateTime?:number,
    size?:number,
    isFolder?:boolean
}


export interface PageFileData  extends PageFilesInfo{
    url:string,
    contentType?:string
}

/**
 * 用在页面的子文件夹数据，没有children的数据，防止页面数据文件过大
 * */
export interface PageFolderDataNoChildrenData extends PageFilesInfo{
    isFolder:true
}

export interface PageFolderData extends PageFolderDataNoChildrenData{
    children:Array<PageFileData|PageFolderDataNoChildrenData>
}


export interface FilesPageFrontmatter extends PageFrontmatter{
    hasContent:boolean,//是否有内容
    title?:string,
}

export interface FolderPageFrontmatter extends FilesPageFrontmatter{
    layout: 'Folder',
    folder: PageFolderData,
}

export interface FilePageFrontmatter extends FilesPageFrontmatter{
    layout: 'File',
    file: PageFileData
}

