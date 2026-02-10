// 处理页面图片缩放方法
import { onMounted, onBeforeUnmount } from 'vue';

export function useScrollAnimation() {
  const handleScroll = () => {
    // 处理 scroll_bottom 元素
    const scrollCenterElementsBottom = document.querySelectorAll('.scroll_bottom');
    scrollCenterElementsBottom.forEach((element) => {
      const elementOffset = element.getBoundingClientRect().top + window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight * 0.8 >= elementOffset) {
        element.classList.add('_into');
      } else {
        element.classList.remove('_into');
      }
    });

    // 处理 scroll_top 元素
    const scrollCenterElementsTop = document.querySelectorAll('.scroll_top');
    scrollCenterElementsTop.forEach((element) => {
      const elementOffset = element.getBoundingClientRect().top + window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight * 0.1 >= elementOffset) {
        element.classList.add('into');
      } else {
        element.classList.remove('into');
      }
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });
}
