<script setup lang="ts">
import Artplayer from "artplayer";
import {FrontmatterFileData} from "../../../../type/index.js";
import {onMounted} from "vue";

const props = defineProps<{file:FrontmatterFileData}>()
onMounted(()=>{
  const art = new Artplayer({
    container: '.artplayer-app',
    url: props.file.url,
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
  art.on('ready', () => {
    art.autoHeight();
  });
  art.on('resize', () => {
    art.autoHeight();
  });
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
  height: 60vh
}
</style>