<template>
  <div class="txl-six">
    <OutsideTextSwiper :contentData="contentData" />
  </div>
</template>
<script setup>
import OutsideTextSwiper from '~/components/OutsideTextSwiper.vue';
const contentData = ref([
  {
    image: "models/txl/14.jpg",
    title: "2.0T+8AT Golden Power Combination",
    description:
      "Adopting the golden power combination of the new high-power 2.0T engine and 8-speed automatic transmission (8AT), it has a maximum power of 192kW, a peak torque of 400N.m and a maximum thermal efficiency of 41%.",
  },
  {
    image: "models/txl/15.jpg",
    title: "7 Driving Modes",
    description:
      "①Standard <br/> ②Economic<br/> ③Sports <br/> ④Snowfield <br/> ⑤Mud <br/> ⑥Sand <br/> ⑦Off-road",
  },
  {
    image: "models/txl/16.jpg",
    title: "Easy For 4WD Switching",
    description:
      "The BorgWarner all-terrain four-wheel drive system offers millisecond response. The electro-hydraulic torque manager enables faster four-wheel drive response and stronger assistance, with a 120ms switching and 50% torque distribution on the rear axle. Lightweight at 5.5kg, it reduces weight by 37.5% and meets 45° ramp climbing requirements.",
  },
  {
    image: "models/txl/17.jpg",
    title: "Comfort And Serenity In Ride",
    description:
      "Master chassis tuning enhances handling and stability with a linear response range of ≥0.4g and maximum lateral acceleration of ≥0.94g. Comfort with cast aluminum steering knuckles and hydraulic bushings, reducing NVH for a smoother ride.",
  },
]);
</script>
<style lang="scss" scoped>
.txl-six {
  position: relative;
  padding: 1.2rem 0;
  background: #0d0d0d;
  @media screen and (max-width: 1024px) {
    padding: 0;
  }
}
</style>
