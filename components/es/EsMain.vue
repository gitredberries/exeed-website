<template>
  <div
    :class="['main-wrapper md-main-wrapper', isActive ? 'active' : '']"
    ref="mainRef"
  >
    <BaseImg class="md-bg" src="model/es/pic01_mb.jpg"/>
    <BaseImg class="bg" src="model/es/main_bg.jpg"/>
    <div class="config-main-title" v-html="props.title" ref="titleRef"></div>
    <div class="usi-change-tab" ref="tabRef">
      <div
        :class="['tab-txt', bevActive && 'active']"
        @click="onTabClick(true)"
      >
        <BaseImg class="car-logo" src="model/es/car_tab.png" />
        <span>BEV</span>
      </div>
      <div
        :class="['tab-txt', !bevActive && 'active']"
        @click="onTabClick(false)"
      >
        <BaseImg class="car-logo" src="model/es/car_tab.png" />
        <span>REEV</span>
      </div>
    </div>
    <div :class="['config-main-num', bevActive && 'active']">
      <div
        class="cmn-min"
        v-for="item in props.bevPerformance"
        :key="item.title"
      >
        <div class="cmn-min-t">{{ item.title }}</div>
        <div class="cmn-min-i">
          <BaseImg class="config-logo" :src="item.src" />
          <div class="cmn-min-num">
            <template v-for="i in item.dataList">
              <DigitString
                v-if="i.type === 'num'"
                :moveSwitch="moveSwitch"
                :num="i.val as number"
              />
              <span v-if="i.type === 'dot'" class="dot">.</span>
              <span v-if="i.type === 'unit'" class="unit">{{ i.val }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div :class="['config-main-num', !bevActive && 'active']">
      <div
        class="cmn-min"
        v-for="item in props.reevPerformance"
        :key="item.title"
      >
        <div class="cmn-min-t">{{ item.title }}</div>
        <div class="cmn-min-i">
          <BaseImg class="config-logo" :src="item.src" />
          <div class="cmn-min-num">
            <template v-for="i in item.dataList">
              <DigitString
                v-if="i.type === 'num'"
                :moveSwitch="moveSwitch"
                :num="i.val as number"
              />
              <span v-if="i.type === 'dot'" class="dot">.</span>
              <span v-if="i.type === 'unit'" class="unit">{{ i.val }}</span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { calcSrollDis } from "@/utils/common/index";
import { type PerformanceList } from "@/utils/componentTypes/esTypes";

const props = withDefaults(
  defineProps<{
    bevPerformance: Array<PerformanceList>;
    reevPerformance: Array<PerformanceList>;
    title: string;
  }>(),
  {
    bevPerformance: () => [],
    reevPerformance: () => [],
    title: "",
  }
);

const tabRef = ref();
const titleRef = ref();

const bevActive = ref(true);
const moveSwitch = ref(0);
const mainRef = ref();
const isActive = ref(false);

onMounted(() => {
  
});

calcSrollDis(
  mainRef,
  [
    {
      dom: mainRef,
      percent: 0.3,
      active: isActive,
    },
  ],
  {
    dom: mainRef,
    percent: 0.8,
    active: moveSwitch,
  }
);

const onTabClick = (bool: boolean) => {
  bevActive.value = bool;
  moveSwitch.value = moveSwitch.value + 1;
};
</script>
<style lang="scss" scoped>
@import url(./css/main.scss);
.main-wrapper {
  width: 100%;
  position: relative;
  height: 100vh;
  background-size: cover;
  z-index: 1;
  overflow: hidden;
  .bg{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .md-bg{
    display: none;
  }

  .config-main-title {
    position: absolute;
    left: 1.2rem;
    top: 1.2rem;
    font-size: 0.52rem;
    color: white;
    display: flex;
    flex-direction: column;
    line-height: 0.65rem;
    transition: 1.2s ease-out;
    transform: translateY(1rem);
    opacity: 0;
  }

  .usi-change-tab {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    z-index: 5;
    display: flex;
    transform: translateY(1rem);
    opacity: 0;
    transition: all 1.2s;

    .tab-txt {
      width: 2.2rem;
      height: 0.57rem;
      font-size: 0.18rem;
      text-align: center;
      line-height: 0.6rem;
      position: relative;
      transition: all 0.5s;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 1px solid #5da9ad;

      .car-logo {
        width: 0.84rem;
        display: none;
      }

      span {
        display: block;
        position: relative;
        z-index: 2;
        color: #5da9ad;
      }
    }

    .tab-txt.active {
      background-color: #000;
      border: 1px solid #3aaeb0;

      .car-logo {
        display: inline-block;
      }

      span {
        color: white;
      }
    }
  }

  .config-main-num {
    position: absolute;
    width: calc(100% - 1.7rem);
    left: 1rem;
    bottom: 0rem;
    opacity: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;

    .cmn-min {
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .cmn-min-t {
        font-size: 0.24rem;
        line-height: 0.24rem;
        opacity: 0.7;
      }

      .cmn-min-i {
        display: flex;
        align-items: flex-end;
        margin-top: 0.8rem;

        .config-logo {
          width: 0.42rem;
          margin-bottom: 0.05rem;
        }

        .cmn-min-num {
          margin-left: 0.1rem;
          height: 0.52rem;
          overflow: hidden;
          display: flex;
          font-size: 0.52rem;
          font-weight: bold;
          align-items: flex-end;
          line-height: 0.52rem;

          .dot {
            line-height: 0.52rem;
            padding: 0 0.05rem;
          }

          .unit {
            margin-left: 0.1rem;
            line-height: 0.52rem;
          }
        }
      }
    }
  }
}

.main-wrapper.active {
  .config-main-title {
    transform: translateY(0);
    opacity: 1;
  }
  .usi-change-tab {
    transform: translateY(0);
    opacity: 1;
  }
}

.config-main-num.active {
  bottom: 0.8rem;
  opacity: 1;
  transition: all 1s;
}
</style>
