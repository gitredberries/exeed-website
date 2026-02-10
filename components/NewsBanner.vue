<template>
  <div
    class="banner-wrapper md-banner-wrapper"
    :style="{
      backgroundImage: props.banner,
    }"
  >
    <div class="cover">
      <span>{{ props.title }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  banner: {
    type: String,
    default: "",
  }
});
</script>
<style lang="scss" scoped>
@import url("./css/newsBanner.scss");
.banner-wrapper {
  width: 100%;
  height: 3.8rem;
  margin-top: 0.72rem;
  background-position: center 40%;
  background-repeat: no-repeat;
  background-size: 100%;
  position: relative;
  .cover {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 0.52rem;
    font-weight: 600;
    line-height: 0.6rem;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
}
</style>
