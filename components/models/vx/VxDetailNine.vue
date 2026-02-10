<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef" :class="{ active: isVisible }">
    <div class="detail_title">
      <div class="title_01">Intelligent Driving</div>
      <div class="title_02">
        L2+INTELLIGENT DRIVER <br />
        ASSISTANCE WITH <br />
        POWERFUL COMPUTING
      </div>
      <div class="title_03">
        Equipped with 4 radars, 8 ultrasonic radars, 4 sensors, 1 front camera,
        <br />
        and 4 surround-view cameras for zero blind spots.
      </div>
    </div>
    <div class="detail_img">
      <BaseImg class="img" src="models/vx/70.jpg" alt="" />
      <BaseImg class="img_01" src="models/h5/07.jpg" alt="" />
    </div>
    <!-- 视频以及弹窗 -->
    <div class="detail_video">
      <Video :showControls="true" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import Video from "@/components/models/Video.vue";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

// 监听 isVisible 的变化，触发动画
const ANIMATED_CLASSES = [
  ".img",
  ".title_01",
  ".title_02",
  ".title_03",
  ".detail_img",
];

watch(isVisible, (newVal) => {
  ANIMATED_CLASSES.forEach((selector) => {
    const element = targetRef.value?.querySelector(selector);
    element?.classList[newVal ? "add" : "remove"]("animate");
  });
});
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  background: #131313;
  position: relative;
  height: 13.62rem;
  .detail_title {
    padding-top: 1.4rem;
    text-align: center;
    .title_01 {
      font-size: 0.18rem;
      font-weight: 300;
      line-height: 0.48rem;
      color: #e3bea4;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      margin-bottom: 0.06rem;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
    .title_02 {
      font-size: 0.44rem;
      font-weight: 600;
      line-height: 0.48rem;
      color: #ffffff;
      margin-bottom: 0.06rem;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.2s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
    .title_03 {
      font-size: 0.18rem;
      font-weight: 300;
      line-height: 0.28rem;
      color: #e5e5e5;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.4s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
  }
  .detail_img {
    width: 14.26rem;
    height: 7.4rem;
    margin-top: 0.6rem;
    padding-left: 1rem;
    transform: translateY(1.5rem);
    opacity: 0;
    transition: all 1s;
    &.animate {
      transform: translateY(0rem);
      opacity: 1;
    }
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.3;
      transition: all 2s;
      &.animate {
        opacity: 1;
      }
    }
    .img_01 {
      display: none;
    }
  }
  .detail_video {
    position: absolute;
    right: 1rem;
    bottom: 0.5rem;
    width: 6.12rem;
    height: 4.3rem;
    border-radius: 0.06rem;
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    position: relative;
    height: auto;
    padding-bottom: 2.78rem;
    .detail_title {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      padding-top: 0.8rem;
      text-align: left;
      position: relative;
      z-index: 1;
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
        margin-bottom: 0.08rem;
      }
      .title_03 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #ffffff;
      }
    }
    .detail_img {
      height: 100%;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      margin-top: 0;
      z-index: 0;
      .img {
        display: none;
        margin: 0;
      }
      .img_01 {
        display: block;
        width: 100%;
        height: 5.46rem;
        object-fit: cover;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .detail_video {
      display: none;
    }
  }
}
</style>
