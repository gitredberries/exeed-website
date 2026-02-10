<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in slides" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';

// 模拟幻灯片数据
const slides = ref(['Slide 1', 'Slide 2', 'Slide 3']);

onMounted(() => {
  new Swiper('.swiper', {
    modules: [Pagination, Navigation],
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
});
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 300px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}
</style>