<template>
  <div class="card-swiper-wrapper">
    <h1>{{ props.title }}</h1>
    <div class="card-swiper">
      <Swiper
        class="card-swiper-inner"
        :modules="[Pagination]"
        :slidesPerView="2.5"
        :slidesOffsetBefore="120"
        :spaceBetween="28"
        :loop="false"
        :speed="1000"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide v-for="(item, index) in list" :key="item">
          <div
            class="swiper-bg-wrapper"
            @mouseenter="item.showPlay = true"
            @mouseleave="item.showPlay = false"
          >
            <img class="swiper-bg" :src="item.image" />
            <div class="mask"></div>
            <div class="title">{{ item.title }}</div>
            <Play :isShow="item.showPlay" @on-play-click="onPlayClick(index)" />
          </div>
        </SwiperSlide>
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
    <div class="card-swiper md-card-swiper">
      <Swiper
        class="card-swiper-inner"
        :modules="[EffectFade, Pagination]"
        effect="fade"
        :loop="false"
        :speed="1000"
        :fadeEffect="{
          crossFade: true,
        }"
        :pagination="{
          el: '.md-swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide v-for="(item, index) in list" :key="item">
          <div class="swiper-bg-wrapper">
            <div style="position: relative">
              <img class="swiper-bg" :src="item.imageMobile || item.image" />
              <Play :isShow="true" @on-play-click="onPlayClick(index)" />
            </div>
            <div class="mask"></div>
            <div class="title">{{ item.title }}</div>
          </div>
        </SwiperSlide>
        <div class="md-swiper-pagination"></div>
      </Swiper>
    </div>
    <FullscreenPlayer
      :isShow="showFullscreenPlayer"
      :video-list="list"
      :activeIndex="activeIndex"
      @close="showFullscreenPlayer = false"
    />
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Pagination } from "swiper/modules";

const props = defineProps({
  videoList: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: "",
  }
});

const list = ref([]);

const showFullscreenPlayer = ref(false);

const activeIndex = ref(0);

watch(
  () => props.videoList,
  (newVal) => {
    list.value = newVal.map((item) => {
      return {
        ...item,
        showPlay: false,
      };
    });
  }
);

const onPlayClick = (index) => {
  showFullscreenPlayer.value = true;
  activeIndex.value = index;
};
</script>

<style lang="scss" scoped>
.card-swiper-wrapper {
  height: 100vh;
  min-height: 10.8rem;
  background-color: black;
  overflow: hidden;
  .card-swiper {
    display: block;
  }
  .md-card-swiper {
    display: none;
  }
  h1 {
    font-size: 0.46rem;
    line-height: 0.54rem;
    text-align: center;
    margin: 1.6rem auto 0.8rem auto;
    color: white;
  }
  .swiper-bg-wrapper {
    position: relative;
    .swiper-bg {
      width: 100%;
      aspect-ratio: 1.31;
      object-fit: cover;
      cursor: pointer;
    }
    .mask {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 1.82rem;
      background: linear-gradient(0, #000000 0%, rgba(0, 0, 0, 0) 102%);
    }
    .title {
      position: absolute;
      bottom: 0;
      transform: translateY(-0.48rem);
      padding: 0 0.48rem;
      white-space: wrap;
      font-size: 0.24rem;
      line-height: 0.32rem;
      color: white;
    }
  }

  .card-swiper-inner {
    padding-bottom: 0.6rem;
    .swiper-pagination {
      bottom: 0rem;
      :deep(.swiper-pagination-bullet) {
        width: 0.08rem;
        height: 0.08rem;
        background-color: #808080;
        opacity: 1;
        transition: all 0.3s;
      }
      :deep(.swiper-pagination-bullet-active) {
        background-color: white;
        width: 0.2rem;
        border-radius: 0.2rem;
      }
    }
  }
}

@media screen and (max-width: 1040px) {
  .card-swiper-wrapper {
    height: fit-content;
    min-height: auto;
    padding-bottom: 0.24rem;
    h1 {
      margin: 0.8rem auto 0.2rem auto;
      font-size: 0.2rem;
      line-height: 0.28rem;
    }
    .card-swiper {
      display: none;
    }
    .md-card-swiper {
      display: block;
      padding: 0 0.2rem;
    }
    .swiper-bg-wrapper {
      .mask {
        display: none;
      }
      .swiper-bg {
        width: 100%;
        aspect-ratio: 1.63;
        object-fit: cover;
        position: static;
      }
      .title {
        position: static;
        text-align: center;
        margin-top: 0.12rem;
        font-size: 0.12rem;
        line-height: 0.2rem;
        transform: translateY(0);
      }
    }
    .card-swiper-inner {
      padding-bottom: 1.25rem;
      .md-swiper-pagination {
        text-align: center;
        bottom: 0;
        position: absolute;
        :deep(.swiper-pagination-bullet) {
          width: 0.06rem;
          height: 0.06rem;
          background-color: #808080;
          opacity: 1;
          transition: all 0.3s;
        }
        :deep(.swiper-pagination-bullet-active) {
          background-color: white;
          width: 0.15rem;
          border-radius: 0.15rem;
        }
      }
    }
  }
}
</style>
