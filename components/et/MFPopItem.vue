<template>
  <div class="mf-pop-content md-mf-pop-content">
    <div class="mf-pop-img-wrapper">
      <BaseImg class="mf-pop-img" :src="`model/et/${props.info.src}`" />
    </div>
    <div class="mf-pop-list">
      <div class="mf-pop-title">
        {{ props.info.title }}
      </div>
      <div class="mf-pop-subtitle" :style="{color: props.color}" v-html="props.info.subtitle">
      </div>
      <div class="mf-pop-desc" :style="{color: props.color}">
        {{ props.info.desc }}
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: {
      src: '',
      title: '',
      subtitle: '',
      desc: ''
    }
  },
  color: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
@import url(./css/popItem.scss);
.mf-pop-content {
  width: 100%;
  background-color: white;

  .mf-pop-img-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: calc(48vh + 0.72rem);

    .mf-pop-img {
      width: 100%;
      height: 48vh;
      object-fit: cover;
    }
  }

  .mf-pop-list {
    padding: 0.4rem 0.5rem;

    .mf-pop-title {
      font-size: 0.22rem;
      font-weight: 300;
      color: #3aaeb0;
    }

    .mf-pop-subtitle {
      font-size: 0.32rem;
      line-height: 0.32rem;
      margin-top: 0.2rem;
      font-weight: bold;
      color: #333;
    }

    .mf-pop-desc {
      font-size: 0.2rem;
      line-height: 0.25rem;
      margin-top: 0.2rem;
    }
  }
}
</style>