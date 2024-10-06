<script setup lang="ts">
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';
import {PageFileData} from "../../../../type/index.js";
import {onMounted, onUnmounted, ref} from "vue";
import coverUrl from "../../../imgs/ui/file-music-fill.svg?url";
import {putNotification} from "../../../js/notification/notification.js";
import {dateFormat} from "../../../js/dateFormat.js";
import {fileSizeFormat} from "../../../js/fileSizeFormat.js";

const props = defineProps<{file:PageFileData}>()

const aplayerEl = ref<HTMLElement>()
let aplayer:any = null;
let unmounted = true;
onMounted(()=>{
  aplayer = new APlayer({
    container: aplayerEl.value,
    audio: [{
      name: props.file.name,
      url: props.file.downloadUrl,
      cover: coverUrl,
      artist: dateFormat(props.file.updateTime)+" - "+fileSizeFormat(props.file.size),
    }],
    theme: '#56ccff'
  });
  aplayer.on('error', function () {
    if(unmounted){
      putNotification({message:"音频加载失败！",type:"error",time:10000});
    }
  });
})
onUnmounted(()=>{
  unmounted = false;
  aplayer?.destroy()
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