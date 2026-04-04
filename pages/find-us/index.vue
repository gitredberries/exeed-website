<template>
  <div class="find-us-page">
    <!-- Hero Banner -->
    <section class="find-us-hero">
      <div class="hero-overlay">
        <h1 class="hero-title">FIND US</h1>
        <p class="hero-subtitle">Exeed Bahrain</p>
      </div>
    </section>

    <!-- Showroom Section -->
    <section class="location-section">
      <div class="location-info">
        <h2 class="location-title">EXEED Showroom</h2>
        <p class="location-address">
          Bahrain World Trade Center, Moda Mall, Manama, Bahrain
        </p>
        <a class="location-link" href="tel:+97316675007">+973 1667 5007</a>
        <a class="location-link" href="mailto:info@adamasmotors.com.bh">info@adamasmotors.com.bh</a>

        <h3 class="hours-title">Operating Hours</h3>
        <p class="hours-text">Monday – Saturday: 10:00 AM to 10:00 PM</p>
      </div>
      <div class="location-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.5!2d50.5860!3d26.2361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49af7d0d28d8a9%3A0x6c4b37e2e3f0e4a0!2sBahrain%20World%20Trade%20Center!5e0!3m2!1sen!2sbh!4v1700000000000"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>

    <!-- Service Centre Section -->
    <section class="location-section">
      <div class="location-info">
        <h2 class="location-title">EXEED Service Centre</h2>
        <p class="location-address">
          Block 646, 1807 Building, Al Rd No 4635, Nuwaidrat
        </p>
        <a class="location-link" href="tel:+97317877007">+973 17877007</a>
        <a class="location-link" href="mailto:service@adamasmotors.com.bh">service@adamasmotors.com.bh</a>

        <h3 class="hours-title">Operating Hours</h3>
        <p class="hours-text">Friday: Closed</p>
        <p class="hours-text">Saturday: 10:00 AM to 4:00 PM</p>
        <p class="hours-text">Sunday – Thursday: 9:00 AM to 6:00 PM</p>
      </div>
      <div class="location-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.5!2d50.5450!3d26.1800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49b00000000000%3A0x0000000000000000!2sNuwaidrat!5e0!3m2!1sen!2sbh!4v1700000000000"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.find-us-page {
  background: #0d0d0d;
  color: white;
  min-height: 100vh;

  // Hero Banner
  .find-us-hero {
    width: 100%;
    height: 3.8rem;
    margin-top: 0.72rem;
    background-image: url("/images/Web-banners/Find_Us.jpg");
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
        margin-top: 0.06rem;
      }
    }
  }

  // Location Sections
  .location-section {
    display: flex;
    min-height: 4rem;

    .location-info {
      flex: 0 0 45%;
      padding: 0.6rem 0.6rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .location-title {
        font-family: Saira, SairaExpanded, sans-serif;
        font-size: 0.28rem;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: 0.24rem;
      }

      .location-address {
        font-size: 0.14rem;
        line-height: 0.22rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 0.12rem;
      }

      .location-link {
        display: block;
        font-size: 0.14rem;
        line-height: 0.24rem;
        color: #67B0C4;
        text-decoration: none;
        transition: color 0.3s;
        &:hover {
          color: lighten(#67B0C4, 15%);
          text-decoration: underline;
        }
      }

      .hours-title {
        font-family: Saira, SairaExpanded, sans-serif;
        font-size: 0.2rem;
        font-weight: 500;
        color: #ffffff;
        margin-top: 0.32rem;
        margin-bottom: 0.12rem;
      }

      .hours-text {
        font-size: 0.14rem;
        line-height: 0.24rem;
        color: rgba(255, 255, 255, 0.8);
      }
    }

    .location-map {
      flex: 0 0 55%;
      min-height: 3.5rem;
      iframe {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .find-us-page {
    .find-us-hero {
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

    .location-section {
      flex-direction: column;
      min-height: auto;

      .location-info {
        flex: none;
        padding: 0.4rem 0.3rem;
      }

      .location-map {
        flex: none;
        min-height: 2.5rem;
      }
    }
  }
}
</style>
