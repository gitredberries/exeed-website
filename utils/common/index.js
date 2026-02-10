const isMobileDevice = () => {
  const userAgent = navigator?.userAgent || navigator?.vendor || window?.opera;

  // 移动设备通常包含的关键字
  const mobileDevices =
    /Android|Mobi|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i;

  // 检测 userAgent 字符串中是否包含移动设备的关键字
  const isMobile = mobileDevices.test(userAgent);

  return window?.innerWidth < 1024 ? true : isMobile;
};

const debunce = function (fn, delay = 300) {
  let timer;
  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

const changeDateMouth = (a) => {
  switch (a) {
    case "01":
      var b = "January";

      return b;

      break;

    case "02":
      var b = "February";

      return b;

      break;

    case "03":
      var b = "March";

      return b;

      break;

    case "04":
      var b = "April";

      return b;

      break;

    case "05":
      var b = "May";

      return b;

      break;

    case "06":
      var b = "June";

      return b;

      break;

    case "07":
      var b = "July";

      return b;

      break;

    case "08":
      var b = "August";

      return b;

      break;

    case "09":
      var b = "September";

      return b;

      break;

    case "10":
      var b = "October";

      return b;

      break;

    case "11":
      var b = "November";

      return b;

      break;

    case "12":
      var b = "December";

      return b;

      break;
  }
};

const carFlowAnimation = () => {
  const isMobile = isMobileDevice();
  const animatedList = document.querySelectorAll(
          '.animated-container > .animated'
  )
  const animatedTitleList = document.querySelectorAll(
          '.animated-container .animated-title'
      ) //大/小标题
      
  animatedTitleList.forEach((item, idx) => {
  const rect = item.getBoundingClientRect()
  if (
      rect.top >= 0 &&
      rect.top <= innerHeight || document.documentElement.clientHeight
      // rect.left >= 0 &&
      /* rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) */ /* &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) */
  ) {
      const isSmallText = item.tagName === 'H5'
      const isThirdText = item.classList.contains('third-text-slide-up')
      setTimeout(
          () => {
          item.classList.add('slide-up')
          },
          isThirdText ? 1000 : isSmallText ? 500 : 0
      )
      }
  })
  let time = 50
  animatedList.forEach((item, idx) => {
      const rect = item.getBoundingClientRect()
      if (item.id === 'carType' && isMobile)
          item.classList.remove('animated')
      if (
          rect.top >= 0 &&
          rect.top <= (innerHeight || document.documentElement.clientHeight)
      ) {
          const delay = item.parentNode.getAttribute('data-delay') || 0
          if (item.id === 'carType') {
              if (!isMobile) {
                  setTimeout(() => {
                      item.classList.add('slide-up')
                  }, (time += 100))
              }
          } else {
              setTimeout(() => {
                  item.classList.add('slide-up')
              }, delay);
          }
      }
  }) 
};

// 节流函数
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const Fetch = (code) => {
  const config = useRuntimeConfig();
  return new Promise((resolve, reject) => {
    fetch(
      `${config.public.apiURL}api/front/banners?code=${code}&siteCode=chery_xt`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }).then(res => {
      if (res.code === 0) {
        const data = res.data || [];
        const result = data.map(item => {
          let jsondef = {};
          if (item.jsondef) {
            try {
              jsondef = JSON.parse(item.jsondef)
            } catch (error) {
              console.log('jsondef error', error)
            }
          }
          return {
            ...item,
            jsondef,
          }
        }).sort((a, b) => a.sort - b.sort);
        resolve(result);
      } else {
        resolve([])
      }
    }).catch(error => reject(error));
  });
};

// 计算滚动距离; rootDom: 当前组件根元素dom ; domList参数为{dom: 标签的dom, percent: 该标签从底部出现到屏幕中的高度的百分比}
const calcSrollDis = (rootDom, domList, onceDom) => {
  const { scrollY } = useScroll();
  let curScrollY = 0;
  let isScrollDown = false;

  let once = true;

  onMounted(() => {
    curScrollY = document.documentElement.scrollTop;
  });

  watch(scrollY, (newVal) => {
    if (newVal > curScrollY) {
      isScrollDown = true;
    } else {
      isScrollDown = false;
    }
    curScrollY = newVal;

    const rootRect = rootDom.value.getBoundingClientRect();
    if (
      (rootRect.y > 0 && rootRect.y < window.innerHeight) ||
      (rootRect.y < 0 && -rootRect.y < rootRect.height)
    ) {
      for (let i = 0; i < domList.length; i++) {
        let domRect = domList[i].dom.value.getBoundingClientRect();
        let domTop = window.innerHeight - domRect.y;
        if (isScrollDown) {
          if (domTop >= window.innerHeight * domList[i].percent) {
            if (!domList[i].active.value) {
              domList[i].active.value = true;
            }
          }
        } else {
          if (domTop < window.innerHeight * domList[i].percent) {
            if (domList[i].active.value) {
              domList[i].active.value = false;
            }
          }
        }
      }
      if (onceDom) {
        let domRect = onceDom.dom.value.getBoundingClientRect();
        let domTop = window.innerHeight - domRect.y;
        if (once && domTop >= domRect.height * onceDom.percent) {
          onceDom.active.value++;
          once = false;
        }
      }
    }
  });
};

const getMonthName = (time) => {
  return time
    ? new Intl.DateTimeFormat("en-US", { month: "long" }).format(new Date(time))
    : "";
};

const getDate = (time) => {
  if (!time) {
    return "";
  }
  const dateString = new Date(time).toISOString();
  const [year, month, date] = dateString.match(/\d+/g);
  return date || "";
};

const getFormatDate = (date) => {
  return getMonthName(date) + " " + getDate(date);
};

export {
  isMobileDevice,
  debunce,
  changeDateMouth,
  carFlowAnimation,
  throttle,
  calcSrollDis,
  getFormatDate,
  Fetch
};
