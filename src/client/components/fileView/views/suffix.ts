import {type Component, defineAsyncComponent} from "vue";
import {DownloadCorsAllow, PageFileData} from "../../../../type/index.js";
import LoadError from "./LoadError.vue";
import Loading from "./Loading.vue";

const downloadCorsAllowDradeMap: Record<DownloadCorsAllow, number> = {
    "allow":0,
    "loose":1,
    "strict":2,
    "verystrict":3
}

export type ViewComponent = {
    component:Component<{file:PageFileData}>,
    name:string,
    downloadCorsAllowDrade:number
};

/**
 * @param downloadCorsAllow 下载跨域最恶劣的工作等级
 */
function defineViewComponent(name:string,f:()=>Promise<Component>,downloadCorsAllow:DownloadCorsAllow):ViewComponent{
    return {
        component:defineAsyncComponent({
            errorComponent:LoadError,
            loadingComponent:Loading,
            loader:f
        }),
        name:name,
        downloadCorsAllowDrade:downloadCorsAllowDradeMap[downloadCorsAllow]
    }
}
const GenericFileDown = defineViewComponent("文件下载",()=>import("./GenericFileDown.vue"),"verystrict");
const VideoPlayer = defineViewComponent("视频播放",()=>import("./VideoPlayer.vue"),"loose")
const MusicPlayer = defineViewComponent("音乐播放",()=>import("./MusicPlayer.vue"),"loose");
const MarkdownPlayer = defineViewComponent("Markdown预览",()=>import("./MarkdownPlayer.vue"),"allow");
const ImgPlayer = defineViewComponent("图片预览",()=>import("./ImgPlayer.vue"),"loose");
const PDFPlayer = defineViewComponent("PDF预览",()=>import("./PDFPlayer.vue"),"allow");
const PreTextPlayer = defineViewComponent("文本预览",()=>import("./PreTextPlayer.vue"),"allow");
const fileTypesSuffixConfig:[string[],ViewComponent[]][] = [
    [[".mp4",".mkv",".webm",".m3u8",".ts",".avi",".mov",".wmv",".flv"],[VideoPlayer]],
    [[".mp3",".flac",".wav"],[MusicPlayer]],
    [[".md"],[MarkdownPlayer]],
    [[".jpg",".jpeg",".png",".gif",".bmp",".webp",".svg",".ico",".tiff",],[ImgPlayer]],
    [[".pdf"],[PDFPlayer]],
    [[".txt",".text",".md",".yml",".yaml",".json"],[PreTextPlayer]],
]

const fileTypesSuffix: {[suffix: string]: ViewComponent[]} = {};
for (const ar of fileTypesSuffixConfig) {
    for (const k of ar[0]) {
        if (!fileTypesSuffix[k]) {
            fileTypesSuffix[k] = [];
        }
        fileTypesSuffix[k].push(...ar[1]);
    }
}
// 去重
for (const k in fileTypesSuffix) {
    fileTypesSuffix[k] = [...new Set(fileTypesSuffix[k])];
}

export function getViewBySuffix(suffix:string,downloadCorsAllow:DownloadCorsAllow):ViewComponent[] {
    const com = fileTypesSuffix[suffix.toLowerCase()];
    if(com){
        const downloadCorsAllowDrade = downloadCorsAllowDradeMap[downloadCorsAllow];
        return [GenericFileDown,...com.filter(v=>v.downloadCorsAllowDrade>=downloadCorsAllowDrade)];
    }
    return [GenericFileDown];
}