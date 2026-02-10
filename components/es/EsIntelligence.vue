<template>
  <div class="intelligence-wrapper md-intelligence-wrapper" ref="intelRef">
    <BaseImg
      :class="['intelligence-bg', isBgActive ? 'active' : '']"
      src="model/es/pic_0808_03.jpg"
    />
    <BaseImg
      :class="['intelligence-bg md-intelligence-bg', isBgActive ? 'active' : '']"
      src="model/es/pic_0808_03_mb.png"
    />
    
    <div :class="['intelligence-detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <div class="detail-title">Intelligence</div>
      <div class="detail-subtitle">INNOVATIVE INTELLIGRNCE AND CALMNESS</div>
      <div class="detail-desc">
        LEVEL 2+ INTELLIGENT DRIVING ASSISTANCE FUNCTION
      </div>
    </div>
    <div class="swiper-wrapper" ref="swiperRef">
      <Swiper class="intel-swiper" :slidesPerView="2" :spaceBetween="20" :speed="1000" :watchOverflow="false">
        <SwiperSlide v-for="item in swiperList" :key="item.title">
          <EsIntelCard :src="item.src" :title="item.title" :desc="item.desc" :isAllActive="isCardActive" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="md-intelligence-swiper">
      <MdProgressSwiper
        :contentData="mdSwiperList"
        mdSubtitleColor="#fff"
        mdScrollbarColor="rgba(255, 255, 255, 0.2)"
        mdScrollbarFillColor="#26B7BC"
      />
    </div>
  </div>
</template>
<script setup>
import { calcSrollDis } from "@/utils/common/index";
import { Swiper, SwiperSlide } from "swiper/vue";

const swiperRef = ref();
const detailRef = ref();
const intelRef = ref();
const isDetailActive = ref(false);
const isCardActive = ref(false);
const isBgActive = ref(false);

const swiperList = reactive([
  {
    src: "zn_01.jpg",
    title: "Memory Parking Assistant",
    desc: "Transform the parking experience with memory route learning technology that directs drivers to nearby available spaces. Seamless automatic parking and advanced obstacle avoidance ensure safety. With RPA (Remote Parking Assistance), parking is effortless, and exit directions are easy to choose.",
  },
  {
    src: "zn_02.jpg",
    title: "IOV",
    desc: "Stay warm with one-touch heating, charge smarter with scheduled charging, locate your car effortlessly, and enjoy the perfect climate with the A/C timer.",
  },
]);

const mdSwiperList = swiperList.map((v) => {
  return {
    image: `model/es/${v.src}`,
    title: v.title,
    description: v.desc,
  };
});

calcSrollDis(intelRef, [
  {
    dom: intelRef,
    percent: 0.4,
    active: isBgActive,
  },
  {
    dom: detailRef,
    percent: 0.5,
    active: isDetailActive,
  },
  {
    dom: swiperRef,
    percent: 0.2,
    active: isCardActive,
  },
]);
</script>
<style lang="scss" scoped>
@import url(./css/intelligence.scss);
.intelligence-wrapper {
  width: 100%;
  position: relative;
  background-color: rgb(106, 126, 136);
  .intelligence-bg {
    width: 100%;
    opacity: 0.3;
  }
  .md-intelligence-bg{
    display: none;
  }
  .intelligence-bg.active {
    transition: all 1s;
    opacity: 1;
  }
  .intelligence-detail {
    position: absolute;
    top: 1rem;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;
    div {
      opacity: 0;
      transform: translateY(1rem);
      transition: all 1s;
    }
    .detail-title {
      color: #e5e5e5;
      font-size: 0.2rem;
      line-height: 0.28rem;
    }
    .detail-subtitle {
      font-size: 0.52rem;
      line-height: 0.6rem;
      margin-top: 0.24rem;
      transition-delay: 0.2s;
    }
    .detail-desc {
      font-size: 0.2rem;
      line-height: 0.24rem;
      margin-top: 0.12rem;
      transition-delay: 0.4s;
      font-weight: 300;
    }
  }
  .intelligence-detail.active {
    div {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .swiper-wrapper {
    width: 100%;
    box-sizing: border-box;
    margin-top: -3rem;
    background: linear-gradient(
      to bottom,
      rgba(168, 178, 185, 0) 0%,
      rgba(168, 178, 185, 1) 25%,
      rgba(168, 178, 185, 1) 50%,
      rgba(168, 178, 185, 1) 100%
    );
    .intel-swiper{
      padding: 0.8rem 1.9rem 1rem 1.9rem;
    }
  }
  .md-intelligence-swiper{
    margin-top: 0.6rem;
    padding: 0 0.2rem 0.6rem;
    display: none;
  }
}
</style>
