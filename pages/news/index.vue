<template>
  <div class="news">
    <NewsBanner title="News" :banner="`${config.public.staticURL}/images/news/newsBanner.png`"/>
    <div class="news-listing" v-if="articles.length">
      <div
        class="news-article"
        v-for="article in articles"
        :key="article.id"
      >
        <!-- Left: image card with overlay -->
        <div class="article-card">
          <img class="article-img" :src="article.imageUrl" :alt="article.title" />
          <div class="article-overlay">
            <p class="article-date">{{ formatDate(article.publishTime) }}</p>
            <h2 class="article-title">{{ article.title }}</h2>
            <p class="article-summary">{{ article.summary }}</p>
          </div>
        </div>
        <!-- Right: full content -->
        <div class="article-content">
          <h1 class="content-title">{{ article.title }}</h1>
          <div class="content-body" v-html="article.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import moment from "moment";

const config = useRuntimeConfig();
const articles = ref([]);

const formatDate = (date) => {
  return date ? moment(date).format("MMMM D, YYYY") : "";
};

const fetchArticles = () => {
  fetch(`${config.public.apiURL}api/front/articles?current=1&size=10&siteCode=chery_xt&category=exeed`)
    .then((r) => r.json())
    .then((res) => {
      if (res.code === 0) {
        articles.value = res.data?.items || [];
      }
    });
};

fetchArticles();
</script>

<style lang="scss" scoped>
.news {
  background: #0d0d0d;
  min-height: 100vh;
}

.news-listing {
  display: flex;
  flex-direction: column;
}

.news-article {
  display: flex;
  width: 100%;
  min-height: 80vh;

  .article-card {
    position: relative;
    width: 50%;
    flex-shrink: 0;
    overflow: hidden;

    .article-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .article-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0.4rem;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.75) 40%,
        rgba(0, 0, 0, 0.92) 100%
      );

      .article-date {
        font-size: 0.14rem;
        color: rgba(255, 255, 255, 0.7);
        margin-bottom: 0.12rem;
      }

      .article-title {
        font-size: 0.26rem;
        font-weight: 700;
        line-height: 1.3;
        color: #ffffff;
        margin-bottom: 0.1rem;
      }

      .article-summary {
        font-size: 0.14rem;
        line-height: 1.5;
        color: rgba(255, 255, 255, 0.75);
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    }
  }

  .article-content {
    width: 50%;
    background: #0d0d0d;
    padding: 0.6rem 0.64rem;
    overflow-y: auto;

    .content-title {
      font-size: 0.36rem;
      font-weight: 700;
      line-height: 1.25;
      color: #ffffff;
      margin-bottom: 0.4rem;
    }

    .content-body {
      :deep(p) {
        font-size: 0.16rem;
        line-height: 1.7;
        color: #cccccc;
        margin-bottom: 0.24rem;
      }

      :deep(blockquote) {
        border-left: 0.04rem solid #555;
        padding-left: 0.24rem;
        margin: 0.32rem 0;

        p {
          color: #aaaaaa;
          font-style: italic;
        }
      }

      :deep(strong) {
        color: #ffffff;
        font-weight: 600;
      }

      :deep(a) {
        color: #cccccc;
        text-decoration: underline;
      }

      :deep(ul), :deep(ol) {
        margin-bottom: 0.24rem;
        padding-left: 0.24rem;

        li {
          font-size: 0.16rem;
          line-height: 1.7;
          color: #cccccc;
          margin-bottom: 0.08rem;
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .news-article {
    flex-direction: column;
    min-height: unset;

    .article-card {
      width: 100%;
      height: 5rem;
    }

    .article-content {
      width: 100%;
      padding: 0.4rem 0.24rem;

      .content-title {
        font-size: 0.24rem;
      }
    }
  }
}
</style>
