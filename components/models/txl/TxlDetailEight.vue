<template>
  <div class="txl-eight-wrapper">
    <InsideTextSwiper :detailContents="detailContents" />
  </div>
</template>
<script setup>
const detailContents = ref([
  {
    image: "models/txl/19.jpg",
    title: "Spa Massage Seats",
    description:
      "Front seats with 8-way electric adjustment and 4-way lumbar support, heated and ventilated front and rear seats, seat memory function with multiple position storage, achieving one-button adjustment for the best posture.",
    isVisible_01: false,
    isRotated: false,
  },
  {
    image: "models/txl/20.jpg",
    title: "The Ultimate Pilot for a Musical Journey ",
    description:
      "7.1.4 panoramic sound surround, 16-channel equipped with 23 speakers, front and rear door three-way configuration, comparable to a mobile concert hall, 3 music modes to bring the perfect audio-visual enjoyment. The headrest audio of the main driver enjoys more privacy.",
    isVisible_01: false,
    isRotated: false,
  },
  {
    image: "models/txl/21.jpg",
    title: "Silent Cabin",
    description:
      "ANC for peaceful serenity, generating antiphase sound waves to drown out cabin noise.",
    isVisible_01: false,
    isRotated: false,
  },
  {
    image: "models/txl/22.jpg",
    title: "Premium-level Comfort",
    description:
      "The three-layer sponge system with higher density and stronger rebound ensures the perfect balance of the riding experience, and the double-pieced design of NAPPA leather and a small amount of suede achieves the coexistence of tactility and breathability, and enhances the aesthetics and sense of high grade.",
    isVisible_01: false,
    isRotated: false,
  },
]);
</script>
<style lang="scss" scoped>
.txl-eight-wrapper {
  padding: 1.2rem 0;
  background: black;
}
@media screen and (max-width: 1024px) {
  .txl-eight-wrapper {
    padding: 0;
  }
}
</style>
