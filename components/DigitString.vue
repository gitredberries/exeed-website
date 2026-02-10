<template>
  <div
    :class="['num-wrapper', isActive && 'active']"
    :style="{
      transform: `translateY(${
        isActive ? '0' : 'calc(' + (100 / (num + 1) * num) + '%)'
      })`,
    }"
  >
    <div v-for="i in count" :key="i">{{ i - 1 }}</div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    moveSwitch?: number;
    num?: number;
  }>(),
  {
    num: 0,
    moveSwitch: -1,
  }
);

const count = computed(() => props.num + 1);

const isActive = ref(false);

// 开始滚动
const startRoll = () => {
  isActive.value = false;
  setTimeout(() => {
    isActive.value = true;
  }, 20);
};

// 滚动开关
const switchValue = computed(() => props.moveSwitch);

watch(switchValue, () => {
  startRoll();
});
</script>
<style lang="scss" scoped>
.num-wrapper {
  height: fit-content;
  text-align: center;
}
.num-wrapper.active {
  transition: all 1s ease-out;
}
</style>
