<template>
  <div 
    class="model-wrap lg:py-[0.8rem] w-full 
      flex flex-col justify-center items-center 
      lg:flex-row lg:items-start lg:justify-center lg:invisible lg:absolute lg:top-[100%] lg:left-0 lg:z-100
  ">
    <!-- tab -->
    <div class="tab-list w-full 
      lg:w-[1.2rem] text-[0.22rem] lg:text-[14px] pb-[0.6rem] lg:py-0 leading-[0.29rem]
      flex lg:flex-col flex-row justify-center lg:gap-y-[0.24rem] gap-x-[0.48rem] lg:gap-x-0 font-miNormal">
      <div
        class="tab-item uppercase cursor-pointer"
        :class="{ active: activeBrand === brand }"
        v-for="brand in computedBrandList" 
        :key="brand"
        @click.stop="changeBrand(brand)"
      >{{ brand }}</div>
    </div>
    <!-- modelList -->
    <div class="model-list w-full lg:w-auto
      flex flex-wrap lg:gap-x-[0.5rem] gap-[0.5rem] font-miMedium px-[0.9rem] lg:px-0
    ">
      <div 
        v-for="model in modelList" 
        :key="model.name" 
        class="model-item text-center cursor-pointer hidden w-[calc(50%-0.25rem)] lg:w-auto"
        :class="{ '!block': (activeBrand === 'ALL' || activeBrand === model.brand) }"
        @click.stop="NavToPage(model.linkUrl)"
      >
        <BaseImg 
          :src="model.imgUrl" 
          class="w-[2.49rem] hover:scale-[1.1] duration-300 transition-transform ease-in-out" 
        />
        <div class="mt-[0.33rem] font-miBold">{{ model.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { useHeaderStore } from '~/stores/useHeader';
  import { inject } from 'vue';

  interface Model {
    name: string;
    imgUrl: string;
    brand: string;
  }
  const props = defineProps<{ 
    modelList: Model[]; 
    brandList: string[];
  }>();

  const computedBrandList = computed(() => ['ALL', ...props.brandList]);
  const activeBrand = ref<string>('ALL');
  const { headerTheme } = storeToRefs(useHeaderStore());
  const router = useRouter();
  const store = useHeaderStore();

  // 注入父组件提供的方法
  const parentMethod = inject('parentMethod');

  const changeBrand = (brand: string) => {
    activeBrand.value = brand;
  }
  // 跳转页面
  const NavToPage = (url: string) => {
    store.setPath(url);
    router.push({ path: url });
    if (parentMethod) {
        parentMethod();
    } 
  }
</script>
<style scoped lang='scss'>
  .tab-list {
    // width: 1.2rem;
    .tab-item {
      transition: .3s color ease-in-out;
      &:hover, &.active {
        @apply text-primary;
      }
      &.active {
      }
    }
  }
</style>