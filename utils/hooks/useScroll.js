import { ref } from 'vue';

export function useScroll() {
  const isDragging = ref(false);
  const startX = ref(0);
  const scrollLeft = ref(0);

  const onMouseDown = (event) => {
    // 如果点击的是图片，阻止默认拖拽行为
    if (event.target.tagName.toLowerCase() === 'img') {
      event.preventDefault();
    }

    isDragging.value = true;
    startX.value = event.pageX - event.currentTarget.offsetLeft;
    scrollLeft.value = event.currentTarget.scrollLeft;
    event.currentTarget.style.cursor = 'grabbing'; // 更改鼠标样式
  };

  const onMouseLeave = () => {
    if (isDragging.value) {
      isDragging.value = false; // 释放拖动状态
      event.currentTarget.style.cursor = 'grab'; // 恢复鼠标样式
    }
  };

  const onMouseUp = () => {
    if (isDragging.value) {
      isDragging.value = false; // 释放拖动状态
      event.currentTarget.style.cursor = 'grab'; // 恢复鼠标样式
    }
  };

  const onMouseMove = (event) => {
    if (!isDragging.value) return; // 只有在按住鼠标时才滚动
    event.preventDefault();
    const x = event.pageX - event.currentTarget.offsetLeft;
    const walk = (x - startX.value) * 1; // 滚动速度
    event.currentTarget.scrollLeft = scrollLeft.value - walk;
  };

  return {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
  };
}