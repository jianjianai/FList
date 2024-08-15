<script setup lang="ts">
import {PageFileData} from "../../../../type/index.js";
import PDF from "pdf-vue3";
import {onMounted, ref} from "vue";
import Loading from "./Loading.vue";
import LoadError from "./LoadError.vue";
import {putNotification} from "../../../js/notification/notification.js";

const props = defineProps<{file:PageFileData}>()
const pdfData = ref<Uint8Array>();
const pdfLoadError = ref(false)
onMounted( async ()=>{
  try{
    const res = await fetch(props.file.downloadUrl);
    if(!res.ok){
      putNotification({message:"加载 pdf 文件失败!",type:"error",time:10000});
      return;
    }
    const data = await res.arrayBuffer();
    pdfData.value = new Uint8Array(data);
  }catch (e){
    pdfLoadError.value = true;
  }
});

</script>

<template>
  <div class="pdf">
    <div v-if="pdfData" class="pdf-body"><PDF :src="pdfData"/></div>
    <LoadError v-else-if="pdfLoadError" message="加载 pdf 文件失败!"></LoadError>
    <Loading v-else></Loading>
  </div>
</template>

<style scoped>
.pdf-body{
  border: var(--pdf-player-border);
  border-radius: 0.8rem;
  padding: 0.8rem 0;
  height: 70vh;
}
.pdf{
  padding: 1rem 0;
}
</style>