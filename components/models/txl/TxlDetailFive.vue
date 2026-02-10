<template>
  <div class="detail" ref="targetRef">
    <!-- H5 端 -->
    <div class="detail_swiper">
      <MdProgressSwiper :content-data="hotspotData" />
    </div>
    <div class="detail_title" :class="{ active: isVisible }" scroll_bottom>
      <div class="title_01">Effortless Handling</div>
      <div class="title_02">
        GIVES YOU PLENTY OF <br />CONFIDENCE WITH EVERY DRIVE
      </div>
    </div>
    <div class="unit_zoom_i scroll_top">
      <BaseImg class="zbi_1" src="models/txl/13.jpg" alt="" />
      <BaseImg class="zbi_2" src="models/h5/25.jpg" alt="" />
    </div>
  </div>
</template>
  <script setup>
import { ref, watch } from "vue";
import { useScrollAnimation } from "~/utils/hooks/useScrollAnimation.js";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { Pagination, Scrollbar } from "swiper/modules";
//h5轮播图数据
const hotspotData = [
  {
    title:
      "The design concept is<br/>driver-centered, with class and <br/> control in the details.",
    description:
      "Focusing on providing drivers with a comfortable and safe driving experience, it creates a sense of classic design that is simple and uncomplicated through smooth lines and a layered layout.",
    image: "models/h5/22.jpg",
  },
  {
    title: "New 24.6-inch super view curved <br/> duplex screen",
    description:
      "Elegant screen design, built-in Qualcomm Snapdragon 8155 platform, intelligent voice interaction, so you can enjoy more convenience and smooth experience",
    image: "models/h5/23.jpg",
  },
  {
    title: "Simpler and more atmospheric <br/> center console layout",
    description:
      "The convenience of the pocket gear design, the premium feel of the brushed metal center panel, and the comfort and luxury of the leather center console combine to form a driving space filled with classic aesthetic design.",
    image: "models/h5/24.jpg",
  },
];
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value.querySelector(".title_01").classList.add("animate");
    targetRef.value.querySelector(".title_02").classList.add("animate");
  } else {
    targetRef.value.querySelector(".title_01").classList.remove("animate");
    targetRef.value.querySelector(".title_02").classList.remove("animate");
  }
});
useScrollAnimation();
// Swiper 模块,进度条宽度
const modules = [Pagination, Scrollbar];
const slidesPerView = ref(1);
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
const updateProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  progress.value = (currentIndex / totalSlides) * 100;
};
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
      font-size: 0.48rem;
      font-weight: 600;
      line-height: 0.48rem;
      text-align: center;
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
  }
}
.unit_zoom_i img {
  transform: scale(0.8);
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
    height: auto;
    background: #000;
    position: relative;
    padding: 0;
    .detail_swiper {
      display: block;
      height: 5.56rem;
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
          margin: 0.2rem 0 0.12rem;
        }
        .swiper_title02 {
          font-size: 0.14rem;
          font-weight: normal;
          line-height: 0.2rem;
          color: #b2b2b2;
          margin-bottom: 1.16rem;
        }
      }
    }
    .detail_title {
      height: 5.46rem;
      position: absolute;
      left: 0.2rem;
      top: 7.1rem;
      z-index: 9;
      text-align: left;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.02rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.3rem;
        color: #ffffff;
        text-align: left;
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
