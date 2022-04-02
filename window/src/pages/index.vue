<template>
  <div class="setting-page">
    <div class="logo">猎豹</div>
    <div class="main-area">
      <app-choose-item
        label="默认编辑器"
        :app-path="defaultApp"
        @onChooseApp="onChooseApp"
      >open 命令选择项目默认由此编辑器打开</app-choose-item>
      <app-choose-item
        label="默认编辑器"
        app-path
      >open 命令选择项目默认由此编辑器打开命令选择项目默认由此编辑器打开命令选择项目默认由此编辑器打开命令选择项目默认由此编辑器打开命令选择项目默认由此编辑器打开</app-choose-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppChooseItem from '@/components/app-choose-item.vue';
const defaultApp = ref('/Applications/Visual Studio Code.app');

function onChooseApp(appPath: string) {
  defaultApp.value = appPath;
}


</script>

<style lang="scss" scoped>
.setting-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f8f9;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding: 0 16px 80px;

  .logo {
    background-size: 64px;
    background-position: left center;
    background-image: url("@/assets/logo.png");
    background-repeat: no-repeat;
    height: 100px;
    padding-left: 80px;
    display: flex;
    align-items: center;
    font-size: 28px;
    font-weight: bold;
  }

  .main-area {
    width: 100%;
  }
}
</style>