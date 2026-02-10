<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef">
    <BaseImg class="img" v-if="!Dialog" src="models/lx/10.jpg" alt="" />
    <BaseImg class="img_01" src="models/h5/35.jpg" alt="" />
    <div class="detail_title" v-show="!Dialog" :class="{ active: isVisible }">
      <div class="title_01">Comfort Cabin</div>
      <div class="title_02">
        ENJOY EXCLUSIVE FULL UPGRADE,<br />
        COCKPIT,ABANDON CHEAP FEELIMG,<br />SENIOR SPACE
      </div>
      <div class="title_05">
        ENJOY EXCLUSIVE FULL UPGRADE<br />
        COCKPIT,ABANDON CHEAP FEELIMG, SENIOR SPACE
      </div>
      <div
        class="ust_min ust_4 ust_click more_neishi"
        data-index="0"
        @click="showDialog"
      >
        <div class="ust_btn">
          <BaseImg class="zbi_1" src="models/vx/14.png" alt="" />
        </div>
        <div class="ust_t">EXPLORE MORE</div>
      </div>
    </div>
    <div class="detail_dialog" v-if="Dialog">
      <div class="close_dialog" @click="closeDialog">X</div>
      <div class="detail_logo">
        <div class="hpol_1">2</div>
        <div class="hpol_2"></div>
        <div class="hpol_3">
          <div>INTERIOR</div>
        </div>
      </div>
      <!-- pc轮播图进度条 -->
      <div class="detail_saiper">
        <Swiper
          :modules="modules"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :slides-per-view="slidesPerView"
          :direction="'horizontal'"
          :mousewheel="true"
          class="swiper_content"
        >
          <SwiperSlide class="SwiperSlide">
            <div class="swiper_title">
              <div class="title_01">
                24.6 inch full curved LCD <br />
                dual screen
              </div>
              <div class="title_02">
                Integrated LCD dual screen, true curved screen, curvature up to
                3000, industry leading, resolution 1920*720 HD screen, fully
                surround immersive visual experience, centered around the driver
                display, unique in the same class, the largest.
              </div>
            </div>
            <BaseImg src="models/lx/36.jpg" alt="" @click="openModal(image)" />
          </SwiperSlide>
          <SwiperSlide class="SwiperSlide">
            <div class="swiper_title">
              <div class="title_01">
                New integrated sports <br />
                seats
              </div>
              <div class="title_02">
                Integrated sports seat, including electric massage function,
                instant heating function, seat memory function, to provide you
                with a more comfortable driving experience
              </div>
            </div>
            <BaseImg src="models/lx/37.jpg" alt="" @click="openModal(image)" />
          </SwiperSlide>
          <SwiperSlide class="SwiperSlide">
            <div class="swiper_title">
              <div class="title_01">SONY Audio</div>
              <div class="title_02">
                9 sound Settings bring a great music experience in the carriage.
              </div>
            </div>
            <BaseImg src="models/lx/38.jpg" alt="" @click="openModal(image)" />
          </SwiperSlide>
        </Swiper>
        <div class="custom-scrollbar">
          <div class="progress" :style="{ height: progress + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script setup>
import { ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { Mousewheel } from "swiper/modules";

const Dialog = ref(false);
const modules = [Mousewheel];
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});
// 进度条宽度
const progress = ref(0);
// Swiper 实例
const swiperInstance = ref(null);

// 动态计算 slidesPerView
const slidesPerView = ref(1); // 默认显示 1 张图片
// Swiper 初始化回调
const onSwiper = (swiper) => {
  swiperInstance.value = swiper; // 保存 Swiper 实例
  updateProgress(swiper); // 初始化进度条
};

// 幻灯片切换回调
const onSlideChange = () => {
  if (swiperInstance.value) {
    updateProgress(swiperInstance.value); // 更新进度条
  }
};

// 更新进度条宽度
const updateProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  progress.value = (currentIndex / totalSlides) * 100;
};

//弹框内容
const showDialog = () => {
  Dialog.value = true;
};
const closeDialog = () => {
  Dialog.value = false;
};
const ANIMATED_SELECTORS = [
  ".title_01",
  ".img",
  ".title_02",
  ".title_05",
  ".ust_min",
];

watch(isVisible, (newVal) => {
  ANIMATED_SELECTORS.forEach((selector) => {
    const element = targetRef.value?.querySelector(selector);
    element?.classList[newVal ? "add" : "remove"]("animate");
  });
});
</script>
  <style scoped lang='scss'>
.detail {
  width: 100%;
  height:100vh;
  position: relative;
  overflow: hidden;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.3);
    transition: all 2.5s;
    &.animate {
      transform: scale(1);
    }
  }
  .img_01 {
    display: none;
  }
  .detail_title {
    position: absolute;
    right: 1.2rem;
    bottom: 1.2rem;
    text-align: right;
    .title_01 {
      font-size: clamp(0.16rem, 3vw, 0.2rem);
      font-weight: 300;
      line-height: 0.48rem;
      color: #e3bea4;
      margin-bottom: 0.14rem;
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
      font-weight: 500;
      line-height: 0.6rem;
      color: #ffffff;
      margin-bottom: 0.12rem;
      transform: translateY(1rem);
      opacity: 0;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition: all 1s;
        transition-delay: 0.5s;
      }
    }
  }
}
.zdt_btn_ns {
  justify-content: flex-end;
}
.zdt_btn_nstt {
  justify-content: flex-start;
}
.zdt_btn img {
  width: 0.2rem;
}
.zdt_btn {
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  position: relative;
  margin-top: 0.2rem;
  cursor: pointer;
  font-weight: 300;
  color: #939393;
  margin-bottom: 0.14rem;
  position: absolute;
  right: 0;
}
.ust_min {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.2rem;
  font-weight: 250;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  margin-left: 4.8rem;
  transform: translateY(1rem);
  opacity: 0;
  &.animate {
    transform: translateY(0rem);
    opacity: 1;
    transition: all 1s;
    transition-delay: 0.8s;
  }
}
.ust_min :hover {
  cursor: pointer;
}
.ust_4:hover .ust_btn {
  background-color: rgba(255, 255, 255, 0.2);
}
.ust_btn {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  position: relative;
  z-index: 2;
  margin-right: 0.18rem;
  img {
    width: 0.15rem;
    height: 0.15rem;
    object-fit: cover;
  }
}
.detail_dialog {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  background-color: #000;
  transition: all 1s;
  .close_dialog {
    width: 0.4rem;
    height: 0.4rem;
    border: 0.01rem solid #fff;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.2rem;
    color: #fff;
    opacity: 0.5;
    transition: all 0.4s;
    position: absolute;
    top: 45%;
    left: 2%;
    z-index: 21;
  }
}
.custom-scrollbar {
  position: absolute;
  left: 0.6rem;
  bottom: 1rem;
  width: 4px;
  height: 30%;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}
.progress {
  width: 100%;
  background: #c78e66;
  transition: width 0.3s ease;
}
.close_dialog:hover {
  opacity: 1;
  transform: scale(1.2);
  cursor: pointer;
}
.SwiperSlide {
  display: flex;
  align-items: center;
  padding-left: 2rem;
  padding-top: 1.5rem;
  .swiper_title {
    margin-right: 1rem;
    .title_01 {
      font-size: 0.37rem;
      line-height: 0.5rem;
      color: #fff;
      margin-top: 0.2rem;
      min-height: 0.8rem;
    }
    .title_02 {
      font-size: 0.25rem;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 0.2rem;
      height: 2.6rem;
      line-height: 0.35rem;
      letter-spacing: 0;
      font-weight: 300;
    }
  }
  img {
    width: 50%;
    object-fit: cover;
  }
}
.detail_logo {
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  padding-left: 2rem;
  padding-top: 1rem;
  .hpol_2 {
    width: 1.5rem;
    height: 1px;
    background: rgba(255, 255, 255, 0.26);
    margin: 0 0.2rem;
  }
}
.h5_swiper {
  display: none;
}
.title_05 {
  display: none;
}
@media screen and (max-width: 1024px) {
  .ust_min {
    display: none;
   }
  .detail {
    width: 100vw;
    height: 5.4rem;
    position: relative;
    .img {
      display: none;
    }
    .img_01 {
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: cover;
    }
    .detail_title {
      position: absolute;
      left: 0.2rem;
      width: 100%;
      padding-right: 0.2rem;
      bottom: 0.4rem;
      text-align: left;
      .title_01 {
        font-size: 0.14rem;
        font-weight: normal;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        display: none;
      }
      .title_05 {
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.3rem;
        color: #ffffff;
        display: block;
        transform: translateY(1rem);
        opacity: 0;
        &.animate {
          transform: translateY(0rem);
          opacity: 1;
          transition: all 1s;
          transition-delay: 0.5s;
        }
      }
      .title_03 {
        display: none;
      }
      .title_04 {
        display: none;
      }
      .zdt_btn {
        display: none;
      }
    }
  }
}
</style>
