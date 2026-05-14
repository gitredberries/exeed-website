<template>
  <div class="news">
    <NewsBanner title="News" :banner="`${config.public.staticURL}/images/news/newsBanner.png`"/>
    <NewsContent category="exeed" detail-route="/news"/>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

useHead({
  title: 'Newsroom | EXEED Bahrain',
  meta: [
    { name: 'description', content: 'Stay updated with EXEED Bahrain news, latest launches, events, and brand updates.' }
  ]
});
</script>

<style lang="scss" scoped>
.news {
  background: #0d0d0d;
}
</style>
