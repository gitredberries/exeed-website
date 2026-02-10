<template>
  <div :class="['play-wrapper', isActive && 'active']" v-if="visible">
    <!-- <BaseImg src="common/play.svg" @click="onPlayClick" /> -->
     <div class="play-inner" @click="onPlayClick">
      <BaseImg src="common/triangle.png" />
     </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});

let timer = null;
const visible = ref(false);
const isActive = ref(false);

watch(
  () => props.isShow,
  (val) => {
    timer && clearTimeout(timer);
    if (val) {
      visible.value = true;
      timer = setTimeout(() => {
        isActive.value = true;
      }, 10);
    } else {
      isActive.value = false;
      timer = setTimeout(() => {
        visible.value = false;
      }, 500);
    }
  },
{
  immediate: true,
});

const emits = defineEmits(["onPlayClick"]);
const onPlayClick = () => {
  emits("onPlayClick");
};
</script>
<style lang="scss" scoped>
.play-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.5s;
  z-index: 10;
  pointer-events: none;
  .play-inner{
    width: 0.72rem;
    height: 0.72rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    transform: scale(1);
    background-color: rgba(255,255,255, 0.3);
    opacity: 0;
    cursor: pointer;
    pointer-events: all;
    backdrop-filter: blur(0.1rem);
    overflow: hidden;
    &:hover {
      transform: scale(1.2);
    }
    img{
      width: 100%;
      margin-left: 5%;
    }
  }
}
.play-wrapper.active {
  background-color: rgba(0, 0, 0, 0.4);
  .play-inner {
    opacity: 1;
  }
}

@media screen and (max-width: 1024px) {
  .play-wrapper{
    .play-inner{
      width: 0.32rem;
      height: 0.32rem;
    }
  }
}
</style>
