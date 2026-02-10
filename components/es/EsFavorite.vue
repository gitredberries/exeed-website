<template>
  <div class="favorite-wrapper md-favorite-wrapper" ref="mfRef">
    <div class="my-favorite">
      <div class="mf-main">
        <BaseImg :class="['mf-img', foucsClass]" src="model/es/pic_wg.jpg" />
        <BaseImg
          :class="['mf-img md-mf-img', foucsClass]"
          src="model/es/mb_pic_wg.png"
        />
        <div :class="['mf-text-left', hideLeftText ? 'hide-text' : '']">
          <div :class="['mf-text-top', isTopTextEnter ? '' : 'mtl-t-out']" ref="topTextRef">
            <div class="mtl_t1 mtl_t">Design Aesthetics</div>
            <div class="mtl_t2 mtl_t">SHARP</div>
            <div class="mtl_t3 mtl_t">STYLE</div>
            <div class="mtl_t4 mtl_t">INTERPRETATION</div>
          </div>
          <div
            :class="['mf-text-bottom', isBottomTextEnter ? '' : 'mtl-t-out']"
            ref="bottomTextRef"
          >
            <div class="mtl_t5 mtl_t">AESTHETIC DESIGN OF THE WIND</div>
            <div class="mtl_t6 mtl_t"></div>
            <div class="mtl_t7 mtl_t">ULTRA-LOW WIND RESISTANCE</div>
            <div class="mtl_t8 mtl_t">0.205Cd</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="item in pointList"
      :key="item.className"
      @click="onPointClick(item)"
      :class="[
        item.className,
        'wave HotspotPoint__pulsing__1MVjgpDF HotspotPoint__point__3GEmahoi',
        item.isWave ? '' : 'hide',
      ]"
    ></div>
    <MFPop
      ref="mfPopRef"
      @close="closeMfPop"
      @changeSlide="changeSlide"
      :activeId="activeId"
      :swipList="swipList"
    />
  </div>
  <div class="favorite-swiper md-favorite-swiper">
    <MdProgressSwiper
      :contentData="mdSwiperList"
      mdSubtitleColor="rgba(255, 255, 255, 0.7)"
      mdScrollbarColor="rgba(255, 255, 255, 0.2)"
      mdScrollbarFillColor="#26B7BC"
    />
  </div>
</template>
<script setup>
import MFPop from "./MFPop.vue";
import { calcSrollDis } from "@/utils/common/index";

const mfRef = ref();
// mf左上方文字是否显示
const isTopTextEnter = ref(false);
// mf左下方文字是否显示
const isBottomTextEnter = ref(true);
// 是否隐藏左侧的文字
const hideLeftText = ref(false);

const topTextRef = ref();
const bottomTextRef = ref();

const activeId = ref(1);

const foucsClass = ref("");

const mfPopRef = ref();

const swipList = reactive([
  {
    id: 1,
    src: "02_01.jpg",
    title: "Design Aesthetics",
    subtitle: "Sharp · Strong · Supreme — Classic supercar proportion",
    desc: "Pure design language for EXLANTIX ES sustainable competitiveness: full-size sedan (4945mm) with a sporty four-door proportion",
  },
  {
    id: 2,
    src: "02_02.jpg",
    title: "Design Aesthetics",
    subtitle: "Noise-reducing intelligent glass",
    desc: "Frameless doors, high-rigidity noise-reducing glass, intelligent speed control, intelligent ventilation system.",
  },
  {
    id: 3,
    src: "02_03.jpg",
    title: "Design Aesthetics",
    subtitle: "Interactive headlights and integrated tail lights",
    desc: "The ISD units will provide very useful information to our customers: battery level, weather forecast, tire pressure, etc., and might also enhance the interaction with the pedestrians.",
  },
  {
    id: 4,
    src: "02_04.jpg",
    title: "Design Aesthetics",
    subtitle: "Speed and passion in perfect harmony",
    desc: "Hidden electric handles, wind-guiding spoiler in dual-mode.",
  },
  {
    id: 5,
    src: "02_05.jpg",
    title: "Design Aesthetics",
    subtitle: "Streamlined dome sunroof",
    desc: "Heat-insulating double-layer nano silver coated glass, 30% improvement of the heat insulation performance, 99.9% UV resistance.",
  },
]);

const mdSwiperList = swipList.map((v) => {
  return {
    image: `model/es/${v.src}`,
    title: v.subtitle,
    description: v.desc,
  };
});

//波纹点阵列表
const pointList = reactive([
  {
    id: 1,
    className: "point-proportion",
    foucsClass: "img-pos-1",
    isWave: true,
  },
  {
    id: 2,
    className: "point-glass",
    foucsClass: "img-pos-2",
    isWave: true,
  },
  {
    id: 3,
    className: "point-light",
    foucsClass: "img-pos-3",
    isWave: true,
  },
  {
    id: 4,
    className: "point-rear",
    foucsClass: "img-pos-4",
    isWave: true,
  },
  {
    id: 5,
    className: "point-sunroof",
    foucsClass: "img-pos-5",
    isWave: true,
  },
]);

const changeSlide = (num) => {
  activeId.value = num;
  foucsClass.value = pointList[activeId.value - 1].foucsClass;
};

const onPointClick = (item) => {
  pointList.forEach((v) => (v.isWave = false));
  document.body.style.overflow = "hidden";
  activeId.value = item.id;
  setTimeout(() => {
    foucsClass.value = item.foucsClass;
    hideLeftText.value = true;
    mfPopRef.value.changePopActive(true);
    mfPopRef.value.changeSwiper(activeId.value);
  }, 500);
};

const closeMfPop = () => {
  mfPopRef.value.changePopActive(false);
  hideLeftText.value = false;
  foucsClass.value = "";
  setTimeout(() => {
    pointList.forEach((v) => (v.isWave = true));
    document.body.style.overflow = "auto";
  }, 500);
};

calcSrollDis(mfRef, [
  {
    dom: topTextRef,
    percent: 0.3,
    active: isTopTextEnter,
  },
  {
    dom: bottomTextRef,
    percent: 0.3,
    active: isBottomTextEnter,
  },
]);
</script>
<style lang="scss" scoped>
@import url(./css/favorite.scss);
.favorite-wrapper {
  width: 100%;
  position: relative;

  .my-favorite {
    width: 100%;
    background-color: #c7cfd4;
    position: sticky;
    top: 0;

    .mf-main {
      width: 100%;
      position: relative;
      overflow: hidden;

      .mf-img {
        width: 100%;
        object-fit: cover;
        transition: all 1s;
      }
      .md-mf-img {
        display: none;
        object-fit: cover;
      }

      .mf-img.img-pos-1 {
        transform: scale(1.1) translate(-8rem, 0rem);
      }

      .mf-img.img-pos-2 {
        transform: scale(1.8) translate(-5rem, 1rem);
      }

      .mf-img.img-pos-3 {
        transform: scale(1.2) translate(-5rem, 1rem);
      }

      .mf-img.img-pos-4 {
        transform: scale(1.2) translate(-9rem, -1rem);
      }

      .mf-img.img-pos-5 {
        transform: scale(1.3) translate(-8rem, 2rem);
      }

      .mf-text-left {
        position: absolute;
        left: 1.2rem;
        top: 1.2rem;
        height: calc(100% - 2rem);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 1s;

        .mtl_t {
          width: 100%;
          opacity: 1;
          transition: all 1s ease-out;
        }

        .mtl_t1 {
          font-size: 0.2rem;
          color: #fff;
          line-height: 0.2rem;
          transition-delay: 0.1s;
        }

        .mtl_t2 {
          font-size: 0.72rem;
          margin-top: 0.4rem;
          line-height: 0.88rem;
          color: #fff;
          transition-delay: 0.25s;
        }

        .mtl_t3 {
          font-size: 0.72rem;
          color: #fff;
          line-height: 0.88rem;
          transition-delay: 0.4s;
        }

        .mtl_t4 {
          font-size: 0.7rem;
          line-height: 0.88rem;
          color: #fff;
          transition-delay: 0.55s;
        }

        .mtl_t5 {
          font-size: 0.24rem;
          color: #26b7bc;
          transition-delay: 0.1s;
        }

        .mtl_t6 {
          background-color: #26b7bc;
          height: 1px;
          margin-top: 0.14rem;
          width: 100%;
          transform: translateX(0rem);
          transition: 2s;
          transition-delay: 0.25s;
        }

        .mtl_t7 {
          font-size: 0.16rem;
          color: #fff;
          margin-top: 0.14rem;
          transition-delay: 0.4s;
        }

        .mtl_t8 {
          color: #26b7bc;
          font-size: 0.72rem;
          margin-top: 0.4rem;
          transition-delay: 0.55s;
        }
      }

      .mf-text-left.hide-text {
        opacity: 0;
      }

      .mtl-t-out {
        .mtl_t {
          transform: translateX(-1rem);
          opacity: 0;
        }

        .mtl_t6 {
          width: 0;
        }
      }
    }
  }

  .point-light {
    position: absolute;
    top: 24%;
    right: 47%;
    transform: scale(1);
  }

  .point-glass {
    position: absolute;
    top: 31%;
    right: 33%;
    transform: scale(1);
  }

  .point-proportion {
    position: absolute;
    top: 46%;
    right: 32%;
    transform: scale(1);
  }

  .point-sunroof {
    position: absolute;
    top: 25%;
    right: 18%;
    transform: scale(1);
  }

  .point-rear {
    position: absolute;
    top: 74%;
    right: 7.5%;
    transform: scale(1);
  }

  .hide {
    transition: all 0.5s;
    transform: scale(0);
  }
}
.favorite-swiper {
  padding: 0 0.2rem 0.6rem;
  background-color: #c7cfd4;
  display: none;
}
</style>
