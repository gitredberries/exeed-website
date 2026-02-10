<template>
  <div class="exploration-page">
    <!-- 第一屏 -->
    <section class="hero-section" ref="section0Ref">
      <BannerSwiper :list="list">
        <template #default="{ item }">
          <div class="hero-text-bg"></div>
          <img
            class="hero-image-bg"
            :src="item.image"
            alt=""
          />
          <img
            class="hero-image-bg md-hero-image-bg"
            :src="item.imageMobile || item.image"
            alt=""
          />
          <div class="hero-text">
            <div class="hero-text-title">{{ item.title }}</div>
            <div class="hero-text-content">
              {{ item.jsondef?.subtitle }}
            </div>
          </div>
        </template>
      </BannerSwiper>
    </section>
    <div class="h"></div>
    <!-- 第二屏 -->
    <section
      class="section section-1"
      :class="{ 'section-active': sectionVisibility[1] }"
      ref="section1Ref"
    >
      <TextJumping :sectionVisibilityFlag="sectionVisibility[1]"></TextJumping>
    </section>
    <!-- 第三屏 -->
    <!-- <Exeeder
      dPath="M286.88,496.88c.73,2.38,1.1,5.26,1.1,8.64s-.37,6.26-1.1,8.64c-.73,2.38-1.69,4.32-2.88,5.83-1.19,1.5-2.56,2.6-4.1,3.29-1.55.69-3.13,1.03-4.76,1.03s-3.22-.34-4.76-1.03c-1.55-.69-2.91-1.79-4.1-3.29-1.19-1.5-2.15-3.45-2.88-5.83-.73-2.38-1.1-5.26-1.1-8.64s.37-6.26,1.1-8.64c.73-2.38,1.69-4.32,2.88-5.83,1.19-1.5,2.56-2.6,4.1-3.29,1.54-.69,3.13-1.03,4.76-1.03s3.22.34,4.76,1.03c1.54.69,2.91,1.79,4.1,3.29,1.19,1.5,2.15,3.44,2.88,5.83ZM339.95,435.68c-1.08-1.04-2.61-1.56-4.58-1.56h-8.08v12.78h8.08c1.98,0,3.51-.52,4.58-1.56s1.62-2.65,1.62-4.83-.54-3.79-1.62-4.83ZM272.06,454.21c1.11-.39,2.09-1,2.91-1.84.83-.84,1.48-1.91,1.97-3.21.49-1.3.73-2.87.73-4.7s-.24-3.39-.73-4.7c-.49-1.3-1.15-2.37-1.97-3.21-.83-.84-1.8-1.45-2.91-1.84s-2.31-.58-3.59-.58h-6.95v20.67h6.95c1.28,0,2.47-.19,3.59-.58ZM480,0v960H0V0h480ZM256.07,457.61h12.4c2.25,0,4.3-.28,6.14-.85,1.84-.56,3.42-1.4,4.74-2.5s2.34-2.47,3.06-4.12c.73-1.64,1.09-3.54,1.09-5.69s-.36-4.05-1.09-5.69-1.75-3.01-3.06-4.12c-1.32-1.1-2.89-1.94-4.74-2.5-1.84-.56-3.89-.85-6.14-.85h-12.4v26.31ZM195.18,457.61h22.92v-2.82h-17.48v-9.21h13.72v-2.82h-13.72v-8.64h17.48v-2.82h-22.92v26.31ZM155.16,431.3h-22.92v26.31h22.92v-2.82h-17.48v-9.21h13.72v-2.82h-13.72v-8.64h17.48v-2.82ZM174.4,447.99l8.01,9.62h6.39l-11.2-13.49,10.64-12.82h-6.39l-7.44,8.98-7.4-8.98h-6.39l10.6,12.82-11.16,13.49h6.39l7.97-9.62ZM219.39,522.75h-26.31l15.97-12.21c1.25-.96,2.46-1.94,3.63-2.94,1.17-1,2.2-2.11,3.1-3.32.9-1.21,1.62-2.56,2.16-4.04.54-1.48.81-3.16.81-5.04s-.4-3.6-1.19-5.17c-.79-1.57-1.99-2.92-3.6-4.07-1.61-1.15-3.62-2.04-6.04-2.66-2.42-.63-5.28-.94-8.58-.94-4.09,0-7.76.58-10.99,1.75-3.24,1.17-6.04,2.78-8.42,4.82l2.82,3.76c2.38-2.05,4.85-3.5,7.42-4.35,2.57-.86,5.42-1.28,8.55-1.28,3.47,0,6.05.79,7.77,2.38,1.71,1.59,2.57,3.72,2.57,6.39,0,2.05-.59,3.85-1.79,5.42s-2.58,2.89-4.17,3.98l-22.55,17.22v5.01h38.83v-4.7ZM240.06,523.38c0-1.25-.44-2.35-1.32-3.29s-2-1.41-3.38-1.41-2.56.47-3.41,1.41c-.86.94-1.28,2.04-1.28,3.29s.43,2.35,1.28,3.29c.86.94,1.99,1.41,3.41,1.41s2.56-.47,3.41-1.41c.86-.94,1.28-2.04,1.28-3.29ZM248.55,431.3h-22.93v26.31h22.93v-2.82h-17.48v-9.21h13.72v-2.82h-13.72v-8.64h17.48v-2.82ZM297.69,505.52c0-3.93-.55-7.34-1.66-10.24-1.11-2.9-2.66-5.31-4.67-7.23s-4.38-3.35-7.14-4.29c-2.76-.94-5.78-1.41-9.08-1.41s-6.33.47-9.08,1.41c-2.76.94-5.14,2.37-7.14,4.29s-3.56,4.33-4.67,7.23c-1.11,2.9-1.66,6.32-1.66,10.24s.55,7.34,1.66,10.24c1.11,2.9,2.66,5.31,4.67,7.23,2,1.92,4.38,3.35,7.14,4.29,2.76.94,5.78,1.41,9.08,1.41s6.33-.47,9.08-1.41c2.76-.94,5.14-2.37,7.14-4.29,2-1.92,3.56-4.33,4.67-7.23,1.11-2.9,1.66-6.32,1.66-10.24ZM314.32,431.3h-22.93v26.31h22.93v-2.82h-17.48v-9.21h13.72v-2.82h-13.72v-8.64h17.48v-2.82ZM347.77,457.61l-6.2-8.87c1.88-.73,3.32-1.78,4.32-3.16,1-1.38,1.5-3.07,1.5-5.07,0-1.45-.28-2.75-.83-3.89-.55-1.14-1.34-2.1-2.37-2.89-1.03-.79-2.29-1.39-3.78-1.8-1.49-.41-3.18-.62-5.05-.62h-13.53v26.31h5.45v-7.89h8.76l5.52,7.89h6.2Z"
      :videoUrl="`${config.public.oosURL}platform/public/video/exeeder.mp4`"
      :poster="
        isMobile
          ? `${config.public.staticURL}/images/explorationImage/exeed_mobile.png`
          : `${config.public.staticURL}/images/explorationImage/exeed.png`
      "
      :classIndex="0"
      :offsetY="-0.1"
      pathId="exeeder"
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
        <tspan x="240" dy="60">NIGHT</tspan>
        <tspan x="240" dy="60">OF</tspan>
        <tspan x="240" dy="60">HONOR</tspan>
      </text>
    </Exeeder> -->
    <!-- 第五屏 -->
    <CardSwiper :videoList="videoList" title="EXEED Events Videos"/>
    <!-- 第七屏 -->
    <section class="section section-6" ref="section6Ref">
      <Sourcematerial :isExploration="true"></Sourcematerial>
    </section>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  reactive,
  nextTick,
  onBeforeMount,
} from "vue";
import Exeeder from "@/components/Exeeder";
import Digitalscroll from "@/components/Digitalscroll";
import Sourcematerial from "@/components/Sourcematerial";
import TextJumping from "@/components/TextJumping";
import BannerSwiper from "@/components/BannerSwiper";
import { Fetch } from "@/utils/common";
import { isMobileDevice } from "@/utils/common/index.js";
const isMobile = computed(() => {
  return isMobileDevice();
});
const isActive = ref(false);
const config = useRuntimeConfig();
const list = ref([]);
// 创建所有section的引用
const section0Ref = ref(null);
const section1Ref = ref(null);
const section2Ref = ref(null);
const section3Ref = ref(null);
const section4Ref = ref(null);
const section5Ref = ref(null);
const section6Ref = ref(null);
// const exeederWrapper = ref(null);
// const scrollTop = ref(0);

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

const videoList = ref([])

infoListS4.value = [
  {
    title: "2",
    targetNumber: 2,
    currentNumber: 0,
    content:
      "Partnering with 2 national platforms, both of which are talent development and presentation related organizations, matches the EXEEDER with an exploratory spirit.",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "12",
    targetNumber: 12,
    currentNumber: 0,
    content:
      "The EXEEDER event honors 12 industry elites, covering industries such as pilots, inventors, scientists, artificial intelligence, designers, etc., all of whom have brought significant advances to their industries.",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "270+",
    targetNumber: 270,
    currentNumber: 0,
    content:
      "The event invited 270+ guests to attend, strengthening the connection between users and the brand, and continuing to build the EXEEDER brand name card.",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
];
infoListS6.value = [
  {
    title: "2",
    targetNumber: 2,
    currentNumber: 0,
    content:
      "The new high-end outdoor SUV RX and the third-generation TXL, two products in total, were used as pilot cars and race cars during the event.",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "8",
    targetNumber: 8,
    currentNumber: 0,
    content:
      "EXEED successfully sponsored the world's 8th largest sporting event and received global Top media coverage such as BBC and Voice of America.",
    contentWords: [],
    isContentVisible: false,
    isVisible: false,
  },
  {
    title: "20",
    targetNumber: 20,
    currentNumber: 0,
    content:
      "Serving as the exclusive designated sponsor vehicle, the EXEED brand made its mark, not just in style but also in functionality, providing essential support throughout the event.",
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

onMounted(async () => {
  // 页面加载后延迟一小段时间触发动画
  setTimeout(() => {
    isActive.value = true;
  }, 100);
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
  Fetch("Exploration-s1-img").then((data) => {
    list.value = data;
  });

  Fetch("ExeedEvents").then((data) => {
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
    if (scrollPosition > sectionDistances[i]) {
      sectionVisibility[i] = true;
    } else {
      sectionVisibility[i] = false;
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
.exploration-page {
  background: black;
  //     /* 新增部分 */
  .exeeder-wrapper {
    position: sticky;
    top: 0;
  }

  // 通用样式（不需要区分设备的样式）
  .section {
    background-color: #000000;
    color: white;
    position: relative;
    z-index: 2;
  }

  .section-6 {
    min-height: 100vh;
    height: fit-content;
  }
  // 桌面端样式（1024px 以上）
  @media screen and (min-width: 1024px) {
    // .section-2{
    //     // margin-top: 200px;
    //     height: 300vh;
    // }
    section {
      width: 100%;
      height: 100vh;
      position: relative;
    }
    .hero-section {
      position: relative;
      height: 100vh;
      .hero-image-bg {
        position: relative;
        top: 0;
        left: 0;
        background-color: #000;
        z-index: -1;
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
        animation: _slideUp 1s ease-out forwards;
        position: absolute;
        left: 1.2rem;
        bottom: 1rem;
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
        bottom: 1rem;
        display: flex;
        align-items: center;
        .hero-indicationPoint-item {
          width: 0.08rem;
          height: 0.08rem;
          opacity: 0.5;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          margin-right: 0.24rem;
          transition: all 5s ease-out;
        }

        .hero-indicationPoint-item.active {
          width: 0.26rem;
          height: 0.26rem;
          opacity: 1;
          border-radius: 50%;
          position: relative;
          --angle: 0deg;
          background: conic-gradient(
            #ffffff 0deg var(--angle),
            rgba(255, 255, 255, 0.5) var(--angle) 360deg
          );
          animation: rotate-gradient 5s linear forwards;
        }

        /* 定义关键帧动画（分阶段旋转） */
        @keyframes rotate-gradient {
          0% {
            --angle: 0deg;
          }
          20% {
            --angle: 70deg;
          }
          40% {
            --angle: 140deg;
          }
          60% {
            --angle: 210deg;
          }
          80% {
            --angle: 280deg;
          }
          100% {
            --angle: 360deg;
          }
        }

        .hero-indicationPoint-item.active::after {
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

        .hero-indicationPoint-item.active::before {
          content: "";
          position: absolute;
          top: 0.02rem;
          left: 0.02rem;
          right: 0.02rem;
          bottom: 0.02rem;
          background-color: #000;
          opacity: 0.7;
          border-radius: 50%;
        }

        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
      }
    }

    .section-1 {
      height: auto;
    }

    // 其他section的z-index设置
    // .section-1 {
    //     z-index: -7;
    // }

    // .section-2 {
    //     z-index: -6;
    // }

    // .section-3 {
    //     z-index: -5;
    // }

    // .section-4 {
    //     z-index: -4;
    // }

    // .section-5 {
    //     z-index: -3;
    // }

    // .section-6 {
    //     z-index: 9;
    // }
  }
  .detail_swiper {
    background: #0d0d0d;
    padding-top: 0.6rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-bottom: 0.6rem;
  }
  .swiper_title01 {
    font-size: 0.2rem;
    font-weight: 500;
    line-height: 0.24rem;
    color: black;
    margin-top: 0.2rem;
  }
  .swiper_title02 {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #b2b2b2;
    margin-top: 0.12rem;
    margin-bottom: 0.6rem;
  }
  .swiper_img {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
  }
  // 移动端样式（1024px 及以下）
  @media screen and (max-width: 1024px) {
    section {
      width: 100%;
      height: auto;
      min-height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .section-6 {
      height: fit-content;
      overflow: hidden;
    }

    .hero-section {
      display: flex;
      height: 100vh;
      flex-direction: column;

      .hero-text {
        animation: _slideUp 1s ease-out forwards;
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
        height: 100%;
        z-index: 1;
        opacity: 1;
        background: linear-gradient(
          rgba(0, 0, 0, 1) 0%,
          rgba(0, 0, 0, 0.1) 50%,
          rgba(0, 0, 0, 1) 100%
        );
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

    .section-active {
      position: relative !important;
    }
  }

  @media screen and (max-width: 550px) {
    .hero-image-bg {
      position: relative;
      overflow: hidden;
    }
  }
  .brandhub-text-mask__surface-text.dubai {
    font-size: 0.7rem;
    transform: translateY(0.14rem);
  }
}
@keyframes titleFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
