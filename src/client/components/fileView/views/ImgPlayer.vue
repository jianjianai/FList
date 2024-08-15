<script setup lang="ts">
import {PageFileData} from "../../../../type/index.js";
import 'viewerjs/dist/viewer.css'
import { component as Viewer } from "v-viewer"
import {putNotification} from "../../../js/notification/notification.js";

const props = defineProps<{file:PageFileData}>()
const options = {
  "inline": true,
  "button": true,
  "title": true,
  "toolbar": true,
  "tooltip": true,
  "zoomable": true,
  "rotatable": true,
  "scalable": true,
  "transition": true,
  "fullscreen": false
}
function error(){
  putNotification({message:"图片加载失败！",type:"error",time:10000});
}

</script>

<template>
  <div class="img-player">
    <div class="img-body">
      <Viewer class="img-view" :options="options" >
        <img class="inner-img" :src="props.file.downloadUrl" :alt="props.file.name" @error="error()">
      </Viewer>
    </div>
  </div>
</template>
<style>
.img-player .inner-img{
  width: 100%;
  height: 100%;
  filter: opacity(0.1);
}
.img-player .img-view{
  overflow: hidden;
  height: 60vh;
}
.img-player{
  padding: 1rem 0;
}
</style>