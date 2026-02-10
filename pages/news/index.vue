<template>
  <div class="news">
    <NewsBanner title="EXEED News" :banner="`url(${config.public.staticURL}/images/news/newsBanner.png)`"/>
    <NewsContent />
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
</script>
<style lang="scss" scoped>
  .news{
    background: #0d0d0d;
  }
</style>
