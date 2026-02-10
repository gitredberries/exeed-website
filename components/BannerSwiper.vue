  <!-- PC 端 -->
  <template>
  <div class="swiper-container">
    <!-- 指示点 -->
    <div :class="['hero-indicationPoint', props.isCircleCenter ? 'circle-center' : '']" v-if="list.length > 1">
      <div class="hero-indicationPoint-item" v-for="(item, index) in list" @click="onCircleClick(index)" @mouseenter.stop.prevent>
        <CircleAnimate :showAnimate="currentIndex === index" :duration="props.autoplayDelay"/>
      </div>
    </div>
    <Swiper
      :modules="modules"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
      :slides-per-view="slidesPerView"
      class="swiper_content"
      style="pointer-events: auto"
      @touch-move="onTouchMove"
      @touch-start="onTouchStart"
      @touch-end="onTouchEnd"
    >
      <SwiperSlide class="swiper_slide" v-for="item in list" :key="item.id">
        <slot :item="item">
          <img v-if="!isMobile" class="hero-image-bg" :src="item.image" alt="" />
          <img v-else style="min-height: 100vh" class="hero-image-bg" :src="item.imageMobile||item.image" alt="" />
          <div class="hero-text">
            <div class="hero-text-title">{{ item.title }}</div>
            <div class="hero-text-content">
              {{ JSON.parse(item.jsondef).subtitle }}
            </div>
          </div>
        </slot>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

  <script setup>
import { ref, onMounted, onUnmounted, computed} from "vue";
import { Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import { isMobileDevice } from "@/utils/common/index.js";
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  autoplayDelay: {
    type: Number,
    default: 5000,
  },
  slidesPerView: {
    type: Number,
    default: 1,
  },
  isCircleCenter: {
    type: Boolean,
    default: false,
  }
});

const emit = defineEmits(["slideChange", "touchMove", "touchStart", "touchEnd"]);
const isMobile = computed(() => {
  return isMobileDevice()
})
const currentIndex = ref(0);
const modules = [Pagination, Scrollbar];
const swiperInstance = ref(null);
let timer = null;

const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
};

const onTouchMove = (_, e) => {
  emit("touchMove", e);
};

const onTouchStart = () => {
  emit("touchStart");
}

const onTouchEnd = () => {
  emit("touchEnd");
}

const onCircleClick = (index) => {
  if (swiperInstance.value) {
    swiperInstance.value.slideTo(index);
  }
};

const startAutoPlay = () => {
  timer = setTimeout(() => {
    if (swiperInstance.value) {
      const nextIndex = (currentIndex.value + 1) % props.list.length;
      swiperInstance.value.slideTo(nextIndex);
    }
  }, props.autoplayDelay);
};

const resetAutoPlay = () => {
  if (timer) clearTimeout(timer);
  startAutoPlay();
};

const onSlideChange = (swiper) => {
  currentIndex.value = swiper.activeIndex;
  emit("slideChange", swiper.activeIndex);
  resetAutoPlay();
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

  <style scoped>
.swiper-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero-indicationPoint {
  position: absolute;
  z-index: 2;
  right: 1.2rem;
  bottom: 1rem;
  display: flex;
  align-items: center;
  @media screen and (max-width: 1024px) {
    left: 0.2rem;
    right: auto;
    bottom: 0.74rem;
  }
}
.circle-center{
  @media screen and (max-width: 1024px) {
    left: 50%;
    transform: translateX(-50%);
    top: auto;
    bottom: 0.5rem;
  }
}

.hero-indicationPoint-item {
  width: 0.26rem;
  height: 0.26rem;
  margin-right: 0.12rem;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    width: 0.16rem;
    height: 0.16rem;
    margin-right: 0.08rem;
  }
}

/* 轮播图默认样式 */
.swiper_content {
  width: 100%;
  height: 100%;
}

.swiper_slide {
  position: relative;
}

.hero-image-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-text {
  position: absolute;
  bottom: 2rem;
  left: 1.2rem;
  color: white;
  text-align: left;
}

.hero-text-title {
  font-size: 0.36rem;
  font-weight: bold;
  margin-bottom: 0.16rem;
}

.hero-text-content {
  font-size: 0.24rem;
  opacity: 0.8;
}
</style>
