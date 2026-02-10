<template>
  <div class="txl-six">
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
    image: "models/rx/22.jpg",
    title: "Hybrid specific engine; Thermal efficiency 44.5%",
    description:
      "The highly efficient and energy-saving engine significantly improves the energy utilization efficiency, making the fuel consumption of power loss as low as 5.4L per 100km, and the NVH performance better than the industry standard by 2dB(A). It also brings more than 1,300 kilometers of comprehensive range.All these advocate a green and environmentally friendly lifestyle with worry-free range.",
  },
  {
    image: "models/rx/23.jpg",
    title:
      "3-gear DHT hybrid-dedicated transmission; transmission efficiency 97.6%",
    description:
      "The highly efficient transmission system ensures smooth power transmission and response speed, offering drivers a smoother driving experience.",
  },
  {
    image: "models/rx/24.jpg",
    title: "Powerful three motors; Peak wheel-end torque 3,800 N • m.",
    description:
      "It not only improves the vehicle's acceleration performance, but also ensures power response and handling stability under various driving conditions, providing drivers with a more confident and safer driving experience.",
  },
  {
    image: "models/rx/25.jpg",
    title: "I-AWD system",
    description:
      "TThe vehicle can intelligently switch between rear wheel drive and four-wheel drive. The torque distribution range of the front axle is from 0 to 90%, and that of the rear axle is from 10 to 100%. It realizes excellent handling stability and through performance under six working conditions such as snow and sand. Especially at high speeds, it takes only 2.8 seconds to accelerate from 90 km/h to 120 km/h, demonstrating excellent performance in extreme acceleration and overtaking.",
  },
]);
</script>
<style lang="scss" scoped>
.txl-six {
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
