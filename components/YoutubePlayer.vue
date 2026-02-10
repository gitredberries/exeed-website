<template>
  <!-- 视频弹窗，使用 v-if 控制显示隐藏 -->
  <div v-if="isVideoVisible" :class="['video-popup', isActive && 'active']">
    <div class="close" @click="close">
      <BaseImg src="model/es/gp_close.png" />
    </div>
    <div class="video-container" v-if="typeof props.url === 'string'">
      <iframe
        ref="youtubeIframe"
        width="100%"
        height="100%"
        :src="`${props.url}autoplay=1&playsinline=1&pip=1`"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="video-container" v-else>
      <Swiper
        :modules="[Navigation]"
        style="width: 100%; height: 100%"
        :loop="false"
        :speed="1000"
        @swiper="onAutoPlayerSwiper"
        :navigation="{
          hideOnClick: true,
        }"
      >
        <SwiperSlide v-for="(item, index) in props.url" :key="index">
          <div style="width: 100%; height: 100%">
            <iframe
              width="100%"
              height="100%"
              :src="`${item}autoplay=1&playsinline=1&pip=1`"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup>
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  url: {
    type: [String, Array],
    default: "", // 默认视频 ID
  },
  activeIndex: {
    type: Number,
    default: 0,
  },
});

let swiper = null;

const activeIndex = computed(() => props.activeIndex);

const onAutoPlayerSwiper = (s) => {
  swiper = s;
  swiper.slideTo(activeIndex.value);
};

const emits = defineEmits(["close"]);
const isActive = ref(false);

watch(activeIndex, (newValue) => {
  if (swiper) {
    swiper.slideTo(newValue);
  }
});

watch(
  () => props.isShow,
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
const youtubeIframe = ref(null);

// 隐藏视频弹窗
const close = () => {
  emits("close");
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

.video-container {
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  border-radius: 5px;
}
</style>
