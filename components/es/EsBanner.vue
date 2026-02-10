<template>
  <div class="banner-wrapper md-banner-wrapper" ref="bannerWrapper">
    <div
      class="banner"
      :style="{
        top: `${disY}px`,
        backgroundImage: `url(${config.public.staticURL}/images/model/es/kv.jpg)`
      }"
    ></div>
    <div
      class="banner md-banner"
      :style="{
        top: `${disY}px`,
        backgroundImage: `url(${config.public.staticURL}/images/model/es/mb_kv.jpg)`
      }"
    ></div>
    <span class="title">{{ props.title }}</span>
    <span class="sub-title">{{ props.subtitle }}</span>
    <div class="title_Jump">
      <PonoraMic sign="es"/>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: string;
    subtitle: string;
  }>(),
  {
    title: '',
    subtitle: ''
  }
);

const config = useRuntimeConfig();

const { scrollY } = useScroll();
// banner图与屏幕顶部的距离
const disY = ref<number>(0);
const bannerWrapper = ref<HTMLDivElement | null>();

let bannerWrapperRect: {
  height: number
} | undefined = {
  height: 0,
};

onMounted(() => {
  // 获取banner图的高度
  bannerWrapperRect = bannerWrapper.value?.getBoundingClientRect();
});

// 根据页面滑动的距离确定banner背景图的top值
watch(scrollY, (newVal: number) => {
  if (window.screen.width <= 1024) {
    return;
  }
  if (newVal <= 0) {
    disY.value = 0;
  } else if (newVal < bannerWrapperRect!.height) {
    disY.value = newVal / 2;
  } else {
    disY.value = bannerWrapperRect!.height / 2;
  }
});
</script>
<style scoped lang="scss">
@import url("./css/banner.scss");
@keyframes bannerIn {
  from {
    transform: scale(1.2);
  }

  to {
    transform: scale(1);
  }
}

@keyframes titleIn {
  from {
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes subTitleIn {
  from {
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes btnIn {
  from {
    transform: translateY(1rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.banner-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
  height: 100vh;
  background: black;

  .banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(1.2);
    animation: bannerIn 1s ease-out forwards;
    animation-delay: 0.8s;
    z-index: 1;
  }
  .md-banner{
    display: none;
  }
  span {
    color: white;
    position: absolute;
    left: 1.2rem;
    z-index: 2;
  }

  .title {
    font-size: 0.52rem;
    bottom: 1.32rem;
    opacity: 0;
    animation: titleIn 0.8s ease-out forwards;
    animation-delay: 1.2s;
    font-weight: bold;
  }

  .sub-title {
    font-size: 0.24rem;
    bottom: 0.8rem;
    opacity: 0;
    animation: subTitleIn 0.5s ease-out forwards;
    animation-delay: 1.4s;
    letter-spacing: 0.1rem;
  }
  .title_Jump{
    opacity: 0;
    animation: btnIn 0.5s ease-out forwards;
    animation-delay: 1.6s;
    display: none;
  }
}
</style>
