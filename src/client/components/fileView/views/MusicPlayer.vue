<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {FrontmatterFileData} from "../../../../type/index.js";
import {onMounted, onUnmounted, ref} from "vue";
import coverUrl from "../../../imgs/ui/file-music-fill.svg?url";

const props = defineProps<{file:FrontmatterFileData}>()

const aplayerEl = ref<HTMLElement>()
let aplayer:any = null;
onMounted(()=>{
  aplayer = new APlayer({
    container: aplayerEl.value,
    audio: [{
      name: props.file.name,
      url: props.file.url,
      cover: coverUrl
    }],
    theme: '#56ccff'
  });
})
onUnmounted(()=>{
  if(aplayer){
    aplayer.destroy()
  }
});


</script>

<template>
  <div class="music">
    <div ref="aplayerEl"></div>
  </div>
</template>

<style scoped>
.music{
  padding: 1rem 0;
}
</style>