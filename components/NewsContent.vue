<template>
  <div class="content-wrapper md-content-wrapper">
    <div class="content-main">
      <div class="content-main-left">
        <p class="time">{{ getFormatDate(mainData.publishTime) }}</p>
        <p class="title">{{ mainData.title }}</p>
      </div>
      <div class="content-main-right" @click="onLinkClick(mainData)">
        <img class="main-img" :src="mainData.imageUrl" />
      </div>
    </div>
    <div class="content-list-wrapper">
      <div class="content-list-inner" v-for="items in newsListDisplay">
        <div
          class="content-list"
          v-for="item in items"
          @click="onLinkClick(item)"
        >
          <div class="list-top">
            <img class="list-img" :src="item.imageUrl" />
          </div>
          <div class="list-bottom">
            <p class="time">{{ getFormatDate(item.publishTime) }}</p>
            <p class="title" :title="item.title">{{ item.title }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="more" v-show="showMore">
      <div class="more-btn" @click="onMoreClick">Explore More</div>
    </div>
  </div>
</template>
<script setup>
import { getFormatDate, debunce } from "@/utils/common/index.js";
// 获取运行时配置，可用于访问环境变量等配置信息
const config = useRuntimeConfig();
// 获取路由实例，用于页面导航
const router = useRouter();

const props = defineProps({
  category: {
    type: String,
    default: "exeed",
  },
});

const isNews = computed(() => {
  return props.category === "exeed";
});

const mainTimeColor = computed(() => {
 return isNews.value ? "#B2B2B2" : "#4D4D4D"; 
})

const mainDescColor = computed(() => {
 return isNews.value? "#FFFFFF" : "#1a1a1a"; 
})

const contentTimeColor = computed(() => {
 return isNews.value? "#B2B2B2" : "#4D4D4D"; 
})

/**
 * 存储主要新闻数据的响应式对象
 * @type {Ref<{
 *   id: string,
 *   title: string,
 *   content: string,
 *   publishTime: string,
 *   imageUrl: string
 * }>}
 */
const mainData = ref({
  id: "",
  title: "",
  content: "",
  publishTime: "",
  imageUrl: "",
});

/**
 * 控制是否显示 "EXPLORE MORE" 按钮的响应式变量
 * @type {Ref<boolean>}
 */
const showMore = ref(true);

// 存储额外新闻数据的数组
let extraList = [];
// 每次请求的新闻数量
let size = 7;
// 当前请求的页码
let current = 1;
// 标记原始数据是否已全部加载完
let isOringinDataEnd = false;

/**
 * 存储新闻列表数据的响应式对象
 * @type {Ref<Array>}
 */
const newsList = ref([]);

const newsListDisplay = computed(() => {
  let result = [];
  let j = -1;
  newsList.value.forEach((e, index) => {
    if ((index + 1) % 3 === 1) {
      j++;
      result.push([e]);
    } else {
      result[j].push(e);
    }
  });
  return result;
});

/**
 * 点击新闻项时的处理函数，用于跳转到新闻详情页
 * @param {Object} item - 被点击的新闻项数据
 */
const onLinkClick = (item) => {
  // 跳转到新闻详情页，并传递新闻的 id 参数
  router.push({
    path: isNews.value ? "/newsDetail" : "/exlantixNewsDetail",
    query: {
      id: item.id,
    },
  });
};

/**
 * 处理额外新闻列表数据，将数据添加到新闻列表中，并根据情况隐藏 "EXPLORE MORE" 按钮
 */
const handleExtraList = () => {
  // 如果不是第一页且额外数据数量小于等于每页可显示数量减 1，则隐藏 "EXPLORE MORE" 按钮
  if (current !== 1 && extraList.length <= size - 1) {
    showMore.value = false;
  }
  // 从额外数据中取出最多 size - 1 条数据添加到新闻列表中
  newsList.value.push(
    ...extraList.splice(0, Math.min(size - 1, extraList.length))
  );
};

/**
 * 获取新闻数据的函数，通过 API 请求获取新闻列表
 * @param {number} pageSize - 每次请求的新闻数量
 */
const getData = (pageSize) => {
  // 发起 API 请求获取新闻数据
  fetch(
    `${config.public.apiURL}api/front/articles?current=${current}&size=${pageSize}&siteCode=chery_xt&category=${props.category}`
  )
    .then((response) => {
      // 检查响应是否成功，如果失败则抛出错误
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // 将响应数据转换为 JSON 格式
      return response.json();
    })
    .then((res) => {
      // 如果请求成功（返回码为 0）
      if (res.code === 0) {
        // 获取响应中的新闻数据，如果不存在则默认为空数组
        const data = res.data?.items || [];
        if (current === 1) {
          // 第一页数据，将第一条数据作为主要新闻数据
          mainData.value = data[0] || [];
          // 将除第一条外的其他数据添加到额外数据数组中
          extraList.push(...data.filter((v, i) => i !== 0));
          // 如果所有数据都已加载完，则隐藏 "EXPLORE MORE" 按钮
          if (res.data?.total <= (current - 1) * pageSize + data.length) {
            showMore.value = false;
          }
        } else {
          // 非第一页数据，将新数据添加到额外数据数组中
          extraList.push(...data);
        }
        // 如果所有数据都已加载完，标记原始数据已结束
        if (res.data?.total <= (current - 1) * pageSize + data.length) {
          isOringinDataEnd = true;
        }
        // 处理额外新闻列表数据
        handleExtraList();
        // 页码加 1
        current++;
      }
    });
};

// 组件挂载完成后，调用 getData 函数获取第一页新闻数据
onMounted(() => {
  getData(size);
});

/**
 * 点击 "EXPLORE MORE" 按钮时的处理函数，使用防抖处理
 */
const onMoreClick = debunce(() => {
  // 如果原始数据已全部加载完，直接处理额外数据
  if (isOringinDataEnd) {
    handleExtraList();
  } else {
    // 否则继续请求新数据
    getData(size);
  }
});
</script>
<style lang="scss" scoped>
@import url("./css/newsContent.scss");
.content-wrapper {
  padding: 0 1.2rem;
  width: 100%;
  overflow: hidden;
  .content-main {
    display: flex;
    justify-content: space-between;
    margin-top: 1.6rem;
    .content-main-left {
      max-width: 5.76rem;
      .time {
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: v-bind(mainTimeColor);
      }
      .title {
        font-size: 0.32rem;
        line-height: 0.4rem;
        color: v-bind(mainDescColor);
        margin-top: 0.04rem;
        text-transform: none;
      }
      .desc {
        margin-top: 0.24rem;
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: v-bind(mainDescColor);
      }
    }
    .content-main-right {
      width: 9.96rem;
      height: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      &:hover {
        .main-img {
          transform: scale(var(--scale-img));
        }
      }
      .main-img {
        transition: all 0.5s;
        width: 100%;
      }
    }
  }
  .content-list-wrapper {
    width: 100%;
    margin-top: 1.56rem;
    overflow: hidden;
    .content-list-inner{
      display: flex;
      justify-content: flex-start;
    }
    .content-list {
      width: calc((100vw - 2.85rem) / 3);
      margin-right: 0.14rem;
      margin-bottom: 0.8rem;
      cursor: pointer;
      &:nth-of-type(3n + 0) {
        margin-right: 0;
      }
      &:hover {
        .list-top {
          .list-img {
            transform: scale(var(--scale-img));
          }
        }
      }
      .list-top {
        width: 100%;
        display: flex;
        justify-items: center;
        align-items: center;
        overflow: hidden;
        .list-img {
          transition: all 0.5s;
          width: 100%;
          height: 100%;
          aspect-ratio: 1.31;
          object-fit: cover;
        }
      }
      .list-bottom {
        width: 100%;
        margin-top: 0.2rem;
        .time {
          font-size: 0.16rem;
          line-height: 0.24rem;
          color: v-bind(contentTimeColor);
        }
        .title {
          margin-top: 0.04rem;
          font-size: 0.2rem;
          line-height: 0.28rem;
          color: v-bind(mainDescColor);
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          text-transform: none;
        }
      }
    }
  }
  .more {
    display: flex;
    justify-content: center;
    margin: 0.2rem 0 1rem;
    .more-btn {
      height: 0.4rem;
      /* 自动布局 */
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0.24rem;
      gap: 0.08rem;
      border-radius: 0.02rem;
      box-sizing: border-box;
      border: 0.01rem solid v-bind(mainDescColor);
      box-shadow: 0 0 0.08rem 0 rgba(0, 0, 0, 0.1);
      font-size: 0.14rem;
      line-height: 0.22rem;
      color: v-bind(mainDescColor);
      cursor: pointer;
      text-transform: uppercase;
    }
  }
}
</style>
