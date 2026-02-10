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

const { targetRef, isVisible } = useAnimation({
  threshold: 0.3,
});

const goToExternalLink = () => {
  window.open("http://106.14.155.0:20002/pika/ex.html", "_blank");
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
    padding-left: 0.8rem;
    transform: translateY(0);
    position: absolute !important;
    bottom: 0.1rem !important;
    border-bottom: none;
    border-radius: 0.02rem;
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
