<template>
  <div>
    <div
      class="cti_go_top"
      :class="showBackTop ? 'show_top' : 'hide_top'"
      @click="scrollTop"
      @mouseover="changeBackTopTxt(true)"
      @mouseout="changeBackTopTxt(false)"
    >
      <BaseImg src="common/backtop.webp" class="heartbeat" />
      <div class="backtop_text" :class="showBackTopTxt ? 'show-toptxt' : ''">
        Back to top
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
var showBackTop: Ref<boolean> = ref(false);
const route = useRoute();
const cur_url = route.path;
function handleScroll(event) {
  let e = event.originalEvent || event;
  let deltaY = e.deltaY || e.detail;
  // 处理滚动事件的逻辑
  switch (cur_url) {
    case "/":
      if (deltaY > 0) {
        showBackTop.value = true;
      } else if (deltaY < 0) {
        showBackTop.value = false;
      }
      break;
    case "/models":
      if (deltaY > 0) {
        showBackTop.value = true;
      } else if (deltaY < 0) {
        showBackTop.value = false;
      }
      break;
    case "/j8":
      if (deltaY > 0) {
        showBackTop.value = true;
      } else if (deltaY < 0) {
        showBackTop.value = false;
      }
      break;
    default:
      if (deltaY > 0) {
        showBackTop.value = true;
      } else if (deltaY < 0 && window.scrollY < 600) {
        showBackTop.value = false;
      }
      break;
  }
}
function changeBackTop(status) {
  if (showBackTop.value == status) {
    return;
  } else {
    showBackTop.value = status;
  }
}
onMounted(() => {
  window.addEventListener("mousewheel", handleScroll);
});
onBeforeUnmount(() => {
  window.removeEventListener("mousewheel", handleScroll);
});
var showBackTopTxt: Ref<Boolean> = ref(false);
function changeBackTopTxt(status) {
  if (showBackTopTxt.value == status) {
    return;
  } else {
    showBackTopTxt.value = status;
  }
}
function scrollTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
  setTimeout(() => {
    changeBackTop(false);
  }, 700);
}
</script>

<style scoped>
.cti_go_top {
  align-items: center;
  border-radius: 50%;
  bottom: 0.1rem;
  cursor: pointer;
  display: flex;
  width: 0.48rem;
  height: 0.48rem;
  justify-content: center;
  position: fixed;
  right: 0.35rem;
  z-index: 9999;
}

@media (max-width: 1324px) {
  .cti_go_top {
    display: none;
  }
}

.show_top {
  animation: slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

.hide_top {
  animation: slide-out-bottom 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
}

@keyframes slide-top {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-2.60417vw);
  }
}

@keyframes slide-out-bottom {
  0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(52.08333vw);
  }
}

.cti_go_top > img {
  width: 100%;
  height: auto;
  cursor: pointer;
}

.backtop_text {
  bottom: -0.3rem;
  opacity: 0;
  position: absolute;
  transition: all 0.4s;
  white-space: nowrap;
  width: auto;
  font-size: 0.14rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 0 0.43rem rgba(0, 0, 0, 0.9);
  color: #222;
}

.show-toptxt {
  opacity: 1 !important;
}

.heartbeat {
  animation: heartbeat 1.6s ease-in-out infinite both;
}

@keyframes heartbeat {
  0% {
    animation-timing-function: ease-out;
    transform: scale(1);
    transform-origin: center center;
  }

  10% {
    animation-timing-function: ease-in;
    transform: scale(0.91);
  }

  17% {
    animation-timing-function: ease-out;
    transform: scale(0.98);
  }

  33% {
    animation-timing-function: ease-in;
    transform: scale(0.87);
  }

  45% {
    animation-timing-function: ease-out;
    transform: scale(1);
  }
}
</style>
