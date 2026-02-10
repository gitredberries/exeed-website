<template>
  <div>
    <!-- PC 端 -->
    <div class="detail" ref="targetRef" :class="{ active: isVisible }">
      <BaseImg
        class="img_01"
        src="models/rx/58.jpg"
        alt=""
        :style="{ opacity: opacity }"
      />
      <BaseImg class="img_02" src="models/h5/48.jpg" alt="" />
      <div class="md-mask"></div>
      <div class="detail_title">
        <div class="title_01">Safety Protection</div>
        <div class="title_02">
          HIGH STANDARD, <br />
          HIGH PERFORMANCE SECURITY
        </div>
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
// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value.querySelector(".title_01").classList.add("animate");
    targetRef.value.querySelector(".title_02").classList.add("animate");
    // targetRef.value.querySelector(".title_03").classList.add("animate");
  } else {
    targetRef.value.querySelector(".title_01").classList.remove("animate");
    targetRef.value.querySelector(".title_02").classList.remove("animate");
    // targetRef.value.querySelector(".title_03").classList.remove("animate");
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
  height:100vh;
  position: relative;
  background-color: rgb(17, 17, 17);
  .img_01 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: v-bind(opacity);
    transition: opacity 2s ease;
  }
  .img_02 {
    display: none;
  }
  .detail_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1.6rem;
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
      }
    }
    .title_02 {
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      color: #ffffff;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.2s;
      display: block;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    height: 5.6rem;
    position: relative;
    .img_01 {
      display: none;
    }
    .img_02 {
      display: block;
      width: 100%;
      height: 5.6rem;
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
    }
    .md-mask{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 1.66rem;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0D0D0D 100%);
    }
    .detail_title {
      position: absolute;
      left: 0.2rem;
      top: 4.14rem;
      text-align: left;
      transform: translateX(0);
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
      }
    }
  }
}
</style>>
