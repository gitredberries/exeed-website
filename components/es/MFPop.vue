<template>
  <div :class="['mf-pop', isPopActive ? 'active' : '']" ref="popRef">
    <div class="mf-pop-close" @click="onCloseClick">
      <BaseImg class="close-logo" src="model/es/v2_close0_2024_b.png" />
    </div>
    <div class="mf-pop-content" style="overflow: hidden">
      <Swiper
        :modules="[EffectFade]"
        effect="fade"
        :fadeEffect="{
          crossFade: true,
        }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <SwiperSlide v-for="item in swipList" :key="item.id">
          <MFPopItem :info="item" />
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="mf-pop-arrow">
      <div class="pop-arrow-left" @click="onArrowClick(1)">
        <BaseImg class="arrow-img" src="model/es/wg_lefttarrow.png" />
      </div>
      <div class="interval"></div>
      <div class="pop-arrow-right" @click="onArrowClick(2)">
        <BaseImg class="arrow-img" src="model/es/wg_rightarrow.png" />
      </div>
    </div>
  </div>
</template>
<script setup>
import MFPopItem from "./MFPopItem.vue";
import { EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { debunce } from "~/utils/common";

const popRef = ref();
const isPopActive = ref(false);
let swiper = null;

const props = defineProps({
  activeId: {
    type: Number,
    default: 1,
  },
  swipList: {
    type: Array,
    default: [],
  },
});

const onSwiper = (s) => {
  swiper = s;
};

const onSlideChange = debunce((param) => {
  if (param.realIndex + 1 !== activeId.value) {
    emits("changeSlide", param.realIndex + 1);
  }
});

const activeId = computed(() => props.activeId);

const emits = defineEmits(["close", "changeSlide"]);

const onCloseClick = () => {
  emits("close");
};

const onArrowClick = (sign) => {
  let slideIndex = 0;
  if (sign === 1) {
    if (activeId.value === 0) {
      slideIndex = props.swipList.length;
    } else {
      slideIndex = activeId.value - 1;
    }
  } else {
    if (activeId.value === props.swipList.length) {
      slideIndex = 1;
    } else {
      slideIndex = activeId.value + 1;
    }
  }
  emits("changeSlide", slideIndex);
  swiper.slideTo(slideIndex - 1);
};

const changePopActive = (bool) => {
  isPopActive.value = bool;
};

const changeSwiper = (id) => {
  swiper.slideTo(id - 1);
}

defineExpose({
  changePopActive,
  changeSwiper
});
</script>
<style lang="scss" scoped>
.mf-pop {
  position: fixed;
  width: 54vw;
  height: 100vh;
  z-index: 3;
  top: 0;
  right: 0;
  transition: all 1s;
  transform: translateX(56vw);
  background-color: white;
  opacity: 0;

  .mf-pop-close {
    position: absolute;
    top: 52%;
    width: 0.7rem;
    height: 0.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    left: -0.35rem;
    z-index: 5;
    border-radius: 100%;
    background-color: #fff;
    border: 2px solid #3aaeb0;
    cursor: pointer;
    transition: all 0.5s;
    opacity: 0.95;

    .close-logo {
      width: 0.15rem;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .mf-pop-arrow {
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 0.5rem;
    left: 0.5rem;
    z-index: 2;

    .pop-arrow-left {
      cursor: pointer;
      padding-right: 0.4rem;
    }

    .pop-arrow-right {
      cursor: pointer;
      padding-left: 0.4rem;
    }

    .interval {
      width: 1px;
      background-color: #aeaeae;
      height: 0.3rem;
      opacity: 0.3;
    }

    .arrow-img {
      width: 0.15rem;
    }
  }
}

.mf-pop.active {
  opacity: 1;
  transform: translateX(0);
}
</style>
