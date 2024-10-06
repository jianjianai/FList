<script setup lang="ts">
import { PageFileData} from "../../../../type/index.js";
import {onMounted, ref} from "vue";
import {putNotification} from "../../../js/notification/notification.js";
import Loading from "./Loading.vue";
import LoadError from "./LoadError.vue";
const props = defineProps<{file:PageFileData}>()

const loading = ref(true);
const loadError = ref(false);
const innerText = ref<string>();
onMounted( async ()=>{
  try{
    const res = await fetch(props.file.downloadUrl);
    if(!res.ok){
      putNotification({message:"加载 文本 文件失败!",type:"error",time:10000});
    }
    innerText.value = await res.text();
  }catch (e){
    putNotification({message:"加载 文本 文件失败!",type:"error",time:10000});
    loadError.value = true;
  }
  loading.value = false;
});

</script>

<template>
  <div class="pre-text">
    <LoadError v-if="loadError" message="加载 文本 文件失败!"></LoadError>
    <Loading v-else-if="loading"></Loading>
    <template v-else>
      <div class="title">{{props.file.name}}</div>
      <pre class="body">{{innerText}}</pre>
    </template>
  </div>
</template>

<style scoped>
.title{
  border: var(--pre-text-player-border);
  border-bottom: none;
  border-radius: 0.8rem 0.8rem 0 0;
  width: calc(100% - 2rem);
  padding: 0.5rem 1rem;
  background-color: var(--pre-text-player-title-bgc);
  font-size: 0.9rem;
  font-weight: bolder;
}
.body{
  border: var(--pre-text-player-border);
  border-radius: 0 0 0.8rem 0.8rem;
  padding: 1rem;
  width: calc(100% - 2rem);
  max-height: 70vh;
  margin: 0;
  overflow: auto;
}
.pre-text{
  padding: 1rem 0;
}
</style>