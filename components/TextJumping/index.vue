<template>
  <div class="text-jumping">
    <div class="text-wrapper" ref="textWrapperRef">
      <div class="text-item" v-for="(item, index) in textArr" :key="index">
        <span>{{ item.join(" ") }}</span>
        <div
          class="mask"
          :style="{
            width:
              index < curIndex ? '0' : index === curIndex ? curWidth : '100%',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { scrollY } = useScroll();
const str =
  "The exploration gene drives us to disrupt the automotive industry and to be a practitioner and leader in forward-looking technology. Our mission is to enable consumers to live a freer, more sustainable and personalised lifestyle";
const strArr = str.split(" ").map((v) => v + " ");

const textWrapperRef = ref(null);

let splitIndexArr = [];

const textArr = ref([]);

// 当前滑动到哪一行
const curIndex = ref(0);
// 当前滑动行的宽度
const curWidth = ref("100%");

// 滑动开始的位置
let startPos = 0;
// 滑动结束的位置
let endPos = 0;

const handleTextArr = () => {
  textArr.value = [];
  let t = 0;
  let arr = [];

  for (let i = 0; i < strArr.length; i++) {
    arr.push(strArr[i]);
    if (i === splitIndexArr[t]) {
      textArr.value.push(arr);
      arr = [];
      t++;
    }
  }
};

// 针对不容分辨率下的文字换行方式做调整
const handleSplitIndexArr = () => {
  let w = window.innerWidth;
  let len = strArr.length - 1;
  startPos = window.innerHeight * 0.6;
  endPos = window.innerHeight * 0.1;
  if (w > 2160) {
    splitIndexArr = [7, 15, 21, 30, len];
  } else if (w >= 860) {
    splitIndexArr = [5, 10, 17, 20, 26, 32, len];
  }  else if(w > 430) {
    startPos = window.innerHeight * 0.8;
    splitIndexArr = [2, 7, 11, 16, 18, 22, 27, 31, len];
  } else {
    startPos = window.innerHeight * 0.8;
    splitIndexArr = [2, 7, 9, 14, 17, 18, 21, 25, 30, 32, len]
  }
};

// 处理遮罩的宽度以及位置
const handleMaskWidth = () => {
  const rect = textWrapperRef.value.getBoundingClientRect();

  if (rect.y < window.innerHeight && rect.y > endPos) {
    let res =
      ((startPos - rect.y) * textArr.value.length) / (startPos - endPos);
    curIndex.value = Math.ceil(res);
    curWidth.value = (curIndex.value - res) * 100 + "%";
  }
};

const handleResize = () => {
  handleSplitIndexArr();
  handleTextArr();
  handleMaskWidth();
};

watch(scrollY, () => {
  handleMaskWidth();
});

onMounted(() => {
  handleSplitIndexArr();
  handleTextArr();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style lang="scss" scoped>
.text-jumping {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  .text-wrapper {
    margin: 1.66rem auto 1.66rem 1.2rem;
    font-size: 0.64rem;
    line-height: 0.9rem;
    text-align: left;
    font-family: "Saira";
    .text-item {
      position: relative;
      color: black;
      white-space: nowrap;
      .mask {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        transition: all 0.1s;
      }
    }
  }
}

@media screen and (max-width: 1040px) {
  .text-jumping {
    .text-wrapper {
      margin: 1.1rem auto 1.79rem 0.2rem;
      font-size: 0.26rem;
      line-height: 0.39rem;
    }
  }
}
</style>
