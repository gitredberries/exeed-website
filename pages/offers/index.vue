<template>
  <div class="offers-page">
    <NewsBanner title="OFFERS" :banner="`${config.public.staticURL}/images/Web-banners/Offers.jpg`"/>
    <section class="offers-content">
      <div class="content-inner">
        <div class="offers-grid">
          <div class="offer-card" v-for="item in offersList" :key="item.id">
            <div class="offer-img-wrapper">
              <img :src="item.imageUrl" alt="" />
            </div>
            <div class="offer-info">
              <div class="offer-title">{{ item.title }}</div>
              <div class="offer-desc" v-html="item.summary"></div>
              <div class="offer-date">{{ item.publishTime }}</div>
            </div>
          </div>
        </div>
        <div v-if="offersList.length === 0" class="no-offers">
          <p>New promotions coming soon. Stay tuned!</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import moment from "moment";

const config = useRuntimeConfig();
const offersList = ref([]);

const getOffers = () => {
  fetch(
    `${config.public.apiURL}api/front/articles?current=1&size=20&siteCode=chery_xt&category=offers`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((res) => {
      if (res.code === 0) {
        const data = res.data;
        offersList.value = (data?.items || []).map((v) => ({
          ...v,
          publishTime: v.publishTime
            ? moment(v.publishTime).format("YYYY/MM/DD")
            : "",
        }));
      }
    });
};

getOffers();
</script>

<style lang="scss" scoped>
.offers-page {
  background: #0d0d0d;
  color: white;
  min-height: 100vh;

  .offers-content {
    padding: 1rem 1.2rem;
    .content-inner {
      .offers-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.3rem;
        .offer-card {
          background: #1a1a1a;
          overflow: hidden;
          transition: transform 0.3s;
          &:hover {
            transform: translateY(-0.05rem);
          }
          .offer-img-wrapper {
            width: 100%;
            aspect-ratio: 16/9;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
          .offer-info {
            padding: 0.2rem;
            .offer-title {
              font-size: 0.18rem;
              font-weight: 500;
              color: #ffffff;
              margin-bottom: 0.1rem;
            }
            .offer-desc {
              font-size: 0.14rem;
              color: rgba(255, 255, 255, 0.7);
              line-height: 0.22rem;
              margin-bottom: 0.1rem;
            }
            .offer-date {
              font-size: 0.12rem;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
      .no-offers {
        text-align: center;
        padding: 1rem 0;
        p {
          font-size: 0.18rem;
          color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .offers-page {
    .offers-content {
      padding: 0.4rem 0.3rem;
      .content-inner .offers-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
