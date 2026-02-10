<template>
  <div class="space-wrapper md-space-wrapper" ref="spaceRef">
    <BaseImg
      :class="['space-bg', isBgActive ? 'active' : '']"
      src="model/et/pic02.png"
    />
    <BaseImg
      :class="['space-bg md-space-bg', isBgActive ? 'active' : '']"
      src="model/et/pic02_mb.png"
    />
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <p class="title">Powertrain</p>
      <p class="desc">
        THE REEV SYSTEM TAKES RANGE<br />
        ANXIETY OFF YOUR MIND
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
import { ref, reactive } from "vue";
import { Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { calcSrollDis } from "@/utils/common/index";

const isBgActive = ref(false);

const swiperRef = ref();
const spaceRef = ref();
const detailRef = ref();

const isDetailActive = ref(false);
const isSwiperActive = ref(false);

const interiorList = reactive([
  {
    src: "pic01-1.jpg",
    mdSrc: "pic01-1-mb.jpg",
    title: "Top 10 dedicated engines for extended Range",
    desc: "With 44.5% peer-leading engine thermal efficiency and the industry's peak fuel-to-electricity conversion efficiency, 1 L of gasoline can generate 3.7 kWh of electricity, which is equivalent to half a day's electricity consumption for an average household.",
  },
  {
    src: "pic01-2.jpg",
    mdSrc: "pic01-2-mb.jpg",
    title: "Ultra-low energy consumption",
    desc: "6.4L/100 kmWLTC of the industry's best-in-class feeding fuel consumption, and 20kWh/100 km of the best pure electric power consumption in its class. ",
  },
  {
    src: "pic01-3.jpg",
    mdSrc: "pic01-3-mb.jpg",
    title: "Long range & ultra-fast SOC 0-100 kph acceleration time",
    desc: "With a combined range of 1500km on a full tank and a full charge, you can travel anywhere without limits. The powertrain is stable and responsive, with a 5.7s feeding acceleration delay per 100 kilometers, which is the fastest in its class.",
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
    percent: 0.7,
    active: isDetailActive,
  },
  {
    dom: spaceRef,
    percent: 0.5,
    active: isBgActive,
  },
  {
    dom: swiperRef,
    percent: 0.2,
    active: isSwiperActive,
  },
]);
</script>
<style lang="scss" scoped>
@import url(./css/powertrain.scss);
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
    color: white;
    width: 100%;
    text-align: center;

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
    background: #141b22;
    padding: 0.6rem 0.2rem 0.5rem;
    display: none;
  }
}
</style>
