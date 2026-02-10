<template>
  <!-- PC 端 -->
  <div>
    <div class="pc_detail">
      <div class="title_01">EXEED IN YOUR COUNTRY</div>
      <div class="title_02">
        Learn more about EXEED models products and services
      </div>
      <div class="title_spin">
        <div>EXEED in your country</div>
      </div>
    </div>
    <div
      class="h5_detail"
      @mouseleave="handleMouseLeave"
      @mouseenter="handleMouseEnter"
    >
      <div class="h5_swiper">
        <div class="detail_title">
          <div class="title_01">Color</div>
          <div class="title_02">THE NEW VX MORE PICTURES</div>
        </div>
        <Swiper
          :modules="modules"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
          :slides-per-view="1.5"
          :loop="true"
          :space-between="20"
          class="swiper_content"
          style="pointer-events: auto"
          @touch-move="onTouchMove"
        >
          <SwiperSlide
            class="swiper_slide"
            v-for="(item, index) in images"
            :key="index"
          >
            <img
              class="swiper_img"
              :src="item"
              alt=""
              @click="openModal(image)"
            />
          </SwiperSlide>
        </Swiper>
        <!-- 自定义进度条 -->
        <div class="custom-scrollbar">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
      </div>
      <!-- 模态框 -->
      <div v-if="isModalOpen" class="modal">
        <div class="modal-content">
          <div class="close_modal" @click="closeModal">X</div>
          <Swiper
            :modules="[Pagination, Scrollbar]"
            @swiper="onModalSwiper"
            @slideChange="onModalSlideChange"
            :slides-per-view="1"
            :loop="true"
            class="modal-swiper"
          >
            <SwiperSlide
              class="modal-swiperSlide"
              v-for="(image, index) in modalImages"
              :key="index"
            >
              <img :src="image" alt="" />
            </SwiperSlide>
          </Swiper>
          <!-- 自定义进度条,左右箭头 -->
          <div class="modal-progress">
            <div class="custom-scrollbar_01">
              <div
                class="progress"
                :style="{ width: modalProgress + '%' }"
              ></div>
            </div>
            <div class="swiper-button">
              <div class="swiper-prev" @click="slidePrev"><</div>
              <div class="swiper-next" @click="slideNext">></div>
            </div>
          </div>
        </div>
      </div>
      <div class="h5_title">
        <div class="title_01">EXEED IN YOUR COUNTRY</div>
        <div class="title_02">
          Learn more about EXEED models products and <br />services
        </div>
        <div class="title_spin">
          <div>EXEED in your country</div>
        </div>
      </div>
    </div>
    <MouseDrag ref="mouseDragRef" />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import image1 from "@/assets/models/71.jpg";
import image2 from "@/assets/models/72.jpg";
import image3 from "@/assets/models/73.jpg";
import image4 from "@/assets/models/74.jpg";
import image5 from "@/assets/models/75.jpg";
import image6 from "@/assets/models/76.jpg";
import image7 from "@/assets/models/77.jpg";
import image8 from "@/assets/models/78.jpg";
import image9 from "@/assets/models/79.jpg";
import image10 from "@/assets/models/80.jpg";
// 图片列表
const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];
//图片详情页
const images_01 = [image1, image3];
const images_02 = [image1, image2, image3];
const images_03 = [image2, image3];
const images_04 = [image1, image2, image3];
const images_05 = [image2, image3];
const images_06 = [image1, image2, image3];
const images_07 = [image1, image2, image3];
const images_08 = [image1, image2, image3];
const images_09 = [image1, image2, image3];
const images_10 = [image1, image2, image3];
// Swiper 模块,进度条宽度
const modules = [Pagination, Scrollbar];
// const slidesPerView = ref(1);
const progress = ref(0);
const swiperInstance = ref(null);
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  updateProgress(swiper);
};
const onSlideChange = () => {
  if (swiperInstance.value) {
    updateProgress(swiperInstance.value);
  }
};

const mouseDragRef = ref(null);

const updateProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  progress.value = (currentIndex / totalSlides) * 100;
};

const handleMouseLeave = () => {
  mouseDragRef.value?.onMouseLeave(); 
};

const handleMouseEnter = () => {
  mouseDragRef.value?.onMouseEnter();
}

const onTouchMove = (swiper, event) => {
  mouseDragRef.value?.onTouchMove(swiper, event); 
}

// 模态框中显示的图片列表
const modalImages = ref([]);

// 模态框状态
const isModalOpen = ref(false);
// 打开模态框
const openModal = (image) => {
  const index = images.indexOf(image);
  currentImageIndex.value = index;
  isModalOpen.value = true;
  switch (image) {
    case image1:
      modalImages.value = images_01;
      break;
    case image2:
      modalImages.value = images_02;
      break;
    case image3:
      modalImages.value = images_03;
      break;
    case image4:
      modalImages.value = images_04;
      break;
    case image5:
      modalImages.value = images_05;
      break;
    case image6:
      modalImages.value = images_06;
      break;
    case image7:
      modalImages.value = images_07;
      break;
    case image8:
      modalImages.value = images_08;
      break;
    case image9:
      modalImages.value = images_09;
      break;
    case image10:
      modalImages.value = images_10;
      break;
    default:
      modalImages.value = images;
  }
};
// 关闭模态框
const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.cursor = "auto";
  modalSwiperInstance.value = null;
  modalImages.value = [];
  currentImageIndex.value = 0;
};

// 模态框中的 Swiper 实例
const modalSwiperInstance = ref(null);

// 模态框进度条宽度
const modalProgress = ref(0);

// 当前图片索引
const currentImageIndex = ref(0);

// 模态框 Swiper 初始化回调
const onModalSwiper = (swiper) => {
  modalSwiperInstance.value = swiper;
  swiper.slideTo(currentImageIndex.value);
  updateModalProgress(swiper);
};

// 模态框幻灯片切换回调
const onModalSlideChange = () => {
  if (modalSwiperInstance.value) {
    updateModalProgress(modalSwiperInstance.value);
  }
};

// 更新模态框进度条宽度
const updateModalProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  modalProgress.value = (currentIndex / totalSlides) * 100;
};
// 上一张图片,下一张图片
const slidePrev = () => {
  if (modalSwiperInstance.value) {
    modalSwiperInstance.value.slidePrev();
  }
};
const slideNext = () => {
  if (modalSwiperInstance.value) {
    modalSwiperInstance.value.slideNext();
  }
};
</script>
<style lang="scss" scoped>
.pc_detail {
  width: 100%;
  height: 5.18rem;
  background: #edeef0;
  padding-top: 1.58rem;
  text-align: center;
  .title_01 {
    font-family: Saira;
    font-size: 0.52rem;
    font-weight: 500;
    line-height: 0.6rem;
    letter-spacing: 0px;
    font-variation-settings: "opsz" auto;
    color: #333333;
    margin-bottom: 0.18rem;
  }
  .title_02 {
    font-family: Saira;
    font-size: 0.18rem;
    font-weight: 300;
    line-height: 0.28rem;
    letter-spacing: 0px;
    font-variation-settings: "opsz" auto;
    color: #333333;
    margin-bottom: 0.74rem;
  }
  .title_spin {
    width: 3.82rem;
    height: 0.78rem;
    line-height: 0.78rem;
    text-align: center;
    font-size: 0.18rem;
    color: #ffffff;
    background: #333333;
    border-bottom: 0.05rem solid #c78e66;
    transition: all 1s;
    z-index: 1;
    transition: all 1s;
    transition-delay: 1s;
    opacity: 1;
    div {
      z-index: 1;
    }
  }
}
.h5_detail {
  display: none;
}
@media screen and (max-width: 1024px) {
  .h5_detail {
    display: block;
    .h5_swiper {
      height: 4.64rem;
      width: 100%;
      background: #000000;
      padding-left: 0.2rem;
      .detail_title {
        padding-top: 0.8rem;
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
          margin-bottom: 0.4rem;
        }
      }
    }
  }
  .pc_detail {
    display: none;
  }
  .custom-scrollbar {
    width: 95%;
    height: 0.02rem;
    background-color: #e0e0e0;
    border-radius: 5px;
    margin-bottom: 0.06rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
    border-radius: 5px;
  }
  .swiper_slide {
    width: 2rem;
    height: 2rem;
    border-radius: 0.04rem;
    margin-bottom: 0.24rem;
    img {
      object-fit: cover;
    }
  }
  .drag {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(30px);
    pointer-events: none;
    cursor: none;
    .drag-text {
      margin: 0 0.1rem;
    }
  }
  /* 模态框样式 */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    padding-top: 0.6rem;

    .modal-content {
      padding: 0 0.5rem;
      width: 100%;
      // // height: 8rem;
      // width: 3rem;
      // height: 3rem;
      // background: skyblue;
      position: relative;
      // display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .close_modal {
        position: absolute;
        z-index: 99;
        top: -0.7rem;
        right: 0.4rem;
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 100%;
        color: rgb(215, 190, 142);
        border: 2px solid rgb(215, 190, 142);
        background-color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        font-size: 0.2rem;
      }
    }
  }
  .modal-progress {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: -0.7rem;
  }
  .custom-scrollbar_01 {
    width: 100%;
    height: 0.02rem;
    background: rgba(255, 255, 255, 0.2);
    margin-top: 10px;
    position: relative;
    margin-top: 0.01rem;
  }
  .progress {
    height: 100%;
    background: #c78e66;
    transition: width 0.3s ease;
  }
  .swiper-button {
    display: flex;
    margin-left: 0.11rem !important;
  }
  .swiper-prev,
  .swiper-next {
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 100%;
    background-color: rgb(215, 190, 142);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 1s;
    font-size: 0.12rem;
    margin-right: 0.1rem;
  }
  .swiper-button-next:hover {
    transform: scale(1.1);
  }
  .swiper-button-prev:hover {
    transform: scale(1.1);
  }
  .h5_title {
    height: 2.46rem;
    background: #ffffff;
    width: 100%;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-top: 0.46rem;
    text-align: center;
    .title_01 {
      font-size: 0.24rem;
      font-weight: 500;
      line-height: 0.32rem;
      color: #1a1a1a;
      margin-bottom: 0.1rem;
    }
    .title_02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #1a1a1a;
      margin-bottom: 0.32rem;
    }
    .title_spin {
      width: 1.95rem;
      height: 0.4rem;
      font-size: 0.14rem;
      color: #ffffff;
      line-height: 0.4rem;
      text-align: center;
      background: #1a1a1a;
      border-radius: 0.04rem;
    }
  }
}
</style>