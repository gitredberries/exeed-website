  <!-- 组件参数说明
      imageSrc:图片路径
      title:标题
      routePath:跳转路径
      enableHover:是否启用hover效果
      textPosition:文字位置

      示例：
      <CarItem imageSrc="home/page3-1.png" title="REEV" routePath="/techReev" :enableHover="true"
            :textPosition="{ bottom: '0.37rem', left: '50%', transform: 'translateX(-50%)' }" />
   -->

<template>
  <div class="item" style="position: relative">
    <div class="image-wrapper">
      <BaseImg :src="imageSrc" alt="" width="100%" :class="{ 'zoom-image': enableHover }"  :style="{aspectRatio: aspectRatio || 'auto'}"/>
    </div>
    <div ref="textContainer" class="text-container" :style="textPosition" :class="{ 'show-text': textVisible }">
      <div class="page2-title main-title">
        <span>{{ title }}</span>
        <BaseImg v-if="isFlash" src="common/flash_blue.svg"/>
      </div>
      <div class="page2-title sub-title">{{ subtitle || '' }}</div>
      <div class="button-container">
        <div type="text" class="explore-button" @click="navigateToRoute">
          <span>EXPLORE MORE</span>
          <BaseImg src="common/right_arrow_light.svg"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: false,
    },
    routePath: {
      type: String,
      required: true,
    },
    textPosition: {
      type: Object,
      default: () => ({
        top: "0.7rem",
        margin: "0 auto",
        // left: "50%",
        // transform: "translateX(-50%)",
      }),
    },
    enableHover: {
      type: Boolean,
      default: true,
    },
    isFlash: {
      type: Boolean,
      default: false,
    },
    aspectRatio: {
      type: String || Number,
      default: 'auto',
    }
  },
  data() {
    return {
      textVisible: false, // 控制文字出现
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    navigateToRoute() {
      this.$router.push(this.routePath);
    },
    handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const elementPosition = this.$refs.textContainer.getBoundingClientRect().top + scrollY;
    const windowHeight = window.innerHeight;

    // 当元素进入视口时，显示文字
    if (scrollY + windowHeight > elementPosition) {
      this.textVisible = true;
    }
  },
  },
  beforeDestroy() {
  window.removeEventListener('scroll', this.handleScroll);
}
};
</script>

<style scoped>
.image-wrapper {
  overflow: hidden;
  width: 100%;
}

.zoom-image {
  transition: transform 0.3s ease-in-out;
}

.item:hover .zoom-image {
  transform: scale(1.2);
}

.text-container {
  position: absolute;
  text-align: center;
  opacity: 0;
  transform: translateY(0.4rem);
  transition: all 1.5s ease;
}

.show-text {
  opacity: 1;
  transform: translateY(0);
  @media screen and (max-width: 1024px) {
    padding: 0 0.2rem;
    text-align: left;
  }
}


.main-title {
  font-family: "SairaExpanded";
  font-size: 0.4rem;
  font-weight: 500;
  line-height: 0.48rem;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  img{
    margin-left: 0.08rem;
    width: 0.14rem;
  }
}

.sub-title {
  margin-top: 0.08rem;
  font-family: "Saira";
  font-size: 0.16rem;
  font-weight: normal;
  line-height: 0.24rem;
  color: #ffffff;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.2rem;
  @media screen and (max-width: 1024px) {
    justify-content: flex-start;
  }
}

@media screen and (max-width: 1024px) {
  .page2-title{
    font-size: 0.26rem;
    line-height: 0.3rem;
    justify-content: flex-start;
  }
  .sub-title{
    font-size: 0.14rem;
    line-height: 0.2rem;
  }
}

.explore-button {
  opacity: 0.7;
  font-size: 0.14rem;
  white-space: nowrap;
  display: flex;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.7);
  img{
    margin-left: 0.08rem;
    width: 0.16rem;
  }
}
</style>
