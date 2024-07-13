<script setup lang="ts">

</script>

<template>
  <header class="header">
    <div class="left">
      <img src="../imgs/logo.svg" alt="logo" class="logo" />
    </div>
    <div class="right">
    </div>
  </header>
</template>

<style scoped>
.left,.right{
  height: 100%;
  display: flex;
  align-items: center;
}
.logo{
  height: 3rem;
  width: 3rem;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
}
</style>