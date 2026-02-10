!(function flexible(window, document) {
  let docEl = document.documentElement;
  let isMac = /macintosh|mac os x|safari/i.test(navigator.userAgent);
  let dpr = isMac ? 1 : (window.devicePixelRatio || 1);

  function setRemUnit() {
    let rem = 100;
    let docElWidth = docEl.clientWidth;

    if (docElWidth < 375) {
      rem = 100 -  ((375 - docElWidth ) / 375) * 50;
    } else if (docElWidth <= 1024 && docElWidth > 375) {
      rem = 100 + ((docElWidth - 375) / 649) * 25
    }   else if (docElWidth > 1024 && docElWidth <= 1440) {
      rem = ((docElWidth / 1440) * 0.5 + 0.4) * rem / dpr
    } else if (docElWidth >= 1440 && docEl.clientWidth <= 1920) {
      rem = ((docElWidth / 1920)) * rem / dpr
    } else if (docElWidth > 3000) {
      rem = rem * 1.5 / dpr
    } else {
      rem = rem / dpr
    }
    docEl.style.fontSize = limitRem(docElWidth, rem) + 'px'
  }

  setRemUnit()

  // 窗口变化重置
  window.addEventListener('resize', setRemUnit, 300)

  function limitRem(docElWidth, num) {
    const max = docElWidth > 3000 ? 150 : 125
    return num > max ? max : (num < 50 ? 50 : num)
  }
})(window, document)
