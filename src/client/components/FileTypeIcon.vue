<script setup lang="ts">
import {type Component, computed} from "vue";
import FolderSvg from "../imgs/fileTypes/FolderSvg.vue";
import {getIconBySuffix} from "../imgs/fileTypes/suffix.js";

const props = defineProps<{isFolder:boolean,fileName:string}>();
const icon = computed<Component>(()=>{
  if(props.isFolder){
    return FolderSvg;
  }
  const suffixLastIndex = props.fileName.lastIndexOf(".");
  const suffix = suffixLastIndex>=0?props.fileName.substring(suffixLastIndex):"";
  return getIconBySuffix(suffix);
});

</script>

<template>
  <component class="icon" :is="icon"></component>
</template>

<style scoped>
.icon{
  width: 1em
}
</style>