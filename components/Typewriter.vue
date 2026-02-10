<template>
  <div class="typewriter">
    <p v-for="(item, index) in textList">
      <span v-for="(v, i) in item" :style="{opacity: countNum(index, i) > count ? 0 : 1}">{{ v }}</span>
    </p>
  </div>
</template>
<script setup>
const count = ref(0);
const props = defineProps({
  textArr: {
    type: Array,
    default: [
      "ABC columns intact Door handle pops open normally Door can bpe opened",
      "No intrusion into the passenger compartment. Airbags ignited normally",
      "Battery not on fire or smoke",
      "Panoramic canopy intact",
    ],
  },
});


const textList = computed(() => {
  return props.textArr.map((item) => item.split(""));
});

let timer = null;

const countNum = (index, i) => {
  let num = 0;
  index--;
  while(index >= 0) {
    num += textList.value[index].length;
    index--;
  }
  return num + i + 1;
}

const resetType = () => {
  count.value = 0;
}

const startType = () => {
  timer && clearInterval(timer);
  let len = 0;
  for(let i = 0; i < textList.value.length; i++) {
    len += textList.value[i].length;
  }
  timer = setInterval(() => {
    count.value++;
    if(count.value >= len) {
      endType();
    }
  }, 30);
}

const endType = () => {
  clearInterval(timer);
  count.value = Infinity;
}

defineExpose({
  startType,
  endType,
  resetType
})
</script>
<style lang="scss" scoped>
.typewriter{
  span{
    opacity: 0;
    transition: all .3s;
  }
}
</style>
