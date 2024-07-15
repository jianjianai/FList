import {
    FilePageFrontmatter,
    FolderPageFrontmatter,
    FrontmatterChildrenFileData
} from "../../type/index.js";
import {App, createPage, Page} from "vuepress";
import {Folder, isFile,File} from "./files.js";

function createFileTreePagesInner(app:App, path:string, folder:Folder):Promise<Page>[]{
    const pagePromiseList:Promise<Page>[] = [];
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
    const folderfrontmatter:FolderPageFrontmatter = {
        layout: 'Folder',
        children: childrenData,
        title: folder.title,
        hasContent : !!folder.content,
    }
    pagePromiseList.push(createPage(app,{
        path: path+"/",
        frontmatter:folderfrontmatter,
        content:folder.content,
    }));
    //给子文件夹和文件创建页面
    for (let childrenName in folder.children) {
        const childrenNameFile = folder.children[childrenName];
        //如果是文件夹则递归
        if(!isFile(childrenNameFile)){
            pagePromiseList.push(...createFileTreePagesInner(app,path+"/"+childrenName,childrenNameFile as Folder))
            continue;
        }
        //如果是文件则给文件创建
        const cFile:File = childrenNameFile as File;
        console.log(path+"/"+childrenName+"/",84765);
        const filefrontmatter:FilePageFrontmatter = {
            layout: 'File',
            title: childrenName,
            file:{
                url:cFile.url,
                size:cFile.size,
                updateTime:cFile.updateTime,
                name:childrenName,
                contentType:cFile.contentType
            },
        }
        pagePromiseList.push(createPage(app,{
            path:path+"/"+childrenName+"/",
            frontmatter:filefrontmatter
        }));
    }
    return pagePromiseList;
}

/**
 * 创建文件树全部页面
 * */
export function createFileTreePages(app:App,folder:Folder):Promise<Page>[]{
    return createFileTreePagesInner(app,"",folder);
}
