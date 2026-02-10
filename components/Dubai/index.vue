<script>
const l = 160;
const s = 100;
export default {
  data() {
    return {
      useGraphic: false,
      baseWidth: 480,
      baseHeight: 960,
      scale: 1,
    };
  },
  computed: {
    fontSizeStyle() {
      return `transform: scale(${this.scale ** 2 + 1 + this.scale * 5});`;
    },
    filledTextStyle() {
      return `transform: scale(${this.scale ** 2 + 1 + this.scale * 1});`;
    },
    maskTextStyle() {
      return this.scale ** 13 * l + 1;
    },
    backgroundOverlayOpacity() {
      return this.useGraphic
        ? 0
        : Math.min(Math.max(0.98 - this.scale, 0), 0.98);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.calculateScale, {
      passive: !0,
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.calculateScale);
  },
  methods: {
    calculateScale() {
      const { outerMask: e } = this.$refs,
        t = e ? e.getBoundingClientRect().top : 0,
        { innerHeight: i } = window;
      t > 0
        ? (this.scale = 0)
        : t < i * -1
        ? (this.scale = 1)
        : (this.scale = (t / i / (s / 100)) * -1);
    },
  },
};
</script>

<template>
  <div>
    <div class="textmask">
      <div
        data-analytics-content-milestone="2"
        fill-color="rgb(255,255,255)"
        surface-color="black"
        outlined-text="Limited"
        transparent-text="Merchandise capsule"
        focus-position="48.9"
      >
        <div
          ref="outerMask"
          class="brandhub-text-mask brandhub-text-mask--black"
          style="
            --desktop-focus-point: 48.9%;
            --fill-color: rgb(255, 255, 255);
            --module-height: 270vh;
          "
        >
          <div class="brandhub-text-mask__screen">
            <svg
              class="brandhub-text-mask__mask"
              role="img"
              aria-labelledby="svg-mask-title"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 480 960"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              style=""
            >
              <defs>
                <mask id="clip-2" class="brandhub-text-mask__clip-path">
                  <rect width="100%" height="100%" fill="white" />
                  <text
                    x="240"
                    class="brandhub-text-mask__mask-text"
                    :style="fontSizeStyle"
                    transform-origin="240 480"
                    fill="black"
                    y="500"
                    text-anchor="middle"
                  >
                    <tspan x="50%" dy="-0.6em" class="tspan-exeeder">
                      DUBAI
                    </tspan>
                  </text>
                </mask>
              </defs>
              <g
                class="brandhub-text-mask__svg-group"
                mask="url(#clip-2)"
                :style="filledTextStyle"
              >
                <rect
                  class="brandhub-text-mask__surface"
                  fill="balck"
                  height="960"
                  width="480"
                  x="0"
                  y="0"
                ></rect>
                <text
                  class="brandhub-text-mask__surface-text"
                  fill="transparent"
                  stroke-width="0.02rem"
                  stroke="white"
                  text-anchor="middle"
                  x="240"
                  y="530"
                >
                  <tspan x="50%" dy="-0.8em">Marathon</tspan>
                </text>
              </g>
            </svg>
            <div class="brandhub-text-mask__content">
              <div class="parsys">
                <div class="crossfadescroll">
                  <div data-analytics-content-milestone="2">
                    <div
                      class="brandhub-scroll-cross-fade brandhub-scroll-cross-fade--text-mask-child brandhub-scroll-cross-fade--in"
                      dataanalyticscontentmilestone="2"
                      style=""
                    >
                      <div class="brandhub-scroll-cross-fade__content">
                        <video
                          poster="https://static-resource-data.obs.cn-east-3.myhuaweicloud.com/design-middle-center/poster.png"
                          src="https://static-resource-data.obs.cn-east-3.myhuaweicloud.com/design-middle-center/home.mp4"
                          class="brandhub-scroll-cross-fade__item brandhub-scroll-cross-fade__item--visible"
                          autoplay
                          muted
                          webkit-playsinline
                          playsinline
                          preload="metadata"
                          loop
                        ></video>
                        <div
                          class="brandhub-scroll-cross-fade__transparent"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style data-v-ce-root="" scoped>
.brandhub-text-mask {
  --surface-color: var(--wb-black);
  --text-mask-height: 100vh;
  min-height: var(--module-height, 140vh);
}
.brandhub-text-mask--white {
  --surface-color: var(--wb-white);
}
.brandhub-text-mask--theme {
  --surface-color: var(--campaign-primary);
}
.brandhub-text-mask--edit-mode {
  --module-height: 800px;
}
.brandhub-text-mask--edit-mode .brandhub-text-mask__screen {
  height: 800px;
}
.brandhub-text-mask__screen {
  display: grid;
  grid-template: "content" 100%/100%;
  height: 100vh;
  overflow: hidden;
  position: sticky;
  top: 0;
  width: 100%;
}
.brandhub-text-mask__mask {
  display: block;
  grid-area: content;
  height: 100%;
  opacity: 1;
  overflow: hidden;
  width: 100%;
  z-index: 5;
}
@media (max-width: 767px) {
  .brandhub-text-mask__mask {
    transform: scale(1.3);
  }
}
.brandhub-text-mask__mask--black {
  background: var(--wb-black);
}
.brandhub-text-mask__mask--white {
  background: var(--wb-white);
}
.brandhub-text-mask__mask--fade-in-ready .brandhub-text-mask__transparent-text {
  transform: translateY(4rem);
  transition: transform 1s;
}
.brandhub-text-mask__mask--fade-in-ready
  .brandhub-text-mask__see-through-surface {
  fill: var(--surface-color, var(--wb-black));
  transition: fill 1s;
}
.brandhub-text-mask__mask--fade-in-ready .brandhub-text-mask__surface-text {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 1s, transform 1s;
}
.brandhub-text-mask__mask--fading-in .brandhub-text-mask__transparent-text {
  transform: translateY(0);
}
.brandhub-text-mask__mask--fading-in .brandhub-text-mask__see-through-surface {
  fill: var(--fill-color, var(--wb-white));
}
.brandhub-text-mask__mask--fading-in .brandhub-text-mask__surface-text {
  opacity: 0.7;
  transform: translateY(0);
}
.brandhub-text-mask__mask text {
  line-height: 1em;
}
.brandhub-text-mask__clip-path,
.brandhub-text-mask__svg-group {
  transform-origin: var(--desktop-focus-point, 50%) 51%;
}
.brandhub-text-mask__mask-text {
  font-size: 1.25rem;
}
.brandhub-text-mask__surface {
  /* fill: red; */
}
.brandhub-text-mask__surface-text {
  font-size: 0.75rem;
  opacity: 0.7;
  stroke: var(--fill-color, var(--wb-white));
  stroke-width: 0.005em;
  z-index: 2;
}
@media (max-width: 1024px) {
  .brandhub-text-mask__surface-text {
    /* font-size: clamp(6rem, 12vw, 11.25rem); */
  }
}
.brandhub-text-mask__content {
  grid-area: content;
  min-height: 100vh;
  width: 100%;
}
.brandhub-text-mask__content--mask {
  mask: url(#mask);
}
.brandhub-text-mask__background-overlay {
  background: var(--fill-color);
  grid-area: content;
  height: 100%;
  width: 100%;
  z-index: 1;
}
</style>

<style data-v-ce-141="">
.brandhub-picture {
  width: 100%;
}
.brandhub-picture--cover,
.brandhub-picture--contain {
  display: block;
  height: 100%;
}
.brandhub-picture--cover,
.brandhub-picture--cover img {
  object-fit: cover;
}
.brandhub-picture--contain,
.brandhub-picture--contain img {
  object-fit: contain;
}
</style>

<style data-v-ce-root="">
.brandhub-scroll-cross-fade {
  color: var(--text-on-base-color);
  height: var(--item-height, 100vh);
  width: 100%;
}
.brandhub-scroll-cross-fade--inverted {
  color: var(--base-color);
}
.brandhub-scroll-cross-fade--theme {
  color: var(--campaign-primary);
}
.brandhub-scroll-cross-fade--standalone {
  opacity: 0;
  transform: translateY(2.1428571429rem);
  transition: transform 0.5s ease-out 0.2s, opacity 0.5s ease-out 0.2s;
}
.brandhub-scroll-cross-fade--standalone.brandhub-scroll-cross-fade--in {
  opacity: 1;
  transform: translate(0);
}
.brandhub-scroll-cross-fade__content {
  display: grid;
  grid-template: "content" 100%;
  height: 100vh;
  left: 0;
  position: sticky;
  top: 0;
  width: 100%;
}
.brandhub-scroll-cross-fade__transparent {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  grid-area: content;
  margin-right: auto;
  opacity: 0;
  transition: opacity 1s;
  width: 100%;
  z-index: 1;
}
@media (max-width: 1024px) {
  .brandhub-scroll-cross-fade__transparent {
    height: 50%;
    margin-top: auto;
  }
}
@media (min-width: 1024px) {
  .brandhub-scroll-cross-fade__transparent {
    background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
    width: 50%;
  }
}
.brandhub-scroll-cross-fade__transparent--visible {
  opacity: 1;
}
.brandhub-scroll-cross-fade__container {
  padding-left: 1.1428571429rem;
  padding-right: 1.1428571429rem;
  align-items: center;
  display: flex;
  grid-area: content;
  justify-content: flex-start;
  z-index: 1;
}
@media (min-width: 768px) {
  .brandhub-scroll-cross-fade__container {
    padding-left: 2.2857142857rem;
    padding-right: 2.2857142857rem;
  }
}
@media (min-width: 1024px) {
  .brandhub-scroll-cross-fade__container {
    padding-left: 6.5714285714rem;
    padding-right: 6.5714285714rem;
  }
}
@media (min-width: 1440px) {
  .brandhub-scroll-cross-fade__container {
    padding-left: 8.2857142857rem;
    padding-right: 8.2857142857rem;
  }
}
@media (min-width: 1920px) {
  .brandhub-scroll-cross-fade__container {
    padding-left: 8.5714285714rem;
    padding-right: 8.5714285714rem;
  }
}
.brandhub-scroll-cross-fade__text-wrapper {
  font-weight: 400;
  line-height: 1em;
  font-size: 3.9285714286rem;
  margin-right: auto;
  width: 100%;
}
@media (min-width: 480px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    font-size: 5.2142857143rem;
  }
}
@media (min-width: 768px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    font-size: 7.1428571429rem;
  }
}
@media (min-width: 1280px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    font-size: 7.8571428571rem;
  }
}
@media (min-width: 1440px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    font-size: 8.5714285714rem;
  }
}
@media (min-width: 1680px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    font-size: 10rem;
  }
}
@media (min-width: 1920px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    font-size: 11.4285714286rem;
  }
}
@media (min-width: 768px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    width: 84%;
  }
}
@media (max-width: 1024px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    margin-top: auto;
    padding-bottom: 10vh;
  }
}
@media (min-width: 1024px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    width: 65%;
  }
}
@media (min-width: 1280px) {
  .brandhub-scroll-cross-fade__text-wrapper {
    width: 47vw;
  }
}
.brandhub-scroll-cross-fade__item {
  object-fit: cover;
  grid-area: content;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 1s;
  width: 100%;
  z-index: 1;
}
.brandhub-scroll-cross-fade__item--visible {
  opacity: 1;
  pointer-events: auto;
}
.brandhub-scroll-cross-fade__video video {
  object-fit: cover;
}
.brandhub-text-mask__mask-text {
  transform-origin: 51% 49.3%;
}
.brandhub-text-mask__mask-text tspan:nth-child(1) {
  font-size: 0.4rem; /* 设置第一个 tspan 的字体大小 */
}

.brandhub-text-mask__mask-text tspan:nth-child(2) {
  font-size: 0.6rem; /* 设置第二个 tspan 的字体大小 */
}
</style>
