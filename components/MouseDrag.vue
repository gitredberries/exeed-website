<template>
  <div
    :class="['mouse-drag md-mouse-drag', isMouseActive ? 'active' : '']"
    :style="{ top: `calc(${mouseY}px - 0.55rem)`, left: `calc(${mouseX}px - 0.55rem)` }"
  >
    <BaseImg class="mouse-arrow" src="explorationImage/LeftOutlined.png" />
    <span>DRAG</span>
    <BaseImg class="mouse-arrow" src="explorationImage/rightOutlined.png" />
  </div>
</template>
<script setup>
const mouseX = ref(0);
const mouseY = ref(0);
const isMouseActive = ref(false);

const onMouseMove = (ev) => {
  mouseX.value = ev.x;
  mouseY.value = ev.y;
};

const onTouchMove = (swiper, event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
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
  width: 1.1rem;
  height: 1.1rem;
  padding: 0.1rem;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 50%;
  font-size: 0.14rem;
  transform: scale(0);
  transition: transform .5s, opacity .56s;
  position: fixed;
  z-index: 7;
  opacity: 0;
  .mouse-arrow {
    width: 0.16rem;
  }
}
.mouse-drag.active {
  transform: scale(1);
  opacity: 1;
}
</style>
