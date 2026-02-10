<template>
  <div class="text-jumping" ref="textJumpingRef">
    <div class="text-jump-bg">
      <BaseImg
        src="explorationImage/explorationTwo.png"
        class="bg-img bg-pc"
        alt=""
      />
      <BaseImg
        src="explorationImage/explorationTwoMobile.jpg"
        alt=""
        class="bg-img bg-md"
      />
    </div>
    <div class="text-jump-content" ref="textJumpingContentRef">
      <span
        v-for="(item, index) in strArr"
        :class="currentNumber > index ? 'active' : ''"
        :key="index"
        >{{ item }}</span
      >
    </div>
    <div class="title-wrapper" ref="titleRef">
      <div class="first-title" ref="firstTitleRef">
        <span
          v-for="(item, index) in firstTitleArr"
          :class="firstCurrentNumber > index ? 'active' : ''"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="second-title" ref="secondTitleRef">
        <span
          v-for="(item, index) in secondTitleArr"
          :class="secondCurrentNumber > index ? 'active' : ''"
          :key="index"
          >{{ item }}</span
        >
      </div>
      <div class="third-title" ref="thirdTitleRef">
        <span
          v-for="(item, index) in thirdTitleArr"
          :class="thirdCurrentNumber > index ? 'active' : ''"
          :key="index"
          >{{ item }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const { scrollY } = useScroll();
const str =
  "The exploration gene drives us to disrupt the automotive industry and to be a practitioner and leader in forward-looking technology. Our mission is to enable consumers to live a freer, more sustainable and personalised lifestyle";
const strArr = str.split(" ").map((item) => item + " ");

const firstTitleStr = "Brand Concept:Born For More";
const secondTitleStr =
  "The Spirit of Exploration is in the DNA of the EXEED brand";
const thirdTitleStr =
  "High-end art is the means by which the EXEED brand expresses its concept";

const firstTitleArr = firstTitleStr.split(" ").map((item) => item + " ");
const secondTitleArr = secondTitleStr.split(" ").map((item) => item + " ");
const thirdTitleArr = thirdTitleStr.split(" ").map((item) => item + " ");

const firstTitleRef = ref(null);
const secondTitleRef = ref(null);
const thirdTitleRef = ref(null);

const textJumpingRef = ref(null);

const textJumpingContentRef = ref(null);

const titleRef = ref(null);

let endPos = 0;
let startPos = 0;
let per = 0;
const currentNumber = ref(0);

let firstStartPos = 0;
let firstEndPos = 0;
let firstPer = 0;
let firstCurrentNumber = ref(0);

let secondStartPos = 0;
let secondEndPos = 0;
let secondPer = 0;
let secondCurrentNumber = ref(0);

let thirdStartPos = 0;
let thirdEndPos = 0;
let thirdPer = 0;
let thirdCurrentNumber = ref(0);

onMounted(() => {
  const textJumpingContentRect =
    textJumpingContentRef.value?.getBoundingClientRect() || {};

  // 动画结束需要滑动的距离
  endPos = textJumpingContentRef.value.offsetTop * 1;
  // 从什么位置开始动画
  startPos = window.innerHeight - textJumpingContentRect.height * 0.5;
  per = startPos - endPos;

  firstStartPos = endPos;
  firstEndPos = firstStartPos - (per / strArr.length) * firstTitleArr.length;
  firstPer = firstStartPos - firstEndPos;

  secondStartPos = firstEndPos;
  secondEndPos = secondStartPos - (per / strArr.length) * secondTitleArr.length;
  secondPer = secondStartPos - secondEndPos;

  thirdStartPos = secondEndPos;
  thirdEndPos = thirdStartPos - (per / strArr.length) * thirdTitleArr.length;
  thirdPer = thirdStartPos - thirdEndPos;
});

watch(scrollY, () => {
  const textJumpingContentRect =
    textJumpingContentRef.value?.getBoundingClientRect() || {};

  if (
    textJumpingContentRect.y <= window.innerHeight &&
    textJumpingContentRect.y >= -window.innerHeight
  ) {
    currentNumber.value =
      ((startPos - textJumpingContentRect.y) / per) * strArr.length;
    firstCurrentNumber.value =
      ((firstStartPos - textJumpingContentRect.y) / firstPer) *
      firstTitleArr.length;
    secondCurrentNumber.value =
      ((secondStartPos - textJumpingContentRect.y) / secondPer) *
      secondTitleArr.length;
    thirdCurrentNumber.value =
      ((thirdStartPos - textJumpingContentRect.y) / thirdPer) *
      thirdTitleArr.length;
  }
});
</script>

<style lang="scss" scoped>
.text-jumping {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  .text-jump-bg {
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    z-index: -1;
    .bg-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .bg-pc {
      display: block;
    }
    .bg-md {
      display: none;
    }
  }
  .text-jump-content {
    margin: 2rem 2rem 0 2rem;
    text-align: center;
    font-size: 0.52rem;
    line-height: 0.72rem;
    font-family: "SairaExpanded";
    span {
      color: white;
      opacity: 0.5;
      transition: all 0.5s;
    }
    .active {
      color: #26b7bc;
      opacity: 1;
    }
  }
  .title-wrapper {
    margin-top: 1.44rem;
    font-size: 0.2rem;
    color: white;
    line-height: 0.28rem;
    text-align: center;
    span {
      opacity: 0.5;
      transition: all 0.5s;
    }
    .first-title {
    }
    .second-title {
      margin-top: 0.2rem;
    }
    .third-title {
      margin-top: 0.08rem;
    }
    .active {
      color: #26b7bc;
      opacity: 1;
    }
  }
}
@media screen and (max-width: 1024px) {
  .text-jumping {
    .text-jump-bg {
      .bg-pc {
        display: none;
      }
      .bg-md {
        display: block;
      }
    }
    .text-jump-content {
      margin: 0.8rem 0.4rem 0 0.4rem;
      font-size: 0.26rem;
      line-height: 0.39rem;
    }
    .title-wrapper {
      margin-top: 0.8rem;
      font-size: 0.14rem;
      line-height: 0.2rem;
      text-align: center;
      .second-title {
        margin-top: 0.08rem;
      }
      .third-title {
        margin-top: 0.08rem;
      }
    }
  }
}
</style>
