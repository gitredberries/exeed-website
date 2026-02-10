<template>
  <div class="space-wrapper md-space-wrapper" ref="spaceRef">
    <BaseImg
      :class="['space-bg', isBgActive ? 'active' : '']"
      src="model/es/pic_0808_01.jpg"
    />
    <BaseImg
      :class="['space-bg md-space-bg', isBgActive ? 'active' : '']"
      src="model/es/pic_0808_01_mb.png"
    />
    <div :class="['detail', isDetailActive ? 'active' : '']" ref="detailRef">
      <p class="title">Interior&Space</p>
      <p class="desc">
        ECO-CONSCIOUS DESIGN &amp; A<br class="md-br" />
        FULL-SCENE<br class="pc-br" />ULTRA-LARGE AND<br class="md-br" />
        COMFORTABLE SPACE,<br class="pc-br" />ENJOY AN<br class="md-br" />
        EXTRAORDINARY EXPERIENCE
      </p>
      <p class="taste">SPACIOUS FULL-SCENE CABIN FOR A PREMIUM DRIVING</p>
    </div>
    <div class="swiper-wrapper" ref="swiperRef">
      <Swiper
        :slidesPerView="3"
        :slidesOffsetBefore="190"
        :spaceBetween="20"
        :speed="1000"
      >
        <SwiperSlide v-for="item in interiorList" :key="item.title">
          <EsIntelCard
            :src="item.src"
            :title="item.title"
            :desc="item.desc"
            :isAllActive="isSwiperActive"
          />
        </SwiperSlide>
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
    src: "nskj_01.jpg",
    mdSrc: "pic01_01.jpg",
    title: "Eco-friendly materials for a <br>5A-Grade healthy cabin",
    desc: "Enjoy low-odor faux deer leather, natural linen fiber seat backs, and wood grain trim with premium NAPPA leather. Stylish DURABIO™ bio-based lighting and a dashboard made from sustainable materials ensure that every journey is a refined experience.",
  },
  {
    src: "nskj_02.jpg",
    mdSrc: "pic01_02.jpg",
    title: "Expansive views in all directions, beyond just front and back",
    desc: "Discover a spacious interior with a 3000mm wheelbase and 1940mm legroom.  The rear space offers 955mm headroom, and the panoramic roof provides a vast transparent area. All within a stylish design that utilizes over 70% of space efficiently.",
  },
  {
    src: "nskj_03.jpg",
    mdSrc: "pic01_03.jpg",
    title: "10-layer NAPPA leather seats for exceptional comfort",
    desc: "10-layer NAPPA leather seats with shock-absorbing foam for a smooth ride. The driver’s seat has  buit-in dual speakers for a premium audio experience. The 8-way power-adjustable front seats offer lumbar support, heating, ventilation, and memory function. Indulge in SPA-grade seat massage with multiple modes and intensity levels.",
  },
  {
    src: "nskj_04.jpg",
    mdSrc: "pic01_04.jpg",
    title: "Industry-leading, pure music vibes",
    desc: "Experience the groundbreaking Sky Speakers – 23 ultra thin speakers (including dual-headrest speakers) delivering kW-level power and Gb-level computing. With over 1000 hrs of fine-tuning, the ambient lighting system syncs with the music, creating a mesmerizing audio-visual experience.",
  },
]);

const mdSwiperList = interiorList.map((v) => {
  return {
    image: `model/es/${v.mdSrc}`,
    title: v.title,
    description: v.desc,
  };
});

calcSrollDis(spaceRef, [
  {
    dom: detailRef,
    percent: 0.4,
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
@import url(./css/space.scss);
.space-wrapper {
  position: relative;
  .swiper-wrapper {
    width: 100%;
    margin-top: -2rem;
    height: fit-content;
    background: linear-gradient(
      to bottom,
      rgba(168, 178, 185, 0) 0%,
      rgba(168, 178, 185, 1) 30%,
      rgba(168, 178, 185, 1) 50%,
      rgba(134, 148, 157, 1) 100%
    );
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
    left: 1.2rem;
    color: white;

    p {
      transition: all 1s;
      opacity: 0;
      transform: translateY(1rem);
    }

    .title {
      font-size: 0.2rem;
      line-height: 0.2rem;
    }

    .desc {
      margin-top: 0.4rem;
      font-size: 0.52rem;
      line-height: 0.58rem;
      transition-delay: 0.2s;
      .pc-br {
        display: block;
      }
      .md-br {
        display: none;
      }
    }

    .taste {
      margin-top: 0.2rem;
      font-size: 0.16rem;
      line-height: 0.16rem;
      transition-delay: 0.4s;
    }
  }

  .detail.active {
    p {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .space-swiper {
    padding: 0 0.2rem 0.6rem;
    display: none;
  }
}
</style>
