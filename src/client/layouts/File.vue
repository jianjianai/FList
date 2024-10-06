<script setup lang="ts">
import {usePageFrontmatter} from "vuepress/client";
import FilesPageMain from "../components/FilesPageMain.vue";
import {FilePageFrontmatter} from "../../type/index.js";
import FileView from "../components/fileView/FileView.vue";

const frontmatter = usePageFrontmatter<FilePageFrontmatter>();


</script>

<template>
  <FilesPageMain>
    <FileView :file="frontmatter.flistData!"></FileView>
  </FilesPageMain>
</template>

<style scoped>

</style>