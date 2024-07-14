import {type Component} from "vue";
import FileSvg from "./FileSvg.vue";
import FileEarmarkTextFill from "./FileEarmarkTextFill.vue";
import FileZipFill from "./FileZipFill.vue";
import FileImageO from "./FileImageO.vue";
import FileMarkdown from "./FileMarkdown.vue";
import FilePdf from "./FilePdf.vue";
import FilePpt from "./FilePpt.vue";
import FileWord from "./FileWord.vue";
import FileExcel from "./FileExcel.vue";
import FileMusicFill from "./FileMusicFill.vue";
import FileVideo from "./FileVideo.vue";

const fileTypesSuffix:{[suffix:string]:Component} = {
    ".txt":FileEarmarkTextFill,
    ".md":FileMarkdown,
    ".zip":FileZipFill,
    ".rar":FileZipFill,
    ".7z":FileZipFill,
    ".tar":FileZipFill,
    ".gz":FileZipFill,
    ".bz2":FileZipFill,
    ".jpg":FileImageO,
    ".jpeg":FileImageO,
    ".png":FileImageO,
    ".gif":FileImageO,
    ".bmp":FileImageO,
    ".webp":FileImageO,
    ".svg":FileImageO,
    ".ico":FileImageO,
    ".tiff":FileImageO,
    ".pdf":FilePdf,
    ".ppt":FilePpt,
    ".pptx":FilePpt,
    ".doc":FileWord,
    ".docx":FileWord,
    ".xls":FileExcel,
    ".xlsx":FileExcel,
    ".csv":FileExcel,
    ".mp3":FileMusicFill,
    ".wav":FileMusicFill,
    ".flac":FileMusicFill,
    ".mp4":FileVideo,
    ".mkv":FileVideo,
    ".webm":FileVideo,
    ".m3u8":FileVideo,
    ".ts":FileVideo,
    ".avi":FileVideo,
    ".mov":FileVideo,
    ".wmv":FileVideo,
    ".flv":FileVideo
}

export function getIconBySuffix(suffix: string):Component {
    const com = fileTypesSuffix[suffix];
    if(com){
        return com
    }
    return FileSvg;
}