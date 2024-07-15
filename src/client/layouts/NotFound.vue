<script setup lang="ts">

import FilesPageMain from "../components/FilesPageMain.vue";
import LoadError from "../components/fileView/views/LoadError.vue";
</script>

<template>
  <FilesPageMain>
    <LoadError message="404 文件不存在!"></LoadError>
  </FilesPageMain>
</template>

<style scoped>

</style>