<template>
  <Swiper
    class="swiper"
    :modules="[EffectFade, Scrollbar]"
    effect="fade"
    :loop="false"
    :speed="1000"
    :fadeEffect="{
      crossFade: true,
    }"
    :scrollbar="{
      el: '.swiper-scrollbar',
    }"
  >
    <SwiperSlide v-for="item in props.list" :key="item.title">
      <MFPopItem
        :info="{
          src: props.src ? item[props.src] : '',
          title: props.title ? item[props.title] : '',
          subtitle: props.subtitle ? item[props.subtitle] : '',
          desc: props.desc ? item[props.desc] : '',
        }"
        color="white"
      />
    </SwiperSlide>
    <div class="swiper-scrollbar"></div>
  </Swiper>
</template>
<script setup>
import { EffectFade, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import MFPopItem from "./MFPopItem.vue";

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },
  title: {
    type: String,
    default: "title",
  },
  subtitle: {
    type: String,
    default: "subtitle",
  },
  src: {
    type: String,
    default: "src",
  },
  desc: {
    type: String,
    default: "desc",
  },
});
</script>
<style lang="scss" scoped>
.swiper {
  padding-bottom: 0.5rem;
  .swiper-scrollbar {
    position: absolute;
    left: 0;
    bottom: 0.2rem;
    width: 100%;
    height: 2px;
    background-color: rgba(225, 225, 225, 0.3);
    :deep(.swiper-scrollbar-drag) {
      background-color: #3aaeb0;
    }
  }
}
</style>
