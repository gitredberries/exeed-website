<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef" :class="{ active: isVisible }">
    <BaseImg class="img_01" src="models/vx/44.jpg" alt="" />
    <BaseImg class="img_02" src="models/h5/09.jpg" alt="" />
    <div class="mask"></div>
    <div class="detail_title">
      <div class="title_01">Safety Protection</div>
      <div class="title_02">
        FIVE-STAR SAFETY AND HIGH-STRENGTH<br />
        BODY FOR WORRY-FREE TRAVEL
      </div>
      <div class="title_03">
        FIVE-STAR SAFETY AND <br />
        HIGH-STRENGTH<br />
        BODY FOR WORRY-FREE TRAVEL
      </div>
    </div>
  </div>
</template>
<script setup>
import { watch } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.1,
});

// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  const selectors = [".title_01", ".title_02", ".title_03"];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
});
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  height:100vh;
  position: relative;
  .img_01 {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
      font-size: 0.44rem;
      font-weight: 600;
      line-height: 0.48rem;
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
    .title_03 {
      display: none;
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    height: 5.4rem;
    position: relative;
    .mask{
      width: 100%;
      height: 1.94rem;
      position: absolute;
      left: 0;
      bottom: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0D0D0D 100%);
    }
    .img_01 {
      display: none;
    }
    .img_02 {
      display: block;
      width: 100%;
      height: 5.4rem;
      position: absolute;
      left: 0;
      top: 0;
      object-fit: cover;
    }
    .detail_title {
      position: absolute;
      left: 0.2rem;
      top: auto;
      bottom: 0.4rem;
      text-align: left;
      transform: translateX(0%);
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        display: none;
      }
      .title_03 {
        display: block;
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.28rem;
        color: #ffffff;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.2s;
        &.animate {
          transform: translateY(0rem);
          opacity: 1;
        }
      }
    }
  }
}
</style>>
