<template>
  <div :class="['interior', props.isActive ? 'active' : '']">
    <div :class="['mask', activeClass]"></div>
    <BaseImg class='interior-bg' :src="props.src" />
    <div class="detail">
      <p class="title" v-html="props.title"></p>
      <p :class="['desc', activeClass]">
        <span>
          {{ props.desc }}
        </span>
      </p>
      <div class="more" @click="onMoreClick">
        <BaseImg :class="['more-arrow', activeClass]" src="model/es/swc_arrow.png" />
        <span>EXPLORE MORE</span>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isActive: Boolean,
  src: String,
  title: String,
  desc: String,
})

const isActive = ref(false);

const activeClass = computed(() => isActive.value ? 'active' : '')

const onMoreClick = () => {
  isActive.value = !isActive.value;
}
</script>
<style lang="scss" scoped>
.interior {
  position: relative;
  transition: all 1s;
  transform: translateY(1rem);
  opacity: 0;
  border-radius: 1rem;
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(37, 41, 51, 0.5);
    opacity: 0;
    transition: all .5s;
  }
  .mask.active{
    opacity: 1;
  }
  .interior-bg {
    object-fit: cover;
    border-radius: 0.08rem;
  }
  .detail{
    color: white;
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 0.4rem 0.2rem;
    z-index: 2;
    .title{
      font-size: 0.32rem;
      line-height: 0.36rem;
      text-transform: none;
      margin-bottom: 0.15rem;
    }
    .desc{
      font-size: 0.16rem;
      line-height: 0.18rem;
      max-height: 0;
      overflow: hidden;
      padding: 0;
      transition: all .5s;
      span{
        padding-bottom: 0.2rem;
      }
    }
    .desc.active{
      max-height: 1.5rem;
    }
    .more{
      display: flex;
      align-items: center;
      font-size: 0.18rem;
      padding-top: 0.05rem;
      cursor: pointer;
      .more-arrow{
        width: 0.15rem;
        transition: all 0.5s;
        flex-shrink: 0;
        flex-grow: 0;
        margin-right: 0.15rem;
        transform: rotateZ(180deg);
      }
      .more-arrow.active{
        transform: rotateZ(0);
      }
    }
  }
}
.interior.active{
  transform: translateY(0);
  opacity: 1;
}
</style>