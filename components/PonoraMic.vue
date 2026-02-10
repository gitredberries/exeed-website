<template>
  <div
    class="title_spin"
    ref="targetRef"
    @click="goToExternalLink"
    :class="{ animate: isVisible }"
  >
    <BaseImg class="img-default" src="models/vx/04.png" alt="" />
    <BaseImg class="img-hover" src="models/vx/09.png" alt="" />
    <div>Panoramic Exploration</div>
  </div>
</template>

<script setup>
import { useAnimation } from "~/utils/hooks/useAnimation.js";

const props = defineProps({
  sign: {
    type: String,
    default: 'vx',
  },
});

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

const goToExternalLink = () => {
  let url = '';
  switch (props.sign) {
    case 'vx': url = '/360/VX'; break;
    case 'rx': url = '/360/RX'; break;
    case 'txl': url = '/360/TXL'; break;
    case 'lx': url = '/360/LX'; break;
    case 'es': url = '/360/ES'; break;
    case 'et': url = '/360/ET'; break;
  }
  window.open(url, "_blank");
};
</script>

<style lang="scss" scoped>
.title_spin {
  width: 3.7rem;
  height: 0.75rem;
  border-bottom: 0.05rem solid #c78e66;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  font-size: 0.18rem;
  padding-left: 0.6rem;
  transition: all 0.4s;
  transition-delay: 0.4s;
  opacity: 0;
  transform: translateY(1rem);
  &.animate {
    transform: translateY(0);
    opacity: 1;
  }
  img {
    width: 0.35rem;
    height: 0.35rem;
    margin-right: 0.3rem;
  }
  div {
    z-index: 1;
  }
}
.img-default {
  display: block;
}
.img-hover {
  display: none;
}
.title_spin:hover .img-default {
  display: none;
}
.title_spin:hover .img-hover {
  display: block;
}
@media screen and (max-width: 1024px) {
  .title_spin {
    width: 100%;
    height: 0.4rem;
    font-size: 0.14rem;
    color: #1a1a1a;
    padding-left: 0;
    transform: translateY(0);
    position: static !important;
    bottom: 0.1rem !important;
    border-bottom: none;
    border-radius: 0.02rem;
    display: flex;
    justify-content: center;
    &:hover {
      div{
        color: #1a1a1a;
      }
      .img-default {
        display: block;
      }
      .img-hover{
        display: none;
      }
    }
    img{
      width: 0.16rem;
      height: auto;
      margin-right: 0.08rem;
    }
    &::before {
      display: none;
    }
  }
}
</style>
