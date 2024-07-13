import {type Component, defineAsyncComponent} from "vue";
import {FrontmatterFileData} from "../../../../type/index.js";
import LoadError from "./LoadError.vue";
import Loading from "./Loading.vue";

export type ViewComponent = {
    component:Component<{file:FrontmatterFileData}>,
    name:string
};

function defineViewComponent(name:string,f:()=>Promise<Component>):ViewComponent{
    return {
        component:defineAsyncComponent({
            errorComponent:LoadError,
            loadingComponent:Loading,
            loader:f
        }),
        name:name
    }
}
const GenericFileDown = defineViewComponent("文件下载",()=>import("./GenericFileDown.vue"));
const VideoPlayer = defineViewComponent("视频播放",()=>import("./VideoPlayer.vue"))
const fileTypesSuffixConfig:[string[],ViewComponent[]][] = [
    [[".mp4",".mkv",".webm",".m3u8",".ts",".avi",".mov",".wmv",".flv"],[VideoPlayer,GenericFileDown]],
]

const fileTypesSuffix:{[suffix:string]:ViewComponent[]} = {}
for (const ar of fileTypesSuffixConfig) {
    for (const k of ar[0]) {
        if(!fileTypesSuffix[k]){
            fileTypesSuffix[k] = [];
        }
        fileTypesSuffix[k].push(...ar[1]);
    }
    // 去重
    for (const k in fileTypesSuffix) {
        fileTypesSuffix[k] = [...new Set(fileTypesSuffix[k])];
    }
}

export function getViewBySuffix(suffix: string):ViewComponent[] {
    const com = fileTypesSuffix[suffix.toLowerCase()];
    if(com){
        return com
    }
    return [GenericFileDown];
}