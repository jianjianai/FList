import {PageFrontmatter} from "vuepress";

/** 是否允许跨域下载 allow:允许跨域 loose:浏览器阻止跨域的资源可以使用,例如视频音频等 strict:通过origin请求头或者其他方法严格限制 verystrict:就连从其他网站点击超链接下载也不行,非常严格的防盗链 */
export type DownloadCorsAllow = "allow" | "loose" | "strict" | "verystrict";

export interface PageFilesInfo{
    name:string,
    updateTime?:number,
    size?:number,
    isFolder?:boolean,
    content?:string
}


export interface PageFileData  extends PageFilesInfo{
    downloadUrl:string,
    downloadCorsAllow:DownloadCorsAllow,
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

