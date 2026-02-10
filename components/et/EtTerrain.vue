<template>
  <div class="speed-wrapper md-speed-wrapper" ref="speedRef">
    <div :class="['mask', isMaskActive ? 'active' : '']" ref="maskRef"></div>
    <BaseImg class="speed-bg" src="model/et/pic03.png" />
    <BaseImg class="speed-bg md-speed-bg" src="model/et/pic03_mb.png" />
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <p class="title">Snow Leopard AWD</p>
      <p class="subtitle">
        HARDCORE POWER CONQUERS<br class="md-br"> ALL <br class="pc-br" />
        TERRAINS
      </p>
    </div>
    <div class="swiper-wrapper" ref="swiperRef">
      <Swiper
        class="swiper"
        :modules="[Pagination]"
        :slidesPerView="1.4"
        :slidesOffsetBefore="190"
        :speed="1000"
        :pagination="{
          el: '.speed-pagination',
          bulletActiveClass: 'speed-pagination-active',
          clickable: true
        }"
        @swiper="onSwiper"
      >
        <SwiperSlide v-for="item in infoList" :key="item.title">
          <EtTerrainInfo
            :src="item.src"
            :title="item.title"
            :desc="item.desc"
            :isActive="isSpeedInfoActive"
          />
        </SwiperSlide>
        <div class="speed-pagination"></div>
      </Swiper>
    </div>
    <div class="md-speeed-swiper">
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
import EtTerrainInfo from "./EtTerrainInfo.vue";
import { calcSrollDis } from "@/utils/common/index";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

const speedRef = ref();
const detailRef = ref();
const maskRef = ref();
const swiperRef = ref();

const isMaskActive = ref(false);
const isDetailActive = ref(false);
const isSpeedInfoActive = ref(false);

const infoList = reactive([
  {
    src: "pic02-1.jpg",
    mdSrc: 'pic02-1-mb.jpg',
    title: "Powerful performance",
    desc: "ET delivers 345 kW of power, offering stable performance and quick response, with a 0-100 km/h acceleration time of just 4.8 seconds.",
  },
  {
    src: "pic02-2.jpg",
    mdSrc: 'pic02-2-mb.jpg',
    title: "IAS+ CDC",
    desc: "IAS + CDC can bring more than 30 driving comfort scenarios, including excellent handling on all types of road, rapid car height adjustment, and instantaneous shock absorption, to achieve a harmonious unity of ride comfort and sporty handling.",
  },
  {
    src: "pic02-3.jpg",
    mdSrc: 'pic02-3-mb.jpg',
    title: "Intelligent torque control system",
    desc: "ET delivers a maximum torque of 7400 Nm,boasts the widest torque distribution range in the industry, achieving a 0-100% distribution on both the front and rear axle,the intelligent torque distribution system switches seamlessly in 0.02 seconds.",
  },
  {
    src: "pic02-4.jpg",
    mdSrc: 'pic02-4-mb.jpg',
    title: "Intelligent off-road creep",
    desc: "You only need to steer while the car handles everything else—passing over cobblestone roads, boulder paths, and even climbing steep 35% gradient of slopes on its own.",
  },
  {
    src: "pic02-5.jpg",
    mdSrc: 'pic02-5-mb.jpg',
    title: "Escape function",
    desc: "Whether it’s a 0.5-meter axle drop, deep snow, or a single-wheel stuck situation, the Snow Leopard AWD ensures a smooth escape.",
  },
]);

const mdSwiperList = infoList.map((v) => {
  return {
    image: `model/et/${v.mdSrc}`,
    title: v.title,
    description: v.desc,
  };
});

let swiper = null;
const onSwiper = (s) => {
  swiper = s;
};

const onControlClick = (sign) => {
  if (sign === 0) {
    swiper.slidePrev();
  } else {
    swiper.slideNext();
  }
};

calcSrollDis(speedRef, [
  {
    dom: detailRef,
    percent: 0.5,
    active: isDetailActive,
  },
  {
    dom: maskRef,
    percent: 0.55,
    active: isMaskActive,
  },
  {
    dom: swiperRef,
    percent: 0.4,
    active: isSpeedInfoActive
  }
]);
</script>
<style lang="scss" scoped>
@import url("./css/terrain.scss");
.speed-wrapper {
  position: relative;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #6a7e88;
    opacity: 0.5;
  }

  .mask.active {
    opacity: 0;
    transition: all 1s;
    pointer-events: none;
  }

  .speed-bg {
    width: 100%;
  }

  .md-speed-bg {
    display: none;
  }

  .detail {
    width: 100%;
    color: white;
    text-align: center;
    top: 1.2rem;
    position: absolute;
    left: 0;

    p {
      transition: all 1s;
      transform: translateY(1rem);
      opacity: 0;
    }

    .title {
      color: #e5e5e5;
      font-size: 0.2rem;
      line-height: 0.28rem;
    }

    .subtitle {
      font-size: 0.52rem;
      line-height: 0.6rem;
      margin-top: 0.24rem;
      transition-delay: 0.2s;
      .pc-br{
        display: block;
      }
      .md-br{
        display: none;
      }
    }

    .desc {
      font-size: 0.16rem;
      line-height: 0.24rem;
      margin-top: 0.12rem;
      transition-delay: 0.4s;
    }
  }

  .detail.active {
    p {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .swiper-wrapper {
    width: 100%;
    padding-top: 2rem;
    margin-top: -3.2rem;
    position: relative;
    background: linear-gradient(
      to bottom,
      rgba(168, 178, 185, 0) 0%,
      rgba(168, 178, 185, 1) 20%,
      rgba(168, 178, 185, 1) 100%
    );
    .swiper {
      padding-bottom: 1rem;
    }

    .swiper-control {
      position: absolute;
      right: 1rem;
      top: 1.5rem;
      display: flex;
      align-items: center;

      .control-bg {
        width: 0.35rem;
        margin: 0 0.1rem;
        opacity: 0.4;

        &:hover {
          opacity: 1;
          cursor: pointer;
        }
      }
    }

    .speed-pagination {
      position: absolute;
      bottom: 0.5rem;
      text-align: right;
      padding-right: 1rem;

      :deep(.swiper-pagination-bullet) {
        background: white;
        opacity: 0.2;
        transition: all 0.5s;
      }

      :deep(.speed-pagination-active) {
        opacity: 1;
        background-color: #26B7BC;
        width: 0.2rem;
        opacity: 1;
        border-radius: 50px;
      }
    }
  }
  .md-speeed-swiper {
    background: #1B2A3B;
    padding: 0 0.2rem 0.5rem;
    display: none;
  }
}
</style>
