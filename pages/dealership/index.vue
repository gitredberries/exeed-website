<template>
  <div class="dealership-page">
    <section class="dealership-welcome">
      <div class="welcome-text">
        <h2 class="welcome-title">Welcome to EXEED Bahrain</h2>
        <p class="welcome-body">
          EXEED Bahrain is the Kingdom's authorised EXEED partner, dedicated to bringing EXEED's progressive
          luxury and advanced engineering to drivers across Bahrain. We are committed to offering an outstanding,
          personalised ownership experience—covering sales, aftersales and ongoing support—with professionalism,
          technical expertise and meticulous attention to detail. EXEED's modern SUVs are celebrated for their
          striking design, safety innovations and refined comfort; our mission is to match these exceptional
          vehicles with first-class service at every step. Whether you're exploring the latest models, arranging
          a test drive or seeking expert maintenance, the EXEED Bahrain team is ready to assist you.
        </p>
      </div>
      <div class="welcome-image">
        <img class="car-img" src="/images/Web-banners/Dealership_Banner.jpg" alt="EXEED Bahrain" />
      </div>
    </section>
  </div>
</template>

<script setup>
const router = useRouter();

const _models = reactive([
  {
    name: "EXEED VX",
    subtitle: "EXEED Flagship Land Business Jet",
    src: "home/vx.png",
    link: "/vx",
  },
  {
    name: "EXEED RX",
    subtitle: "Commanding Presence. Refined Design.",
    src: "home/rx.png",
    link: "/rx",
  },
  {
    name: "EXEED LX",
    subtitle: "Explore Your Modern Self",
    src: "home/lx.png",
    link: "/lx",
  },
]);
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
