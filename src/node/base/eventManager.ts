import {App} from "vuepress";


const onInitializedList:((app:App)=>Promise<void>)[] = [];
const onGeneratedList:((app:App)=>Promise<void>)[] = [];

export async function callOnInitialized(app:App){
    for (const f of onInitializedList) {
        await f(app);
    }
}

export async function callOnGenerated(app:App){
    for (const f of onGeneratedList) {
        await f(app);
    }
}


/**
 * 当应用程序初始化时
 * */
export function onInitialized(f:(app:App)=>Promise<void>){
    onInitializedList.push(f);
}

/**
 * 当应静态页面生成完成时
 * */
export function onGenerated(f:(app:App)=>Promise<void>){
    onGeneratedList.push(f);
}

