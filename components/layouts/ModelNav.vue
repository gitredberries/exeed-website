<template>
  <div :class="['model-nav-wrapper', props.isActive ? 'active' : '']">
    <ul class="model-nav-left">
      <li
        :class="[item.isEnter ? 'active' : '']"
        v-for="(item, index) in navList"
        :key="item.id"
        :style="{ transitionDelay: `${liEnterAniamte ? 0.2 * index : 0}s` }"
        @mouseenter="onLiMouseEnter(item)"
      >
        <div class="li-inner">
          <span>{{ item.text }}</span>
          <BaseImg class="nav-icon" v-if="item.icon" :src="item.icon" />
        </div>
        <div class="li-inner">
          <span>{{ item.text }}</span>
          <BaseImg class="nav-icon" v-if="item.icon" :src="item.icon" />
        </div>
      </li>
    </ul>
    <div class="model-nav-right">
      <div
        :class="[
          'nav-inner',
          item.isEnter ? 'active' : '',
          (item.id === 5 || item.id === 6) && 'nav-inner-new',
        ]"
        v-for="item in navList"
        :key="item.id"
        @click="onLinkClick(item)"
      >
        <BaseImg class="img-bg" :src="item.bgSrc" />
        <div class="nav-text">
          <div
            :class="[
              'nav-text-switch',
              item.id === 2 && 'switch-rx',
              item.id === 5 && 'switch-es',
            ]"
            v-if="item.withSwitch"
          >
            <div
              :class="[
                'switch-inner',
                item.isSwitchActive === 1 ? 'active' : '',
              ]"
              @click.stop="onSwitchClick(item, 1)"
            >
              {{ item.switchLeftText }}
            </div>
            <div
              :class="[
                'switch-inner',
                item.isSwitchActive === 2 ? 'active' : '',
              ]"
              @click.stop="onSwitchClick(item, 2)"
            >
              {{ item.switchRightText }}
            </div>
          </div>
          <template v-if="item.isSwitchActive === 1">
            <div class="nav-text-left">{{ item.title }}</div>
            <div class="nav-text-right">
              <div class="nav-text-inner" v-for="i in item.quota" :key="i.name">
                <div class="text-inner-top">
                  <div class="text-inner-num" v-if="i.isNum">
                    <template v-for="s in i.numArr">
                      <span v-if="typeof s !== 'number'">{{ s }}</span>
                      <DigitString
                        v-else
                        :moveSwitch="item.moveSwitch"
                        :num="s"
                      />
                    </template>
                  </div>
                  <span class="text-inner-num" v-if="!i.isNum">{{
                    i.text
                  }}</span>
                  <span class="text-inner-unit">{{ i.unit }}</span>
                </div>
                <span class="text-inner-bottom" v-html="i.name"></span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="nav-text-left">{{ item.child.title }}</div>
            <div class="nav-text-right">
              <div
                class="nav-text-inner"
                v-for="i in item.child.quota"
                :key="i.name"
              >
                <div class="text-inner-top">
                  <div class="text-inner-num" v-if="i.isNum">
                    <template v-for="s in i.numArr">
                      <span v-if="typeof s !== 'number'">{{ s }}</span>
                      <DigitString
                        v-else
                        :moveSwitch="item.moveSwitch"
                        :num="s"
                      />
                    </template>
                  </div>
                  <span class="text-inner-num" v-if="!i.isNum">{{
                    i.text
                  }}</span>
                  <span class="text-inner-unit">{{ i.unit }}</span>
                </div>
                <span class="text-inner-bottom">{{ i.name }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { navData } from "./data.js";
const router = useRouter();

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
});

const liEnterAniamte = ref(false);

const isActive = computed(() => props.isActive);

let timer = null;

const numMove = (item) => {
  timer && clearTimeout(timer);
  timer = setTimeout(() => {
    item.moveSwitch = item.moveSwitch + 1;
  }, 500);
};

const modelList = [
  {
    id: 1,
    isEnter: false,
    moveSwitch: 1,
    isSwitchActive: 1,
    bgSrc: "common/nav05.png",
    title: "LAND BUSINESS JET",
    quota: [
      {
        isNum: true,
        numArr: [2, 6, 1],
        unit: "H.P.",
        name: "Power",
      },
      {
        isNum: true,
        numArr: [2, ".", 0],
        unit: "L",
        name: "Powertrain",
      },
      {
        isNum: true,
        numArr: [8],
        unit: "",
        name: "AT",
      },
    ],
  },
  {
    id: 2,
    isEnter: false,
    moveSwitch: 1,
    withSwitch: true,
    isSwitchActive: 1,
    switchLeftText: "PHEV",
    switchRightText: "ICE",
    bgSrc: "common/nav06.png",
    title: "KEEP EXPLORING,POWER NEVER LIMITING",
    quota: [
      {
        isNum: false,
        text: "Hybrid specific",
        unit: "",
        name: "Engine",
      },
      {
        isNum: false,
        text: "3-gear DHT",
        unit: "",
        name: "Transmission",
      },
      {
        isNum: false,
        text: "I-AWD",
        unit: "",
        name: "System",
      },
    ],
    child: {
      title: "CDC NEVER WOBBLING",
      quota: [
        {
          isNum: false,
          text: "CDC",
          unit: "",
          name: "Engine",
        },
        {
          isNum: true,
          numArr: [2, ".", 0],
          unit: "TGDL",
          name: "Transmission",
        },
        {
          isNum: true,
          numArr: [8],
          unit: "AT",
          name: "Transmission",
        },
      ],
    },
  },
  {
    id: 3,
    isEnter: false,
    moveSwitch: 1,
    isSwitchActive: 1,
    carSrc: "common/h-car-on-txl.png",
    signSrc: "common/h-car-on-t-txl.png",
    bgSrc: "common/nav04.png",
    title: "SAFETY AND BUSINESS SUV",
    quota: [
      {
        isNum: true,
        numArr: [2, 3],
        unit: "",
        name: "ADAS",
      },
      {
        isNum: true,
        numArr: [2, ".", 0],
        unit: "T",
        name: "Transmission",
      },
      {
        isNum: true,
        numArr: [8],
        unit: "AT",
        name: "0-100<br>kph Acceleration<br>Time",
      },
    ],
  },
  {
    id: 4,
    isEnter: false,
    moveSwitch: 1,
    isSwitchActive: 1,
    carSrc: "common/h-Lxcar.png",
    signSrc: "common/h-car-on-t-lx.png",
    bgSrc: "common/nav03.png",
    title: "EXPLORE YOUR MODERN SELF",
    quota: [
      {
        isNum: true,
        numArr: [4],
        unit: "WD",
        name: "BorgWarner Drive System",
      },
      {
        isNum: true,
        numArr: ["L", 2],
        unit: "+",
        name: "Intellectual Power",
      },
      {
        isNum: true,
        numArr: [1, ".", 6, " TGDI", " + ", 7, " DCT"],
        unit: "",
        name: "Engine",
      },
    ],
  },
];

const modelChildData = navData.find((v) => v.id === 4)?.children || [];

const navList = ref(
  modelList.map((v) => {
    let data = modelChildData.find((s) => s.id === v.id) || {};
    v.text = data.text;
    v.link = data.link;
    return v;
  })
);

watch(isActive, (val) => {
  if (val) {
    liEnterAniamte.value = true;
    nextTick(() => {
      onLiMouseEnter(navList.value[0]);
    });
    setTimeout(() => {
      liEnterAniamte.value = false;
    }, 1000);
  }
});

const closeHeadPop = inject("closeHeadPop");

const onLinkClick = (item) => {
  closeHeadPop();
  router.push(`/${item.link}`);
};

const onSwitchClick = (item, val) => {
  item.isSwitchActive = val;
  nextTick(() => {
    item.moveSwitch = item.moveSwitch + 1;
  });
};

const onLiMouseEnter = (item) => {
  if (!item.isEnter) {
    navList.value.forEach((v) => (v.isEnter = false));
    item.isEnter = true;
    numMove(item);
  }
};
</script>
<style lang="scss" scoped>
.model-nav-wrapper {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  transition: all 1s;
  opacity: 0;
  transform: translateY(1rem);
  .model-nav-left {
    margin-right: 1.2rem;
    flex-shrink: 0;
    li {
      font-size: 0.24rem;
      color: white;
      opacity: 0;
      cursor: pointer;
      transition: all 0.5s;
      overflow: hidden;
      line-height: 0.4rem;
      margin-bottom: 0.3rem;
      height: 0.4rem;
      transform: translateX(1rem);
      .li-inner {
        display: flex;
        align-items: center;
        transition: all 0.3s;
        .nav-icon {
          margin-left: 0.1rem;
        }
      }
    }
    li.active {
      opacity: 1 !important;
      transition-delay: 0 !important;
      .li-inner {
        transform: translateY(-0.4rem);
      }
    }
  }
  .model-nav-right {
    width: 12rem;
    height: fit-content;
    min-height: 2rem;
    position: relative;
    cursor: pointer;
    .nav-inner {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: all 1s;
      z-index: 3;
      overflow: hidden;
      border-radius: 0.04rem;
      .img-bg {
        width: 12rem;
        transition: all 1s;
        transform: scale(1);
      }
      .nav-text {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0.48rem 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        z-index: 7;
        .nav-text-switch {
          position: absolute;
          top: 0.1rem;
          left: 0.4rem;
          display: flex;
          transition: all 1s;
          opacity: 0;
          transform: translateY(1rem);
          .switch-inner {
            width: 0.8rem;
            height: 0.28rem;
            line-height: 0.28rem;
            text-align: center;
            font-size: 0.14rem;

            cursor: pointer;
            transition: all 0.3s;
            &:nth-of-type(2) {
              border-left: none;
            }
          }
        }
        .nav-text-switch.switch-rx {
          .switch-inner {
            color: white;
            border: 1px solid #fff;
            &:hover {
              background-color: #fff;
              color: #1a1a1a;
            }
            &:nth-of-type(1) {
              border-top-left-radius: 0.04rem;
              border-bottom-left-radius: 0.04rem;
            }
            &:nth-of-type(2) {
              border-top-right-radius: 0.04rem;
              border-bottom-right-radius: 0.04rem;
            }
          }
          .switch-inner.active {
            background-color: white;
            color: #1a1a1a;
          }
        }
        .nav-text-switch.switch-es {
          .switch-inner {
            color: white;
            border: 1px solid #fff;
            &:hover {
              background-color: white;
              color: #1a1a1a;
            }
          }
          .switch-inner.active {
            background-color: white;
            color: #1a1a1a;
          }
        }
        .nav-text-left {
          font-size: 0.32rem;
          line-height: 0.4rem;
          color: white;
          transition: all 1s;
          opacity: 0;
          transform: translateY(1rem);
          transition-delay: 0.3s;
        }
        .nav-text-right {
          display: flex;
          transition: all 1s;
          opacity: 0;
          transform: translateY(1rem);
          transition-delay: 0.5s;
          .nav-text-inner {
            display: flex;
            flex-direction: column;
            margin-left: 0.4rem;
            .text-inner-top {
              font-size: 0.24rem;
              line-height: 0.24rem;
              color: white;
              margin-bottom: 0.05rem;
              display: flex;
              .text-inner-num {
                display: flex;
                height: 0.24rem;
                overflow: hidden;
                white-space: nowrap;
                align-items: flex-end;
              }
            }
            .text-inner-bottom {
              font-size: 0.16rem;
              line-height: 0.2rem;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
    .nav-inner-new {
      background: linear-gradient(
        to bottom,
        rgb(224, 224, 224),
        rgb(160, 165, 171)
      );
    }
    .nav-inner.active {
      opacity: 1;
      z-index: 4;
      transition-delay: 0.2s;
      .img-bg {
        transform: scale(1);
      }
      &:hover {
        .img-bg {
          transition: all 0.5s;
          transform: scale(var(--scale-img));
        }
      }
      .nav-text {
        .nav-text-left {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-text-right {
          opacity: 1;
          transform: translateY(0);
        }
        .nav-text-switch {
          transform: translateY(0);
          opacity: 1;
          transition-delay: 0.2s;
        }
      }
    }
  }
}
.model-nav-wrapper.active {
  transform: translateY(0);
  opacity: 1;
  .model-nav-left {
    li {
      transform: translateX(0);
      opacity: 0.5;
    }
  }
}
</style>
