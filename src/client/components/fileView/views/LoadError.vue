<script setup lang="ts">

import CircleCloseOSvg from "../../../imgs/ui/CircleCloseOSvg.vue";
const props = defineProps<{message?:string}>();
</script>

<template>
  <div class="load-error">
    <CircleCloseOSvg class="icon"></CircleCloseOSvg>
    <div class="title">{{props.message || "组件加载失败,请尝试刷新页面。"}}</div>
  </div>
</template>

<style scoped>
.title{
  font-size: 1.1rem;
}
.icon{
  color: var(--tip-color-error);
  width: 4rem;
  height: 4rem;
}
.load-error{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;
  flex-direction: column;
  gap: 1rem;
}
</style>