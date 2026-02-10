<template>
  <div class="lx-six">
    <OutsideTextSwiper :contentData="contentData" />
  </div>
</template>
<script setup>
import OutsideTextSwiper from '~/components/OutsideTextSwiper.vue';
const contentData = ref([
  {
    image: "models/lx/12.jpg",
    title: "1.6TGDI+7DCT",
    description:
      "IHEC intelligent combustion system, high-speed response supercharging technology, release strong power, super perfect match Getrac 7DCT wet dual clutch, bring better driving experience.",
  },
  {
    image: "models/lx/13.jpg",
    title: "Industry-leading 8155 Chips",
    description:
      "Most advanced 7-Nanometer automotive-grade process,ensure smooth operation.",
  },
]);
</script>
<style lang="scss" scoped>
.lx-six {
  position: relative;
  padding: 1.2rem 0;
  background: #0d0d0d;
  @media screen and (max-width: 1024px) {
    padding: 0;
  }
}
</style>
