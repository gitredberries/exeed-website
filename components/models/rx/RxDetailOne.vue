<template>
  <div>
    <!-- PC 端 -->
    <div class="detail" ref="targetRef">
      <div class="banner_shade" :class="{ active: isVisible }"></div>
      <BaseImg
        v-show="selectedTab === 'PHEV' && isPC"
        class="img_01"
        src="models/rx/01.jpg"
        alt=""
      />
      <BaseImg
        v-show="selectedTab === 'PHEV' && !isPC"
        class="img_01"
        src="models/h5/38.jpg"
        alt=""
      />
      <BaseImg
        v-show="selectedTab === 'ICE' && isPC"
        class="img_01"
        src="models/rx/09.jpg"
        alt=""
      />
      <BaseImg
        v-show="selectedTab === 'ICE' && !isPC"
        class="img_01"
        src="models/h5/39.jpg"
        alt=""
      />
      <div class="detail_title">
        <div class="title_nav">
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
        <div class="title">
          <div v-show="selectedTab === 'PHEV'">
            RX PHEV-Keep exploring,power never limiting
          </div>
          <div v-show="selectedTab === 'ICE'">
            RX-Keep Exploring, CDC Never Wobbling
          </div>
        </div>
        <div class="title_01">
          <div>CONTROL YOUR FURIOUS JOURNEY</div>
        </div>
      </div>
      <div class="title_Jump">
        <PonoraMic sign="rx"/>
      </div>
    </div>
    <div>
      <RxDetailTwo v-if="selectedTab === 'PHEV'" />
      <RxDetailThree v-if="selectedTab === 'ICE'" />
    </div>
  </div>
</template>

<script setup>
import RxDetailTwo from "@/components/models/rx/RxDetailTwo.vue";
import RxDetailThree from "@/components/models/rx/RxDetailThree.vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";

// 使用 useAnimation Hook
const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

// 默认选中 PHEV.判断pc/h5
const selectedTab = ref("PHEV");
const isPC = ref(false);
onMounted(() => {
  isPC.value = window.innerWidth > 1023;

  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  isPC.value = window.innerWidth > 1023;
};

// 监听 isVisible 的变化，触发动画
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value.querySelector(".img_01").classList.add("animate");
    targetRef.value.querySelector(".title_nav").classList.add("animate");
    targetRef.value.querySelector(".title").classList.add("animate");
    targetRef.value.querySelector(".title_01").classList.add("animate");
    targetRef.value.querySelector(".title_Jump").classList.add("animate");
  } else {
    targetRef.value.querySelector(".img_01").classList.remove("animate");
    targetRef.value.querySelector(".title_nav").classList.remove("animate");
    targetRef.value.querySelector(".title").classList.remove("animate");
    targetRef.value.querySelector(".title_01").classList.remove("animate");
    targetRef.value.querySelector(".title_Jump").classList.add("animate");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<style scoped lang='scss'>
@import url(../css/main.scss);
.detail {
  height: 100vh;
  width: 100vw;
  // height: calc(100vh - 0.72rem);
  position: relative;
  transition: top 0.3s ease;
  padding-left: 0.8rem;
  background-color: #000;
  .img_01 {
    width: 100vw;
    height: 100%;
    object-fit: cover;
    transform: scale(1);
    transition: transform 2s;
    transition-delay: 0.3s;
    position: absolute;
    // position: fixed;
    // z-index: -1;
    left: 0;
    top: 0;
  }
  .img_02 {
    display: none;
  }
  .detail img.animate {
    transform: scale(1.2);
  }
  .detail_title {
    position: absolute;
    left: 1.2rem;
    bottom: 0.94rem;
    // position: fixed;
    .title_nav {
      width: 3.44rem;
      display: flex;
      margin-bottom: 0.4rem;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.6s;
      &.animate {
        transform: translateY(0);
        opacity: 1;
      }
      div {
        width: 50%;
        height: 0.4rem;
        font-size: 0.14rem;
        color: #DBB193;
        line-height: 0.4rem;
        text-align: center;
        box-sizing: border-box;
        border: 0.01rem solid #dbb193;
        &:nth-of-type(1){
          border-radius: 0.02rem 0 0 0.02rem;
        }
        &:nth-of-type(2){
          border-radius: 0 0.02rem 0.02rem 0;
        }
      }
      div:hover {
        background: #dbb193;
        color: white;
      }
      div.active {
        background: #dbb193;
        color: white;
      }
    }
    .title {
      display: flex;
      transform: translateY(1rem);
      opacity: 0;
      transition: all 1s;
      transition-delay: 0.8s;
      &.animate {
        transform: translateY(0);
        opacity: 1;
      }
    }
    .title_01 {
      display: none;
    }
  }
}
@media screen and (max-width: 1024px) {
  .detail {
    height: 100vh;
    width: 100%;
    padding-left: 0.2rem;
    .detail_title {
      position: absolute;
      left: 0.2rem;
      .title_nav {
        width: 1.96rem;
        margin-bottom: 0.1rem;
        div {
          height: 0.32rem;
          line-height: 0.32rem;
          font-size: 14px;
          font-weight: normal;
          color: #E3BEA4;
        }
      }
      .title {
        display: none;
      }
      .title_01 {
        font-size: 0.26rem;
        line-height: 0.3rem;
        color: #ffffff;
        display: block;
        transform: translateY(1rem);
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.8s;
        margin-bottom: 0.32rem;
        &.animate {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
    .title_Jump {
      position: absolute;
      bottom: 0.6rem;
      left: 0.2rem;
      right: 0.2rem;
    }
  }
}
</style>
