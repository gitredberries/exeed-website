<template>
  <div class="exlantix-news">
    <NewsBanner title="EXLANTIX News" :banner="`${config.public.staticURL}/images/news/exlantixBanner.png`"/>
    <NewsContent category="exlantix"/>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();
</script>
<style lang="scss" scoped>
.exlantix-news {
  background-color: white;
}
</style>
