<template>
  <div class="detail">
    <RxDetailOne />
    <RxDetailFour />
    <RxDetailFive />
    <RxDetailSix />
    <RxDetailNine />
    <RxDetailTen />
    <RxDetailEleven />
    <RxDetailTwelve />
    <RxDetailThirteen />
    <RxDetailFourteen />
  </div>
</template>
    
<script setup>
useHead({
  title: 'EXEED RX Model Page | Bahrain',
  meta: [
    { name: 'description', content: 'Explore the new EXEED RX - The SUV of Choice for Every Aspect of Life.' }
  ]
});

import RxDetailOne from"@/components/models/rx/RxDetailOne.vue"
import RxDetailFour from "@/components/models/rx/RxDetailFour.vue"
import RxDetailFive from "@/components/models/rx/RxDetailFive.vue"
import RxDetailSix from "@/components/models/rx/RxDetailSix.vue"
import RxDetailNine from "@/components/models/rx/RxDetailNine.vue"
import RxDetailTen from "@/components/models/rx/RxDetailTen.vue"
import RxDetailEleven from "@/components/models/rx/RxDetailEleven.vue"
import RxDetailTwelve from "@/components/models/rx/RxDetailTwelve.vue"
import RxDetailThirteen from "@/components/models/rx/RxDetailThirteen.vue"
import RxDetailFourteen from "@/components/models/rx/RxDetailFourteen.vue"
</script>
<style lang="scss" scoped>
.detail {
  overflow: hidden;
  background-color: black;
}
</style>
    