import {App} from "vuepress";

export interface Closable {
    close(): void;
}

const onInitializedList:((app:App)=>Promise<void>)[] = [];
const onGeneratedList:((app:App)=>Promise<void>)[] = [];
const onWatchedList:((app:App,watchers:Closable[],restart:()=>Promise<void>)=>Promise<void>)[] = [];
const extendsBundlerOptionsList:((options:any,app:App)=>Promise<void>)[] = [];

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

export async function callOnWatched(app: App, watchers: Closable[], restart: () => Promise<void>) {
    for (const f of onWatchedList) {
        await f(app, watchers, restart);
    }
}
export async function callExtendsBundlerOptions(options: any,app:App) {
    for (const f of extendsBundlerOptionsList) {
        await f(options,app);
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

/**
 * 当应用程序处于监视模式时
 * */
export function onWatched(f:(app:App,watchers:Closable[],restart:()=>Promise<void>)=>Promise<void>){
    onWatchedList.push(f);
}

export function onExtendsBundlerOptions(f:(options:any,app:App)=>Promise<void>){
    extendsBundlerOptionsList.push(f);
}
