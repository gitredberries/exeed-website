<template>
  <EtMain
    :bevPerformance="mainData.bevPerformance"
    :reevPerformance="mainData.reevPerformance"
    :title="mainData.title"
    :subtitle="mainData.subtitle"
  />
  <EtPowertrain />
  <EtTerrain />
  <EtSafty />
  <EtDesign />
  <EtSpace />
  <EtColor />
  <EtGallery />
  <Exeed title="EXEED | EXLANTIX IN YOUR COUNTRY" subtitle="Learn more about EXEED EXLANTIX models, products and services" btnText="EXEED | EXLANTIX in your country"/>
</template>
<script setup lang="ts">
import { type PerformanceList } from "@/utils/componentTypes/esTypes";

const mainData: {
  bevPerformance: Array<PerformanceList>;
  reevPerformance: Array<PerformanceList>;
  title: string;
  subtitle: string;
} = {
  title: "REDEFINE ENGINE EMBRACE VOYAGE",
  subtitle: "A super energy SUV",
  reevPerformance: [
    {
      title: "1 liter of fuel converted into electricity",
      src: "model/es/config_icon02.svg",
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
          val: "kWh",
        },
      ],
    },
    {
      title: "Combined range",
      src: "model/es/config_icon05.svg",
      dataList: [
        {
          type: "num",
          val: 1,
        },
        {
          type: "num",
          val: 5,
        },
        {
          type: "num",
          val: 0,
        },
        {
          type: "num",
          val: 0,
        },
        {
          type: "unit",
          val: "km",
        },
      ],
    },
    {
      title: "0-100 km/h acceleration time",
      src: "model/es/config_icon04.svg",
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
          val: 8,
        },
        {
          type: "unit",
          val: "s",
        },
      ],
    },
    
  ],
  bevPerformance: [
    {
      title: "Electricity consumption",
      src: "model/es/config_icon02.svg",
      dataList: [
        {
          type: "num",
          val: 1,
        },
        {
          type: "num",
          val: 9,
        },
        {
          type: "dot",
          val: ".",
        },
        {
          type: "num",
          val: 8,
        },
        {
          type: "unit",
          val: "kWh/100km",
        },
      ],
    },
    {
      title: "WLTP Range",
      src: "model/es/config_icon05.svg",
      dataList: [
        {
          type: "num",
          val: 4,
        },
        {
          type: "num",
          val: 1,
        },
        {
          type: "num",
          val: 0,
        },
        {
          type: "unit",
          val: "km",
        },
      ],
    },
    {
      title: "800 V fast charging SOC 20-80%",
      src: "model/es/config_icon04.svg",
      dataList: [
        {
          type: "num",
          val: 1,
        },
        {
          type: "num",
          val: 0,
        },
        {
          type: "unit",
          val: "min",
        },
      ],
    },
  ],
};
</script>
<style lang="scss" scoped></style>
