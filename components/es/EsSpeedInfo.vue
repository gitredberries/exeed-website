<template>
  <div :class="['speed-info', props.isActive ? 'active' : '']">
    <BaseImg class="info-icon" :src="`model/es/${props.src}`" />
    <div class="info">
      <p class="title">{{ props.title }}</p>
      <p class="desc">{{ props.desc }}</p>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  isActive: Boolean,
  src: String,
  title: String,
  desc: String
})
</script>
<style lang="scss" scoped>
.speed-info {
  width: 90%;
  display: flex;
  padding-bottom: 0.5rem;

  .info-icon {
    width: 65%;
    transition: all 1s;
    transform: translateY(0.5rem);
    opacity: 0;
  }

  .info {
    padding: 3%;
    color: white;

    .title {
      width: 28vw;
      font-size: 0.42rem;
      line-height: 0.48rem;
      text-transform: none;
      transition: all 1s;
      transform: translateX(1rem);
      opacity: 0;
      font-weight: bold;
    }

    .desc {
      font-size: 0.2rem;
      line-height: 0.28rem;
      margin-top: 0.4rem;
      transition: all 1s;
      transition-delay: .2s;
      transform: translateX(1rem);
      opacity: 0;
    }
  }
}

.speed-info.active {
  .info-icon {
    transform: translateY(0);
    opacity: 1;
  }

  .info {
    .title {
      transform: translateX(0);
      opacity: 1;
    }

    .desc {
      transform: translateX(0);
      opacity: 1;
    }
  }
}
</style>