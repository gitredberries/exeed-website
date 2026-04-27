<template>
  <div class="news">
    <NewsBanner title="News" :banner="`${config.public.staticURL}/images/news/newsBanner.png`"/>
    <NewsContent category="exeed" detail-route="/news"/>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
</script>

<style lang="scss" scoped>
.news {
  background: #0d0d0d;
}
</style>
