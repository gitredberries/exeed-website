<template>
  <div class="home-swiper-wrapper">
    <div class="title-wrapper">
      <div class="title">PR Releases</div>
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
        @mouseenter="() => mouseDragRef?.onMouseEnter()"
        @mouseleave="() => mouseDragRef?.onMouseLeave()"

      >
        <div class="img-wrapper">
          <img :src="item.imageUrl" alt="" />
        </div>
        <div class="time">
          {{ item.publishTime }}
        </div>
        <div class="desc">
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
    <div class="btn-wrapper">
      <div @click="jumpToNews(1)">EXEED News</div>
      <div @click="jumpToNews(2)">EXLANTIX News</div>
    </div>
    <MouseHover ref="mouseDragRef" />
  </div>
</template>
<script setup>
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import moment from "moment";

const mouseDragRef = ref();

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
const pageSize = ref(3);
/**
 * 新闻数据的总数量
 */
const total = ref(0);

/**
 * 计算总页数的计算属性
 * @returns {number} 总页数
 */
const totalPages = computed(() => Math.ceil(total.value / pageSize.value));

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
 * 标识是否为 EXEED 新闻的响应式引用
 */
const isExeed = ref(true);

/**
 * 获取路由实例
 */
const router = useRouter();

/**
 * 获取新闻数据的函数
 */
const getNewsData = () => {
  // 发起网络请求获取新闻数据
  fetch(
    `${config.public.apiURL}api/front/articles?current=${
      currentPage.value
    }&size=${pageSize.value}&siteCode=chery_xt&category=${
      isExeed.value ? "exeed" : "exlantix"
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
  // 重新获取新闻数据
  getNewsData();
};

/**
 * 跳转到新闻详情页的函数
 * @param {object} item - 新闻项数据
 */
const jumpToDetail = (item) => {
  // 根据是否为 EXEED 新闻跳转到不同的详情页
  router.push(
    `/${isExeed.value ? "newsDetail" : "exlantixNewsDetail"}?id=${item.id}`
  );
};

/**
 * 跳转到新闻列表页的函数
 * @param {number} sign - 标识，1 表示 EXEED 新闻，其他表示 EXLANTIX 新闻
 */
const jumpToNews = (sign) => {
  if (sign === 1) {
    // 跳转到 EXEED 新闻列表页
    router.push("/news");
  } else {
    // 跳转到 EXLANTIX 新闻列表页
    router.push("/exlantixNews");
  }
};

// 初始化获取新闻数据
getNewsData();
</script>
<style lang="scss" scoped>
.home-swiper-wrapper {
  padding: 1.4rem 1.2rem 1rem 1.2rem;
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 0.46rem;
      line-height: 0.54rem;
      color: #111;
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
      color: #888;
    }
    .page-disabled {
      cursor: not-allowed;
    }
    .page-wrapper {
      font-size: 0.14rem;
      display: flex;
      justify-content: center;
      align-items: center;
      li {
        color: #888;
        width: 0.4rem;
        height: 0.4rem;
        line-height: 0.41rem;
        text-align: center;
        cursor: pointer;
      }
      li.active {
        color: #111;
      }
    }
  }
  .content-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 0.64rem;
    .content-item {
      width: calc((100% - 0.32rem) / 3);
      cursor: none;
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
      }
      .time {
        font-size: 0.14rem;
        line-height: 0.22rem;
        color: #808080;
        margin-top: 0.2rem;
      }
      .desc {
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: #1a1a1a;
        margin-top: 0.08rem;
      }
    }
  }
  .md-pagination-wrapper{
    display: none;
  }
  .btn-wrapper {
    display: flex;
    margin-top: 1.63rem;
    div {
      padding: 0 0.2rem 0 0.24rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border: 1px solid #0d0d0d;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      font-size: 0.14rem;
      color: #0d0d0d;
      border-radius: 0.02rem;
      cursor: pointer;
      transition: all 0.3s;
      &:nth-of-type(1) {
        margin-right: 0.25rem;
      }
      &:hover {
        background: #0d0d0d;
        color: #fff;
      }
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 0.4rem 0.2rem 0.6rem;
    .title-wrapper {
      .title {
        font-size: 0.26rem;
        line-height: 0.3rem;
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
        margin-bottom: 0.3rem;
        &:nth-last-of-type(1) {
          margin-bottom: 0.2rem;
        }
        .img-wrapper {
          img {
            aspect-ratio: 1.36;
          }
        }
        .time {
          font-size: 0.14rem;
          line-height: 0.21rem;
          margin-top: 0.12rem;
        }
        .desc {
          font-size: 0.14rem;
          line-height: 0.21rem;
          margin-top: 0.1rem;
        }
      }
    }
    .md-pagination-wrapper{
      display: flex;
      justify-content: center;
    }
    .btn-wrapper {
      margin-top: 0.2rem;
      div {
        padding: 0;
        width: calc((100% - 0.2rem) / 2);
        text-align: center;
        font-size: 0.14rem;
      }
    }
  }
}
</style>
