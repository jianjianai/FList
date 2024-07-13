<script setup lang="ts">
import {usePageFrontmatter} from "vuepress/client";
import FilesPageMain from "../components/FilesPageMain.vue";
import {computed, ComputedRef} from "vue";
import {FrontmatterFileData} from "../../type/index.js";
import FileView from "../components/fileView/FileView.vue";

const frontmatter = usePageFrontmatter();
const file = computed(()=>frontmatter.value.file) as ComputedRef<FrontmatterFileData>;


</script>

<template>
  <FilesPageMain>
    <FileView :file="file"></FileView>
  </FilesPageMain>
</template>

<style scoped>

</style>