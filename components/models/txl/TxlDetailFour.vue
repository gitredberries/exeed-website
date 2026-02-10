<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef">
    <BaseImg class="img" v-if="!Dialog" src="models/txl/12.jpg" alt="" />
    <BaseImg class="img_01" src="models/h5/21.jpg" alt="" />
    <div class="md-mask"></div>
    <div class="detail_title" v-show="!Dialog" :class="{ active: isVisible }">
      <div class="title_01">Design Aesthetics</div>
      <div class="title_02">THE INTERIOR OF THE NEW TXL</div>
      <div class="title_03">
        The interior design is fully upgraded,and the wrap-around cockpit is
        more classic and upscale.
      </div>
      <div></div>
      <div class="ust_min" @click="showDialog">
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
                The design concept is <br />
                driver-centered, <br />
                with class and <br />
                control in the details.
              </div>
              <div class="title_02">
                Focusing on providing drivers with a comfortable and safe
                driving experience, it creates a sense of classic design that is
                simple and uncomplicated through smooth lines and a layered
                layout.
              </div>
            </div>
            <BaseImg src="models/txl/48.jpg" alt="" @click="openModal(image)" />
          </SwiperSlide>
          <SwiperSlide class="SwiperSlide">
            <div class="swiper_title">
              <div class="title_01">
                Dual 50W <br />
                wireless charger
              </div>
              <div class="title_02">
                Enjoy more space and convenience with our new column shift
                lever, solid wood accents, dual 50W wireless chargers, and a
                three-layer storage compartment.
              </div>
            </div>
            <BaseImg src="models/txl/49.jpg" alt="" @click="openModal(image)" />
          </SwiperSlide>
          <SwiperSlide class="SwiperSlide">
            <div class="swiper_title">
              <div class="title_01">
                Dual-spoke flat-bottom<br />
                steering wheel
              </div>
              <div class="title_02">
                The dual-spoke flat-bottom technological steering wheel is
                covered with a full range of leather. As it is developed based
                on ergonomics, it boasts a more delicate feel and more
                comfortable grip. The two-tone leather wrapping design, paired
                with personalized decorative parts, gives the dual-spoke
                flat-bottom steering wheel a strong sense of technology.
              </div>
            </div>
            <BaseImg src="models/txl/50.jpg" alt="" @click="openModal(image)" />
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
  const totalSlides = swiper.slides.length; // 获取总幻灯片数量
  const currentIndex = swiper.realIndex + 1; // 使用 realIndex 获取当前幻灯片索引（从 1 开始）
  progress.value = (currentIndex / totalSlides) * 100; // 计算进度百分比
};

//弹框内容
const showDialog = () => {
  Dialog.value = true;
};
const closeDialog = () => {
  Dialog.value = false;
};
// 定义需要添加动画的类名常量
const ANIMATED_ELEMENTS = [
  ".title_01",
  ".img",
  ".title_02",
  ".title_03",
  ".ust_min",
];
watch(isVisible, (newVal) => {
  ANIMATED_ELEMENTS.forEach((selector) => {
    const element = targetRef.value.querySelector(selector);
    if (element) {
      element.classList[newVal ? "add" : "remove"]("animate");
    }
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
    right: 1rem;
    bottom: 0.8rem;
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
      font-size: 0.24rem;
      font-weight: 300;
      line-height: 0.32rem;
      margin-bottom: 0.13rem;
      color: #ffffff;
      transform: translateY(1rem);
      opacity: 0;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition: all 1s;
        transition-delay: 0.8s;
      }
    }
  }
}
.ust_min {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.2rem;
  font-weight: 250;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  transform: translateY(1rem);
  opacity: 0;
  &.animate {
    transform: translateY(0rem);
    opacity: 1;
    transition: all 1s;
    transition-delay: 1.3s;
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
@media screen and (max-width: 1024px) {
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
    }
    .md-mask{
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      height: 1.86rem;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0D0D0D 100%);
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
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.3rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
      }
      .title_03 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #ffffff;
      }
      .zdt_btn {
        font-size: 0.12rem;
        font-weight: 300;
        line-height: 0.16rem;
        color: #e5e5e5;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0.01rem;
        .zbi_1,
        .zbi_2 {
          width: 0.13rem;
          height: 0.13rem;
          object-fit: cover;
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
    width: 0.13rem;
  }
  .zdt_b_icon {
    display: flex;
    justify-content: center;
    width: 0.4rem;
    position: relative;
    overflow: hidden;
    height: 0.14rem;
  }
  .ust_min {
    display: none;
  }
}
</style>
