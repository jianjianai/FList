<script setup lang="ts">
import {PageFileData} from "../../../type/index.js";
import {computed, onMounted, ref} from "vue";
import {getViewBySuffix, ViewComponent} from "./views/suffix.js";


const props = defineProps<{file:PageFileData}>();
const theFile = computed(()=>props.file);

const viewComponents = computed<ViewComponent[]>(()=>{
  const suffixLastIndex = theFile.value.name.lastIndexOf(".");
  const suffix = suffixLastIndex>=0?theFile.value.name.substring(suffixLastIndex):"";
  if(!__VUEPRESS_SSR__){console.log(`当前 ${theFile.value.name} 文件下载限制等级: ${theFile.value.downloadCorsAllow}`);}
  return getViewBySuffix(suffix,theFile.value.downloadCorsAllow || "allow");
});
const selectEd = ref(0);
onMounted(()=>{
  //客户端如果有多个视图组件，那么默认选择第一个
  selectEd.value = viewComponents.value.length>1?1:0;
})

</script>

<template>
  <div>
    <select v-model="selectEd" v-if="viewComponents.length>1">
      <option v-for="(co,index) of viewComponents" :value="index">{{co.name}}</option>
    </select>
    <component :is="viewComponents[selectEd].component" :file="file"></component>
  </div>
</template>

<style scoped>

</style>