<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef">
    <BaseImg class="img" v-if="!dialog" src="models/vx/13.jpg" alt="" />
    <BaseImg class="img_01" src="models/h5/03.jpg" alt="" />
    <div class="detail_title" v-show="!dialog" :class="{ active: isVisible }">
      <div class="title_01">Design Aesthetics</div>
      <div class="title_02">THE INTERIOR OF THE NEW VX</div>
      <div class="title_03">
        The interior design features a comprehensive premium upgrade, and the
      </div>
      <div class="title_04">
        overall design provides a horizontal visual experience.
      </div>
      <div class="unit_iv_all zdt_btn mf-ws" data-index="0" @click="open_video">
        <div>APPEARANCE VIDEO</div>
        <div class="zdt_b_icon">
          <BaseImg class="zbi_1" src="models/vx/12.png" alt="" />
          <BaseImg class="zbi_2" src="models/vx/12.png" alt="" />
        </div>
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
    <div class="detail_dialog" v-if="dialog">
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
                The design concept <br />
                combines of elegance <br />
                and power，in every detail
              </div>
              <div class="title_02">
                The design concept of full and round sides intersecting with
                sharp curves has been integrated into all decorative surfaces of
                the interior, highlighting the combination of elegance and power
                in every detail.
              </div>
            </div>
            <BaseImg src="models/vx/71.jpg" alt="" @click="openModal(image)" />
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
            <BaseImg src="models/vx/72.jpg" alt="" @click="openModal(image)" />
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
            <BaseImg src="models/vx/73.jpg" alt="" @click="openModal(image)" />
          </SwiperSlide>
        </Swiper>
        <!-- 自定义进度条 -->
        <div class="custom-scrollbar">
          <div class="progress" :style="{ height: progress + '%' }"></div>
        </div>
      </div>
    </div>
    <!-- 视频弹窗 -->
    <Dialog
      v-model="videoDialog"
    >
      <div
        class="w-full h-[94vh] lg:h-full flex justify-center items-center pt-[0.5rem]"
      >
        <video
          class="w-full lg:w-[96%] h-1/3 lg:h-[88vh] object-none"
          autoplay
          muted
          controls
          webkit-playsinline
          playsinline
        >
          <source :src="videoUrl" type="video/mp4" />
        </video>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { useRuntimeConfig } from "#imports";
import { Mousewheel } from "swiper/modules";

const dialog = ref(false);
const modules = [Mousewheel];
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});
// 图片列表
// const images = [image1, image2, image3];
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
  dialog.value = true;
};
const closeDialog = () => {
  dialog.value = false;
};
watch(isVisible, (newVal) => {
  const selectors = [
    ".img",
    ".img_01",
    ".title_01",
    ".title_02",
    ".title_03",
    ".title_04",
    ".zdt_btn",
    ".ust_min",
  ];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
});
// 视频数据
const banner2Content = ref({
  isTextWhite: false,
  title: "About us",
  subTitle:
    "In today's rapidly evolving era, the automotive industry is<br> undergoing unprecedented transformations.",
  titleClassName: "lg:!text-white px-[0.63rem] lg:px-[0]",
  // img: "index/banner3_1",
  h5ClassName:
    "lg:w-[10rem] lg:text-[0.2rem] lg:text-[#fff] line-height-normal banner2-space",
  fullArticleClass: "enlarge",
  type: "video",
  videoUrl: "index/video/vx_detail4.mp4",
});

const videoDialog = ref(false);
const open_video = () => {
  videoDialog.value = true;
};
// 视频 URL 和封面图
const config = useRuntimeConfig();
const videoUrl = `${config.public.oosURL}platform/public/video/index-video/vx_detail4.mp4`;

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
      font-family: Saira;
      font-size: 0.24rem;
      font-weight: 300;
      line-height: 0.32rem;
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
    .title_04 {
      font-family: Saira;
      font-size: 0.24rem;
      font-weight: 300;
      line-height: 0.32rem;
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
    .zdt_btn {
      font-size: 0.24rem;
      font-weight: 250;
      line-height: 0.32rem;
      color: #ffffff;
      display: flex;
      align-items: center;
      transform: translateY(1rem);
      opacity: 0;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
        transition: all 1s;
        transition-delay: 1.1s;
      }
      .zbi_1,
      .zbi_2 {
        width: 0.2rem;
        height: 0.2rem;
        transition: all 1s;
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
.zdt_b_icon {
  display: flex;
  justify-content: center;
  width: 0.4rem;
  position: relative;
  overflow: hidden;
  height: 0.2rem;
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
.zbi_1 {
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  transition: left 1s, opacity 0.6s;
  opacity: 1;
}
.zbi_2 {
  position: absolute;
  left: -120%;
  transition: left 1s, opacity 0.6s;
  opacity: 0;
  transform: translateX(-50%);
}
.zdt_btn:after {
  content: "";
  width: 0%;
  height: 1px;
  background-color: #fff;
  bottom: -0.1rem;
  position: absolute;
  transition: all 1.2s;
  right: 0;
}
.zdt_btn:hover:after {
  width: 100%;
}
.zdt_btn:hover .zbi_1 {
  left: 120%;
  opacity: 0;
}
.zdt_btn:hover .zbi_2 {
  left: 50%;
  opacity: 1;
}
.ust_min {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.2rem;
  font-weight: 250;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  margin-top: 0.7rem;
  margin-left: 4.8rem;
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
  .ust_min{
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
        font-weight: normal;
        line-height: 0.2rem;
        color: #ffffff;
      }
      .title_04 {
        font-family: Saira;
        font-size: 0.14rem;
        font-weight: 300;
        line-height: 0.2rem;
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
      .zdt_btn {
        font-size: 0.12rem;
        font-weight: 300;
        line-height: 0.16rem;
        color: #e5e5e5;
        display: flex;
        align-items: center;
        position: static;
        left: 0.01rem;
        margin-top: 0.08rem;
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
  // .h5_swiper{
  //   display: block;
  //   height: 6.3rem;
  //   width: 100%;
  //   background: #333333;
  // }
}
</style>
