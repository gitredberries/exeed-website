<template>
  <div class="home-swiper-wrapper">
    <div class="title-wrapper">
      <div class="title">Source material</div>
      <div class="subtitle">
        You can find campaign materials for our branded events here
      </div>
    </div>
    <div class="control-wrapper">
      <div class="btn-wrapper">
        <div
          :class="isNewsBtnActive ? 'active' : ''"
          @click="switchContent(true)"
        >
          NEWS
        </div>
        <div
          :class="isNewsBtnActive ? '' : 'active'"
          @click="switchContent(false)"
        >
          PICTURE
        </div>
      </div>
      <div class="pagination-wrapper">
        <div
          :class="['page-icon', currentPage === 1 && 'page-disabled']"
          @click="currentPage !== 1 && onPageClick(currentPage - 1)"
        >
          <el-icon>
            <ArrowLeft />
          </el-icon>
        </div>
        <ul class="page-wrapper">
          <li
            :class="page === currentPage ? 'active' : ''"
            v-for="page in visiblePages"
            @click="onPageClick(page)"
          >
            {{ page }}
          </li>
        </ul>
        <div
          :class="['page-icon', currentPage === totalPages && 'page-disabled']"
          @click="currentPage !== totalPages && onPageClick(currentPage + 1)"
        >
          <el-icon>
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </div>

    <div class="content-wrapper">
      <div
        class="content-item"
        v-for="item in SourceMaterialList"
        @click="jumpToDetail(item)"
        @mouseenter="() => isNewsBtnActive && mouseDragRef?.onMouseEnter()"
        @mouseleave="() => isNewsBtnActive && mouseDragRef?.onMouseLeave()"
      >
        <div class="img-wrapper">
          <img :src="item.imageUrl" alt="" />
          <img class="md-img" :src="item.mdImageUrl || item.imageUrl" alt="" />
        </div>
        <div class="time" v-if="item.publishTime">
          {{ item.publishTime }}
        </div>
        <div class="desc" v-if="item.title">
          {{ item.title }}
        </div>
      </div>
    </div>
    <div class="pagination-wrapper md-pagination-wrapper">
      <div
        :class="['page-icon', currentPage === 1 && 'page-disabled']"
        @click="currentPage !== 1 && onPageClick(currentPage - 1)"
      >
        <el-icon>
          <ArrowLeft />
        </el-icon>
      </div>
      <ul class="page-wrapper">
        <li
          :class="page === currentPage ? 'active' : ''"
          v-for="page in visiblePages"
          @click="onPageClick(page)"
        >
          {{ page }}
        </li>
      </ul>
      <div
        :class="['page-icon', currentPage === totalPages && 'page-disabled']"
        @click="currentPage !== totalPages && onPageClick(currentPage + 1)"
      >
        <el-icon>
          <ArrowRight />
        </el-icon>
      </div>
    </div>
    <div class="jump-btn-wrapper">
      <div class="jump-btn" @click="onJumpClick">
        {{ jumpBtnText }}
      </div>
    </div>
    <MouseHover ref="mouseDragRef" />
  </div>
</template>
<script setup>
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { Fetch } from "@/utils/common";
import moment from "moment";

const mouseDragRef = ref();

const props = defineProps({
  isExploration: {
    type: Boolean,
    default: false,
  },
});

const bgColor = computed(() => {
  return props.isExploration ? "black" : "#A2ABB2";
});

const switchActiveColor = computed(() => {
  return props.isExploration ? "white" : "#26B7BC";
});

const normalPageColor = computed(() => {
  return props.isExploration ? "#A1A1A1" : "#CCCCCC";
});

const mdPageColor = computed(() => {
  return props.isExploration ? "#808080" : "#CCCCCC";
});

const jumpBtnColor = computed(() => {
  return props.isExploration ? "#1A1A1A" : "white";
});

const timeColor = computed(() => {
  return props.isExploration ? "#B2B2B2" : "white";
});

const mdTimeColor = computed(() => {
  return props.isExploration ? "#808080" : "white";
});

const cursor = computed(() => {
  return isNewsBtnActive.value ? "none" : "default";
});

const jumpBtnText = computed(() => {
  return props.isExploration
    ? "Explore EXEED New Models"
    : "Explore EXLANTIX New Models";
});

const isNewsBtnActive = ref(true);

/**
 * 获取运行时配置
 */
const config = useRuntimeConfig();
/**
 * 存储新闻数据列表的响应式引用
 */
const SourceMaterialList = ref([]);

/**
 * 当前页码，初始值为 1
 */
const currentPage = ref(1);
/**
 * 每页显示的新闻数量
 */
const pageSize = 3;
/**
 * 新闻数据的总数量
 */
const total = ref(0);

/**
 * 计算总页数的计算属性
 * @returns {number} 总页数
 */
const totalPages = computed(() => Math.ceil(total.value / pageSize));

/**
 * 计算当前可见页码的计算属性
 * @returns {number[]} 可见页码数组
 */
const visiblePages = computed(() => {
  // 存储可见页码的数组
  const pages = [];
  let start;
  // 根据当前页码确定起始页码
  if (currentPage.value <= 2) {
    start = 1;
  } else if (currentPage.value >= totalPages.value - 1) {
    start = totalPages.value - 2;
  } else {
    start = currentPage.value - 1;
  }
  // 生成可见页码数组
  for (let i = 0; i < 3; i++) {
    if (start + i <= totalPages.value) {
      pages.push(start + i);
    }
  }

  return pages;
});

/**
 * 获取路由实例
 */
const router = useRouter();

let allPictureData = [];

// 前端分页获取数据
const getFrontPictureData = () => {
  total.value = allPictureData.length;
  const startIndex = (currentPage.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  SourceMaterialList.value = allPictureData.slice(startIndex, endIndex);
};

const getPictureData = () => {
  Fetch(props.isExploration ? "Exploration-s7" : "Sustainability-s7").then(
    (data) => {
      allPictureData = data.map((v) => ({
        imageUrl: v.image,
        mdImageUrl: v.imageMobile,
      }));
    }
  );
};

/**
 * 获取新闻数据的函数
 */
const getNewsData = () => {
  // 发起网络请求获取新闻数据
  fetch(
    `${config.public.apiURL}api/front/articles?current=${
      currentPage.value
    }&size=${pageSize}&siteCode=chery_xt&category=${
      props.isExploration ? "exeed" : "exlantix"
    }`
  )
    .then((response) => {
      // 检查响应状态是否正常
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((res) => {
      // 处理响应数据
      if (res.code === 0) {
        const data = res.data;
        // 处理新闻数据，格式化发布时间
        SourceMaterialList.value = (data?.items || []).map((v) => {
          return {
            ...v,
            publishTime: v.publishTime
              ? moment(v.publishTime).format("YYYY/MM")
              : "",
          };
        });
        // 更新新闻总数量
        total.value = data.total || 0;
      }
    });
};

/**
 * 页码点击事件处理函数
 * @param {number} page - 点击的页码
 */
const onPageClick = (page) => {
  // 更新当前页码
  currentPage.value = page;
  if (isNewsBtnActive.value) {
    // 重新获取新闻数据
    getNewsData();
  } else {
    getFrontPictureData();
  }
};

/**
 * 跳转到新闻详情页的函数
 * @param {object} item - 新闻项数据
 */
const jumpToDetail = (item) => {
  // 根据是否为 EXEED 新闻跳转到不同的详情页
  router.push(
    `/${props.isExploration ? "newsDetail" : "exlantixNewsDetail"}?id=${
      item.id
    }`
  );
};

const onJumpClick = () => {
  router.push(props.isExploration ? "/news" : "/exlantixNews");
};

/**
 * 跳转到新闻列表页的函数
 * @param {number} sign - 标识，1 表示 EXEED 新闻，其他表示 EXLANTIX 新闻
 */
const switchContent = (bool) => {
  if (isNewsBtnActive.value !== bool) {
    currentPage.value = 1;
    if (bool) {
      getNewsData();
    } else {
      getFrontPictureData();
    }
    isNewsBtnActive.value = bool;
  }
};

// 初始化获取新闻数据
getNewsData();
getPictureData();
</script>
<style lang="scss" scoped>
.home-swiper-wrapper {
  padding: 1.6rem 1.2rem 1.18rem 1.2rem;
  background-color: v-bind(bgColor);
  .title-wrapper {
    .title {
      font-size: 0.46rem;
      line-height: 0.54rem;
      color: white;
      text-transform: none;
    }
    .subtitle {
      font-size: 0.16rem;
      line-height: 0.24rem;
      margin-top: 0.16rem;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .pagination-wrapper {
    display: flex;
    align-items: center;
    .page-icon {
      width: 0.32rem;
      height: 0.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: white;
      font-size: 0.2rem;
    }
    .page-disabled {
      cursor: not-allowed;
    }
    .page-wrapper {
      font-size: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        color: v-bind(normalPageColor);
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.41rem;
        text-align: center;
        cursor: pointer;
      }
      li.active {
        color: white;
      }
    }
  }
  .control-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.4rem 0;
    .btn-wrapper {
      display: flex;
      div {
        width: 1.06rem;
        height: 0.4rem;
        line-height: 0.4rem;
        border: 1px solid v-bind(switchActiveColor);
        font-size: 0.14rem;
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        text-align: center;
        &:nth-of-type(1) {
          border-radius: 0.02rem 0 0 0.02rem;
          border-right: none;
        }
        &:nth-of-type(2) {
          border-radius: 0 0.02rem 0.02rem 0;
        }
      }
      .active {
        background-color: v-bind(switchActiveColor);
        color: v-bind(jumpBtnColor);
      }
    }
  }
  .content-wrapper {
    display: flex;
    justify-content: space-between;
    .content-item {
      width: calc((100% - 0.32rem) / 3);
      cursor: v-bind(cursor);
      .img-wrapper {
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          aspect-ratio: 1.31;
          transition: all 0.5s;
          object-fit: cover;
          &:hover {
            transform: scale(var(--scale-img));
          }
        }
        .md-img {
          display: none;
        }
      }
      .time {
        font-size: 0.14rem;
        line-height: 0.22rem;
        color: v-bind(timeColor);
        margin-top: 0.12rem;
      }
      .desc {
        font-size: 0.18rem;
        line-height: 0.26rem;
        color: white;
        margin-top: 0.08rem;
      }
    }
  }
  .jump-btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 0.8rem;
    .jump-btn {
      padding: 0 0.2rem 0 0.24rem;
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.14rem;
      background: v-bind(switchActiveColor);
      color: v-bind(jumpBtnColor);
      border-radius: 0.02rem;
      cursor: pointer;
    }
  }
  .md-pagination-wrapper {
    display: none;
  }
  @media screen and (max-width: 1024px) {
    padding: 0.8rem 0.2rem 0.6rem;
    .title-wrapper {
      .title {
        font-size: 0.26rem;
        line-height: 0.3rem;
      }
      .subtitle {
        margin-top: 0.03rem;
        font-size: 0.14rem;
        line-height: 0.2rem;
      }
    }
    .control-wrapper {
      margin-top: 0.2rem;
      display: block;
      .btn-wrapper {
        div {
          height: 0.28rem;
          line-height: 0.28rem;
          font-size: 0.12rem;
          width: 0.88rem;
          &:nth-of-type(1) {
            border-radius: 0.04rem 0 0 0.04rem;
          }
          &:nth-of-type(2) {
            border-radius: 0 0.04rem 0.04rem 0;
          }
        }
      }
      .pagination-wrapper {
        display: none;
      }
    }
    .content-wrapper {
      margin-top: 0.4rem;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .content-item {
        width: 100%;
        margin-bottom: 0.2rem;
        &:nth-last-of-type(1) {
          margin-bottom: 0;
        }
        .img-wrapper {
          img {
            aspect-ratio: 1.36;
            display: none;
          }
          .md-img {
            display: block;
          }
        }
        .time {
          font-size: 0.14rem;
          line-height: 0.21rem;
          margin-top: 0.12rem;
          color: v-bind(mdTimeColor);
        }
        .desc {
          font-size: 0.14rem;
          line-height: 0.21rem;
          margin-top: 0.1rem;
        }
      }
    }
    .md-pagination-wrapper {
      display: flex;
      justify-content: center;
      margin: 0.24rem 0;
      .page-icon {
        font-size: 0.14rem;
        color: v-bind(timeColor);
      }
      .page-wrapper {
        font-size: 0.14rem;
        li {
          color: v-bind(mdPageColor);
        }
      }
    }
    .jump-btn-wrapper {
      margin-top: 0;
      .jump-btn {
        padding: 0 0.36rem;
      }
    }
  }
}
</style>
