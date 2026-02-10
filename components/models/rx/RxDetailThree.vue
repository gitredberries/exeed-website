<template>
  <!-- PC 端 -->
  <div class="detail" ref="targetRef" :class="{ active: isVisible }">
    <div class="title_01">Overview and Parameters</div>
    <div class="title_02">
      RX evolves into your SUV for exploring diverse life scenarios.
    </div>
    <div class="title_content">
      <div class="item" :class="{ animate: isVisible }">
        <div class="item_title">Electromagnetic Suspension</div>
        <div class="item_tent">
          <div class="item_content">
            <BaseImg class="img" src="models/rx/16.png" alt="" />
            <div class="digit">CDC</div>
          </div>
          <div class="item_border"></div>
        </div>
      </div>

      <div class="item" :class="{ animate: isVisible }">
        <div class="item_title">Driving Modes</div>
        <div class="item_tent">
          <div class="item_content btn">
            <BaseImg class="img" src="models/rx/17.png" alt="" />
            <div class="digit"><CountTo value="7" /></div>
          </div>
        </div>
      </div>
      <div class="item" :class="{ animate: isVisible }">
        <div class="item_title">Engine</div>
        <div class="item_tent">
          <div class="item_content">
            <BaseImg class="img" src="models/rx/18.png" alt="" />
            <div class="digit"><CountTo value="2" /> .0TGDI</div>
          </div>
        </div>
      </div>
      <div class="item" :class="{ animate: isVisible }">
        <div class="item_title">Transmission</div>
        <div class="item_tent">
          <div class="item_content">
            <BaseImg class="img" src="models/rx/19.png" alt="" />
            <div class="digit"><CountTo value="8" /> AT</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

    <script setup>
import { watch, onMounted } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import CountTo from "@/components/models/vx/CountTo.vue";
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

onMounted(() => {
  if (targetRef.value) {
    // 初始动画
    targetRef.value.querySelector(".title_01").classList.add("animate");
    const demo1Elements = targetRef.value.querySelectorAll(".item_title");
    demo1Elements.forEach((element) => {
      element.classList.add("animate");
    });

    targetRef.value.querySelector(".title_02").classList.add("animate");
    targetRef.value.querySelector(".title_content").classList.add("animate");
    targetRef.value.querySelector(".item_border").classList.add("animate");
  }
});

watch(isVisible, (newVal) => {
  if (newVal) {
    const items = targetRef.value.querySelectorAll(".item");
    items.forEach((item) => {
      item.classList.remove("animate");
      void item.offsetWidth;
      item.classList.add("animate");
    });

    // 重新触发标题动画
    targetRef.value.querySelector(".title_01").classList.add("animate");

    // 获取所有 .item_title 元素并添加动画类
    const demo1Elements = targetRef.value.querySelectorAll(".item_title");
    demo1Elements.forEach((element) => {
      element.classList.remove("animate");
      void element.offsetWidth;
      element.classList.add("animate");
    });

    targetRef.value.querySelector(".title_02").classList.add("animate");
    targetRef.value.querySelector(".title_content").classList.add("animate");
    targetRef.value.querySelector(".item_border").classList.add("animate");
  } else {
    // 移除动画类
    targetRef.value.querySelector(".title_01").classList.remove("animate");

    // 获取所有 .item_title 元素并移除动画类
    const demo1Elements = targetRef.value.querySelectorAll(".item_title");
    demo1Elements.forEach((element) => {
      element.classList.remove("animate");
    });

    targetRef.value.querySelector(".title_02").classList.remove("animate");
    targetRef.value.querySelector(".title_content").classList.remove("animate");
    targetRef.value.querySelector(".item_border").classList.add("animate");
  }
});
</script>
    <style scoped lang='scss'>
.detail {
  width: 100vw;
  position: relative;
  background: black;
  padding: 2.38rem 1.4rem;
  .title_01 {
    font-size: 0.52rem;
    font-weight: 500;
    color: #e3bea4;
    transform: translateY(1.5rem);
    transition: all 1.51s;
    display: block;
    opacity: 0;
    transition-delay: 0.1s;
    &.animate {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .title_02 {
    font-size: 0.4rem;
    font-weight: normal;
    color: #e3bea4;
    line-height: 0.4rem;
    margin-top: 0.4rem;
    transform: translateY(1.5rem);
    opacity: 0;
    transition: all 1.51s;
    transition-delay: 0.3s;
    &.animate {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .title_content {
    display: flex;
    margin-top: 1.6rem;
    align-items: center;
    opacity: 0;
    transition: all 1.51s;
    transition-delay: 0.5s;
    &.animate {
      transform: translateY(0);
      opacity: 1;
    }
    .item {
      color: #e3bea4;
      margin-right: 0.4rem;
      padding-bottom: 0.6rem;
      position: relative;
      width: 24%;
      .item_title {
        font-size: 0.2rem;
        line-height: 0.28rem;
        color: rgba(227, 190, 164, 0.7);
        opacity: 0;
        transition: all 1.51s;
        transition-delay: 0.5s;
        &.animate {
          transform: translateY(0);
          opacity: 1;
        }
      }
      .item_tent {
        margin-top: 1rem;
        .item_content {
          display: flex;
          align-items: center;
          font-size: 0.64rem;
          font-weight: 600;
          line-height: 0.6rem;
          color: #e3bea4;
          .img {
            width: 0.42rem;
            height: 0.42rem;
            margin-right: 0.15rem;
          }
        }
      }
    }
  }
}
.digit {
  font-style: normal;
  white-space: nowrap;
}
@media screen and (max-width: 1024px) {
  .detail {
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-top: 0.8rem;
    height: 8.12rem;
    .title_01 {
      font-size: 0.26rem;
      font-weight: 500;
      line-height: 0.3rem;
      color: #e3bea4;
      margin-bottom: 0.16rem;
    }
    .title_02 {
      font-size: 0.18rem;
      line-height: 0.3rem;
      color: #e3bea4;
      margin-top: 0;
      margin-bottom: 0.4rem;
    }
    .title_content {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 0 !important;
      .item {
        width: 39% !important;
        margin-right: 0.35rem !important;
        margin-bottom: 0.56rem !important;
        padding-bottom: 0rem !important;
        height: 1.48rem;
        .item_title {
          font-size: 0.14rem !important;
          line-height: 0.2rem !important;
        }
        .item_tent {
          margin-top: 0.2rem !important;
          .item_content {
            font-size: 0.26rem !important;
            margin-bottom: 0.4rem;
            img {
              width: 0.24rem !important;
              height: 0.24rem !important;
              margin-top: 0 !important;
              margin-right: 0.06rem;
            }
          }
        }
      }
    }
  }
  .btn {
    padding-top: 0.2rem;
  }
}
</style>
