import {type Component, defineAsyncComponent} from "vue";
import {FrontmatterFileData} from "../../../../type/index.js";
import LoadError from "./LoadError.vue";
import Loading from "./Loading.vue";

export type ViewComponent = Component<{file:FrontmatterFileData}>;

function defineViewComponent(f:()=>Promise<ViewComponent>):ViewComponent{
    return defineAsyncComponent({
        errorComponent:LoadError,
        loadingComponent:Loading,
        loader:f
    })
}
const fileTypesSuffix:{[suffix:string]:ViewComponent} = {

}

export function getViewBySuffix(suffix: string):ViewComponent {
    const com = fileTypesSuffix[suffix];
    if(com){
        return com
    }
    return defineViewComponent(()=>import("./GenericFileDown.vue"));
}