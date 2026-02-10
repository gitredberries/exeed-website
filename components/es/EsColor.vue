<template>
  <div class="color-wrapper md-color-wrapper">
    <div class="intro">
      <div class="color-title">Color</div>
      <div class="color-subtitle">VIBRANT COLORS<br />BRING INSPIRATION</div>
    </div>
    <div class="rotate">
      <BaseImg class="rotate-img" src="model/et/mb_360.png"/>
    </div>
    <div class="color-content">
      <Swiper
        :modules="[EffectFade]"
        effect="fade"
        :loop="false"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="item in swipList" :key="item.name">
          <BaseImg class="content-bg" :src="item.src" />
          <BaseImg class="content-bg md-content-bg" :src="item.mSrc" />
        </SwiperSlide>
      </Swiper>
      <div class="color-pagination">
        <div
          :class="['pagination-bullet', item.isActive ? 'active' : '']"
          v-for="(item, index) in swipList"
          :key="item"
          @click="onPaginationClick(item, index)"
        >
          <div class="pagination-bg-wrapper">
            <BaseImg class="pagination-bg" :src="item.paginationSrc" />
          </div>
          <span
            class="pagination-name"
            :style="{ opacity: item.isActive ? '1' : '0' }"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const swipList = reactive([{
  src: 'model/es/car-yin.jpg',
  mSrc: 'model/es/car-yin-m.jpg',
  paginationSrc: 'model/es/color-yin.png',
  name: 'Iridium Silver',
  isActive: true
}, {
  src: 'model/es/car-hei.jpg',
  mSrc: 'model/es/car-hei-m.jpg',
  paginationSrc: 'model/es/color-hei.png',
  name: 'Frosted Black',
  isActive: false
}, {
  src: 'model/es/car-bai.jpg',
  mSrc: 'model/es/car-bai-m.jpg',
  paginationSrc: 'model/es/color-bai.png',
  name: 'Khaki White',
  isActive: false
}, {
  src: 'model/es/car-lv.jpg',
  mSrc: 'model/es/car-lv-m.jpg',
  paginationSrc: 'model/es/color-lv.png',
  name: 'Pine Green',
  isActive: false
}])

let swiper = null;
const onSwiper = (s) => {
  swiper = s;
};

let isSlide = true;

const onPaginationClick = (item, index) => {
  isSlide = false;
  swipList.forEach((v) => (v.isActive = false));
  item.isActive = true;
  swiper.slideTo(index);
};

const onSlideChange = (info) => {
  if (isSlide) {
    swipList.forEach((v) => (v.isActive = false));
    swipList[info.realIndex].isActive = true;
  } else {
    isSlide = true;
  }
}
</script>
<style lang="scss" scoped>
@import url(./css/color.scss);
.color-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .intro {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    z-index: 2;
    color: white;
    .color-title {
      font-size: 0.2rem;
      line-height: 0.28rem;
    }
    .color-subtitle {
      font-size: 0.5rem;
      line-height: 0.6rem;
      margin-top: 0.1rem;
    }
  }
  .rotate{
    display: none;
  }
  .color-content {
    position: relative;
    width: 100%;
    overflow: hidden;
    .content-bg {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
    .md-content-bg {
      display: none;
    }
    .color-pagination {
      position: absolute;
      left: 1.2rem;
      bottom: 0.5rem;
      z-index: 2;
      width: fit-content;
      height: fit-content;
      display: flex;
      align-items: center;
      .pagination-bullet {
        position: relative;
        margin-right: 0.3rem;
        transition: all 0.5s;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        width: 0.48rem;
        .pagination-bg-wrapper {
          width: 0.48rem;
          height: 0.48rem;
          border-radius: 50%;
          border: 1px solid rgb(0, 0, 0, 0);
          display: flex;
          justify-content: center;
          align-items: center;
          .pagination-bg {
            width: 0.4rem;
          }
        }

        .pagination-name {
          font-size: 0.16rem;
          line-height: 0.24rem;
          color: white;
          white-space: nowrap;
          transition: all 0.5s;
          margin-top: 0.1rem;
        }
      }
      .pagination-bullet.active {
        .pagination-bg-wrapper {
          border: 1px solid rgb(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>
