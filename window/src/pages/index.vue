<template>
  <div class="setting-page">
    <div class="logo">猎豹</div>
    <div class="main-area">
      <app-choose-item
        :label="defaultAppDescribe[type].label"
        :app-path="app"
        :type-key="type"
        @onChooseApp="onChooseApp"
        v-for="(app, type) in defaultApp"
      >{{ defaultAppDescribe[type].desc }}</app-choose-item>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppChooseItem from '@/components/app-choose-item.vue';
let defaultApp: { [key: string]: any } = ref(window.getDefaultApp());

const defaultAppDescribe: { [key: string]: any } = {
  open: {
    label: '默认编辑器',
    desc: 'open 命令选择项目默认由此编辑器打开',
  },
  git_gui_open: {
    label: 'Git GUI 应用',
    desc: 'git_gui_open 命令选择项目由此应用打开',
  },
  terminal_open: {
    label: '终端',
    desc: 'terminal_open 命令选择项目由此终端打开',
  }
}

function onChooseApp(key: string, appPath: string) {
  window.setDefaultApp(key, appPath);
  defaultApp.value = window.getDefaultApp();
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
    flex-shrink: 0;
  }

  .main-area {
    width: 100%;
  }
}
</style>