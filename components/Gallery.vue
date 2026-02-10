<template>
  <div
    class="gallery-wrapper md-gallery-wrapper"
    ref="galleryRef"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :style="{'--gallery-bg': props.bgColor, '--scroll-bg': props.scrollBg, '--scroll-drag-bg': props.scrollDragBg }"
  >
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <div class="detail-left">
        <div class="gallery-title">{{ title }}</div>
        <div class="gallery-subtitle">{{ subtitle }}</div>
      </div>
    </div>
    <div class="gallery-swiper">
      <Swiper
        style="padding-bottom: 1rem"
        :modules="[Pagination]"
        :slidesPerView="2.5"
        :spaceBetween="20"
        :slidesOffsetBefore="120"
        :speed="1000"
        :pagination="{
          el: '.swiper-pagination',
          type: 'progressbar'
        }"
        @touch-move="onTouchMove"
      >
        <SwiperSlide v-for="item in swiperList" :key="item">
          <BaseImg @click="onSwiperClick" class="swiper-bg" :src="item" />
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
    <div class="gallery-swiper md-gallery-swiper">
      <Swiper
        style="padding-bottom: 0.5rem"
        :modules="[Pagination]"
        :slidesPerView="1.2"
        :spaceBetween="10"
        :slidesOffsetBefore="20"
        :speed="1000"
        :pagination="{
          el: '.swiper-pagination',
          type: 'progressbar'
        }"
      >
        <SwiperSlide v-for="item in swiperList" :key="item">
          <BaseImg @click="onSwiperClick" class="swiper-bg" :src="item" />
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
    <ModelSwiper
      style="cursor: auto"
      :bgColor="props.bgColor"
      :showModal="showModal"
      :swiperList="swiperList"
      @closeModal="closeModal"
    />
    <MouseDrag ref="mouseDragRef" />
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { calcSrollDis } from "@/utils/common/index";

const showModal = ref(false);

const detailRef = ref();
const galleryRef = ref();
const mouseDragRef = ref();

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  swiperList: {
    type: Array,
    default: () => []
  },
  bgColor: {
    type: String,
    default: 'black'
  },
  scrollBg: {
    type: String,
    default: '#808080'
  },
  scrollDragBg: {
    type: String,
    default: '#e3bea4'
  }
})

const swiperList = computed(() => props.swiperList);
const title = computed(() => props.title);
const subtitle = computed(() => props.subtitle);

const isDetailActive = ref(true);

const closeModal = () => {
  showModal.value = false;
};

const onSwiperClick = () => {
  showModal.value = true;
};

const onMouseEnter = () => {
  mouseDragRef.value?.onMouseEnter();
};

const onMouseLeave = () => {
  mouseDragRef.value?.onMouseLeave(); 
}

const onTouchMove = (swiper, event) => {
  mouseDragRef.value?.onTouchMove(swiper, event); 
}

calcSrollDis(galleryRef, [
  {
    dom: detailRef,
    percent: 0.3,
    active: isDetailActive,
  },
]);
</script>
<style lang="scss" scoped>
@import url(./css/gallery.scss);
.gallery-wrapper {
  width: 100%;
  background-color: var(--gallery-bg);
  overflow: hidden;
  cursor: none;
  padding: 1.2rem 0;
  .detail {
    margin: 0 1.2rem;
    display: flex;
    justify-content: space-between;
    .detail-left {
      .gallery-title {
        font-size: 0.2rem;
        line-height: 0.28rem;
        color: white;
        transition: all 1s;
        transform: translateY(1rem);
        opacity: 0;
      }
      .gallery-subtitle {
        font-size: 0.52rem;
        line-height: 0.6rem;
        color: white;
        margin-top: 0.24rem;
        transition: all 1s;
        transition-delay: 0.2s;
        transform: translateY(1rem);
        opacity: 0;
      }
    }
    .detail-right {
      font-size: 0.5rem;
      line-height: 0.7rem;
      color: white;
      transition: all 1s;
      transition-delay: 0.2s;
      transform: translateY(1rem);
      opacity: 0;
    }
  }
  .detail.active {
    .detail-left {
      .gallery-title {
        transform: translateY(0);
        opacity: 1;
      }
      .gallery-subtitle {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .detail-right {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .gallery-swiper {
    margin-top: 0.4rem;
    position: relative;
    .swiper-pagination{
      bottom: 0;
      top: auto;
      margin: 0 1.2rem;
      background-color: var(--scroll-bg);
      width: calc(100% - 2.4rem);
      height: 0.02rem;
      :deep(.swiper-pagination-progressbar-fill){
        background-color: var(--scroll-drag-bg);
      }
    }
    .swiper-bg {
      width: 45vw;
      height: 55vh;
      object-fit: cover;
    }
    .swiper-scrollbar {
      position: absolute;
      bottom: 0.2rem;
      width: 90%;
      left: 5%;
      height: 2px;
      background-color: var(--scroll-bg);
      :deep(.swiper-scrollbar-drag) {
        background-color: var(--scroll-drag-bg);
      }
    }
  }
  .md-gallery-swiper {
    display: none;
  }
}
</style>
