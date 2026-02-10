<template>
  <div class="vx-eight-wrapper">
    <InsideTextSwiper :detailContents="detailContents"/>
  </div>
</template>
<script setup>
const detailContents = ref([
  {
    image: "models/vx/36.jpg",
    title: "Seamless Interaction",
    description:
      "40.6-inch triplex screen, eliminating physical buttons with touch control. Features include wireless CarPlay, Android Auto, and 3-finger swiping to switch screens. The black suspension control panel with metal trim adds a touch of elegance.",
    isVisible_01: false,
    isActive: false,
  },
  {
    image: "models/vx/37.jpg",
    title: "Spa Massage Seats",
    description:
      "Front seats with 8-way electric adjustment and 4-way lumbar support, heated and ventilated front and rear seats, seat memory function with multiple position storage, achieving one button adjustment for the best posture.",
    isVisible_01: false,
    isActive: false,
  },
  {
    image: "models/vx/38.jpg",
    title: "Exquisite Mid-Row Space",
    description:
      "Enjoy every toast in comfort with mid-row seats featuring a central armrest,storage and cup holders.",
    isVisible_01: false,
    isActive: false,
  },
  {
    image: "models/vx/39.jpg",
    title: "Silent Cabin",
    description:
      "ANC for peaceful serenity, generating antiphase sound waves to drown out cabin noise.",
    isVisible_01: false,
    isActive: false,
  },
  {
    image: "models/vx/40.jpg",
    title: "Premium-level Comfort",
    description:
      "With a height of 385mm for the seat and 1003mm for the headroom, the second row is very spacious",
    isVisible_01: false,
    isActive: false,
  },
])
</script>
<style lang="scss" scoped>
  .vx-eight-wrapper{
    background-color: #131313;
  }
</style>