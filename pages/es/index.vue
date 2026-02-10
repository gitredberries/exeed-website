<template>
  <div>
    <EsBanner
      :title="bannerData.title"
      :subtitle="bannerData.subtitle"
    />
    <EsMain :bevPerformance="mainData.bevPerformance" :reevPerformance="mainData.reevPerformance" :title="mainData.title"/>
    <EsFavorite />
    <EsSpace />
    <EsSpeed />
    <EsIntelligence />
    <EsColor />
    <EsGallery />
    <Exeed />
  </div>
</template>
<script lang="ts" setup>
import {
  type PerformanceList,
} from "@/utils/componentTypes/esTypes";

// 页面首屏banner的数据
const bannerData: {
  title: string;
  subtitle: string;
} = {
  title: "CONTROL YOUR FURIOUS JOURNEY",
  subtitle: "EXLANTIX ES"
};

const mainData: {
  bevPerformance: Array<PerformanceList>;
  reevPerformance: Array<PerformanceList>;
  title: string;
} = {
  title: 'A high-performance <br />electric car<br />with strong interactivity',
  bevPerformance: [
    {
      title: "0-100 kph acceleration time",
      src: "model/es/config_icon01.svg",
      dataList: [
        {
          type: "num",
          val: 3,
        },
        {
          type: "dot",
          val: ".",
        },
        {
          type: "num",
          val: 7,
        },
        {
          type: "unit",
          val: "s",
        },
      ],
    },
    {
      title: "Peak power",
      src: "model/es/config_icon02.svg",
      dataList: [
        {
          type: "num",
          val: 3,
        },
        {
          type: "num",
          val: 5,
        },
        {
          type: "num",
          val: 3,
        },
        {
          type: "unit",
          val: "kW",
        },
      ],
    },
    {
      title: "Minimum braking distance",
      src: "model/es/config_icon03.svg",
      dataList: [
        {
          type: "num",
          val: 3,
        },
        {
          type: "num",
          val: 3,
        },
        {
          type: "dot",
          val: ".",
        },
        {
          type: "num",
          val: 1,
        },
        {
          type: "unit",
          val: "m",
        },
      ],
    },
    {
      title: "800v fast charging range 120km",
      src: "model/es/config_icon04.svg",
      dataList: [
        {
          type: "num",
          val: 5,
        },
        {
          type: "unit",
          val: "min",
        },
      ],
    },
  ],
  reevPerformance: [
    {
      title: "0-100 kph acceleration time",
      src: "model/es/config_icon01.svg",
      dataList: [
        {
          type: "num",
          val: 4,
        },
        {
          type: "dot",
          val: ".",
        },
        {
          type: "num",
          val: 9,
        },
        {
          type: "unit",
          val: "s",
        },
      ],
    },
    {
      title: "WLTP range",
      src: "model/es/config_icon05.svg",
      dataList: [
        {
          type: "num",
          val: 1,
        },
        {
          type: "num",
          val: 2,
        },
        {
          type: "num",
          val: 3,
        },
        {
          type: "num",
          val: 1,
        },
        {
          type: "unit",
          val: "km",
        },
      ],
    },
    {
      title: "Minimum braking distance",
      src: "model/es/config_icon03.svg",
      dataList: [
        {
          type: "num",
          val: 3,
        },
        {
          type: "num",
          val: 3,
        },
        {
          type: "dot",
          val: ".",
        },
        {
          type: "num",
          val: 1,
        },
        {
          type: "unit",
          val: "m",
        },
      ],
    },
    {
      title: "WLTC consumption",
      src: "model/es/config_icon06.svg",
      dataList: [
        {
          type: "num",
          val: 6,
        },
        {
          type: "dot",
          val: ".",
        },
        {
          type: "num",
          val: 3,
        },
        {
          type: "unit",
          val: "L/100km",
        },
      ],
    },
  ],
};
</script>
<style scoped lang="scss"></style>
