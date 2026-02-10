<template>
  <!-- H5 端 -->
  <div class="h5_detail">
    <Swiper
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :slides-per-view="slidesPerView"
      :loop="true"
      :space-between="22"
      style="pointer-events: auto"
    >
      <SwiperSlide
        class="swiper_slide"
        v-for="(item, index) in hotspotData"
        :key="index"
      >
        <img class="swiper_img" :src="item.image" alt="" />
        <div class="swiper_title03">{{ item.theme }}</div>
        <div class="swiper_title01">{{ item.title }}</div>
        <div class="swiper_title02">{{ item.description }}</div>
      </SwiperSlide>
    </Swiper>
    <!-- 自定义进度条 -->
    <div class="custom-scrollbar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import image1 from "@/assets/models/h5/43.jpg";
import image2 from "@/assets/models/h5/44.jpg";
import image3 from "@/assets/models/h5/45.jpg";
import image4 from "@/assets/models/h5/45.jpg";
// 定义 detailContents 数据
const hotspotData = ref([
  {
    image: image1,
    title: "1112.0T+8AT\nGolden Power Combo",
    description:
      "Adopting the golden power combination of the new high-power 2.0T engine and Aisin 8-speed automatic transmission(8AT), it reaches a maximum power of 192kW, a peak torque of 400N.m, and a maximum thermal efficiency of 41%.",
  },
  {
    image: image2,
    title: "7 Driving Modes",
    description:
      "① Standard\n② Economic\n③ Sports\n④ Snowfield\n⑤ Mud\n⑥ Sand\n⑦ Off-road",
  },
  {
    image: image3,
    title: "Easy For 4WD Switching",
    description:
      "The BorgWarner all-terrain four-wheel drive system offers millisecond response, enabling faster four-wheel drive response and stronger assistance.",
  },
  {
    image: image4,
    title: "Comfort And Serenity In Ride",
    description:
      "Master chassis tuning enhances handling and stability with a linear response range of ≥0.4g and maximum lateral acceleration of ≈0.94g.",
  },
]);
// Swiper 模块,进度条宽度
const modules = [Pagination, Scrollbar];
const slidesPerView = ref(1);
const progress = ref(0);
const swiperInstance = ref(null);
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
<style scoped lang="scss">
@media screen and (max-width: 1024px) {
  .h5_detail {
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
      margin-bottom: 0.1rem;
    }
    .swiper_title02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #b2b2b2;
      margin-bottom: 0.08rem;
    }
    .swiper_title03 {
      font-size: 0.13rem;
      color: rgba(255, 255, 255, 0.3);
      margin-top: 0.1rem;
    }
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.01rem;
    background-color: #e0e0e0;
    margin-top: 10px;
    border-radius: 5px;
    margin-bottom: 0.06rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
  }
}
</style>