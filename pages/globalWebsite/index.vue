<template>
    <div id="message" style="font-size:14px"></div>
    <fullArticle :content="content"></fullArticle>
    <div class="flex px-[0.32rem] mt-[0.48rem] lg:px-[2.4rem] lg:mt-[0.8rem] flex-col lg:flex-row">
        <el-select 
          class="select mr-[0.24rem]" 
          popper-class="menu_view" 
          v-model="region_val"
          placeholder="Select a region" 
          @change="changeRegion">
            <el-option
                v-for="(item, index) in data.select_form"  
                :value="item.name" 
                :label="item.name"
                :key="index">
            </el-option>
        </el-select>
        <el-select 
          class="select mt-[0.24rem] lg:mt-[0]" 
          popper-class="menu_view" 
          v-model="market_val"
          placeholder="Select a market" 
          @change="changeMarket">
              <el-option
                  v-for="(item, index) in data.market_list"  
                  :value="item.id" 
                  :label="item.linkName"
                  :key="item.id">
                  <div class="flex justify-between items-center">
                     <h5>{{item.linkName}}</h5>
                     <img :src="item.icon" alt="" loading="lazy" class="w-[0.56rem] h-[0.37rem] img-shadow">
                  </div>
              </el-option>
        </el-select>
    </div>
    <!-- <div class="continue-btn" @click="websiteLink()">Continue</div> -->
    <div class="w-full flex justify-center">
      <BaseButton 
          type="text" 
          class="!px-[0] !py-[0] continue-btn"
          @click="websiteLink"
      >Continue</BaseButton>
    </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import fullArticle from '../../components/common/fullArticle.vue';
  import { ElMessage } from 'element-plus';
  import { useRouter } from 'vue-router';
  // import { customDollarFetch } from '~/composables/api/useDollarFetchRequest';
  import useCustomFetch from '~/composables/api/useDollarFetchRequest';
  const customFetch = useCustomFetch();
  const router = useRouter();
  const content = ref({
        // 字体颜色是否为#fff
        isTextWhite: true,
        // 主标题
        title: 'SELECT YOUR MARKET',
        // 标题组件的class 支持TailWind的写法
        className: "",
        // 控制图片的class
        imgClass: "h-[6.2rem] min-h-[6.2rem] lg:h-[7.8rem] lg:min-h-[7.8rem] globalWebsiteImg",
        // 传入的图片
        img: "globalWebsite/banner_bg",
        fullArticleClass: 'full-article-class',
        titleContentClass: '!pt-[2.81rem] lg:!pt-[2.4rem]'
    });
    const data = reactive({
        select_form: [],
        market_list: [],
    });
    const region_val = ref('');
    const market_val = ref('');
    const getList = async () => {
      try {
            let res = await customFetch("/jaecoo-omoda/openapi/websiteLink/listWebsiteLink");
            data.select_form = res;
        } catch (error) {
        }
    }
    const changeRegion = (val) => {
      data.market_list = data.select_form.find(cur => (cur.name == val)).websiteLinkList;
      
    }
    const changeMarket = (val) => {
    }
    const websiteLink = () => {
      if(!region_val.value) {
        ElMessage({
          message: 'please select a region',
          type: 'warning',
          appendTo: document.getElementById('message'),
          offset: 100
        })
        return;
      }
      if(!market_val.value) {
        ElMessage({
          message: 'please select a market',
          type: 'warning',
          appendTo: document.getElementById('message'),
          offset: 100,
        })
        return;
      }
      const url = data.market_list.find(cur => (cur.id == market_val.value))?.linkUrl;
      window.location.href = url;
    }
    onMounted(() => {
      getList();
    })
</script>
<style scoped lang="scss">
  .select {
    width: 7.08rem;
    height: 0.74rem;
  }
  .continue-btn {
    width: 1.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    border: 1px solid #222;
    color:#222 !important;
    font-size: 0.16rem;
    margin-top: 0.48rem;
    margin-bottom: 1.69rem;
    cursor: pointer;
  }
  .img-shadow {
    box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: 1024px)  {
    .continue-btn {
      width: 1.5rem;
      height: 0.49rem;
      background-color: #67B0C4;
      line-height: 0.49rem;
      color: #fff;
      border: unset;
      margin-bottom: 6.42rem;
      position: relative;
      z-index: 999;
    }
    .select {
      width: 100%;
      height: 0.74rem;
    }
  }
</style>
<style>
  @import url('~/assets/css/selectForm.scss');
  @media (max-width: 1024px) {
    #message .el-message--warning {
        width: 3.8rem;
    }
  }
</style>