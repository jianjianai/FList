<script setup lang="ts">

const props = defineProps<{
  href?:string
  target?:"_blank"|"_parent"|"_self"|"_top"
}>();

</script>

<template>
  <a :href="props.href" :target="props.href" class="a-button">
    <slot></slot>
  </a>
</template>

<style scoped>
.a-button{
  display: inline-block;
  border-radius: 0.6rem;
  padding: 0.6rem 1rem;
  background-color: var(--a-button-bg);
  color: var(--a-button-c);
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.25s,transform 0.25s;
}
.a-button:hover{
  background-color: var(--a-button-bg-h);
  transform: scale(1.01);
}

</style>