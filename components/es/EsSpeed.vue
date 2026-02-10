<template>
  <div class="speed-wrapper md-speed-wrapper" ref="speedRef">
    <div :class="['mask', isMaskActive ? 'active' : '']"></div>
    <div class="md-top-mask"></div>
    <BaseImg class="speed-bg" src="model/es/pic_0808_02.jpg" />
    <BaseImg class="speed-bg md-speed-bg" src="model/es/pic_0808_02_mb.png" />
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <p class="title">Dynamics</p>
      <p class="subtitle">SPEEDY AND STABLE</p>
      <p class="desc">
        THE INNOVATIVE UNIQUE PLATFORM ENABLES YOU TO<br />ENJOY A SMOOTH AND
        EFFORTLESS DRIVING SENSATION.
      </p>
    </div>
    <div class="swiper-wrapper" ref="swiperRef">
      <div class="swiper-control">
        <BaseImg
          @click="onControlClick(0)"
          class="control-bg"
          src="model/es/swh_prev.png"
        />
        <BaseImg
          @click="onControlClick(1)"
          class="control-bg"
          src="model/es/swh_next.png"
        />
      </div>
      <Swiper
        :modules="[Pagination]"
        :slidesPerView="1.3"
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
          <EsSpeedInfo
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
    <div class="charging-box-wrapper">
      <div class="charging-box">
        <div class="charging-title">SUPER FAST CHARGING</div>
        <div class="charging-list charging-list-left">
          <BaseImg class="charging-list-bg" src="model/es/charging_01.png" />
          <BaseImg
            class="charging-list-bg md-charging-list-bg"
            src="model/es/charging_01.png"
          />
          <div class="md-charging-list-text">
            <div class="charging-text-left">
              <p class="charging-name">HIGH VOLTAGE</p>
              <p class="charging-num">800V</p>
            </div>
            <div class="charging-text-right">
              <p class="charging-name">EFFICIENCY UP</p>
              <p class="charging-num">90%</p>
            </div>
          </div>
        </div>
        <div class="charging-list charging-list-right">
          <BaseImg class="charging-list-bg" src="model/es/charging_02.png" />
          <BaseImg
            class="charging-list-bg md-charging-list-bg"
            src="model/es/charging_02.png"
          />
          <div class="md-charging-list-text">
            <div class="charging-text-left">
              <p class="charging-name">FAST CHARGE</p>
              <p class="charging-num">5MIN</p>
            </div>
            <div class="charging-text-right">
              <p class="charging-name">WLTP RANGE</p>
              <p class="charging-num">120KM</p>
            </div>
          </div>
        </div>
        <div class="charging-list-text">
          <div class="charging-text-left">
            <p class="charging-name">HIGH VOLTAGE</p>
            <p class="charging-num">800V</p>
          </div>
          <div class="charging-text-right">
            <p class="charging-name">EFFICIENCY UP</p>
            <p class="charging-num">90%</p>
          </div>
        </div>
        <div class="charging-list-text list-text-right">
          <div class="charging-text-left">
            <p class="charging-name">FAST CHARGE</p>
            <p class="charging-num">5MIN</p>
          </div>
          <div class="charging-text-right">
            <p class="charging-name">WLTP RANGE</p>
            <p class="charging-num">120KM</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import EsSpeedInfo from "./EsSpeedInfo.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { calcSrollDis } from "@/utils/common/index";

const swiperRef = ref();
const detailRef = ref();
const speedRef = ref();
const isMaskActive = ref(false);
const isDetailActive = ref(false);
const isSpeedInfoActive = ref(false);

const infoList = reactive([
  {
    src: "dl_01.jpg",
    title: "Standardized superior enjoyment for the whole series",
    desc: "Achieve refined driving with IAS intelligent air suspension and CDC electromagnetic damping, perfectly tuned for exceptional handling and comfort.",
  },
  {
    src: "dl_02.jpg",
    title: "Racing genes",
    desc: "High-performance six-piston racing-grade calipers, leading in its class, 100 km braking distance of 33.1 m",
  },
  {
    src: "dl_05.jpg",
    title: "Speed up in fewer seconds",
    desc: "Intelligent torque control system with 8000Nm of torque at each wheel, 3.7s acceleration from 0 -100 km/h, 0.2s switch between 2WD and 4WD without feeling",
  },
  {
    src: "dl_03.jpg",
    title: "Comfort and handling in balance",
    desc: "Industry-leading front double wishbone and rear five-link suspension, achieving the ultimate in physical motion decoupling, perfectly balancing comfort and handling, all-aluminum chassis, reducing unsprung weight by 25%",
  },
]);

const mdSwiperList = infoList.map((v) => {
  return {
    image: `model/es/${v.src}`,
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
    dom: speedRef,
    percent: 0.3,
    active: isMaskActive,
  },
  {
    dom: detailRef,
    percent: 0.4,
    active: isDetailActive,
  },
  {
    dom: swiperRef,
    percent: 0.4,
    active: isSpeedInfoActive,
  },
]);
</script>
<style lang="scss" scoped>
@import url(./css/speed.scss);
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
      rgba(168, 178, 185, 1) 40%,
      rgba(168, 178, 185, 1) 100%
    );

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
      bottom: 0;
      text-align: right;
      padding-right: 1rem;

      :deep(.swiper-pagination-bullet) {
        transition: all 0.5s;
      }

      :deep(.speed-pagination-active) {
        background-color: rgb(58, 174, 176);
        width: 0.2rem;
        opacity: 1;
        border-radius: 50px;
      }
    }
  }
  .charging-box-wrapper {
    padding: 0.8rem 1.9rem;
    background: linear-gradient(rgb(168, 178, 185) 0%, rgb(123, 139, 149) 100%);
  }
  .charging-box {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .charging-title {
      font-size: 0.2rem;
      line-height: 0.28rem;
      color: white;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .charging-list {
    display: flex;
    align-items: flex-end;
    width: 49%;
    position: relative;
    border-radius: 0.05rem;
    overflow: hidden;
    .md-charging-list-text {
      display: none;
    }
    .charging-list-bg {
      width: 100%;
      object-fit: cover;
    }
    .md-charging-list-bg {
      display: none;
    }
    .list-text-right {
      bottom: 1.2rem;
    }
  }
  .charging-list-text {
    position: absolute;
    left: 0;
    width: 49%;
    bottom: 15%;
    color: white;
    display: flex;
    justify-content: space-around;
    .charging-name {
      font-size: 0.2rem;
      line-height: 0.48rem;
      margin-bottom: 0.1rem;
    }
    .charging-num {
      font-family: "SairaSemiBold", sans-serif;
      font-weight: 600;
      font-size: 0.8rem;
      line-height: 0.8rem;
    }
  }
  .list-text-right {
    left: auto;
    right: 0;
  }
  .md-speeed-swiper {
    margin-top: 0.5rem;
    padding: 0 0.2rem 0.6rem;
    display: none;
  }
}
</style>
