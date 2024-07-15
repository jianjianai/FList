<script setup lang="ts">
import { useRoute } from 'vuepress/client';
import {computed} from "vue";
import FButtonLink from "./FButtonLink.vue";

const router = useRoute();
const pathArray = computed(()=>{
  const s = router.path.split("/");
  s.splice(0,1);
  s.splice(s.length-1, 1);
  return s;
});

function getToPath(index: number) {
  let toPath = '/';
  for (let i = 0; i <= index; i++) {
    toPath += `${pathArray.value[i]}/`;
  }
  return toPath;
}


</script>

<template>
<div class="breadcrumb">
  <FButtonLink to="/">主页</FButtonLink>
  <template v-for="(file,index) of pathArray">
    <div>/</div>
    <FButtonLink class="alink" :to="getToPath(index)">{{decodeURI(file)}}</FButtonLink>
  </template>
</div>
</template>

<style scoped>
.alink{
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.breadcrumb{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>