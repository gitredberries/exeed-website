<template>
    <div class="animated-container">
        <div class="flex flex-col items-center text-center animated" :class="props.titleContent.className">
            <BaseImg 
                  :src="isMobile ?`${props.titleContent.titleImg}_mobile.png` : `${props.titleContent.titleImg}.png`" 
                  class="w-[4.5rem] h-[0.4rem] object-cover"
                  v-if="props.titleContent.label == 'img'" 
              />
            <h1 v-else class="mb-[0.24rem] lg:mb-[0.24rem] text-[0.48rem] lg:text-[0.4rem] font-[250] animated-title font-miLight leading-[1.35] px-[0.63rem] lg:px-[0]" :class="[props.titleContent.titleClassName,props.titleContent.isTextWhite ? 'text-white' : 'text-white/90']">{{props.titleContent.title}}</h1>
            <h5 v-html="props.titleContent.subTitle" class="text-[0.24rem] lg:text-[0.16rem] animated-title font-miNormal leading-[1.35]" :class="[props.titleContent.h5ClassName,props.titleContent.isTextWhite ? 'text-white' : 'text-white/70']"></h5>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, nextTick, onBeforeUnmount } from 'vue'
    import { carFlowAnimation } from '../../utils/common/index'
    const props = defineProps({
        titleContent: {
            type: Object,
            default: () => ({
                isTextWhite: false,
                title: '',
                subTitle: '',
                h5ClassName: '',
                className: "",
                titleClassName: '',
                label: '',
                titleImg: ''
            })
        }
    })
    const { isMobile } = useDeviceType();
    const handleScroll = () => {
        nextTick(() => {
            carFlowAnimation()
        })
    }
    onMounted(() => {
        carFlowAnimation()
        window.addEventListener('scroll', handleScroll)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('scroll', handleScroll);
    })
</script>
<style scoped lang="scss">
    .brand-title {
        color: #222222 !important;
    }
    .brand-subtitle {
        color: #666666 !important;
    }
    .line-height-normal {
        line-height: normal;
    }
    @media (max-width: 1024px) {
        .brand-title {
            color: #222222 !important;
        }
        .banner2-space {
            padding-left: 0.64rem;
            padding-right: 0.64rem;
        }
    }
</style>