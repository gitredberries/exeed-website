<template>
  <div class="news-detail-page">
    <div v-if="article" class="detail-split">
      <!-- Left: image with gradient overlay -->
      <div class="detail-left">
        <img class="detail-img" :src="article.imageUrl" :alt="article.title" />
        <div class="detail-overlay">
          <p class="overlay-date">{{ formatDate(article.publishTime) }}</p>
          <h2 class="overlay-title">{{ article.title }}</h2>
          <p class="overlay-summary">{{ article.summary }}</p>
        </div>
      </div>

      <!-- Right: full article content -->
      <div class="detail-right">
        <h1 class="content-title">{{ article.title }}</h1>
        <div class="content-body" v-html="article.content"></div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-else class="detail-loading">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const config = useRuntimeConfig();
const route = useRoute();

const article = ref(null);

const formatDate = (date) => {
  return date ? moment(date).format("MMMM D, YYYY") : "";
};

const articleId = route.params.id || route.query.id;

onMounted(() => {
  fetch(`${config.public.apiURL}api/front/articles/detailById?id=${articleId}`)
    .then((r) => r.json())
    .then((res) => {
      if (res.code === 0) {
        article.value = res.data || null;
      }
    });
});
</script>

<style lang="scss" scoped>
.news-detail-page {
  background: #0d0d0d;
  min-height: 100vh;
}

.detail-split {
  display: flex;
  width: 100%;
  min-height: 100vh;
}

/* ── Left column ── */
.detail-left {
  position: relative;
  width: 50%;
  flex-shrink: 0;
  overflow: hidden;

  .detail-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center top;
    display: block;
    background: #0d0d0d;
  }

  .detail-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.48rem 0.4rem 0.4rem;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.6) 30%,
      rgba(0, 0, 0, 0.9) 100%
    );

    .overlay-date {
      font-size: 0.14rem;
      line-height: 0.22rem;
      color: rgba(255, 255, 255, 0.65);
      margin-bottom: 0.12rem;
      font-weight: 400;
    }

    .overlay-title {
      font-size: 0.26rem;
      font-weight: 700;
      line-height: 1.25;
      color: #ffffff;
      margin-bottom: 0.14rem;
    }

    .overlay-summary {
      font-size: 0.14rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.7);
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      white-space: pre-line;
    }
  }
}

/* ── Right column ── */
.detail-right {
  width: 50%;
  background: #0d0d0d;
  padding: 0.64rem 0.72rem 0.8rem;
  overflow-y: auto;

  .content-title {
    font-size: 0.38rem;
    font-weight: 700;
    line-height: 1.2;
    color: #ffffff;
    margin-bottom: 0.48rem;
  }

  .content-body {
    :deep(p) {
      font-size: 0.16rem;
      line-height: 1.75;
      color: #cccccc;
      margin-bottom: 0.24rem;
    }

    :deep(blockquote) {
      border-left: 0.04rem solid #555555;
      padding-left: 0.24rem;
      margin: 0.4rem 0;

      p {
        color: #aaaaaa;
        font-style: italic;
        font-size: 0.15rem;
        line-height: 1.7;
        margin-bottom: 0.12rem;
      }
    }

    :deep(strong) {
      color: #ffffff;
      font-weight: 700;
    }

    :deep(a) {
      color: #a8c8ff;
      text-decoration: underline;
      text-underline-offset: 0.03rem;

      &:hover {
        color: #ffffff;
      }
    }

    :deep(ul),
    :deep(ol) {
      margin-bottom: 0.24rem;
      padding-left: 0.24rem;

      li {
        font-size: 0.16rem;
        line-height: 1.75;
        color: #cccccc;
        margin-bottom: 0.08rem;
      }
    }

    :deep(h2),
    :deep(h3) {
      color: #ffffff;
      font-weight: 700;
      margin-bottom: 0.16rem;
    }

    :deep(h2) {
      font-size: 0.24rem;
      line-height: 1.3;
    }

    :deep(h3) {
      font-size: 0.2rem;
      line-height: 1.3;
    }
  }
}

/* ── Loading ── */
.detail-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #808080;
  font-size: 0.16rem;
}

/* ── Responsive ── */
@media screen and (max-width: 1024px) {
  .detail-split {
    flex-direction: column;
    min-height: unset;
  }

  .detail-left {
    width: 100%;
    height: 5rem;
  }

  .detail-right {
    width: 100%;
    padding: 0.48rem 0.24rem 0.64rem;

    .content-title {
      font-size: 0.26rem;
      margin-bottom: 0.32rem;
    }

    .content-body {
      :deep(p) {
        font-size: 0.15rem;
      }
    }
  }
}
</style>
