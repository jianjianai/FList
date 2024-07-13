<script setup lang="ts">
import {FrontmatterFileData} from "../../../type/index.js";
import {computed} from "vue";
import {getViewBySuffix, ViewComponent} from "./views/suffix.js";


const props = defineProps<{file:FrontmatterFileData}>();
const theFile = computed(()=>props.file);

const viewComponent = computed<ViewComponent>(()=>{
  const suffixLastIndex = theFile.value.name.lastIndexOf(".");
  const suffix = suffixLastIndex>=0?theFile.value.name.substring(suffixLastIndex):"";
  return getViewBySuffix(suffix);
});

</script>

<template>
  <ClientOnly>
    <component :is="viewComponent" :file="file"></component>
  </ClientOnly>
</template>

<style scoped>

</style>