import { ref, onMounted } from 'vue';

export function useSwiper(items) { // 接收外部传入的 items
  const currentIndex = ref(0); // 当前激活的索引
  const itemWidth = ref(0); // 每个子项的宽度

  // 获取子项宽度
  const getWidth = () => {
    const item = document.querySelector('.swiper_content .item');
    if (item) {
      itemWidth.value = item.offsetWidth;
    }
  };

  // 上一张
  const prev = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };

  // 下一张
  const next = () => {
    if (currentIndex.value < items.value.length - 1) {
      currentIndex.value++;
    }
  };

  // 跳转到指定索引
  const goToSlide = (index) => {
    if (index >= 0 && index < items.value.length) {
      currentIndex.value = index;
    }
  };

  // 鼠标滑动相关变量
  let startX = 0;
  let isDragging = false;

  // 鼠标按下事件
  const onMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
  };

  // 鼠标移动事件
  const onMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - startX;
      if (deltaX > 50 && currentIndex.value > 0) {
        prev();
        isDragging = false;
      } else if (deltaX < -50 && currentIndex.value < items.value.length - 1) {
        next();
        isDragging = false;
      }
    }
  };

  // 鼠标松开事件
  const onMouseUp = () => {
    isDragging = false;
  };

  // 鼠标离开事件
  const onMouseLeave = () => {
    isDragging = false;
  };

  // 组件挂载时获取子项宽度
  onMounted(() => {
    getWidth();
  });

  return {
    currentIndex,
    itemWidth,
    prev,
    next,
    goToSlide,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
  };
}