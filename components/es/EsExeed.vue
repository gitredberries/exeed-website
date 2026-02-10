<template>
  <div class="exeed-wrapper md-exeed-wrapper">
    <div class="country_jump">
      <div class="country_t1">EXEED IN YOUR COUNTRY</div>
      <div class="country_t2">
        Learn more about EXEED models, products and services
      </div>
      <div class="country_my" @click="onBtnClick">
        <span>EXEED in your country</span>
      </div>
    </div>
    <ExeedWorld :showModal="showModal" @closeModal="closeModal"/>
  </div>
</template>
<script setup>
import { useHeaderStore } from '@/stores/useHeader.ts';

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
    }
    .country_my {
      background-color: rgb(63, 64, 68);
      color: #fff;
      margin-top: 0.32rem;
      padding: 0.28rem 0.8rem;
      font-size: 0.18rem;
      line-height: 0.22rem;
      position: relative;
      cursor: pointer;
      &::after{
        content: '';
        width: 100%;
        height: 0;
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        background-color: rgb(58,174,176);
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
