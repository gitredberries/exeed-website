<template>
  <img 
    :src="imgUrl" 
    :loading="props.loading" 
    :alt="props.alt"
    :width="props.width"
    class="select-none"
  />
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{
    src: string;
    loading?: 'lazy' | 'eager';
    alt?: string;
    width?: string | number;
  }>(), {
    src: '',
    loading: 'lazy',
    alt: '',
    width: undefined
  })
  const config = useRuntimeConfig()
  const imgUrl = computed(() => `${config.public.staticURL}/images/${props.src}`)
</script>
<style scoped lang='scss'>

</style>