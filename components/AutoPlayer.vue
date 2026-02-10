<template>
  <div class="auto-player">
    <Swiper
      :speed="1000"
      @swiper="onAutoPlayerSwiper"
      @slideChange="onAutoPlayerSlideChange"
    >
      <SwiperSlide v-for="(item, index) in props.autoPlayerList" :key="item.id">
        <div
          class="auto-player-wrapper"
          @mouseenter="isShowPlay = true"
          @mouseleave="isShowPlay = false"
        >
          <div style="position: relative">
            <img :src="item.src" alt="" />
            <img class="md-img" :src="item.mdSrc || item.src" alt="" />
            <Play :isShow="isShowPlay" @on-play-click="onPlayClick" />
          </div>
          <div
            :class="[
              'auto-player-progress md-auto-player-progress',
              autoPlayerActiveIndex === index && 'active',
            ]"
          >
            <div class="auto-player-progress-bar">
              <div class="auto-player-progress-bar-inner"></div>
            </div>
            <span class="auto-player-progress-name">{{ item.name }}</span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="auto-player-progress-wrapper">
      <div
        :class="[
          'auto-player-progress',
          autoPlayerActiveIndex === index && 'active',
        ]"
        v-for="(item, index) in props.autoPlayerList"
        :key="item.id"
        @click="onAutoPlayerClick(index)"
      >
        <div class="auto-player-progress-bar">
          <div class="auto-player-progress-bar-inner"></div>
        </div>
        <span class="auto-player-progress-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
  <YoutubePlayer
    :isShow="isShowYoutubePlayer"
    :url="youtubeUrlList"
    :active-index="activeIndex"
    @close="onYoutubeClose"
  />
</template>
<script setup>
// 从 swiper/vue 导入 Swiper 和 SwiperSlide 组件
import { Swiper, SwiperSlide } from "swiper/vue";

/**
 * 定义组件的 props
 * @param {Array} autoPlayerList - 自动播放器的列表数据，默认为空数组
 */
const props = defineProps({
  autoPlayerList: {
    type: Array,
    default: () => [],
  },
});

// 定义一个响应式变量，用于控制 YouTube 播放器的显示与隐藏
const isShowYoutubePlayer = ref(false);
// 定义一个计算属性，将 props.autoPlayerList 中的每个 item 的 url 提取出来组成一个新数组
const youtubeUrlList = computed(() =>
  props.autoPlayerList.map((item) => item.url)
);

// 定义一个响应式变量，用于记录自动播放器当前活动的索引
const autoPlayerActiveIndex = ref(0);
// 定义一个响应式变量，用于记录当前活动的索引
const activeIndex = ref(0);
// 定义一个响应式变量，用于控制播放按钮的显示与隐藏
const isShowPlay = ref(false);

/**
 * 处理播放按钮点击事件
 * 清除自动播放定时器，将自动播放器的活动索引设为 -1，显示 YouTube 播放器
 */
const onPlayClick = () => {
  // 清除自动播放定时器
  clearInterval(autoPlayerTimer);
  // 将自动播放器的活动索引设为 -1
  autoPlayerActiveIndex.value = -1;
  // 显示 YouTube 播放器
  isShowYoutubePlayer.value = true;
};

const onAutoPlayerClick = (index) => {
  autoPlayerSwiper.slideTo(index);
};

/**
 * 处理 YouTube 播放器关闭事件
 * 隐藏 YouTube 播放器，将自动播放器的活动索引设为当前活动索引，重新启动自动播放
 */
const onYoutubeClose = () => {
  // 隐藏 YouTube 播放器
  isShowYoutubePlayer.value = false;
  // 将自动播放器的活动索引设为当前活动索引
  autoPlayerActiveIndex.value = activeIndex.value;
};

// 定义一个变量，用于存储 Swiper 实例
let autoPlayerSwiper = null;
// 定义一个变量，用于存储自动播放定时器
let autoPlayerTimer = null;

const autoPlay = () => {
  // 更新自动播放器的活动索引，使用取模运算确保索引在有效范围内
  autoPlayerActiveIndex.value =
    (autoPlayerActiveIndex.value + 1) % props.autoPlayerList.length;
  // 切换到指定索引的幻灯片
  autoPlayerSwiper.slideTo(autoPlayerActiveIndex.value);
  // 更新当前活动索引
  activeIndex.value = autoPlayerActiveIndex.value;
};

/**
 * 设置自动播放器的自动播放功能
 * 每 5 秒切换一次幻灯片，并更新活动索引
 */
const setAutoPlayerAutoPlay = () => {
  autoPlayerTimer = setInterval(autoPlay, 5000);
};

/**
 * 处理 Swiper 实例初始化事件
 * 存储 Swiper 实例，以便后续使用
 * @param {object} s - Swiper 实例
 */
const onAutoPlayerSwiper = (s) => {
  // 存储 Swiper 实例
  autoPlayerSwiper = s;
};

/**
 * 处理 Swiper 幻灯片切换事件
 * 清除自动播放定时器，更新活动索引，并重新启动自动播放
 * @param {object} param - 包含活动索引等信息的参数对象
 */
const onAutoPlayerSlideChange = (param) => {
  // 清除自动播放定时器
  // autoPlayerTimer && clearInterval(autoPlayerTimer);
  // 更新自动播放器的活动索引
  autoPlayerActiveIndex.value = param.activeIndex;
  // 更新当前活动索引
  activeIndex.value = param.activeIndex;
  // 重新启动自动播放
  // setAutoPlayerAutoPlay();
};
</script>
<style lang="scss" scoped>
.auto-player {
  width: 100%;
  position: relative;
  .auto-player-wrapper {
    width: 100%;
    height: auto;
    img {
      width: 100%;
      object-fit: cover;
    }
    .md-img{
      display: none;
    }
    @media screen and (max-width: 1024px)  {
      img{
        display: none;
      }
      .md-img{
        display: block;
      }
    }
  }
  .auto-player-progress-wrapper {
    width: 100%;
    display: flex;
  }
  .auto-player-progress {
    flex: 1;
    margin-right: 0.16rem;
    cursor: pointer;
    @media screen and (max-width: 1024px) {
      display: none;
    }
    &:nth-last-child(1) {
      margin-right: 0;
    }
    .auto-player-progress-bar {
      width: 100%;
      height: 0.02rem;
      background: #333;
      margin-top: 0.16rem;
      .auto-player-progress-bar-inner {
        width: 0;
        height: 0.02rem;
        background: white;
      }
    }
    .auto-player-progress-name {
      font-size: 0.18rem;
      line-height: 0.26rem;
      color: #808080;
      display: inline-block;
      margin-top: 0.11rem;
    }
  }
  .auto-player-progress.active {
    .auto-player-progress-bar {
      .auto-player-progress-bar-inner {
        width: 100%;
      }
    }
    .auto-player-progress-name {
      color: white;
      transition: all 0.5s;
    }
  }
  .md-auto-player-progress {
    display: none;
    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
}
</style>
