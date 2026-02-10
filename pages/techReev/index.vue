<template>
  <div class="tech-reev">
    <!-- 第一屏 -->
    <section
      class="tech-reev-one"
      :style="{
        '--bg1-image': handleBgImg(1),
        '--bg1-image-md': handleBgImg(1, true),
      }"
      ref="sectionOne"
    >
      <div class="tech-reev-one-title">
        <div class="tech-reev-one-title-bottom fade-in">
          Winning "China Top 10 Engine" for ten times <br />
          with 15 million units in 27 years
        </div>
      </div>
      <div class="tech-reev-one-center">
        <div
          class="tech-reev-one-center-wrapper"
          :style="{ transform: `translateX(${containerTransform}rem)` }"
        >
          <div
            class="tech-reev-one-center-item"
            v-for="(item, index) in centerList"
            @click="handleSelectCenterItem(index)"
            :key="index"
            :class="[
              !isClickable(index) && 'not-clickable',
              selectCenterItem === index && 'center-active',
              `center-item-${index + 1}`,
            ]"
            :style="{ opacity: 1 - Math.abs(selectCenterItem - index) / 5 }"
          >
            <div class="tech-reev-one-center-item-top">
              <div
                class="tech-reev-one-center-item-num"
                :class="{
                  'center-item-num-active': selectCenterItem === index,
                }"
                :style="{ opacity: item.num > 0 ? 1 : 0 }"
              >
                {{
                  (index === centerList.length - 1 ? ">" : "") + item.num + "%"
                }}
              </div>
              <div class="tech-reev-one-center-item-date">
                {{ item.date }}
              </div>
            </div>
            <div class="tech-reev-one-center-item-round">
              <div
                :class="[
                  'item-round',
                  selectCenterItem === index ? 'active' : '',
                ]"
              >
                <div class="item-round-inner"></div>
              </div>
              <!-- <BaseImg
                src="explorationImage/round.png"
                class="round"
                alt=""
                v-if="selectCenterItem != index"
              />
              <BaseImg
                class="center-item-round-active"
                src="explorationImage/runSelect.png"
                alt=""
                v-else
              /> -->
            </div>
            <div class="tech-reev-one-center-item-bottom">
              <div class="tech-reev-one-center-item-desc" v-if="item.desc">
                {{ item.desc }}
              </div>
              <div class="tech-reev-one-center-item-img" v-if="item.img">
                <BaseImg :src="item.img" alt="" />
              </div>
              <div class="tech-reev-one-center-item-power" v-if="item.power">
                {{ item.power }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tech-reev-one-counter" ref="counterRef"></div>
    </section>
    <!-- 第二屏 -->
    <section
      class="tech-reev-two"
      ref="sectionTwo"
      :style="{
        '--bg2-image': handleBgImg(2),
        '--bg2-image-md': handleBgImg(2, true),
      }"
    >
      <div
        class="tech-reev-two-title"
        :class="{ 'fade-in': sectionTwoVisible }"
      >
        2024 China Top 10 Powertrain
      </div>
      <div class="tech-reev-two-content">
        <span
          class="tech-reev-two-content-num"
          :class="{ 'roll-in': sectionTwoVisible }"
          >{{ displayNumber }}</span
        >
        <span class="tech-reev-two-content-unit">%</span>
      </div>
      <div class="tech-reev-two-desc" :class="{ 'fade-in': sectionTwoVisible }">
        of engine thermal efficiency
      </div>
      <div class="tech-reev-two-img" :class="{ 'fade-in': sectionTwoVisible }">
        <BaseImg src="explorationImage/Powertrain.png" alt="" />
      </div>
    </section>

    <!-- 第三屏 -->
    <section
      class="new-tech-three"
      ref="sectionThree"
      :style="{
        '--bg3-image': handleBgImg(3),
        '--bg3-image-md': handleBgImg(3, true),
      }"
    >
      <div
        class="new-tech-three-title"
        :class="{ 'fade-in': sectionThreeVisible }"
      >
        Industry-leading Oil to Electricity Conversion Efficiency
      </div>
      <div class="new-tech-three-content">
        <span class="new-tech-three-num">
          {{ displayThreeNumber }}
        </span>
        <p class="new-tech-three-unit">
          <span>k</span>
          <span>W</span>
          <span>h</span>
          <span>/</span>
          <span>L</span>
        </p>
      </div>

      <div class="three-items" :class="{ 'fade-in': showThreeItems }">
        <div class="three-item" :class="{ 'fade-in': showThreeItems }">
          <div class="three-item-top">
            1L petrol
            <br />
            for 3 kWh
          </div>
          <div class="three-item-bottom">2021</div>
        </div>
        <div class="three-item" :class="{ 'fade-in': showThreeItems }">
          <div class="three-item-top">
            1L petrol
            <br />
            for 3.3 kWh
          </div>
          <div class="three-item-bottom">2023</div>
        </div>
        <div class="three-item" :class="{ 'fade-in': showThreeItems }">
          <div class="three-item-top">
            1L petrol
            <br />
            for 3.4 kWh
          </div>
          <div class="three-item-bottom">2024</div>
        </div>
      </div>
    </section>
    <!-- 第四屏 -->
    <section class="tech-reev-four" ref="sectionFour">
      <div class="tech-reev-four-bg">
        <video
          src="https://cms-uat.obs.ap-southeast-1.myhuaweicloud.com/platform/public/video/20250407-175716.mp4"
          muted
          preload="metadata"
          loop
          :poster="`${config.public.staticURL}/images/explorationImage/fourBg.png`"
          webkit-playsinline
          playsinline
          autoplay
        ></video>
      </div>
      <div class="tech-reev-four-shadow-top"></div>
      <div class="tech-reev-four-shadow-bottom"></div>
      <div
        class="tech-reev-four-title"
        :class="{ 'fade-in': sectionFourVisible }"
      >
        EXLANTIX ET<br />Industry-Leading Quietness
      </div>
      <div
        class="tech-reev-four-desc"
        :class="{ 'fade-in': sectionFourVisible }"
      >
        With its precision-tuned NVH (Noise, Vibration, and Harshness)
        calibration and comprehensive
        <div>
          acoustic engineering package ET delivers an unparalleled silent
          driving experience
        </div>
      </div>
      <div class="tech-reev-four-footer">
        <div
          class="tech-reev-four-footer-item"
          :class="{ 'fade-in': sectionFourVisible }"
          v-for="(item, index) in fourFooterList"
          :key="index"
        >
          <div class="tech-reev-four-footer-item-title">
            {{ item.title }}
          </div>
          <div class="tech-reev-four-footer-item-desc" v-html="item.desc"></div>
        </div>
      </div>
    </section>
    <!-- 第五屏 -->
    <section
      class="tech-reev-five"
      ref="sectionFive"
      :style="{
        '--bg5-image': handleBgImg(5),
        '--bg5-image-md': handleBgImg(5, true),
      }"
    >
      <div class="five-title" :class="{ 'fade-in': sectionFiveVisible }">
        Undoubtedly Long Comprehensive Range
      </div>
      <div class="five-content">
        <div
          class="five-content-item"
          :class="{ 'fade-in': sectionFiveVisible }"
          style="--animation-delay: 0.2s"
        >
          <span class="five-content-item-num">41kWh</span>
          <p class="five-content-item-desc">240km of Pure Electric Range</p>
        </div>
        <div
          class="five-content-item"
          :class="{ 'fade-in': sectionFiveVisible }"
          style="--animation-delay: 0.4s"
        >
          <span class="five-content-item-num">1500km</span>
          <p class="five-content-item-desc">Super Range</p>
        </div>
      </div>
      <div class="five-footer" :class="{ 'fade-in': sectionFiveVisible }">
        <BaseImg class="pc-only" src="explorationImage/sevenIcon.png" alt="" />
        <BaseImg class="mb-only" src="explorationImage/five-mb.png" alt="" />
      </div>
    </section>

    <!-- 第六屏 -->
    <section
      class="tech-reev-six"
      ref="sectionSix"
      :style="{
        '--bg6-image': handleBgImg(6),
        '--bg6-image-md': handleBgImg(6, true),
      }"
    >
      <div class="six-title">
        <div class="six-title-top" :class="{ 'fade-in': sectionSixVisible }">
          Peer-leading Recharging Efficiency
        </div>
        <div class="six-title-bottom" :class="{ 'fade-in': sectionSixVisible }">
          144 kilometers in 17.5 minutes on a charge
        </div>
      </div>
      <div
        class="Peer-leading"
        :class="{ 'fade-in': sectionSixVisible }"
        @mouseenter="isShowSix = true"
        @mouseleave="isShowSix = false"
      >
        <BaseImg
          class="pc-only"
          src="explorationImage/Peer-leading.png"
          alt=""
        />
        <BaseImg class="mb-only" src="explorationImage/six-mb.png" alt="" />
        <Play :isShow="isShowSix" @on-play-click="onSixPlayClick" />
      </div>
      <div class="six-footer">
        <div
          :class="[
            'six-footer-item',
            footerItemsVisible[index] ? 'fade-in' : '',
          ]"
          v-for="(item, index) in sixFooterList"
          :key="index"
        >
          <div class="six-footer-item-title">
            {{ item.title }}
          </div>
          <div class="six-footer-item-desc">
            {{ item.desc }}
          </div>
        </div>
      </div>
    </section>
    <!-- 第六屏夹屏 -->
    <section class="tech-reev-six-half">
      <AutoPlayer :autoPlayerList="autoPlayerList" />
    </section>
    <!-- 第七屏 -->
    <section class="tech-reev-seven" ref="sectionSeven">
      <div class="seven-title" :class="{ 'fade-in': sectionSevenVisible }">
        Validated a 20%<br />Industry-leading Lifespan
      </div>
      <div class="seven-desc" :class="{ 'fade-in': sectionSevenVisible }">
        Rigorous and Reliable Serial Tests of 100,000 kilometers, Vibration and
        Water Immersion
      </div>

      <div class="seven-items-img">
        <Swiper
          :modules="[Pagination]"
          :pagination="{
            el: '.swiper-pagination',
            clickable: true,
          }"
          :loop="false"
          :speed="1000"
          :slidesPerView="3.3"
          :slidesOffsetBefore="120"
          :spaceBetween="20"
          style="position: relative; padding-bottom: 0.5rem"
        >
          <SwiperSlide v-for="item in sevenList" :key="item.id">
            <div class="slide-item">
              <video
                v-if="item.type === 'video'"
                :src="item.url"
                muted
                preload="metadata"
                loop
                webkit-playsinline
                playsinline
                :poster="`${config.public.staticURL}/images/${item.src}`"
                autoplay
              ></video>
              <BaseImg :src="item.src" v-if="item.type === 'img'" />
              <div class="img-text">{{ item.text }}</div>
            </div>
          </SwiperSlide>
          <div class="swiper-pagination"></div>
        </Swiper>
      </div>
      <div class="md-seven-items-img">
        <div
          class="img-free"
          v-for="item in sevenList.slice(0, 3)"
          :key="item.id"
        >
          <BaseImg :src="item.src" />
          <div class="img-text">{{ item.text }}</div>
        </div>
        <div class="md-img-title">Kunpeng Battery through Rigorous Tests</div>
        <Swiper
          :modules="[EffectFade, Pagination]"
          effect="fade"
          :loop="false"
          :slidesPerView="1"
          :fadeEffect="{
            crossFade: true,
          }"
          :pagination="{
            el: '.md-seven-swiper-pagination',
            clickable: true,
          }"
        >
          <SwiperSlide v-for="item in sevenList.slice(3, 8)" :key="item.id">
            <div class="slide-item-md">
              <video
                v-if="item.type === 'video'"
                :src="item.url"
                muted
                preload="metadata"
                loop
                webkit-playsinline
                playsinline
                :poster="`${config.public.staticURL}/images/${item.src}`"
                autoplay
              ></video>
              <BaseImg :src="item.src" v-if="item.type === 'img'" />
            </div>
            <div class="img-text">{{ item.text }}</div>
          </SwiperSlide>
          <div class="md-seven-swiper-pagination"></div>
        </Swiper>
      </div>
    </section>
  </div>
  <YoutubePlayer
    :isShow="isShowYoutubePlayer"
    :url="youtubeUrl"
    @close="onYoutubeClose"
  />
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Pagination } from "swiper/modules";
import { Fetch } from "@/utils/common";

const config = useRuntimeConfig();
const centerList = ref([
  {
    num: 0,
    desc: "Widespread adoption of the 2nd generation of engines",
    img: "",
    date: "2014",
    transform: [-9],
  },
  {
    num: 0,
    desc: "Launch of the full family of engines of the 3rd generation",
    img: "",
    date: "2016",
    transform: [-6],
  },
  {
    num: "37.5",
    desc: "",
    img: "explorationImage/tgdi-2019.png",
    date: "2019",
    power: "1.4TGDI",
    transform: [-3],
  },
  {
    num: "38",
    desc: "",
    img: "explorationImage/tgdi-2021.png",
    date: "2021",
    power: "2.0TGDI",
    transform: [0],
  },
  {
    num: "44.5",
    desc: "",
    img: "explorationImage/tgdi-2021-reev.png",
    date: "2021",
    power: `1.5TGDI(for REEV)`,
    transform: [3],
  },
  {
    num: "46",
    desc: "Next generation of high thermal efficiency engines",
    img: "",
    date: "Future",
    transform: [6],
  },
]);

const sevenList = reactive([
  {
    id: 1,
    src: "explorationImage/seven1.png",
    text: "24-hour Intelligent Care",
    type: "img",
  },
  {
    id: 2,
    src: "explorationImage/seven2.png",
    text: "Remained Intact After 39-hour Vibration Test",
    type: "img",
  },
  {
    id: 3,
    src: "explorationImage/seven3.png",
    text: "Water Immersion for 48 hours > 30 Minutes (IPX8)",
    type: "img",
  },
  {
    id: 4,
    src: "explorationImage/seven4.png",
    text: "Drop of 4.9m, +390%",
    type: "img",
  },
  {
    id: 5,
    src: "explorationImage/seven5.png",
    text: "Squeezing for 200kN, +100%",
    type: "video",
    url: "https://cms-uat.obs.ap-southeast-1.myhuaweicloud.com/platform/public/video/20250407-175629.mp4",
  },
  {
    id: 6,
    src: "explorationImage/seven6.png",
    text: "Underbody Scratch, Double 40, +120%",
    type: "img",
  },
  {
    id: 7,
    src: "explorationImage/seven7.png",
    text: "Bottom Ball Impact of 33kN, +65%",
    type: "img",
  },
  {
    id: 8,
    src: "explorationImage/seven8.png",
    text: "1s Rapid Directed Pressure Relief",
    type: "img",
  },
]);

const selectCenterItem = ref(3);
const containerTransform = ref(0);
let itemWidth = 3;

const isShowSix = ref(false);
const isShowYoutubePlayer = ref(false);
const youtubeUrl = ref("https://www.youtube.com/embed/8Istay-crt8?");

const counterRef = ref();

const autoPlayerList = ref([]);

const getUrlParam = (url, str) => {
  const address = new URL(url);
  const searchParams = new URLSearchParams(address.search);
  return searchParams.get(str);
};

const handleBgImg = (index, isMd) => {
  return `url(${config.public.staticURL}/images/tech/reev/reev-bg${
    isMd ? index + "-md" : index
  }.png)`;
};

const getData = () => {
  Fetch("Reev-s7").then((data) => {
    autoPlayerList.value = data.map((item) => {
      return {
        id: item.id,
        src: item.image,
        name: item.title,
        mdSrc: item.imageMobile,
        url: `https://www.youtube.com/embed/${getUrlParam(item.url, "v")}?`,
      };
    });
  });
};

const onSixPlayClick = () => {
  isShowYoutubePlayer.value = true;
};

const onYoutubeClose = () => {
  isShowYoutubePlayer.value = false;
};

const isClickable = (index) => {
  if (selectCenterItem.value === null) return true;
  return Math.abs(index - selectCenterItem.value) === 1;
};

const handleSelectCenterItem = (index) => {
  // 如果点击的是当前项，直接返回，不做任何操作
  if (index === selectCenterItem.value) return;

  // 点击相邻项，整体向左偏移
  const offset = index - selectCenterItem.value;
  containerTransform.value -= offset * itemWidth;
  selectCenterItem.value = index;
  // 触发数字滚动动画
  startItemNumberRoll(index);
};

// 添加数字滚动动画函数
const startItemNumberRoll = (index) => {
  const targetItem = centerList.value[index];
  if (!targetItem || !targetItem.num || targetItem.num === 0) return;
  const targetNumber = parseFloat(targetItem.num);
  let startValue = 0;
  const duration = 1000; // 动画持续1秒
  const startTime = Date.now();

  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // 使用缓动函数使动画更平滑
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue =
      startValue + (targetNumber - startValue) * easeOutQuart;
    // 更新数字
    centerList.value[index] = {
      ...centerList.value[index],
      num: currentValue.toFixed(1),
    };

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 确保最终值精确
      centerList.value[index] = {
        ...centerList.value[index],
        num: targetNumber.toString(),
      };
    }
  };

  animate();
};

const sixFooterList = [
  {
    title: "2.4C",
    desc: "Peak charging rate",
  },
  {
    title: "110kW",
    desc: "Supercharging power",
  },
  {
    title: "17.5min",
    desc: "SOC 20%-80%",
  },
];

const fourFooterList = [
  {
    title: "0.5 Decibels",
    desc: "The noise difference between<br>EV and REEV modes inside the cabin",
  },
  {
    title: "1-2 Decibels",
    desc: "Outperforming the<br>industry benchmark",
  },
];

// 添加各个section的ref
const sectionOne = ref(null);
const sectionOneVisible = ref(false);
const sectionTwo = ref(null);
const sectionThree = ref(null);
const sectionFour = ref(null);
const sectionSix = ref(null);
const sectionFive = ref(null);
const sectionSeven = ref(null);
const sectionTwoVisible = ref(false);
const sectionThreeVisible = ref(false);
const sectionFourVisible = ref(false);
const sectionSixVisible = ref(false);
const sectionFiveVisible = ref(false);
const sectionSevenVisible = ref(false);

// 添加footer items的可视状态
const footerItemsVisible = ref([false, false, false]);
// 添加数字滚动相关的状态
const displayNumber = ref(0);
const targetNumber = 44.5;
const isNumberRolling = ref(false);
// 数字滚动动画函数
const startNumberRoll = () => {
  if (isNumberRolling.value) return;
  isNumberRolling.value = true;
  const duration = 2500; // 增加动画持续时间到2.5秒
  const startTime = Date.now();
  const startValue = 0;
  const endValue = targetNumber;
  const animate = () => {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // 使用更平滑的缓动函数
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    const currentValue = startValue + (endValue - startValue) * easeOutQuart;
    // 使用更精确的数值计算
    displayNumber.value = Number(currentValue.toFixed(1));
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isNumberRolling.value = false;
      displayNumber.value = endValue; // 确保最终值精确
    }
  };
  animate();
};
// 监听 sectionTwoVisible 变化
watch(sectionTwoVisible, (newVal) => {
  if (newVal) {
    // 重置数字
    displayNumber.value = 0;
    nextTick(() => {
      startNumberRoll();
    });
  }
});

// 标记是否是首次加载
let isInitialScroll = true;

// 监听section进入可视区域
const observeSection = (section) => {
  const sectionMap = {
    Seven: sectionSevenVisible,
    Five: sectionFiveVisible,
    Six: sectionSixVisible,
    Four: sectionFourVisible,
    Three: sectionThreeVisible,
    Two: sectionTwoVisible,
    One: sectionOneVisible,
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (isInitialScroll) return;

        const sectionRef = sectionMap[section];
        if (!sectionRef) return;

        if (entry.isIntersecting) {
          sectionRef.value = false;
          nextTick(() => {
            sectionRef.value = true;
          });
        } else {
          sectionRef.value = false;
        }
      });
    },
    {
      threshold: [0.3],
    }
  );

  return observer;
};

// 监听footer items进入可视区域
const observeFooterItems = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          footerItemsVisible.value[index] = false;
          nextTick(() => {
            footerItemsVisible.value[index] = true;
          });
        } else {
          footerItemsVisible.value[
            parseInt(entry.target.dataset.index)
          ] = false;
        }
      });
    },
    { threshold: [0.3] }
  );

  return observer;
};

// 在 script setup 部分添加
const displayThreeNumber = ref(0);
const isThreeNumberRolling = ref(false);
const showThreeItems = ref(false);
const isAnimating = ref(false); // 添加动画锁
let animationTimers = []; // 添加定时器数组

const startThreeNumberRoll = () => {
  if (isAnimating.value) return; // 如果正在动画中，直接返回
  isAnimating.value = true;

  // 清除之前的定时器
  animationTimers.forEach((timer) => clearTimeout(timer));
  animationTimers = [];

  // 重置所有状态
  isThreeNumberRolling.value = true;
  showThreeItems.value = false;
  displayThreeNumber.value = 0;

  const startTime = Date.now();
  const animatePhase = () => {
    if (!isThreeNumberRolling.value || !sectionThreeVisible.value) {
      isAnimating.value = false;
      return;
    }

    const progress = Math.min((Date.now() - startTime) / 1000, 1);
    displayThreeNumber.value = Number(
      (3.4 * (1 - Math.pow(1 - progress, 4))).toFixed(1)
    );

    if (progress < 1) {
      requestAnimationFrame(animatePhase);
    } else {
      displayThreeNumber.value = 3.4;
      isThreeNumberRolling.value = false;
      if (sectionThreeVisible.value) {
        showThreeItems.value = true;
        isAnimating.value = false;
      }
    }
  };
  animatePhase();
};

// 监听 sectionThreeVisible 变化
watch(sectionThreeVisible, (newVal) => {
  if (newVal) {
    // 清除之前的定时器
    animationTimers.forEach((timer) => clearTimeout(timer));
    animationTimers = [];

    // 重置所有状态
    displayThreeNumber.value = 0;
    isThreeNumberRolling.value = false;
    showThreeItems.value = false;
    isAnimating.value = false;

    // 开始动画
    nextTick(() => {
      startThreeNumberRoll();
    });
  } else {
    // 清除所有定时器
    animationTimers.forEach((timer) => clearTimeout(timer));
    animationTimers = [];

    // 重置所有状态
    isThreeNumberRolling.value = false;
    showThreeItems.value = false;
    displayThreeNumber.value = 0;
    isAnimating.value = false;
  }
});

onMounted(() => {
  const rootElement = document.documentElement;
  const computedStyle = window.getComputedStyle(rootElement);
  const fontSize = parseFloat(computedStyle.fontSize);

  itemWidth = (counterRef.value?.offsetWidth || 0) / fontSize;

  getData();

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  setTimeout(() => {
    isInitialScroll = false;
  }, 100);

  // 只设置初始选中项，不改变位置
  selectCenterItem.value = 3;

  const sections = [
    { ref: sectionOne.value, name: "One" },
    { ref: sectionTwo.value, name: "Two" },
    { ref: sectionThree.value, name: "Three" },
    { ref: sectionFour.value, name: "Four" },
    { ref: sectionSix.value, name: "Six" },
    { ref: sectionFive.value, name: "Five" },
    { ref: sectionSeven.value, name: "Seven" },
  ];

  const observers = sections.map(({ ref, name }) => {
    const observer = observeSection(name);
    if (ref) observer.observe(ref);
    return observer;
  });

  const footerObserver = observeFooterItems();
  document.querySelectorAll(".six-footer-item").forEach((item, index) => {
    item.dataset.index = index;
    footerObserver.observe(item);
  });

  return () => {
    observers.forEach((observer) => observer.disconnect());
    footerObserver.disconnect();
  };
});
</script>
<style scoped lang="scss">
.tech-reev {
  box-sizing: border-box;

  section {
    width: 100%;
    min-height: 100vh;
    height: auto;
    //height: 10.8rem;
    position: relative;
    background-color: #000;
    overflow: hidden;
    @media screen and (max-width: 1024px) {
      height: 100vh;
    }
  }

  .tech-reev-one {
    padding: 2.4rem 0 0;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: var(--bg1-image);
    @media screen and (max-width: 1024px) {
      padding: 1.2rem 0 0;
      background-image: var(--bg1-image-md);
    }

    .tech-reev-one-title {
      // margin: auto;
      text-align: center;
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      @media screen and (max-width: 1024px) {
        font-size: 0.26rem;
        line-height: 0.3rem;
        // text-align: center;
        margin: 0 0.1rem;
      }

      // .tech-reev-one-title-top {
      //     white-space: nowrap;
      //     opacity: 0;
      //     transform: translateY(40px);

      //     &.fade-in {
      //         animation: fadeInUp 0.8s ease-out forwards;
      //     }
      // }

      .tech-reev-one-title-bottom {
        opacity: 0;
        transform: translateY(0.4rem);

        &.fade-in {
          animation: fadeInUp 0.8s ease-out forwards 0.2s;
        }
      }
    }

    .tech-reev-one-center {
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      transition: transform 0.3s ease-in-out;
      padding: 0 1.4rem;
      min-height: 5rem;
      position: relative;
      @media screen and (max-width: 1024px) {
        padding: 0;
      }

      .tech-reev-one-center-wrapper {
        width: 2.2rem;
        position: relative;
        transition: all 0.5s;
        @media screen and (max-width: 1024px) {
          width: 1.6rem;
        }
      }

      .tech-reev-one-center-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        transition: all 0.5s;

        .tech-reev-one-center-item-round {
          margin: 0.1rem 0;
          height: 0.56rem;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
          .item-round {
            width: 0.15rem;
            height: 0.15rem;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: white;
          }
          .item-round.active {
            width: 0.35rem;
            height: 0.35rem;
            border: 2px solid #fff;
            background: rgb(86, 87, 91);

            .item-round-inner {
              width: 0.15rem;
              height: 0.15rem;
              border-radius: 50%;
              background: white;
            }
          }

          &::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 4rem;
            height: 1px;
            background: rgb(59, 60, 62);
            transform: translateY(-50%);
            pointer-events: none;
            z-index: -1;
          }

          .round {
            width: 0.09rem;
            height: 0.09rem;
            position: relative;
            z-index: 2;
            background: #fff;
            border-radius: 50%;
          }

          .center-item-round-active {
            width: 0.12rem;
            height: 0.12rem;
            position: relative;
            z-index: 2;
          }
        }

        &:last-child {
          .tech-reev-one-center-item-round::before {
            display: none;
          }
        }

        .tech-reev-one-center-item-top {
          font-family: Saira;
          font-size: 0.2rem;
          font-weight: 300;
          line-height: 0.48rem;
          text-align: center;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          /* 黑色/黑色2 */
          color: #cccccc;

          .tech-reev-one-center-item-num {
            @media screen and (max-width: 1024px) {
              font-size: 0.25rem;
              line-height: 0.3rem;
            }
          }

          .center-item-num-active {
            font-family: Saira;
            font-size: 0.4rem;
            font-weight: 500;
            line-height: 0.48rem;
            text-align: center;
            letter-spacing: 0em;
            font-variation-settings: "opsz" auto;
            /* 主色/EXEED2 */
            color: #e3bea4;
            @media screen and (max-width: 1024px) {
              font-size: 0.25rem;
              line-height: 0.3rem;
            }
          }

          .tech-reev-one-center-item-date {
            font-family: Saira;
            font-size: 0.18rem;
            font-weight: 300;
            line-height: 0.26rem;
            text-align: center;
            letter-spacing: 0px;
            font-variation-settings: "opsz" auto;
            color: rgba(255, 255, 255, 0.6);
            @media screen and (max-width: 1024px) {
              font-size: 0.14rem;
              line-height: 0.21rem;
            }
          }
        }

        .tech-reev-one-center-item-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;

          .tech-reev-one-center-item-img {
            width: 2.2rem;
            height: 2.4rem;
            @media screen and (max-width: 1024px) {
              width: 1.6rem;
              height: auto;
            }

            img {
              width: 100%;
              height: 100%;
            }
          }

          .tech-reev-one-center-item-desc {
            font-size: 0.16rem;
            font-weight: normal;
            line-height: 150%;
            text-align: center;
            letter-spacing: 0em;
            font-variation-settings: "opsz" auto;
            /* 黑色/黑色4 */
            color: #808080;
            width: 2.2rem;
            @media screen and (max-width: 1024px) {
              font-size: 0.14rem;
            }
          }

          .tech-reev-one-center-item-power {
            font-family: Saira;
            font-size: 0.16rem;
            font-weight: normal;
            line-height: 0.24rem;
            text-align: center;
            letter-spacing: 0px;
            font-variation-settings: "opsz" auto;
            /* 黑色/黑色4 */
            color: #808080;
            margin-top: 0.1rem;
          }
        }
      }
      .center-item-1 {
        transform: translateX(-9rem);
        @media screen and (max-width: 1024px) {
          transform: translateX(-6rem);
        }
      }
      .center-item-2 {
        transform: translateX(-6rem);
        @media screen and (max-width: 1024px) {
          transform: translateX(-4rem);
        }
      }
      .center-item-3 {
        transform: translateX(-3rem);
        @media screen and (max-width: 1024px) {
          transform: translateX(-2rem);
        }
      }
      .center-item-4 {
        transform: translateX(0);
      }
      .center-item-5 {
        transform: translateX(3rem);
        @media screen and (max-width: 1024px) {
          transform: translateX(2rem);
        }
      }
      .center-item-6 {
        transform: translateX(6rem);
        @media screen and (max-width: 1024px) {
          transform: translateX(4rem);
        }
      }
    }
    .tech-reev-one-counter {
      width: 3rem;
      height: 0.01rem;
      position: absolute;
      pointer-events: none;
      @media screen and (max-width: 1024px) {
        width: 2rem;
      }
    }
  }

  .tech-reev-two {
    height: auto;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    padding-top: 1.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: var(--bg2-image);
    @media screen and (max-width: 1024px) {
      background-image: var(--bg2-image-md);
      padding-top: 0.8rem;
      padding-bottom: 0.5rem;
      min-height: auto;
      height: fit-content;
    }

    .tech-reev-two-title {
      font-size: 0.52rem;
      font-weight: 500;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      opacity: 0;
      transform: translateY(0.4rem);
      @media screen and (max-width: 1024px) {
        font-size: 0.26rem;
        line-height: 0.3rem;
        // text-align: center;
        margin: 0 0.2rem;
      }
      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
      }
    }

    .tech-reev-two-content {
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      font-variation-settings: "opsz" auto;
      margin-top: 0.5rem;
      @media screen and (max-width: 1024px) {
        margin-top: 0.6rem;
      }
      .tech-reev-two-content-num {
        background: linear-gradient(
          180deg,
          #e6eeff -79%,
          #d8e4ff 40%,
          #50545e 87%,
          #50545e 143%
        );
        color: transparent;
        background-clip: text;
        font-family: Poppins;
        font-weight: 700;
        font-size: 2.58rem;
        font-variation-settings: "opsz" auto;
        line-height: 2.85rem;
        display: inline-block;
        @media screen and (max-width: 1024px) {
          font-size: 0.86rem;
          line-height: 0.86rem;
        }
      }

      .tech-reev-two-content-unit {
        font-family: Poppins;
        font-weight: 700;
        font-size: 1.3rem;
        font-variation-settings: "opsz" auto;
        color: transparent;
        background: linear-gradient(
          180deg,
          #e6eeff -79%,
          #d8e4ff 40%,
          #50545e 87%,
          #50545e 143%
        );
        background-clip: text;
        @media screen and (max-width: 1024px) {
          font-size: 0.86rem;
        }
      }
    }

    .tech-reev-two-desc {
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: rgba(255, 255, 255, 0.8);
      opacity: 0;
      transform: translateY(0.4rem);
      @media screen and (max-width: 1024px) {
        font-size: 0.14rem;
        margin-top: 0.1rem;
      }
      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards 0.2s;
      }
    }

    .tech-reev-two-img {
      width: 8.69rem;
      height: 4.87rem;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(1rem) scale(0.8);
      transition: all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      @media screen and (max-width: 1024px) {
        margin-top: 0.3rem;
        margin-left: 0.24rem;
        margin-right: 0.24rem;
        width: unset;
        height: unset;
      }
      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }

      img {
        width: 100%;
        height: 100%;
        transform: scale(1.6);
      }
    }
  }

  .new-tech-three {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1.6rem;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-image: var(--bg3-image);
    @media screen and (max-width: 1024px) {
      background-image: var(--bg3-image-md);
      padding-top: 0.8rem;
      padding-bottom: 0.5rem;
      height: fit-content;
      min-height: auto;
    }

    .new-tech-three-title {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      opacity: 0;
      transform: translateY(0.4rem);
      @media screen and (max-width: 1024px) {
        font-size: 0.26rem;
        line-height: 0.3rem;
        // text-align: center;
        margin: 0 0.2rem;
      }
      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
      }
    }

    .new-tech-three-content {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      font-family: Poppins;
      font-size: 2.36rem;
      font-weight: 600;
      line-height: 127%;
      text-align: center;
      letter-spacing: 0em;
      font-variation-settings: "opsz" auto;
      position: relative;
      overflow: visible;
      margin-top: 0.4rem;
      @media screen and (max-width: 1024px) {
        font-size: 0.7rem;
        margin-top: 0;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
      .new-tech-three-num {
        font-size: 2.36rem;
        margin-top: 0.6rem;
        transition: all 2s cubic-bezier(0.34, 1.56, 0.64, 1);
        background: linear-gradient(
          180deg,
          #e6eeff 0%,
          #d8e4ff 53%,
          #50545e 78%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        transform-origin: center;
        display: inline-block;
        will-change: transform, font-size;
        @media screen and (max-width: 1024px) {
          font-size: 1rem;
        }
      }

      .new-tech-three-unit {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        background: linear-gradient(
          180deg,
          #e6eeff 0%,
          #d8e4ff 53%,
          #50545e 78%
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        display: inline-block;
        transition: width 3s cubic-bezier(0.34, 1.56, 0.64, 1);
        @media screen and (max-width: 1024px) {
          font-size: 0.6rem;
          line-height: 0.8rem;
        }
        span {
          display: inline-block;
        }
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(-0.2rem);
      }

      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .three-items {
      display: flex;
      align-items: center;
      height: 2.48rem;
      margin-top: -0.8rem;
      opacity: 0;
      transform: translateY(0.2rem);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      @media screen and (max-width: 1024px) {
        margin-top: -0.3rem;
        display: unset;
        height: auto;
      }
      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }

      .three-item {
        width: 3.7rem;
        height: 2.48rem;
        margin: 0.06rem 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 0;
        border-radius: 0.04rem;
        opacity: 0;
        transform: translateY(0.4rem);
        background: linear-gradient(180deg, #2e333d 0%, #14171d 100%);
        @media screen and (max-width: 1024px) {
          width: 3.35rem;
          height: fit-content;
          font-family: Saira;
          font-size: 0.2rem;
          font-weight: 500;
          line-height: 0.36rem;
          letter-spacing: normal;
          /* 主色/EXEED2 */
          color: #e3bea4;
          margin-bottom: 0.12rem;
          padding: 0.12rem 0;
        }
        &.fade-in {
          animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        &:nth-child(1) {
          animation-delay: 0.2s;
        }

        &:nth-child(2) {
          animation-delay: 0.4s;
        }

        &:nth-child(3) {
          animation-delay: 0.6s;
        }

        .three-item-top {
          font-family: Saira;
          font-size: 0.26rem;
          font-weight: normal;
          line-height: 0.3rem;
          text-align: center;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          color: #e3bea4;
          @media screen and (max-width: 1024px) {
            font-size: 0.2rem;
            line-height: 0.28rem;
            width: 2.2rem;
            br {
              display: none;
            }
          }
          .kwh {
            white-space: nowrap;
          }
        }

        .three-item-bottom {
          margin-top: 0.11rem;
          font-family: Saira;
          font-size: 0.2rem;
          font-weight: normal;
          line-height: 0.28rem;
          text-align: center;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: rgba(255, 255, 255, 0.4);
          @media screen and (max-width: 1024px) {
            font-size: 0.14rem;
            line-height: 0.2rem;
            width: 2.2rem;
            color: #cccccc;
          }
        }
      }

      .three-item-1 {
        margin: 0 0.16rem;
      }
    }
  }

  .tech-reev-four {
    padding-top: 1rem;

    .tech-reev-four-bg {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;

      img {
        width: 100%;
        height: 100%;
      }
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .tech-reev-four-shadow-top {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 45%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.98) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      @media screen and (max-width: 1024px) {
      }
    }
    .tech-reev-four-shadow-bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 1;
      width: 100%;
      height: 45%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.98) 100%
      );
    }

    .tech-reev-four-title {
      position: relative;
      z-index: 2;
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      white-space: nowrap;
      opacity: 0;
      transform: translateY(0.4rem);
      br {
        display: none;
      }
      @media screen and (max-width: 1024px) {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin: 0 0.2rem;
        text-align: center;
        letter-spacing: normal;
        // max-width: 90%;
        white-space: normal;
        br {
          display: block;
        }
      }
      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
      }
    }

    .tech-reev-four-desc {
      position: relative;
      z-index: 2;
      text-align: center;
      margin-top: 0.2rem;
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: rgba(255, 255, 255, 0.8);
      opacity: 0;
      transform: translateY(0.4rem);
      @media screen and (max-width: 1024px) {
        font-size: 0.14rem;
        font-family: Saira;
        font-weight: normal;
        line-height: 0.2rem;
        text-align: center;
        letter-spacing: normal;
        /* 黑色/黑色3 */
        color: #b2b2b2;
        // line-height: 0.2rem;
        margin: 0.08rem 0.2rem;
      }
      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards 0.2s;
      }
    }

    .tech-reev-four-footer {
      position: absolute;
      left: 50%;
      bottom: 1.2rem;
      transform: translateX(-50%);
      z-index: 2;
      display: flex;
      justify-content: space-between;
      margin: 0 auto;
      @media screen and (max-width: 1024px) {
        display: unset;
        margin-top: 0.32rem;
        bottom: unset;
      }
      .tech-reev-four-footer-item {
        width: 5.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        opacity: 0;
        transform: translateY(0.4rem);
        @media screen and (max-width: 1024px) {
          width: 3.2rem;
          margin: 0.2rem 0.2rem;
        }
        &.fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        &:nth-child(1) {
          animation-delay: 0.2s;
        }

        &:nth-child(2) {
          animation-delay: 0.4s;
        }

        .tech-reev-four-footer-item-title {
          font-family: Saira;
          font-size: 0.46rem;
          font-weight: 500;
          line-height: 0.54rem;
          text-align: center;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          color: #e3bea4;
          margin-bottom: 0.16rem;
          @media screen and (max-width: 1024px) {
            font-size: 0.26rem;
            line-height: 0.3rem;
            margin-bottom: 0.06rem;
          }
        }

        .tech-reev-four-footer-item-desc {
          font-family: Saira;
          font-size: 0.16rem;
          font-weight: normal;
          line-height: 0.24rem;
          text-align: center;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #cccccc;
        }
      }
    }
  }

  .tech-reev-six {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-image: var(--bg6-image);
    @media screen and (max-width: 1024px) {
      padding-top: 0.8rem;
      background-image: var(--bg6-image-md);
      justify-content: flex-start;
    }
    .six-title {
      text-align: center;

      .six-title-top {
        font-family: Saira;
        font-size: 0.52rem;
        font-weight: 500;
        line-height: 0.6rem;
        text-align: center;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
        white-space: nowrap;
        opacity: 0;
        transform: translateY(0.4rem);
        @media screen and (max-width: 1024px) {
          font-size: 0.26rem;
          line-height: 0.3rem;
          margin: 0 0.2rem;
          text-align: center;
          letter-spacing: normal;
          white-space: normal;
        }
        &.fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      }

      .six-title-bottom {
        margin-top: 0.2rem;
        white-space: nowrap;
        font-family: Saira;
        font-size: 0.2rem;
        font-weight: normal;
        line-height: 0.28rem;
        letter-spacing: 0px;
        opacity: 0;
        transform: translateY(0.4rem);
        text-shadow: 0px 5.33px 13.33px rgba(0, 0, 0, 0.3);
        font-variation-settings: "opsz" auto;
        color: rgba(255, 255, 255, 0.8);
        @media screen and (max-width: 1024px) {
          font-size: 0.14rem;
          font-family: Saira;
          font-weight: normal;
          line-height: 0.2rem;
          text-align: center;
          letter-spacing: normal;
          color: #b2b2b2;
          margin: 0.08rem 0.2rem;
        }
        &.fade-in {
          animation: fadeInUp 0.8s ease-out forwards 0.2s;
        }
      }
    }

    .Peer-leading {
      margin-top: 0.76rem;
      width: 9.36rem;
      height: 5.24rem;
      overflow: hidden;
      transform-origin: center;
      opacity: 0;
      transform: translateY(1rem) scale(1.33);
      position: relative;
      @media screen and (max-width: 1024px) {
        width: 3.35rem;
        height: 1.87rem;
        margin-top: 0.4rem;
      }
      &.fade-in {
        animation: bounceInOut 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .six-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 6.63rem;
      margin-top: 0.43rem;
      @media screen and (max-width: 1024px) {
        display: unset;
      }

      .six-footer-item {
        opacity: 0;
        transform: translateY(0.4rem);
        @media screen and (max-width: 1024px) {
          margin: 0.2rem 0.2rem;
        }
        &.fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .six-footer-item-title {
          font-family: Saira;
          font-size: 0.26rem;
          font-weight: 500;
          line-height: 0.4rem;
          text-align: center;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          color: #e3bea4;
          @media screen and (max-width: 1024px) {
            line-height: 0.36rem;
          }
        }

        .six-footer-item-desc {
          margin-top: 0.16rem;
          font-family: Saira;
          font-size: 0.16rem;
          font-weight: normal;
          line-height: 0.24rem;
          text-align: center;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: rgba(255, 255, 255, 0.8);
          @media screen and (max-width: 1024px) {
            margin-top: 0.06rem;
            font-size: 0.14rem;
            font-family: Saira;
            font-weight: normal;
            line-height: 0.2rem;
            letter-spacing: normal;
            /* 黑色/黑色2 */
            color: #cccccc;
          }
        }
      }
    }
  }

  .tech-reev-six-half {
    width: 100%;
    height: fit-content;
    box-sizing: border-box;
    padding: 2.4rem 1.6rem 2.2rem;
    background: #000;
    @media screen and (max-width: 1024px) {
      padding: 0.2rem;
      min-height: auto;
    }
  }

  .tech-reev-five {
    padding-top: 1.6rem;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: var(--bg5-image);
    @media screen and (max-width: 1024px) {
      height: fit-content;
      min-height: auto;
      padding-top: 0.8rem;
      padding-bottom: 0.6rem;
      background-image: var(--bg5-image-md);
    }

    .five-title {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      opacity: 0;
      transform: translateY(0.4rem);
      @media screen and (max-width: 1024px) {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin: 0 0.2rem;
        text-align: center;
        letter-spacing: normal;
        white-space: normal;
      }
      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
      }
    }

    .five-content {
      display: flex;
      align-items: center;
      width: 6.88rem;
      justify-content: space-around;
      margin-top: 0.77rem;
      margin-bottom: 0.95rem;
      @media screen and (max-width: 1024px) {
        display: unset;
        text-align: center;
        width: unset;
        margin-top: 0.4rem;
        margin-bottom: 0.65rem;
      }
      .five-content-item {
        opacity: 0;
        transform: translateY(0.4rem);
        @media screen and (max-width: 1024px) {
          margin-bottom: 0.2rem;
          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
        }

        &.fade-in {
          animation: fadeInUp 0.8s ease-out forwards;
          animation-delay: var(--animation-delay, 0s);
        }

        .five-content-item-num {
          font-family: Saira;
          font-size: 0.46rem;
          font-weight: 500;
          line-height: 0.54rem;
          text-align: center;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          color: #e3bea4;
          opacity: 1;
          text-shadow: 0px 5.33px 13.33px rgba(0, 0, 0, 0.3);
          @media screen and (max-width: 1024px) {
            font-size: 0.26rem;
            line-height: 0.3rem;
            text-align: center;
            letter-spacing: normal;
            white-space: normal;
          }
        }

        .five-content-item-desc {
          margin-top: 0.16rem;
          font-family: Saira;
          font-size: 0.16rem;
          font-weight: normal;
          line-height: 0.24rem;
          text-align: center;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #cccccc;
          @media screen and (max-width: 1024px) {
            font-size: 0.14rem;
            font-family: Saira;
            font-weight: normal;
            line-height: 0.2rem;
            letter-spacing: normal;
            margin-top: 0.06rem;
            color: #cccccc;
          }
        }
      }
    }

    .five-footer {
      width: 13.71rem;
      display: flex;
      justify-content: center;
      height: 4.1rem;
      opacity: 0;
      transform: translateY(1rem) scale(0.8);
      transition: all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      @media screen and (max-width: 1024px) {
        width: 3.35rem;
        height: 1.87rem;
        // margin-top: 0.43rem;
      }

      &.fade-in {
        opacity: 1;
        transform: translateY(0);
      }

      img {
        width: 7.4rem;
        transform: scale(1);
        @media screen and (max-width: 1024px) {
          transform: scale(1.2);
        }
      }
      .pc-only-shadow {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2rem;
        opacity: 0.4;
        background: #aac4ff;
        filter: blur(1.9rem);
        z-index: -1;
      }
    }
  }

  .tech-reev-seven {
    padding-top: 1.6rem;
    height: 8.91rem;
    @media screen and (max-width: 1024px) {
      padding-top: 0.8rem;
      padding-bottom: 0.5rem;
      height: fit-content;
    }

    .seven-title {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      opacity: 0;
      transform: translateY(0.2rem);
      br {
        display: none;
      }
      @media screen and (max-width: 1024px) {
        font-size: 0.26rem;
        line-height: 0.3rem;
        margin: 0 0.2rem;
        text-align: center;
        letter-spacing: normal;
        white-space: normal;
        br {
          display: block;
        }
      }

      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards;
      }
    }

    .seven-desc {
      margin-top: 0.28rem;
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #cccccc;
      opacity: 0;
      transform: translateY(0.2rem);
      @media screen and (max-width: 1024px) {
        font-size: 0.14rem;
        font-family: Saira;
        font-weight: normal;
        line-height: 0.2rem;
        text-align: center;
        letter-spacing: normal;
        color: white;
        margin: 0.08rem 0.2rem 0.4rem 0.2rem;
      }

      &.fade-in {
        animation: fadeInUp 0.8s ease-out forwards 0.2s;
      }
    }

    .seven-items-img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 0.88rem;
      .swiper-pagination {
        position: absolute;
        bottom: 0;
        :deep(.swiper-pagination-bullet) {
          width: 0.08rem;
          height: 0.08rem;
          border-radius: 50%;
          background: #808080;
          transition: all 0.5s;
          opacity: 1;
        }
        :deep(.swiper-pagination-bullet-active) {
          width: 0.2rem;
          height: 0.08rem;
          background: white;
          border-radius: 0.05rem;
        }
      }
      .slide-item {
        display: flex;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        video {
          width: 100%;
          aspect-ratio: 1.63;
          object-fit: cover;
          border-radius: 0.05rem;
        }
      }
      .img-text {
        font-size: 0.18rem;
        line-height: 0.26rem;
        color: #b2b2b2;
        margin-top: 0.2rem;
      }
      @media screen and (max-width: 1024px) {
        display: none;
      }
    }
    .md-seven-items-img {
      display: none;
      padding: 0.2rem;
      padding-top: 0;
      .img-free {
        margin-bottom: 0.2rem;
        img {
          aspect-ratio: 1.36;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .slide-item-md {
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1.36;
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          aspect-ratio: 1.36;
        }
      }
      .img-text {
        font-size: 0.14rem;
        line-height: 0.21rem;
        color: #808080;
        margin-top: 0.12rem;
      }
      .md-img-title {
        font-size: 0.26rem;
        line-height: 0.3rem;
        color: white;
        margin: 0.8rem 0 0.4rem;
        text-align: center;
      }
      .md-seven-swiper-pagination {
        display: flex;
        justify-content: center;
        padding-top: 0.2rem;
        :deep(.swiper-pagination-bullet) {
          width: 0.06rem;
          height: 0.06rem;
          background: #808080;
          transition: all 0.5s;
        }
        :deep(.swiper-pagination-bullet-active) {
          width: 0.15rem;
          border-radius: 0.02rem;
          background: white;
        }
      }
      @media screen and (max-width: 1024px) {
        display: block;
      }
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(0.4rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceInOut {
  from {
    opacity: 0;
    transform: translateY(0.4rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes numberRoll {
  from {
    opacity: 0;
    transform: translateY(0.4rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media screen and (max-width: 1024px) {
  .mb-only {
    display: block;
  }
  .pc-only {
    display: none !important;
  }
}
@media screen and (min-width: 1024px) {
  .mb-only {
    display: none !important;
  }
  .pc-only {
    display: block;
  }
}
</style>
