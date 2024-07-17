<script setup lang="ts">
import {closeNotification, iconComponents, notifications} from "./notification.js";
import CloseSvg from "../../imgs/ui/CloseSvg.vue";

</script>
<template>
  <TransitionGroup class="notification-list" name="list" tag="div">
    <div v-for="({notification}, key) in notifications" :key="key" class="notification">
      <div class="icon">
        <component :is="iconComponents[notification.type]" class="icon-svg" :class="notification.type"></component>
      </div>
      <div class="message">{{notification.message}}</div>
      <div class="close">
        <div class="close-button" @click="closeNotification(key)">
          <CloseSvg class="close-icon"></CloseSvg>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>
<style scoped>
.close-button{
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 0.2rem;
}
.close-button:hover{
  background-color: var(--notification-bg-close-h);
}
.close-icon{
  width: 0.7rem;
  height: 0.7rem;
}
.close{
  display: flex;
  align-items: flex-start;
}
.icon-svg.success{
  color: var(--tip-color-success);
}
.icon-svg.error{
  color: var(--tip-color-error);
}
.icon-svg{
  width: 1.6rem;
}
.icon{
  display: flex;
  align-items: center;
}
.message{
  flex: 1;
  width: 0;
  word-wrap: break-word;
}
.notification{
  background-color: var(--notification-bgc);
  box-shadow: var(--notification-shadow);
  border-radius: 0.8rem;
  padding: 0.8rem;
  display: flex;
  align-items: stretch;
  gap: 0.5rem;
  width: 28rem;
  margin: 0.5rem;
  max-width: calc(100vw - 2.6rem);
}
.notification-list{
  height: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}

/*动画*/
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>