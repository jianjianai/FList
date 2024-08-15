import {PageFrontmatter} from "vuepress";

export interface PageFilesInfo{
    name:string,
    updateTime?:number,
    size?:number,
    isFolder?:boolean,
    content?:string
}


export interface PageFileData  extends PageFilesInfo{
    downloadUrl:string,
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
    layout: 'Folder' | 'File',
    title?:string,
    flistData:PageFolderData|PageFileData
}

export interface FolderPageFrontmatter extends FilesPageFrontmatter{
    layout: 'Folder',
    flistData: PageFolderData,
}

export interface FilePageFrontmatter extends FilesPageFrontmatter{
    layout: 'File',
    flistData: PageFileData
}

