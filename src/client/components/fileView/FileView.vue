<script setup lang="ts">
import {FrontmatterFileData} from "../../../type/index.js";
import {computed, ref} from "vue";
import {getViewBySuffix, ViewComponent} from "./views/suffix.js";


const props = defineProps<{file:FrontmatterFileData}>();
const theFile = computed(()=>props.file);

const viewComponents = computed<ViewComponent[]>(()=>{
  const suffixLastIndex = theFile.value.name.lastIndexOf(".");
  const suffix = suffixLastIndex>=0?theFile.value.name.substring(suffixLastIndex):"";
  return getViewBySuffix(suffix);
});
const selectEd = ref(0);

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