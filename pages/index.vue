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
            @click="item.link && onExploreClick(item.link)"
          >
            <div class="hero-text">
              <div class="hero-text-title">{{ item.title }}</div>
              <div class="hero-text-content">{{ item.subtitle }}</div>
            </div>
            <img class="hero-image-bg" :src="item.image" alt="" />
            <img
              class="hero-image-bg hero-image-bg-md"
              :class="{ 'hero-image-bg-md--welcome': item.id === 'welcome' }"
              :src="item.imageMobile ? item.imageMobile : item.image"
              alt=""
            />
          </div>
          <div v-if="item.bottomText" class="welcome-bottom-text">
            {{ item.bottomText }}
          </div>
          <ul v-else class="desc-wrapper">
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
          :class="{ 'welcome-card': item.isWelcome }"
        >
          <template v-if="item.isWelcome">
            <div class="welcome-card-content" @click="onExploreClick(item.link)" style="cursor: pointer;">
              <div class="welcome-card-top">
                <div class="welcome-card-title">{{ item.title }}</div>
                <div class="welcome-card-subtitle">{{ item.subtitle }}</div>
              </div>
              <div class="welcome-card-bottom">
                {{ item.bottomText }}
              </div>
            </div>
            <img class="img-bg welcome-img" :src="item.imgSrc" alt="" />
          </template>
          <template v-else>
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
          </template>
        </div>
      </div>
    </section>
    <!-- 第四屏 -->
    <section class="section-4" ref="section6Ref">
      <HomeSwiper></HomeSwiper>
    </section>
    <!-- Lead Capture Section -->
    <section class="section-5 lead-capture">
      <div class="lead-capture-inner">
        <h2 class="lead-title">Enquire Now</h2>
        <form class="lead-form" @submit.prevent="onLeadSubmit">
          <div class="form-row">
            <div class="form-group">
              <input v-model="leadForm.firstName" type="text" required placeholder="First Name" />
            </div>
            <div class="form-group">
              <input v-model="leadForm.lastName" type="text" required placeholder="Last Name" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <input v-model="leadForm.email" type="email" required placeholder="Email" />
            </div>
            <div class="form-group">
              <input v-model="leadForm.phone" type="tel" required placeholder="Phone Number" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <select v-model="leadForm.enquiryType" required>
                <option value="" disabled>Enquiry Type</option>
                <option value="sales">Sales Enquiry</option>
                <option value="test-drive">Test Drive</option>
                <option value="service">Service &amp; Maintenance</option>
                <option value="general">General Enquiry</option>
              </select>
            </div>
            <div class="form-group">
              <select v-model="leadForm.model">
                <option value="" disabled>Select Models</option>
                <option value="EXEED VX">EXEED VX</option>
                <option value="EXEED LX">EXEED LX</option>
                <option value="EXEED RX">EXEED RX</option>
              </select>
            </div>
          </div>
          <div class="form-group full-width">
            <textarea v-model="leadForm.query" rows="3" placeholder="Your Query"></textarea>
          </div>

          <div class="marketing-section">
            <h3 class="marketing-title">MARKETING PREFERENCES</h3>
            <p class="marketing-desc">
              To ensure you are kept up to date with Adamas Motors &amp; its automotive brands news and
              product and service information, please provide your contact preferences below.
            </p>
            <p class="marketing-prompt">
              I would like to receive marketing communications from Adamas Motors &amp; its brands via:
            </p>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="leadForm.marketingPhone" />
                <span>Phone</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="leadForm.marketingEmail" />
                <span>Email</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" v-model="leadForm.marketingSms" />
                <span>SMS / MMS</span>
              </label>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLeadSubmitting">
            {{ isLeadSubmitting ? 'SUBMITTING...' : 'SUBMIT DETAILS' }}
          </button>

          <div v-if="leadSubmitMessage" :class="['submit-message', leadSubmitSuccess ? 'success' : 'error']">
            {{ leadSubmitMessage }}
          </div>
        </form>
      </div>
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
const section6Ref = ref(null);

const isS2Active = ref(false);

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

// Allowed banner linkNames for EXEED Bahrain (order defines slide order after welcome)
const allowedBannerLinks = ["lx", "rx", "vx"];

const welcomeBanner = {
  id: "welcome",
  title: "WELCOME TO EXEED BAHRAIN",
  subtitle: "By Adamas Motor Group",
  image: "/images/Web-banners/Welcome_Banner.jpg",
  imageMobile: "/images/Web-banners/Welcome_Banner.jpg",
  bottomText: "Enter a New Era of Premium Automotive Design and Technology",
  descList: [],
  link: null,
  sort: -1,
};

const getData = () => {
  Fetch("home-s1").then((data) => {
    const slides = data
      .filter((v) => {
        const linkName = v.jsondef?.linkName?.toLowerCase();
        return linkName && allowedBannerLinks.includes(linkName);
      })
      .map((v) => ({
        ...v,
        subtitle: v.jsondef?.subtitle || "",
        link: findLink(v.jsondef?.linkName),
        descList: v.jsondef?.descList || [],
      }))
      .sort((a, b) => {
        const aIndex = allowedBannerLinks.indexOf(a.jsondef?.linkName?.toLowerCase());
        const bIndex = allowedBannerLinks.indexOf(b.jsondef?.linkName?.toLowerCase());
        return aIndex - bIndex;
      });
    s1List.value = [welcomeBanner, ...slides];
  });
};

const s2List = reactive([
  {
    isWelcome: true,
    imgSrc: "/images/Web-banners/Welcome_Banner.jpg",
    title: "WELCOME TO EXEED BAHRAIN",
    subtitle: "By Adamas Motor Group",
    bottomText: "Enter a New Era of Premium Automotive Design and Technology",
    link: "/dealership",
  },
  {
    src: "home/lx.png",
    mdSrc: "home/lx-md.png",
    title: "EXEED LX",
    subtitle: "EXPLORE YOUR MODERN SELF",
    link: "/lx",
  },
  {
    src: "home/rx.png",
    title: "EXEED RX",
    mdSrc: "home/rx-md.png",
    subtitle: "Commanding Presence. Refined Design.",
    link: "/rx",
  },
  {
    src: "home/vx.png",
    mdSrc: "home/vx-md.png",
    title: "EXEED VX",
    subtitle: "EXEED Flagship Land Business Jet",
    link: "/vx",
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

// Lead capture form
const config = useRuntimeConfig();

const leadForm = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  enquiryType: "",
  model: "",
  query: "",
  marketingPhone: false,
  marketingEmail: false,
  marketingSms: false,
});

const isLeadSubmitting = ref(false);
const leadSubmitMessage = ref("");
const leadSubmitSuccess = ref(false);

const leadTypeMap = {
  "sales": "PURCHASE_INTENTION",
  "test-drive": "TEST_DRIVE",
  "service": "SERVICE_SUPPORT",
  "general": "BUSINESS",
};

const onLeadSubmit = async () => {
  isLeadSubmitting.value = true;
  leadSubmitMessage.value = "";

  try {
    const response = await fetch(`${config.public.apiURL}api/front/contact-us`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteCode: "chery_xt",
        type: leadTypeMap[leadForm.enquiryType] || "BUSINESS",
        name: `${leadForm.firstName} ${leadForm.lastName}`.trim(),
        email: leadForm.email,
        phone: leadForm.phone,
        vehicleType: leadForm.model || undefined,
        message: leadForm.query || undefined,
        marketingPhone: leadForm.marketingPhone,
        marketingEmail: leadForm.marketingEmail,
        marketingSms: leadForm.marketingSms,
      }),
    });

    const res = await response.json();
    if (res.code === 0) {
      leadSubmitSuccess.value = true;
      leadSubmitMessage.value = "Thank you for your enquiry. We will get back to you shortly.";
      Object.assign(leadForm, {
        firstName: "", lastName: "", email: "", phone: "",
        enquiryType: "", model: "", query: "",
        marketingPhone: false, marketingEmail: false, marketingSms: false,
      });
    } else {
      leadSubmitSuccess.value = false;
      leadSubmitMessage.value = "Something went wrong. Please try again.";
    }
  } catch {
    leadSubmitSuccess.value = false;
    leadSubmitMessage.value = "Something went wrong. Please try again.";
  } finally {
    isLeadSubmitting.value = false;
  }
};

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

    .welcome-bottom-text {
      position: absolute;
      left: 1.2rem;
      bottom: 1rem;
      font-family: Saira;
      font-size: 0.24rem;
      font-weight: 400;
      line-height: 0.32rem;
      color: rgba(255, 255, 255, 0.85);
      max-width: 6rem;
      z-index: 1;
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

        &.welcome-card {
          .welcome-img {
            width: 100%;
            aspect-ratio: 48/29;
            object-fit: cover;
            transition: all 0.5s;
          }
          .welcome-card-content {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 0.72rem 0.4rem 0.4rem;
          }
          .welcome-card-top {
            text-align: center;
          }
          .welcome-card-title {
            font-family: SairaExpanded;
            font-size: 0.4rem;
            line-height: 0.48rem;
            font-weight: 500;
            color: #ffffff;
            transition: all 0.5s;
            opacity: 0;
            transform: translateX(1rem);
          }
          .welcome-card-subtitle {
            font-family: Saira;
            font-size: 0.16rem;
            line-height: 0.24rem;
            margin-top: 0.08rem;
            color: rgba(255, 255, 255, 0.8);
            transition: all 0.5s 0.2s;
            opacity: 0;
            transform: translateX(1rem);
          }
          .welcome-card-bottom {
            font-family: Saira;
            font-size: 0.2rem;
            line-height: 0.28rem;
            color: rgba(255, 255, 255, 0.85);
            max-width: 80%;
            transition: all 0.5s 0.4s;
            opacity: 0;
            transform: translateX(1rem);
          }
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
        &.welcome-card {
          .welcome-card-title {
            opacity: 1;
            transform: translateX(0);
          }
          .welcome-card-subtitle {
            opacity: 1;
            transform: translateX(0);
          }
          .welcome-card-bottom {
            opacity: 1;
            transform: translateX(0);
          }
        }
      }
    }
  }

  .section-5.lead-capture {
    background: #0d0d0d;
    padding: 0.8rem 1.2rem;
    .lead-capture-inner {
      max-width: 12rem;
      margin: 0 auto;
      .lead-title {
        font-family: SairaExpanded;
        font-size: 0.42rem;
        font-weight: 400;
        color: #ffffff;
        margin-bottom: 0.4rem;
      }
      .lead-form {
        .form-row {
          display: flex;
          gap: 0.2rem;
          margin-bottom: 0.2rem;
          .form-group {
            flex: 1;
          }
        }
        .form-group {
          margin-bottom: 0.2rem;
          input, select, textarea {
            width: 100%;
            padding: 0 0.16rem;
            background: transparent;
            border: none;
            border-bottom: 0.01rem solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 0.14rem;
            outline: none;
            transition: border-color 0.3s;
            &:focus {
              border-bottom-color: #67B0C4;
            }
            &::placeholder {
              color: rgba(255, 255, 255, 0.4);
            }
          }
          input, select {
            height: 0.44rem;
          }
          textarea {
            padding-top: 0.12rem;
            resize: vertical;
            min-height: 0.8rem;
          }
          select {
            cursor: pointer;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='white' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 0.16rem center;
            background-size: 0.1rem;
            option {
              background: #1a1a1a;
              color: white;
            }
          }
          &.full-width {
            width: 100%;
          }
        }
        .marketing-section {
          margin-top: 0.4rem;
          padding-top: 0.3rem;
          .marketing-title {
            font-size: 0.18rem;
            font-weight: 600;
            color: #ffffff;
            margin-bottom: 0.16rem;
            letter-spacing: 0.01rem;
          }
          .marketing-desc {
            font-size: 0.13rem;
            line-height: 0.22rem;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 0.16rem;
          }
          .marketing-prompt {
            font-size: 0.13rem;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 0.16rem;
          }
          .checkbox-group {
            display: flex;
            gap: 0.3rem;
            .checkbox-label {
              display: flex;
              align-items: center;
              gap: 0.08rem;
              font-size: 0.14rem;
              color: rgba(255, 255, 255, 0.8);
              cursor: pointer;
              input[type="checkbox"] {
                width: 0.16rem;
                height: 0.16rem;
                cursor: pointer;
                accent-color: #67B0C4;
              }
            }
          }
        }
        .submit-btn {
          display: block;
          width: 3rem;
          height: 0.48rem;
          margin-top: 0.4rem;
          background: transparent;
          border: 0.01rem solid rgba(255, 255, 255, 0.5);
          color: white;
          font-size: 0.14rem;
          font-weight: 500;
          letter-spacing: 0.02rem;
          cursor: pointer;
          transition: all 0.3s;
          &:hover {
            border-color: white;
            background: rgba(255, 255, 255, 0.05);
          }
          &:disabled {
            border-color: rgba(255, 255, 255, 0.2);
            color: rgba(255, 255, 255, 0.3);
            cursor: not-allowed;
          }
        }
        .submit-message {
          margin-top: 0.2rem;
          font-size: 0.14rem;
          &.success {
            color: #4caf50;
          }
          &.error {
            color: #f44336;
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

      /* First slide only — shift focal point to showcase vehicle front */
      .hero-image-bg-md--welcome {
        object-position: 35% 60%;
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
      .welcome-bottom-text {
        position: absolute;
        bottom: 1.02rem;
        left: 0.2rem;
        font-size: 0.16rem;
        line-height: 0.22rem;
        max-width: 80%;
        z-index: 2;
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

          &.welcome-card {
            .welcome-img {
              aspect-ratio: 1.25;
            }
            .welcome-card-content {
              padding: 0.24rem 0.2rem 0.2rem;
            }
            .welcome-card-title {
              font-size: 0.2rem;
              line-height: 0.3rem;
            }
            .welcome-card-subtitle {
              font-size: 0.14rem;
              line-height: 0.2rem;
            }
            .welcome-card-bottom {
              font-size: 0.14rem;
              line-height: 0.2rem;
            }
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

    .section-5.lead-capture {
      height: auto;
      overflow: visible;
      padding: 0.6rem 0.24rem;
      .lead-capture-inner {
        .lead-title {
          font-size: 0.28rem;
          margin-bottom: 0.3rem;
        }
        .lead-form {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          .submit-btn {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
