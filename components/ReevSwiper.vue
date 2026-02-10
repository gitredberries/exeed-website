<template>
  <div>
    <!-- 只有在移动端（<=768px）才显示 Swiper -->
    <Swiper
      v-if="isMobile"
      :modules="[SwiperPagination]"
      :slides-per-view="1"
      :loop="true"
      :pagination="{ clickable: true }"
      class="mobile-swiper"
    >
      <SwiperSlide v-for="(image, index) in images" :key="index">
        <BaseImg :src="image" alt="" />
        <div class="text">Creeping over 35% slope
        </div>
        <!-- <img :src="image" alt="Slide Image" class="slide-img" /> -->
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination as SwiperPagination } from "swiper/modules";

// 图片列表
const images = ref([
  "explorationImage/57.png",
  "explorationImage/58.png",
  "explorationImage/59.png",
  "explorationImage/60.png",
  "explorationImage/61.png",
  "explorationImage/62.png",
  "explorationImage/63.png",
  "explorationImage/64.png",
]);

// 只在客户端执行，防止 SSR 时报错
const isMobile = ref(false);

const checkScreenSize = () => {
  if (typeof window !== "undefined") {
    isMobile.value = window.innerWidth <= 768;
  }
};

onMounted(() => {
  checkScreenSize(); // 组件加载时检查一次
  window.addEventListener("resize", checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreenSize);
});
</script>

<style scoped>
.mobile-swiper {
  width: 100%;
  height: auto;
}

.slide-img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}
.text{
  font-size: 0.14rem;
        font-family: Saira;
        font-weight: normal;
        line-height: 0.2rem;
        letter-spacing: normal;
        color: #B2B2B2;
        margin-top: 0.12rem;
        margin-bottom: 0.4rem;
        /* margin-left: 0.2rem; */
}
:deep(.swiper-pagination-bullet) {
  background: #808080; /* 默认白色半透明 */
}

:deep(.swiper-pagination-bullet-active) {
  background: white; /* 选中时纯白色 */
}
</style>
