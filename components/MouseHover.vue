<!--
 * @Author: panchen panchen1@mychery.com
 * @Date: 2025-04-18 09:30:45
 * @LastEditors: panchen panchen1@mychery.com
 * @LastEditTime: 2025-04-18 15:33:31
 * @Description: 
-->
<template>
  <div
    :class="['mouse-drag md-mouse-drag', isMouseActive ? 'active' : '']"
    :style="{ transform: `translateX(${mouseX}px) translateY(${mouseY}px)` }"
    ref="mouseRef"
  >
    <span>{{ props.text}}</span>
  </div>
</template>
<script setup>
const props = defineProps({
  text: {
    type: String,
    default: 'Read',
  },
})
const mouseX = ref(0);
const mouseY = ref(0);
const isMouseActive = ref(false);
const mouseRef = ref(null);

const onMouseMove = (ev) => {
  const rect = mouseRef.value?.getBoundingClientRect() || {};
  mouseX.value = ev.x - rect.width / 2;
  mouseY.value = ev.y - rect.height / 2;
};

const onTouchMove = (swiper, event) => {
  const rect = mouseRef.value?.getBoundingClientRect() || {};
  mouseX.value = event.clientX- rect.width / 2;
  mouseY.value = event.clientY - rect.height / 2;
};

let timer = null;

const onMouseLeave = () => {
  timer && clearTimeout(timer);
  isMouseActive.value = false;
  timer = setTimeout(() => {
    document.removeEventListener("mousemove", onMouseMove);
  }, 500);
};

const onMouseEnter = () => {
  timer && clearTimeout(timer);
  isMouseActive.value = true;
  document.addEventListener("mousemove", onMouseMove);
};

defineExpose({
  onMouseMove,
  onMouseLeave,
  onMouseEnter,
  onTouchMove,
})

</script>
<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .mouse-drag.md-mouse-drag {
    display: none;
  }
}
.mouse-drag {
  pointer-events: none;
  border-radius: 0.02rem;
  /* 图片/图片2 */
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(30px);
  padding: 0 0.2rem;
  height: 0.4rem;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.16rem;
  transform: scale(0);
  transition: opacity .56s;
  position: fixed;
  z-index: 7;
  opacity: 0;
  color: #1A1A1A;
  left:0;
  top:0;
}
.mouse-drag.active {
  transform: scale(1);
  opacity: 1;
}
</style>
