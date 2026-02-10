<template>
  <!-- 视频弹窗，使用 v-if 控制显示隐藏 -->
  <div v-if="isVideoVisible" :class="['video-popup', isActive && 'active']">
    <div class="close" @click="close">
      <BaseImg src="model/es/gp_close.png" />
    </div>
    <slot></slot>
  </div>
</template>

<script setup>

const isShow = defineModel();

const isActive = ref(false);

watch(
  isShow,
  (newValue) => {
    if (newValue) {
      isVideoVisible.value = true;
      setTimeout(() => {
        isActive.value = true;
      });
      nextTick(() => {
        document.body.style.overflow = "hidden";
      });
    } else {
      isActive.value = false;
      setTimeout(() => {
        isVideoVisible.value = false;
      }, 300);
      nextTick(() => {
        document.body.style.overflow = "auto";
      });
    }
  }
);

// 控制视频弹窗的显示与隐藏
const isVideoVisible = ref(false);

// 隐藏视频弹窗
const close = () => {
  isShow.value = false;
};
</script>

<style scoped lang="scss">
.video-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  transition: all 0.3s;
  &.active {
    opacity: 1;
  }
  .close {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    width: 0.3rem;
    height: 0.3rem;
    cursor: pointer;
  }
  :deep(.swiper-button-next){
    color: white;
    &::after{
      font-size: 0.28rem;
    }
  }
  :deep(.swiper-button-prev){
    color: white;
    &::after{
      font-size: 0.28rem;
    }
  }
}
</style>
