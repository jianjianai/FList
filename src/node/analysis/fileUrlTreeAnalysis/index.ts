import {addFileToFileTree, Folder} from "../../base/files.js";
import {Analysis} from "../../base/AllAnalysis.js";

export type FileUrlTree = {
    [path:string]:string
}

export function fileUrlTreeAnalysis(config:FileUrlTree):Analysis{
    return async ()=>{
        const fileTree:Folder = {children:[],name:"fileUrlTreeAnalysisRoot"};
        for(let path in config){
            const url = config[path];
            if(path.startsWith("/")){
                path = path.substring(1);
            }
            if(path.endsWith("/")){
                path = path.substring(0,path.length-1);
            }
            if(!path){
                throw new Error("fileUrlTreeAnalysis 路径不能为空");
            }
            const pathArray = path.split("/");
            const fileName = pathArray.pop() as string;
            addFileToFileTree(fileTree,pathArray,{
                name:fileName,
                downloadUrl:url,
                downloadCorsAllow: "allow", 
            });
        }
        return fileTree;
    }
}