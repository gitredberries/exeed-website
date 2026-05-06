// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  css: [
    "~/assets/css/index.scss",
    "~/assets/css/font.css",
    "~/assets/css/animation.css",
    "~/assets/css/common.scss",
    "element-plus/dist/index.css",
    "swiper/css",
    "swiper/css/pagination",
    "swiper/css/scrollbar",
    "swiper/css/mousewheel",
    "swiper/css/navigation",
    "swiper/css/effect-fade",
    "@/assets/css/cookie.css",
  ],
  runtimeConfig: {
    public: {
      staticURL: process.env.NUXT_STATIC_BASE_URL, // 暴露在前端
      apiURL: process.env.NUXT_API_URL,
      oosURL: process.env.NUXT_OOS_URL,
      // apiUrl: process.env.NUXT_API_KEY,
    },
  },
  app: {
    baseURL: process.env.NUXT_API_KEY,
    head: {
      title: "EXEED Bahrain - Adamas Motors",
      meta: [
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
        },
        {
          name: "keywords",
          content: `EXEED,TX,TXL`,
        },
        {
          name: "description",
          content: `Welcome to EXEED website. EXEED takes Exceed as its core brand value. It is dedicated to upgrading each and every experience point of consumers�travel and providing the travel experience that exceeds expectations. On EXEED website, you can find price, configurations, parameters and other information of latest EXEED models including TX and TXL. The website illustrates EXEED culture, provides online query service and test-drive appointment service for TX and TXL models. For more information, please log onto EXEED website.`,
        },
      ],
      script: [
        // Google Tag Manager
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K4XMBBSZ');`,
          type: "text/javascript",
        },
        // Google tag (gtag.js) - GA4: G-LWN11QLX86
        { src: "https://www.googletagmanager.com/gtag/js?id=G-LWN11QLX86", async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-LWN11QLX86');`,
          type: "text/javascript",
        },
        // Google tag (gtag.js) - GA4: G-WNED626QHL
        { src: "https://www.googletagmanager.com/gtag/js?id=G-WNED626QHL", async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-WNED626QHL');`,
          type: "text/javascript",
        },
        // Meta Pixel Code
        {
          innerHTML: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3831278527102130');
fbq('track', 'PageView');`,
          type: "text/javascript",
        },
      ],
      noscript: [
        // Meta Pixel noscript fallback
        {
          innerHTML: `<img height="1" width="1" src="https://www.facebook.com/tr?id=3831278527102130&ev=PageView&noscript=1"/>`,
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "@pinia/nuxt",
    "nuxt-swiper",
    "@element-plus/nuxt",
    "pinia-plugin-persistedstate/nuxt",
  ],
  piniaPluginPersistedstate: {
    storage: "localStorage", // 默认存储方式
    cookieOptions: {
      maxAge: 2 * 365 * 24 * 60 * 60 * 1000, // Cookie 的过期时间，单位为毫秒
      sameSite: "lax", // Cookie 的 SameSite 属性
    },
  },
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    config: {
      content: ["./pages/**/*.vue", "./assets/css/*.scss"],
      theme: {
        extend: {
          // fontFamily: {
          //   MiSansLight: ['MiSansLight', 'sans-serif'],
          //   MiSansNormal: ['MiSansNormal', 'sans-serif'],
          //   MiSansRegular: ['MiSansRegular', 'sans-serif'],
          //   MiSansMedium: ['MiSansMedium', 'sans-serif'],
          // },
          colors: {
            primary: "#67B0C4",
          },
        },
      },
      plugins: [],
    },
  },
  image: {
    inject: true,
    quality: 80,
    format: ["webp", "png", "jpg"],
    // domains: ['nuxtjs.org'] // 启用外部网站的图像优化
    providers: {
      customProvider: {
        name: "customProvider",
        provider: "~/providers/customProvider",
        options: {
          baseURL: `${process.env.NUXT_STATIC_BASE_URL}/images`,
        },
      },
    },
  },
  pinia: {
    storesDirs: ["~/stores/**"],
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "https://cms-client.omodaglobal.com/api",
        prependPath: true,
        changeOrigin: true,
      },
      "/jaecoo-omoda": {
        target: "https://oj-uat.omodaglobal.com/jaecoo-omoda",
        prependPath: true,
        changeOrigin: true,
      },
      "/static-files": {
        target: "https://oj-uat.omodaglobal.com/static-files",
        prependPath: true,
        changeOrigin: true,
      },
      "/OMODAweb-360-new": {
        target: "https://oj-uat.omodaglobal.com/OMODAweb-360-new",
        prependPath: true,
        changeOrigin: true,
      },
      "/e5360": {
        target: "https://oj-uat.omodaglobal.com/e5360",
        prependPath: true,
        changeOrigin: true,
      },
    },
  },
});
