<template>
  <div class="digital-scroll" :data-instance-id="componentId">
    <div class="digital-scroll-title" ref="digitalScrollTitleRef">
      <span
        v-for="(char, index) in titleText"
        :key="index"
        :class="[
          'title-char',
          char === '\u00A0' ? 'space-after' : '',
          isTitleInView ? 'animationUp' : '',
        ]"
        :style="{ animationDelay: `${index * 0.1}s` }"
        >{{ char }}</span
      >
    </div>
    <div class="digital-scroll-content" ref="digitalScrollRef">
      <div
        class="digital-scroll-content-item"
        v-for="item in digitalScrollContent"
        :key="`${componentId}-${item.title}`"
        :class="{ 'item-visible': item.isVisible }"
      >
        <div class="digital-scroll-content-item-title">
          <span>{{ item.currentNumber }}</span>
        </div>
        <div class="digital-scroll-content-item-content">
          <span
            v-for="(word, wordIndex) in item.contentWords"
            :key="wordIndex"
            class="content-word"
            :class="{ 'word-visible': item.isContentVisible }"
            :style="{
              animationDelay: `${wordIndex * 0.03}s`,
            }"
          >
            {{ word }}
          </span>
        </div>
      </div>
    </div>
    <div
      :class="['digital-scroll-desc', isTitleInView ? 'active' : '']"
      v-show="props.desc"
    >
      <div class="digital-scroll-desc-inner">
        {{ props.desc }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const digitalScrollRef = ref(null);
const digitalScrollTitleRef = ref(null);
const isTitleInView = ref(false);
const animationTimers = ref([]); // 存储所有的定时器
const componentId = ref(`digital-scroll-${Date.now()}`); // 添加唯一标识符
const isDestroyed = ref(false); // 添加销毁标记

const props = defineProps({
  infoList: {
    type: Array,
    default: () => [],
  },
  desc: {
    type: String,
    default: "",
  },
});

const titleText = ref(
  "Highlights of the Event"
    .split("")
    .map((char) => (char === " " ? "\u00A0" : char))
);

const digitalScrollContent = ref([]);

watch(
  () => props.infoList,
  (newVal) => {
    if (Array.isArray(newVal) && newVal.length > 0) {
      digitalScrollContent.value = newVal.map((item, index) => ({
        title: item.title,
        content: item.content,
        targetNumber: parseInt(item.title),
        currentNumber: 0,
        contentWords: item.content.split(" "),
        isContentVisible: false,
        isVisible: false,
      }));
    }
  },
  {
    immediate: true,
  }
);

const animateConfig = [
  {
    duration: 500,
    steps: 30,
  }, // 第一个数字：快速增长
  {
    duration: 800,
    steps: 40,
  }, // 第二个数字：中等速度
  {
    duration: 1000,
    steps: 50,
  }, // 第三个数字：减少持续时间
  {
    duration: 1000,
    steps: 50,
  },
];

const animateNumber = (item, index) => {
  return new Promise((resolve) => {
    // 如果已经达到目标数字，不再执行动画
    if (item.currentNumber === item.targetNumber) {
      resolve();
      return;
    }

    // 获取当前数字的动画配置
    const config = animateConfig[index];
    const { duration, steps } = config;
    const stepDuration = duration / steps;
    const increment = item.targetNumber / steps;

    // 使用 requestAnimationFrame 优化动画性能
    let startTime = null;
    let currentStep = 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      // 计算当前应该执行到哪一步
      currentStep = Math.min(Math.floor(progress / stepDuration), steps);
      // 更新数值
      item.currentNumber = Math.round(increment * currentStep);
      // 检查是否完成动画
      if (currentStep < steps) {
        requestAnimationFrame(animate);
      } else {
        item.currentNumber = item.title;
        resolve(); // 动画完成时 resolve Promise
      }
    };

    const animationId = requestAnimationFrame(animate);
    animationTimers.value.push({
      item,
      timer: animationId,
      cancel: () => {
        cancelAnimationFrame(animationId);
        resolve();
      },
    });
  });
};
const isAnimating = ref(false);
let scrollTimeout = null;

const checkVisibility = () => {
  if (!digitalScrollRef.value) return false;
  const rect = digitalScrollRef.value.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const isVisible =
    rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2;
  return isVisible;
};

const handleScroll = () => {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  scrollTimeout = setTimeout(() => {
    if (isDestroyed.value) return;
    const isVisible = checkVisibility();
    if (isVisible && !isTitleInView.value && !isAnimating.value) {
      startTitleAnimation();
      startAnimation();
    }
  }, 50);
};

const startAnimation = async () => {
  if (!isTitleInView.value || isAnimating.value || isDestroyed.value) {
    return;
  }
  isAnimating.value = true;

  try {
    for (let i = 0; i < digitalScrollContent.value.length; i++) {
      if (isDestroyed.value) break;
      const item = digitalScrollContent.value[i];

      item.isVisible = true;
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (isDestroyed.value) break;
      await animateNumber(item, i);
      if (isDestroyed.value) break;

      item.isContentVisible = true;
      await new Promise((resolve) => {
        const timer = setTimeout(() => {
          if (!isDestroyed.value) {
            resolve();
          }
        }, item.contentWords.length * 30 + 300);

        animationTimers.value.push({
          item,
          timer,
          cancel: () => {
            clearTimeout(timer);
            resolve();
          },
        });
      });
    }
  } finally {
    if (!isDestroyed.value) {
      isAnimating.value = false;
    }
  }
};

const startTitleAnimation = () => {
  if (!isTitleInView.value) isTitleInView.value = true;
  // 标题动画已经通过CSS实现，这里只需要标记状态
};

const clearAllTimers = () => {
  // 清除所有定时器
  animationTimers.value.forEach(({ cancel }) => cancel());
  animationTimers.value = [];
  clearTimeout(scrollTimeout);
  scrollTimeout = null;
};

const resetAndStartAnimations = () => {
  // 清除所有正在运行的动画
  clearAllTimers();

  // 重置状态
  isTitleInView.value = false;
  isAnimating.value = false;

  // 不再重置数字和内容的状态
  digitalScrollContent.value.forEach((item) => {
    if (!item.isVisible) {
      item.isVisible = false;
      item.isContentVisible = false;
    }
  });

  // 检查元素是否在视口中
  nextTick(() => {
    if (digitalScrollTitleRef.value) {
      const titleRect = digitalScrollTitleRef.value.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (titleRect.top >= 0 && titleRect.bottom <= windowHeight) {
        startTitleAnimation();
      }
    }

    if (digitalScrollRef.value) {
      const contentRect = digitalScrollRef.value.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (contentRect.top >= 0 && contentRect.bottom <= windowHeight) {
        startAnimation();
      }
    }
  });
};

let observer = null;
let titleObserver = null;

onMounted(() => {
  resetAndStartAnimations();
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 为每个实例创建独立的观察者
  titleObserver = new IntersectionObserver(
    (entries) => {
      if (isDestroyed.value) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isTitleInView.value) {
          startTitleAnimation();
          startAnimation();
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );

  observer = new IntersectionObserver(
    (entries) => {
      if (isDestroyed.value) return;
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !isTitleInView.value &&
          !isAnimating.value
        ) {
          startAnimation();
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px",
    }
  );

  if (digitalScrollTitleRef.value) {
    titleObserver.observe(digitalScrollTitleRef.value);
  }
  if (digitalScrollRef.value) {
    observer.observe(digitalScrollRef.value);
  }
});

// 监听路由变化
watch(
  () => route.fullPath,
  () => {
    resetAndStartAnimations();
  }
);

onUnmounted(() => {
  isDestroyed.value = true; // 标记组件已销毁
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  window.removeEventListener("scroll", handleScroll);
  clearAllTimers();

  // 确保观察者被正确清理
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (titleObserver) {
    titleObserver.disconnect();
    titleObserver = null;
  }

  // 不再重置数字状态
  isTitleInView.value = false;
  isAnimating.value = false;
});
</script>

<style lang="scss" scoped>
.digital-scroll {
  width: 100%;
  background: #fff;
  position: relative;
  isolation: isolate;

  .digital-scroll-title {
    font-family: "SairaMedium", sans-serif;
    font-size: 0.46rem;
    font-weight: 500;
    line-height: 0.54rem;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #000000;
    text-align: center;

    .title-char {
      display: inline-block;
      opacity: 0;
      transform: translateY(0.2rem);

      // &.space-after {
      //   margin-right: 0.2rem;
      // }

      &.animationUp {
        animation: fadeInUp 0.5s ease forwards;
        animation-fill-mode: forwards;
      }
    }
  }

  .digital-scroll-content {
    margin: 2.4rem auto;
    width: 14rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    .digital-scroll-content-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 3.6rem;
      height: 100%;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease-out;

      &.item-visible {
        opacity: 1;
        transform: translateY(0);
      }

      .digital-scroll-content-item-title {
        font-family: "SairaMedium", sans-serif;
        font-size: 0.64rem;
        font-weight: 600;
        line-height: 0.6rem;
        text-align: center;
        letter-spacing: 0rem;
        font-variation-settings: "opsz" auto;
        color: #000000;
        margin-bottom: 0.2rem;
      }

      .digital-scroll-content-item-content {
        font-family: Saira;
        font-size: 0.16rem;
        font-weight: normal;
        line-height: 0.16rem;
        text-align: center;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.04rem;
        width: 3.6rem;

        .content-word {
          opacity: 0;
          transform: perspective(1000px) rotateX(90deg);
          transform-origin: 50% 100%;
          display: inline-block;
          position: relative;

          &::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            bottom: -70%;
            transform: scaleY(-1);
            opacity: 0.2;
            background: linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.2),
              transparent
            );
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }

          &.word-visible {
            animation: flipIn 0.3s ease-out forwards;

            &::after {
              animation: reflectionIn 0.3s ease-out forwards;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 1024px) {
    padding: 0.8rem 0;
    height: auto;
    min-height: 100vh;
    .digital-scroll-desc {
      width: 100%;
      display: flex;
      justify-content: center;
      transition: all 0.8s;
      transition-delay: 5s;
      opacity: 0;
      transform: translateY(30px);
      .digital-scroll-desc-inner {
        font-family: SairaLight;
        width: 100%;
        padding: 0 0.2rem;
        font-size: 0.12rem;
        line-height: 0.24rem;
        color: rgba(0, 0, 0, 0.8);
        text-align: center;
      }
    }
    .digital-scroll-title {
      font-family: "SairaMedium", sans-serif;
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.3rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      color: #1a1a1a;
      margin-bottom: 0.6rem;
    }

    .digital-scroll-content {
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;

      .digital-scroll-content-item {
        margin-bottom: 0.64rem;

        .digital-scroll-content-item-title {
          font-family: "SairaMedium", sans-serif;
          font-size: 0.4rem;
          font-weight: 600;
          line-height: 0.48rem;
          letter-spacing: 0em;
          font-variation-settings: "opsz" auto;
          color: #000000;
          margin-bottom: 0.08rem;
        }

        .digital-scroll-content-item-content {
          font-family: SairaLight;
          font-size: 0.12rem;
          font-weight: normal;
          line-height: 0.2rem;
          letter-spacing: 0px;
          font-variation-settings: "opsz" auto;
          color: #1a1a1a;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    padding-top: 1.6rem;
    height: 100%;
    .digital-scroll-title {
      font-family: "SairaMedium", sans-serif;
      font-size: 0.46rem;
      font-weight: 500;
      line-height: 0.54rem;
    }

    .digital-scroll-content {
      margin: 2.4rem auto;
      width: 14rem;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .digital-scroll-content-item {
        width: 3.6rem;

        .digital-scroll-content-item-title {
          font-size: 0.64rem;
          line-height: 0.6rem;
          margin-bottom: 0.2rem;
        }

        .digital-scroll-content-item-content {
          width: 3.6rem;
          font-size: 0.16rem;
          line-height: 0.16rem;
        }
      }
    }
    .digital-scroll-desc {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
      left: 0;
      bottom: 1.4rem;
      transition: all 0.8s;
      transition-delay: 5.5s;
      opacity: 0;
      transform: translateY(30px);
      .digital-scroll-desc-inner {
        width: 70%;
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: rgba(0, 0, 0, 0.8);
        text-align: center;
      }
    }
  }
}

.active {
  opacity: 1 !important;
  transform: translateY(0px) !important;
}
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(0.2rem);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes flipIn {
  0% {
    opacity: 0;
    transform: perspective(1000px) rotateX(90deg);
  }

  100% {
    opacity: 1;
    transform: perspective(1000px) rotateX(0deg);
  }
}

@keyframes reflectionIn {
  0% {
    opacity: 0;
    transform: scaleY(-1) translateY(20%);
  }

  100% {
    opacity: 0.2;
    transform: scaleY(-1) translateY(0);
  }
}
</style>
