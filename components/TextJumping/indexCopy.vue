<template>
  <div class="text-jumping-component">
    <div class="mission-logo">
      <BaseImg
        :src="
          isMobile
            ? 'explorationImage/explorationTwoMobile.jpg'
            : 'explorationImage/explorationTwo.png'
        "
        alt=""
        class="explorationTwo"
      />
    </div>

    <div class="text-container" ref="textContainerRef">
      <div class="mission-text1" v-if="isTextContainerVisible">
        <template v-for="(char, index) in textArray" :key="index">
          <span
            class="typing-char"
            :style="{ 'animation-delay': `${index * 300}ms` }"
            >{{ char }}&nbsp;</span
          >
        </template>
      </div>
      <div class="mission-text1 md-mission-text1" v-if="isTextContainerVisible">
        <template v-for="(char, index) in mdTextArray" :key="index">
          <span
            class="typing-char"
            :style="{ 'animation-delay': `${index * 300}ms` }"
            >{{ char }}&nbsp;</span
          >
        </template>
      </div>
    </div>

    <div class="mission-text-mobile" ref="mobileTextRef">
      <div class="mission-text-mobile-title" :class="{ 'fade-in': isVisible }">
        Brand Concept:Born For More
      </div>
      <div
        class="mission-text-mobile-content"
        :class="{ 'fade-in': isVisible }"
        :style="{ 'animation-delay': isVisible ? '300ms' : '0ms' }"
      >
        The Spirit of Exploration is in the DNA of the EXEED brand
      </div>
      <div
        :class="{ 'fade-in': isVisible }"
        :style="{ 'animation-delay': isVisible ? '600ms' : '0ms' }"
      >
        High-end art is the means by which the EXEED brand expresses its concept
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { isMobileDevice } from "@/utils/common/index.js";

const text =
  "The exploration gene drives us to disrupt the automotive industry and to be a practitioner and leader in forward-looking technology. Our mission is to enable consumers to live a freer, more sustainable and personalised lifestyle";
const textArray = computed(() => text.split(" "));
const mdTextArray = computed(() => text.split(" "));

const textContainerRef = ref(null);
const mobileTextRef = ref(null);
const isVisible = ref(false);
const isTextContainerVisible = ref(false);

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = isMobileDevice();
  // 给一个小延时确保DOM完全加载
  setTimeout(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
    };

    // 监听 text-container
    const textContainerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            isTextContainerVisible.value = true;
          });
        } else {
          // 当元素离开视口时重置动画状态
          // isTextContainerVisible.value = false;
        }
      });
    }, observerOptions);

    if (textContainerRef.value) {
      textContainerObserver.observe(textContainerRef.value);
    }

    // 监听 mobile text
    const mobileTextObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            isVisible.value = true;
          });
        } else {
          // 当元素离开视口时重置动画状态
          // isVisible.value = false;
        }
      });
    }, observerOptions);

    if (mobileTextRef.value) {
      mobileTextObserver.observe(mobileTextRef.value);
    }
  }, 100);
});
</script>

<style lang="scss" scoped>
@keyframes fadeInChar {
  from {
    opacity: 0.5;
    color: white;
  }

  to {
    color: #26B7BC;
    opacity: 1;
  }
}
// PC styles (>= 1024px)
@media screen and (min-width: 1024px) {
  .text-jumping-component {
    position: relative;
    width: 100%;
    min-height: 100%;
    height: auto;
    padding: 2rem;
    padding-bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .mission-logo {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    .explorationTwo {
      display: inline-block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // Common styles
  .text-container {
    position: relative;
  }

  .mission-text {
    width: 100%;
    height: 100%;
    font-family: SairaExpanded;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0px;
    font-variation-settings: "opsz" auto;
    color: #666;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .mission-text1 {
    width: 100%;
    height: 100%;
    font-family: SairaExpanded;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0px;
    color: #ffffff;
    z-index: 2;
    justify-content: center;
    align-items: flex-start;
  }
  .md-mission-text1 {
    display: none;
  }

  .base-char,
  .typing-char {
    opacity: 1;
    white-space: pre;
    display: inline-block;
  }

  .typing-char {
    opacity: 0.5;
    animation: fadeInChar 0.8s ease forwards;
  }

  .mission-text-mobile {
    text-align: center;
    font-family: Saira;
    font-weight: normal;
    text-align: center;
    letter-spacing: 0px;
    font-variation-settings: "opsz" auto;
    color: #26B7BC;
  }

  .text-container {
    width: 100%;
  }

  .mission-text,
  .mission-text1 {
    font-size: 0.52rem;
    line-height: 0.72rem;
  }

  .base-char,
  .typing-char {
    height: 0.72rem;
    line-height: 0.72rem;
  }

  .mission-text-mobile {
    margin: 1rem auto;
    font-size: 0.2rem;
    line-height: 0.28rem;

    .mission-text-mobile-title {
      margin-bottom: 0.2rem;
    }
  }
}

// Mobile styles (< 1024px)
@media screen and (max-width: 1024px) {
  .text-jumping-component {
    padding: 0.8rem 0.4rem 1.07rem;
    box-sizing: border-box;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    .mission-logo {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      left: 0;
      top: 0;

      .explorationTwo {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .text-container {
      text-align: center;
      position: relative;
      width: 100%;
      margin: 0.3rem auto;
    }
  }

  .mission-text,
  .mission-text1 {
    font-family: SairaLight;
    font-size: 0.26rem;
    font-weight: normal;
    line-height: 150%;
    text-align: center;
    letter-spacing: 0px;
    font-variation-settings: "opsz" auto;
    color: #666;
    width: 100%;
    display: none;
  }
  .md-mission-text1 {
    display: block;
  }

  .mission-text1 {
    color: #ffffff;
  }

  .base-char,
  .typing-char {
    opacity: 1;
    white-space: pre;
    display: inline-block;
    height: 0.4rem;
    line-height: 0.4rem;
  }

  .typing-char {
    opacity: 0.5;
    animation: fadeInChar 0.8s ease forwards;
  }

  .mission-text-mobile {
    margin-top: 0.8rem;
    text-align: center;
    color: #26B7BC;
    .mission-text-mobile-title {
      font-family: Saira;
      font-size: 0.14rem;
      font-weight: normal;
      line-height: 0.2rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      margin-bottom: 0.08rem;
    }
    .mission-text-mobile-content {
      font-family: Saira;
      font-size: 0.14rem;
      font-weight: normal;
      line-height: 0.2rem;
      text-align: center;
      letter-spacing: 0px;
      font-variation-settings: "opsz" auto;
      margin-bottom: 0.08rem;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fade-in {
  opacity: 0;
  animation: none;

  &.fade-in {
    animation: mobileTextFade 0.8s ease forwards;
  }
}

@keyframes mobileTextFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
