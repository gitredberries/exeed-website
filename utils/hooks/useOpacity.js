// 滚动改变透明度
import { ref, onMounted, onUnmounted } from "vue";

export function useOpacity(initialOpacity = 0.3) {
  const opacity = ref(initialOpacity); // 初始透明度
  const lastScrollTop = ref(0); // 记录上一次滚动位置

  // 更新透明度的函数
  const updateOpacity = (isVisible, scrollDirection) => {
    if (scrollDirection === "up") {
      opacity.value = initialOpacity; // 向上滚动时设置为初始透明度
    } else {
      opacity.value = isVisible ? 1 : initialOpacity; // 向下滚动时根据 isVisible 更新透明度
    }
  };

  // 滚动事件处理函数
  const handleScroll = (isVisible) => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const direction = currentScrollTop > lastScrollTop.value ? "down" : "up";
    updateOpacity(isVisible, direction);
    lastScrollTop.value = currentScrollTop;
  };

  // 初始化滚动监听
  const initScrollListener = (isVisible) => {
    const scrollHandler = () => handleScroll(isVisible);
    onMounted(() => {
      window.addEventListener("scroll", scrollHandler);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", scrollHandler);
    });
  };

  return {
    opacity,
    initScrollListener,
  };
}