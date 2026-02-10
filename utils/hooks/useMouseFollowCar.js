// 鼠标动画效果
import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useMouseFollowCar() {
  const mouseFollowCar = ref(null);
  let st = 0;

  const followF = () => {
    let mouseTop = 0;

    const mouseMoveHandler = (event) => {
      mouseTop = event.pageY - 75 - st;
      if (mouseFollowCar.value) {
        mouseFollowCar.value.style.top = `${mouseTop}px`;
        mouseFollowCar.value.style.left = `${event.pageX - 75}px`;
      }
    };

    const swiperMouseMoveHandler = () => {
      if (mouseFollowCar.value) {
        mouseFollowCar.value.style.opacity = '1';
        mouseFollowCar.value.style.transform = 'scale(1)';
      }
    };

    const swiperMouseLeaveHandler = () => {
      if (mouseFollowCar.value) {
        mouseFollowCar.value.style.opacity = '0';
        mouseFollowCar.value.style.transform = 'scale(0)';
      }
    };

    const scrollHandler = () => {
      st = document.body.scrollTop || document.documentElement.scrollTop;
    };

    document.body.addEventListener('mousemove', mouseMoveHandler);
    const mouseSwiper = document.querySelector('.mouse_swiper');
    if (mouseSwiper) {
      mouseSwiper.addEventListener('mousemove', swiperMouseMoveHandler);
      mouseSwiper.addEventListener('mouseleave', swiperMouseLeaveHandler);
    }
    window.addEventListener('scroll', scrollHandler);

    // 清理事件监听器
    onBeforeUnmount(() => {
      document.body.removeEventListener('mousemove', mouseMoveHandler);
      if (mouseSwiper) {
        mouseSwiper.removeEventListener('mousemove', swiperMouseMoveHandler);
        mouseSwiper.removeEventListener('mouseleave', swiperMouseLeaveHandler);
      }
      window.removeEventListener('scroll', scrollHandler);
    });
  };

  onMounted(() => {
    followF();
  });

  return {
    mouseFollowCar
  };
}
