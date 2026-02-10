<template>
  <NuxtLayout name="base">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
  useHead({
    script: [
      {
        src: `${config.public.staticURL}/js/rem.js`
      },
      {
        src: `${config.public.staticURL}/unity/Build/176bf31ca822030de99b3bdb0806f4b4.loader.js`
      },
      {
        src: `${config.public.staticURL}/js/jquery.min.js`
      }
    ]
  })

  const nuxtApp = useNuxtApp();
  nuxtApp.hook("page:finish", () => {
    process.client && window.scrollTo(0, 0)
  });
</script>