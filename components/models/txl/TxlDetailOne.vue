
<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef">
    <div class="banner_shade" :class="{ active: isVisible }"></div>
    <BaseImg class="img_01" src="models/txl/01.jpg" alt="" />
    <BaseImg class="img_02" src="models/h5/19.png" alt="" />
    <div class="detail_content">
      <div class="detail_title">
        <div class="title_01">
          Drive With Joy <br />Explore Classic Urban Living
        </div>
        <div class="title_03">
          Drive With Joy Explore <br />
          Classic Urban Living
        </div>
        <div class="title_02">THE NEW TXL</div>
      </div>
    </div>
    <div class="title_Jump">
      <PonoraMic sign="txl"/>
    </div>
  </div>
</template>

<script setup>
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import BaseImg from "~/components/BaseImg.vue";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  const selectors = [
    ".img_01",
    ".title_01",
    ".title_02",
    ".title_03",
    ".title_Jump",
  ];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
});
</script>
<style scoped lang='scss'>
@import url(../css/main.scss);
.detail {
  height: 100vh;
  // height: calc(100vh - 0.72rem);
  width: 100%;
  position: relative;
  transition: top 0.3s ease;
  padding-left: 0.8rem;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 10%,
    rgba(5, 8, 18, 0.69) 60%,
    rgba(8, 12, 27, 0.85) 91%
  );
  .img_01 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform 2s;
    transition-delay: 0.3s;
    position: absolute;
    // position: fixed;
    // z-index: -1;
    left: 0;
    top: 0;
  }
  .img_02 {
    display: none;
  }
  .detail img.animate {
    transform: scale(1.2);
  }
  .detail_content {
    position: absolute;
    bottom: 0.6rem;
    // position: fixed;
    .detail_title {
      color: #ffffff;
      .title_01 {
        font-size: 0.52rem;
        font-weight: 500;
        margin-bottom: 0.18rem;
        line-height: 0.6rem;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.6s;
        &.animate {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .title_02 {
        font-size: 0.24rem;
        line-height: 0.32rem;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.8s;
        &.animate {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
}
.title_03 {
  display: none;
}
@media screen and (max-width: 1024px) {
  .detail {
    height: 100vh;
    width: 100%;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    position: relative;
    .img_01 {
      display: none;
    }
    .img_02 {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1);
      transition: transform 2s;
      transition-delay: 0.3s;
      position: absolute;
      left: 0;
      top: 0;
    }
    .detail_content {
      position: absolute;
      bottom: 1.32rem;
      .detail_title {
        color: #ffffff;
        .title_03 {
          display: block;
          font-size: 0.26rem;
          line-height: 0.3rem;
          margin-bottom: 0.12rem;
          transform: translateY(1rem);
          opacity: 0;
          transition: all 1s;
          transition-delay: 0.8s;
          &.animate {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .title_01 {
          display: none;
        }
        .title_02 {
          font-size: 0.14rem;
          line-height: 0.2rem;
        }
      }
    }
    .title_Jump {
      position: absolute;
      bottom: 0.6rem;
      left: 0.2rem;
      right: 0.2rem;
    }
  }
}
</style>
