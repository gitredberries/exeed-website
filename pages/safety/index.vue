<template>
  <div class="safety-page md-safety-page" ref="safetyRef">
    <!-- 第一屏 -->
    <section class="safety-one-section" v-for="item in s1Info">
      <Swiper style="width: 100%; height: 100%" :loop="false" :speed="1000">
        <SwiperSlide v-for="item in s1Info" :key="item.id">
          <div class="safety-one-content-wrapper">
            <div class="safety-one-section-bg">
              <img :src="item.image" alt="" />
            </div>
            <div class="safety-one-section-bg safety-one-section-bg-md">
              <img :src="item.imageMobile || item.image" alt="" />
            </div>
            <div class="safety-one-section-title">
              {{ item.title }}
            </div>
            <div class="safety-one-section-content">
              {{ item.subtitle }}
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    <!-- 第二屏 -->
    <section
      class="safety-two-section"
      ref="safetyTwoRef"
      @mousemove="onS2BgEnter"
      @mouseleave="onS2BgLeave"
    >
      <div class="safety-two-detail">
        <div
          :class="[
            'safety-two-detail-bg',
            safetyTwoSign !== 0 ? 'safety-two-detail-bg-show' : '',
          ]"
        >
          <BaseImg src="explorationImage/safetyTwoBg.png" alt="" />
        </div>
        <div
          class="safety-two-section-shadow"
          :style="{ opacity: safetyTwoSign === 1 ? 0 : 1 }"
        ></div>
        <div
          class="safety-two-section-title"
          :style="{ opacity: safetyTwoSign === 0 ? 1 : 0 }"
        >
          <p>Safety Performance 3.24 Times</p>
          Higher Than the Industry Standard
        </div>
        <div
          class="safety-two-section-desc"
          :style="{
            opacity: safetyTwoSign === 2 || safetyTwoSign === 3 ? 1 : 0,
            transform: `translateY(${safetyTwoSign === 3 ? '-2rem' : '0'} )`,
          }"
        >
          <Typewriter ref="typeWriterRef" />
        </div>
        <div
          class="safety-two-section-intro"
          :style="{
            opacity: safetyTwoSign === 3 ? 1 : 0,
            transform: `translateY(${safetyTwoSign === 3 ? '2rem' : '3rem'} )`,
          }"
        >
          <div class="intro-wrapper">
            <div
              class="intro-item"
              v-for="item in safetyTwoIntroList"
              :key="item.id"
            >
              <div class="intro-item-img">
                <BaseImg :src="item.img" />
              </div>
              <div class="intro-item-text">{{ item.text }}</div>
            </div>
          </div>
        </div>
        <Play :isShow="showPlay" @onPlayClick="onPlayClick" />
      </div>
      <div class="md-safety-two-detail" @click="onPlayClick">
        <div class="detail-bg-wrapper">
          <BaseImg
            class="detail-bg"
            src="explorationImage/safety-two-bg-md.png"
            alt=""
          />
        </div>
        <div class="safety-two-section-text-wrapper">
          <div class="text-desc">
            <p>
              ABC columns intact Door handle pops
              <br />
              open normally Door can bpe opened
            </p>
            <p>
              No intrusion into the passenger
              <br />
              compartment. Airbags ignited normally
            </p>
            <p>Battery not on fire or smoke</p>
            <p>Panoramic canopy intact</p>
          </div>
          <ul class="text-card-wrapper">
            <li v-for="item in safetyTwoIntroList">
              <div class="text-card-img">
                <BaseImg :src="item.img" />
              </div>
              <div class="text-card-name">
                {{ item.text }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 第三屏 -->
    <section class="safety-three-section">
      <div
        class="safety-three-section-title"
        :class="{ 'fade-in': showThreeTitle }"
        ref="threeTitleRef"
      >
        Core Technologies Guard the Safety of EXLANTIX
      </div>
      <div class="safety-three-section-items" ref="threeDetailRef">
        <div
          class="safety-three-section-item"
          v-for="(item, index) in threeSectionItems"
          :key="index"
          :class="{ 'fade-in': showThreeDetail }"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div v-if="item.type === 1" class="safety-three-section-item-img">
            <BaseImg :src="item.url" alt="" />
          </div>
          <div v-if="item.type === 2" class="safety-three-section-item-img">
            <video
              :src="`${config.public.oosURL}platform/public/video/${item.url}`"
              muted
              preload="metadata"
              loop
              webkit-playsinline
              playsinline
              autoplay
              :poster="`${config.public.staticURL}/images/explorationImage/${item.poster}`"
            ></video>
          </div>
          <div class="safety-three-section-item-title">
            {{ item.desc }}
          </div>
          <div class="safety-three-section-item-shadow"></div>
          <div class="safety-three-section-item-footerShadow"></div>
        </div>
      </div>
    </section>
    <!-- 第四屏 -->
    <section class="safety-four-section">
      <div
        class="safety-four-section-title"
        :class="{ 'fade-in': showFourTitle }"
        ref="fourTitleRef"
      >
        Full Scene Electrical Safety Development
      </div>
      <div class="safety-four-section-items" ref="fourDetailRef">
        <div
          class="safety-four-section-item"
          v-for="(item, index) in fourSectionItems"
          :key="index"
          :class="{ 'fade-in': showFourDetail }"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div class="safety-four-section-item-img">
            <BaseImg :src="item.img" alt="" />
          </div>
          <div class="safety-four-section-item-title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </section>
    <!-- 第五屏 -->
    <section class="safety-five-section">
      <div
        class="safety-five-section-title"
        :class="{ 'fade-in': showFiveTitle }"
        ref="fiveTitleRef"
      >
        <p>EXLANTIX ET</p>
        The First Five-star Safety Rating in 2024
      </div>
      <div class="safety-five-section-content" ref="fiveDetailRef">
        <Swiper
          class="swiper"
          :modules="[Pagination]"
          :loop="false"
          :slidesOffsetBefore="90"
          :speed="1000"
          :slidesPerView="3"
          :spaceBetween="8"
          :pagination="{
            el: '.five-swiper-pagination',
            clickable: true,
          }"
        >
          <SwiperSlide v-for="(item, idx) in safetyRatingList" :key="item.id">
            <div
              class="swiper-slide-item"
              @mouseleave="handleMouseLeave(idx)"
              @mouseenter="handleMouseEnter(idx)"
              :class="{ 'fade-in': showFiveDetail }"
              :style="{ transitionDelay: `${idx * 0.1}s` }"
            >
              <div class="swiper-slide-item-img">
                <video
                  :poster="`${config.public.staticURL}/images/explorationImage/${item.poster}`"
                  :src="`${config.public.oosURL}platform/public/video/${item.url}`"
                  muted
                  preload="metadata"
                  loop
                  webkit-playsinline
                  playsinline
                  autoplay
                ></video>
              </div>
              <div class="swiper-slide-item-footer">
                <div class="title">{{ item.title }}</div>
                <div class="items">
                  <div
                    class="item"
                    v-for="(i, index) in item.descList"
                    :key="index"
                  >
                    <div class="top">{{ i.name }}</div>
                    <div class="bottom">{{ i.num }}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div class="five-swiper-pagination"></div>
        </Swiper>
      </div>
      <div class="md-safety-five-section-content">
        <Swiper
          :modules="[EffectFade, Pagination]"
          effect="fade"
          :loop="true"
          :fadeEffect="{
            crossFade: true,
          }"
          :pagination="{
            el: '.md-five-swiper-pagination',
            clickable: true,
          }"
        >
          <SwiperSlide v-for="(item, idx) in safetyRatingList" :key="idx">
            <div class="swiper-content-wrapper">
              <div class="img-wrapper">
                <video
                  :src="`${config.public.oosURL}platform/public/video/${item.url}`"
                  muted
                  preload="metadata"
                  loop
                  webkit-playsinline
                  playsinline
                  autoplay
                ></video>
              </div>
              <div class="text-wrapper">
                <div class="title">{{ item.title }}</div>
                <div class="detail-wrapper">
                  <div class="detail-item-wrapper" v-for="i in item.descList">
                    <div class="name">{{ i.name }}</div>
                    <div class="num">{{ i.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div class="md-five-swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
    <!-- 第六屏 -->
    <section class="safety-six-section">
      <div class="safety-six-section-bg">
        <BaseImg src="explorationImage/safetySixBg.png" />
      </div>
      <div
        class="safety-six-section-title"
        :class="{ 'fade-in': showSixTitle }"
        ref="sixTitleRef"
      >
        <p class="title-p1">Certificates of Honor</p>
        This vehicle series passed the high - altitude drop test from an 11 -
        story (31.9m) building at 90 km/h. As the first - batch REEV, it got the
        vehicle
        <p>
          control and electromagnetic safety certificates, and achieved C - NCAP
          five - star rating as the first - batch 2024 - version vehicles.
        </p>
      </div>
      <div class="md-safety-six-section-bg">
        <BaseImg src="tech/safty/certify.png" />
        <BaseImg src="tech/safty/vert_shadow.png" />
      </div>
    </section>
  </div>
  <YoutubePlayer
    :isShow="showplayer"
    @close="onPlayerClose"
    url="https://www.youtube.com/embed/4nWjSIDYG5U?"
  />
  <MouseDrag ref="mouseDragRef" />
</template>

<script setup>
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { calcSrollDis, Fetch } from "@/utils/common/index";

const config = useRuntimeConfig();

const safetyRef = ref();
const safetyTwoRef = ref();
const threeTitleRef = ref();
const threeDetailRef = ref();
const fourTitleRef = ref();
const fourDetailRef = ref();
const fiveTitleRef = ref();
const fiveDetailRef = ref();
const sixTitleRef = ref();

const typeWriterRef = ref();
const mouseDragRef = ref();

const showThreeTitle = ref(false);
const showThreeDetail = ref(false);
const showFourTitle = ref(false);
const showFourDetail = ref(false);
const showFiveTitle = ref(false);
const showFiveDetail = ref(false);
const showSixTitle = ref(false);

const safetyTwoSign = ref(0);

let bool = true;

const showplayer = ref(false);
const showPlay = ref(false);

const onPlayClick = () => {
  showplayer.value = true;
};

const onPlayerClose = () => {
  showplayer.value = false;
};

const onS2BgEnter = () => {
  if (safetyTwoSign.value === 1) {
    showPlay.value = true;
  } else {
    showPlay.value = false;
  }
};

const onS2BgLeave = () => {
  showPlay.value = false;
};

let lastScrollTop = 0;
let isScrollDown = false;

const wheelListner = (ev) => {
  let currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollTop > lastScrollTop) {
    // 向下滚动
    isScrollDown = true;
  } else {
    // 向上滚动
    isScrollDown = false;
  }
  lastScrollTop = currentScrollTop;

  // 获取第二屏元素的边界矩形信息
  const twoRefDom = safetyTwoRef.value?.getBoundingClientRect();
  // 获取第二屏元素顶部距离视口顶部的绝对距离
  let top = Math.abs(twoRefDom.top);
  // 获取第二屏元素的高度
  let height = twoRefDom.height;

  // 当第二屏元素顶部超出视口顶部时
  if (twoRefDom.top <= 0) {
    // 将第二屏的状态标识设置为 1
    safetyTwoSign.value = 1;

    // 当第二屏元素顶部距离视口顶部小于元素高度的 20% 且鼠标向下滚动时
    if (top < height * 0.2 && !isScrollDown) {
      // 重置标志位
      bool = true;
      // 重置打字机效果
      typeWriterRef.value?.resetType();
    }

    // 当第二屏元素顶部距离视口顶部在元素高度的 20% 到 40% 之间时
    if (top >= height * 0.2 && top < height * 0.4) {
      // 将第二屏的状态标识设置为 2
      safetyTwoSign.value = 2;
      // 当鼠标向上滚动且标志位为 true 时
      if (isScrollDown > 0 && bool) {
        // 重置标志位
        bool = false;
        // 启动打字机效果
        typeWriterRef.value?.startType();
      }
    }

    // 当第二屏元素顶部距离视口顶部在元素高度的 30% 到 100% 之间时
    if (top >= twoRefDom.height * 0.4 && top < twoRefDom.height) {
      // 将第二屏的状态标识设置为 3
      safetyTwoSign.value = 3;
      // 结束打字机效果
      typeWriterRef.value?.endType();
    }
  } else {
    // 当第二屏元素顶部在视口内时，将第二屏的状态标识设置为 0
    safetyTwoSign.value = 0;
  }
};

const s1Info = ref([]);

const getData = () => {
  Fetch("Safety-s1").then((data) => {
    s1Info.value = data.map((v) => ({
      id: v.id,
      title: v.title,
      subtitle: v.jsondef?.subtitle || "",
      image: v.image,
      imageMobile: v.imageMobile,
    }));
  });
};

onMounted(() => {
  getData();
  document.addEventListener("scroll", wheelListner, { passive: false });
});

onUnmounted(() => {
  document.removeEventListener("scroll", wheelListner, {
    passive: false,
  });
});

const safetyTwoIntroList = reactive([
  {
    id: 1,
    img: "tech/safty/ground.png",
    text: "31.9 meters above the ground",
  },
  {
    id: 2,
    img: "tech/safty/thick_steel_sheet.png",
    text: "4cm thick steel sheet",
  },
  {
    id: 3,
    img: "tech/safty/electrification_test.png",
    text: "Electrification test",
  },
]);

const safetyRatingList = reactive([
  {
    id: 1,
    url: "safety5-1.m4v",
    title: "Head-on Collision",
    poster: "safety5-1.png",
    descList: [
      {
        name: "Frontal Impact",
        num: "1.2 times",
      },
      {
        name: "2024 version",
        num: "55km/h",
      },
      {
        name: "2021 version",
        num: "50km/h",
      },
    ],
  },
  {
    id: 2,
    url: "safety5-2.m4v",
    title: "Side Collision",
    poster: "safety5-2.png",
    descList: [
      {
        name: "Energy increases to",
        num: "1.44 times",
      },
      {
        name: "2024 version",
        num: "60km/h",
      },
      {
        name: "2021 version",
        num: "50km/h",
      },
    ],
  },
  {
    id: 3,
    url: "safety5-3.mp4",
    title: "New Item of Underbody Scratch",
    poster: "safety5-3.png",
    descList: [
      {
        name: "Forward speed",
        num: "30km/h",
      },
      {
        name: "Battery pack and ball head overlapping",
        num: "30km/h",
      },
    ],
  },
]);

const certList = reactive([
  {
    id: 1,
    src: "explorationImage/one.png",
  },
  {
    id: 2,
    src: "explorationImage/two.png",
  },
  {
    id: 3,
    src: "explorationImage/three.png",
  },
  {
    id: 4,
    src: "explorationImage/four.png",
  },
]);

const threeSectionItems = ref([
  {
    url: "explorationImage/capsule.png",
    desc: "Capsule Class Cage Body Technology High Strength Steel Aluminum Of 88% Obtaining 65 Patented Technologies",
    type: 1,
  },
  {
    url: "safety3-2.mp4",
    desc: "Original precise force limiting detachment safety technology Reducing damage value by 20%",
    poster: "original.png",
    type: 2,
  },
  {
    url: "safety3-3.mp4",
    desc: "Triple redundant electronic unlocking technology Unlocking rate up to 100%",
    poster: "image1.png",
    type: 2,
  },
]);
const fourSectionItems = ref([
  {
    img: "explorationImage/safetyFour2.png",
    title: "Waterproofing for the Whole Vehicle",
  },
  {
    img: "explorationImage/safetyFour1.png",
    title: "Charging and discharging Safety",
  },
  {
    img: "explorationImage/safetyFour3.png",
    title: "Bottom Collision",
  },
]);

calcSrollDis(safetyRef, [
  {
    dom: threeTitleRef,
    percent: 0.2,
    active: showThreeTitle,
  },
  {
    dom: threeDetailRef,
    percent: 0.2,
    active: showThreeDetail,
  },
  {
    dom: fourTitleRef,
    percent: 0.2,
    active: showFourTitle,
  },
  {
    dom: fourDetailRef,
    percent: 0.2,
    active: showFourDetail,
  },
  {
    dom: fiveTitleRef,
    percent: 0.2,
    active: showFiveTitle,
  },
  {
    dom: fiveDetailRef,
    percent: 0.2,
    active: showFiveDetail,
  },
  {
    dom: sixTitleRef,
    percent: 0.4,
    active: showSixTitle,
  },
]);

const handleMouseEnter = () => {
  mouseDragRef.value?.onMouseEnter();
};

const handleMouseLeave = () => {
  mouseDragRef.value?.onMouseLeave();
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .safety-page.md-safety-page {
    .safety-one-section {
      .safety-one-content-wrapper {
        padding: 0 0.2rem;
        .safety-one-section-bg {
          display: none;
        }
        .safety-one-section-bg-md {
          display: block;
        }
      }
      .safety-one-section-title {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin-top: 1rem;
      }
      .safety-one-section-content {
        font-size: 0.14rem;
        line-height: 0.2rem;
        margin-top: 0.12rem;
        text-align: center;
      }
      .safety-one-section-desc {
        display: none;
      }
      .md-safety-one-section-desc {
        display: flex;
      }
    }
    .safety-two-section {
      height: auto;
      overflow: hidden;
      background: transparent;
      .safety-two-affix {
        width: 100%;
        display: none;
      }
      .safety-two-detail {
        display: none;
        margin: 0;
        .safety-two-detail-bg {
          width: 100%;
          height: 100%;
          margin: 0;
          transform: scale(1);
        }
        .safety-two-detail-bg-show {
          transform: scale(1);
        }
        width: 100%;
        height: auto;
        position: static;
        transform: translate(0, 0);
        margin-top: 0.8rem;
        .safety-two-section-title {
          width: 100%;
          top: 50;
          font-size: 0.16rem;
          line-height: 0.24rem;
          left: 0;
          transform: translate(0, 0);
          pointer-events: none;
        }
        .safety-two-section-intro {
          display: none;
        }
        .safety-two-section-desc {
          display: none;
        }
      }
      .md-safety-two-detail {
        display: block;
        position: relative;
        .detail-bg-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .detail-bg {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .safety-two-section-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.75);
        }
        .safety-two-section-text-wrapper {
          width: 100%;
          padding: 0.8rem 0.2rem 0.6rem;
          position: relative;
          z-index: 2;
          .text-desc {
            font-size: 0.16rem;
            line-height: 0.24rem;
            color: white;
            text-align: center;
            p {
              margin-bottom: 0.12rem;
            }
          }
          .text-card-wrapper {
            margin-top: 0.4rem;
            li {
              margin-bottom: 0.2rem;
              .text-card-img {
                width: 100%;
                height: 2.46rem;
                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }
              .text-card-name {
                font-size: 0.14rem;
                line-height: 0.21rem;
                color: #ccc;
                margin-top: 0.15rem;
              }
            }
          }
        }
      }
    }
    .safety-three-section {
      padding: 0.8rem 0.2rem 0;
      height: auto;
      .safety-three-section-title {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin-bottom: 0.2rem;
      }
      .safety-three-section-items {
        flex-direction: column;
        .safety-three-section-item {
          width: 100%;
          margin-right: 0;
          height: auto;
          margin-bottom: 0.2rem;
          border-radius: 0.04rem;
          .safety-three-section-item-img {
            position: relative;
            z-index: 2;
            height: auto;
            overflow: hidden;
            border-radius: 0.04rem;
            img {
              border-radius: 0.04rem;
            }
          }
          .safety-three-section-item-title {
            left: 0;
            bottom: 0;
            font-size: 0.14rem;
            line-height: 0.21rem;
            color: #808080;
          }
          .safety-three-section-item-shadow {
            background: linear-gradient(
              180deg,
              #646464 0%,
              #090a0c 80%,
              #090a0c 100%
            );
          }
          .safety-three-section-item-footerShadow {
            height: 0.63rem;
            position: relative;
            background: transparent;
          }
        }
      }
    }
    .safety-four-section {
      padding: 0.8rem 0.2rem 0;
      height: auto;
      background-color: white;
      .safety-four-section-title {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin-bottom: 0.2rem;
      }
      .safety-four-section-items {
        flex-direction: column;
        .safety-four-section-item {
          width: 100%;
          margin-right: 0;
          height: auto;
          margin-bottom: 0.2rem;
          .safety-four-section-item-img {
            height: auto;
            border-radius: 0;
            img {
              border-radius: 0;
            }
          }
          .safety-four-section-item-title {
            font-size: 0.14rem;
            line-height: 0.21rem;
            margin-top: 0.12rem;
          }
        }
      }
    }
    .line {
      display: none;
    }
    .safety-five-section {
      padding: 0.8rem 0.2rem 0.6rem;
      height: auto;
      background-color: #f7f7f7;
      .safety-five-section-title {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin-bottom: 0.2rem;
      }
      .safety-five-section-content {
        display: none;
      }
      .md-safety-five-section-content {
        display: block;
        .swiper-content-wrapper {
          width: 100%;
          .img-wrapper {
            width: 100%;
          }
          .text-wrapper {
            padding: 0.12rem;
            background-color: white;
            .title {
              font-size: 0.14rem;
              line-height: 0.22rem;
              color: #333;
              margin-bottom: 0.04rem;
            }
            .detail-wrapper {
              display: flex;
              justify-content: space-between;
              .detail-item-wrapper {
                .name {
                  font-size: 0.12rem;
                  line-height: 0.2rem;
                  color: #808080;
                }
                .num {
                  font-size: 0.18rem;
                  line-height: 40px;
                  color: #333;
                }
              }
            }
          }
        }
        .md-five-swiper-pagination {
          text-align: center;
          margin-top: 0.2rem;
          :deep(.swiper-pagination-bullet) {
            width: 0.06rem;
            height: 0.06rem;
            background-color: #e5e5e5;
          }
          :deep(.swiper-pagination-bullet-active) {
            width: 0.15rem;
            height: 0.06rem;
            border-radius: 0.03rem;
            background-color: #333333;
          }
        }
      }
    }
    .safety-six-section {
      padding: 0.8rem 0.2rem 0.6rem;
      background: radial-gradient(
        242% 160% at 22% 0%,
        #000000 0%,
        #616161 100%
      );
      height: auto;
      .safety-six-section-bg {
        display: none;
      }
      .safety-six-section-title {
        font-size: 0.14rem;
        line-height: 0.2rem;
        white-space: normal;
        .title-p1 {
          font-size: 0.26rem;
          line-height: 0.3rem;
          margin-bottom: 0.08rem;
        }
      }
      .md-safety-six-section-bg {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.4rem;
      }
      .safety-six-section-img {
        display: none;
      }
      .md-safety-six-section-img {
        display: block;
        margin-top: 0.4rem;
        .md-certificate {
          :deep(.swiper) {
            padding: 0.3rem 0;
            padding-left: 10%;
            margin-left: 8%;
          }
          :deep(.swiper-slide) {
            transition: all 0.5s;
          }
          :deep(.swiper-slide-active) {
            opacity: 1;
            z-index: 3;
            transform: scale(1.4);
          }
          :deep(.swiper-slide-prev) {
            transform: scale(1.1);
          }
          :deep(.swiper-slide-next) {
            transform: scale(1.1);
          }
        }
        .shadow-wrapper {
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
.safety-page {
  width: 100%;
  height: 100%;

  section {
    width: 100%;
    height: 100vh;
  }

  .safety-one-section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background: black;

    .safety-one-section-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -2;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .safety-one-section-bg-md {
      display: none;
    }

    .safety-one-section-shadow {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.85) 0%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }

    .safety-one-section-title {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: normal;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      margin-top: 2.95rem;
    }

    .safety-one-section-content {
      font-family: Saira;
      font-size: 0.16rem;
      font-weight: normal;
      line-height: 0.24rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      margin-top: 0.28rem;
    }

    .safety-one-section-desc {
      width: 6.02rem;
      height: 0.68rem;
      margin-top: 1.33rem;
    }
    .md-safety-one-section-desc {
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 0.8rem;
      .logo {
        width: 2.44rem;
      }
      .nesta {
        width: 1.65rem;
        margin-top: 0.3rem;
      }
    }
  }

  .safety-two-section {
    background-color: #000;
    height: 250vh;
    width: 100%;

    .safety-two-detail {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      border-radius: 0.1rem;
      overflow: hidden;

      .safety-two-detail-bg {
        width: 100%;
        height: 100vh;
        transform: scale(0.8);
        transition: all 1s ease;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0.1rem;
        }
      }

      .safety-two-detail-bg-show {
        transform: scale(1);
      }

      .safety-two-section-shadow {
        pointer-events: none;
        border-radius: 0.1rem;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.75);
        transition: all 1s ease;
        backdrop-filter: blur(0.05rem);
      }

      .safety-two-section-title {
        pointer-events: none;
        font-family: Saira;
        font-size: 0.52rem;
        font-weight: 500;
        line-height: 0.68rem;
        text-align: center;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        transition: all 1s ease;
      }
      .safety-two-section-desc {
        width: 100%;
        height: 100%;
        display: flex;
        pointer-events: none;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 0.4rem;
        line-height: 0.48rem;
        color: white;
        z-index: 3;
        transition: all 1s ease;
        p {
          margin-bottom: 0.24rem;
        }
      }
      .safety-two-section-intro {
        width: 100%;
        height: 100%;
        display: flex;
        pointer-events: none;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        transition: all 1s ease;
        .intro-wrapper {
          display: flex;
          .intro-item {
            margin-right: 0.16rem;
            .intro-item-img {
              width: 5.5rem;
              height: 2.9rem;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                margin-bottom: 0.2rem;
                transition: all 0.5s;
                &:hover {
                  transform: scale(var(--scale-img));
                }
              }
            }
            .intro-item-text {
              font-size: 0.2rem;
              line-height: 0.28rem;
              color: white;
              margin-top: 0.2rem;
            }
          }
        }
      }
    }
    .md-safety-two-detail {
      display: none;
    }
  }

  .safety-three-section {
    padding-top: 1.6rem;
    height: 8.46rem;
    background-color: #000;

    .safety-three-section-title {
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      margin-bottom: 1rem;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;

      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .safety-three-section-items {
      display: flex;
      align-items: center;
      justify-content: center;

      .safety-three-section-item {
        width: 5.5rem;
        height: 3.86rem;
        margin-right: 0.16rem;
        border-radius: 0.1rem;
        position: relative;
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
        overflow: hidden;

        &.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .safety-three-section-item-img {
          cursor: pointer;
          width: 100%;
          height: 100%;
          border-radius: 0.1rem;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.1rem;
            transition: transform 0.5s;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        &:hover {
          .safety-three-section-item-img img {
            transform: scale(var(--scale-img));
          }
        }

        .safety-three-section-item-title {
          position: absolute;
          bottom: 0.24rem;
          left: 0.24rem;
          z-index: 3;
          font-family: Saira;
          font-size: 0.2rem;
          font-weight: normal;
          line-height: 0.28rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .safety-three-section-item-shadow {
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, #090a0c 0%, #646464 100%);
          position: absolute;
          top: 0;
          left: 0;
        }

        .safety-three-section-item-footerShadow {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.87rem;
          opacity: 0.8;
          z-index: 2;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0.9) 100%
          );
        }
      }
    }
  }

  .safety-four-section {
    padding-top: 1.6rem;
    height: 7.43rem;
    background-color: #f7f7f7;

    .safety-four-section-title {
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #1a1a1a;
      margin-bottom: 0.96rem;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;

      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .safety-four-section-items {
      display: flex;
      align-items: center;
      justify-content: center;

      .safety-four-section-item {
        width: 5.5rem;
        height: 3.86rem;
        margin-right: 0.16rem;
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.8s ease, transform 0.8s ease;
        overflow: hidden;

        &.fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .safety-four-section-item-img {
          width: 100%;
          height: 3.36rem;
          border-radius: 0.1rem;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 0.1rem;
            transition: transform 0.5s;
          }
        }

        &:hover {
          .safety-four-section-item-img img {
            transform: scale(var(--scale-img));
          }
        }

        .safety-four-section-item-title {
          font-family: Saira;
          font-size: 0.18rem;
          font-weight: normal;
          line-height: 0.26rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #4d4d4d;
          margin-top: 0.16rem;
        }
      }
    }

    .line {
      width: 100%;
      height: 0.01rem;
      background-color: #ccc;
      margin-top: 0.2rem;
    }
  }

  .safety-five-section {
    height: 10.18rem;
    padding-top: 1.6rem;
    background-color: #f7f7f7;
    overflow: hidden;

    .safety-five-section-title {
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #1a1a1a;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;

      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .safety-five-section-content {
      margin-top: 0.8rem;
      position: relative;

      .swiper {
        .swiper-slide {
          display: flex;
          align-items: center;
          width: auto;
          transition: all 0.3s ease;

          .swiper-slide-item {
            margin-right: 0.16rem;
            width: 6.4rem;
            background-color: #ffffff;
            position: relative;
            cursor: none;
            overflow: hidden;
            opacity: 0;
            transform: translateY(0.5rem);
            transition: all 0.5s;
            &.fade-in {
              opacity: 1;
              transform: translateY(0);
            }

            .swiper-slide-item-img {
              width: 100%;
              height: 3.62rem;
              overflow: hidden;
              border-radius: 0.04rem 0.04rem 0 0;

              video {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }

            &:hover {
              .swiper-slide-item-img img {
                transform: scale(var(--scale-img));
              }
            }

            .swiper-slide-item-footer {
              padding: 0 0.4rem;
              width: 100%;

              .title {
                margin: 0.14rem 0 0.12rem;
                font-family: Saira;
                font-size: 0.24rem;
                font-weight: normal;
                line-height: 0.32rem;
                font-variation-settings: "opsz" auto;
                color: #333333;
              }

              .items {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.28rem;

                .item {
                  &::after {
                    display: none;
                  }
                  .top {
                    font-family: Saira;
                    font-size: 0.14rem;
                    font-weight: normal;
                    line-height: 0.22rem;
                    letter-spacing: 0px;
                    font-variation-settings: "opsz" auto;
                    color: #808080;
                  }

                  .bottom {
                    font-weight: 600;
                    font-family: Saira;
                    font-size: 0.32rem;
                    font-weight: 600;
                    line-height: 0.4rem;
                    font-variation-settings: "opsz" auto;
                    color: #333333;
                  }
                }
              }
            }
          }
        }
      }
    }

    .md-safety-five-section-content {
      display: none;
    }

    .five-swiper-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.4rem;

      :deep(.swiper-pagination-bullet) {
        width: 0.08rem;
        height: 0.08rem;
        background-color: #e5e5e5;
        border-radius: 0.05rem;
        margin-right: 0.08rem;
        transition: all 0.3s ease-in-out;
        opacity: 1;
      }

      :deep(.swiper-pagination-bullet-active) {
        background-color: #333333;
        width: 0.2rem;
        height: 0.08rem;
        border-radius: 0.04rem;
      }
    }
  }

  .safety-six-section {
    height: 10.18rem;
    background-size: 100% 100%;
    padding-top: 1.6rem;
    position: relative;
    .safety-six-section-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .safety-six-section-title {
      text-align: center;
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #cccccc;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;

      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }

      .title-p1 {
        font-family: Saira;
        font-size: 0.52rem;
        font-weight: normal;
        line-height: 0.6rem;
        text-align: center;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
        margin-bottom: 0.2rem;
        white-space: nowrap;
      }
    }

    .md-safety-six-section-bg {
      display: none;
    }

    .safety-six-section-img {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      position: relative;

      .certificate {
        position: absolute;
        bottom: 2.4rem;
        left: 0;
        width: 100%;

        .certificateSwiper {
          margin-left: 2%;
          width: auto;
          margin-right: 50%;
          .swiper {
            padding: 1rem 0;
            padding-left: 22%;
          }
          .swiper-slide {
            transition: all 0.5s;
            &.swiper-slide-active {
              opacity: 1;
              z-index: 3;
              transform: scale(1.5);
            }

            &.swiper-slide-prev {
              z-index: 2;
              transform: scale(1.2);
            }

            &.swiper-slide-next {
              z-index: 2;
              transform: scale(1.2);
            }
          }
        }
      }

      .car {
        width: 16.09rem;
        height: 8.23rem;
        margin-left: -3.79rem;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
    .md-safety-six-section-img {
      display: none;
    }
  }
}
</style>
