import {type Component} from "vue";
import FileSvg from "./FileSvg.vue";

const fileTypesSuffix:{[suffix:string]:Component} = {
}

export function getIconBySuffix(suffix: string):Component {
    const com = fileTypesSuffix[suffix];
    if(com){
        return com
    }
    return FileSvg;
}