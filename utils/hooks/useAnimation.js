//关于页面动画来回触发的方法
import { ref, onMounted, onUnmounted } from "vue";

export function useAnimation(options = { threshold: 0.3 }) {
  const isVisible = ref(false); // 用于表示目标元素是否在视口内
  const targetRef = ref(null); // 用于绑定目标元素的 ref
  let observer = null;

  // 处理 Intersection Observer 的回调
  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= options.threshold) {
        isVisible.value = true; // 元素进入视口
      } else {
        isVisible.value = false; // 元素离开视口
      }
    });
  };

  // 初始化 Intersection Observer
  const initObserver = () => {
    observer = new IntersectionObserver(handleIntersection, options);
    if (targetRef.value) {
      observer.observe(targetRef.value);
    }
  };

  // 页面可见性变化时重新检查
  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible" && targetRef.value) {
      observer.unobserve(targetRef.value);
      observer.observe(targetRef.value);
    }
  };

  // 组件挂载时初始化
  onMounted(() => {
    initObserver();
    document.addEventListener("visibilitychange", handleVisibilityChange);
  });

  // 组件卸载时清理
  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
    document.removeEventListener("visibilitychange", handleVisibilityChange);
  });

  // 返回目标元素的 ref 和是否可见的状态
  return {
    targetRef,
    isVisible,
  };
}

