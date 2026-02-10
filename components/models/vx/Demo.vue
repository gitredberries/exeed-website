<template>
  <!-- PC 端 -->
  <div class="detail">
    <div class="pc_detail">
      <div class="title">
        <div class="title_01">Color</div>
        <div class="title_02">
          VIBRANT COLORS BRING<br />
          INSPIRATION
        </div>
      </div>
      <div class="detail_content">
        <div class="background-switcher">
          <BaseImg class="img" :src="currentImage" alt="" />
          <div class="points">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="cbll_min"
              :class="{ active: activeIndex === index }"
              @click="setActive(index)"
            >
              <div :class="['cbllm_c', `cbllm_c${index + 1}`]">
                <BaseImg :src="item.img" alt="" />
              </div>
              <div class="cbllm_t">{{ item.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="title_jump">
        <PonoraMic />
      </div>
    </div>
    <!-- H5 端 -->
    <div class="h5_detail">
      <div class="detail_title">
        <div class="title_01">Color</div>
        <div class="title_02">
          VIBRANT COLORS BRING<br />
          INSPIRATION
        </div>
        <div class="title_03">
          Comprehensively upgrading exterior styling luxury, <br />the overall
          design gives more business flagship <br />tone (正文)
        </div>
        <div class="zdt_btn mf-ws" @click="open_video">
          <div>APPEARANCE VIDEO(交互)</div>
          <div class="zdt_b_icon">
            <BaseImg class="zbi_1" src="models/vx/12.png" alt="" />
            <BaseImg class="zbi_2" src="models/vx/12.png" alt="" />
          </div>
        </div>
        <div class="title_04" @click="goToExternalLink">
          <BaseImg src="models/vx/09.png" alt="" />
        </div>
      </div>
      <div class="background-switcher">
        <BaseImg class="img" :src="currentImage_01" alt="" />
        <div class="points">
          <div
            v-for="(item, index) in h5Items"
            :key="index"
            class="cbll_min"
            :class="{ active: activeIndex_01 === index }"
            @click="setActive_01(index)"
          >
            <div :class="['cbllm_c', `cbllm_c${index + 1}`]">
              <BaseImg :src="item.img" alt="" />
            </div>
            <div class="cbllm_t">{{ item.label }}</div>
          </div>
        </div>
      </div>
      <!-- 视频弹窗 -->
      <el-dialog
        v-model="videoDialog.visible"
        width="100%"
        title=""
        foot="null"
        class="full-screen"
        :fullscreen="true"
        :close-on-click-modal="false"
        @close="handleClose"
      >
        <div
          class="w-full h-[94vh] lg:h-full flex justify-center items-center pt-[0.5rem]"
        >
          <video
            class="w-full lg:w-[96%] h-1/3 lg:h-[88vh] object-none"
            autoplay
            muted
            controls
            :poster="isMobile ? `${videoImg}_mobile.jpg` : `${videoImg}.jpg`"
          >
            <source :src="videoUrl" type="video/mp4" />
          </video>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from "vue";
const images = [
  "models/vx/50.jpg",
  "models/vx/51.jpg",
  "models/vx/52.jpg",
  "models/vx/53.jpg",
  "models/vx/54.jpg",
  "models/vx/55.jpg",
];
const images_01 = [
  "models/h5/10.jpg",
  "models/h5/11.jpg",
  "models/h5/12.jpg",
  "models/h5/13.jpg",
  "models/h5/14.jpg",
  "models/h5/15.jpg",
];

import PonoraMic from "../components/models/vx/PonoraMic.vue";
const items = [
  { img: "models/vx/56.png", label: "New Khaki white" },
  { img: "models/vx/57.png", label: "Havana Grey" },
  { img: "models/vx/58.png", label: "Aero Silver" },
  { img: "models/vx/59.png", label: "New Carbon Black" },
  { img: "models/vx/60.png", label: "Arctic Green" },
  { img: "models/vx/61.png", label: "Venetian Blue" },
];
const h5Items = [
  { img: "models/vx/56.png", label: "New Khaki white" },
  { img: "models/vx/57.png", label: "Havana Grey" },
  { img: "models/vx/58.png", label: "Aero Silver" },
  { img: "models/vx/59.png", label: "New Carbon Black" },
  { img: "models/vx/60.png", label: "Arctic Green" },
  { img: "models/vx/61.png", label: "Venetian Blue" },
];
//点击按钮切换图片
const activeIndex = ref(0);
const currentImage = computed(() => images[activeIndex.value]);
const setActive = (index) => {
  activeIndex.value = index;
};
const activeIndex_01 = ref(0);
const currentImage_01 = computed(() => images_01[activeIndex_01.value]);
const setActive_01 = (index) => {
  activeIndex_01.value = index;
};
const goToExternalLink = () => {
  window.open("http://106.14.155.0:20002/pika/ex.html", "_blank");
};
// 视频数据
const banner2Content = ref({
  isTextWhite: false,
  title: "About us",
  subTitle:
    "In today's rapidly evolving era, the automotive industry is<br> undergoing unprecedented transformations.",
  titleClassName: "lg:!text-white px-[0.63rem] lg:px-[0]",
  // img: "index/banner3_1",
  h5ClassName:
    "lg:w-[10rem] lg:text-[0.2rem] lg:text-[#fff] line-height-normal banner2-space",
  fullArticleClass: "enlarge",
  type: "video",
  videoUrl: "index/video/banner3_new.mp4",
  fullScreenUrl: "index/video/banner3_fullScreen.mp4",
});

const videoDialog = ref({
  visible: false,
});
const open_video = () => {
  videoDialog.value.visible = true;
};
// 视频 URL 和封面图
const config = useRuntimeConfig();
const videoUrl = computed(
  () =>
    `${config.public.staticURL}/images/${banner2Content.value.fullScreenUrl}`
);
const videoImg = computed(
  () => `${config.public.staticURL}/images/${banner2Content.value.img}`
);
</script>
  
<style lang="scss" scoped>
.pc_detail {
  width: 100%;
  height:100vh;
  position: relative;
  .title {
    position: absolute;
    left: 1.2rem;
    top: 1.2rem;
    z-index: 1;
    .title_01 {
      font-family: Saira;
      font-size: 0.2rem;
      font-weight: normal;
      line-height: 0.28rem;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #905227;
      margin-bottom: 0.4rem;
    }
    .title_02 {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #905227;
    }
  }
  .title_jump {
    position: absolute;
    bottom: 0.6rem;
    right: 1rem;
  }
}
.h5_detail {
  display: none;
}
.detail_content {
  width: 100%;
  height:100vh;
}

.points {
  position: absolute;
  bottom: 0.8rem;
  left: 1.2rem;
  display: flex;
  gap: 10px;
  img {
    object-fit: cover;
  }
}
.background-switcher {
  width: 100%;
  height:100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.point {
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.point:hover {
  background-color: lightgray;
}
.detail_point {
  display: flex;
  position: absolute;
  top: 9rem;
  left: 1.2rem;
}
.cbll_min {
  position: relative;
  margin: 0 0.15rem;
  cursor: pointer;
}
.cbllm_c {
  padding: 3px;
  border-radius: 100%;
  border: 1px solid transparent;
  transition: all 0.5s;
}
.cbllm_c img {
  width: 0.4rem;
}
.cbllm_t {
  font-size: 0.14rem;
  position: absolute;
  left: 50%;
  top: 120%;
  transform: translateX(-50%);
  bottom: -0.1rem;
  white-space: nowrap;
  color: #fff;
  transition: all 0.5s;
  opacity: 0;
}
.cbll_min.active .cbllm_t {
  opacity: 1;
}
.cbll_min.active .cbllm_c1,
.cbll_min.active .cbllm_c2,
.cbll_min.active .cbllm_c3,
.cbll_min.active .cbllm_c4,
.cbll_min.active .cbllm_c5,
.cbll_min.active .cbllm_c6 {
  border: 1px solid rgb(0, 0, 0, 0.5);
}
.cbllm_c {
  padding: 3px;
  border-radius: 100%;
  border: 1px solid transparent;
  transition: all 0.5s;
}
.cbllm_c img {
  width: 0.4rem;
}
@media screen and (max-width: 1024px) {
  .pc_detail {
    display: none;
  }
  .detail {
    height: 8.12rem;
    .h5_detail {
      display: block;
      padding-top: 0.8rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      position: relative;
      .detail_title {
        position: absolute;
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
          margin-bottom: 0.08rem;
        }
        .title_04 {
          display: flex;
          justify-content: center;
          img {
            width: 0.4rem;
            height: 0.4rem;
            object-fit: cover;
          }
        }
      }
      .background-switcher {
        position: absolute;
        top: 0;
        left: 0;
        height: 8.12rem;
        width: 100vw;
      }
      .points {
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        .cbll_min {
          width: 0.3rem;
          height: 0.3rem;
          margin: 0;
          margin-right: 0.14rem;
          .cbllm_t {
            position: absolute;
            top: 115%;
          }
          img {
            width: 0.3rem;
          }
        }
      }
    }
  }
  .zdt_btn {
    font-size: 0.12rem;
    font-weight: 300;
    line-height: 0.16rem;
    color: #e5e5e5;
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    width: 1.8rem;
    margin-bottom: 0.4rem;
  }
  .zdt_btn_ns {
    justify-content: flex-end;
  }
  .zdt_btn_nstt {
    justify-content: flex-start;
  }
  .zdt_btn img {
    width: 0.13rem;
    height: 0.13rem;
    object-fit: cover;
  }
  .zdt_b_icon {
    display: flex;
    justify-content: center;
    width: 0.4rem;
    position: relative;
    overflow: hidden;
    height: 0.13rem;
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
  .zdt_btn:after {
    content: "";
    width: 0%;
    height: 1px;
    background-color: #fff;
    bottom: -0.1rem;
    position: absolute;
    transition: all 1.2s;
  }
  .zdt_btn:hover:after {
    width: 100%;
  }
  .zdt_btn:hover .zbi_1 {
    left: 120%;
    opacity: 0;
  }
  .zdt_btn:hover .zbi_2 {
    left: 50%;
    opacity: 1;
  }
  .mf_btn_1 {
    position: absolute;
    left: 59%;
    top: 34%;
  }
}
</style>
