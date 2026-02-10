<template>
  <!-- 播放视频按钮 -->
  <div class="video">
    <video
      id="videoPlayer"
      class="w-full"
      autoplay
      muted
      loop
      webkit-playsinline
      playsinline
      :poster="demo"
    >
      <source :src="currentVideo" type="video/mp4" />
    </video>
    <div class="video_button">
      <div v-if="showControls" class="video_back" @click="videoPlayFullScreen">
        <div>{{ buttonText }}</div>
        <div class="zdt_b_icon">
          <BaseImg class="zbi_1" src="models/vx/12.png" alt="" />
          <BaseImg class="zbi_2" src="models/vx/12.png" alt="" />
        </div>
      </div>
    </div>
  </div>
  <!-- 视频弹窗 -->
  <Dialog
    v-model="videoDialog"
  >
    <div>
      <video
        class="w-full_1 lg:w-[96%] h-1/3 lg:h-[88vh] object-none"
        autoplay
        controls
        webkit-playsinline
        playsinline
      >
        <source :src="currentVideo" type="video/mp4" />
      </video>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const videoPlayerRef = ref(null);
// 视频数据集合
const videoData = {
  vx: {
    video: "vx_detail3.mp4",
    // poster: "banner3_1.jpg",
    buttonText: "APPEARANCE VIDEO",
  },
  rx5: {
    video: "rx_detail5.mp4",
    // poster: "64.png",
    buttonText: "APPEARANCE VIDEO",
  },
  awd1: {
    video: "awd_detail1.mp4",
    poster: "66.png",
    buttonText: "PRODUCT VIDEO 1",
  },
  awd2: {
    video: "awd_detail2.mp4",
    poster: "67.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd3: {
    video: "awd_detail3.mp4",
    // poster: "01.jpg",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd4: {
    video: "awd_detail4.mp4",
    // poster: "01.jpg",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd5: {
    video: "awd_detail5.mp4",
    // poster: "01.jpg",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd6: {
    video: "awd_swipe03.mp4",
    poster: "57.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd7: {
    video: "awd_swipe04.mp4",
    poster: "58.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd8: {
    video: "awd_swipe02.mp4",
    poster: "59.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd9: {
    video: "awd_swipe01.mp4",
    poster: "60.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd10: {
    video: "awd_swipe05.mp4",
    poster: "61.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd11: {
    video: "awd_swipe06.mp4",
    poster: "62.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd12: {
    video: "awd_swipe07.mp4",
    poster: "63.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd13: {
    video: "iChery20250416-084805.mp4",
    poster: "62.png",
    buttonText: "PRODUCT VIDEO 2",
  },
  awd14: {
    video: "iChery20250416-084810.mp4",
    poster: "63.png",
    buttonText: "PRODUCT VIDEO 2",
  },
};

const props = defineProps({
  // 控制是否显示控制按钮
  showControls: {
    type: Boolean,
    default: true,
  },
  videoKey: {
    type: String,
    default: "vx",
  },
  customButtonText: {
    type: String,
    default: "",
  },
});

const config = useRuntimeConfig();
const basePath =
  // "https://cms-uat.obs.ap-southeast-1.myhuaweicloud.com/platform/public/video/index-video/";
  `${config.public.oosURL}platform/public/video/index-video/`;
const basePathImg = `${config.public.staticURL}/images/explorationImage/`;

// 获取当前视频配置
const currentConfig = computed(() => videoData[props.videoKey] || videoData.vx);

// 当前视频URL和海报URL
const currentVideo = computed(() => basePath + currentConfig.value.video);
const demo = computed(() => {
  return currentConfig.value.poster
    ? `${basePathImg}${currentConfig.value.poster}`
    : "";
});
// 按钮文字
const buttonText = computed(
  () => props.customButtonText || currentConfig.value.buttonText
);

// 弹窗控制
const videoDialog = ref(false);

const videoPlayFullScreen = () => {
  videoDialog.value = true;
};

// 设备判断
const isMobile = ref(false);
</script>
<style scoped lang="scss">
.video {
  position: relative;
  height: 100%;
}
.video:hover .video_button {
  opacity: 1;
}
.video_button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}
.full-screen {
  background: rgba(0, 0, 0, 0.8) !important;
}
.w-full {
  width: 100%;
  object-fit: cover;
  height: 100%;
  z-index: 99;
  border-radius: 0.06rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
}
.video_back {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.2rem;
  position: relative;
  cursor: pointer;
  color: #fff;
  .zdt_b_icon {
    display: flex;
    justify-content: center;
    width: 0.4rem;
    position: relative;
    overflow: hidden;
    height: 0.2rem;
    img {
      width: 0.2rem;
    }
    .zbi_1 {
      position: absolute;
      transform: translateX(-50%);
      left: 50%;
      transition: left 1s, opacity 0.6s;
      opacity: 1;
    }
    .zbi_2 {
      position: absolute;
      left: -120%;
      transition: left 1s, opacity 0.6s;
      opacity: 0;
      transform: translateX(-50%);
    }
  }
}
.video_back:after {
  content: "";
  width: 0%;
  height: 1px;
  background-color: #fff;
  bottom: -0.1rem;
  position: absolute;
  transition: all 1.2s;
  right: 0;
}
.video_back:hover:after {
  width: 100%;
}
.video_back:hover.zbi_1 {
  left: 120%;
  opacity: 0;
}
.video_back:hover.zbi_2 {
  left: 50%;
  opacity: 1;
}
</style>
