<template>
  <div class="detail" ref="targetRef">
    <!-- H5 端 -->
    <BaseImg class="img_01" src="models/vx/35.jpg" alt="" />
    <BaseImg class="img_02" src="models/h5/06.jpg" alt="" />
    <div class="detail_title" :class="{ active: isVisible }">
      <div class="title_01">Comfortable Cabin</div>
      <div class="title_02">
        ENTER THE CABIN <br />ENJOY THE PRIVILEGED PLEASURE
      </div>
      <div class="title_03">
        Enter the cabin for sensual pleasures and appreciation of reverence
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { Pagination, Scrollbar } from "swiper/modules";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.1,
});

watch(isVisible, (newVal) => {
  const selectors = [".title_01", ".title_02", ".title_03"];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
});

const hotspotData = ref([
  {
    image: "models/vx/16.jpg",
    title: "2.0T+8AT\nGolden Power Combo",
    description:
      "Adopting the golden power combination of the new high-power 2.0T engine and Aisin 8-speed automatic transmission(8AT), it reaches a maximum power of 192kW, a peak torque of 400N.m, and a maximum thermal efficiency of 41%.",
  },
  {
    image: "models/vx/81.jpg",
    title: "7 Driving Modes",
    description:
      "Standard <br/> Economic <br/> Sports <br/> Snowfield <br/> Mud <br/> Sand <br/> Off-road",
  },
  {
    image: "models/vx/82.jpg",
    title: "Easy For 4WD Switching",
    description:
      "The BorgWarner all-terrain four-wheel drive system offers millisecond response, enabling faster four-wheel drive response and stronger assistance.",
  },
  {
    image: "models/vx/83.jpg",
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
<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 11.55rem;
  position: relative;
  .img_01 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .img_02 {
    display: none;
  }
  .detail_swiper {
    display: none;
  }
  .detail_title {
    position: absolute;
    top: 1.6rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    .title_01 {
      font-family: Saira;
      font-size: 0.18rem;
      font-weight: 300;
      line-height: 0.48rem;
      color: #e3bea4;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition-delay: 0.2s;
      }
    }
    .title_02 {
      font-size: 0.48rem;
      font-weight: 600;
      line-height: 0.48rem;
      text-align: center;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      margin-bottom: 0.08rem;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition-delay: 0.5s;
      }
    }
    .title_03 {
      font-family: Saira;
      font-size: 0.18rem;
      font-weight: 300;
      line-height: 0.48rem;
      text-align: center;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #e5e5e5;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition-delay: 0.8s;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    height: fit-content;
    .img_01 {
      display: none;
    }
    .img_02 {
      display: block;
    }
    .detail_swiper {
      display: block;
    }
    .detail_title {
      transform: translateX(0%);
      position: absolute;
      left: 0.2rem;
      top: auto;
      bottom: 0.4rem;
      padding-right: 0.2rem;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
        display: flex;
        text-align: left;
      }
      .title_02 {
        font-size: 0.2rem;
        line-height: 0.3rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
        display: flex;
        text-align: left;
      }
      .title_03 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #ffffff;
        display: flex;
        text-align: left;
      }
    }
    .detail_swiper {
      background: #0d0d0d;
      padding-top: 0.6rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      padding-bottom: 0.6rem;
    }
    .swiper_title01 {
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.24rem;
      color: #ffffff;
      margin-top: 0.2rem;
    }
    .swiper_title02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #b2b2b2;
      margin-top: 0.12rem;
      margin-bottom: 0.6rem;
    }
    .custom-scrollbar {
      width: 95%;
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
  .swiper_img {
    border-radius: 0.06rem;
  }
}
</style>>
