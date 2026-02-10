<template>
  <div class="events">
    <div :class="['video-container', isActive ? 'active' : '']">
      <div
        :style="{ display: index === activeIndex ? 'block' : 'none' }"
        class="video-item-box"
        v-for="(item, index) in videoList"
        :key="index"
      >
        <video
          v-if="index === activeIndex"
          :src="item.url"
          autoplay
          webkit-playsinline
          playsinline
          muted
          loop
        ></video>
      </div>
    </div>
    <ul class="progress-container">
      <li
        :class="index === activeIndex && 'active'"
        v-for="(item, index) in videoList"
        :key="index"
      >
        <div class="line"></div>
        <div class="text">{{ item.title }}</div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useHeaderStore } from "@/stores/useHeader.ts";
import { debunce, isMobileDevice } from "@/utils/common";

const config = useRuntimeConfig();
const store = useHeaderStore();
const activeIndex = ref(0);
const isActive = ref(true);
let isMobile = false;

const videoList = ref([]);

const props = defineProps({
  code: {
    type: String,
    default: "",
  },
});
watch(activeIndex, (newIndex, oldIndex) => {
  // 预加载下一个视频
  if (newIndex < videoList.value.length - 1) {
    const nextVideo = document.createElement("video");
    nextVideo.src = videoList.value[newIndex + 1].url;
    nextVideo.preload = "metadata";
  }
});
const getData = () => {
  fetch(
    `${config.public.apiURL}api/front/banners?code=${props.code}&siteCode=chery_xt`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((res) => {
      if (res.code === 0) {
        const data = res.data || [];
        videoList.value = data.sort((a, b) => a.sort - b.sort);
      }
    });
};

onMounted(() => {
  getData();
});

const onWheel = (ev) => {
  /**
   * 检查鼠标滚轮滚动方向
   * 如果滚轮向下滚动（deltaY > 0），尝试切换到下一个视频
   * 如果滚轮向上滚动（deltaY <= 0），尝试切换到上一个视频
   */
  if (ev.deltaY > 0) {
    // 检查当前是否不是最后一个视频
    if (activeIndex.value < videoList.value.length - 1) {
      // 先将 isActive 设为 false，触发视频容器的动画效果
      isActive.value = false;
      // 100 毫秒后将 isActive 设为 true，完成动画过渡
      setTimeout(() => {
        isActive.value = true;
      }, 100);
      // 250 毫秒后将 activeIndex 加 1，切换到下一个视频
      setTimeout(() => {
        activeIndex.value++;
      }, 250);
    }
  } else {
    // 检查当前是否不是第一个视频
    if (activeIndex.value > 0) {
      // 先将 isActive 设为 false，触发视频容器的动画效果
      isActive.value = false;
      // 100 毫秒后将 isActive 设为 true，完成动画过渡
      setTimeout(() => {
        isActive.value = true;
      }, 100);
      // 250 毫秒后将 activeIndex 减 1，切换到上一个视频
      setTimeout(() => {
        activeIndex.value--;
      }, 250);
    }
  }
};

const onTouchStart = (ev) => {
  moveNum = ev.touches[0].clientY;
};

const onTouchEnd = (ev) => {
  if (ev.changedTouches[0].clientY - moveNum > 0) {
    onWheel({ deltaY: -1 });
  } else {
    onWheel({ deltaY: 1 });
  }
};

let moveNum = 0;

onMounted(async () => {
  isMobile = isMobileDevice();
  nextTick(() => {
    store.setShowFooter(false);
  });
  if (isMobile) {
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
  } else {
    window.addEventListener("wheel", debunce(onWheel), { passive: false });
  }
});

onUnmounted(() => {
  store.setShowFooter(true);
  if (isMobile) {
    window.removeEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    window.removeEventListener("touchend", onTouchEnd, { passive: false });
  } else {
    window.removeEventListener("wheel", debunce(onWheel), { passive: false });
  }
});
</script>
<style lang="scss" scoped>
@keyframes scaleInOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.events {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
  .video-container {
    width: 100%;
    height: calc(100% - 0.72rem);
    margin-top: 0.72rem;
    @media screen and (max-width: 1024px) {
      height: calc(100% - 0.52rem);
      margin-top: 0.52rem;
    }
    .video-item-box {
      width: 100%;
      height: 100%;
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .video-container.active {
    transform: scale(1);
    animation: scaleInOut 0.5s ease-out forwards;
  }
  .progress-container {
    position: fixed;
    height: calc(100vh - 1.26rem);
    display: flex;
    flex-direction: column;
    z-index: 5;
    left: 0;
    top: 1.26rem;
    justify-content: center;
    pointer-events: none;
    padding-left: 0.4rem;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.31) 0%, rgba(0, 0, 0, 0) 100%);
    li {
      margin: 0.1rem 0;
      display: flex;
      align-items: center;
      flex-shrink: 0;
      .line {
        width: 0.12rem;
        height: 0.02rem;
        background: rgba(255, 255, 255, 0.5);
        margin-right: 0.12rem;
        transition: all 0.5s ease;
      }
      .text {
        font-size: 0.18rem;
        line-height: 0.26rem;
        color: rgba(255, 255, 255, 0.8);
        opacity: 0;
        transition: all 0.5s ease;
      }
    }
    li.active {
      .line {
        width: 0.24rem;
        background-color: white;
      }
      .text {
        opacity: 1;
      }
    }
    @media screen and (max-width: 1024px) {
      height: calc(100vh - 0.52rem);
      top: 0.52rem;
      li {
        .text {
          font-size: 0.14rem;
          line-height: 0.2rem;
        }
      }
    }
  }
}
</style>
