<template>
  <div :class="['tech-nav-wrapper', props.isActive ? 'active' : '']">
    <div
      class="tech-content"
      v-for="item in navList"
      :key="item.id"
      @click="onTechClick(item)"
    >
      <BaseImg class="tech-img" :src="item.src"/>
      <div class="tech-text-wrapper">
        <div class="title">{{ item.text }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { navData } from './data.js'

const router = useRouter();

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const techList = [
  {
    id: 3,
    src: "common/exeedEvents.png",
    desc: "EXEED Events",
  },
  {
    id: 4,
    src: "common/exlantixEvents.png",
    desc: "EXLANTIX Events",
  },
];

const navList = reactive(techList.map(v => {
  let arr = navData[4]?.children || [];
  let obj = arr.find(s => s.id === v.id) || {};
  v.text = obj.text;
  v.link = obj.link;
  return v;
}));

const closeHeadPop = inject('closeHeadPop');

const onTechClick = (item) => {
  closeHeadPop();
  router.push(`/${item.link}`);
}

</script>
<style lang="scss" scoped>
.tech-nav-wrapper {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  transition: all 1s;
  opacity: 0;
  transform: translateY(1rem);
  .tech-content {
    width: 5.12rem;
    position: relative;
    cursor: pointer;
    margin-right: 0.28rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-size: 140%;
    background-position: center;
    background-repeat: no-repeat;
    transform: translateY(1rem);
    opacity: 0;
    transition: all 1s;
    border-radius: 0.04rem;
    &:nth-of-type(2) {
      background-size: 100%;
    }
    &:nth-of-type(3) {
      background-size: auto 100%;
    }
    .tech-img{
      width: 100%;
      transition: all .5s;
    }
    &:hover{
      .tech-img{
        transform: scale(var(--scale-img));
      }
    }
    .tech-text-wrapper {
      position: absolute;
      padding: 0.32rem 0.4rem;
      width: 100%;
      bottom: 0;
      left: 0;
      .title {
        font-size: 0.2rem;
        line-height: 0.28rem;
        color: white;
        transition: all 1s;
        opacity: 0;
        transform: translateY(1rem);
        text-transform: none;
      }
      .desc {
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: rgba(255, 255, 255, 0.7);
        transition: all 1s;
        opacity: 0;
        transform: translateY(1rem);
      }
    }
  }
}
.tech-nav-wrapper.active {
  opacity: 1;
  transform: translateY(0);
  .tech-content {
    transform: translateY(0);
    opacity: 1;
    &:nth-of-type(2) {
      transition-delay: 0.2s;
    }
    &:nth-of-type(3) {
      transition-delay: 0.4s;
    }
    .tech-text-wrapper {
      .title {
        transition-delay: 0.2s;
        opacity: 1;
        transform: translateY(0);
      }
      .desc {
        transition-delay: 0.4s;
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
}
</style>
