<template>
  <div class="find-us-page">
    <NewsBanner title="FIND US" :banner="`${config.public.staticURL}/images/Web-banners/Find_Us.jpg`"/>

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
        <div class="hours-grid">
          <span class="day">Sunday</span><span class="time">10AM–10PM</span>
          <span class="day">Monday</span><span class="time">10AM–10PM</span>
          <span class="day">Tuesday</span><span class="time">10AM–10PM</span>
          <span class="day">Wednesday</span><span class="time">10AM–10PM</span>
          <span class="day">Thursday</span><span class="time">10AM–10PM</span>
          <span class="day">Friday</span><span class="time">10AM–10PM</span>
          <span class="day">Saturday</span><span class="time">10AM–10PM</span>
        </div>
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

    <!-- Divider -->
    <div class="section-divider"></div>

    <!-- Service Centre Section -->
    <section class="location-section">
      <div class="location-info">
        <h2 class="location-title">EXEED Service Centre</h2>
        <p class="location-address">
          Block 646, 1807 Building, Al Rd No 4635, Nuwaidrat
        </p>
        <a class="location-link" href="tel:+97317877007">+973 1787 7007</a>
        <a class="location-link" href="mailto:service@adamasmotors.com.bh">service@adamasmotors.com.bh</a>

        <h3 class="hours-title">Operating Hours</h3>
        <div class="hours-grid">
          <span class="day">Sunday</span><span class="time">9AM–6PM</span>
          <span class="day">Monday</span><span class="time">9AM–6PM</span>
          <span class="day">Tuesday</span><span class="time">9AM–6PM</span>
          <span class="day">Wednesday</span><span class="time">9AM–6PM</span>
          <span class="day">Thursday</span><span class="time">9AM–6PM</span>
          <span class="day">Friday</span><span class="time">Closed</span>
          <span class="day">Saturday</span><span class="time">10AM–4PM</span>
        </div>
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
const config = useRuntimeConfig();

useHead({
  title: 'EXEED Bahrain | Find Our Showroom',
  meta: [
    { name: 'description', content: 'Find contact information for EXEED Bahrain by Adamas Motors, including the location of our Bahrain showroom.' }
  ]
});
</script>

<style lang="scss" scoped>
.find-us-page {
  background: #0d0d0d;
  color: white;
  min-height: 100vh;

  .section-divider {
    height: 0.4rem;
    background: #050505;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
        margin-bottom: 0.14rem;
      }

      .hours-grid {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 0.3rem;
        row-gap: 0.04rem;

        .day {
          font-size: 0.14rem;
          line-height: 0.26rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .time {
          font-size: 0.14rem;
          line-height: 0.26rem;
          color: rgba(255, 255, 255, 0.85);
        }
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
    .section-divider {
      margin: 0 0.3rem;
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
