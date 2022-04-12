<template>
  <div class="radius-block cell-button" @click="onClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
const emits = defineEmits(['onClick']);

function onClick() {
  emits('onClick')
}
</script>

<style scoped lang="scss">
.cell-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36px;
  color: #999;
  cursor: pointer;
  transition: color .2s;

  &:hover {
    color: #03A9F4;
  }
}
</style>