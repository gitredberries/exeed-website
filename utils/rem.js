//防抖节流
function throttle(func, limit) {  
    let lastFunc;  
    let lastRan;  
    return function() {  
      const context = this;  
      const args = arguments;  
      if (!lastRan) {  
        func.apply(context, args);  
        lastRan = Date.now();  
      } else {  
        clearTimeout(lastFunc);  
        lastFunc = setTimeout(function() {  
          if ((Date.now() - lastRan) >= limit) {  
            func.apply(context, args);  
            lastRan = Date.now();  
          }  
        }, limit - (Date.now() - lastRan));  
      }  
    };  
  }
  
  ;(function flexible(window, document) {
    let docEl = document.documentElement
    let isMac = /macintosh|mac os x/i.test(navigator.userAgent)
    let dpr = isMac ? 1 :(window.devicePixelRatio || 1)
    // let dpr = window.devicePixelRatio || 1
  
    // adjust body font size
    // function setBodyFontSize () {
    //   if (document.body) {
    //     document.body.style.fontSize = 12 * dpr + 'px'
    //   } else {
    //     document.addEventListener('DOMContentLoaded', setBodyFontSize)
    //   }
    // }
  
    //setBodyFontSize();
  
    function setRemUnit() {
      // let rem = docEl.clientWidth / 19.2
  
      // if (docEl.clientWidth <= 1200 && docEl.clientWidth > 750) {
      //   rem = 1200 / 19.2
      // }
      // if (docEl.clientWidth <= 750) {
      //   // rem = docEl.clientWidth / 19.2;
      //   rem = docEl.clientWidth / 7.5 * 2;
      //   // rem = docEl.clientWidth / 7.5
      // }
  
      let rem = 100 
      let docElWidth = docEl.clientWidth
      
      if(docElWidth < 375) {
        rem = 100
      }else if (docElWidth <= 750 && docElWidth >=375 ) {
        rem = 100 + ( (docElWidth - 375 )/ 375) * 50
        // rem = (docElWidth / 750) * rem * 2
      } /* else if (docElWidth <= 1024 && docElWidth > 750 ) {
        rem = 100 + ( (docElWidth - 750 )/ 375) * 50
        // rem = (docElWidth / 750) * rem * 2
      } */ else if (docElWidth > 1024 && docElWidth <= 1440) {
        rem = ((docElWidth / 1024) *0.3 +  0.5) * rem /dpr
      } else if (docEl.clientWidth <= 1440) {
        rem = ((docElWidth / 1440) *0.3 +  0.7) * rem /dpr
      }else if(docElWidth > 3000) {
        rem = rem * 1.5 / dpr
      }else{
        rem = rem / dpr
      }
      docEl.style.fontSize = limitRem(docElWidth,rem) + 'px'
    }
  
    setRemUnit()
  
    // 窗口变化重置
    window.addEventListener('resize', setRemUnit, 300)
    // window.addEventListener('pageshow', function (e) {
    //   if (e.persisted) {
    //     setRemUnit()
    //   }
    // })
  
    function limitRem(docElWidth,num) {
      const max = docElWidth > 3000 ? 150 : 125
      return num > max ? max : (num < 75 ? 75 : num)
    }
  })(window, document)
  