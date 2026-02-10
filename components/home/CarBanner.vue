<template>
  <div class="car-banner pt-[2.15rem] pb-[1.81rem] bg-white">
    <ClientOnly>
      <!-- tab list -->
      <div class="element w-full overflow-x-auto overflow-y-hidden px-[0.32rem] text-[0.32rem] lg:w-auto lg:text-[20px]">
        <div class="tab-list w-fit lg:w-full
          text-[#999] font-miRegular cursor-pointer duration-300
          flex justify-center items-center gap-x-[0.56rem] lg:gap-x-[0.85rem]">
          <div class="tab-item text-nowrap"
            :class="{'text-[#222]': activeType === item.carType}"
            v-for="(item, idx) in tabList"
            :key="item.name"
            @click="changeType(item.carType, idx)"
          >{{ item.name }}</div>
        </div>
      </div>
      <!-- swiper -->
      <swiper-container
        ref="carSwiperRef"
        class="w-full mx-auto mt-[1.56rem] car-type-swiper swiper-no-swiping"
        loop
        @swiperinit="handleInit"
      >
        <!-- 车型 icon -->
        <BaseImg 
          slot="container-start" 
          class="absolute top-[-0.28rem] left-[0.3rem] w-[2.45rem] 
            lg:left-[3.22rem] lg:top-[-0.146rem]  lg:w-[4.71rem]" 
          :src="activeIcon" 
        />
        <!-- slides -->
        <swiper-slide
          v-for="slide in carList"
          :key="slide.carType"
          class="text-center"
        > 
          <div
            v-if="!isMobile"
            class="w-[14.38rem] h-[4.33rem] text-center mx-auto">
            <BaseImg 
              v-if="slide.carType !== 'j8'" 
              :src="slide.imgUrl" 
              class="h-[4.32rem] mx-auto" 
            />
            <HomeCarTrigger v-else class="h-full" />
          </div>
          <div
            v-else
            class="w-full"
          >
            <BaseImg 
              :src="slide.imgUrl" 
              class="w-full" 
            />
          </div>
        </swiper-slide>
        <!-- slide button -->
        <template v-if="!isMobile">
          <BaseImg
            @click="slideTo('prev')"
            slot="container-end"
            src="common/arrow_left.svg"
            class="absolute cursor-pointer top-1/2 -translate-y-1/2 left-[1rem] z-20" />
          <BaseImg
            @click="slideTo('next')"
            slot="container-end"
            src="common/arrow_right.svg"
            class="absolute cursor-pointer top-1/2 -translate-y-1/2 right-[1rem] z-20" />
        </template>
      </swiper-container>
      <!-- car config number -->
      <div 
        class="mt-[2.56rem] px-[0.95rem] w-full min-h-2 relative
          lg:mt-[1.06rem] lg:mx-auto lg:w-auto lg:px-0
          flex justify-center items-center flex-col lg:flex-row">
        <div
        class="flex justify-center w-full flex-wrap gap-y-[0.48rem] lg:w-auto">

        <div 
            v-if="flag"
            class="count-item text-center 
              w-1/2
              lg:w-[2.8rem] 
              lg:border-r-[0.5px] border-solid border-[#999] last:border-none" 
            v-for="config in activeConfigList"
            :key="config.value">
            <CountTo 
              ref="countToRef"
              class="inline-block"
              :value="config.value"
              :label="config.label"
              :unit="config.unit"
            />
          </div>
          
        </div>
        <!-- learn more -->
        <BaseButton class="mt-[0.73rem] lg:ml-[0.8rem] lg:mt-0">Learn More</BaseButton>
        <!-- mb swiper切换按钮 -->
        <template v-if="isMobile">
          <BaseImg
            @click="slideTo('prev')"
            slot="container-end"
            src="common/arrow_left.svg"
            class="absolute w-[0.48rem] cursor-pointer bottom-[0.085rem] left-[0.75rem] z-20" />
          <BaseImg
            @click="slideTo('next')"
            slot="container-end"
            src="common/arrow_right.svg"
            class="absolute w-[0.48rem] cursor-pointer bottom-[0.085rem] right-[0.75rem] z-20" />
        </template>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
  import { type Swiper } from 'swiper';
  import type CountTo from '../CountTo.vue';

  const { isMobile } = useDeviceType();
  
  const carList = [
    {
      name: 'OMODA C5',
      carType: 'c5',
      iconUrl: 'index/icon_c5.png',
      imgUrl: 'index/banner2_c5.png',
      configList: [
        {
          label: 'POWER',
          value: '145',
          unit: 'KW'
        },
        {
          label: 'TORQUE',
          value: '290',
          unit: 'N/m'
        },
        {
          label: 'WHEELBASE',
          value: '2672',
          unit: 'mm'
        },
        {
          label: 'GROUND CLEARANCE',
          value: '200',
          unit: 'mm'
        },
      ]
    },
    {
      name: 'OMODA E5',
      carType: 'e5',
      iconUrl: 'index/icon_e5.png',
      imgUrl: 'index/banner2_e5.png',
      configList: [
        {
          label: 'POWER',
          value: '145',
          unit: 'KW'
        },
        {
          label: 'TORQUE',
          value: '290',
          unit: 'N/m'
        },
        {
          label: 'WHEELBASE',
          value: '2672',
          unit: 'mm'
        },
        {
          label: 'GROUND CLEARANCE',
          value: '200',
          unit: 'mm'
        },
      ]
    },
    {
      name: 'JAECOO J7',
      carType: 'j7',
      iconUrl: 'index/icon_j7.png',
      imgUrl: 'index/banner2_j7.png',
      configList: [
        {
          label: 'POWER',
          value: '145',
          unit: 'KW'
        },
        {
          label: 'TORQUE',
          value: '290',
          unit: 'N/m'
        },
        {
          label: 'WHEELBASE',
          value: '2672',
          unit: 'mm'
        },
        {
          label: 'GROUND CLEARANCE',
          value: '200',
          unit: 'mm'
        },
      ]
    }
  ]

  const tabList = computed(() => carList.map(({ carType, name }) => ({ carType, name })));
  const activeType = ref('c5');

  const activeIcon = computed(() => {
    const findItem = carList.find(item => item.carType === activeType.value);
    return findItem ? findItem.iconUrl : '';
  })

  const activeConfigList = computed(() => {
    const findItem = carList.find(item => item.carType === activeType.value);
    return findItem ? findItem.configList : [];
  })
  
  let carSwiperInst: Swiper;
  const carSwiperRef = ref<null>(null);
  const countToRef = ref<InstanceType<typeof CountTo>[]>();
  const flag = ref(true);


  const handleInit = (swiper: any) => {
    carSwiperInst = swiper.detail[0] as Swiper;
    // 可视范围内数字动效开始
    nextTick(() => {
      handleCountTo();
    })
  }

  const changeType = (type: string, idx: number) => {
    activeType.value = type;
    nextTick(() => {
      carSwiperInst.slideToLoop(idx);
      handleCountTo()
    })
  }

  const slideTo = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      carSwiperInst.slideNext();
    } else {
      carSwiperInst.slidePrev();
    }
    handleCountTo();
    const findItem = carList.find((_, idx) => idx === carSwiperInst.realIndex);
    if (!findItem) return;
    activeType.value = findItem.carType;
  }

  const handleCountTo = () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    })
  }

</script>

<style lang="scss" scoped>
  .car-banner {
    .car-type-swiper::part(container) {
      overflow: visible;
    }
  }

  /* 隐藏滚动条 */
.element::-webkit-scrollbar {
    display: none;
}
</style>