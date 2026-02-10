<template>
  <div
    :class="['md-swiper-wrapper', isActive && 'active']"
    ref="mdSwiperRef"
    :style="{
      '--md-subtitle-color': props.mdSubtitleColor,
      '--md-scrollbar-color': props.mdScrollbarColor,
      '--md-scrollbar-fill-color': props.mdScrollbarFillColor,
    }"
  >
    <Swiper
      class="md-progress-swiper"
      :modules="[Pagination]"
      :slides-per-view="1"
      :loop="true"
      :pagination="{
        el: '.swiper-pagination',
        type: 'progressbar',
      }"
    >
      <SwiperSlide v-for="(item, index) in props.contentData" :key="index">
        <BaseImg class="swiper_img" :src="item.image" alt="" />
        <div class="swiper_title01" v-html="item.title"></div>
        <div class="swiper_title02" v-html="item.description"></div>
      </SwiperSlide>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>
<script setup>
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { calcSrollDis } from "@/utils/common";

const mdSwiperRef = ref();

const isActive = ref(false);

calcSrollDis(mdSwiperRef, [
  {
    dom: mdSwiperRef,
    percent: 0.2,
    active: isActive,
  },
]);

const props = defineProps({
  contentData: {
    type: Array,
    default: () => [],
  },
  mdSubtitleColor: {
    type: String,
    default: "#b2b2b2",
  },
  mdScrollbarColor: {
    type: String,
    default: "#ccc",
  },
  mdScrollbarFillColor: {
    type: String,
    default: "#e3bea4",
  },
});
</script>
<style lang="scss" scoped>
.md-swiper-wrapper {
  opacity: 0;
  transform: translateY(0.5rem);
  transition: all 0.5s;
}
.md-progress-swiper {
  padding-bottom: 0.4rem;
  .swiper_img {
    border-radius: 0.04rem;
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 1.565;
  }
  .swiper_title01 {
    font-size: 0.2rem;
    line-height: 0.24rem;
    margin-top: 0.2rem;
    color: white;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: all 0.5s;
    transition-delay: 0.2s;
    text-align: left;
  }
  .swiper_title02 {
    font-size: 0.14rem;
    line-height: 0.2rem;
    margin-top: 0.12rem;
    color: var(--md-subtitle-color);
    opacity: 0;
    transform: translateY(0.5rem);
    transition: all 0.5s;
    transition-delay: 0.6s;
    text-align: left;
  }
  .swiper-pagination {
    top: auto;
    bottom: 0;
    background: var(--md-scrollbar-color);
    height: 2px;
    :deep(.swiper-pagination-progressbar-fill) {
      background: var(--md-scrollbar-fill-color);
    }
  }
}
.md-swiper-wrapper.active {
  opacity: 1;
  transform: translateY(0);
  .swiper_title01 {
    opacity: 1;
    transform: translateY(0);
  }
  .swiper_title02 {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
