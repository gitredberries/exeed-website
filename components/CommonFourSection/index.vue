<template>
  <!-- 第四屏 -->
  <section class="four-section" ref="commonRef">
    <div :class="['four-title', isTitleEnter ? 'active' : '']" ref="titleRef">
      {{ props.title }}
    </div>
    <div
      :class="['swiper-outer', isSwiperEnter ? 'active' : '']"
      ref="swiperRef"
    >
      <Swiper
        class="swiper-inner"
        :slidesOffsetBefore="120"
        :modules="[Pagination]"
        :slidesPerView="3.5"
        :spaceBetween="20"
        :speed="1000"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide v-for="item in list">
          <div class="swiper-content-wrapper">
            <Video
              v-if="!item.isImg"
              :showControls="false"
              :videoKey="item.videoKey"
            />
            <BaseImg v-else :src="item.imgKey" />
            <div class="swiper-slide-content">
              {{ item.title }}
            </div>
          </div>
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>

    <div class="md-intelligence-swiper">
      <Swiper
        class="swiper-inner"
        :modules="[Pagination]"
        :speed="1000"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide v-for="item in list">
          <div class="swiper-content-wrapper">
            <Video
              v-if="!item.isImg"
              :showControls="false"
              :videoKey="item.videoKey"
            />
            <BaseImg v-else :src="item.imgKey" />
            <div class="swiper-slide-content">
              {{ item.title }}
            </div>
          </div>
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import Video from "@/components/models/Video.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { calcSrollDis } from "@/utils/common";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const titleRef = ref();
const commonRef = ref();
const swiperRef = ref();

const isSwiperEnter = ref(false);
const isTitleEnter = ref(false);

calcSrollDis(commonRef, [
  {
    dom: titleRef,
    percent: 0.1,
    active: isTitleEnter,
  },
  {
    dom: swiperRef,
    percent: 0.2,
    active: isSwiperEnter,
  },
]);

const list = reactive([
  { title: "Creeping over 35% slope", videoKey: "awd6" },
  { title: "Creeping over steamed bun shaped road", videoKey: "awd7" },
  { title: "Climbing over sharp steep slope with ease", videoKey: "awd8" },
  { title: "Climb on mountain roads", videoKey: "awd9" },
  //以下都是错的
  { title: "Cross-axis Road", videoKey: "awd14" },
  { title: "V-shaped Ditch", videoKey: "awd13" },
  { title: "Snow field", videoKey: "awd10" },
  {
    title: "Single-wheel Extrication",
    imgKey: "explorationImage/64.png",
    isImg: true,
  },
]);
</script>
<style lang="scss" scoped>
//第四屏
.four-section {
  padding-top: 1.6rem;
  height: 8.17rem !important;
  .swiper-pagination {
    :deep(.swiper-pagination-bullet) {
      width: 0.08rem;
      height: 0.08rem;
      opacity: 1;
      background-color: #808080;
      transition: all 0.5s;
    }
    :deep(.swiper-pagination-bullet-active) {
      background-color: #fff;
      width: 0.2rem;
      border-radius: 0.04rem;
    }
  }
  .md-intelligence-swiper {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    padding-top: 0.8rem;
    height: 5.45rem !important;
    .swiper-pagination {
      position: absolute;
      bottom: 0;
      :deep(.swiper-pagination-bullet) {
        width: 0.06rem;
        height: 0.06rem;
      }
      :deep(.swiper-pagination-bullet-active) {
        width: 0.15rem;
        border-radius: 0.04rem;
      }
    }
    .md-intelligence-swiper {
      display: block;
      .swiper-inner {
        position: relative;
        padding-bottom: 0.3rem;
        .swiper-content-wrapper {
          img {
            aspect-ratio: 1.36;
          }
          :deep(video) {
            aspect-ratio: 1.36;
          }
          .swiper-slide-content{
            font-size: 0.14rem;
            line-height: 0.21rem;
            color: #808080;
            margin-top: 0.12rem;
          }
        }
      }
    }
    .swiper-outer {
      display: none;
    }
  }

  .four-title {
    font-family: Saira;
    font-size: 40px;
    font-weight: normal;
    line-height: 48px;
    text-align: center;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #ffffff;
    margin-bottom: 0.6rem;
    opacity: 0;
    transition: all 0.5s;
    transform: translateY(1rem);
    @media screen and (max-width: 768px) {
      font-size: 0.26rem;
      line-height: 0.3rem;
      margin: 0 0.2rem 0.4rem 0.2rem;
      text-align: center;
      letter-spacing: normal;
      white-space: normal;
      opacity: 1;
    }
  }
  .four-title.active {
    opacity: 1;
    transform: translateY(0);
  }
  .swiper-outer {
    opacity: 0;
    transition: all 0.5s;
    transform: translateY(1rem);
    .swiper-inner {
      padding-bottom: 0.5rem;
      .swiper-content-wrapper {
        border-radius: 0.04rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1.79;
        }
        :deep(video) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1.79;
        }
      }
    }
  }
  .swiper-outer.active {
    opacity: 1;
    transform: translateY(0);
  }
  .swiper-slide-content {
    font-size: 0.18rem;
    line-height: 0.26rem;
    color: #b2b2b2;
    margin-top: 0.2rem;
  }
  .md-intelligence-swiper {
    margin-top: 0rem;
    padding: 0 0.2rem 0.6rem;
    // display: none;
  }
}
</style>
