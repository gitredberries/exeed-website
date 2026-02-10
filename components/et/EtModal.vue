<template>
  <div :class="['modal md-modal', isActive ? 'active' : '']" v-show="isShow">
    <div class="modal-close" @click="onCloseClick">
      <BaseImg class="close-bg" src="model/es/v2_close0_2024.png" />
    </div>
    <Swiper
      class="modal-swiper"
      :modules="[Pagination]"
      :slidesPerView="2"
      :spaceBetween="20"
      :centeredSlides="true"
      :loop="true"
      :speed="1000"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true
      }"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="item in swiperList" :key="item">
        <BaseImg class="swiper-bg" :src="item" />
      </SwiperSlide>
      <div class="swiper-pagination"></div>
      <div class="navigation">
        <div class="navigation-left" @click="onNavigationClick(0)">
          <BaseImg
            class="navigation-arrow"
            src="model/es/v2_arrowleft_2024.png"
          />
        </div>
        <div class="navigation-right" @click="onNavigationClick(1)">
          <BaseImg
            class="navigation-arrow"
            src="model/es/v2_arrowright_2024.png"
          />
        </div>
      </div>
    </Swiper>
    <div class="modal-swiper-wrapper">
      <Swiper
        class="modal-swiper md-modal-swiper"
        :modules="[Pagination]"
        :loop="true"
        :speed="1000"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true
        }"
        @swiper="onMdSwiper"
      >
        <SwiperSlide v-for="item in swiperList" :key="item">
          <BaseImg class="swiper-bg" :src="item" />
        </SwiperSlide>
        <div class="swiper-pagination"></div>
        <div class="navigation">
          <div class="navigation-left" @click="onMdNavigationClick(0)">
            <BaseImg
              class="navigation-arrow"
              src="model/es/v2_arrowleft_2024.png"
            />
          </div>
          <div class="navigation-right" @click="onMdNavigationClick(1)">
            <BaseImg
              class="navigation-arrow"
              src="model/es/v2_arrowright_2024.png"
            />
          </div>
        </div>
      </Swiper>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

const isShow = ref(false);
const isActive = ref(false);

const props = defineProps({
  swiperList: Array,
  showModal: Boolean,
});

const emits = defineEmits(["closeModal"]);

let swiper = null;
let mdSwiper = null;

const onSwiper = (s) => {
  swiper = s;
};

const onMdSwiper = (s) => {
  mdSwiper = s; 
}

const onNavigationClick = (sign) => {
  if (sign === 1) {
    swiper.slideNext();
  } else {
    swiper.slidePrev();
  }
};

const onMdNavigationClick = (sign) => {
  if (sign === 1) {
    mdSwiper.slideNext(); 
  } else {
    mdSwiper.slidePrev();
  }
}

const showModal = computed(() => props.showModal);

const onCloseClick = () => {
  emits("closeModal");
};

watch(showModal, (val) => {
  if (val) {
    isShow.value = true;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      isActive.value = true;
    });
  } else {
    document.body.style.overflow = "auto";
    isActive.value = false;
    setTimeout(() => {
      isShow.value = false;
    }, 1000);
  }
});
</script>
<style lang="scss" scoped>
@import url("./css/modal.scss");
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #a8b2b9;
  display: flex;
  align-items: center;
  opacity: 0;
  transition: all 1s;
  z-index: 9999;
  .modal-swiper {
    margin-top: 0.5rem;
    padding-bottom: 1rem;
    position: relative;
    .swiper-pagination {
      position: absolute;
      bottom: 0.5rem;
      left: 1.2rem;
      width: fit-content;
      :deep(.swiper-pagination-bullet) {
        background-color: #fff;
        width: 0.25rem;
        height: 2px;
        border-radius: 0;
        margin-right: 0.05rem;
        opacity: 0.4;
      }
      :deep(.swiper-pagination-bullet-active) {
        opacity: 1;
      }
    }
  }
  .md-modal-swiper {
    display: none;
  }
  :deep(.swiper-slide-active) {
    img {
      opacity: 1;
    }
  }
  .swiper-bg {
    width: 50vw;
    opacity: 0.3;
    transition: all 1s;
  }
  .modal-close {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    border: 2px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition: all 0.5s;
    cursor: pointer;
    .close-bg {
      width: 50%;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  .navigation {
    position: absolute;
    right: 1.2rem;
    bottom: 0.3rem;
    display: flex;
    align-items: center;
    div {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 100%;
      border: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 1s;
      margin-right: 0.2rem;
      z-index: 3;
      .navigation-arrow {
        width: 0.1rem;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.modal.active {
  opacity: 1;
}
</style>