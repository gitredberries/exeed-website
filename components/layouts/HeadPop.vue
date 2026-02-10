<template>
  <div
    :class="[
      'head-pop-wrapper md-head-pop-wrapper',
      isPopActive ? 'active' : '',
    ]"
  >
    <div class="close" @click="onCloseClick">
      <BaseImg class="close-icon" src="common/close.svg" />
    </div>
    <div class="nav-outer" v-if="showExeedModel">
      <ModelNav :isActive="isPopActive && showExeedModelAnimate" />
    </div>
    <div class="nav-outer" v-if="showExlantixModel">
      <ExlantixModel :isActive="isPopActive && showExlantixModelAnimate" />
    </div>
    <div class="nav-outer tech-nav-out" v-if="showTech">
      <TechNav :isActive="isPopActive && showTechAnimate" />
    </div>
    <div class="nav-outer" v-if="showEvents">
      <EventsNav :isActive="isPopActive && showEventsAnimate" />
    </div>
  </div>
  <div
    v-show="isShow"
    :class="['head-pop md-head-pop', isPopActive ? 'active' : '']"
  >
    <div :class="['nav-level nav-level-1', level1Active ? 'hide' : '']">
      <ul>
        <li
          v-for="item in props.navList"
          :key="item.id"
          @click="onNavClick(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div :class="['nav-level nav-level-2', level1Active ? 'active' : '']">
      <div class="level-1-name">
        <BaseImg
          class="back"
          src="common/left_arrow_light.svg"
          @click="onBackClick"
        />
        {{ activeNavText }}
      </div>
      <ul>
        <li
          v-for="item in level2List"
          :key="item.id"
          @click="onlevel2Click(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import ModelNav from "./ModelNav.vue";
import TechNav from "./TechNav.vue";
import ExlantixModel from "./ExlantixModel.vue";
import EventsNav from "./EventsNav.vue";
const router = useRouter();
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
  activeId: {
    type: Number,
    default: 0,
  },
  navList: {
    type: Array,
    default: [],
  },
});

const emits = defineEmits(["changeActiveId", "closeHeadPop"]);

const showExeedModel = ref(false);
const showExlantixModel = ref(false);
const showExlantixModelAnimate = ref(false);
const showTech = ref(false);

const showEventsAnimate = ref(false);
const showEvents = ref(false);

const isShow = ref(false);
const isPopActive = ref(false);
const showExeedModelAnimate = ref(false);
const showTechAnimate = ref(false);

const isActive = computed(() => props.isActive);
const activeId = computed(() => props.activeId);

const level1Active = ref(false);

const level2List = computed(() => {
  let obj = props.navList.find((v) => v.id === activeId.value) || {};
  return obj.children || [];
});

const activeNavText = computed(() => {
  let obj = props.navList.find((v) => v.id === activeId.value) || {};
  return obj.text || "";
});

let timer = null;

const onlevel2Click = (item) => {
  emits("closeHeadPop");
  router.push(`/${item.link}`);
};

const onNavClick = (item) => {
  if (item.id === 3 || item.id === 4) {
    emits("closeHeadPop");
    router.push(`/${item.link}`);
  } else {
    level1Active.value = true;
    emits("changeActiveId", item.id);
  }
};

const onBackClick = () => {
  level1Active.value = false;
};

let modelTimer = null;
let techTimer = null;

const showList = [
  showExeedModel,
  showExlantixModel,
  {},
  {},
  showTech,
  showEvents,
];
const showAnimateList = [
  showExeedModelAnimate,
  showExlantixModelAnimate,
  {},
  {},
  showTechAnimate,
  showEventsAnimate,
];

watch(
  activeId,
  (val) => {
    modelTimer && clearTimeout(modelTimer);
    techTimer && clearTimeout(techTimer);
    if (val !== 3 && val !== 4 && val) {
      showList[val - 1].value = true;
      showAnimateList.forEach((v, i) => {
        if (i !== val - 1) {
          v.value = false;
        }
      });
      techTimer = setTimeout(() => {
        showAnimateList[val - 1].value = true;
      }, 10);
      modelTimer = setTimeout(() => {
        showList.forEach((v, i) => {
          if (i !== val - 1) {
            v.value = false;
          }
        });
      }, 1000);
    }
  },
  {
    immediate: true,
  }
);

watch(isActive, (val) => {
  timer && clearTimeout(timer);
  if (val) {
    isShow.value = true;
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      isPopActive.value = true;
    });
  } else {
    isPopActive.value = false;
    document.body.style.overflow = "auto";
    timer = setTimeout(() => {
      isShow.value = false;
    }, 1000);
  }
});

const onCloseClick = () => {
  emits("closeHeadPop");
};
</script>
<style lang="scss">
@import url("./css/headPop.scss");
.head-pop-wrapper {
  position: fixed;
  overflow: hidden;
  left: 0;
  top: 1.26rem;
  width: 100%;
  height: 0;
  background: rgba(13, 13, 13, 0.8);
  //opacity: 0;
  z-index: 999;
  transition: all 0.8s 0.2s;
  display: flex;
  justify-content: center;
  backdrop-filter: blur(0.2rem);
  .close {
    position: absolute;
    right: 1.2rem;
    top: 0.32rem;
    z-index: 5;
    cursor: pointer;
    .close-icon {
      width: 0.28rem;
      opacity: 0.7;
      transition: all 0.5s;
      &:hover{
        opacity: 1;
      }
    }
  }
  .nav-outer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0 2rem;
  }
  .tech-nav-out{
    padding: 0 1.64rem;
  }
}
.head-pop-wrapper.active {
  //opacity: 1;
  transition: all 0.8s;
  height: calc(100vh - 1.26rem);
}
.md-head-pop {
  display: none;
}
</style>
