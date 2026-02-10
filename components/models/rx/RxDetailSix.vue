<template>
  <div>
    <!-- H5 端 -->
    <div class="h5_detail">
      <MdProgressSwiper :content-data="detailContents" />
    </div>
    <!-- PC 端 -->
    <div class="pc_detail" ref="targetRef" :class="{ active: isVisible }">
      <div class="detail_title">
        <div class="title_01">Effortless Handling</div>
        <div class="title_02">
          WITH EFFORTLESS HANDLING,<br />DRIVE AS YOU LIKE
        </div>
        <div class="title_03">
          <div
            :class="{ active: selectedTab === 'PHEV' }"
            @click="selectedTab = 'PHEV'"
          >
            PHEV
          </div>
          <div
            :class="{ active: selectedTab === 'ICE' }"
            @click="selectedTab = 'ICE'"
          >
            ICE
          </div>
        </div>
        <div class="title_04" @click="showDialog">
          <span>INTELLIGENT DRIVING VIDEO</span>
          <BaseImg class="zbi_1" src="models/vx/12.png" alt="" />
        </div>
      </div>
      <div class="detail_img">
        <BaseImg class="img" src="models/rx/21.jpg" alt="" />
        <BaseImg class="img_01" src="models/h5/46.jpg" alt="" />
      </div>
      <!-- 视频以及弹窗 -->
      <div class="detail_video">
        <Video videoKey="rx5"/>
      </div>
    </div>
    <div>
      <RxDetailSeven v-if="selectedTab === 'PHEV'" />
      <RxDetailEight v-if="selectedTab === 'ICE'" />
    </div>
    <Dialog
      v-model="isShowDialog"
    >
      <div>
        <video
          class="w-full_1 lg:w-[96%] h-1/3 lg:h-[88vh] object-none"
          autoplay
          controls
          webkit-playsinline
          playsinline
        >
          <source :src="`${config.public.oosURL}platform/public/video/index-video/rx_detail5.mp4`" type="video/mp4" />
        </video>
      </div>
    </Dialog>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import RxDetailSeven from "@/components/models/rx/RxDetailSeven.vue";
import RxDetailEight from "@/components/models/rx/RxDetailEight.vue";
import Video from "@/components/models/Video.vue";

const config = useRuntimeConfig();

const isShowDialog = ref(false);

const showDialog = () => {
  isShowDialog.value = true;
}

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});
// 默认选中 PHEV
const selectedTab = ref("PHEV");
// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value.querySelector(".img").classList.add("animate");
    targetRef.value.querySelector(".title_01").classList.add("animate");
    targetRef.value.querySelector(".title_02").classList.add("animate");
    targetRef.value.querySelector(".title_03").classList.add("animate");
    targetRef.value.querySelector(".title_04").classList.add("animate");
    targetRef.value.querySelector(".detail_img").classList.add("animate");
  } else {
    targetRef.value.querySelector(".img").classList.remove("animate");
    targetRef.value.querySelector(".title_01").classList.remove("animate");
    targetRef.value.querySelector(".title_02").classList.remove("animate");
    targetRef.value.querySelector(".title_03").classList.remove("animate");
    targetRef.value.querySelector(".title_04").classList.remove("animate");
    targetRef.value.querySelector(".detail_img").classList.remove("animate");
  }
});
// 定义 detailContents 数据
const detailContents = ref([
  {
    image: "models/h5/43.jpg",
    title: "Suspended surrounded cabin",
    description: " Bring a sense of security and offer a large space",
  },
  {
    image: "models/h5/44.jpg",
    title: "AIl SONY Audio ",
    description:
      "14 branded loudspeakers with independent function. Exclusivetuning by the Golden Ear acoustic engineering team to create aunique immersive music experience",
  },
  {
    image: "models/h5/45.jpg",
    title: "Equipped with 2 headrest loudspeakers, enjoy a private space",
    description:
      "  Shared mode: Headrest audio is turned off, and all sounds are played through the whole car Driving mode: Navigation and calls are played from the headrest, without affecting the music experience in the car Private mode: All sounds are played through the headrest without affecting other passengers.",
  },
]);
</script>
<style scoped lang="scss">
.pc_detail {
  width: 100%;
  background: #131313;
  position: relative;
  height: 13.62rem;
  .detail_title {
    padding-top: 1.4rem;
    text-align: center;
    .title_01 {
      font-size: 0.18rem;
      font-weight: 300;
      line-height: 0.48rem;
      color: #e3bea4;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
    .title_02 {
      font-size: 0.44rem;
      font-weight: 600;
      line-height: 0.48rem;
      color: #ffffff;
      margin-top: 0.06rem;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.2s;
      &.animate {
        transform: translateY(0rem);
        opacity: 1;
      }
    }
    .title_03 {
      width: 3.44rem;
      display: flex;
      margin-bottom: 0.4rem;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.6s;
      margin: 0.2rem auto;
      &.animate {
        transform: translateY(0);
        opacity: 1;
      }
      div {
        width: 50%;
        height: 0.4rem;
        font-size: 0.14rem;
        color: #ffffff;
        line-height: 0.4rem;
        text-align: center;
        box-sizing: border-box;
        border: 0.01rem solid #dbb193;
        &:nth-of-type(1) {
          border-radius: 0.02rem 0 0 0.02rem;
        }
        &:nth-last-of-type(1) {
          border-radius: 0 0.02rem 0.02rem 0;
        }
      }
      div:hover {
        background: #dbb193;
      }
      div.active {
        background: #dbb193;
        color: white;
      }
    }
    .title_04 {
      transform: translateY(1rem);
      transition: all 1s;
      transition-delay: 0.8s;
      display: none;
      opacity: 0;
      &.animate {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  .detail_img {
    width: 14.26rem;
    height: 7.4rem;
    margin-top: 0.6rem;
    padding-left: 1rem;
    transform: translateY(1.5rem);
    opacity: 0;
    transition: all 1s;
    &.animate {
      transform: translateY(0rem);
      opacity: 1;
    }
    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.3;
      transition: all 2s;
      &.animate {
        opacity: 1;
      }
    }
    .img_01 {
      display: none;
    }
  }
  .detail_video {
    position: absolute;
    right: 1rem;
    bottom: 0.5rem;
    width: 6.12rem;
    height: 4.3rem;
    border-radius: 0.06rem;
  }
}
.h5_detail {
  display: none;
}
@media screen and (max-width: 1024px) {
  .pc_detail {
    position: relative;
    height: 5.46rem;
    .detail_title {
      padding-right: 0.2rem;
      padding-top: 0.8rem;
      text-align: left;
      position: absolute;
      left: 0.2rem;
      z-index: 1;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.28rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
      }
      .title_03 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #ffffff;
        width: 1.96rem;
        height: 0.32rem;
        margin: 0;
        div {
          line-height: 0.32rem;
          height: 0.32rem;
          box-shadow: none;
          color: #c78e66;
          border-color: #c78e66;
          &:nth-of-type(1) {
            border-radius: 0.02rem 0 0 0.02rem;
          }
          &:nth-last-of-type(1) {
            border-left: none;
            border-radius: 0 0.02rem 0.02rem 0;
          }
        }
        .active {
          background: #c78e66 !important;
        }
      }
      .title_04 {
        font-size: 0.12rem;
        line-height: 0.16rem;
        margin-top: 0.08rem;
        color: white;
        display: flex;
        align-items: center;
        img {
          margin-left: 0.12rem;
          width: 0.13rem;
        }
      }
    }
    .detail_img {
      height: 5.46rem;
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      transform: translateY(0rem);
      margin-top: 0;
      .img {
        display: none;
        margin: 0;
      }
      .img_01 {
        display: block;
        width: 100%;
        height: 5.46rem;
        object-fit: cover;
        margin: 0;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .detail_video {
      display: none;
    }
  }
  .h5_detail {
    display: block;
    height: 5.8rem;
    background: #0d0d0d;
    padding: 0.6rem 0.2rem;
    .swiper_img {
      height: 2.14rem;
      border-radius: 0.06rem;
      margin-bottom: 0.02rem;
      width: 100%;
      object-fit: cover;
    }
    .swiper_title01 {
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.24rem;
      color: #ffffff;
      margin-bottom: 0.1rem;
    }
    .swiper_title02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #b2b2b2;
      margin-bottom: 0.08rem;
    }
    .swiper_title03 {
      font-size: 0.13rem;
      color: rgba(255, 255, 255, 0.3);
      margin-top: 0.1rem;
    }
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.01rem;
    background-color: #e0e0e0;
    margin-top: 10px;
    border-radius: 5px;
    margin-bottom: 0.06rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
  }
  :deep(.el-dialog__body){
    height: calc(100% - var(--el-dialog-padding-primary));
    display: flex;
    align-items: center;
  }
}
</style>
