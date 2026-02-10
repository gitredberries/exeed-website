<template>
  <div class="exploration-page">
    <!-- 第一屏 -->
    <section class="hero-section" ref="section0Ref">
      <BannerSwiper :list="list">
        <template #default="{ item }">
          <!-- 阴影 -->
          <div class="hero-text-bg"></div>
          <img class="hero-image-bg" :src="item.image" alt="" />
          <img
            class="hero-image-bg md-hero-image-bg"
            :src="item.imageMobile || item.image"
            alt=""
          />
          <div :class="['hero-text', sectionVisibility[0] ? 'fade-in' : '']">
            <div class="hero-text-title">{{ item.title }}</div>
            <div class="hero-text-content">
              {{ JSON.parse(item.jsondef).subtitle }}
            </div>
          </div>
        </template>
      </BannerSwiper>
    </section>
    <!-- 第二屏 -->
    <section class="section section-1" ref="section1Ref">
      <!-- :class="{ 'fade-in': sectionVisibility[1] }" -->
      <div :class="['sectionOneTitle', sectionVisibility[1] ? 'fade-in' : '']">
        Sustainability at EXLANTIX
      </div>
      <div
        class="swiper"
        :class="swiperaActiveIndex > 0 ? 'swiper-active' : 'swiper-inactive'"
      >
        <div class="swiper-wrapper">
          <Swiper
            style="padding-bottom: 0.5rem"
            :slidesOffsetBefore="120"
            :modules="[Pagination]"
            :slidesPerView="2.5"
            :spaceBetween="20"
            :speed="1000"
            :pagination="{
              el: '.section-1-swiper-pagination',
              clickable: true,
            }"
          >
            <SwiperSlide v-for="item in s2InfoList" :key="item.id">
              <div class="swiper-slide-item">
                <div class="itemImg">
                  <img :src="item.src" alt="" />
                </div>
                <div class="itemContent">
                  <div class="itemTitle">{{ item.title }}</div>
                  <div class="itemDesc">
                    {{ item.subtitle }}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <div class="section-1-swiper-pagination"></div>
          </Swiper>
        </div>
        <div class="md-swiper-wrapper">
          <Swiper
            style="padding-bottom: 0.5rem"
            :modules="[Pagination]"
            :slidesPerView="1"
            :spaceBetween="20"
            :speed="1000"
            :pagination="{
              el: '.section-1-swiper-pagination',
              clickable: true,
            }"
          >
            <SwiperSlide v-for="item in s2InfoList" :key="item.id">
              <div class="swiper-slide-item">
                <div class="itemImg">
                  <img :src="item.mdSrc || item.src" alt="" />
                </div>
                <div class="itemContent">
                  <div class="itemTitle">{{ item.title }}</div>
                  <div class="itemDesc">
                    {{ item.subtitle }}
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <div class="section-1-swiper-pagination"></div>
          </Swiper>
        </div>
      </div>
    </section>
    <!-- 第三屏 -->
    <!-- <div ref="section2Ref">
      <Exeeder
        dPath="M292.92,460c-.62.7-1.35,1.21-2.19,1.55-.84.34-1.74.51-2.69.51s-1.86-.17-2.69-.51c-.84-.34-1.57-.86-2.19-1.55-.62-.7-1.11-1.58-1.48-2.64-.37-1.06-.55-2.32-.55-3.77s.18-2.7.55-3.77c.37-1.06.86-1.94,1.48-2.64.62-.7,1.35-1.21,2.19-1.55.84-.34,1.74-.51,2.69-.51s1.86.17,2.69.51c.84.34,1.57.86,2.19,1.55.62.7,1.11,1.58,1.48,2.64.37,1.06.55,2.32.55,3.77s-.18,2.7-.55,3.77-.86,1.94-1.48,2.64ZM278.15,482.45c-1.18,0-2.13.4-2.86,1.2-.72.8-1.09,1.83-1.09,3.11s.36,2.25,1.09,3.05c.73.8,1.68,1.2,2.86,1.2s2.1-.4,2.85-1.2c.74-.8,1.12-1.82,1.12-3.05s-.37-2.31-1.12-3.11c-.74-.8-1.69-1.2-2.85-1.2ZM211.15,456.98h9.73v-9.59h-.28l-9.45,9.59ZM251.99,488.58c-.89-1.13-1.92-1.95-3.08-2.47s-2.35-.78-3.57-.78-2.41.26-3.57.78-2.19,1.34-3.08,2.47c-.89,1.13-1.61,2.59-2.16,4.37-.55,1.79-.82,3.95-.82,6.49s.27,4.7.82,6.49c.55,1.79,1.27,3.24,2.16,4.37.89,1.13,1.92,1.95,3.08,2.47,1.16.52,2.35.78,3.57.78s2.41-.26,3.57-.78c1.16-.52,2.19-1.34,3.08-2.47.89-1.13,1.61-2.59,2.16-4.37.55-1.79.82-3.95.82-6.49s-.27-4.7-.82-6.49c-.55-1.79-1.27-3.24-2.16-4.37ZM346.22,447.01c-.81-.78-1.96-1.17-3.44-1.17h-6.07v9.59h6.07c1.49,0,2.63-.39,3.44-1.17.81-.78,1.21-1.99,1.21-3.63s-.4-2.84-1.21-3.63ZM480,0v960H0V0h480ZM231.89,455.57h12.98v-2.54h-12.98v2.54ZM145.13,443.72h-17.21v19.75h17.21v-2.12h-13.12v-6.91h10.3v-2.12h-10.3v-6.49h13.12v-2.12ZM156.69,445.84v17.63h4.09v-17.63h7.62v-2.12h-19.33v2.12h7.62ZM180.21,498.5h-21.63v4.23h21.63v-4.23ZM198.17,449.22c0,.92-.27,1.74-.8,2.44-.54.71-1.16,1.3-1.88,1.79l-10.16,7.76v2.26h17.49v-2.12h-11.85l7.19-5.5c.56-.43,1.11-.87,1.64-1.33.53-.45.99-.95,1.4-1.5.4-.55.73-1.15.97-1.82s.37-1.42.37-2.27-.18-1.62-.54-2.33c-.36-.71-.9-1.32-1.62-1.83-.72-.52-1.63-.92-2.72-1.2-1.09-.28-2.38-.42-3.87-.42-1.84,0-3.49.26-4.95.79-1.46.53-2.72,1.25-3.79,2.17l1.27,1.69c1.07-.92,2.19-1.58,3.34-1.96,1.16-.39,2.44-.58,3.85-.58,1.56,0,2.73.36,3.5,1.07.77.71,1.16,1.67,1.16,2.88ZM219,507.2c0-2.26-.67-4.08-2-5.48-1.33-1.4-3.17-2.39-5.53-2.99,2.13-.72,3.68-1.73,4.66-3.03.97-1.3,1.46-2.95,1.46-4.96,0-1.22-.31-2.37-.92-3.43s-1.53-1.99-2.75-2.77c-1.22-.78-2.74-1.4-4.56-1.83-1.82-.44-3.93-.66-6.35-.66-3.07,0-5.82.44-8.25,1.32-2.43.88-4.54,2.08-6.32,3.62l2.12,2.82c1.79-1.54,3.64-2.63,5.57-3.27,1.93-.64,4.07-.96,6.42-.96,2.48,0,4.39.53,5.74,1.58,1.35,1.05,2.02,2.41,2.02,4.07,0,4.08-2.27,6.11-6.82,6.11h-8.7v3.53h9.64c2.48,0,4.31.51,5.5,1.53,1.19,1.02,1.79,2.47,1.79,4.35s-.74,3.45-2.23,4.7c-1.49,1.25-3.88,1.88-7.17,1.88-2.35,0-4.53-.37-6.54-1.11s-3.9-1.94-5.69-3.6l-2.35,2.82c1.79,1.66,3.97,2.98,6.56,3.95s5.42,1.46,8.49,1.46c2.82,0,5.25-.25,7.29-.75,2.04-.5,3.72-1.18,5.06-2.05s2.31-1.88,2.94-3.06c.63-1.18.94-2.44.94-3.79ZM227.37,456.98h-2.4v-13.26h-5.08l-12.84,13.01v2.23h13.83v4.51h4.09v-4.51h2.4v-1.98ZM262.27,499.45c0-2.95-.42-5.51-1.25-7.69-.83-2.18-2-3.99-3.5-5.43-1.5-1.44-3.29-2.52-5.36-3.22s-4.34-1.06-6.82-1.06-4.75.35-6.82,1.06-3.86,1.78-5.36,3.22c-1.5,1.44-2.67,3.25-3.5,5.43-.83,2.18-1.25,4.74-1.25,7.69s.42,5.51,1.25,7.69c.83,2.18,2,3.99,3.5,5.43,1.5,1.44,3.29,2.52,5.36,3.22,2.07.71,4.34,1.06,6.82,1.06s4.75-.35,6.82-1.06c2.07-.71,3.86-1.78,5.36-3.22,1.5-1.44,2.67-3.25,3.5-5.43.83-2.18,1.25-4.74,1.25-7.69ZM270.54,443.72h-4.09v9.03h-11.57v-9.03h-4.09v19.75h4.09v-8.61h11.57v8.61h4.09v-19.75ZM284.75,486.76c0-1.38-.3-2.58-.91-3.58-.61-1-1.41-1.78-2.41-2.34-1-.56-2.09-.83-3.27-.83s-2.26.28-3.27.83c-1.02.56-1.83,1.34-2.44,2.34-.61,1-.91,2.2-.91,3.58s.31,2.5.91,3.51c.61,1.01,1.42,1.79,2.44,2.35,1.02.56,2.11.83,3.27.83s2.27-.28,3.27-.83c1-.56,1.8-1.34,2.41-2.35.61-1.01.91-2.18.91-3.51ZM288.04,464.03c1.69,0,3.23-.23,4.61-.68,1.38-.45,2.57-1.12,3.56-2s1.75-1.98,2.3-3.27c.55-1.3.82-2.79.82-4.49s-.27-3.19-.82-4.49c-.55-1.3-1.31-2.39-2.3-3.27-.99-.88-2.17-1.55-3.56-2s-2.92-.68-4.61-.68-3.24.23-4.63.68c-1.39.45-2.58,1.12-3.57,2-.99.88-1.75,1.98-2.29,3.27s-.8,2.79-.8,4.49.27,3.19.8,4.49c.54,1.3,1.3,2.39,2.29,3.27s2.18,1.55,3.57,2c1.39.45,2.93.68,4.63.68ZM314.36,511.57l-2.56-2.76c-1.08,1.2-2.25,2.13-3.49,2.78-1.24.65-2.68.97-4.32.97-2.16,0-4.03-.57-5.63-1.7-1.59-1.14-2.82-2.74-3.67-4.83-.86-2.08-1.28-4.55-1.28-7.41s.45-5.3,1.34-7.36c.9-2.06,2.15-3.65,3.76-4.77,1.61-1.12,3.5-1.68,5.66-1.68,1.42,0,2.69.28,3.81.83,1.12.55,2.14,1.31,3.05,2.28l2.53-2.81c-1.01-1.1-2.32-2.08-3.94-2.95s-3.46-1.3-5.52-1.3c-2.2,0-4.23.41-6.1,1.22-1.87.82-3.49,2-4.89,3.54-1.39,1.54-2.47,3.42-3.23,5.62-.76,2.2-1.14,4.7-1.14,7.49,0,3.72.65,6.91,1.96,9.56,1.3,2.65,3.1,4.69,5.39,6.1,2.29,1.41,4.89,2.12,7.79,2.12,2.18,0,4.13-.43,5.85-1.29,1.72-.86,3.26-2.08,4.61-3.67ZM325.85,443.72h-4.09v11.71c0,1.17-.15,2.17-.44,3.01s-.7,1.52-1.23,2.06c-.53.54-1.16.93-1.9,1.19-.74.25-1.58.38-2.5.38s-1.75-.13-2.5-.38c-.74-.25-1.38-.65-1.9-1.19-.53-.54-.94-1.22-1.23-2.06s-.44-1.84-.44-3.01v-11.71h-4.09v11.71c0,2.9.88,5.06,2.64,6.48,1.76,1.42,4.27,2.13,7.52,2.13s5.74-.71,7.51-2.13c1.77-1.42,2.65-3.58,2.65-6.48v-11.71ZM352.09,463.47l-4.66-6.66c1.41-.55,2.49-1.34,3.24-2.37.75-1.03,1.13-2.3,1.13-3.81,0-1.09-.21-2.06-.62-2.92-.41-.86-1.01-1.58-1.78-2.17-.77-.59-1.72-1.04-2.84-1.35-1.12-.31-2.38-.47-3.79-.47h-10.16v19.75h4.09v-5.93h6.57l4.15,5.93h4.66Z"
        :videoUrl="`${config.public.oosURL}platform/public/video/extreme.mp4`"
        :classIndex="2"
        :poster="
          isMobile
            ? `${config.public.staticURL}/images/explorationImage/et_mobile.png`
            : `${config.public.staticURL}/images/explorationImage/et.png`
        "
        pathId="extreme"
      >
        <text
          class="brandhub-text-mask__surface-text"
          fill="transparent"
          stroke-width="0.02rem"
          stroke="white"
          text-anchor="middle"
          x="240"
          y="380"
        >
          <tspan x="240" dy="60">EXTREME</tspan>
          <tspan x="240" dy="60">DEEP FREEZE</tspan>
          <tspan x="240" dy="60">CHALLANGE</tspan>
        </text>
      </Exeeder>
    </div> -->
    <!-- 第五屏 -->
    <CardSwiper :videoList="videoList" title="EXLANTIX Events Videos"/>
    <!-- 第七屏 -->
    <section class="section section-6" ref="section6Ref">
      <Sourcematerial :isExploration="false"></Sourcematerial>
    </section>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  reactive,
  nextTick,
  onBeforeMount,
  computed,
} from "vue";
import Exeeder from "@/components/Exeeder";
import Digitalscroll from "@/components/Digitalscroll";
import Sourcematerial from "@/components/Sourcematerial";
import { Swiper, SwiperSlide } from "swiper/vue";
import BannerSwiper from "@/components/BannerSwiper";
import { Pagination } from "swiper/modules";
import { Fetch } from "@/utils/common";

import { isMobileDevice } from "@/utils/common/index.js";
const isMobile = computed(() => {
  return isMobileDevice();
});

const list = ref([]);
const config = useRuntimeConfig();
// 创建所有section的引用
const section0Ref = ref(null);
const section1Ref = ref(null);
const section2Ref = ref(null);
const section3Ref = ref(null);
const section4Ref = ref(null);
const section5Ref = ref(null);
const section6Ref = ref(null);

// 存储每个section的距离顶部的距离
const sectionDistances = reactive([0, 0, 0, 0, 0, 0, 0]);
// 存储每个section的可见状态
const sectionVisibility = reactive([
  true,
  false,
  false,
  false,
  false,
  false,
  false,
]);

// 存储所有观察者
const observers = [];
// 标记初始化状态
const isInitialized = ref(false);
// 页面加载标志
const pageLoaded = ref(false);

const infoListS4 = ref([]);
const infoListS6 = ref([]);

const s2InfoList = ref([]);

const videoList = ref([])

const getS2Data = () => {
  Fetch("Sustainability-s2").then((data) => {
    s2InfoList.value = data.map((item) => {
      return {
        title: item.title,
        subtitle: item.jsondef?.subtitle || "",
        src: item.image,
        mdSrc: item.imageMobile,
      };
    });
  });
};

getS2Data();

const s4Desc =
  "In order to verify the reliability, stability and safety of EXLANTIX ET in ultra-low temperature, and to relieve the anxiety of users about new energy vehicles in winter range, power supply, power, etc., ET carries out the “Battery Pack Ice Water Immersion for 1 Hour”, “-30℃ 24 Hours Vehicle Cold Challenge”, and “-30℃ 24 Hours Vehicle Extreme Cold Challenge”. Challenge” ‘-30 ℃ extreme cold range challenge’ and other tests.";
const s6Desc =
  "With its extraordinary handling strength, EXLANTIX ES launches a series of thrilling extreme challenges to the speeding train, including topping the speeding train, extreme roof avoidance, breaking through the one-wood bridge and high-speed life-threatening flying car.";

infoListS4.value = [
  {
    title: "1",
    targetNumber: 1,
    currentNumber: 0,
    content: "1 hour battery pack ice water immersion test",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "24",
    targetNumber: 24,
    currentNumber: 0,
    content: "24-hour full vehicle freeze test",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "392",
    targetNumber: 392,
    currentNumber: 0,
    content: "392km range was reached when the distance on gauge reached 0",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "4359",
    targetNumber: 4359,
    currentNumber: 0,
    content:
      "4,359km total travel distance after electric motor ran out power completely",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
];
infoListS6.value = [
  {
    title: "3.4-5.4",
    targetNumber: 3,
    currentNumber: 0,
    content: "Wind Speed at 3.4-5.4m/s",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "18",
    targetNumber: 18,
    currentNumber: 0,
    content: "Temperature at 18℃",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "126",
    targetNumber: 126,
    currentNumber: 0,
    content: "Altitude at 126m",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
];

// 在组件挂载前初始化 rem
onBeforeMount(() => {
  if (typeof window !== "undefined") {
    // 禁用浏览器的滚动恢复
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // 立即滚动到顶部
    window.scrollTo(0, 0);
  }
});
const swiperaActiveIndex = ref(0);
onMounted(async () => {
  // 先重置状态
  reset();
  // 立即滚动到顶部（再次确保）
  window.scrollTo(0, 0);
  // 等待DOM更新完成
  await nextTick();

  try {
    // 初始化观察者
    await initObservers();
    // 再次强制滚动到顶部
    window.scrollTo(0, 0);
    // 设置初始化完成标志
    isInitialized.value = true;
    // 添加滚动事件监听
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("beforeunload", handleBeforeUnload);
    // 初始化完成后，手动触发一次滚动处理，确保状态正确
    setTimeout(() => {
      handleScroll();
      // 标记页面已完全加载
      pageLoaded.value = true;
    }, 100);
  } catch (error) {
    console.error("初始化失败:", error);
  }
  //轮播图接口数据
  fetch(
    `${config.public.apiURL}api/front/banners?code=Sustainability-s1&siteCode=chery_xt`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((res) => {
      if (res.code === 0) {
        list.value = res.data || [];
      }
    });

  Fetch("ExlantixEvents").then((data) => {
    videoList.value = data;
  });
});

// 页面卸载前处理
const handleBeforeUnload = () => {
  // 重置状态并滚动到顶部
  reset();
  window.scrollTo(0, 0);
};

const handleScroll = () => {
  // 如果还没初始化完成，不处理滚动事件
  if (!isInitialized.value) {
    // 强制滚动到顶部
    window.scrollTo(0, 0);
    return;
  }
  // 获取滚动条滚动的距离
  const scrollPosition = window.scrollY;
  // 如果页面刚加载且滚动位置不在顶部，强制滚动到顶部
  if (!pageLoaded.value && scrollPosition > 0) {
    window.scrollTo(0, 0);
    return;
  }

  // 检查每个section的可见性
  for (let i = 1; i < sectionDistances.length; i++) {
    // 当滚动位置超过section的顶部位置时，将其设置为可见
    // 为第二屏添加一个小偏移量，使其在滚动稍微超过第一屏时才显示
    // const offset = i === 1 ? 50 : 0;
    if (scrollPosition > sectionDistances[i - 1]) {
      sectionVisibility[i] = true;
    } else {
      // sectionVisibility[i] = false;
    }
  }
};

const initObservers = async () => {
  return new Promise((resolve, reject) => {
    try {
      // 获取所有section的引用
      const sectionRefs = [
        section0Ref,
        section1Ref,
        section2Ref,
        section3Ref,
        section4Ref,
        section5Ref,
        section6Ref,
      ];

      // 计数器，用于跟踪所有观察者是否都已初始化
      let observersInitialized = 0;
      const totalSections = sectionRefs.filter((ref) => ref.value).length;

      if (totalSections === 0) {
        console.warn("没有找到任何section元素");
        resolve();
        return;
      }

      // 为每个section创建一个观察者
      sectionRefs.forEach((sectionRef, index) => {
        if (!sectionRef.value) {
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // 记录section距离顶部的距离
              const distance = window.scrollY + entry.boundingClientRect.top;
              sectionDistances[index] = distance;

              // 如果是初始化阶段，增加计数器
              if (!isInitialized.value) {
                observersInitialized++;
                if (observersInitialized >= totalSections) {
                  resolve();
                }
              }
            });
          },
          {
            root: null,
            threshold: 0.1,
          }
        );

        observer.observe(sectionRef.value);
        observers.push(observer);
      });

      // 设置超时，以防观察者没有触发
      setTimeout(() => {
        if (!isInitialized.value) {
          console.warn("观察者初始化超时，强制完成初始化");
          resolve();
        }
      }, 1000);
    } catch (error) {
      console.error("初始化观察者时出错:", error);
      reject(error);
    }
  });
};

const reset = () => {
  // 重置所有状态
  for (let i = 0; i < sectionVisibility.length; i++) {
    sectionVisibility[i] = i === 0; // 只有第一屏默认可见
    sectionDistances[i] = 0;
  }
  isInitialized.value = false;
  pageLoaded.value = false;
};

onUnmounted(() => {
  reset();
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("beforeunload", handleBeforeUnload);

  // 清除所有观察者
  observers.forEach((observer, index) => {
    const sectionRef = [
      section0Ref,
      section1Ref,
      section2Ref,
      section3Ref,
      section4Ref,
      section5Ref,
      section6Ref,
    ][index];

    if (sectionRef.value && observer) {
      observer.unobserve(sectionRef.value);
    }
  });
});
</script>

<style lang="scss" scoped>
.fade-in {
  animation: _slideUp 1s ease-out forwards;
}
.exploration-page {
  background: black;
  width: 100%;
  .brandhub-text-mask__surface-text.exlantix {
    font-size: 0.7rem;
    transform: translateY(-1px);
  }
  // 通用样式（不需要区分设备的样式）
  .section {
    background-color: #000000;
    color: white;
    position: relative;
    z-index: 2;
  }

  .section-6,
  .section-1 {
    background: #a2abb2;
    // padding-bottom: 0.8rem;
  }

  .section-3 {
    height: 100vh;
  }

  .section-5 {
    height: 100vh;
  }

  // 桌面端样式（1024px 以上）
  @media screen and (min-width: 1024px) {
    section {
      width: 100%;
      min-height: 100vh;
      position: relative;
    }

    .hero-section {
      position: relative;
      height: 100vh;
      // position: fixed;
      // top: 0;
      // left: 0;
      // z-index: -8;

      .hero-image-bg {
        position: relative;
        top: 0;
        left: 0;
        z-index: 1;
        height: 100%;
        width: 100%;
        object-fit: cover;

        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }
      }

      .md-hero-image-bg {
        display: none;
      }

      .hero-text-bg {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 5.34rem;
        z-index: 2;
        opacity: 1;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) 10%,
          rgba(5, 8, 18, 0.69) 60%,
          rgba(8, 12, 27, 0.85) 91%
        );
      }

      .hero-text {
        position: absolute;
        left: 1.2rem;
        bottom: 0.6rem;
        z-index: 3;

        .hero-text-title {
          font-size: 0.52rem;
          font-weight: 600;
          line-height: 0.6rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #ffffff;
        }

        .hero-text-content {
          margin-top: 0.2rem;
          font-family: Saira;
          font-size: 0.16rem;
          font-weight: normal;
          line-height: 0.24rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: rgba(255, 255, 255, 0.8);
        }
      }

      .hero-indicationPoint {
        position: absolute;
        z-index: 2;
        right: 1.2rem;
        bottom: 0.6rem;
        display: flex;
        align-items: center;

        .hero-indicationPoint-item {
          width: 0.08rem;
          height: 0.08rem;
          opacity: 0.5;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          margin-right: 0.24rem;
        }

        .active {
          width: 0.26rem;
          height: 0.26rem;
          opacity: 1;
          background: conic-gradient(
            #ffffff 0deg 270deg,
            rgba(255, 255, 255, 0.5) 270deg 360deg
          );
          border-radius: 50%;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 0.08rem;
            height: 0.08rem;
            background: #ffffff;
            border-radius: 50%;
          }

          &::before {
            content: "";
            position: absolute;
            top: 0.02rem;
            left: 0.02rem;
            right: 0.02rem;
            bottom: 0.02rem;
            background: #000000;
            border-radius: 50%;
          }
        }
      }
    }

    .section-1 {
      padding-top: 1.6rem;
      box-sizing: border-box;
      height: fit-content;
      // overflow: hidden;

      .sectionOneTitle {
        font-family: Saira;
        font-size: 0.52rem;
        font-weight: 500;
        line-height: 0.6rem;
        text-align: center;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
        margin-bottom: 0.8rem;
        // opacity: 0;
        // transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
      }

      .swiper {
        // margin-left: 1.2rem;
        width: auto;
        overflow: hidden;

        .swiper-wrapper {
          height: auto;
          .swiper-slide {
            display: flex;
            align-items: center;
            width: auto;
            height: fit-content;
            .swiper-slide-item {
              width: 100%;
              transition: opacity 0.8s ease, transform 0.8s ease;
              position: relative;
              border-radius: 0.06rem;
              overflow: hidden;

              &:hover {
                .itemImg img {
                  transform: scale(1.3);
                }
              }

              .itemImg {
                overflow: hidden;

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                  transition: transform 0.3s ease;
                }
              }

              .itemContent {
                position: absolute;
                left: 0.6rem;
                bottom: 0.6rem;
                right: 0.6rem;
                z-index: 1;

                .itemTitle {
                  font-family: Saira;
                  font-size: 0.32rem;
                  font-weight: 500;
                  line-height: 0.4rem;
                  letter-spacing: 0em;
                  font-variation-settings: "opsz" auto;
                  color: #ffffff;
                }

                .itemDesc {
                  margin-top: 0.08rem;
                  font-family: Saira;
                  font-size: 0.16rem;
                  font-weight: normal;
                  line-height: 0.24rem;
                  letter-spacing: 0px;
                  font-variation-settings: "opsz" auto;
                  color: #cccccc;
                }
              }
            }
          }

          .display-none {
            display: flex;
          }

          .display-block {
            display: none;
          }
        }
        .md-swiper-wrapper {
          display: none;
        }
      }
      .swiper-active {
        margin-left: 0;
        transition: all 0.8s ease;
      }
      .swiper-inactive {
        transition: all 0.8s ease;
      }

      .section-1-swiper-pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.2rem;

        :deep(.swiper-pagination-bullet) {
          width: 0.08rem;
          height: 0.08rem;
          background: #808080;
          transition: all 1s;
          opacity: 1;
        }
        :deep(.swiper-pagination-bullet-active) {
          width: 0.2rem;
          border-radius: 0.05rem;
          background: #ffffff;
        }
      }
    }
  }

  // 移动端样式（1024px 及以下）
  @media screen and (max-width: 1024px) {
    section {
      width: 100%;
      min-height: 100vh;
      height: auto;
      position: relative;
      overflow: hidden;
    }
    .section-1 {
      min-height: auto;
      .swiper {
        .itemImg {
          img {
            min-height: 30vh;
            width: 100%;
          }
        }
      }
    }
    .section-3 {
      height: auto;
    }
    .section-5 {
      min-height: 100vh;
    }
    .section-6 {
      height: fit-content;
      overflow: hidden;
    }

    .hero-section {
      display: flex;
      flex-direction: column;
      height: 100vh;

      .hero-text {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 82%;
        left: 0rem;
        z-index: 3;
        padding: 0 0.2rem;

        .hero-text-title {
          font-family: SairaLight;
          font-size: 0.26rem;
          font-weight: normal;
          line-height: 0.3rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #ffffff;
          margin-bottom: 0.12rem;
        }

        .hero-text-content {
          font-family: Saira;
          font-size: 0.14rem;
          font-weight: normal;
          line-height: 0.2rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #ffffff;
        }
      }

      .hero-image-bg {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        display: none;

        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          position: absolute;
          z-index: -1;
        }
      }
      .md-hero-image-bg {
        display: block;
      }

      .hero-text-bg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3.14rem;
        z-index: 1;
        opacity: 1;
        opacity: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0b0f12 69%);
      }

      .hero-content-wrapper {
        position: relative;
        z-index: 2;
        padding: 0.2rem;
        display: flex;
        flex-direction: column;

        .hero-indicationPoint {
          display: flex;
          align-items: center;
          margin-bottom: 0.12rem;

          .hero-indicationPoint-item {
            width: 0.06rem;
            height: 0.06rem;
            opacity: 0.5;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            margin-right: 0.16rem;

            &:last-child {
              margin-right: 0;
            }
          }

          .active {
            width: 0.2rem;
            height: 0.2rem;
            opacity: 1;
            background: conic-gradient(
              #ffffff 0deg 270deg,
              rgba(255, 255, 255, 0.5) 270deg 360deg
            );
            border-radius: 50%;
            position: relative;

            &::after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 0.06rem;
              height: 0.06rem;
              background: #ffffff;
              border-radius: 50%;
            }

            &::before {
              content: "";
              position: absolute;
              top: 0.015rem;
              left: 0.015rem;
              right: 0.015rem;
              bottom: 0.015rem;
              background: #000000;
              border-radius: 50%;
            }
          }
        }
      }
    }

    .section-1 {
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
      min-height: 100vh;
      .sectionOneTitle {
        font-family: Saira;
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.28rem;
        text-align: center;
        letter-spacing: 0px;
        margin-top: 0.8rem;
        margin-bottom: 0.24rem;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
        // opacity: 0;
        transition: opacity 0.8s ease, transform 0.8s ease;
      }

      .swiper {
        overflow: hidden;
        min-height: calc(100vh - 1.32rem);
        .swiper-wrapper {
          display: none;
        }
        .md-swiper-wrapper {
          display: block;
          padding: 0 0.2rem;
          .itemContent {
            .itemTitle {
              font-family: SairaMedium;
              font-size: 0.2rem;
              line-height: 0.28rem;
              // color: #26b7bc;
              margin-top: 0.12rem;
            }
            .itemDesc {
              font-size: 0.12rem;
              line-height: 0.2rem;
              color: white;
              font-family: SairaLight;
            }
          }
          .section-1-swiper-pagination {
            :deep(.swiper-pagination-bullet) {
              width: 0.06rem;
              height: 0.06rem;
              background: #808080;
              transition: all 1s;
              opacity: 1;
            }
            :deep(.swiper-pagination-bullet-active) {
              width: 0.15rem;
              background: white;
              border-radius: 0.03rem;
            }
          }
        }
      }

      .section-1-swiper-pagination {
        position: absolute;
        bottom: 0.24rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: center;

        .five-swiper-pagination-item {
          width: 0.08rem;
          height: 0.08rem;
          background-color: #808080;
          border-radius: 50%;
          margin-right: 0.08rem;
          transition: all 0.3s ease-in-out;
        }

        .active {
          background-color: #fff;
          width: 0.2rem;
          height: 0.08rem;
          border-radius: 0.04rem;
        }
      }
    }
  }

  @media screen and (max-width: 550px) {
    .hero-image-bg {
      position: relative;
      width: 120% !important;
      overflow: hidden;
    }
  }
}
</style>
