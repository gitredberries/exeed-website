<template>
  <div>
    <!-- PC 端 -->
    <div class="pc_detail" ref="targetRef">
      <div class="swh_page">
        <div
          class="swiper-pagination-bullet"
          v-for="(item, index) in items"
          :key="index"
          :class="{ active: currentIndex === index }"
        ></div>
      </div>
      <div class="sw_pn_btn">
        <div
          class="swh_prev"
          @click="prev"
          :class="{ disabled: currentIndex === 0 }"
        >
          <BaseImg src="models/vx/20.png" alt="" />
        </div>
        <div
          class="swh_next"
          @click="next"
          :class="{ disabled: currentIndex === items - 1 }"
        >
          <BaseImg src="models/vx/21.png" alt="" />
        </div>
      </div>
      <div class="swiper-container">
        <div
          class="swiper_content"
          :style="{ transform: `translateX(-${currentIndex * itemWidth}px)` }"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
        >
          <div
            class="item"
            v-for="(item, index) in items"
            :key="index"
            :class="{ active: isVisible }"
          >
            <BaseImg class="img" :src="item.image" alt="" />
            <div class="item_title">
              <div class="title_01">{{ item.title }}</div>
              <div class="title_02">{{ item.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- H5 端 -->
    <div class="h5_detail">
      <Swiper
        :modules="modules"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :slides-per-view="slidesPerView"
        :loop="true"
        :space-between="20"
        style="pointer-events: auto"
      >
        <SwiperSlide
          class="swiper_slide"
          v-for="(item, index) in items"
          :key="index"
        >
          <BaseImg class="swiper_img" :src="item.image" alt="" />
          <div class="swiper_title01">{{ item.title }}</div>
          <div class="swiper_title02">{{ item.description }}</div>
        </SwiperSlide>
      </Swiper>
      <div class="custom-scrollbar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useSwiper } from "~/utils/hooks/useSwiper.js";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

import BaseImg from "~/components/BaseImg.vue";
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

const items = ref([
  {
    image: "models/rx/90.jpg",
    title: "High-Performance Suspension",
    description:
      "The enhancement of the overall suspension comfort; Three suspension modes With millisecond response",
  },
  {
    image: "models/rx/91.jpg",
    title: "Optimal Vibration Reduction",
    description:
      "Hydraulic damping strut (HDS) systemThe super response chassis is trained to respond quickly to your driving instructions.Up and down vibrations of buffer Front and rear vibrations of buffer Softer and more comfortable Optimal Vibration Reduction Buffer vibrations in all directions ensure a softer and more comfortable handling effortless ride",
  },
  {
    image: "models/rx/92.jpg",
    title: "Efficient AWD System",
    description:
      "Fast response High precision Maintenance free; The maximum torque output of the rear axle is nearly 3000N.m, with abundant AWD power.",
  },
  {
    image: "models/rx/93.jpg",
    title: "7 Driving Modes for Every Terrain",
    description:
      "Easy to cope with all driving scenarios, Provide seven driving modes, including economic, standard, sports, snow, mud, sand, and off-road. Off road crawling control. Transparent chassis Energy flow display.",
  },
  {
    image: "models/rx/94.jpg",
    title: "Superior Steering Performance",
    description:
      "The steering response increases by 20%, more comfortable and safer:The steering force is balanced between lightweight at low speeds and stable at high speeds, providing a very comfortable feeling.",
  },
]);

const {
  currentIndex,
  itemWidth,
  prev,
  next,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
} = useSwiper(items);

// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value
      .querySelectorAll(".img")
      .forEach((img) => img.classList.add("animate"));
    targetRef.value
      .querySelectorAll(".title_01")
      .forEach((title) => title.classList.add("animate"));
    targetRef.value
      .querySelectorAll(".title_02")
      .forEach((desc) => desc.classList.add("animate"));
  } else {
    targetRef.value
      .querySelectorAll(".img")
      .forEach((img) => img.classList.remove("animate"));
    targetRef.value
      .querySelectorAll(".title_01")
      .forEach((title) => title.classList.remove("animate"));
    targetRef.value
      .querySelectorAll(".title_02")
      .forEach((desc) => desc.classList.remove("animate"));
  }
});
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


<style scoped lang='scss'>
.pc_detail {
  height: 8.06rem;
  padding-left: 1.9rem;
  overflow: hidden;
  width: 100%;
  background: #131313;
}
.sw_pn_btn {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.88rem;
  padding-right: 0.4rem;
  .swh_prev {
    margin-right: 0.18rem;
    margin-bottom: 0.4rem;
  }
  .swh_prev:hover,
  .swh_next:hover {
    opacity: 0.7;
  }
  img {
    width: 0.35rem;
  }
}
.swiper-container {
  height: 100%;
  display: flex;
}

.swiper_content {
  display: flex;
  transition: transform 0.3s ease;
}

.item {
  width: 75vw;
  height: 5.08rem;
  display: flex;
  .img {
    height: 100%;
    width: 7.92rem;
    object-fit: cover;
    margin-right: 0.5rem;
    border-radius: 0.06rem;
    transform: translateY(1rem);
    opacity: 0;
    transition: all 1s;
    &.animate {
      transform: translateY(0rem);
      opacity: 1;
    }
  }
  .item_title {
    margin-right: 1.5rem;
    .title_01 {
      font-family: Saira;
      font-size: 0.4rem;
      font-weight: 600;
      line-height: 0.48rem;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      margin-bottom: 0.2rem;
      transform: translateX(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.2s;
      &.animate {
        transform: translateX(0rem);
        opacity: 1;
      }
    }
    .title_02 {
      font-family: Saira;
      font-size: 0.18rem;
      font-weight: normal;
      line-height: 0.28rem;
      color: #b2b2b2;
      transform: translateX(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.4s;
      &.animate {
        transform: translateX(0rem);
        opacity: 1;
      }
    }
  }
}
.item_01 {
  width: 75vw;
  height: 5.08rem;
  display: flex;
  img {
    height: 100%;
    width: 7.92rem;
    object-fit: cover;
    margin-right: 0.5rem;
  }
  .item_title {
    margin-right: 1.5rem;
    .title_1 {
      font-family: Saira;
      font-size: 0.4rem;
      font-weight: 600;
      line-height: 0.48rem;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      margin-bottom: 0.2rem;
    }
    .title_2 {
      font-family: Saira;
      font-size: 0.18rem;
      font-weight: normal;
      line-height: 0.28rem;
      color: #b2b2b2;
    }
  }
}
.swh_page {
  display: flex;
  padding: 0 1rem;
  position: absolute;
  bottom: 1rem;
  right: 0.38rem;
}
.swh_page .swiper-pagination-bullet {
  background-color: rgb(227 190 164);
  margin: 0 0.08rem;
  opacity: 0.5;
  transition: all 0.5s;
  width: 0.04rem;
  height: 0.04rem;
  border-radius: 100%;
}
.swiper-pagination-bullet.active {
  background-color: rgb(227 190 164);
  width: 0.2rem;
  height: 0.01rem;
  border-radius: 50px;
  opacity: 1;
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
    height: 6.45rem;
    padding: 0.6rem 0.2rem;
    background: #0d0d0d;
  }
  .swiper_content {
    height: 6.45rem;
    padding: 0.6rem 0.2rem;
    background: #333333;
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.03rem;
    background-color: #e0e0e0;
    margin-top: 10px;
    border-radius: 0.05rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
    border-radius: 0.05rem;
  }
  .swiper_img {
    width: 100%;
    height: 2.14rem;
    border-radius: 0.1rem;
    object-fit: cover;
  }
  .swiper_title01 {
    font-size: 0.2rem;
    font-weight: 500;
    line-height: 0.24rem;
    color: #ffffff;
    margin-bottom: 0.12rem;
    margin-top: 0.2rem;
  }
  .swiper_title02 {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #b2b2b2;
    margin-bottom: 0.3rem;
  }
}
</style>


