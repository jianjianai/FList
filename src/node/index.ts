import {Theme} from "vuepress";
import { getDirname, path } from 'vuepress/utils'
import {createFileTreePages} from "./base/pages.js";
import {allAnalysis, AnalysisConfig} from "./analysis/AllAnalysis.js";
import { writeFile } from "fs";
import {cloudflarePagesReleaseConfigurationFile, getDownProxyRoutes} from "./proxy/cloudflarePages/cloudflarePages.js";

const __dirname = getDirname(import.meta.url)

export function FileList(analysisConfig:AnalysisConfig[]):Theme{
    return ()=>{
        return {
            name:"FList",
            clientConfigFile: path.join(__dirname, "../client/index.ts"),
            onInitialized:async (app)=>{
                const fileTree = await allAnalysis(analysisConfig);
                const pageList = await Promise.all(createFileTreePages(app,fileTree));
                app.pages.push(...pageList);
            },
            onGenerated:async (app)=>{
                await cloudflarePagesReleaseConfigurationFile(app.dir.dest());
            }
        }
    }
}