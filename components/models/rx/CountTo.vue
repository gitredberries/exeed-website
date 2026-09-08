<template>
  <span>{{ animatedValue }}</span>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 2000
  }
});

const animatedValue = ref(0);

const animateValue = () => {
  const start = 0;
  const end = props.value;
  const duration = props.duration;
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    animatedValue.value = Math.floor(progress * (end - start) + start);
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

onMounted(() => {
  animateValue();
});

watch(() => props.value, () => {
  animateValue();
});
</script>
