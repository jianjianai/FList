<script setup lang="ts">
import Artplayer from "artplayer";
import {PageFileData} from "../../../../type/index.js";
import {onMounted, onUnmounted} from "vue";
import {putNotification} from "../../../js/notification/notification.js";


const props = defineProps<{file:PageFileData}>()

let artPlayer:Artplayer|null = null;

onMounted(()=>{
  artPlayer = new Artplayer({
    container: '.artplayer-app',
    url: props.file.downloadUrl,
    lang: navigator.language.toLowerCase(),
    theme:"#0092ff",
    autoMini:true,
    flip:true,
    playbackRate:true,
    setting:true,
    hotkey:true,
    pip:true,
    fullscreen:true,
    fullscreenWeb:true,
    subtitleOffset:true,
    fastForward:true,
  });
  artPlayer.on('ready', () => {
    artPlayer?.autoHeight();
  });
  artPlayer.on('resize', () => {
    artPlayer?.autoHeight();
  });
  artPlayer.on('error', (error, reconnectTime) => {
    if(reconnectTime>=5){
      putNotification({message:"视频加载失败！",type:"error",time:10000});
    }
  });
})
onUnmounted(()=>{
  artPlayer?.destroy();
})

</script>

<template>
  <div class="video">
    <div class="artplayer-app"></div>
  </div>
</template>

<style scoped>
.video{
  padding: 1rem 0;
}
.artplayer-app{
  height: 60vh;
  max-height: 80vh;
}
</style>