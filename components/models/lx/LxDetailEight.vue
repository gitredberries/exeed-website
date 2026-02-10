<template>
  <!-- PC 端 -->
  <div class="pc_content">
    <div class="detail" ref="targetRef" :class="{ active: isVisible }">
      <BaseImg class="img" :src="currentImage" alt="" />
      <el-collapse class="detail_title" v-model="activeNames" accordion>
        <div v-for="(item, index) in contentData">
          <el-collapse-item :name="`${index}`">
            <template #title>
              <div class="custom-title" @click.stop>
                <div class="title_01">{{ item.title }}</div>
                <BaseImg
                  :src="
                    activeNames === `${index}`
                      ? 'models/vx/49.png'
                      : 'models/vx/48.png'
                  "
                  alt="toggle"
                  @click.stop="toggleCollapse(`${index}`)"
                />
              </div>
            </template>
            <div class="desc">
              {{ item.description }}
            </div>
          </el-collapse-item>
          <div class="border" v-if="activeNames !== `${index}`"></div>
        </div>
      </el-collapse>
    </div>
    <!-- H5 端 -->
    <div class="detail_swiper">
      <MdProgressSwiper :content-data="contentData"/>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useAnimation } from "~/utils/hooks/useAnimation.js";
import { Pagination, Scrollbar } from "swiper/modules";
//轮播图数据
const contentData = ref([
  {
    title: "Integrated cage body 65% high-strength steel body",
    description: "Integrated cage high-performance body, 65% high-strength steel body, comparable to the B-class car high-strength steel proportion, braking, bending, body whole, good control, not loose, no abnormal sound, no deformation.",
    image: "models/lx/39.jpg",
  },
  {
    title: "6 airbags provide comprehensive safety for all passengers in the front and rear seats",
    description: "All-around 6 airbags for safeguarding:airbags at the driver/passenger sides, front side airbags, and extra-long side air curtains.",
    image: "models/lx/40.jpg",
  }
])

// 监听 isVisible 的变化，触发动画
const { targetRef, isVisible } = useAnimation({
  threshold: 0.1,
});
watch(isVisible, (newVal) => {
  if (newVal) {
    targetRef.value.querySelector(".img").classList.add("animate");
    targetRef.value.querySelector(".detail_title").classList.add("animate");
  } else {
    targetRef.value.querySelector(".img").classList.remove("animate");
    targetRef.value.querySelector(".detail_title").classList.remove("animate");
  }
});
// Swiper 模块,进度条宽度
const modules = [Pagination, Scrollbar];
const slidesPerView = ref(1);
const progress = ref(0);
const swiperInstance = ref(null);
const onSwiper = (swiper) => {
  swiperInstance.value = swiper;
  updateProgress(swiper);
};
const onSlideChange = () => {
  if (swiperInstance.value) {
    updateProgress(swiperInstance.value);
  }
};
const updateProgress = (swiper) => {
  const totalSlides = swiper.slides.length;
  const currentIndex = swiper.realIndex + 1;
  progress.value = (currentIndex / totalSlides) * 100;
};

// 当前展开的项,选中图片
const activeNames = ref("0");
const currentImage = computed(() => contentData.value[parseInt(activeNames.value)]?.image || 0);

// 切换折叠项
const toggleCollapse = (name) => {
  activeNames.value = name;
};

</script>

<style lang="scss" scoped>
.detail {
  width: 100vw;
  display: flex;
  opacity: 1;
  background: #131313;
  color: #ffffff;
  padding: 1.6rem 2.18rem 1.6rem 1.6rem;
  .img {
    width: 45vw;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    transform: translateY(1rem);
    opacity: 0;
    transition: all 1s;
    border-radius: 0.1rem;
    &.animate {
      transform: translateY(0rem);
      opacity: 1;
    }
  }
  .detail_title {
    width: 55vw;
    padding-top: 0.2rem;
    background: #131313 !important;
    .desc{
      font-size: 0.16rem;
      line-height: 0.24rem;
      color: #9E9E9E;
    }
  }
}
.detail_swiper {
  display: none;
}
.custom-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

// 颜色变量定义
$background-color: #131313;
$text-color: #ffffff;
$border-color: #4d4d4d;
$font-size-default: 0.18rem;
$font-size-title: 0.28rem;
$font-weight-title: 600;

// 基础样式
::v-deep .el-collapse-item__header,
::v-deep .el-collapse-item__wrap {
  border: none;
  background: $background-color !important;
  color: $text-color !important;
}

::v-deep .el-collapse-item__header {
  margin-bottom: 0.52rem;
}

::v-deep .el-icon svg {
  display: none;
}

::v-deep.el-collapse {
  border-top: none !important;
  border-bottom: none !important;
}

::v-deep .el-collapse-item__content {
  background: $background-color !important;
  color: $text-color !important;
  font-size: $font-size-default;
  margin-bottom: 0.2rem;
  line-height: 0.2rem;
}

.title_01 {
  font-size: $font-size-title;
  font-weight: $font-weight-title;
  line-height: 0.3rem;
  text-align: left;
  color: $text-color;
}

.border,
.border_01 {
  width: 100%;
  border-top: 0.01rem solid $border-color;
  margin-bottom: 0.3rem;
}

.border {
  opacity: 0.3;
}

@media screen and (max-width: 1024px) {
  .detail {
    display: none;
  }
  .detail_swiper {
    display: block;
    height: auto;
    background: #0d0d0d;
    padding-left: 0.2rem;
    padding-right: 0.2rem;
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
    .swiper_img {
      border-radius: 0.06rem;
    }
    .swiper_title01 {
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.24rem;
      color: #ffffff;
      margin-top: 0.2rem;
    }
    .swiper_title02 {
      font-size: 0.14rem;
      line-height: 0.2rem;
      color: #b2b2b2;
      margin-top: 0.12rem;
    }
  }
  .custom-scrollbar {
    width: 100%;
    height: 0.02rem;
    background-color: #e0e0e0;
    margin-top: 10px;
    border-radius: 5px;
    margin-top: 0.84rem;
  }
  .progress {
    height: 100%;
    background-color: #e3bea4;
    border-radius: 5px;
  }
}
</style>
