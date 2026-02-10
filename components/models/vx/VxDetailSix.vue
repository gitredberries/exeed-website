<template>
  <div class="vx-six">
    <div class="arrow-wrapper">
      <BaseImg :style="{opacity: curIndex === 0 ? '0.5' : '1' }" src="model/rx/arrow-gold-left.png" @click="onPrevClick"/>
      <BaseImg :style="{opacity: curIndex === contentData.length - 1 ? '0.5' : '1' }" src="model/rx/arrow-gold-right.png" @click="onNextClick"/>
    </div>
    <OutsideTextSwiper :contentData="contentData" @getSwiperIndex="getSwiperIndex" ref="swiperRef"/>
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
}

const getSwiperIndex = (index) => {
  curIndex.value = index;
}

const contentData = ref([
  {
    image: "models/vx/16.jpg",
    title: "2.0T+8AT Golden Power Combo",
    description:
      "Adopting the golden power combination of the new high-power 2.0T engine and Aisin 8-speed automatic transmission (8AT), it reaches a maximum power of 192kW, a peak torque of 400N.m, and a maximum thermal efficiency of 41%. With ultra strong power, it successfully achieves 0-100km acceleration in 9.5S for two-wheel drive and 9.7S for four-wheel drive.",
  },
  {
    image: "models/vx/81.jpg",
    title: "7 Driving Modes",
    description:
      "Standard <br/> Economic <br/> Sports <br/> Snowfield <br/> Mud <br/> Sand <br/> Off-road",
  },
  {
    image: "models/vx/82.jpg",
    title: "Easy For 4WD Switching",
    description: "The BorgWarner all-terrain four-wheel drive system offers millisecond response, The electro-hydraulic torque manager enables faster four-wheel drive response and stronger assistance, with a 120ms switching and 50% torque distribution on the rear axle. Lightweight at 5.5kg, it reduces weight by 37.5% and meets 45° ramp climbing requirements."
  },
  {
    image: "models/vx/83.jpg",
    title: "Comfort And Serenity In Ride",
    description: "Master chassis tuning enhances handling and stability with a linear response range of ≥0.4g and maximum lateral acceleration of ~0.94g. Comfort with cast aluminum steering knuckles and hydraulic bushings, reducing NVH for a smoother ride."
  },
]);
</script>
<style lang="scss" scoped>
  .vx-six{
    position: relative;
    padding: 1.2rem 0;
    background: #0D0D0D;
    .arrow-wrapper{
      position: absolute;
      right: 1.27rem;
      top: 0.63rem;
      display: flex;
      img{
        margin-left: 0.34rem;
        cursor: pointer;
        opacity: 0.5;
        transition: all 0.5s;
      }
    }
    @media screen and (max-width: 1024px)  {
      padding: 0;
      .arrow-wrapper {
        display: none;
      }
    }
  }
</style>