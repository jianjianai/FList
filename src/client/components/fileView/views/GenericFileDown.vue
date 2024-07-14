<script setup lang="ts">
import {FrontmatterFileData} from "../../../../type/index.js";
import {fileSizeFormat} from "../../../js/fileSizeFormat.js";
import {dateFormat} from "../../../js/dateFormat.js";
import AButton from "../../buttons/AButton.vue";
import {putNotification} from "../../../js/notification/notification.js";
import FileTypeIcon from "../../FileTypeIcon.vue";

const props = defineProps<{file:FrontmatterFileData}>()

function copyLink(){
  navigator.clipboard.writeText(new URL(props.file.url, window.location.origin).toString());
  putNotification({message: "链接已复制", type: "success"});
}

</script>

<template>
  <div class="down">
    <FileTypeIcon :fileName="props.file.name" :isFolder="false" class="icon"></FileTypeIcon>
    <div class="name">{{props.file.name}}</div>
    <div class="info">{{fileSizeFormat(props.file.size)}} {{dateFormat(props.file.updateTime)}}</div>
    <div class="buttons">
      <AButton class="copy-down" @click="copyLink()">复制链接</AButton>
      <AButton target="_blank" :href="props.file.url">下载</AButton>
    </div>
  </div>
</template>

<style scoped>
.copy-down{
  --a-button-bg: #eee9ff;
  --a-button-bg-h: #e5daff;
  --a-button-c: #ca6cff;
}
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
  color: var(--color-op1);
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
  color: var(--logo-c);
}
.down{
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem 0;
}
</style>