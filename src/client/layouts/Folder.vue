<script setup lang="ts">
import { usePageFrontmatter } from 'vuepress/client';
import {FolderPageFrontmatter} from "../../type/index.js";
import FilesPageMain from "../components/FilesPageMain.vue";
import FButtonLink from "../components/FButtonLink.vue";
import FileTypeIcon from "../components/FileTypeIcon.vue";
import {dateFormat} from "../js/dateFormat.js";
import {fileSizeFormat} from "../js/fileSizeFormat.js";

const frontmatter = usePageFrontmatter<FolderPageFrontmatter>();


</script>

<template>
  <FilesPageMain>
    <template #default v-if="frontmatter.children && frontmatter.children.length>0">
      <div class="files">
        <!--      表头-->
        <div class="th">
          <div class="t-name">名称</div>
          <div class="t-size">大小</div>
          <div class="t-up-item">更新时间</div>
        </div>
        <!--      行-->
        <FButtonLink class="td" v-for="file of frontmatter.children" :to="`./${file.name}/`">
          <div class="t-name">
            <FileTypeIcon class="file-icon" :isFolder="file.isFolder" :fileName="file.name" />
            <span class="file-name" :title="file.name">{{file.name}}</span>
          </div>
          <div class="t-size">{{fileSizeFormat(file.size)}}</div>
          <div class="t-up-item">{{dateFormat(file.updateTime)}}</div>
        </FButtonLink>
      </div>
    </template>
  </FilesPageMain>
</template>

<style scoped>
.th .t-name,.th .t-size,.th .t-up-item{
  font-weight: bold;
  color: var(--f-color-1);
}

.td .t-size,.td .t-up-item{
  font-size: 0.9rem;
}

.file-name{
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
}
.files{
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.th,.td{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.th{
  padding: 0.4rem;
}
.t-name{
  flex: 1;
  width: 0rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.file-icon{
  font-size: 1.5rem;
  flex-shrink: 0;
  color: var(--t-color-1);
}
.t-size{
  text-align: right;
  min-width: 5rem;
}
.t-up-item{
  display: none;
  flex: 0.3;
  text-align: right;
  min-width: 10rem;
}
@media (min-width: 768px) {
  .t-up-item{
    display: block;
  }
}
</style>