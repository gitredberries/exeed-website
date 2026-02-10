<template>
  <div
    :class="['main-wrapper md-main-wrapper', isActive ? 'active' : '']"
    ref="mainRef"
  >
    <!-- <div class="bg" :style="{backgroundImage: `url(${config.public.staticURL}/images/model/et/pic01.png)`}"></div>
    <div class="bg md-bg" :style="{backgroundImage: `url(${config.public.staticURL}/images/model/et/pic01_mb.png)`}"></div> -->
    <BaseImg class="bg" src="model/et/pic01.png"/>
    <BaseImg class="bg md-bg" src="model/et/pic01_mb.png"/>
    <div class="config-main-title" v-html="props.title"></div>
    <div class="config-main-subtitle">{{ props.subtitle }}</div>
    <div class="usi-change-tab">
      <div
        :class="['tab-txt', bevActive && 'active']"
        @click="onTabClick(true)"
      >
        <span>REEV</span>
      </div>
      <div
        :class="['tab-txt', !bevActive && 'active']"
        @click="onTabClick(false)"
      >
        <span>BEV</span>
      </div>
    </div>
    <div class="cover"></div>
    <div :class="['config-main-num', bevActive && 'active']">
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
    <div :class="['config-main-num', !bevActive && 'active']">
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
  </div>
</template>
<script lang="ts" setup>
import { calcSrollDis, isMobileDevice } from "@/utils/common/index";
import { type PerformanceList } from "@/utils/componentTypes/esTypes";

const props = withDefaults(
  defineProps<{
    bevPerformance: Array<PerformanceList>;
    reevPerformance: Array<PerformanceList>;
    title: string;
    subtitle: string;
  }>(),
  {
    bevPerformance: () => [],
    reevPerformance: () => [],
    title: "",
    subtitle: "",
  }
);

const config = useRuntimeConfig()

const bevActive = ref(true);
const moveSwitch = ref(-1);
const mainRef = ref();
const isActive = ref(false);

const onTabClick = (bool: boolean) => {
  bevActive.value = bool;
  moveSwitch.value = moveSwitch.value + 1;
};

const basicSize = ref(0);
const digLineHeight = ref(0);

onMounted(() => {
  if (isMobileDevice()) {
    basicSize.value = 0.26;
    digLineHeight.value = 0.36;
  } else {
    basicSize.value = 0.52;
    digLineHeight.value = 0.6;
  }
});

calcSrollDis(
  mainRef,
  [
    {
      dom: mainRef,
      percent: 0.2,
      active: isActive,
    },
  ],
  {
    dom: mainRef,
    percent: 0.2,
    active: moveSwitch,
  }
);
</script>
<style lang="scss" scoped>
@import url(./css/main.scss);
.main-wrapper {
  width: 100%;
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
  background: black;

  .swiper-wrapper{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
  }

  .md-bg{
    display: none;
  }

  .config-main-title {
    position: absolute;
    left: 1.2rem;
    top: 2.5rem;
    font-size: 0.52rem;
    color: white;
    display: flex;
    flex-direction: column;
    line-height: 0.65rem;
    transition: 1.2s ease-out;
    transform: translateY(1rem);
    opacity: 0;
  }
  .config-main-subtitle {
    position: absolute;
    left: 1.2rem;
    top: 3.22rem;
    font-size: 0.16rem;
    color: white;
    line-height: 0.24rem;
    transition: 1.2s ease-out;
    transform: translateY(1rem);
    opacity: 0;
  }

  .usi-change-tab {
    position: absolute;
    top: 1.86rem;
    left: 1.2rem;
    z-index: 5;
    display: flex;
    transform: translateY(1rem);
    opacity: 0;
    transition: all 1.2s;

    .tab-txt {
      width: 1.06rem;
      height: 0.4rem;
      position: relative;
      transition: all 0.5s;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 1px solid white;

      span {
        display: block;
        position: relative;
        z-index: 2;
        color: white;
        font-size: 0.14rem;
        line-height: 0.22rem;
      }
    }

    .tab-txt.active {
      background-color: white;
      border: 1px solid white;

      .car-logo {
        display: inline-block;
      }

      span {
        color: #26b7bc;
      }
    }
  }

  .cover {
    width: 100%;
    height: 3.98rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 75%
    );
  }

  .config-main-num {
    position: absolute;
    width: calc(100% - 1.7rem);
    left: 1rem;
    bottom: 1rem;
    opacity: 0;
    color: #fff;
    display: flex;
    justify-content: space-between;
    transform: translateY(1rem);

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
        align-items: center;
        margin-top: 0.4rem;

        .config-logo {
          width: 0.42rem;
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
  .config-main-subtitle {
    transform: translateY(0);
    opacity: 1;
  }
  .usi-change-tab {
    transform: translateY(0);
    opacity: 1;
  }
}

.config-main-num.active {
  opacity: 1;
  transform: translateY(0);
  transition: all 1s;
}
</style>
