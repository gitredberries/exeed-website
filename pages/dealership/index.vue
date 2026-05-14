<template>
  <div class="dealership-page">
    <section class="dealership-welcome" v-if="content">
      <div class="welcome-text">
        <h2 class="welcome-title">{{ content.title }}</h2>
        <p class="welcome-body">{{ content.description }}</p>
      </div>
      <div class="welcome-image">
        <img
          class="car-img"
          :src="content.image || '/images/Web-banners/Dealership_Banner.jpg'"
          alt="EXEED Bahrain"
        />
      </div>
    </section>
    <!-- fallback skeleton while loading -->
    <section class="dealership-welcome" v-else-if="pending">
      <div class="welcome-text">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-body"></div>
      </div>
      <div class="welcome-image"></div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

useHead({
  title: 'EXEED Bahrain | Adamas Motor Group',
  meta: [
    { name: 'description', content: 'Visit EXEED Bahrain by Adamas Motors. Explore premium SUV line-up, expert service and great showroom experience.' }
  ]
});

const { data: content, pending } = await useAsyncData('dealership-content', async () => {
  try {
    const res = await $fetch(
      `${config.public.apiURL}api/front/dealership-content?siteCode=chery_xt`
    );
    if (res && res.code === 0) {
      return res.data;
    }
    // fall back to static defaults if no CMS content exists
    return {
      title: 'Welcome to EXEED Bahrain',
      description:
        "EXEED Bahrain is the Kingdom's authorised EXEED partner, dedicated to bringing EXEED's progressive luxury and advanced engineering to drivers across Bahrain. We are committed to offering an outstanding, personalised ownership experience—covering sales, aftersales and ongoing support—with professionalism, technical expertise and meticulous attention to detail. EXEED's modern SUVs are celebrated for their striking design, safety innovations and refined comfort; our mission is to match these exceptional vehicles with first-class service at every step. Whether you're exploring the latest models, arranging a test drive or seeking expert maintenance, the EXEED Bahrain team is ready to assist you.",
      image: '/images/Web-banners/Dealership_Banner.jpg',
    };
  } catch {
    return {
      title: 'Welcome to EXEED Bahrain',
      description:
        "EXEED Bahrain is the Kingdom's authorised EXEED partner, dedicated to bringing EXEED's progressive luxury and advanced engineering to drivers across Bahrain. We are committed to offering an outstanding, personalised ownership experience—covering sales, aftersales and ongoing support—with professionalism, technical expertise and meticulous attention to detail. EXEED's modern SUVs are celebrated for their striking design, safety innovations and refined comfort; our mission is to match these exceptional vehicles with first-class service at every step. Whether you're exploring the latest models, arranging a test drive or seeking expert maintenance, the EXEED Bahrain team is ready to assist you.",
      image: '/images/Web-banners/Dealership_Banner.jpg',
    };
  }
});
</script>

<style lang="scss" scoped>
.dealership-page {
  background: #0d0d0d;
  color: white;
  min-height: 100vh;
  box-sizing: border-box;

  .dealership-welcome {
    display: flex;
    height: calc(100vh - 1.26rem);

    .welcome-text {
      flex: 1;
      background: #ffffff;
      padding: 0.8rem 0.8rem 0.8rem 1.2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .welcome-title {
        font-size: 0.36rem;
        font-weight: 700;
        color: #111111;
        margin-bottom: 0.3rem;
        line-height: 1.2;
      }

      .welcome-body {
        font-size: 0.15rem;
        line-height: 0.28rem;
        color: #333333;
      }
    }

    .welcome-image {
      flex: 1;
      background: #0d0d0d;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;

      .car-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .skeleton {
    background: #e0e0e0;
    border-radius: 4px;
    animation: shimmer 1.5s infinite;

    &-title {
      height: 0.36rem;
      width: 60%;
      margin-bottom: 0.3rem;
    }

    &-body {
      height: 1.5rem;
      width: 100%;
    }
  }

  @keyframes shimmer {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
}

@media screen and (max-width: 1024px) {
  .dealership-page {
    .dealership-welcome {
      flex-direction: column;
      height: auto;
      .welcome-text {
        padding: 0.5rem 0.3rem;
        .welcome-title {
          font-size: 0.28rem;
        }
      }
      .welcome-image {
        min-height: 3rem;
      }
    }
  }
}
</style>
