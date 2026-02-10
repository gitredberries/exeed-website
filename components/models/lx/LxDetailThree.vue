<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef">
    <BaseImg
      class="img_01"
      src="models/lx/04.jpg"
      alt=""
      :class="{
        zoomed: isZoomed && currentContentIndex === 0,
        zoomed_02: isZoomed && currentContentIndex === 1,
        zoomed_03: isZoomed && currentContentIndex === 2,
      }"
    />
    <BaseImg class="img_02" src="models/h5/34.jpg" alt="" />
    <!-- 动态生成热点按钮 -->
    <div
      v-for="(item, index) in hotspotData"
      :key="index"
      :class="`mf_btn_${index + 1} mf_btn`"
      @click="showContent(index)"
      v-show="hots"
    >
      <a
        class="HotspotPoint__point__3GEmahoi HotspotPoint__pulsing__1MVjgpDF"
      ></a>
    </div>
    <!-- 标题 -->
    <div class="detail_title" v-show="showTitle" :class="{ active: isVisible }">
      <div class="title_01">Design Aesthetics</div>
      <div class="title_02">
        Appearance of a comprehensive upgrade,enjoy the advanced <br />
        aesthetic
      </div>
    </div>
    <!-- 动态生成弹出内容 -->
    <div class="btn_content01" v-if="currentContentIndex !== null">
      <div class="mpm_t0 mpm_t">
        <div>1</div>
        <div class="line"></div>
        <div>Design Aesthetics</div>
      </div>
      <div class="mpm_t1 mpm_t">
        <div>{{ hotspotData[currentContentIndex].title }}</div>
      </div>
      <div class="mpm_t2 mpm_t">
        <div>{{ hotspotData[currentContentIndex].description }}</div>
      </div>
      <div class="mpm_t3 mpm_t">
        <BaseImg
          class="mpm_t4"
          :src="hotspotData[currentContentIndex].image"
          alt=""
        />
      </div>
      <div class="mf_pop_close" @click="closeContent">
        <BaseImg src="models/vx/64.png" alt="" />
      </div>
    </div>
    <!-- H5 端 -->
    <div class="detail_swiper">
      <MdProgressSwiper :content-data="hotspotData" />
    </div>
  </div>
</template>
  <script setup>
import { ref, watch, nextTick, onBeforeUnmount } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
const hotspotData = [
  {
    title:
      "11Completely updated appearance.The new front face shows urban fashion",
    description:
      "The vertically arranged front grille, with a design incorporating chrome and blackening, and hexagonal contour grille design, makes the appearance more layered, ceremonial, and premium.",
    image: "models/lx/07.jpg",
  },
  {
    title: "22Classic body waistline",
    description:
      "The simple & pure design language of the body lines is a tribute to the classic aesthetics and the pursuit of the designers of the perfect combination of art and technology masterpiece.",
    image: "models/lx/06.jpg",
  },
  {
    title: "44Premium wheel hub design",
    description:
      "The hubs adopt a multi-layered five-spoke design with center symmetry to enhance the visual impact.",
    image: "models/lx/05.jpg",
  },
];

const showTitle = ref(true);
const isZoomed = ref(false);
const currentContentIndex = ref(null); // 当前显示的弹出内容索引
const hots = ref(true);

const { targetRef, isVisible } = useAnimation({
  threshold: 0.1,
});

// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  const elements = [".title_01", ".title_02", ".title_03", ".zdt_btn"];
  elements.forEach((selector) => {
    const element = targetRef.value.querySelector(selector);
    if (element) {
      element.classList.toggle("animate", newVal);
    }
  });
});
// 存储计时器的数组
const timers = ref([]);
// 显示弹出内容,DOM 更新完成后再触发动画
const showContent = async (index) => {
  hots.value = false;
  showTitle.value = false;
  isZoomed.value = true;
  currentContentIndex.value = index;
  document.body.style.overflow = "hidden";
  await nextTick();
  const selectors = [
    ".btn_content01",
    ".mpm_t0",
    ".mpm_t1",
    ".mpm_t2",
    ".mpm_t4",
  ];

  selectors.forEach((selector, i) => {
    const timer = setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.classList.add("animate");
      }
    }, i * 10);
    timers.value.push(timer);
  });
};

// 在组件销毁前清除所有计时器
onBeforeUnmount(() => {
  timers.value.forEach((timer) => clearTimeout(timer));
});

// 关闭弹出内容
const closeContent = () => {
  showTitle.value = true;
  isZoomed.value = false;
  hots.value = true;
  currentContentIndex.value = null;
  document.body.style.overflow = "auto";
};
</script>
    <style scoped lang='scss'>
.detail {
  width: 100%;
  height:100vh;
  position: relative;
  overflow: hidden;
  background: #333333;
  .img_01 {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 1s;
    display: block;
  }
  .img_02 {
    display: none;
  }
  .detail_title {
    position: absolute;
    top: 1.1rem;
    padding-left: 1rem;
    .title_01 {
      font-size: 0.2rem;
      font-weight: 300;
      line-height: 0.48rem;
      letter-spacing: 0em;
      color: #e3bea4;
      margin-bottom: 0.1rem;
      transform: translateY(1rem);
      opacity: 0;
      &.animate {
        transition: all 1s;
        transform: translateY(0rem);
        opacity: 1;
        transition-delay: 0.2s;
      }
    }
    .title_02 {
      font-family: Saira;
      font-size: 0.52rem;
      font-weight: 500;
      line-height: 0.6rem;
      letter-spacing: 0px;
      color: #ffffff;
      margin-bottom: 0.1rem;
      transform: translateY(1rem);
      opacity: 0;
      &.animate {
        transition: all 1s;
        transform: translateY(0rem);
        opacity: 1;
        transition-delay: 0.5s;
      }
    }
  }
  .btn_content01 {
    position: absolute;
    position: fixed;
    height: 100%;
    right: 0;
    width: 54vw;
    height: 100vh;
    z-index: 3;
    top: 0;
    background-color: rgb(28, 27, 32);
    padding: 1.68rem 1.2rem 0;
    transition: all 1s;
    transform: translateX(54vw);
    opacity: 0;
    &.animate {
      opacity: 1;
      transform: translateX(0);
    }
    .mpm_t0 {
      display: flex;
      font-size: 0.16rem;
      color: #fff;
      opacity: 0.4;
      display: flex;
      align-items: center;
      letter-spacing: 0.02rem;
      font-weight: 300;
      transform: translateX(1rem);
      opacity: 0;
      &.animate {
        transition: all 0.8s;
        transform: translateX(0rem);
        opacity: 1;
      }
      .line {
        width: 1.5rem;
        height: 1px;
        background: rgba(255, 255, 255, 0.26);
        margin: 0 0.2rem;
      }
    }
    .mpm_t1 {
      font-size: 0.26rem;
      font-weight: bold;
      color: #fff;
      margin-top: 0.25rem;
      transform: translateX(1rem);
      opacity: 0;
      &.animate {
        transition: all 1.1s;
        transform: translateX(0rem);
        opacity: 1;
      }
    }
    .mpm_t2 {
      font-size: 0.2rem;
      font-weight: 300;
      color: #b7b7b7;
      margin-top: 0.2rem;
      margin-bottom: 0.5rem;
      transform: translateX(1rem);
      opacity: 0;
      &.animate {
        transition: all 1.4s;
        transform: translateX(0rem);
        opacity: 1;
      }
    }
    .mpm_t3 {
      .mpm_t4 {
        width: 100%;
        object-fit: cover;
        transform: translateX(1rem);
        opacity: 0;
        &.animate {
          transition: all 1.8s;
          transform: translateX(0rem);
          opacity: 1;
        }
      }
    }
    .mf_pop_close {
      transform: translateY(-50%) scale(1);
      width: 0.54rem;
      height: 0.54rem;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 0rem;
      z-index: 1;
      border-radius: 100%;
      background-color: #fff;
      cursor: pointer;
      transition: all 0.5s;
      position: absolute;
      top: 51%;
      left: -2.2%;
      img {
        width: 0.15rem;
        height: 0.15rem;
        object-fit: cover;
      }
    }
    .mf_pop_close:hover {
      transform: translateY(-50%) scale(1.1);
    }
  }
}
.zdt_btn {
  display: flex;
  align-items: center;
  font-size: 0.24rem;
  line-height: 0.32rem;
  position: relative;
  cursor: pointer;
  font-weight: 300;
  color: #939393;
  width: 3.2rem;
  transform: translateY(1rem);
  opacity: 0;
  &.animate {
    transition: all 1s;
    transform: translateY(0rem);
    opacity: 1;
    transition-delay: 1.1s;
  }
}
.zdt_btn_ns {
  justify-content: flex-end;
}
.zdt_btn_nstt {
  justify-content: flex-start;
}
.zdt_btn img {
  width: 0.2rem;
  height: 0.2rem;
  object-fit: cover;
}
.zdt_b_icon {
  display: flex;
  justify-content: center;
  width: 0.4rem;
  position: relative;
  overflow: hidden;
  height: 0.2rem;
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
  left: 28%;
  top: 55%;
}
.mf_btn {
  transition: all 0.5s;
}
.mf_btn_2 {
  position: absolute;
  left: 47%;
  top: 58%;
  z-index: 2;
}
.mf_btn_3 {
  position: absolute;
  left: 59%;
  top: 32%;
  z-index: 2;
}
.mf_btn_4 {
  position: absolute;
  left: 47%;
  top: 58%;
  z-index: 2;
  display: none;
}
.mf_btn {
  transition: all 0.5s;
}
.zoomed {
  transform: scale(1.4) translate(-4rem, 0rem);
}
.zoomed_02 {
  transform: scale(1.7) translate(-2rem, -1rem);
  transition: transform 0.5s ease;
}
.zoomed_03 {
  transform: scale(1.5) translate(-5.5rem, 1rem);
  transition: transform 0.5s ease;
}
.full-screen {
  background: rgba(0, 0, 0, 0.8) !important;
}
.full-screen .el-dialog__headerbtn .el-dialog__close {
  font-size: 0.48rem;
}
.full-screen .el-dialog__headerbtn {
  right: 0.1rem;
  top: 0.1rem;
}
.full-screen .el-dialog__body {
  width: 100%;
  height: 98%;
}

@media screen and (max-width: 1024px) {
  .detail {
    width: 100%;
    position: relative;
    height: 11.3rem;
    background: #0d0d0d;
    .img_01 {
      display: none;
    }
    .img_02 {
      display: block;
      object-fit: cover;
      height: 5.46rem;
      width: 100%;
    }
    .detail_title {
      position: absolute;
      top: 0.8rem;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      .title_01 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #e3bea4;
        margin-bottom: 0.1rem;
      }
      .title_02 {
        font-size: 0.2rem;
        font-weight: 500;
        line-height: 0.3rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
      }
      .title_03 {
        font-size: 0.14rem;
        line-height: 0.2rem;
        color: #ffffff;
        margin-bottom: 0.08rem;
      }
    }
  }
  .mf_btn_1,
  .mf_btn_2,
  .mf_btn_3,
  .mf_btn_4 {
    opacity: 0;
  }
  .detail_swiper {
    padding-top: 0.6rem;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.03rem;
    background-color: #e0e0e0;
    margin-top: 10px;
    border-radius: 5px;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
    border-radius: 5px;
  }
  .swiper_img {
    width: 100%;
    height: 2.14rem;
    border-radius: 0.1rem;
    object-fit: cover;
  }
  .swiper_title01 {
    font-size: 0.2rem;
    font-weight: 500;
    line-height: 0.24rem;
    color: #ffffff;
    margin-bottom: 0.12rem;
    margin-top: 0.2rem;
  }
  .swiper_title02 {
    font-size: 0.14rem;
    line-height: 0.2rem;
    color: #b2b2b2;
    margin-bottom: 0.3rem;
  }
}
</style>
