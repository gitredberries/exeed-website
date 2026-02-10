<template>
  <!-- 播放视频按钮 -->
  <div>
    <video
      id="videoPlayer"
      class="w-full h-full min-h-svh object-cover absolute z-0"
      autoplay
      muted
      loop
      webkit-playsinline
      playsinline
      :poster="isMobile ? `${videoImg}_mobile.${ext}` : `${videoImg}.${ext}`"
    >
      <source :src="videoUrl" type="video/mp4" />
    </video>
    <div
      class="absolute bottom-2 right-1 flex flex-col justify-between items-center w-full h-full min-h-svh text-white"
    >
      <div class="video_back" @click="videoPlayFullScreen">
        <div>APPEARANCE VIDEO</div>
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
    <div
      class="w-full_1 h-[94vh] lg:h-full_1 flex justify-center items-center pt-[0.5rem]"
    >
      <video
        class="w-full_1 lg:w-[96%] h-1/3 lg:h-[88vh] object-none"
        autoplay
        controls
        webkit-playsinline
        playsinline
        :poster="isMobile ? `${videoImg}_mobile.jpg` : `${videoImg}.jpg`"
      >
        <source :src="videoUrl" type="video/mp4" />
      </video>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
// import { isMobileDevice } from "../../utils/common/index";

// 视频数据
const videoDialog = ref(false);
// 视频 URL 和封面图
const config = useRuntimeConfig();
const videoUrl = computed(
  () => `${config.public.staticURL}/images/index/video/vx_detail8.mp4`
);
const videoImg = computed(
  () => `${config.public.staticURL}/images/index/video/vx_detail8.mp4`
);

const videoPlayFullScreen = () => {
  videoDialog.value = true;
};


// 设备判断
const isMobile = ref(false);
const ext = "mp4"; // 假设视频格式为mp4
</script>

<style scoped lang="scss">
.full-screen {
  background: rgba(0, 0, 0, 0.8) !important;
}
.w-full {
  width: 32%;
}
.h-full {
  height: 30%;
}
.min-h-svh {
  min-height: 30svh;
  min-height: 30svh;
  z-index: 99;
  position: absolute;
  right: 1rem;
  bottom: 0.5rem;
  border-radius: 0.06rem;
  display: flex;
  justify-content: center;
}
.min-h-svh:hover .video_back {
  opacity: 1;
}
.min-h-svh:hover {
  opacity: 1;
}
.video_back {
  display: flex;
  align-items: center;
  font-size: 0.2rem;
  position: relative;
  cursor: pointer;
  opacity: 0;
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
.video_back:hover .zbi_1 {
  left: 120%;
  opacity: 0;
}
.video_back:hover .zbi_2 {
  left: 50%;
  opacity: 1;
}
</style>
