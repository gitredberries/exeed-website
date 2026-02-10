<template>
  <div class="swiper">
    <div
      class="detail"
      ref="targetRef"
      @mousedown="onMouseDown"
      @mouseleave="onMouseLeave"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    >
      <div
        class="detail_content"
        :class="{ active: isVisible, dimmed: content.isDimmed }"
        v-for="(content, index) in detailContents"
        :key="index"
      >
        <BaseImg
          class="img"
          :ref="(el) => setImageRef(el, index)"
          :src="content.image"
          alt=""
          draggable="false"
        />
        <div class="detail_title">
          <div class="title_01" :ref="(el) => setTitleRef(el, index)">
            {{ content.title }}
          </div>
          <div :class="['title_02', content.isActive ? 'active' : '']">
            {{ content.description }}
          </div>
          <div
            class="title_03"
            :ref="(el) => setTitleRef_01(el, index)"
            @click="content.isActive = !content.isActive"
          >
            <BaseImg
              :class="{ rotated: content.isActive }"
              src="models/vx/41.png"
              alt=""
            />
            <div>EXPLORE MORE</div>
          </div>
        </div>
      </div>
    </div>
    <!-- H5 端 -->
    <div class="swiper_content">
     <MdProgressSwiper :contentData="detailContents" />
    </div>
  </div>
</template>

    <script setup>
import { ref, watch, nextTick } from "vue";
import { useScroll } from "~/utils/hooks/useScroll.js";
import { Pagination, Scrollbar } from "swiper/modules";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import BaseImg from "~/components/BaseImg.vue";

const { targetRef, isVisible } = useAnimation({
  threshold: 0.1,
});
const { onMouseDown, onMouseLeave, onMouseUp, onMouseMove } = useScroll();

// 定义 detailContents 数据
const detailContents = ref([
  {
    image: "models/txl/24.jpg",
    title: "23 ADAS Functions",
    description:
      "23 ADAS analyses road conditions and traffic dynamics in real time through high-precision sensors and advanced algorithms to ensure the safety of vehicles, pedestrians and other road users.",
    isVisible: false,
    isRotated: false,
  },
  {
    image: "models/txl/25.jpg",
    title: "IOV",
    description:
      "Remote vehicle control through IoV(Internet of Vehicles), with one-click start, one-click vehicle locating, and air conditioning timing.",
    isVisible: false,
    isRotated: false,
  },
]);

// 存储所有图片和标题计时器的 ref
const imageRefs = ref([]);
const titleRefs = ref([]);
const titleRefs_01 = ref([]);
// const timer = ref([]);
// const titleRefs_02 = ref([]);
// const setTitleRef_02 = (el, index) => {
//   if (el) {
//     titleRefs_02.value[index] = el;
//   }
// };

const setImageRef = (el, index) => {
  if (el) {
    const imgEl = el.$el?.tagName === "IMG" ? el.$el : el;
    imageRefs.value[index] = imgEl;
    const applyAnimation = () => {
      nextTick(() => {
        imgEl.classList.toggle("animate", isVisible.value);
      });
    };

    if (imgEl.complete) {
      applyAnimation();
    } else {
      imgEl.onload = applyAnimation;
    }
  }
};

const setTitleRef = (el, index) => {
  if (el) {
    titleRefs.value[index] = el;
  }
};
const setTitleRef_01 = (el, index) => {
  if (el) {
    titleRefs_01.value[index] = el;
  }
};
// const showTitle = async (index) => {
//   const wasVisible = detailContents.value[index].isVisible;
//   detailContents.value[index].isVisible =
//     !detailContents.value[index].isVisible;
//   detailContents.value[index].isRotated =
//     !detailContents.value[index].isRotated;
//   // 切换 opacity 状态
//   detailContents.value[index].isDimmed = !detailContents.value[index].isDimmed;
//   await nextTick();

//   // 只有在元素可见状态改变时才添加动画类
//   if (detailContents.value[index].isVisible !== wasVisible) {
//     // const element = document.querySelector(`.title_02[data-index="${index}"]`);
//     const element = titleRefs_02.value[index];

//     // 清除之前的定时器
//     timer.value.forEach((timer) => clearTimeout(timer));
//     timer.value = []; // 清空计时器数组

//     // 设置新的定时器
//     const timerId = setTimeout(() => {
//       if (detailContents.value[index].isVisible) {
//         element.classList.add("animate");
//       } else {
//         element.classList.remove("animate");
//       }
//     }, 10); // 10ms 延迟

//     // 将新的计时器 ID 添加到数组中
//     timer.value.push(timerId);
//   }
// };

// 监听 isVisible 变化，为所有图片和标题添加或移除动画类
watch(isVisible, (newVal) => {
  // imageRefs.value.forEach((img) => {
  //   if (img) {
  //     if (newVal) {
  //       img.classList.add("animate");
  //     } else {
  //       img.classList.remove("animate");
  //     }
  //   }
  // });
  titleRefs.value.forEach((title) => {
    if (title) {
      if (newVal) {
        title.classList.add("animate");
      } else {
        title.classList.remove("animate");
      }
    }
  });
  titleRefs_01.value.forEach((title) => {
    if (title) {
      if (newVal) {
        title.classList.add("animate");
      } else {
        title.classList.remove("animate");
      }
    }
  });
});
// Swiper 模块,进度条宽度
const modules = [Pagination, Scrollbar];
const slidesPerView = ref(1);
const progress = ref(0);
const swiperInstance = ref(null);
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  updateProgress(swiper);
};
const onSlideChange = () => {
  if (swiperInstance.value) {
    updateProgress(swiperInstance.value);
  }
};
const updateProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  progress.value = (currentIndex / totalSlides) * 100;
};
// 在组件销毁前清除所有计时器
// onBeforeUnmount(() => {
//   timer.value.forEach((timer) => clearTimeout(timer));
// });
const activeIndex = ref(null);
const toggleActive = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null;
  } else {
    activeIndex.value = index;
  }
};
</script>


<style lang="scss" scoped>
.swiper {
  .detail {
    width: 100%;
    // width: calc(100% - 3.2rem);
    display: flex;
    padding: 1.5rem 1.6rem;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    background: #131313;
    .detail_content {
      width: 8.5rem;
      height: 7.57rem;
      position: relative;
      margin-right: 0.2rem;
      flex-shrink: 0;
      background-color: rgba(37, 41, 51, 0.5);
      opacity: 1;
      transition: all 0.3s;
      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.06rem;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.2s;
        border-radius: 0.06rem;
        &.animate {
          transform: translate(0rem);
          opacity: 1;
        }
      }
      .detail_title {
        position: absolute;
        left: 0.4rem;
        right: 0.4rem;
        bottom: 0.36rem;
        .title_01 {
          font-family: Saira;
          font-size: 0.36rem;
          font-weight: 600;
          line-height: 0.48rem;
          color: #ffffff;
          opacity: 0;
          transition: all 1s;
          transition-delay: 0.4s;
          &.animate {
            transform: translate(0rem);
            opacity: 1;
          }
        }
        .title_02 {
          margin: 0.1rem 0;
          font-size: 0.16rem;
          color: #fff;
          // transform: translateY(0.5rem);
          max-height: 0;
          transition: all 1s;
          overflow: hidden;
          // &.animate {
          //   opacity: 1;
          //   transform: translateY(0);
          // }
        }
        .title_02.active {
          max-height: 3rem;
        }
        .title_03 {
          font-size: 0.18rem;
          font-weight: 300;
          line-height: 0.26rem;
          color: #ccc;
          display: flex;
          align-items: center;
          transform: translateY(1rem);
          opacity: 0;
          transition: all 1s;
          transition-delay: 0.6s;
          cursor: pointer;
          &.animate {
            transform: translate(0rem);
            opacity: 1;
          }
          img {
            width: 0.15rem;
            margin-right: 0.15rem;
            transition: transform 0.5s ease;
            &.rotated {
              transform: rotate(180deg);
            }
          }
          &:hover {
            cursor: pointer;
          }
        }
        // .title_03 {
        //   font-family: Saira;
        //   font-size: 0.18rem;
        //   font-weight: 300;
        //   line-height: 0.48rem;
        //   font-variation-settings: "opsz" auto;
        //   color: #ffffff;
        //   display: flex;
        //   align-items: center;
        //   transform: translateY(1rem);
        //   opacity: 0;
        //   transition: all 1s;
        //   transition-delay: 0.6s;
        //   cursor: pointer;
        //   &.animate {
        //     transform: translate(0rem);
        //     opacity: 1;
        //   }
        //   img {
        //     width: 0.15rem;
        //     transition: all 0.5s;
        //     margin-right: 0.15rem;
        //     transition: transform 0.8s ease;
        //   }
        //   .rotated {
        //     transform: rotate(180deg);
        //   }
        // }
        // .title_03 :hover {
        //   cursor: pointer;
        // }
      }
    }
  }
  .swiper_content {
    display: none;
  }
  .detail_content.dimmed {
    opacity: 0.6;
  }
  .h5_detail {
    display: none;
  }
}
@media screen and (max-width: 1024px) {
  .swiper {
    background: #0D0D0D;
    height: auto;
    padding: 0.6rem 0.2rem;
    .detail {
      display: none;
    }
    .swiper_content {
      display: block;
      padding: 0;
      height: auto;
      width: 100%;
      position: relative;
    }
    .h5_detail {
      display: block;
      height: auto;
      margin-left: -0.2rem;
      margin-right: -0.2rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        left: 0;
        top: 0;
      }
      .detail_title {
        position: absolute;
        left: 0.2rem;
        bottom: 0.4rem;
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
        }
      }
    }
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
      margin-top: 0.2rem;
      margin-bottom: 0.12rem;
    }
    .swiper_title02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #b2b2b2;
      margin-top: 0.12rem;
      margin-bottom: 0.4rem !important;
    }
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.01rem;
    background-color: #e0e0e0;
    position: absolute;
    top: 4.2rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
  }
}
</style>
