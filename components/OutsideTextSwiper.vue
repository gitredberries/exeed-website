<template>
  <div ref="wrapperRef">
    <!-- PC 端 -->
    <div :class="['pc_detail', isSwiperActive && 'active']" ref="targetRef">
      <Swiper
        class="outside-swiper"
        :modules="[Pagination]"
        :slides-per-view="1.4"
        :loop="false"
        :slidesOffsetBefore="120"
        :space-between="60"
        :pagination="{ el: '.swiper-pagination', clickable: true }"
        @slide-change="onSlideChange"
        @swiper="onSwiper"
      >
        <SwiperSlide
          class="swiper_slide"
          v-for="(item, index) in contentData"
          :key="index"
        >
          <div class="slide-inner">
            <BaseImg class="swiper_img" :src="item.image" alt="" />
            <div>
              <div class="swiper_title01">{{ item.title }}</div>
              <div class="swiper_title02" v-html="item.description"></div>
            </div>
          </div>
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
    <!-- H5 端 -->
    <div class="h5_detail">
      <MdProgressSwiper :contentData="contentData" />
    </div>
  </div>
</template>

<script setup>
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { calcSrollDis } from "@/utils/common";

const wrapperRef = ref();
const targetRef = ref();

const isSwiperActive = ref(false);

calcSrollDis(wrapperRef, [
  {
    dom: targetRef,
    percent: 0.2,
    active: isSwiperActive,
  },
]);

const props = defineProps({
  contentData: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(['getSwiperIndex'])

let swiper = null;

const onSlideChange = (s) => {
  emits('getSwiperIndex', s.realIndex);
}

const onSwiper = (s) => {
  swiper = s;
};

const slidePrev = () => {
  swiper.slidePrev();
}

const slideNext = () => {
  swiper.slideNext();
}

defineExpose({
  slidePrev,
  slideNext
})

const contentData = computed(() => props.contentData);
</script>

<style scoped lang="scss">
.pc_detail {
  overflow: hidden;
  width: 100%;
  background: #131313;
  opacity: 0;
  transform: translateY(1rem);
  transition: all 0.5s;
  .outside-swiper {
    padding-bottom: 0.44rem;
    .swiper-pagination {
      bottom: 0;
      text-align: right;
      padding-right: 1.2rem;
      :deep(.swiper-pagination-bullet) {
        width: 0.08rem;
        height: 0.08rem;
        background: #e3bea4;
        opacity: 0.5;
        transition: all 0.5s;
      }
      :deep(.swiper-pagination-bullet-active) {
        width: 0.24rem;
        height: 0.08rem;
        opacity: 1;
        border-radius: 0.08rem;
      }
    }
  }
  .slide-inner {
    align-items: center;
    display: flex;
    .swiper_img {
      width: 63%;
      margin-right: 0.6rem;
    }
    .swiper_title01 {
      font-size: 0.52rem;
      line-height: 0.6rem;
      color: white;
      margin-bottom: 0.4rem;
      opacity: 0;
      transform: translateX(1rem);
      transition: all 1s;
      transition-delay: 0.2s;
    }
    .swiper_title02 {
      font-size: 0.16rem;
      line-height: 0.24rem;
      color: #9e9e9e;
      opacity: 0;
      transform: translateX(1rem);
      transition: all 1s;
      transition-delay: 0.6s;
    }
  }
}
.pc_detail.active{
  opacity: 1;
  transform: translateY(0rem);
  .slide-inner {
    .swiper_title01 {
      transform: translateX(0);
      opacity: 1;
    }
    .swiper_title02 {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
.h5_detail {
  display: none;
}
@media screen and (max-width: 1024px) {
  .pc_detail {
    display: none;
  }
  .h5_detail {
    display: block;
    padding: 0.6rem 0.2rem;
  }
}
</style>
