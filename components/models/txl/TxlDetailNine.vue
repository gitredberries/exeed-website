<template>
  <div class="detail" ref="targetRef">
    <!-- PC 端 -->
    <div class="detail_title" :class="{ active: isVisible }" scroll_bottom>
      <div class="title_01">Intelligent Driving</div>
      <div class="title_02">
        L2+INTELLIGENT DRIVER ASSISTANCE <br />
        WITH POWERFUL COMPUTING <br />
        CAPABILITIES
      </div>
      <div class="title_03">
        Equipped with 2 millimetre-wave radars, 12 ultrasonic sensors, 1
        multifunction front view camera, 1 parking controller and 4 ultra-clear
        surround view cameras for zero blind spots.
      </div>
    </div>
    <div class="unit_zoom_i scroll_top">
      <BaseImg class="zbi_1" src="models/txl/23.jpg" alt="" />
      <BaseImg class="zbi_2" src="models/txl/51.jpg" alt="" />
    </div>
  </div>
</template>
    <script setup>
import { watch } from "vue";
import { useScrollAnimation } from "~/utils/hooks/useScrollAnimation.js";
import { useAnimation } from "~/utils/hooks/useAnimation.js";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value.querySelector(".title_01").classList.add("animate");
    targetRef.value.querySelector(".title_02").classList.add("animate");
    targetRef.value.querySelector(".title_03").classList.add("animate");
  } else {
    targetRef.value.querySelector(".title_01").classList.remove("animate");
    targetRef.value.querySelector(".title_02").classList.remove("animate");
    targetRef.value.querySelector(".title_03").classList.remove("animate");
  }
});
useScrollAnimation();
</script>

<style lang="scss" scoped>
.detail {
  background: #000;
  padding-top: 1.6rem;
  text-align: center;
  .detail_title {
    .title_01 {
      font-size: 0.2rem;
      font-weight: 300;
      line-height: 0.48rem;
      color: #e3bea4;
      margin-bottom: 0.24rem;
      transform: translateY(1rem);
      opacity: 0;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition: all 1s;
        transition-delay: 0.2s;
      }
    }
    .title_02 {
      font-size: 0.52rem;
      font-weight: 600;
      line-height: 0.6rem;
      text-align: center;
      color: #ffffff;
      transform: translateY(1rem);
      opacity: 0;
      margin-bottom: 0.12rem;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition: all 1s;
        transition-delay: 0.5s;
      }
    }
    .title_03 {
      font-size: 0.16rem;
      font-weight: normal;
      line-height: 0.24rem;
      color: #ffffff;
      transform: translateY(1rem);
      opacity: 0;
      margin-bottom: 0.12rem;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition: all 1s;
        transition-delay: 0.8s;
      }
    }
  }
}
.unit_zoom_i img {
  transform: scale(0.8);
  transition: all 1s;
  width: 100%;
}
.zbi_2 {
  display: none;
}
.detail_swiper {
  display: none;
}
.unit_zoom_i._into img {
  transform: scale(1);
}
.unit_zoom_i.into img {
  transform: scale(1);
}
@media screen and (max-width: 1024px) {
  .detail {
    height: 5.4rem;
    background: #000;
    position: relative;
    .detail_title {
      position: absolute;
      left: 0.2rem;
      right: 0.2rem;
      top: 0.8rem;
      z-index: 9;
      text-align: left;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.28rem;
        color: #ffffff;
        text-align: left;
        margin-bottom: 0.08rem;
      }
      .title_03 {
        text-align: left;
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #ffffff;
      }
    }
  }
  .zbi_1 {
    display: none;
  }
  .zbi_2 {
    display: block;
    height: 5.46rem;
  }
  .unit_zoom_i {
    position: absolute;
    left: 0;
    top: 0;
    // top: 6.3rem;
  }
  .unit_zoom_i img {
    transform: scale(1);
    width: 100vw;
  }
}
</style>
