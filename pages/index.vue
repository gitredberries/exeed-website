<template>
  <div class="exploration-page">
    <!-- 第一屏 -->
    <section class="hero-section" ref="section0Ref">
      <BannerSwiper
        :list="s1List"
        @touchMove="touchMove"
        @touchStart="mouseHoverRef?.onMouseLeave()"
        @touchEnd="mouseHoverRef?.onMouseEnter()"
      >
        <template #default="{ item }">
          <div
            class="hero-content-wrapper"
            @mouseenter="() => mouseHoverRef?.onMouseEnter()"
            @mouseleave="() => mouseHoverRef?.onMouseLeave()"
            @click="onExploreClick(item.link)"
          >
            <div class="hero-text">
              <div class="hero-text-title">{{ item.title }}</div>
              <div class="hero-text-content">{{ item.subtitle }}</div>
            </div>
            <img class="hero-image-bg" :src="item.image" alt="" />
            <img class="hero-image-bg hero-image-bg-md" :src="item.imageMobile ? item.imageMobile : item.image" alt="" />
          </div>
          <ul class="desc-wrapper">
            <li v-for="v in item.descList">
              <div class="num">{{ v.num }}</div>
              <div class="name">{{ v.name }}</div>
            </li>
          </ul>
        </template>
      </BannerSwiper>
      <MouseHover text="EXPLORE" ref="mouseHoverRef" />
    </section>
    <!-- 第二屏 -->
    <section class="section-2" ref="section2Ref">
      <div :class="['page2-container', isS2Active && 'active']">
        <div
          class="page2-inner"
          v-for="(item, index) in s2List"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div class="desc-wrapper">
            <div class="title" :style="{ transitionDelay: `${index * 0.2}s` }">
              <span>{{ item.title }}</span>
              <BaseImg v-if="item.withFlash" src="common/flash_blue.svg" />
            </div>
            <div
              class="subtitle"
              :style="{ transitionDelay: `${0.2 + index * 0.2}s` }"
            >
              {{ item.subtitle }}
            </div>
            <div
              class="explore-more-wrapper"
            >
              <div class="explore-more" @click="onExploreClick(item.link)">
                <span>EXPLORE MORE</span>
                <BaseImg src="common/right_arrow_light.svg" />
              </div>
            </div>
          </div>
          <BaseImg class="img-bg" :src="item.src" />
          <BaseImg class="img-bg md-img-bg" :src="item.mdSrc" />
        </div>
      </div>
    </section>
    <!-- 第三屏 -->
    <section class="section-3" ref="section3Ref">
      <div class="page3-title">EXEED Tech</div>
      <div :class="['page3-container', isS3Active && 'active']">
        <div
          class="page3-card"
          v-for="(item, index) in s3List"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div class="desc-wrapper">
            <div
              class="title"
              :style="{ transitionDelay: `${0.2 + index * 0.2}s` }"
            >
              {{ item.title }}
            </div>
            <div
              class="explore-more"
              @click="onExploreClick(item.link)"
            >
              <span>EXPLORE MORE</span>
              <BaseImg src="common/right_arrow_light.svg" />
            </div>
          </div>
          <BaseImg class="page3-bg" :src="item.src" />
          <BaseImg class="page3-bg page3-bg-md" :src="item.mdSrc" />
        </div>
      </div>
    </section>
    <!-- 第四屏 -->
    <section class="section-4" ref="section6Ref">
      <HomeSwiper></HomeSwiper>
    </section>
  </div>
</template>

<script setup>
import { Fetch } from "@/utils/common";
import { navData } from "@/components/layouts/data";
import { calcSrollDis } from "@/utils/common";

// 创建所有section的引用
const section0Ref = ref(null);
const section2Ref = ref(null);
const section3Ref = ref(null);
const section6Ref = ref(null);

const isS2Active = ref(false);
const isS3Active = ref(false);

const mouseHoverRef = ref();

const s1List = ref([]);

const findLink = (linkName) => {
  let link = "/";
  navData.forEach((item) => {
    if (item.text.toLowerCase() === linkName.toLowerCase()) {
      link = item.link;
    } else if (Array.isArray(item.children)) {
      let obj = item.children.find(
        (v) => v.text.toLowerCase() === linkName.toLowerCase()
      );
      if (obj) {
        link = obj.link;
      }
    }
  });
  return link;
};

const getData = () => {
  Fetch("home-s1").then((data) => {
    s1List.value = data
      .map((v) => ({
        ...v,
        subtitle: v.jsondef?.subtitle || "",
        link: findLink(v.jsondef?.linkName),
        descList: v.jsondef?.descList || [],
      }))
      .sort((a, b) => a.sort - b.sort);
  });
};

const s2List = reactive([
  {
    src: "home/vx.png",
    mdSrc: "home/vx-md.png",
    title: "EXEED VX",
    subtitle: "LAND BUSINESS JET",
    link: "/vx",
  },
  {
    src: "home/rx.png",
    title: "EXEED RX",
    mdSrc: "home/rx-md.png",
    subtitle: "KEEP EXPLORING,(CDC)NEVER WOBBLING",
    link: "/rx",
  },
  {
    src: "home/txl.png",
    mdSrc: "home/txl-md.png",
    title: "EXEED TXL",
    subtitle: "SAFETY AND BUSINESS SUV",
    link: "/txl",
  },
  {
    src: "home/lx.png",
    mdSrc: "home/lx-md.png",
    title: "EXEED LX",
    subtitle: "EXPLORE YOUR MODERN SELF",
    link: "/lx",
  },
  {
    src: "home/es.png",
    mdSrc: "home/es-md.png",
    title: "EXLANTIX ES",
    subtitle: "CONTROL YOUR FURIOUS JOURNEY",
    link: "/es",
    withFlash: true,
  },
  {
    src: "home/et.png",
    mdSrc: "home/et-md.png",
    title: "EXLANTIX ET",
    subtitle: "CONTROL YOUR FURIOUS JOURNEY",
    link: "/et",
    withFlash: true,
  },
]);

const s3List = reactive([
  {
    title: "REEV",
    src: "home/page3-1.png",
    mdSrc: "home/page3-1-md.png",
    link: "/techReev",
  },
  {
    title: "PERFORMANCE",
    src: "home/page3-2.png",
    mdSrc: "home/page3-2-md.png",
    link: "/awd",
  },
  {
    title: "SAFETY",
    src: "home/page3-3.png",
    mdSrc: "home/page3-3-md.png",
    link: "/safety",
  },
]);

const router = useRouter();

const touchMove = (e) => {
  mouseHoverRef.value?.onTouchMove(null, e);
};

const onExploreClick = (link) => {
  router.push(link);
};

calcSrollDis(section2Ref, [
  {
    dom: section2Ref,
    percent: 0.2,
    active: isS2Active,
  },
]);

calcSrollDis(section3Ref, [
  {
    dom: section3Ref,
    percent: 0.2,
    active: isS3Active,
  },
]);

getData();
</script>

<style lang="scss" scoped>
$commonSpace: 0.03rem;
.exploration-page {
  //     /* 新增部分 */
  .exeeder-wrapper {
    position: sticky;
    top: 0;
  }

  // 通用样式（不需要区分设备的样式）
  .section {
    background-color: #000000;
    color: white;
    position: relative;
    z-index: 2;
  }

  section {
    width: 100%;
    // height: 10.8rem;
    position: relative;
  }

  .hero-section {
    position: relative;
    height: 100vh;
    background: black;
    .hero-content-wrapper {
      width: 100%;
      height: 100%;
      cursor: none;
      &:active {
        cursor: grab;
      }
    }

    .explore-more {
      display: flex;
      position: absolute;
      left: 1.2rem;
      bottom: 1rem;
      font-size: 0.14rem;
      height: 0.4rem;
      line-height: 0.4rem;
      color: white;
      border-radius: 0.02rem;
      /* 图片/图片1 */
      border: 0.01rem solid #ffffff;
      padding: 0 0.2rem;
      cursor: pointer;
      img {
        width: 0.16rem;
        margin-left: 0.08rem;
      }
    }

    .desc-wrapper {
      position: absolute;
      left: 1.2rem;
      bottom: 1rem;
      display: flex;
      li {
        margin-right: 0.64rem;
        .num {
          font-size: 0.4rem;
          line-height: 0.48rem;
          margin-bottom: 0.08rem;
          color: white;
        }
        .name {
          font-size: 0.16rem;
          line-height: 0.24rem;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }

    .hero-image-bg {
      position: relative;
      top: 0;
      left: 0;
      z-index: -1;
      height: 100%;
      width: 100%;
      object-fit: cover;

      img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
      }
    }
    .hero-image-bg-md{
      display: none;
    }

    .hero-text-bg {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      height: 5.34rem;
      z-index: 1;
      opacity: 1;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 10%,
        rgba(5, 8, 18, 0.69) 60%,
        rgba(8, 12, 27, 0.85) 91%
      );
    }

    .hero-text {
      position: absolute;
      left: 1.2rem;
      top: 2.2rem;
      z-index: 1;

      .hero-text-title {
        font-family: SairaExpanded;
        font-size: 0.52rem;
        font-weight: 500;
        line-height: 0.6rem;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
      }

      .hero-text-content {
        margin-top: 0.08rem;
        font-family: Saira;
        font-size: 0.2rem;
        font-weight: normal;
        line-height: 0.24rem;
        letter-spacing: 0px;
        font-variation-settings: "opsz" auto;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .section-2 {
    width: 100%;
    height: auto;
    margin-top: 0.03rem;
    .page2-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .page2-inner {
        width: calc((100% - $commonSpace) / 2);
        margin-bottom: 0.03rem;
        position: relative;
        overflow: hidden;
        transition: all 0.5s;
        opacity: 0;
        transform: translateY(1rem);
        .desc-wrapper {
          width: 100%;
          text-align: center;
          position: absolute;
          top: 0.72rem;
          z-index: 1;
          .title {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.4rem;
            line-height: 0.48rem;
            color: white;
            transition: all 0.5s;
            opacity: 0;
            transform: translateX(1rem);
            img {
              width: 0.14rem;
              margin-left: 0.08rem;
            }
          }
          .subtitle {
            font-size: 0.16rem;
            line-height: 0.24rem;
            margin-top: 0.08rem;
            color: white;
            transition: all 0.5s;
            opacity: 0;
            transform: translateX(1rem);
          }
          .explore-more-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-top: 0.2rem;
            transition: all 0.5s;
            opacity: 0;
            transform: translateX(1rem);
            .explore-more {
              padding: 0 0.2rem 0 0.24rem;
              height: 0.35rem;
              font-size: 0.14rem;
              line-height: 0.35rem;
              opacity: 0.7;
              color: white;
              display: flex;
              text-align: center;
              cursor: pointer;
              transition: all 0.5s;
              img {
                width: 0.16rem;
                margin-left: 0.08rem;
              }
              &:hover {
                opacity: 1;
              }
            }
          }
        }
        .img-bg {
          width: 100%;
          aspect-ratio: 48/29;
          object-fit: cover;
          transition: all 0.5s;
          &:hover {
            transform: scale(var(--scale-img));
          }
        }
        .md-img-bg {
          display: none;
        }
      }
    }
    .page2-container.active {
      .page2-inner {
        opacity: 1;
        transform: translateY(0);
        .desc-wrapper {
          .title {
            opacity: 1;
            transform: translateX(0);
          }
          .subtitle {
            opacity: 1;
            transform: translateX(0);
          }
          .explore-more-wrapper {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }
    }
  }

  .section-3 {
    .page3-title {
      margin-left: 1.2rem;
      margin-top: 1.4rem;
      font-family: Saira;
      font-size: 46px;
      font-weight: 500;
      line-height: 54px;
      letter-spacing: normal;
      /* 白色/白色1 */
      color: #1a1a1a;
    }

    .page3-container {
      display: flex;
      margin: 0.7rem 1.2rem 0.5rem 1.2rem;
      justify-content: space-between;
      .page3-card {
        width: calc((100% - $commonSpace * 2) / 3);
        position: relative;
        overflow: hidden;
        transition: all 0.5s;
        opacity: 0;
        transform: translateY(1rem);
        .desc-wrapper {
          position: absolute;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          left: 0;
          bottom: 0.37rem;
          z-index: 1;
          .title {
            font-size: 0.4rem;
            line-height: 0.48rem;
            color: white;
            transition: all 0.5s;
            opacity: 0;
            transform: translateX(1rem);
          }
          .explore-more {
            width: fit-content;
            display: flex;
            align-items: center;
            height: 0.35rem;
            font-size: 0.14rem;
            line-height: 0.35rem;
            padding: 0 0.2rem 0 0.24rem;
            color: white;
            transition: all 0.5s;
            opacity: 0;
            transform: translateX(1rem);
            margin-top: 0.08rem;
            cursor: pointer;
            &:hover {
              opacity: 1;
            }
            img {
              margin-left: 0.08rem;
              width: 0.16rem;
            }
          }
        }
        .page3-bg {
          width: 100%;
          aspect-ratio: 0.72;
          object-fit: cover;
          transition: all 0.5s;
          &:hover {
            transform: scale(var(--scale-img));
          }
        }
        .page3-bg-md {
          display: none;
        }
      }
    }
    .page3-container.active {
      .page3-card {
        opacity: 1;
        transform: translateY(0);
        .desc-wrapper {
          .title {
            opacity: 1;
            transform: translateX(0);
          }
          .explore-more {
            opacity: 0.7;
            transform: translateX(0);
            &:hover {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  // 移动端样式（1024px 及以下）
  @media screen and (max-width: 1024px) {
    section {
      width: 100%;
      height: 100vh;
      position: relative;
      overflow: hidden;
    }

    .hero-section {
      display: flex;
      flex-direction: column;
      .hero-image-bg{
        display: none;
      }
      .hero-image-bg-md {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        display: block;

        img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          position: absolute;
          z-index: -1;
        }
      }

      .hero-text-bg {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
        opacity: 1;
        opacity: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #0b0f12 69%);
      }

      .hero-content-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        .hero-text {
          position: absolute;
          top: 1.32rem;
          left: 0.2rem;
          z-index: 1;
          .hero-text-title {
            font-size: 0.26rem;
            line-height: 0.3rem;
            margin-bottom: 0.12rem;
          }
          .hero-text-content {
            font-size: 0.14rem;
            line-height: 0.2rem;
          }
        }
      }
      .desc-wrapper {
        position: absolute;
        bottom: 1.02rem;
        left: 0.2rem;
        z-index: 2;
        display: block;
        li {
          margin-bottom: 0.12rem;
          .num {
            font-size: 0.24rem;
            line-height: 0.32rem;
          }
          .name {
            font-size: 0.12rem;
            line-height: 0.2rem;
          }
        }
      }
    }

    .section-2 {
      height: auto;
      margin-top: 0.04rem;
      .page2-container {
        justify-content: flex-start;
        .page2-inner {
          width: 100%;
          margin-bottom: 0.04rem;
          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
          .desc-wrapper {
            top: 0.24rem;
            .title {
              font-size: 0.2rem;
              line-height: 0.3rem;
              img {
                width: 0.12rem;
              }
            }
            .subtitle {
              font-size: 0.14rem;
              line-height: 0.3rem;
            }
            .explore-more-wrapper {
              margin-top: 0;
            }
          }
          .img-bg {
            display: none;
          }
          .md-img-bg {
            display: block;
            aspect-ratio: 1.25;
          }
        }
      }
    }

    .section-3 {
      height: auto;
      .page3-title {
        margin: 0.4rem auto 0.4rem 0.2rem;
        font-size: 0.26rem;
        line-height: 0.3rem;
      }

      .page3-container {
        margin: 0;
        flex-direction: column;
        .page3-card {
          width: 100%;
          margin-bottom: 0.04rem;
          &:nth-last-of-type(1) {
            margin-bottom: 0;
          }
          .desc-wrapper {
            bottom: 50%;
            transform: translateY(50%);
            .title {
              font-size: 0.18rem;
              line-height: 0.26rem;
            }
            .explore-more {
              font-size: 0.12rem;
              line-height: 0.2rem;
              height: 0.2rem;
              margin-top: 0.04rem;
              img {
                width: 0.16rem;
              }
            }
          }
          .page3-bg {
          }
          .page3-bg-md {
          }
          .page3-bg {
            display: none;
          }
          .page3-bg-md {
            display: block;
            aspect-ratio: 1.8;
          }
        }
      }
    }

    .section-4 {
      height: auto;
    }
  }
}
</style>
