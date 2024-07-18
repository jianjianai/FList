import {
    FilePageFrontmatter,
    FolderPageFrontmatter,
    PageFileData,
    PageFilesInfo,
    PageFolderDataNoChildrenData,
} from "../../type/index.js";
import {App, createPage, Page} from "vuepress";
import {File, Folder, isFile} from "./files.js";


/**
 * 给文件创建页面
 * */
export function createFilePage(app:App,path:string,file:File):Promise<Page>{
    const frontmatter:FilePageFrontmatter = {
        layout: 'File',
        title: file.name,
        hasContent: !!file.content,
        file:{
            name:file.name,
            updateTime:file.updateTime,
            size:file.size,

            url:file.url,
            contentType:file.contentType,
        },
    }
    console.log(path,123456)
    return createPage(app,{
        path:path,
        frontmatter:frontmatter,
        content: file.content,
    })
}

/**
 * 给文件夹创建页面
 * */
export function createFolderPage(app:App,path:string,folder:Folder):Promise<Page>{
    const childrenData = folder.children.map((children):PageFileData|PageFolderDataNoChildrenData=>{
        const base:PageFilesInfo = {
            name:children.name,
            size:children.size,
            updateTime:children.updateTime,
        }
        if(isFile(children)){
            return {
                ...base,
                url: (children as File).url,
                contentType: (children as File).contentType
            }
        }
        return {
            ...base,
            isFolder:true
        }
    })
    const frontmatter:FolderPageFrontmatter = {
        layout: 'Folder',
        title: folder.title,
        hasContent : !!folder.content,
        content: folder.content,
        folder: {
            name:folder.name,
            size:folder.size,
            updateTime:folder.updateTime,
            children:childrenData,
            isFolder:true
        },
    }
    console.log(path,123456)
    return createPage(app,{
        path:path,
        frontmatter:frontmatter,
        content: folder.content,
    })
}


function createFileTreePagesInner(app:App, path:string, folder:Folder):Promise<Page>[]{
    const pagePromiseList:Promise<Page>[] = [];
    pagePromiseList.push(createFolderPage(app,path+"/",folder));
    //给子文件夹和文件创建页面
    for (let children of folder.children) {
        //如果是文件夹则递归
        if(!isFile(children)){
            pagePromiseList.push(...createFileTreePagesInner(app,path+"/"+children.name,children as Folder))
            continue;
        }
        //如果是文件则给文件创建
        pagePromiseList.push(createFilePage(app,path+"/"+children.name+"/",children as File));
    }
    return pagePromiseList;
}

/**
 * 创建文件树全部页面
 * */
export function createFileTreePages(app:App,folder:Folder):Promise<Page>[]{
    return createFileTreePagesInner(app,"",folder);
}
