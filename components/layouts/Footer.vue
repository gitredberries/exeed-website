<template>
  <footer class="md-footer" v-if="showFooter">
    <div class="footer-link-wrapper">
      <div class="link-inner">
        <ul v-for="item in linkList" :key="item">
          <li v-for="i in item" :key="i.text" @click="onLinkClick(i)">
            {{ i.text }}
          </li>
        </ul>
        <div class="footer-social">
          <BaseImg class="footer-logo" :src="'common/logo_white.svg'" />
          <ul>
            <li v-for="item in socialList" @click="onSocialClick(item)">
              <BaseImg :src="item.src" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="md-footer-link-wrapper">
      <li v-for="item in mdLinkList" :class="[item.isActive ? 'active' : '']">
        <div class="main-li" @click="onParentLiClick(item)">
          <span class="main-li-text">{{ item.text }}</span>
          <BaseImg class="main-li-arrow" src="model/es/LeftOutlinedGray.svg" />
        </div>
        <div class="childern-wrapper">
          <div
            class="childern-li"
            v-for="i in item.children"
            @click="onChildrenClick(i)"
          >
            <span class="main-li-text">{{ i.text }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="md-logo-wrapper">
      <BaseImg class="footer-logo" :src="'common/logo_white.svg'" />
    </div>
    <ul class="md-partner">
      <li v-for="item in socialList" @click="onSocialClick(item)">
        <BaseImg :src="item.src" />
      </li>
    </ul>
    <div class="md-privacy">
      <span @click="routerPush('/privacypolicy')">PRIVACY STATEMENT</span>
      <span class="interval">/</span>
      <span @click="routerPush('/legalnotice')">LEGAL NOTICE</span>
    </div>
    <div class="bottom">
      <div class="copyright">© Copyright 2023 Exeed.All Right Reserved.</div>
      <div class="privacy bottom-item" @click="routerPush('/privacypolicy')">
        PRIVACY STATEMENT
      </div>
      <div class="notice bottom-item" @click="routerPush('/legalnotice')">
        LEGAL NOTICE
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from "vue-router";
import { navData } from "./data.js";
import { useHeaderStore } from "@/stores/useHeader.ts";

const router = useRouter();

const headStore = useHeaderStore();

const showFooter = computed(() => headStore.showFooter);

const socialList = reactive([
  {
    id: 1,
    src: "common/camera.svg",
    link: "https://www.instagram.com/exeedglobal/",
  },
  {
    id: 2,
    src: "common/facebook.svg",
    link: "https://www.facebook.com/ExeedGlobal/",
  },
  {
    id: 3,
    src: "common/tiktok.svg",
    link: "https://www.tiktok.com/@exeed_global?lang=en",
  },
  {
    id: 4,
    src: "common/youtube.svg",
    link: "https://www.youtube.com/@EXLANTIX_gobal",
  },
]);

const onSocialClick = (item) => {
  window.open(item.link);
};

const routerPush = (url) => {
  router.push(url);
};

const linkList = reactive([
  [
    {
      text: "Art & Culture",
    },
    {
      text: "Exploration",
      link: navData[0].link,
    },
    {
      text: "Sustainability",
      link: navData[1].link,
    },
  ],
  [
    {
      text: "EXEED Models",
    },
    {
      text: "EXEED VX",
      link: navData[3].children[0].link,
    },
    {
      text: "EXEED RX",
      link: navData[3].children[1].link,
    },
    {
      text: "EXEED TXL",
      link: navData[3].children[2].link,
    },
    {
      text: "EXEED LX",
      link: navData[3].children[3].link,
    },
  ],
  [
    {
      text: "EXLANTIX Models",
    },
    {
      text: "EXLANTIX ES",
      link: navData[3].children[4].link,
    },
    {
      text: "EXLANTIX ET",
      link: navData[3].children[5].link,
    },
  ],
  [
    {
      text: "Tech",
    },
    ...navData[2].children,
  ],
  [
    {
      text: "Event",
    },
    ...navData[4].children,
  ],
]);

const mdLinkList = reactive(
  linkList.map((v) => {
    return {
      text: v[0].text,
      link: v[0].link,
      isActive: false,
      children: v
        .filter((s, i) => i !== 0)
        .map((w) => ({
          text: w.text,
          link: w.link,
          isActive: false,
        })),
    };
  })
);

const onLinkClick = (item) => {
  if (item.link) {
    router.push(`/${item.link}`);
  }
};

const onParentLiClick = (item) => {
  item.isActive = !item.isActive;
};

const onChildrenClick = (item) => {
  router.push(`/${item.link}`);
};
</script>

<style scoped lang="scss">
@import url(./css/footer.scss);
footer {
  background-color: #0d0d0d;
  .footer-link-wrapper {
    .link-inner {
      padding: 0.72rem 1.2rem;
      display: flex;
      justify-content: flex-start;
      position: relative;
      ul {
        margin-right: 0.72rem;
        li {
          color: #b2b2b2;
          cursor: pointer;
          font-size: 0.14rem;
          margin-bottom: 0.2rem;
          &:nth-of-type(1) {
            color: white;
            font-size: 0.16rem;
          }
          &:hover {
            color: white;
          }
        }
      }
    }
    .footer-social {
      position: absolute;
      right: 1.2rem;
      top: 0.72rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .footer-logo {
        width: 1.68rem;
        cursor: pointer;
      }
      ul {
        display: flex;
        margin-right: 0;
        margin-top: 0.4rem;
        li {
          width: 0.2rem;
          margin-right: 0.4rem;
          margin-bottom: 0;
          opacity: 0.5;
          transition: all 0.5s;
          &:nth-last-of-type(1) {
            margin-right: 0;
          }
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
  .md-footer-link-wrapper {
    display: none;
  }
  .md-logo-wrapper {
    display: none;
  }
  .md-partner {
    display: none;
  }
  .md-privacy {
    display: none;
  }
  .bottom {
    display: flex;
    gap: 0.25rem;
    justify-content: center;
    align-items: center;
    font-size: 0.12rem;
    line-height: 0.2rem;
    color: #808080;
    padding-bottom: 0.4rem;
    .bottom-item {
      position: relative;
      cursor: pointer;
      &:hover {
        color: #ffffff;
        &::after {
          color: #808080;
        }
      }
      &::after {
        position: absolute;
        content: "/";
        left: -0.13rem;
        top: 0;
        height: 0;
      }
    }
  }
  .copyright {
    text-align: center;
  }
}
</style>
