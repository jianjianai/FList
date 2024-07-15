import {Theme} from "vuepress";
import { getDirname, path } from 'vuepress/utils'
import {createFileTreePages} from "./base/pages.js";
import {allAnalysis, AnalysisConfig} from "./base/AllAnalysis.js";
import {callOnGenerated, callOnInitialized} from "./base/eventManager.js";

const __dirname = getDirname(import.meta.url)

export function FileList(analysisConfig:AnalysisConfig[]):Theme{
    return ()=>{
        return {
            name:"FList",
            clientConfigFile: path.join(__dirname, "../client/index.ts"),
            onInitialized:async (app)=>{
                await callOnInitialized(app);
                const fileTree = await allAnalysis(analysisConfig);
                const pageList = await Promise.all(createFileTreePages(app,fileTree));
                app.pages.push(...pageList);
            },
            onGenerated:async (app)=>{
                await callOnGenerated(app);
            }
        }
    }
}