<template>
  <div class="setting-page">
    <div class="logo">猎豹</div>
    <div class="main-area">
      <workspace-manager @onWorkspaceChange="onWorkspaceChange" :workspaces="workspaces" />
      <app-choose-item :label="defaultAppDescribe[type].label" :app-path="app" :type-key="type"
        @onChooseApp="onChooseApp" v-for="(app, type) in defaultApp">
        {{ defaultAppDescribe[type].desc }}
        <div class="sub-desc" v-if="platform.isWin">{{ defaultAppDescribe[type].append }}</div>
      </app-choose-item>
      <cell-button @onClick="onClearCache">清除缓存</cell-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppChooseItem from '@/components/app-choose-item.vue';
import WorkspaceManager from '@/components/workspace-manager.vue';
import CellButton from '@/components/cell-button.vue';

let defaultApp: { [key: string]: any } = ref(window.getAllDefaultApp());
let workspaces = ref(window.getValue('workspaces') || []);
const platform = ref(window.platform);

const defaultAppDescribe: { [key: string]: any } = {
  open: {
    label: '默认编辑器',
    desc: 'open 命令选择项目默认由此编辑器打开',
    append: '',
  },
  git_gui_open: {
    label: 'Git GUI 应用',
    desc: 'git_gui_open 命令选择项目由此应用打开',
    append: 'windows 下暂时只支持 Fork (https://git-fork.com)',
  },
  terminal_open: {
    label: '终端',
    desc: 'terminal_open 命令选择项目由此终端打开',
    append: 'windows 下暂时只支持 CMD、PowerShell',
  }
}

function onChooseApp(key: string, appPath: string) {
  window.setDefaultApp(key, appPath);
  defaultApp.value = window.getAllDefaultApp();
}

function onWorkspaceChange(result: string[]) {
  workspaces.value = result;
  window.setValue('workspaces', result);
}

function onClearCache() {
  window.onClearCache();
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

.sub-desc{
  color: #666;
}
</style>