<template>
  <div class="header-outer">
    <header class="header-wrapper">
      <div class="header-info">
        <div class="md-nav" v-show="mdMenuStatus === 1" @click="onMdMenuClick">
          Menu
        </div>
        <div
          class="md-nav-close"
          v-show="mdMenuStatus === 2"
          @click="onMdMenuCloseClick"
        >
          Close
        </div>
        <BaseImg
          class="logo"
          :src="'common/logo_white.svg'"
          @click="onLogoClick"
          @mouseenter="isScrollDown = false"
        />
      </div>
      <a href="https://www.adamasmotors.com" target="_blank" rel="noopener noreferrer" class="adamas-logo-link">
        <BaseImg class="adamas-logo" :src="'common/adamas_logo.svg'" />
      </a>
      <div
        :class="[
          'nav-info',
          isScrollDown && !isModelsDropdownOpen ? 'nav-hide' : '',
        ]"
        v-show="showNav"
      >
        <ul @mouseleave="onNavLeave">
          <li
            :class="[
              !item.isActive ? 'inactive' : '',
              item.children ? 'has-dropdown' : '',
            ]"
            v-for="(item, index) in navList"
            :key="item.text"
            @click="onNavListClick(index)"
            @mouseenter="onNavListEnter(index)"
          >
            {{ item.text }}
            <span v-if="item.children" class="dropdown-arrow">▾</span>
          </li>
        </ul>
        <!-- EXEED Models Dropdown -->
        <div
          :class="['models-dropdown', isModelsDropdownOpen ? 'open' : '']"
          @mouseleave="closeModelsDropdown"
          @mouseenter="keepModelsDropdownOpen"
        >
          <div class="models-dropdown-inner">
            <div
              class="model-item"
              v-for="item in modelsDropdownList"
              :key="item.text"
              @click="onModelClick(item)"
            >
              <img
                class="model-silhouette"
                :src="`${config.public.staticURL}/images/EXEED_Models_Dropdown_Icons/${item.icon}`"
                :alt="item.text"
              />
              <span class="model-name">EXEED {{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <ExeedWorld :showModal="showModal" @closeModal="closeModal" />
    <HeadPop
      :isActive="isHeadPopActive"
      :activeId="activeId"
      :navList="navList"
      @closeHeadPop="closeHeadPop"
      @changeActiveId="changeActiveId"
    />
  </div>
</template>
<script setup>
import { useHeaderStore } from "@/stores/useHeader.ts";
import HeadPop from "./HeadPop.vue";
import { navData } from "./data.js";
const { scrollY } = useScroll();
const router = useRouter();
const route = useRoute();
preloadRouteComponents("/vx");
preloadRouteComponents("/rx");
preloadRouteComponents("/lx");
preloadRouteComponents("/news");
preloadRouteComponents("/dealership");
preloadRouteComponents("/offers");
preloadRouteComponents("/find-us");
preloadRouteComponents("/enquire-now");
// 当前滚动条位置
let curScrollY = 0;

// 滚动状态:向上或向下滚动
const isScrollDown = ref(false);

const headStore = useHeaderStore();
// 展示国际化选择的弹窗
const showModal = computed(() => headStore.showWorldModal);
const showNav = computed(() => headStore.showNav);
// 关闭国际化弹窗
const closeModal = () => showModal.value && headStore.setWorldModal(false);

// 导航弹出框是否显示
const isHeadPopActive = ref(false);

// Models dropdown state
const isModelsDropdownOpen = ref(false);
const modelsDropdownList = [
  { text: "VX", icon: "VX.png", link: "vx" },
  { text: "LX", icon: "LX.png", link: "lx" },
  { text: "RX", icon: "RX.png", link: "rx" },
];

const config = useRuntimeConfig();

// 0: 都不显示; 1: 显示menu; 2: 显示close;
const mdMenuStatus = ref(1);

const activeId = ref(1);

// 定位到当前滚动的位置
onMounted(() => {
  curScrollY = document.documentElement.scrollTop;
});

// 导航列表
// isActive -- true: 亮色  false: 暗色
const navList = reactive([
  {
    id: 1,
    text: "EXEED Models",
    isActive: true,
    children: [
      { ...navData[3].children[0] }, // VX
      { ...navData[3].children[3] }, // LX
      { ...navData[3].children[1] }, // RX
    ],
  },
  {
    id: 2,
    isActive: true,
    text: "Dealership",
    link: navData[5].link,
  },
  {
    id: 3,
    isActive: true,
    text: "News",
    link: "news",
  },
  {
    id: 4,
    isActive: true,
    text: "Offers",
    link: navData[6].link,
  },
  {
    id: 5,
    isActive: true,
    text: "Find Us",
    link: navData[7].link,
  },
  {
    id: 6,
    isActive: true,
    text: "Enquire Now",
    link: navData[8].link,
  },
]);

const handleRouteNav = (val) => {
  if (val === "/") {
    navList.forEach((v) => (v.isActive = true));
    return;
  } else {
    let pathStr = val.substring(1, val.length);
    navList.forEach((v) => {
      if (v.link && v.link === pathStr) {
        v.isActive = true;
      } else if (v.children && v.children.some((s) => s.link === pathStr)) {
        v.isActive = true;
      } else {
        v.isActive = false;
      }
    });
  }
};

watch(
  () => route.path,
  (val) => {
    handleRouteNav(val);
  }
);

handleRouteNav(route.path);

const onLogoClick = () => {
  router.push("/");
};

const onMdMenuClick = () => {
  mdMenuStatus.value = 2;
  isHeadPopActive.value = true;
  closeModal();
};

const onMdMenuCloseClick = () => {
  mdMenuStatus.value = 1;
  isHeadPopActive.value = false;
};

const changeActiveId = (id) => {
  activeId.value = id;
};

// 鼠标移出导航
const onNavLeave = () => {
  isModelsDropdownOpen.value = false;
  if (!isHeadPopActive.value) {
    handleRouteNav(route.path);
  }
};

const closeHeadPop = () => {
  mdMenuStatus.value = 1;
  isHeadPopActive.value = false;
  isModelsDropdownOpen.value = false;
  onNavLeave();
};

const closeModelsDropdown = () => {
  isModelsDropdownOpen.value = false;
  handleRouteNav(route.path);
};

const keepModelsDropdownOpen = () => {
  isModelsDropdownOpen.value = true;
};

const onModelClick = (item) => {
  isModelsDropdownOpen.value = false;
  router.push(`/${item.link}`);
};

const onWorldClick = () => {
  closeHeadPop();
  mdMenuStatus.value = 1;
  headStore.setWorldModal(!showModal.value);
};

// 导航条点击事件
const onNavListClick = (index) => {
  const item = navList[index];
  if (item.children) {
    // Toggle models dropdown
    isModelsDropdownOpen.value = !isModelsDropdownOpen.value;
    isHeadPopActive.value = false;
  } else if (item.link) {
    // Direct link items
    isHeadPopActive.value = false;
    isModelsDropdownOpen.value = false;
    router.push(`/${item.link}`);
  }
};

const handleNavHeadPop = (index) => {
  navList.forEach((v) => (v.isActive = false));
  navList[index].isActive = true;
};

const onNavListEnter = (index) => {
  const item = navList[index];
  if (item.children) {
    isModelsDropdownOpen.value = true;
  } else {
    isModelsDropdownOpen.value = false;
  }
  if (!isHeadPopActive.value) {
    navList.forEach((v) => (v.isActive = false));
    navList[index].isActive = true;
  }
}

provide("closeHeadPop", closeHeadPop);

// 根据滚动条前后滚动的距离判断上下
watch(scrollY, (newVal) => {
  if (newVal > curScrollY) {
    isScrollDown.value = true;
  } else {
    isScrollDown.value = false;
  }
  curScrollY = newVal;
});
</script>
<style scoped lang="scss">
@import url("./css/header.scss");
@keyframes langMoveIn {
  from {
    opacity: 0;
    transform: translateY(0.3rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes navMoveIn {
  from {
    opacity: 0;
    transform: translateY(0.2rem);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes navInfoMoveIn {
  from {
    height: calc(100vh - 0.9rem);
  }

  to {
    height: 0.6rem;
  }
}

.header-wrapper {
  position: fixed;
  width: 100%;
  height: 0.72rem;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #0d0d0d;
  .md-nav {
    display: none;
  }
  .md-nav-close {
    display: none;
  }

  .header-info {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1000;
    background-color: #0d0d0d;

    .logo {
      width: 1.28rem;
      cursor: pointer;
    }

  }

  .adamas-logo-link {
    position: absolute;
    top: 0;
    right: 1.2rem;
    height: 1.26rem;
    display: flex;
    align-items: center;
    z-index: 1001;
  }

  .adamas-logo {
    width: 1.0rem;
    height: 0.56rem;
    object-fit: contain;
    opacity: 0.7;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  }

  .nav-info {
    position: absolute;
    left: 0;
    top: 0.72rem;
    background: rgba(13, 13, 13, 0.8);
    backdrop-filter: blur(0.2rem);
    width: 100%;
    height: 0.54rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    transition: 0.5s ease-out;
    animation: navInfoMoveIn 0.8s ease-out;
    z-index: 999;

    ul {
      display: flex;
      justify-content: center;
      height: 0.54rem;

      li {
        height: 100%;
        font-size: 0.16rem;
        color: white;
        padding: 0 0.28rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.5s;
        animation: navMoveIn 1s ease;
      }

      .inactive {
        &:hover{
          opacity: 0.7;
        }
        opacity: 0.4;
      }

      .has-dropdown {
        .dropdown-arrow {
          margin-left: 0.04rem;
          font-size: 0.12rem;
          transition: transform 0.3s;
        }
      }
    }

    .models-dropdown {
      position: absolute;
      top: 0.54rem;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease, visibility 0.3s;
      z-index: 1000;
      pointer-events: none;

      &.open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .models-dropdown-inner {
        display: flex;
        gap: 0.4rem;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(0.1rem);
        border-radius: 0.08rem;
        padding: 0.3rem 0.5rem;
        box-shadow: 0 0.04rem 0.2rem rgba(0, 0, 0, 0.15);
      }

      .model-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        padding: 0.1rem 0.2rem;
        border-radius: 0.06rem;
        transition: background 0.2s;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .model-silhouette {
          width: 1.8rem;
          height: auto;
          object-fit: contain;
        }

        .model-name {
          margin-top: 0.1rem;
          font-size: 0.14rem;
          color: #333;
          font-weight: 500;
          white-space: nowrap;
        }
      }
    }
  }

  .nav-hide {
    top: 0.2rem;
  }
}
.fill-empty {
  width: 100%;
  height: 0.72rem;
}
</style>
