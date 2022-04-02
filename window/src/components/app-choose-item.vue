<template>
  <div class="radius-block app-choose-item" :data-label="props.label">
    <div class="describe">
      <slot></slot>
    </div>
    <div class="choose-input">
      <div class="path-view" :class="{ empty: !appPath }" @click="chooseApp" :title="appPath">
        {{ appPath }}
        <template v-if="!appPath">点击选择应用</template>
      </div>
      <div class="btn-clear" @click.stop="clearAppPath" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  appPath: {
    type: String,
    required: true,
    default: '',
  },
});

const emits = defineEmits(['onChooseApp']);

function chooseApp() {
  const result = window.chooseFile();
  if (!result) {
    return;
  }
  emits('onChooseApp', result[0]);
}

function clearAppPath() {
  emits('onChooseApp', '');
}

</script>

<style scoped lang="scss">
$tc: rgba(#2c3e50, 0.1);
$tc-hover: rgba(#2c3e50, 0.2);
$tc-active: rgba(#2c3e50, 0.5);
.app-choose-item {
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
  }
}
</style>