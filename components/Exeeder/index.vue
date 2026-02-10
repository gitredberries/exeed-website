<script setup>
// 定义组件的props，包括类型和默认值
const props = defineProps({
  dPath: {
    type: String,
    default: "",
  },
  classIndex: {
    type: Number,
    default: 0,
  },
  videoUrl: {
    type: String,
    default: "",
  },
  textList: {
    type: Array,
    default: [],
  },
  pathId: {
    type: String,
    default: "clip",
  },
  poster: {
    type: String,
    default: "",
  },
  videoList: {
    type: Array,
    default: [],
  },
});

const config = useRuntimeConfig();

// 定义响应式变量
const scale = ref(1); // 控制缩放比例
const outerMaskRef = ref(); // 外部遮罩的引用
const textMaskRef = ref(); // 文本遮罩的引用
const showMask = ref("block"); // 控制遮罩的显示状态

// 当前视频的URL和海报
const currentVideoUrl = ref(props.videoUrl);
const currentVideoPoster = ref(props.poster);

// 定义类名列表
const classsNameList = [
  "brandhub-text-exeeder",
  "brandhub-text-dubai",
  "brandhub-text-extreme",
  "brandhub-text-race",
];

// 定义常量
const l = 230;
const s = 100;

// 计算填充文本的样式
const filledTextStyle = computed(
  () => `transform: scale(${scale.value ** 2 + 1});`
);

// 计算遮罩文本的样式
const maskTextStyle = computed(
  () => `transform: scale(${scale.value ** 3 * l + 1});`
);

// 计算缩放比例
const calculateScale = () => {
  if (outerMaskRef.value) {
    const rect = outerMaskRef.value.getBoundingClientRect();
    const t = rect.top;
    const { innerHeight: i } = window;
    t > 0
      ? (scale.value = 0)
      : t < i * -1
      ? (scale.value = 1)
      : (scale.value = (t / i / (s / 100)) * -1);
    if (rect.height + t >= 0 && rect.height + t <= i + l) {
      showMask.value = "none";
    } else {
      showMask.value = "block";
    }
  }
};

// 当前激活的视频项索引
const videoItemActiveIndex = ref(0);

// 监听视频列表的变化
watch(
  () => props.videoList,
  (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0) {
      currentVideoUrl.value = newVal[0].url;
    }
  }
);

// 定义鼠标事件变量
let isMouseDown = false;
let mouseX = 0;
let curMouseX = 0;
const videoSwiperX = ref(0); // 视频滑动的X坐标
const videoSwiperRef = ref(); // 视频滑动的引用
let rect = {}; // 视频滑动的矩形区域

let lastMouseX = 0;
let lastMouseTime = 0;
let velocityX = 0;
let inertiaTimer = null;

// 是否打开列表
const isOpenList = ref(false);

// 视频项点击事件
const onVideoItemClick = (ev, item, index) => {
  if (ev.clientX === curMouseX) {
    videoItemActiveIndex.value = index;
    currentVideoUrl.value = item.url;
  }
};

// 视频滑动鼠标按下事件
const onVideoSwiperMouseDown = (e) => {
  mouseX = e.clientX;
  curMouseX = e.clientX;
  rect = videoSwiperRef.value?.getBoundingClientRect() || {};
  if (rect.width > window.innerWidth) {
    isMouseDown = true;
  }

  lastMouseX = e.clientX;
  lastMouseTime = Date.now();
  velocityX = 0;
  if (inertiaTimer) {
    clearInterval(inertiaTimer);
    inertiaTimer = null;
  }
};

// 视频滑动鼠标移动事件
const onVideoSwiperMouseMove = (e) => {
  if (isMouseDown) {
    const currentTime = Date.now();
    const deltaX = e.clientX - lastMouseX;
    const deltaTime = currentTime - lastMouseTime;
    if (deltaTime > 0) {
      velocityX = deltaX / deltaTime;
    }
    lastMouseX = e.clientX;
    lastMouseTime = currentTime;

    let x = e.clientX - mouseX;
    const maxX = rect.width - window.innerWidth;
    videoSwiperX.value += x;
    if (videoSwiperX.value < -maxX) {
      videoSwiperX.value = -maxX;
    } else if (videoSwiperX.value > 0) {
      videoSwiperX.value = 0;
    }
    mouseX = e.clientX;
  }
  return false;
};

const onVideoSwiperMouseUp = (e) => {
  isMouseDown = false;

  // 开始惯性滑动
  if (Math.abs(velocityX) > 0.1) {
    inertiaTimer = setInterval(() => {
      videoSwiperX.value += velocityX;
      velocityX *= 0.95; // 摩擦力减小速度

      if (Math.abs(velocityX) < 0.1) {
        velocityX = 0;
        clearInterval(inertiaTimer);
        inertiaTimer = null;
      }

      // 边界检查
      const maxX = rect.width - window.innerWidth;
      if (videoSwiperX.value < -maxX) {
        videoSwiperX.value = -maxX;
        velocityX = 0;
        clearInterval(inertiaTimer);
        inertiaTimer = null;
      } else if (videoSwiperX.value > 0) {
        videoSwiperX.value = 0;
        velocityX = 0;
        clearInterval(inertiaTimer);
        inertiaTimer = null;
      }
    }, 16); // 大约60fps
  }
};

const onVideoSwiperTouchStart = (e) => {
  onVideoSwiperMouseDown(e.targetTouches[0]);
}

const onVideoSwiperTouchMove = (e) => {
  onVideoSwiperMouseMove(e.targetTouches[0]);
}

const onVideoSwiperTouchEnd = (e) => {
  onVideoSwiperMouseUp(e.changedTouches[0]);
}

// 组件挂载后添加事件监听
onMounted(() => {
  window.addEventListener("scroll", calculateScale, {
    passive: false,
  });

  document.addEventListener("mouseup", onVideoSwiperMouseUp);
  document.addEventListener("mousemove", onVideoSwiperMouseMove);

  document.addEventListener("touchmove", onVideoSwiperTouchMove);
  document.addEventListener("touchend", onVideoSwiperTouchEnd);
});

onUnmounted(() => {
  window.removeEventListener("scroll", calculateScale);
  document.removeEventListener("mouseup", onVideoSwiperMouseUp);
  document.removeEventListener("mousemove", onVideoSwiperMouseMove);
})
</script>

<template>
  <div class="text-mask">
    <div class="outer-mask" ref="outerMaskRef">
      <div
        ref="textMaskRef"
        :class="['text-mask-inner', classsNameList[props.classIndex]]"
      >
        <svg
          class="svg-outer"
          role="img"
          aria-labelledby="svg-mask-title"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 960"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <clipPath
              :id="props.pathId"
              class="svg-clip-path"
              :style="maskTextStyle"
            >
              <path
                :d="props.dPath"
                class="svg-path"
                fill-rule="nonzero"
              ></path>
            </clipPath>
          </defs>
          <g
            class="exeeder"
            :clip-path="`url(#${props.pathId})`"
            :style="filledTextStyle"
          >
            <rect
              class="svg-text"
              fill="black"
              height="960"
              width="480"
              x="0"
              y="0"
            ></rect>
            <slot></slot>
          </g>
        </svg>
        <div class="parsys">
          <div
            class="mask"
            :style="{
              display: showMask,
            }"
          ></div>
          <video
            :src="currentVideoUrl"
            autoplay
            muted
            webkit-playsinline
            playsinline
            preload="metadata"
            loop
            :poster="currentVideoPoster"
          ></video>
          <div class="video-swiper-wrapper">
            <div
              class="more-btn-wrapper"
              v-if="!isOpenList && props.videoList.length"
              @click="isOpenList = true"
            >
              <span>View more exciting events</span>
              <BaseImg src="common/doubleArrow.png" />
            </div>
            <div
              class="more-btn-wrapper close-wrapper"
              v-if="isOpenList"
              @click="isOpenList = false"
            >
              <span>Close</span>
              <BaseImg src="common/close.svg" />
            </div>
            <div :class="['video-outer', isOpenList ? 'active' : '']">
              <div
                class="video-swiper"
                ref="videoSwiperRef"
                :style="{ transform: `translateX(${videoSwiperX}px)` }"
                @mousedown="onVideoSwiperMouseDown"
                @selectstart.prevent
                @touchstart="onVideoSwiperTouchStart"
              >
                <div
                  :class="[
                    'video-item',
                    videoItemActiveIndex === index ? 'active' : '',
                  ]"
                  v-for="(item, index) in props.videoList"
                  @click="onVideoItemClick($event, item, index)"
                >
                  <img
                    class="pc-img"
                    :src="item.image"
                    :draggable="false"
                  />
                  <img
                    class="mobile-img"
                    :src="item.imageMobile"
                    :draggable="false"
                  />
                  <span :title="item.title" class="text">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.text-mask {
  width: 100%;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  .outer-mask {
    width: 100%;
    height: 210vh;
    .text-mask-inner {
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: sticky;
      top: 0;
      .parsys {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        .mask {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          background: white;
          opacity: 0.8;
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.svg-outer {
  pointer-events: none;
}
.video-swiper-wrapper {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
  .more-btn-wrapper {
    margin: 0 auto;
    height: 0.28rem;
    line-height: 0.28rem;
    padding: 0 0.16rem;
    color: white;
    border: 1px solid #ffffff;
    opacity: 0.7;
    font-size: 0.14rem;
    border-radius: 0.48rem;
    width: fit-content;
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s;
    img {
      width: 0.16rem;
      height: 0.16rem;
      margin-left: 0.02rem;
    }
    &:hover {
      opacity: 1;
    }
  }
  .video-outer {
    width: 100%;
    overflow: hidden;
    max-height: 0;
    transition: all 0.5s ease-in-out;
    .video-swiper {
      min-width: 100%;
      width: fit-content;
      margin-bottom: 0.18rem;
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      padding: 0 1.2rem;
      .video-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 2.24rem;
        flex-shrink: 0;
        margin-right: 0.32rem;
        cursor: pointer;
        img {
          width: 2.24rem;
          aspect-ratio: 1.75;
          object-fit: cover;
          border-radius: 0.1rem;
          border: 2px solid rgba(255, 255, 255, 0);
        }
        .mobile-img {
          display: none;
        }
        .pc-img {
          display: block;
        }
        .text {
          text-align: center;
          color: #ffffff;
          font-size: 0.14rem;
          line-height: 0.22rem;
          margin-top: 0.12rem;
          display: -webkit-box;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          line-clamp: 2;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        &:nth-last-of-type(1) {
          margin-right: 0;
        }
        &:active {
          cursor: grab;
        }
      }
      .video-item.active {
        img {
          border: 2px solid rgba(255, 255, 255, 0.5);
        }
      }
      &:active {
        cursor: grab;
      }
    }
  }
  .video-outer.active {
    max-height: 2rem;
  }
}

@media screen and (max-width: 1400px) {
  .video-swiper-wrapper {
    .more-btn-wrapper {
      margin-bottom: 0.35rem;
    }
    .video-outer {
      .video-swiper {
        padding: 0 0.2rem;
        .video-item {
          width: 1.68rem;
          margin-right: 0.28rem;
          .mobile-img {
            display: block;
          }
          .pc-img {
            display: none;
          }
        }
      }
    }
  }
}
.brandhub-text-exeeder {
  .exeeder,
  .svg-clip-path {
    transform-origin: 48.8% 46.19%;
  }
}
.brandhub-text-dubai {
  .exeeder,
  .svg-clip-path {
    transform-origin: 50.8% 49.9%;
  }
}

.brandhub-text-extreme {
  .exeeder,
  .svg-clip-path {
    transform-origin: 49.81% 47.27%;
  }
}

.brandhub-text-race {
  .exeeder,
  .svg-clip-path {
    transform-origin: 50.9% 50%;
  }
}
</style>
<style>
.brandhub-text-mask__surface-text {
  font-size: 0.438rem;
  opacity: 0.7;
  stroke: white;
  stroke-width: 0.005em;
  z-index: 2;
}
</style>
