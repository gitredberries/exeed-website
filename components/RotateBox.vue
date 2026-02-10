<template>
  <div
    class="box-wrapper"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
    <div class="box-inner">
      <div
        v-for="(item, index) in certList"
        class="box"
        :style="{
          transform: `translateX(${item.transform[0]}rem) scale(${item.transform[1]})`,
          zIndex: item.transform[2],
        }"
        @click="onImgClick(index)"
      >
        <BaseImg :src="item.src" />
      </div>
    </div>
  </div>
</template>
<script setup>
let pointList = [
  [0, 0.7, 1],
  [1.6, 0.9, 3],
  [3.2, 1, 4],
  [4.8, 0.8, 2],
];
const certList = ref([
  {
    id: 1,
    src: "explorationImage/one.png",
    transform: pointList[0],
  },
  {
    id: 2,
    src: "explorationImage/two.png",
    transform: pointList[1],
  },
  {
    id: 3,
    src: "explorationImage/three.png",
    transform: pointList[2],
  },
  {
    id: 4,
    src: "explorationImage/four.png",
    transform: pointList[3],
  },
]);

let activeIndex = 2;

const onImgClick = (index) => {
  let arr = Array.from({ length: pointList.length }, (_, index) => index);
  let delta = activeIndex - index;
  arr = arr.map((v) => (v + delta + arr.length) % arr.length);
  let temp = arr.map((v) => pointList[v]);
  pointList = temp;
  certList.value.forEach((item, index) => {
    item.transform = pointList[index];
  });
  activeIndex = index;
};
</script>
<style lang="scss" scoped>
.box-wrapper {
  width: 7rem;
  position: relative;
  .box-inner {
    width: 2.7rem;
    height: 3.6rem;
    position: relative;
    .box {
      position: absolute;
      top: 0;
      left: 0;
      width: 2.7rem;
      height: 3.6rem;
      transition: all 0.5s;
      transform-origin: center bottom;
      img {
        width: 100%;
        height: 100%;
        pointer-events: none;
      }
    }
  }
  &::after {
    content: "";
    position: absolute;
    top: 100%; // 位于 box-inner 下方
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleY(-1);
    filter: blur(5px) brightness(0.7);
    opacity: 0.8;
    background: inherit;
    clip-path: inset(0 0 0 0); // 裁剪路径
    pointer-events: none; // 避免响应鼠标事件
  }
}
</style>
