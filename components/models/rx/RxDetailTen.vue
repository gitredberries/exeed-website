<template>
  <div class="rx-ten-wrapper">
    <InsideTextSwiper :detailContents="detailContents" />
  </div>
</template>

<script setup>
const detailContents = ref([
  {
    image: "models/rx/31.jpg",
    title: "W-HUD Security Guarantee System",
    description: "Fusion of navigation, ADAS information and live view, without having to look down, you can see the important information you need on the car window, to improve driving safety.",
    isVisible_01: false,
    isRotated: false,
  },
  {
    image: "models/rx/32.jpg",
    title: "Wireless Quick Charging 50WWireless Quick Charging-50W",
    description: "Powerful wireless quick charging of 50w, Fully charged in as little as 30 minutes",
    isVisible_01: false,
    isRotated: false,
  },
  {
    image: "models/rx/33.jpg",
    title: "24.6-inch C-shaped Curved",
    description: "Enhance your visuals with a 24.6-inch C-shaped curved screen.Its sleek 3000 curvature and just 15mm thickness redefine elegance.",
    isVisible_01: false,
    isRotated: false,
  },
  {
    image: "models/rx/34.jpg",
    title: "Through-type AC Vents",
    description: "Integrated through-type air conditioner vents: Extend the visual width inside the vehicle",
    isVisible_01: false,
    isRotated: false,
  },
]);
</script>
<style lang="scss" scoped>
.rx-ten-wrapper {
  padding: 1.2rem 0;
  background: black;
}
@media screen and (max-width: 1024px) {
  .rx-ten-wrapper {
    padding: 0;
  }
}
</style>
