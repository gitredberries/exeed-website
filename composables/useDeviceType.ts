import { isMobileDevice, debunce } from '~/utils/common';

function useDeviceType() {
  const isMobile = ref(false);

  const handleResize = () => {
    isMobile.value = isMobileDevice();
  }

  onMounted(() => {
    handleResize();
    window.addEventListener('resize', debunce(handleResize));
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debunce(handleResize));
  })

  return {
    isMobile
  }
}

export default useDeviceType;