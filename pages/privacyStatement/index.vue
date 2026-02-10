<template>
  <div class="privacy-container">
    <div class="privacy">
        <div class="privacy_con">
            <div class="privacy-title">
              <p>PRIVACY STATEMENT OF EXEED WEBSITE</p>
              <BaseImg loading="lazy" src="contactUS/goback.svg" @click="goback" class="back" alt="goback" />
            </div>
          <div class="html-main" v-html="htmlstr"></div>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted } from "vue";
  import useCustomFetch from '~/composables/api/useDollarFetchRequest';
  import { useHeaderStore } from '~/stores/useHeader';
  const customFetch = useCustomFetch();
  const store = useHeaderStore();

  var htmlstr = ref('');
  const getPrivacyFun = async () => {
    try {
      let res = await customFetch("/jaecoo-omoda/openapi/privacy");
      htmlstr.value = res.content;
    } catch (error) {
    }
  };
  const goback = () => {
    window.history.go(-1);
  }
  onMounted(() => {
    store.setHeaderTheme('light');
    getPrivacyFun();
  })
</script>
<style scoped lang="scss">
  .privacy-container {
      width: 100%;
      height: 100%;
      background: #fff;
      position: relative;
  }
  .privacy-container .privacy .privacy_con .privacy-title {
    width: 100%;
    text-align: center;
    position: relative;
  }
  .privacy-container .privacy .privacy_con {
    width: 70%;
    margin: auto;
    padding-top: 10%;
    box-sizing: border-box;
    color: #222;
    position: relative;
    z-index: 3;
  }

  .privacy-container .privacy .privacy_con .privacy-title p {
    font-size: 0.28rem;
    color: #222;
  }
  .privacy-container .privacy .privacy_con .html-main :deep() table {
       border-width: 1px !important;
  }
  .privacy-container .privacy .privacy_con .html-main :deep() table >tbody tr td {
    border-width: 1px !important;
  }

  .privacy-container .privacy .privacy_con .privacy-title .back {
    width: 0.35rem;
    height: auto;
    position: absolute;
    right: 0;
    bottom: -1.8rem;
    cursor: pointer;
    top: 0;
  }

  .privacy-container .privacy .privacy_con .privacy-title p:nth-child(2) {
    margin-top: 1%;
  }

  .privacy-container .privacy .privacy_con .html-main {
    min-height: 100vh;
    font-size: 0.19rem;
    line-height: 2;
    margin-top: 1.5%;
  }

  .privacy-container .privacy .privacy_con .html-main :deep() a {
    font-size: 0.19rem;
    line-height: 2;
    color: #222;
  }

  .privacy-container .privacy .privacy_con .html-main :deep() li {
    display: block !important;
  }

  .privacy-container .privacy .privacy_con .html-main :deep() strong {
  }
  .privacy-container .privacy .privacy_con .html-main :deep() p > span {
  } 
</style>
<style>
  @media (max-width: 1024px) {
    .privacy-container .privacy .privacy_con .privacy-title p {
      font-size: 0.34rem !important;
    }
    .privacy-container .privacy .privacy_con .privacy-title .back {
     margin-top: 0.28rem;
     display: none;
    }
    .html-main  {
      font-size: 0.28rem !important;
    }
    .privacy-container .privacy .privacy_con {
      padding-top: 2rem !important;
      width: 90% !important;
    }
  }
</style>