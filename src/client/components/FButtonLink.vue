<script setup lang="ts">

const props = defineProps<{to:string}>()

function isUrl(url: string){
  try {
    new URL(url)
    return true;
  }catch(error){
    return false;
  }
}
</script>

<template>
  <a v-if="isUrl(props.to)" :href="props.to" target="_blank" class="flink">
    <slot></slot>
  </a>
  <RouterLink v-else :to="props.to" class="flink">
    <slot></slot>
  </RouterLink>
</template>

<style scoped>
.flink:hover{
  transform: scale(1.01);
  background-color: var(--a-button-bg-hover);
}
.flink{
  text-decoration: none;
  display: inline-block;
  border-radius: 0.4rem;
  padding: 0.4rem;
  transition: background-color 0.25s,transform 0.25s;
  color: var(--f-color-0);
}
</style>