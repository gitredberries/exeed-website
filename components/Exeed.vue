<template>
  <div class="exeed-wrapper md-exeed-wrapper" :style="{'--btn-hover-back': props.btnHoverBack}">
    <div class="country_jump">
      <div class="country_t1">{{ props.title }}</div>
      <div class="country_t2">
        {{ props.subtitle }}
      </div>
      <div class="country_my" @click="onBtnClick">
        <span>{{ props.btnText }}</span>
      </div>
    </div>
    <ExeedWorld :showModal="showModal" @closeModal="closeModal"/>
  </div>
</template>
<script setup>
import { useHeaderStore } from '@/stores/useHeader.ts';

const props = defineProps({
  btnHoverBack: {
    type: String,
    default: 'rgb(58,174,176)'
  },
  title: {
    type: String,
    default: 'EXEED IN YOUR COUNTRY'
  },
  subtitle: {
    type: String,
    default: 'Learn more about EXEED models, products and services'
  },
  btnText: {
    type: String,
    default: 'EXEED in your country'
  }
})

const headStore = useHeaderStore();
// 展示国际化选择的弹窗
const showModal = computed(() => headStore.showWorldModal);
// 关闭国际化弹窗
const closeModal = () => showModal.value && headStore.setWorldModal(false);

const onBtnClick = () => {
  !showModal.value && headStore.setWorldModal(true);
}

</script>
<style lang="scss" scoped>
@import url(./css/exeed.scss);
.exeed-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #edeef0;
  .country_jump {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem 0;
    background-color: #edeef0;
    .country_t1 {
      font-size: 0.45rem;
      line-height: 0.45rem;
      font-weight: bold;
    }
    .country_t2 {
      font-size: 0.16rem;
      line-height: 0.16rem;
      margin-top: 0.2rem;
      color: #1A1A1A;
    }
    .country_my {
      background-color: #1A1A1A;
      color: #fff;
      margin-top: 0.32rem;
      padding: 0 0.24rem;
      font-size: 0.14rem;
      line-height: 0.4rem;
      position: relative;
      border-radius: 0.02rem;
      cursor: pointer;
      &::after{
        content: '';
        width: 100%;
        height: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        background-color: var(--btn-hover-back);
        z-index: 2;
        transition: all .5s;
      }
      span{
        position: relative;
        z-index: 3;
      }
      &:hover{
        &::after{
          height: 100%;
        }
      }
    }
  }
}
</style>
