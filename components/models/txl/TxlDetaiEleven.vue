<template>
  <div class="detail" ref="targetRef">
    <div class="md-mask"></div>
    <div class="detail_title" :class="{ active: isVisible }" scroll_bottom>
      <div class="title_01">Intelligent Driving</div>
      <div class="title_02">
        FIVE-STAR SAFETY AND HIGH-STRENGTH <br />
        BODY FOR WORRY-FREE TRAVEL
      </div>
    </div>
    <div class="unit_zoom_i scroll_top">
      <BaseImg class="zbi_1" src="models/txl/26.jpg" alt="" />
      <BaseImg class="zbi_2" src="models/h5/28.jpg" alt="" />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useScrollAnimation } from "~/utils/hooks/useScrollAnimation.js";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
// import { useRuntimeConfig } from "#imports";
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});
watch(isVisible, (newVal) => {
  const selectors = [".title_01", ".title_02"];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
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
  }
}
.unit_zoom_i img {
  transform: scale(0.9);
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
    // height: 11.66rem;
    background: #000;
    position: relative;
    padding: 0;
    .detail_swiper {
      display: none;
      height: 6.16rem;
      padding: 0.6rem 0.2rem;
      .swiper_slide {
        text-align: left;
        .swiper_img {
          height: 2.14rem;
          object-fit: cover;
          border-radius: 0.06rem;
          margin-bottom: 0.2rem;
          width: 100dvw;
        }
        .swiper_title01 {
          font-size: 0.2rem;
          font-weight: 500;
          line-height: 0.24rem;
          color: #ffffff;
          margin-top: 0.2rem;
          margin-bottom: 0.12rem;
        }
        .swiper_title02 {
          font-size: 0.14rem;
          font-weight: normal;
          line-height: 0.2rem;
          color: #b2b2b2;
          margin-bottom: 0.6rem;
        }
      }
    }
    .md-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 1.94rem;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0d0d0d 100%);
    }
    .detail_title {
      height: auto;
      position: absolute;
      z-index: 9;
      text-align: left;
      bottom: 0.4rem;
      left: 0;
      padding: 0 0.2rem;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.3rem;
        color: #ffffff;
        text-align: left;
        br {
          display: none;
        }
      }
    }
  }
  .zbi_1 {
    display: none;
  }
  .zbi_2 {
    display: block;
    height: 5.46rem;
    object-fit: cover;
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.01rem;
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
  .unit_zoom_i {
    position: static;
  }
  .unit_zoom_i img {
    transform: scale(1);
    width: 100vw;
  }
}
</style>
