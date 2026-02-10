<template>
  <div
    :class="['mouse-drag md-mouse-drag', props.isActive ? 'active' : '']"
    :style="{
      top: `calc(${props.y}px - 0.7rem)`,
      left: `calc(${props.x}px - 0.7rem)`,
    }"
  >
    <BaseImg class="mouse-arrow" src="model/es/mw_left.png" />
    <span>DRAG</span>
    <BaseImg class="mouse-arrow" src="model/es/mw_right.png" />
  </div>
</template>
<script setup>
const props = defineProps({
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .mouse-drag.md-mouse-drag {
    display: none;
  }
}
.mouse-drag {
  pointer-events: none;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0.2rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  font-size: 0.14rem;
  transform: scale(0);
  transition: transform 0.5s, opacity 0.56s;
  position: fixed;
  z-index: 7;
  opacity: 0;
  .mouse-arrow {
    width: 0.1rem;
  }
}
.mouse-drag.active {
  transform: scale(1);
  opacity: 1;
}
</style>
