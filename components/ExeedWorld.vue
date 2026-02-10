<template>
  <div
    :class="['exeed-world md-exeed-world', isActive ? 'active' : '']"
    v-show="isShow"
  >
    <div class="close" @click="onCloseClick">
      <BaseImg class="close-icon" src="common/close.svg" />
    </div>
    <div class="exeed-world-detail">
      <div class="exeed-world-title">EXEED WORLDWIDE</div>
      <div class="exeed-world-subtitle">
        Models, products and services - switch to your country region website
        and discover the regional diversity of EXEED.
      </div>
      <div class="exeed-world-choice">
        <div class="choice-desc">Your country / sales region</div>
        <div class="choice-content">
          <div class="choice-name" @click.stop="onDropdownClick">
            {{ chooseCountry.title }}
            <div
              :class="['drop-down-wrapper', isDropdownActive ? 'active' : '']"
            >
              <ul class="drop-down" @click.stop>
                <li
                  v-for="item in list"
                  :key="item.id"
                  @click="onChoiceListClick(item)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </div>
          </div>
          <div class="chioce-btn" @click="onBtnClick">
            <span>GO</span>
            <BaseImg class="choice-btn-arrow" src="model/es/LeftOutlined.svg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const config = useRuntimeConfig();

const isShow = ref(false);
const isActive = ref(false);

const isDropdownActive = ref(false);

const list = ref([]);

const chooseCountry = ref({});

const onChoiceListClick = (item) => {
  chooseCountry.value = item;
};

const props = defineProps({
  showModal: Boolean,
});

onMounted(() => {
  document.addEventListener("click", () => {
    isDropdownActive.value = false;
  });
});

const emits = defineEmits(["closeModal"]);

const onDropdownClick = () => {
  isDropdownActive.value = !isDropdownActive.value;
};

const showModal = computed(() => props.showModal);

const onCloseClick = () => {
  emits("closeModal");
};

const onBtnClick = () => {
  chooseCountry.value.url && window.open(chooseCountry.value.url);
};

let timer = null;

onMounted(() => {
  fetch(
    `${config.public.apiURL}api/front/banners?code=nationInformation&siteCode=chery_xt`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((res) => {
      if (res.code === 0) {
        const data = res.data || [];
        list.value = data;
        chooseCountry.value = list.value[0] || {};
      }
    });
});

watch(showModal, (val) => {
  timer && clearTimeout(timer);
  if (val) {
    isShow.value = true;
    document.body.style.overflow = "hidden";
    timer = setTimeout(() => {
      isActive.value = true;
    });
  } else {
    document.body.style.overflow = "auto";
    isActive.value = false;
    timer = setTimeout(() => {
      isShow.value = false;
    }, 1000);
  }
});
</script>
<style lang="scss" scoped>
@import url("./css/exeedWorld.scss");
.exeed-world {
  position: fixed;
  left: 0;
  top: 0.72rem;
  width: 100%;
  height: calc(100vh - 0.72rem);
  background: rgba(13, 13, 13, 0.8);
  z-index: 998;
  transition: all 0.5s;
  display: flex;
  justify-content: center;
  opacity: 0;
  backdrop-filter: blur(0.2rem);
  .close {
    position: absolute;
    right: 1.2rem;
    top: 0.88rem;
    width: 0.28rem;
    height: 0.28rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;
    transition: all 0.5s;
    .close-icon {
      width: 100%;
    }
    &:hover {
      opacity: 1;
    }
  }
  .exeed-world-detail {
    margin-top: 1.72rem;
    width: 6.98rem;
    .exeed-world-title {
      font-size: 0.52rem;
      line-height: 0.6rem;
      color: white;
    }
    .exeed-world-subtitle {
      font-size: 0.16rem;
      line-height: 0.24rem;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.16rem;
    }
    .exeed-world-choice {
      margin-top: 0.6rem;
      .choice-desc {
        font-size: 0.16rem;
        line-height: 0.24rem;
        color: white;
      }
      .choice-content {
        margin-top: 0.16rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .choice-name {
          width: 5.66rem;
          height: 0.36rem;
          line-height: 0.36rem;
          font-size: 0.16rem;
          color: white;
          position: relative;
          cursor: pointer;
          border-bottom: 1px solid rgba(255, 255, 255, 0.5);
          .drop-down-wrapper {
            width: 100%;
            position: absolute;
            top: 0.4rem;
            left: 0;
            transition: all 0.5s;
            max-height: 0;
            overflow: hidden;
            .drop-down {
              width: 100%;
              padding: 0.2rem;
              background-color: #0d0d0d;
              border-radius: 0.04rem;

              li {
                height: 0.44rem;
                line-height: 0.44rem;
                font-size: 0.16rem;
                color: white;
                text-indent: 0.12rem;
                border-radius: 0.04rem;
                cursor: pointer;
                &:hover {
                  background: #333333;
                }
              }
            }
          }
        }
        .drop-down-wrapper.active {
          max-height: 4rem;
        }
        .chioce-btn {
          height: 0.4rem;
          padding: 0 0.2rem 0 0.24rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.14rem;
          color: #1a1a1a;
          background: #ffffff;
          box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
          box-sizing: content-box;
          border-radius: 2px;
          cursor: pointer;
          .choice-btn-arrow {
            width: 0.16rem;
            margin-left: 0.08rem;
          }
        }
      }
    }
  }
}
.exeed-world.active {
  opacity: 1;
}
</style>
