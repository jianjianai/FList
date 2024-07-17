<script setup lang="ts">

import {useSiteData} from "vuepress/client";

const siteData = useSiteData()

</script>

<template>
  <header class="header">
    <RouterLink class="left" to="/">
      <img src="/logo.png" alt="logo" class="logo" />
      <div class="logo-title">{{siteData.title}}</div>
    </RouterLink>
    <div class="right">
    </div>
  </header>
</template>

<style scoped>
.left{
  display: block;
  gap: 0.3rem;
  font-weight: bold;
  text-decoration: none;
}
.logo-title{
  font-size: 1.5rem;
  color: var(--logo-color);
}
.left,.right{
  height: 100%;
  display: flex;
  align-items: center;
}
.logo{
  height: 2.5rem;
  width: 2.5rem;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
}
</style>