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
        <div class="lang-wrapper" @click="onWorldClick">
          <span class="lang">EXEED World</span>
          <BaseImg class="lang-icon" src="header/earth.svg" />
        </div>
      </div>
      <div
        :class="[
          'nav-info',
          isScrollDown && !isHeadPopActive ? 'nav-hide' : '',
        ]"
        v-show="showNav"
      >
        <ul @mouseleave="onNavLeave">
          <li
            :class="[!item.isActive ? 'inactive' : '']"
            v-for="(item, index) in navList"
            :key="item.text"
            @click="onNavListClick(index)"
            @mouseenter="onNavListEnter(index)"
          >
            {{ item.text }}
          </li>
        </ul>
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
preloadRouteComponents("/exploration");
preloadRouteComponents("/sustainability");
preloadRouteComponents("/techReev");
preloadRouteComponents("/safety");
preloadRouteComponents("/awd");
preloadRouteComponents("/exeedEvents");
preloadRouteComponents("/exlantixEvents");
preloadRouteComponents("/vx");
preloadRouteComponents("/rx");
preloadRouteComponents("/txl");
preloadRouteComponents("/lx");
preloadRouteComponents("/es");
preloadRouteComponents("/et");
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
    children: [...navData[3].children.slice(0, 4)],
  },
  {
    id: 2,
    isActive: true,
    text: "EXLANTIX Models",
    children: [...navData[3].children.slice(4, 6)],
  },
  {
    id: 3,
    isActive: true,
    text: "Exploration",
    link: navData[0].link,
  },
  {
    id: 4,
    isActive: true,
    text: "Sustainability",
    link: navData[1].link,
  },
  {
    id: 5,
    isActive: true,
    text: "Tech",
    children: [...navData[2].children],
  }
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
  if (!isHeadPopActive.value) {
    handleRouteNav(route.path);
  }
};

const closeHeadPop = () => {
  mdMenuStatus.value = 1;
  isHeadPopActive.value = false;
  onNavLeave();
};

const onWorldClick = () => {
  closeHeadPop();
  mdMenuStatus.value = 1;
  headStore.setWorldModal(!showModal.value);
};

// 导航条点击事件
const onNavListClick = (index) => {
  if (navList[index].id == 3 || navList[index].id === 4) {
    isHeadPopActive.value = false;
    router.push(`/${navList[index].link}`);
  } else {
    activeId.value = navList[index].id;
    isHeadPopActive.value = true;
    handleNavHeadPop(index);
  }
};

const handleNavHeadPop = (index) => {
  navList.forEach((v) => (v.isActive = false));
  navList[index].isActive = true;
  if (navList[index].id == 3 || navList[index].id === 4) {
    isHeadPopActive.value = false;
    return;
  }
  if (isHeadPopActive.value) {
    activeId.value = navList[index].id;
  }
};

const onNavListEnter = (index) => {
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

    .lang-wrapper {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 2rem;
      font-size: 0.13rem;
      color: #b2b2b2;
      display: flex;
      align-items: center;
      animation: langMoveIn 1s ease-out;
    }

    .lang {
      cursor: pointer;
    }
    .lang-icon {
      display: none;
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
