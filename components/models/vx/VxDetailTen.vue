<template>
  <div class="vx-ten">
    <div class="arrow-wrapper">
      <BaseImg
        :style="{ opacity: curIndex === 0 ? '0.5' : '1' }"
        src="model/rx/arrow-gold-left.png"
        @click="onPrevClick"
      />
      <BaseImg
        :style="{ opacity: curIndex === contentData.length - 1 ? '0.5' : '1' }"
        src="model/rx/arrow-gold-right.png"
        @click="onNextClick"
      />
    </div>
    <OutsideTextSwiper
      :contentData="contentData"
      @getSwiperIndex="getSwiperIndex"
      ref="swiperRef"
    />
  </div>
</template>
<script setup>
const swiperRef = ref();

const curIndex = ref(0);

const onPrevClick = () => {
  swiperRef.value.slidePrev();
};

const onNextClick = () => {
  swiperRef.value.slideNext();
};

const getSwiperIndex = (index) => {
  curIndex.value = index;
};

const contentData = ref([
  {
    image: "models/vx/42.jpg",
    title: "26 ADAS Functions",
    description:
      "26 ADAS functions ensure safety with monitoring, early warning, and intervention. The SDG system reduces collision risk with alerts. Fully automatic parking includes HPA and APA, with a 540° camera for easy parking.",
  },
  {
    image: "models/vx/43.jpg",
    title: "Internet of Vehicles(IOV)",
    description:
      "Remote vehicle control through IOV(Internet of Vehicles), with one-click start, one-click vehicle locating, and air conditioning timing.",
  },
]);
</script>
<style lang="scss" scoped>
.vx-ten {
  position: relative;
  padding: 1.2rem 0;
  background: #0d0d0d;
  .arrow-wrapper {
    position: absolute;
    right: 1.27rem;
    top: 0.63rem;
    display: flex;
    img {
      margin-left: 0.34rem;
      cursor: pointer;
      opacity: 0.5;
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 0;
    .arrow-wrapper {
      display: none;
    }
  }
}
</style>
