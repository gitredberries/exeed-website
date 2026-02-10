<template>
  <!-- PC 端 -->
  <div class="swiper" ref="swiperRef">
    <div :class="['detail', isDetailActive && 'active']" ref="detailRef">
      <Swiper
        :slidesOffsetBefore="120"
        :modules="modules"
        :slides-per-view="2.8"
        :loop="false"
        :space-between="22"
      >
        <SwiperSlide v-for="(item, index) in props.detailContents" :key="index">
          <div :class="['swiper-content-wrapper', item.isActive && 'active']">
            <div class="mask"></div>
            <BaseImg class="swiper_img" :src="item.image" alt="" />
            <div class="desc-wrapper">
              <div class="swiper_title01">{{ item.title }}</div>
              <div class="swiper_title02">{{ item.description }}</div>
              <div class="explore-more" @click="item.isActive = !item.isActive">
                <BaseImg src="models/vx/41.png" />
                <span>EXPLORE MORE</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <!-- H5 端 -->
    <div class="swiper_content">
      <MdProgressSwiper :content-data="props.detailContents"/>
    </div>
  </div>
</template>

<script setup>
import { Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { calcSrollDis } from "@/utils/common";

const props = defineProps({
  detailContents: {
    type: Array,
    default: () => [],
  },
});

// Swiper 模块,进度条宽度
const modules = [Pagination, Scrollbar];
const slidesPerView = ref(1);
const progress = ref(0);
const swiperInstance = ref(null);

const swiperRef = ref();
const detailRef = ref();
const isDetailActive = ref(false);

calcSrollDis(swiperRef, [
  {
    dom: detailRef,
    percent: 0.3,
    active: isDetailActive,
  },
]);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  updateProgress(swiper);
};
const onSlideChange = () => {
  if (swiperInstance.value) {
    updateProgress(swiperInstance.value);
  }
};
const updateProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  progress.value = (currentIndex / totalSlides) * 100;
};
</script>

<style lang="scss" scoped>
.swiper {
  .detail {
    transition: all 0.5s;
    transform: translateY(1rem);
    opacity: 0;
    .swiper-content-wrapper {
      .mask{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.5s;
        z-index: 0;
        pointer-events: none;
      }
      position: relative;
      .desc-wrapper {
        position: absolute;
        bottom: 0.2rem;
        padding: 0 0.45rem;
        color: white;
      }
      .swiper_img {
        width: 100%;
        height: 100%;
        aspect-ratio: 1.04;
        object-fit: cover;
      }
      .swiper_title01 {
        font-size: 0.36rem;
        line-height: 0.48rem;
      }
      .swiper_title02 {
        font-size: 0.16rem;
        line-height: 0.24rem;
        max-height: 0;
        transition: all 1s;
        overflow: hidden;
      }
      .explore-more {
        display: flex;
        align-items: center;
        font-size: 0.18rem;
        height: 0.48rem;
        cursor: pointer;
        img {
          width: 0.18rem;
          margin-right: 0.1rem;
          transition: all 0.5s;
        }
      }
    }
    .swiper-content-wrapper.active {
      .mask {
        background-color: rgba(0, 0, 0, 0.6);
      }
      .swiper_title02 {
        max-height: 2rem;
      }
      .explore-more {
        img {
          transform: rotate(180deg);
        }
      }
    }
  }
  .detail.active {
    opacity: 1;
    transform: translateY(0);
  }
  .swiper_content {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .swiper {
    background: #0d0d0d;
    padding: 0.6rem 0.2rem 0.6rem 0.2rem;
    .detail {
      display: none;
    }
    .swiper_content {
      display: block;
      padding: 0;
    }
    .swiper_img {
      height: 2.14rem;
      border-radius: 0.06rem;
      margin-bottom: 0.02rem;
      width: 100%;
      object-fit: cover;
    }
    .swiper_title01 {
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.24rem;
      color: #ffffff;
      margin-bottom: 0.12rem;
      margin-top: 0.12rem;
    }
    .swiper_title02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #b2b2b2;
      margin-bottom: 0.4rem;
    }
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.02rem;
    background-color: #e0e0e0;
    margin-top: 10px;
    border-radius: 5px;
    margin-bottom: 0.06rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
    border-radius: 5px;
  }
}
</style>
