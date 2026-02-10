<template>
  <div class="space-wrapper md-space-wrapper" ref="spaceRef">
    <BaseImg
      :class="['space-bg', isBgActive ? 'active' : '']"
      src="model/et/pic06.png"
    />
    <BaseImg
      :class="['space-bg md-space-bg', isBgActive ? 'active' : '']"
      src="model/et/pic06-mb.png"
    />
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <p class="title">Interior Trims and Spaces</p>
      <p class="subtitle">RELAX AND ENJOY IN THE COMFORTABLE CABIN</p>
      <p class="desc">
        The peer-leading space design allows you to enjoy the comfort of a large
        living room-like space while driving and riding
      </p>
    </div>
    <div class="swiper-wrapper" ref="swiperRef">
      <Swiper
        class="swiper"
        :modules="[Scrollbar]"
        :slidesPerView="3"
        :slidesOffsetBefore="120"
        :spaceBetween="28"
        :speed="1000"
        :scrollbar="{
          el: '.swiper-scrollbar',
        }"
      >
        <SwiperSlide v-for="item in interiorList" :key="item.title">
          <EtIntelCard
            :src="item.src"
            :title="item.title"
            :desc="item.desc"
            :isAllActive="isSwiperActive"
          />
        </SwiperSlide>
        <div class="swiper-scrollbar"></div>
      </Swiper>
    </div>
    <div class="space-swiper md-space-swiper">
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
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { calcSrollDis } from "@/utils/common/index";

const isBgActive = ref(false);
const spaceRef = ref();
const detailRef = ref();
const swiperRef = ref();

const isDetailActive = ref(false);
const isSwiperActive = ref(false);

const interiorList = reactive([
  {
    src: "pic05-1.jpg",
    mdSrc: "pic05-1-mb.jpg",
    title: "Grade 5A healthy cabin",
    desc: "It is made of high-standard environmentally friendly materials like fibrilia composites, organosilicon, environmentally friendly bio-nylon, Eco green TPO skin, and real wood, and is carefully crafted using environmentally friendly processes to eliminate cabin pollution from the source and ensure the health of every journey.",
  },
  {
    src: "pic05-2.jpg",
    mdSrc: "pic05-2-mb.jpg",
    title: "Super-large space",
    desc: "Super-large space provides super comfort. The 3.45 m³ of effective cabin space is the largest in its class, as is the 2,181 mm of space in the second row of seats, the 1,540 mm of front-row shoulder room and 1,503 mm of rear shoulder room. This makes every intimate moment a happy one.",
  },
  {
    src: "pic05-3.jpg",
    mdSrc: "pic05-3-mb.jpg",
    title: "23-speaker audio system",
    desc: "All models in the series come standard with 23 speakers, including 5 subwoofers and 2 driver headrest speakers, which are unique in their class. With a peak power of 2,880 W, it can simulate the effects of different scenarios such as concert halls, cinemas, and opera houses, bringing a masterful audio experience.",
  },
  {
    src: "pic05-4.jpg",
    mdSrc: "pic05-4-mb.jpg",
    title: "Zero-pressure passenger seat",
    desc: "All models in the series come standard with a zero-pressure passenger seat. The seat is upholstered in luxurious microfiber leather and features 12-way electric adjustment, a 120° true zero-pressure reclining backrest angle, and an 105° zero-pressure leg rest angle. It can be easily reclined with one touch, and is equipped with massage, heating, and ventilation functions to relax every muscle.",
  },
]);

const mdSwiperList = interiorList.map((v) => {
  return {
    image: `model/et/${v.mdSrc}`,
    title: v.title,
    description: v.desc,
  };
});

calcSrollDis(spaceRef, [
  {
    dom: detailRef,
    percent: 0.5,
    active: isDetailActive,
  }, {
    dom: spaceRef,
    percent: 0.5,
    active: isBgActive,
  }, {
    dom: swiperRef,
    percent: 0.2,
    active: isSwiperActive,
  }
]);
</script>
<style lang="scss" scoped>
@import url(./css/space.scss);
.space-wrapper {
  position: relative;
  background-color: #6a7e88;
  .swiper-wrapper {
    width: 100%;
    margin-top: -2.5rem;
    padding-top: 1rem;
    height: fit-content;
    background: linear-gradient(
      to bottom,
      rgba(168, 178, 185, 0) 0%,
      rgba(168, 178, 185, 1) 30%,
      rgba(168, 178, 185, 1) 50%,
      rgba(134, 148, 157, 1) 100%
    );
    .swiper {
      padding-bottom: 1rem;
      .swiper-scrollbar {
        position: absolute;
        left: 1.2rem;
        bottom: 0.5rem;
        width: calc(100% - 2.4rem);
        height: 2px;
        background-color: rgba(225, 225, 225, 0.3);
        :deep(.swiper-scrollbar-drag) {
          background-color: #3aaeb0;
        }
      }
    }
  }

  .space-bg {
    width: 100%;
    opacity: 0.3;
    transition: all 1s;
  }
  .md-space-bg {
    display: none;
  }

  .space-bg.active {
    opacity: 1;
  }

  .detail {
    position: absolute;
    top: 1.2rem;
    left: 0;
    width: 100%;
    text-align: center;
    color: white;

    p {
      transition: all 1s;
      opacity: 0;
      transform: translateY(1rem);
    }

    .title {
      font-size: 0.2rem;
      line-height: 0.28rem;
      text-transform: none;
    }

    .subtitle {
      margin-top: 0.24rem;
      font-size: 0.52rem;
      line-height: 0.6rem;
      transition-delay: 0.2s;
    }
    .desc {
      font-size: 0.16rem;
      line-height: 0.24rem;
      color: #ffffff;
      margin-top: 0.12rem;
    }
  }

  .detail.active {
    p {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .space-swiper {
    padding: 0.6rem 0.2rem 0.5rem;
    display: none;
  }
}
</style>
