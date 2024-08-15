<script setup lang="ts">
import {PageFileData} from "../../../../type/index.js";
import {fileSizeFormat} from "../../../js/fileSizeFormat.js";
import {dateFormat} from "../../../js/dateFormat.js";
import AButton from "../../buttons/AButton.vue";
import {putNotification} from "../../../js/notification/notification.js";
import FileTypeIcon from "../../FileTypeIcon.vue";

const props = defineProps<{file:PageFileData}>()

function copyLink(){
  navigator.clipboard.writeText(new URL(props.file.downloadUrl, window.location.origin).toString());
  putNotification({message: "链接已复制", type: "success"});
}

</script>

<template>
  <div class="down">
    <FileTypeIcon :fileName="props.file.name" :isFolder="false" class="icon"></FileTypeIcon>
    <div class="name">{{props.file.name}}</div>
    <div class="info">{{fileSizeFormat(props.file.size)}} {{dateFormat(props.file.updateTime)}}</div>
    <div v-if="props.file.downloadCorsAllow=='verystrict'" style="margin-top: 1rem;font-size: 0.8rem;margin-bottom: -0.5rem;color: var(--tip-color-error);">由于原站严格限制,请复制链接后粘贴到新标签页下载。</div>
    <div class="buttons">
      <AButton class="button-color-grep1" @click="copyLink()">复制链接</AButton>
      <AButton target="_blank" :href="props.file.downloadUrl" v-if="props.file.downloadCorsAllow!='verystrict'">下载</AButton>
    </div>
  </div>
</template>

<style scoped>
.buttons{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}
.info{
  margin-top: 0.8rem;
  font-size: 0.8rem;
  color: var(--f-color-2);
}
.name{
  font-weight: bolder;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  max-width: 100%;
  word-wrap: break-word;
  text-align: center;
}
.icon{
  width: 5rem;
  color: var(--t-color-1);
}
.down{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
}
</style>