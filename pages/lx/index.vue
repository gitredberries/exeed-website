<template>
  <div class="detail">
    <LxDetailOne />
    <LxDetailTwo />
    <LxDetailThree />
    <LxDetailFour />
    <LxDetailFive />
    <LxDetailSix />
    <LxDetailSeven />
    <LxDetailEight />
    <LxDetailNine />
    <LXDetailTen />
  </div>
</template>
  
<script setup>
useHead({
  title: 'EXEED LX Model Page | Bahrain',
  meta: [
    { name: 'description', content: 'Discover the new EXEED LX - Explore Your Modern Self.' }
  ]
});

import LxDetailOne from "@/components/models/lx/LxDetailOne.vue";
import LxDetailTwo from "@/components/models/lx/LxDetailTwo.vue";
import LxDetailThree from "@/components/models/lx/LxDetailThree.vue";
import LxDetailFour from "@/components/models/lx/LxDetailFour.vue";
import LxDetailFive from "@/components/models/lx/LxDetailFive.vue";
import LxDetailSix from "@/components/models/lx/LxDetailSix.vue";
import LxDetailSeven from "@/components/models/lx/LxDetailSeven.vue";
import LxDetailEight from "@/components/models/lx/LxDetailEight.vue";
import LxDetailNine from "@/components/models/lx/LxDetailNine.vue";
import LXDetailTen from "@/components/models/lx/LXDetailTen.vue";
</script>
<style lang="scss" scoped>
.detail {
  overflow: hidden;
  background-color: black;
}
</style>
  