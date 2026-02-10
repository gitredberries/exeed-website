<template>
  <div class="news-detail-wrapper md-news-detail-wrapper">
    <div class="title">{{ title }}</div>
    <div class="time">{{ getFormatDate(time) }}</div>
    <div class="content" v-html="context"></div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();

const context = ref("");
const title = ref("");
const time = ref("");
const route = useRoute();

const props = defineProps({
  isNews: {
    type: Boolean,
    default: true,
  },
});

const bgColor = computed(() => {
  return props.isNews ? "#0d0d0d" : "white";
})

const titleColor = computed(() => {
  return props.isNews? "white" : "#1a1a1a";
})

const contentColor = computed(() => {
  return props.isNews? "#ccc" : "#333";
})

const getMonthName = (time) => {
  return time
    ? new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(time))
    : "";
};

const getDate = (time) => {
  if (!time) {
    return;
  }
  const dateString = new Date(time).toISOString();
  const [year, month, date] = dateString.match(/\d+/g);
  return date;
};

const getFormatDate = (date) => {
  return getMonthName(date) + " " + getDate(date);
};

onMounted(() => {
  fetch(
    `${config.public.apiURL}api/front/articles/detailById?id=${route.query.id}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((res) => {
      if (res.code === 0) {
        const data = res.data || {};
        context.value = data.content;
        title.value = data.title;
        time.value = data.publishTime;
      }
    });
});
</script>
<style lang="scss" scoped>
@media screen and (max-width: 1024px) {
  .news-detail-wrapper.md-news-detail-wrapper {
    padding: 0.8rem 0.2rem;
    .title {
      font-size: 0.24rem;
      line-height: 0.36rem;
    }
    .time {
      font-size: 0.14rem;
      line-height: 0.21rem;
      margin-top: 0.12rem;
      margin-bottom: 0.32rem;
    }
  }
}
.news-detail-wrapper {
  width: 100%;
  padding: 1.6rem 3.19rem 0.7rem;
  background: v-bind(bgColor);
  .title {
    font-size: 0.4rem;
    line-height: 0.48rem;
    color: v-bind(titleColor);
  }
  .time {
    font-size: 0.18rem;
    line-height: 0.26rem;
    /* 黑色/黑色4 */
    color: #808080;
    margin-top: 0.2rem;
    margin-bottom: 1rem;
  }
  .content {
    :deep(p) {
      color: v-bind(contentColor);
      font-size: 0.18rem;
      line-height: 0.26rem;
    }
  }
}
</style>
