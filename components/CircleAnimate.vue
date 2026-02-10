<template>
  <svg class="circle-wrapper" viewBox="0 0 100 100">
    <!-- 绘制圆形路径 -->
    <circle
      :style="{ opacity: props.showAnimate ? 1 : 0.5 }"
      cx="50"
      cy="50"
      r="15"
      fill="white"
    />
    <circle
      v-if="props.showAnimate"
      class="static-circle"
      cx="50"
      cy="50"
      r="43"
    />
    <circle
      v-if="props.showAnimate"
      :style="{ animationDuration: `${duration}s` }"
      class="draw-circle"
      cx="50"
      cy="50"
      r="43"
      stroke="white"
    />
  </svg>
</template>
<script setup>
const props = defineProps({
  showAnimate: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 5000,
  },
});

const duration = computed(() => (props.duration || 5000) / 1000);
</script>
<style lang="scss" scoped>
/* 定义绘制圆形的动画 */
@keyframes drawCircle {
  to {
    stroke-dasharray: 314 314; /* 最终完整绘制圆形 */
  }
}

.circle-wrapper {
  width: 100%;
  height: 100%;
}

/* 为圆形路径设置样式 */
.draw-circle {
  fill: none;
  stroke-width: 7;
  stroke-dasharray: 0 314; /* 初始时无描边显示 */
  animation: drawCircle 5s linear forwards;
}

.static-circle {
  fill: none;
  stroke: #aaa;
  stroke-width: 7;
}
</style>
