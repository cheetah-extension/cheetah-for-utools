<template>
  <div class="workspace-manager radius-block" data-label="工作区设置">
    <div class="describe">
      工具将在以下工作区目录搜索 Git 项目，可配置多个，每个工作区目录可以包含多个 Git 项目。
    </div>
    <div class="choose-input" v-for="workspace in workspaces">
      <div class="path-view" :title="workspace">
        {{ workspace }}
      </div>
      <div class="btn-clear" @click.stop="deleteWorkspace(workspace)" />
    </div>

    <div class="choose-input add" @click="chooseFolder" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
  workspaces: string[],
}>();

const emits = defineEmits(['onWorkspaceChange']);

function deleteWorkspace(workspace: string) {
  const workspaces = props.workspaces.filter(item => item !== workspace);
  emits('onWorkspaceChange', workspaces);
}

function chooseFolder() {
  const result = window.chooseFolder();
  if (!result) {
    return;
  }

  const workspace = result[0];
  const workspaces = [...props.workspaces];
  if (workspaces.includes(workspace)) {
    window.notice('工作区已存在');
    return
  }

  emits('onWorkspaceChange', [...workspaces, workspace]);
}

</script>

<style scoped lang="scss">
$tc: rgba(#2c3e50, 0.1);
$tc-hover: rgba(#2c3e50, 0.2);
$tc-active: rgba(#2c3e50, 0.5);

.workspace-manager {
  padding: 16px;
  margin-bottom: 16px;


  &::before {
    content: attr(data-label);
    font-size: 16px;
    font-weight: bold;
  }

  .describe {
    padding: 10px 0;
    color: #666;
    font-size: 14px;
    line-height: 1.5;
  }

  .choose-input {
    display: flex;
    border: 1px solid $tc;
    height: 36px;
    border-radius: 8px;
    transition: all 0.2s;
    cursor: pointer;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      border-color: $tc-hover;
    }

    .path-view {
      flex: 1;
      padding: 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      color: #666;
      line-height: 34px;

      &.empty {
        color: #ccc;
      }
    }

    .btn-clear {
      width: 34px;
      height: 34px;
      background-color: #fff;
      border-left: 1px solid $tc;
      border-radius: 0 8px 8px 0;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;

      &:hover {
        background-color: #f7f8f9;

        &::before,
        &::after {
          background-color: $tc-active;
        }
      }

      &::before,
      &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        content: "";
        display: block;
        width: 1px;
        height: 18px;
        background-color: $tc;
      }

      &::before {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }

    &.add {
      position: relative;

      &::before,
      &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 1px;
        background-color: $tc;
        transform: translate(-50%, -50%);
      }

      &::before {
        transform: translate(-50%, -50%) rotate(90deg);
      }

      &:hover {

        &::before,
        &::after {
          background-color: $tc-active;
        }
      }
    }
  }
}
</style>