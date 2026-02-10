<template>
  <div class="detail" :class="{ active: isVisible }" ref="targetRef">
    <Swiper
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :slides-per-view="slidesPerView"
      :loop="true"
      class="swiper_content"
      style="pointer-events: auto"
    >
      <SwiperSlide>
        <BaseImg
          class="img"
          mode="widthFix"
          src="explorationImage/runCard.png"
          alt=""
        />
        <div class="detail-bg-wrapper">
          <BaseImg class="img_01" src="common/play.svg" @click="onPlayClick" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <BaseImg class="img" src="explorationImage/car.png" alt="" />
        <div class="detail-bg-wrapper">
          <BaseImg class="img_01" src="common/play.svg" @click="onPlayClick" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <BaseImg class="img" src="explorationImage/cardBg.png" alt="" />
        <div class="detail-bg-wrapper">
          <BaseImg class="img_01" src="common/play.svg" @click="onPlayClick" />
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="swiper_line">
      <div
        v-for="(slide, index) in 3"
        :key="index"
        :class="{ active: activeIndex === index }"
        :style="{ marginRight: index < 2 ? '0.16rem' : '0' }"
        @click="slideTo(index)"
      >
        <div class="line"></div>
        <div class="btn">Sand Mode</div>
      </div>
    </div>
    <YoutubePlayer
      :isShow="showplayer"
      @close="onPlayerClose"
      url="https://www.youtube.com/embed/4nWjSIDYG5U?"
    />
  </div>
</template>
  
  <script setup>
import { ref, watch } from "vue";
import { Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

const modules = [Pagination, Scrollbar];
const slidesPerView = ref(1);
const swiperInstance = ref(null);
const activeIndex = ref(0);
const showplayer = ref(false);

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onSlideChange = (swiper) => {
  activeIndex.value = swiper.realIndex;
};

const slideTo = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index);
  }
};
// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  const selectors = [".swiper_content "];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
});
const onPlayClick = () => {
  showplayer.value = true;
};
const onPlayerClose = () => {
  showplayer.value = false;
};
</script>
  
<style lang="scss" scoped>
.swiper_content {
  width: 16rem;
  height: 7.92rem;
  opacity: 0;
  transform: scale(1.1);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity;
  background-color: #000;
  &.animate {
    opacity: 1;
    transform: scale(1);
  }
  .swiper-slide {
    position: relative;
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .detail-bg-wrapper {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      opacity: 0;
      .img_01 {
        object-fit: cover;
      }
    }
  }
  .swiper-slide :hover {
    opacity: 0.4;
  }
  .swiper-slide:hover .detail-bg-wrapper {
    opacity: 1;
  }
  .detail-bg-wrapper :hover {
    transform: scale(1.2);
    opacity: 1;
    z-index: 9;
  }
  .detail-bg-wrapper :hover .swiper-slide {
    opacity: 0.4;
    background-color: #000;
  }
}

.swiper_line {
  display: flex;
  margin-top: 0.16rem;

  div {
    width: 5.23rem;
    font-size: 0.18rem;
    color: #808080;
    cursor: pointer;

    .line {
      width: 100%;
      height: 0.02rem;
      background-color: #808080;
      margin-bottom: 0.11rem;
      transition: all 0.3s ease;
    }

    &.active {
      color: #fff;

      .line {
        background-color: #fff;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    width: 100%;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .swiper_content {
    width: 100% !important;
    height: 1.97rem !important;
    opacity: 1;
  }
  .swiper_line {
    div {
      width: 100%;
      font-size: 0.12rem;
    }
  }
}
</style>