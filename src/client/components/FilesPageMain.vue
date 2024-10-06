<script setup lang="ts">
import PageHeader from "./PageHeader.vue";
import PagBreadcrumb from "./PagBreadcrumb.vue";
import MainBox from "./MainBox.vue";
import FLink from "./FButtonLink.vue";
import {usePageFrontmatter} from "vuepress/client";
import Notification from "../js/notification/Notification.vue";
import { FilePageFrontmatter, FolderPageFrontmatter } from "../../type";
import { computed } from "vue";
import FContent from "./FContent.vue";

const frontmatter = usePageFrontmatter<FolderPageFrontmatter|FilePageFrontmatter>();
const content = computed(()=>frontmatter.value.flistData?.content);

</script>

<template>
  <div class="page-main">
    <div class="page-layouts">
      <PageHeader></PageHeader>
      <PagBreadcrumb></PagBreadcrumb>
      <MainBox v-if="$slots.default">
        <slot></slot>
      </MainBox>
      <FContent v-if="content" :content="content" style="padding: 1rem"></FContent>
    </div>
    <div class="footer">
      <FLink to="https://github.com/jianjianai/FList">由 FList 强力驱动</FLink>
    </div>
<!--    消息弹出框-->
    <Notification></Notification>
  </div>
</template>

<style scoped>
.page-main{
  background-color: var(--page-bgc);
  padding: 0 2%;
  min-height: 100vh;
}
.page-layouts {
  margin: 0 auto;
  max-width: 980px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: calc(100vh - 6rem);
}
.footer{
  height: 6rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
}

</style>