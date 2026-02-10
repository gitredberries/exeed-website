<template>
  <div class="detail" ref="targetRef">
    <div :class="[isImgActive && 'active']" ref="imgWrapperRef">
      <BaseImg class="img_01" src="models/lx/14.jpg" alt="" />
      <BaseImg class="img_02" src="models/H5/37.jpg" alt="" />
    </div>

    <div :class="['detail_title', isTitleActive && 'active']" ref="titleRef">
      <div class="title_01">Safety Protection</div>
      <div class="title_02">
        FIVE-STAR SAFETY AND HIGH-STRENGTH<br>BODY FOR WORRY-FREE TRAVEL
      </div>
    </div>
  </div>
</template>
<script setup>
import { calcSrollDis } from "@/utils/common";

const targetRef = ref();
const imgWrapperRef = ref();
const titleRef = ref();

const isImgActive = ref(false);
const isTitleActive = ref(false);

calcSrollDis(targetRef, [
  {
    dom: imgWrapperRef,
    percent: 1.2,
    active: isImgActive,
  },
  {
    dom: titleRef,
    percent: 0.2,
    active: isTitleActive,
  },
]);
</script>
<style lang="scss" scoped>
.detail {
  width: 100%;
  position: relative;
  background-color: rgb(17, 17, 17);
  .img_01 {
    width: 100%;
    height: 100%;
    opacity: 1;
    object-fit: cover;
    opacity: v-bind(opacity);
    transition: opacity 0.5s;
  }
  .img_02 {
    display: none;
  }
  .active {
    .img_01 {
      opacity: 0.5;
    }
  }
  .detail_swiper {
    display: none;
  }
  .detail_title {
    width: 100%;
    position: absolute;
    top: 1.6rem;
    left: 0;
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
      transition-delay: 0.2s;
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
      transition-delay: 0.4s;
    }
  }
  .detail_title.active {
    .title_01 {
      transform: translateY(0rem);
      opacity: 1;
    }
    .title_02 {
      transform: translateY(0rem);
      opacity: 1;
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
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
      position: absolute;
      left: 0.2rem;
      bottom: 0.4rem;
      top: auto;
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
        line-height: 0.28rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
        display: flex;
        text-align: left;
      }
    }
  }
  .swiper_img {
    border-radius: 0.06rem;
  }
}
</style>
>
