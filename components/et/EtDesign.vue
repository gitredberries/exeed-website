<template>
  <div class="favorite-wrapper md-favorite-wrapper" ref="mfRef">
    <div class="my-favorite">
      <div class="mf-main">
        <BaseImg :class="['mf-img', foucsClass]" src="model/et/pic05.png" />
        <BaseImg
          :class="['mf-img md-mf-img', foucsClass]"
          src="model/et/pic05-mb.png"
        />
        <div
          :class="[
            'mf-text-left',
            isDetailActive ? 'active' : '',
            hideLeftText ? 'hide-text' : '',
          ]"
        >
          <div :class="[isTopTextOut ? 'mtl-t-out' : '']" ref="detailRef">
            <div class="mtl_t1 mtl_t">Exterior Design</div>
            <div class="mtl_t2 mtl_t">
              INTERPRETING THE BEAUTY <br class="pc-pad" />OF DESIGN WITH
              <br />ELEGANCE AND <br />
              DYNAMISM
            </div>
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
      mdSubtitleColor="#fff"
      mdScrollbarColor="rgba(255, 255, 255, 0.2)"
      mdScrollbarFillColor="#26B7BC"
    />
  </div>
</template>
<script setup>
import MFPop from "./MFPop.vue";
import { calcSrollDis } from "@/utils/common/index";

const mfRef = ref();
const detailRef = ref();
// mf左上方文字是否显示
const isTopTextOut = ref(true);
// 是否隐藏左侧的文字
const hideLeftText = ref(false);

const activeId = ref(1);
const isDetailActive = ref(false);

const foucsClass = ref("");

const mfPopRef = ref();

const swipList = reactive([
  {
    id: 1,
    src: "point-3.jpg",
    mdSrc: "pic04-3-mb.jpg",
    title: "Exterior Design",
    subtitle: "Electric suction door",
    desc: "Frameless doors and 6 mm laminated silent glass, combined with the electric suction door, exude its smart and luxurious features. With a gentle push, the door will automatically close, allowing you to get in elegantly without having to exert any force.",
  },
  {
    id: 2,
    src: "point-1.jpg",
    mdSrc: "pic04-1-mb.jpg",
    title: "Exterior Design",
    subtitle: "High and low beam split headlights",
    desc: "A through light strip and dynamic turn signals made up of 168 LEDs give the car a sporty look.",
  },
  {
    id: 3,
    src: "point-2.jpg",
    mdSrc: "pic04-2-mb.jpg",
    title: "Exterior Design",
    subtitle: "Brand-new front face design",
    desc: "The newly upgraded front face with a starry cascade style grille that is both dignified and elegant creates a sense of exquisite luxury.",
  },
  {
    id: 4,
    src: "point-4.jpg",
    mdSrc: "pic04-4-mb.jpg",
    title: "Exterior Design",
    subtitle: "Panoramic sunroof",
    desc: "The 2.38 ㎡ panoramic sunroof is the largest in its class, with a light transmission area of 1.57 ㎡. It is made of double-layer nano-silver-plated insulating glass, which blocks 99.9% of UV rays and 98.5% of infrared rays, keeping the interior of the car cool and bright.",
  },
]);

const mdSwiperList = swipList.map((v) => {
  return {
    image: `model/et/${v.mdSrc}`,
    title: v.subtitle,
    description: v.desc,
  };
});

//波纹点阵列表
const pointList = reactive([
  {
    id: 1,
    className: "point-door",
    foucsClass: "img-pos-1",
    isWave: true,
  },
  {
    id: 2,
    className: "point-light",
    foucsClass: "img-pos-2",
    isWave: true,
  },
  {
    id: 3,
    className: "point-face",
    foucsClass: "img-pos-3",
    isWave: true,
  },
  {
    id: 4,
    className: "point-sunroof",
    foucsClass: "img-pos-4",
    isWave: true,
  },
]);

const wheelForbidden = (e) => {
  e.preventDefault();
};

const hideScrollbar = () => {
  document.querySelector("body").classList.add("hide-scrollbar");
};

const showScrollbar = () => {
  document.querySelector("body").classList.remove("hide-scrollbar");
};

const changeSlide = (num) => {
  activeId.value = num;
  foucsClass.value = pointList[activeId.value - 1].foucsClass;
};

const onPointClick = (item) => {
  pointList.forEach((v) => (v.isWave = false));
  document.addEventListener("wheel", wheelForbidden, { passive: false });
  activeId.value = item.id;
  hideScrollbar();
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
    document.removeEventListener("wheel", wheelForbidden);
    showScrollbar();
  }, 500);
};

calcSrollDis(mfRef, [
  {
    dom: detailRef,
    percent: 0.5,
    active: isDetailActive,
  },
]);
</script>
<style lang="scss" scoped>
@import url(./css/design.scss);
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
        transform: scale(1.6) translate(-2rem, 0rem);
      }

      .mf-img.img-pos-2 {
        transform: scale(1.8) translate(-5rem, 0rem);
      }

      .mf-img.img-pos-3 {
        transform: scale(1.8) translate(-7rem, 0rem);
      }

      .mf-img.img-pos-4 {
        transform: scale(1.8) translate(-2rem, 1rem);
      }
      .mf-text-left {
        position: absolute;
        left: 1.2rem;
        top: 1.2rem;
        height: calc(100vh - 2rem);
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
          line-height: 0.28rem;
          transition-delay: 0.1s;
          opacity: 0;
          transform: translateX(-1rem);
        }

        .mtl_t2 {
          font-size: 0.52rem;
          margin-top: 0.24rem;
          line-height: 0.6rem;
          color: #fff;
          transition-delay: 0.25s;
          opacity: 0;
          transform: translateX(-1rem);
        }
      }

      .mf-text-left.active {
        .mtl_t1 {
          opacity: 1;
          transform: translateX(0);
        }
        .mtl_t2 {
          opacity: 1;
          transform: translateX(0);
        }
      }

      .mf-text-left.hide-text {
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
  top: 47%;
  right: 32%;
  transform: scale(1);
}

.point-door {
  position: absolute;
  top: 44%;
  right: 56%;
  transform: scale(1);
}

.point-sunroof {
  position: absolute;
  top: 35%;
  right: 51%;
  transform: scale(1);
}

.point-face {
  position: absolute;
  top: 46%;
  right: 23%;
  transform: scale(1);
}

.hide {
  transition: all 0.5s;
  transform: scale(0);
}
.favorite-swiper {
  padding: 0.6rem 0.2rem 0.5rem;
  background-color: #121921;
  display: none;
  margin-top: -0.1rem;
  position: relative;
}
</style>
<style>
.hide-scrollbar::-webkit-scrollbar {
  width: 0;
}
</style>
