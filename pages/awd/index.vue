<template>
  <div class="awd-page">
    <!-- 第一屏 -->
    <section class="awd-hero-section">
      <BannerSwiper :list="s1List" :isCircleCenter="true">
        <template #default="{ item }">
          <video
            class="s1-video"
            :src="item.url"
            autoplay
            muted
            webkit-playsinline
            playsinline
            preload="metadata"
            loop
          ></video>
          <div class="mask-top"></div>
          <div class="mask-bottom"></div>
          <div class="s1-title">
            <div class="main-title" v-html="item.title"></div>
            <div class="subtitle" v-html="item.subtitle"></div>
          </div>
          <div class="s1-data">
            <div class="s1-data-wrapper" v-for="v in item.carData">
              <div class="s1-data-num">{{ v.num }}</div>
              <div class="s1-data-desc">{{ v.desc }}</div>
            </div>
          </div>
        </template>
      </BannerSwiper>
    </section>
    <!-- 新增第二屏 -->
    <div class="add-page"><AutoPlayer :autoPlayerList="autoPlayerList" /></div>
    <section class="awd-section">
      <div
        class="title animate__animated"
        :class="{ animate__fadeIn: awdSectionVisible }"
      >
        7 Modes
      </div>
      <div
        class="desc animate__animated"
        :class="{ animate__fadeIn: awdSectionVisible }"
      >
        AWD with Easeas a Global Leader
      </div>
      aff
      <div
        class="card-items animate__animated"
        :class="{ animate__fadeIn: awdSectionVisible }"
      >
        <div class="card-item" v-for="item in modesList">
          <div class="shadow"></div>
          <BaseImg :src="item.src" alt="" />
          <div class="card-item-title">
            {{ item.title }}
            <div class="card-item-desc" v-html="item.desc"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="awd-h5Section">
      <div class="title-01">7 Modes</div>
      <div class="title-02">AWD with Easeas a Global Leader</div>
      <div class="card-item" v-for="item in modesList">
        <div class="shadow"></div>
        <BaseImg class="img" :src="item.mdSrc" />
        <div class="card-item-title">
          {{ item.title }}
          <div class="card-item-desc">{{ item.desc }}</div>
        </div>
      </div>
    </section>
    <!-- 第三屏 -->
    <div class="add-page">
      <AutoPlayer :autoPlayerList="autoPlayerFiveList" />
    </div>

    <!-- 第四屏 -->
    <CommonFourSection title="Intelligently Climbing under Creep Mode" />
    <YoutubePlayer
      :isShow="showplayer"
      @close="onPlayerClose"
      url="https://www.youtube.com/embed/4nWjSIDYG5U?"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, watch } from "vue";
import { Fetch } from "@/utils/common";
// import CommonFourSection from '@/components/CommonFourSection/index.vue';
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import "animate.css";
const config = useRuntimeConfig();
// import { fa } from "element-plus/es/locales.mjs";
// 用于存储当前幻灯片的下标
const currentIndex = ref(0);
const lineWidth = ref(0);
const timer = ref(null);
let timerNull = null;
const awdSectionVisible = ref(false);
const threeSectionVisible = ref(false);
const demo11 = ref(false);
const showplayer = ref(false);
let isInitialScroll = true; // 添加标记，用于判断是否是初始滚动
const ANIMATION_INTERVAL = 100; //视频每间隔100ms
const PROGRESS_MAX = 100; //视频播放到100%
// const modes = ref(["Sports Mode", "Snowfield Mode", "Sand Mode"]);
// 监听 isVisible 的变化，触发动画
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

const s1List = ref([]);

const modesList = [
  {
    src: "explorationImage/EnergySaving.png",
    mdSrc: "models/h5/50.png",
    title: "Energy Saving",
    desc: "Extreme Energy Saving",
  },
  {
    src: "explorationImage/Comfort.png",
    mdSrc: "models/h5/51.png",
    title: "Comfort",
    desc: "Ultimate Comfort",
  },
  {
    src: "explorationImage/Sports.png",
    mdSrc: "models/h5/52.png",
    title: "Sports",
    desc: "ESuper Powertrain",
  },
  {
    src: "explorationImage/Off-road.png",
    mdSrc: "models/h5/53.png",
    title: "Off-road",
    desc: "Ultimate Escape Capability",
  },
  {
    src: "explorationImage/SnowField.png",
    mdSrc: "models/h5/54.png",
    title: "Snow Field",
    desc: "No Fear of<br>Slippery Conditions",
  },
  {
    src: "explorationImage/SandyRoad.png",
    mdSrc: "models/h5/55.png",
    title: "Sandy Road",
    desc: "Driving Swiftly<br>through the Desert",
  },
  {
    src: "explorationImage/Unique.png",
    mdSrc: "models/h5/56.png",
    title: "Unique",
    desc: "Customized Driving Experience",
  },
];

const getS1Data = () => {
  Fetch("Awd-s0").then((data) => {
    s1List.value = data.map((item) => {
      return {
        ...item,
        subtitle: item.jsondef?.subtitle || "",
        carData: item.jsondef?.carData || [],
      };
    });
  });
};

// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  const selectors = [".section-title"];
  const action = newVal ? "add" : "remove";
  selectors.forEach((selector) => {
    targetRef.value.querySelector(selector)?.classList[action]("animate");
  });
});

onMounted(() => {
  getData();
  getS1Data();
  getDataFive();
  // 禁用浏览器的滚动恢复
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  // 立即滚动到顶部
  window.scrollTo(0, 0);

  // 等待滚动到顶部后再初始化观察者
  setTimeout(() => {
    isInitialScroll = false;
    initializeObservers();
  }, 0);
});
// 初始化监听
const initializeObservers = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (isInitialScroll) return;

      entries.forEach((entry) => {
        const targetElement = entry.target;
        const handlers = {
          "add-page": handleaddsectionvisibility,
          "awd-section": handleAwdSectionVisibility,
        };

        Object.entries(handlers).forEach(([className, handler]) => {
          if (targetElement.classList.contains(className)) {
            handler(entry);
          }
        });
      });
    },
    { threshold: 0.3 }
  );

  document
    .querySelectorAll(".awd-section, .three-section, .add-page")
    .forEach((section) => observer.observe(section));

  return observer;
};

// 监听第二屏的显示
const handleAwdSectionVisibility = (entry) => {
  awdSectionVisible.value = entry.isIntersecting;
};
// 监听新增第二屏的显示
const handleaddsectionvisibility = (entry) => {
  demo11.value = entry.isIntersecting;
};
const autoPlayerList = ref([]);
const autoPlayerFiveList = ref([]);
const getUrlParam = (url, str) => {
  const address = new URL(url);
  const searchParams = new URLSearchParams(address.search);
  return searchParams.get(str);
};

const getData = () => {
  Fetch("Awd-s1").then((data) => {
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
const getDataFive = () => {
  Fetch("Awd-s2").then((data) => {
    autoPlayerFiveList.value = data.map((item) => {
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
// 统一的定时器处理函数
const handleProgressTimer = (shouldStart = true) => {
  clearInterval(timerNull);
  clearInterval(timer.value);

  if (shouldStart) {
    timerNull = setInterval(() => {
      if (lineWidth.value < PROGRESS_MAX) lineWidth.value++;
    }, ANIMATION_INTERVAL);
  } else {
    lineWidth.value = 100;
  }
};
// 统一的动画类处理函数
const handleAnimationClasses = (
  element,
  shouldAdd = true,
  className = "animate-in"
) => {
  if (!element) return;
  element.classList[shouldAdd ? "add" : "remove"](className);
};
//sh
const onPlayClick = () => {
  showplayer.value = true;
};
const onPlayerClose = () => {
  showplayer.value = false;
};
onBeforeMount(() => {
  handleProgressTimer(false);
});
</script>

<style lang="scss" scoped>
.awd-page {
  // width: 100vw;
  width: 100%;
  overflow: hidden;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  //  overflow-x: hidden;

  section {
    width: 100%;
    // height: 10.8rem;
    height: 100vh;
    background-color: #000;
    box-sizing: border-box !important;
  }

  // 第一屏
  .awd-hero-section {
    overflow: hidden;
    position: relative;
    height: 100vh;
    .mask-top {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 40%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0) 100%
      );
    }
    .mask-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 30%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.6438) 55%,
        rgba(0, 0, 0, 1) 100%
      );
    }
    .s1-video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }
    .s1-title {
      width: 100%;
      margin-top: 1.92rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .main-title {
        width: 8.3rem;
        font-size: 0.52rem;
        line-height: 0.6rem;
        color: white;
        text-align: center;
      }
      .subtitle {
        font-size: 0.2rem;
        line-height: 0.28rem;
        margin-top: 0.28rem;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
      }
    }
    .s1-data {
      position: absolute;
      left: 0;
      bottom: 0.8rem;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .s1-data-wrapper {
        margin-right: 0.28rem;
        width: 3.2rem;
        text-align: center;
        .s1-data-num {
          padding: 0.16rem 0;
          font-size: 0.46rem;
          line-height: 0.54rem;
          color: white;
        }
        .s1-data-desc {
          font-size: 0.16rem;
          line-height: 0.24rem;
          color: rgba(255, 255, 255, 0.8);
          padding-bottom: 0.16rem;
          white-space: nowrap;
        }
      }
    }
    @media screen and (max-width: 1024px) {
      .mask-top {
        height: 60%;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.7) 14%,
          rgba(0, 0, 0, 0.6887) 14%,
          rgba(0, 0, 0, 0.45) 77%,
          rgba(0, 0, 0, 0) 100%
        );
      }
      .mask-bottom {
        height: 20%;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0) -7%,
          rgba(0, 0, 0, 0.6438) 53%,
          rgba(0, 0, 0, 1) 107%
        );
      }
      .s1-title {
        margin-top: 0.78rem;
        .main-title {
          width: 100%;
          padding: 0 0.2rem;
          box-sizing: border-box;
          font-size: 0.26rem;
          line-height: 0.3rem;
        }
        .subtitle {
          font-size: 0.14rem;
          line-height: 0.2rem;
          margin-top: 0.12rem;
          padding: 0 0.2rem;
        }
      }
      .s1-data {
        flex-wrap: wrap;
        position: static;
        margin-top: 0.4rem;
        .s1-data-wrapper {
          width: 1.4rem;
          margin-bottom: 0.1rem;
          &:nth-of-type(2n) {
            margin-right: 0;
          }
          .s1-data-num {
            font-size: 0.24rem;
            line-height: 0.32rem;
            padding: 0;
          }
          .s1-data-desc {
            font-size: 0.12rem;
            line-height: 0.2rem;
            margin-top: 0.04rem;
            padding: 0;
            white-space: normal;
          }
        }
      }
    }
  }

  // 第二屏
  .awd-section {
    padding-top: 1.6rem;

    .title {
      // padding-top: 1.6rem;
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
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: opacity, transform;
      text-transform: none;

      &.animate__fadeIn {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .desc {
      margin-top: 0.28rem;
      text-align: center;
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: rgba(255, 255, 255, 0.8);
      opacity: 0;
      transform: translateY(0.2rem);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: opacity, transform;
      transition-delay: 0.2s;

      &.animate__fadeIn {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .card-items {
      display: flex;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      position: relative;
      padding: 0.5rem 0 0;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: opacity, transform;

      &.animate__fadeIn {
        opacity: 1;
        transform: translateY(0);

        .card-item {
          .card-item-title {
            opacity: 0;
            transform: translate(-50%, 20px);
            animation: titleFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            animation-delay: 0.3s;

            .card-item-desc {
              opacity: 0;
              transform: translateY(10px);
              animation: descFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              animation-delay: 0.6s;
            }
          }
        }
      }

      .card-item {
        width: 2.786rem;
        height: 7.24rem;
        overflow: hidden;
        position: relative;
        margin-right: 0.04rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: width, filter;

        &:hover {
          width: 4.02rem;
          z-index: 2;

          img {
            transform: scale(1.05);
          }

          ~ .card-item {
            filter: blur(0.04rem);
          }

          .card-item-title {
            opacity: 1;
            transform: translate(-50%, -0.1rem);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

            .card-item-desc {
              opacity: 1;
              transform: translateY(0);
              color: #ffffff;
              transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .shadow {
          width: 100%;
          height: 100%;
          opacity: 1;
          background: linear-gradient(
            180deg,
            #000000 0%,
            rgba(0, 0, 0, 0.15) 37%,
            rgba(0, 0, 0, 0.15) 70%,
            rgba(0, 0, 0, 0.5) 100%
          );
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .card-item-title {
          position: absolute;
          z-index: 2;
          top: 83%;
          left: 50%;
          transform: translate(-50%, 0);
          font-family: Saira;
          font-size: 0.24rem;
          font-weight: normal;
          line-height: 0.32rem;
          font-variation-settings: "opsz" auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
          color: #ffffff;
          opacity: 1;
          will-change: opacity, transform;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

          .card-item-desc {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin-top: 0.08rem;
            font-family: Saira;
            font-size: 0.14rem;
            font-weight: normal;
            line-height: 0.22rem;
            font-variation-settings: "opsz" auto;
            color: rgba(255, 255, 255, 0.6);
            opacity: 0.6;
            transform: translateY(0);
            will-change: opacity, transform, color;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }

        .snow-field {
          bottom: 0.4rem;
        }
      }

      &:hover {
        .card-item:not(:hover) {
          filter: blur(0.04rem);
        }
      }
    }
  }
  .aed-h5Section {
    display: none;
  }
  //第三屏
  .three-section {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 1.6rem;
    height: 12.51rem;

    .title {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #ffffff;
      opacity: 0;
      animation-duration: 1s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }

    .desc {
      margin: 0.2rem 0 0.73rem;
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #cccccc;
      opacity: 0;
      animation-duration: 1s;
      animation-delay: 0.6s;
      animation-fill-mode: forwards;
    }
  }
  .add-page {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2.4rem;
    padding-left: 1.6rem;
    padding-right: 1.6rem;
    height: 12.51rem;
    background-color: #000;
  }
}
.awd-h5-section {
  display: none;
}
.awd-h5Section {
  display: none;
}
.btn_01 {
  display: none;
}
@media screen and (max-width: 1024px) {
  .awd-page {
    section {
      height: 100%;
    }
    .awd-h5-section {
      display: block;
      height: 100vh;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .section-title {
        position: absolute;
        top: 0.78rem;
        color: #ffffff;
        padding: 0 0.2rem;
        text-align: center;
        width: 100%;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.6s;
        &.animate {
          transform: translateY(0);
          opacity: 1;
        }
        .title-01 {
          font-size: 0.26rem;
          line-height: 0.3rem;
          margin-bottom: 0.12rem;
        }
        .title-02 {
          font-size: 0.14rem;
          line-height: 0.2rem;
          margin-bottom: 0.4rem;
        }
        .title-03 {
          display: flex;
          justify-content: space-around;
          div {
            .title-04 {
              font-size: 0.24rem;
              font-weight: 500;
              line-height: 0.32rem;
              margin-bottom: 0.04rem;
            }
            .title-05 {
              font-size: 0.12rem;
              line-height: 0.2rem;
              color: rgba(255, 255, 255, 0.8);
            }
          }
        }
      }
    }
  }
  .awd-section {
    padding-top: 0.8rem !important;
    .title {
      font-size: 0.26rem !important;
      line-height: 0.3rem !important;
      color: #ffffff !important;
      margin-bottom: 0.08rem !important;
    }
    .desc {
      font-size: 0.14rem !important;
      line-height: 0.3rem !important;
      color: #ffffff !important;
      margin: 0 !important;
    }
  }
  .awd-section {
    display: none;
  }
  .awd-h5Section {
    display: block;
    padding-top: 0.8rem;
    .title-01 {
      font-size: 0.26rem;
      line-height: 0.3rem;
      color: #ffffff;
      margin-bottom: 0.08rem;
      text-align: center;
    }
    .title-02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #ffffff;
      text-align: center;
      margin-bottom: 0.2rem;
    }
    .card-item {
      height: 1rem;
      width: 100%;
      overflow: hidden;
      position: relative;
      margin-bottom: 0.04rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      will-change: width, filter;
      &:hover {
        height: 1.2rem;
        z-index: 2;

        .img {
          transform: scale(1.05);
        }

        ~ .card-item {
          filter: blur(0.04rem);
        }

        .card-item-title {
          opacity: 1;
          transform: translate(-50%, -0.1rem);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

          .card-item-desc {
            opacity: 1;
            transform: translateY(0);
            color: #ffffff;
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      }

      .img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .shadow {
        width: 100%;
        height: 100%;
        opacity: 1;
        background: linear-gradient(
          180deg,
          rgba(0, 0, 0, 0.15) -2%,
          rgba(0, 0, 0, 0.5) 103%
        );
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
      }
    }
    .card-item-title {
      position: absolute;
      z-index: 2;
      bottom: 0.27rem;
      left: 50%;
      transform: translate(-50%, 0);
      font-family: Saira;
      font-size: 0.18rem;
      font-weight: normal;
      line-height: 0.26rem;
      font-variation-settings: "opsz" auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      color: #ffffff;
      opacity: 1;
      transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);

      .card-item-desc {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 0.08rem;
        font-family: Saira;
        font-size: 0.14rem;
        font-weight: normal;
        line-height: 0.22rem;
        font-variation-settings: "opsz" auto;
        color: rgba(255, 255, 255, 0.8);
        transform: translateY(0);
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
  .three-section {
    padding-top: 0.8rem !important;
    margin-top: -0.04rem;
    height: 100% !important;
    border-bottom: 0.01rem solid #d8d8d8;
    .title {
      font-size: 0.26rem !important;
      line-height: 0.3rem !important;
      margin-bottom: 0.08rem;
    }
    .desc {
      font-size: 0.14rem !important;
      line-height: 0.2rem !important;
      margin: 0 !important;
      margin-bottom: 0.4rem !important;
    }
  }
  .awd-page {
    .add-page {
      padding: 0.8rem 0.2rem 0.4rem 0.2rem;
      height: fit-content;
    }
  }

  .three-bg {
    height: 1.97rem !important;
  }
  .btn {
    opacity: 0;
  }
  .btn_01 {
    display: block;
    font-size: 0.12rem;
    line-height: 0.2rem;
    text-align: center;
    color: #ffffff;
    margin-top: -0.5rem;
  }
}
@keyframes titleFadeIn {
  0% {
    opacity: 0;
    transform: translate(-50%, 20px);
  }

  100% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes descFadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }

  100% {
    opacity: 0.6;
    transform: translateY(0);
  }
}

@keyframes titleHover {
  0% {
    transform: translate(-50%, 0);
  }

  100% {
    transform: translate(-50%, -0.1rem);
  }
}

@keyframes descHover {
  0% {
    opacity: 0.6;
    transform: translateY(0);
  }

  100% {
    opacity: 1;
    color: #ffffff;
    transform: translateY(0);
  }
}
</style>
