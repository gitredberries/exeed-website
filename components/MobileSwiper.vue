<template>
  <Swiper
    class="mobile-swiper"
    :modules="[Pagination]"
    :loop="true"
    :pagination="{ el: '.swiper-pagination', type: 'progressbar' }"
  >
    <SwiperSlide v-for="(item, index) in swiperList" :key="index">
      <BaseImg class="swiper_img" :src="item.image" alt="" />
      <div class="swiper_title01">{{ item.title }}</div>
      <div class="swiper_title02">{{ item.description }}</div>
    </SwiperSlide>
    <div class="swiper-pagination"></div>
  </Swiper>
</template>
<script setup>
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
const props = defineProps({
  swiperList: {
    type: Array,
    default: () => [],
  },
});
const swiperList = computed(() => props.swiperList);
</script>
<style lang="scss" scoped>
.mobile-swiper {
  padding-bottom: 0.4rem;
  .swiper_img{
    border-radius: 0.04rem;
  }
  .swiper_title01 {
    font-size: 0.2rem;
    line-height: 0.24rem;
    margin-top: 0.2rem;
    color: #fff;
    text-align: left;
  }
  .swiper_title02 {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #b2b2b2;
    margin-top: 0.12rem;
    text-align: left;
  }
  .swiper-pagination{
    top: auto;
    bottom: 0;
    height: 0.02rem;
    background: #333333;
    :deep(.swiper-pagination-progressbar-fill){
      background: #E3BEA4;
    }
  }
}
</style>
