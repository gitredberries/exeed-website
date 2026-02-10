<template>
  <div class="detail" ref="targetRef">
    <BaseImg
      class="img_01"
      src="models/rx/30.jpg"
      alt=""
      :style="{ opacity: opacity }"
    />
    <BaseImg class="img_02" src="models/h5/47.jpg" alt="" />
    <div class="md-mask"></div>
    <div class="detail_title" :class="{ active: isVisible }">
      <div class="title_01">Intelligent Driving</div>
      <div class="title_02">
        MORE CUTTING-EDGE IMTIMATE SCIEMTIFIC <br />
        AND TECHNOLOGICAL SERVICES
      </div>
      <div class="title_03">
        MORE CUTTING-EDGE IMTIMATE<br />
        SCIEMTIFIC AND TECHNOLOGICAL <br />SERVICES
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { useOpacity } from "~/utils/hooks/useOpacity.js";
const { targetRef, isVisible } = useAnimation({
  threshold: 0.1,
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
// 初始化滚动监听
const { opacity, initScrollListener } = useOpacity(0.5);
watch(isVisible, (newVal) => {
  opacity.value = newVal ? 1 : 0.5;
});
initScrollListener(isVisible);
</script>
    <style lang="scss" scoped>
.detail {
  width: 100%;
  height: 11.55rem;
  position: relative;
  background-color: rgb(17, 17, 17);
  .img_01 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    opacity: v-bind(opacity);
    transition: opacity 2s ease;
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
      width: 14rem;
      font-size: 0.52rem;
      font-weight: 600;
      line-height: 0.6rem;
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
      display: none;
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    position: relative;
    background: skyblue;
    height: 5.46rem;
    z-index: 1;
    .img_01 {
      display: none;
    }
    .img_02 {
      display: block;
      height: 5.46rem;
      width: 100%;
      object-fit: cover;
      position: absolute;
      top: 0;
    }
    .detail_swiper {
      display: block;
    }
    .md-mask{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 1.94rem;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0D0D0D 100%);
    }
    .detail_title {
      transform: translateX(0%);
      position: absolute;
      left: 0.2rem;
      top: 3.86rem;
      padding-right: 0.2rem;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
        display: flex;
        text-align: left;
      }
      .title_03 {
        font-size: 0.2rem;
        line-height: 0.3rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
        display: flex;
        text-align: left;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        &.animate {
          transform: translateY(0rem);
          opacity: 1;
          transition-delay: 0.5s;
        }
      }
      .title_02 {
        display: none;
      }
    }
  }
}
</style>>
