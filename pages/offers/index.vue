<template>
  <div class="offers-page">
    <section class="offers-hero">
      <div class="hero-overlay">
        <h1 class="hero-title">OFFERS</h1>
        <p class="hero-subtitle">Explore the latest seasonal promotions</p>
      </div>
    </section>
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

  .offers-hero {
    width: 100%;
    height: 3.8rem;
    margin-top: 0.72rem;
    background-image: url("/images/Web-banners/Offers.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;

    .hero-overlay {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.7) 0%,
        rgba(0, 0, 0, 0.2) 40%,
        rgba(0, 0, 0, 0) 60%
      );
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 0.5rem 0.6rem;

      .hero-title {
        font-family: Saira, SairaExpanded, sans-serif;
        font-size: 0.52rem;
        font-weight: 300;
        line-height: 0.64rem;
        letter-spacing: 0.02rem;
        color: #ffffff;
      }
      .hero-subtitle {
        font-family: Saira, sans-serif;
        font-size: 0.16rem;
        font-weight: 300;
        color: rgba(255, 255, 255, 0.85);
        margin-top: 0.08rem;
        font-style: italic;
      }
    }
  }

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
    .offers-hero {
      height: 1.6rem;
      margin-top: 0.52rem;
      .hero-overlay {
        padding: 0.24rem 0.3rem;
        .hero-title {
          font-size: 0.28rem;
          line-height: 0.36rem;
        }
        .hero-subtitle {
          font-size: 0.12rem;
          margin-top: 0.04rem;
        }
      }
    }
    .offers-content {
      padding: 0.4rem 0.3rem;
      .content-inner .offers-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>
