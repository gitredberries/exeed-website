<template>
  <!-- PC 端 -->
  <div class="color-wrapper md-color-wrapper">
    <div class="intro">
      <div class="color-title">Color</div>
      <div class="color-subtitle btn">
        VIBRANT COLORS<br />BRING INSPIRATION
      </div>
      <div class="color-subtitle btn_01">
        VIBRANT COLORS BRING<br />
        INSPIRATION
      </div>
      <div class="color-video" @click="open_video">
        <div class="color-tent">
          Comprehensively upgrading exterior styling luxury, <br />the overall
          design gives more business flagship <br />tone (正文)
        </div>
        <div class="zdt_btn">
          <div>APPEARANCE VIDEO(交互)</div>
          <div class="zdt_b_icon">
            <BaseImg class="zbi_1" src="models/vx/12.png" alt="" />
            <BaseImg class="zbi_2" src="models/vx/12.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="rotate" @click="goToExternalLink">
      <BaseImg class="rotate-img" src="model/et/mb_360.png" />
    </div>
    <div class="color-content">
      <Swiper
        class="pc-swiper"
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
      <Swiper
        class="md-swiper"
        :modules="[EffectFade, Controller]"
        effect="fade"
        :loop="false"
        @swiper="onMdSwiper"
        @slideChange="onSlideChange"
        :controller="{ control: mdPageSwiper }"
      >
        <SwiperSlide v-for="item in swipList" :key="item.name">
          <BaseImg class="content-bg" :src="item.src" />
          <BaseImg class="content-bg md-content-bg" :src="item.mSrc" />
        </SwiperSlide>
      </Swiper>
      <div class="color-pagination md-color-pagination">
        <Swiper
          :modules="[EffectFade, Controller]"
          :loop="false"
          :centeredSlides="true"
          :spaceBetween="10"
          :slidesPerView="5"
          :slideToClickedSlide="true"
          style="padding-top: 0.5rem"
          :controller="{ control: mdSwiper }"
          @swiper="onMdPageSwiper"
        >
          <SwiperSlide v-for="(item, index) in swipList" :key="item.name">
            <div class="pagination-bullet">
              <div class="pagination-bg-wrapper">
                <BaseImg class="pagination-bg" :src="item.paginationSrc" />
              </div>
              <span class="pagination-name">{{ item.name }}</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="title_Jump">
      <PonoraMic sign="vx"/>
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
          :poster="isMobile ? `${videoImg}_mobile.webp` : `${videoImg}.webp`"
        >
          <source :src="videoUrl" type="video/mp4" />
        </video>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from "vue";
import { EffectFade, Controller } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { isMobileDevice } from '@/utils/common'

const swipList = reactive([
  {
    src: "models/vx/50.jpg",
    mSrc: "models/h5/10.jpg",
    paginationSrc: "models/vx/56.png",
    name: "New Khaki white",
    isActive: true,
  },
  {
    src: "models/vx/51.jpg",
    mSrc: "models/h5/11.jpg",
    paginationSrc: "models/vx/57.png",
    name: "Havana Grey",
    isActive: false,
  },
  {
    src: "models/vx/52.jpg",
    mSrc: "models/h5/12.jpg",
    paginationSrc: "models/vx/58.png",
    name: "Aero Silver",
    isActive: false,
  },
  {
    src: "models/vx/53.jpg",
    mSrc: "models/h5/13.jpg",
    paginationSrc: "models/vx/59.png",
    name: "New Carbon Black",
    isActive: false,
  },
  {
    src: "models/vx/54.jpg",
    mSrc: "models/h5/14.jpg",
    paginationSrc: "models/vx/60.png",
    name: "Arctic Green",
    isActive: false,
  },
  {
    src: "models/vx/55.jpg",
    mSrc: "models/h5/15.jpg",
    paginationSrc: "models/vx/61.png",
    name: "Venetian Blue",
    isActive: false,
  },
]);

let swiper = ref(null);
let mdPageSwiper = ref(null);
let mdSwiper = ref(null);
const onSwiper = (s) => {
  swiper.value = s;
};

let isSlide = true;

const onPaginationClick = (item, index) => {
  isSlide = false;
  swipList.forEach((v) => (v.isActive = false));
  item.isActive = true;
  swiper.value.slideTo(index);
};

const onMdPageSwiper = (s) => {
  mdPageSwiper.value = s;
};

const onMdSwiper = (s) => {
  mdSwiper.value = s;
};

const onSlideChange = (info) => {
  if (isSlide) {
    swipList.forEach((v) => (v.isActive = false));
    swipList[info.realIndex].isActive = true;
  } else {
    isSlide = true;
  }
};
const goToExternalLink = () => {
  window.open("http://106.14.155.0:20002/pika/ex.html", "_blank");
};
const videoDialog = ref(false);
const open_video = () => {
  videoDialog.value = true;
};
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
  videoUrl: "index/video/banner3_new.mp4",
  img: "index/banner3",
});
// 视频 URL 和封面图
const config = useRuntimeConfig();
const videoUrl = `${config.public.oosURL}platform/public/video/index-video/banner3_fullScreen.mp4`;
const videoImg = computed(
  () => `${config.public.staticURL}/images/${banner2Content.value.img}`
);

const isMobile = ref(false);
onMounted(() => {
  isMobile.value = isMobileDevice(); 
})
</script>
<style lang="scss" scoped>
.color-wrapper {
  width: 100%;
  height: 100vh;
  position: relative;
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
  .rotate {
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
    .md-swiper {
      display: none;
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
          opacity: 0;
        }
      }
      .pagination-bullet.active {
        .pagination-bg-wrapper {
          border: 1px solid rgb(0, 0, 0, 0.5);
        }
        .pagination-name {
          opacity: 1;
        }
      }
      .swiper-slide-active {
        .pagination-bullet {
          .pagination-bg-wrapper {
            border: 1px solid rgb(0, 0, 0, 0.5);
          }
          .pagination-name {
            opacity: 1;
          }
        }
      }
    }
    .md-color-pagination {
      display: none;
    }
  }
}
.btn {
  display: block;
}
.btn_01 {
  display: none;
}
.color-video {
  display: none;
}
.title_Jump {
  position: absolute;
  right: 0.8rem;
  bottom: 0.9rem;
  z-index: 1;
}
@media screen and (max-width: 1024px) {
  .color-video {
    display: block;
  }
  .title_Jump {
    display: none;
  }
  .color-wrapper.md-color-wrapper {
    .intro {
      top: 0.6rem;
      left: 0.2rem;
      .color-title {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #E3BEA4;
      }
      .color-subtitle {
        margin-top: 0.1rem;
        font-size: 0.2rem;
        line-height: 0.28rem;
      }
    }
    .rotate {
      display: block;
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: center;
      top: 2.94rem;
      z-index: 2;
      .rotate-img {
        width: 0.4rem;
      }
    }
    .color-content {
      .pc-swiper {
        display: none;
      }
      .md-swiper {
        display: block;
      }
      .content-bg {
        display: none;
      }
      .md-content-bg {
        display: block;
      }
      .color-pagination {
        bottom: 0.8rem;
        width: 100%;
        padding: 0 0.15rem;
        left: 0;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        display: none;
        .pagination-bullet {
          width: 0.35rem;
          height: 0.35rem;
          padding: 0;
          margin: 0 0.12rem;
          .pagination-bg-wrapper {
            width: 0.35rem;
            height: 0.35rem;
            .pagination-bg {
              width: 0.28rem;
            }
          }
          .pagination-name {
            font-size: 0.14rem;
            line-height: 0.22rem;
            margin-top: -0.7rem;
          }
        }
      }
      .md-color-pagination {
        display: block;
      }
    }
  }
}
.btn_01 {
  display: block;
}
.btn {
  display: none;
}
.color-tent {
  font-size: 0.14rem;
  line-height: 0.2rem;
  color: #ffffff;
  margin-bottom: 0.08rem;
}
.zdt_btn {
  font-size: 0.12rem;
  font-weight: 300;
  line-height: 0.16rem;
  color: #e5e5e5;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 1.8rem;
  margin-bottom: 0.4rem;
}
.zdt_btn {
  font-size: 0.12rem;
  font-weight: 300;
  line-height: 0.16rem;
  color: #e5e5e5;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  width: 2.2rem;
  margin-bottom: 0.4rem;
}
.zdt_btn_ns {
  justify-content: flex-end;
}
.zdt_btn_nstt {
  justify-content: flex-start;
}
.zdt_btn img {
  width: 0.13rem;
  height: 0.13rem;
  object-fit: cover;
}
.zdt_b_icon {
  display: flex;
  justify-content: center;
  width: 0.4rem;
  position: relative;
  overflow: hidden;
  height: 0.13rem;
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
.mf_btn_1 {
  position: absolute;
  left: 59%;
  top: 34%;
}
</style>
