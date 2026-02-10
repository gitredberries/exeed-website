<template>
  <div class="space-wrapper md-space-wrapper" ref="spaceRef">
    <BaseImg
      :class="['space-bg', isBgActive ? 'active' : '']"
      src="model/et/pic04.png"
    />
    <BaseImg
      :class="['space-bg md-space-bg', isBgActive ? 'active' : '']"
      src="model/et/pic04-mb.png"
    />
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <p class="title">Safety Protection</p>
      <p class="desc">
        TOTAL PROTECTION SAFETY ALL THE WAY
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
import { calcSrollDis } from "@/utils/common/index";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";

const isBgActive = ref(false);
const spaceRef = ref();
const detailRef = ref();
const swiperRef = ref();

const isDetailActive = ref(false);
const isSwiperActive = ref(false);

const interiorList = reactive([
  {
    src: "pic03-1.jpg",
    mdSrc: "pic03-1-mb.jpg",
    title: "Caged capsule 2.0",
    desc: "The body is made of steel-aluminum alloy castings with an application ratio of up to 88%, which is highly functional and far ahead of the competition. Thanks to integrated die-casting technology, the vehicle weight is reduced by 30% while the rigidity of the whole vehicle is elevated.",
  },
  {
    src: "pic03-2.jpg",
    mdSrc: "pic03-2-mb.jpg",
    title: "Extra-deep fording height",
    desc: "The excellent airtightness of vehicle, together with an IP68 waterproof standard battery, achieves the deepest fording height of 700±50mm in its class, ensuring safe journeys whether in heavy rain or when going light off-road outdoors.",
  },
  {
    src: "pic03-3.jpg",
    mdSrc: "pic03-3-mb.jpg",
    title: "Battery safety",
    desc: "The battery has undergone 35 safety tests, exceeding industry standards. With the battery advantages of high safety cell, super waterproof, super collision resistance, and extreme fire prevention, the electric safety of the vehicle is guaranteed.",
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
  },
  {
    dom: spaceRef,
    percent: 0.45,
    active: isBgActive,
  },
  {
    dom: swiperRef,
    percent: 0.1,
    active: isSwiperActive
  }
]);
</script>
<style lang="scss" scoped>
@import url(./css/safty.scss);
.space-wrapper {
  position: relative;
  background-color: #6a7e88;
  .swiper-wrapper {
    width: 100%;
    margin-top: -1.2rem;
    height: fit-content;
    background: linear-gradient(
      to bottom,
      rgba(168, 178, 185, 0) 0%,
      rgba(168, 178, 185, 1) 15%,
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

    .desc {
      margin-top: 0.24rem;
      font-size: 0.52rem;
      line-height: 0.6rem;
      transition-delay: 0.2s;
    }
  }

  .detail.active {
    p {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .space-swiper {
    background: #a9aeb4;
    margin-top: -0.1rem;
    padding: 0.6rem 0.2rem 0.5rem;
    display: none;
  }
}
</style>
