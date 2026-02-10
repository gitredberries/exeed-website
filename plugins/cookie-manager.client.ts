export default defineNuxtPlugin(() => {
  if (process.client) {
    console.log("[cookie-manager] 插件已加载 ✅");

    // Define a minimal jQuery-like selector function for cookie manager
    const $ = (selector: string | Document | any[]): any => {
      // Handle $(document).ready()
      if (selector === document || selector instanceof Document) {
        return {
          ready: (fn: Function) => {
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
              setTimeout(fn, 0);
            } else {
              document.addEventListener('DOMContentLoaded', () => fn());
            }
          }
        };
      }

      // Handle $(array).each()
      if (Array.isArray(selector)) {
        return {
          each: (callback: (index: number, item: any) => void) => {
            selector.forEach((item, index) => callback(index, item));
          }
        };
      }

      // Normal CSS selector
      const elements = document.querySelectorAll(selector as string);
      const elementArray = Array.from(elements);
      
      return {
        addClass: (className: string) => {
          elementArray.forEach(el => el.classList.add(className));
          return this;
        },
        removeClass: (className: string) => {
          elementArray.forEach(el => el.classList.remove(className));
          return this;
        },
        hasClass: (className: string) => {
          return elementArray.length > 0 && elementArray[0].classList.contains(className);
        },
        remove: () => {
          elementArray.forEach(el => el.remove());
        },
        append: (html: string) => {
          elementArray.forEach(el => el.insertAdjacentHTML('beforeend', html));
        },
        find: (sel: string) => {
          if (elementArray.length > 0) {
            return $(sel);
          }
          return $('');
        },
        parent: () => {
          if (elementArray.length > 0 && elementArray[0].parentElement) {
            const parent = elementArray[0].parentElement;
            return {
              find: (sel: string) => {
                const found = parent.querySelectorAll(sel);
                const arr = Array.from(found);
                return {
                  addClass: (className: string) => arr.forEach(el => el.classList.add(className)),
                  removeClass: (className: string) => arr.forEach(el => el.classList.remove(className)),
                };
              }
            };
          }
          return { find: () => ({ addClass: () => {}, removeClass: () => {} }) };
        },
        on: (event: string, selectorOrHandler: string | Function, handler?: Function) => {
          if (typeof selectorOrHandler === 'function') {
            elementArray.forEach(el => el.addEventListener(event, selectorOrHandler as EventListener));
          } else if (handler) {
            // Delegated event
            elementArray.forEach(el => {
              el.addEventListener(event, (e: Event) => {
                const target = e.target as Element;
                if (target && target.closest(selectorOrHandler)) {
                  handler.call(target.closest(selectorOrHandler), e);
                }
              });
            });
          }
        },
        each: (callback: (this: Element) => void) => {
          elementArray.forEach((el, i) => callback.call(el));
        },
        attr: (name: string, value?: string) => {
          if (value !== undefined) {
            elementArray.forEach(el => el.setAttribute(name, value));
          } else {
            return elementArray.length > 0 ? elementArray[0].getAttribute(name) : null;
          }
        },
        length: elementArray.length,
      };
    };

    // Make $ available for the functions below
    (window as any).$ = $;

    function initCookieManager() {
      // cookie
      var cookieState = localStorage.getItem("Cookie-Num");
      console.log("cookie:" + cookieState);

      var cookieHtml = `<div class="cookie_box">
			<div class="cookie_box_main">
				<div class="cookie_text">
					<div class="cookie_title">
						Privacy Preference Center
					</div>
					<div class="cookie_detail">
						We place cookies in order to make sure our website works properly and to improve your browsing experience, to streamline and personalize our marketing content and to show you personalized advertisements (including on third party websites). We sometimes share cookie data with our partners for these purposes. Our cookies remember your settings and the data you fill out on forms on our website and analyse traffic to our website. Our cookies also register how you found us and collect information about your browsing habits. You can read more about our use of cookies in our <a target="_blank" href="https://www.exeedinternational.com/home/cookiespolicy/index.shtml">Cookie Notice</a>.
					</div>
				</div>
				<div class="cookie_btn">
					<div class="cookie_b_t">
						<div class="cookie_setting">
							COOKIE SETTINGS
						</div>
					</div>
					<div class="cookie_b_b">
						<div class="cookie_reject">
							REJECT ALL
						</div>
						<div class="cookie_accept">
							ACCEPT ALL
						</div>
					</div>
				</div>
			</div>
			<div class="cookie_setting_detail">
				<div class="cookie_title">Cookie Settings</div>
				<div class="tcb_min">
					<div class="tc_left active no_choose" data-name='cookie_strictly'>
						<div class="tcl_icon_01">✔️</div>
					</div>
					<div class="tc_right">
						<div class="tcr_line_1">
							<div class="tcrl_title">
								Strictly Necessary Cookies 
							</div>
							<div class="tcrl_more">
								<a href="https://www.exeedinternational.com/home/cookiespolicy/index.shtml#sc_1">MORE INFORMATION</a>
								<img src="/images/common/blod_c.png" alt="">
							</div>
						</div>
						<div class="tcr_line_2">
							These cookies are used to ensure that our website operates correctly and they cannot be deactivated.
						</div>
						<div class="tcr_line_3">
							<div class="tcrl_detail_btn">
								<a>DETAILS</a>
								<img src="/images/common/blod_c.png" alt="">
							</div>
						</div>
						<div class="cookie_unfold_box">
							<div class="cooub_t1">
								Strictly necessary cookies are necessary for the proper functioning of our website and to help you access and move around our site and use all its features. We also use functional cookies, for example to remember your language preferences to save you the trouble of having to change these every time you enter our website. Without these cookies, our website would not work properly and you would not be able to use certain important features.
							</div>
							<div class="cooub_t2">
								<div class="cooub_tab_t">
									<div>Name</div>
									<div>Domain</div>
									<div>Purpose</div>
									<div>Lifetime</div>
								</div>
								<div class="cooub_tab_d">
									<div>HWAFSESSID</div>
									<div>www.exceedinternational.com</div>
									<div>Application Firewall of Huawei Cloud </div>
									<div>Session</div>
								</div>
								<div class="cooub_tab_d">
									<div>HWAFSESTIME</div>
									<div>www.exceedinternational.com</div>
									<div>Application Firewall of Huawei Cloud</div>
									<div>Session </div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="tcb_min">
					<div class="tc_left" data-name='cookie_analytics'>
						<div class="tcl_icon_01">✔️</div>
					</div>
					<div class="tc_right">
						<div class="tcr_line_1">
							<div class="tcrl_title">
								Analytics Cookies
							</div>
							<div class="tcrl_more">
								<a href="https://www.exeedinternational.com/home/cookiespolicy/index.shtml#sc_2">MORE INFORMATION</a>
								<img src="/images/common/blod_c.png" alt="">
							</div>
						</div>
						<div class="tcr_line_2">
							We use analytics cookies to improve the quality of our website and its content, and to ensure that our partners’ embedded services work properly.
						</div>
						<div class="tcr_line_3">
							<div class="tcrl_detail_btn">
								<a>DETAILS</a>
								<img src="/images/common/blod_c.png" alt="">
							</div>
						</div>
						<div class="cookie_unfold_box">
							<div class="cooub_t1">
								We use Google Analytics to place and read cookies for the abovementioned use. We have changed our Google Analytics settings to further protect your privacy. For example, we have made sure that the last octet of your IP-address is invisible and have turned off the setting which allows sharing data with Google. We are also not using any other Google Analytics related cookie services which are offered by Google.
							</div>
							<div class="cooub_t2">
								<div class="cooub_tab_t">
									<div>Name</div>
									<div>Domain</div>
									<div>Purpose</div>
									<div>Lifetime</div>
								</div>
								<div class="cooub_tab_d">
									<div>_ga</div>
									<div>exceedinternational.com</div>
									<div>Used to distinguish user</div>
									<div>2 years</div>
								</div>
								<div class="cooub_tab_d">
									<div>_gid</div>
									<div>exceedinternational.com</div>
									<div>Used to distinguish user</div>
									<div>1 day(s) </div>
								</div>
								<div class="cooub_tab_d">
									<div>_gat_gtag_xxxxxx<br/>xxxxxxxxxxxxxxxxxxxxx</div>
									<div>exceedinternational.com</div>
									<div>Used to throttle request rate</div>
									<div>Expired</div>
								</div>
								<div class="cooub_tab_d">
									<div>_ga_2ZGXECS4W4</div>
									<div>exceedinternational.com</div>
									<div>Used to persist session state</div>
									<div>2 years</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="cookie_setting_btns">
					<div class="cookie_setting_back">Back</div>
					<div class="cookie_setting_save">Save and Close</div>
				</div>
			</div>
		</div>`;

      // 页面信息
      var page_message = {
        id: "",
        type: "", // 首页 index 车型页 car 新闻 news
        title: "",
        cookie_strictly: localStorage.getItem("cookie_strictly"), // 1 agree
        cookie_analytics: localStorage.getItem("cookie_analytics"),
      };

      function verifyCookie() {
        // 获取Session内参数值
        var session_str = localStorage.getItem("cookie_strictly");
        var session_ana = localStorage.getItem("cookie_analytics");
        console.log(session_str, session_ana);
        if (session_str == 1) {
          $('[data-name="cookie_strictly"]').addClass("active");
        } else {
          $('[data-name="cookie_strictly"]').removeClass("active");
        }
        if (session_ana == 1) {
          $('[data-name="cookie_analytics"]').addClass("active");
        } else {
          $('[data-name="cookie_analytics"]').removeClass("active");
        }
        // 无session值时 默认选择
        if (!session_str) {
          page_message.cookie_strictly = 1;
          localStorage.setItem("cookie_strictly", 1);
        }
        // if(!session_ana){
        // 	page_message.cookie_analytics = 1
        // 	localStorage.setItem('cookie_analytics', 1);
        // }
      }

      verifyCookie();

      $(document).ready(function () {
        // google
        function addSdk() {
          console.log("sdk_into");
          var urls = [
            "https://www.googletagmanager.com/gtag/js?id=G-2ZGXECS4W4",
          ];
          var s = document.getElementsByTagName("script")[0];
          $(urls).each(function (i, url) {
            (function (src) {
              var script = document.createElement("script");
              script.src = src;
              // script.charset = 'UTF-8';
              s.parentNode.insertBefore(script, s);
            })(url);
          });

          window.dataLayer = window.dataLayer || [];
          function gtag() {
            dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "G-2ZGXECS4W4");
        }

        function removeSdk() {
          console.log("sdk_out");
          var scriptElements = document.querySelectorAll(
            "script[src='https://www.googletagmanager.com/gtag/js?id=G-2ZGXECS4W4'],script[src='https://www.google-analytics.com/analytics.js'],script[src='https://www.googletagmanager.com/gtag/js?id=UA-270270641-1&l=dataLayer&cx=c']"
          );
          scriptElements.forEach(function (element) {
            element.remove();
          });

          delete window.dataLayer;
          setTimeout(function () {
            document.cookie =
              "_ga_2ZGXECS4W4=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie =
              "_gat_gtag_UA_270270641_1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }, 300);
        }

        console.log("page_message", page_message);
        if (
          !cookieState ||
          cookieState == null ||
          cookieState == undefined ||
          cookieState != "agree"
        ) {
          if (page_message.id != 20039 && page_message.id != 20040) {
            removeSdk();
            $("body").append(cookieHtml);
          }
        } else if (localStorage.getItem("cookie_analytics") === "1")  {
          addSdk();
        }
        $("body").on("click", ".cookie_accept", function () {
          localStorage.setItem("Cookie-Num", "agree");
          localStorage.setItem("cookie_analytics", 1);
          localStorage.setItem("cookie_strictly", 1);
          $('[data-name="cookie_analytics"]').addClass("active");
          $(".cookie_box").remove();
          addSdk();
        });
        // 点击拒绝
        $("body").on("click", ".cookie_reject", function () {
          $('[data-name="cookie_analytics"]').removeClass("active");
          localStorage.setItem("cookie_analytics", 0);
          localStorage.setItem("Cookie-Num", null);
          $(".cookie_box").remove();
          removeSdk();
        });
        // cookie setting
        $("body").on("click", ".cookie_setting", function () {
          var session_str_s = localStorage.getItem("cookie_strictly");
          var session_ana_s = localStorage.getItem("cookie_analytics");
          if (session_str_s == 1) {
            $('[data-name="cookie_strictly"]').addClass("active");
          } else {
            $('[data-name="cookie_strictly"]').removeClass("active");
          }
          if (session_ana_s == 1) {
            $('[data-name="cookie_analytics"]').addClass("active");
          } else {
            $('[data-name="cookie_analytics"]').removeClass("active");
          }
          $(".cookie_setting_detail").addClass("active");
        });
        // cookie back
        $("body").on("click", ".cookie_setting_back", function () {
          $(".cookie_setting_detail").removeClass("active");
        });
        // cookie save
        $("body").on("click", ".cookie_setting_save", function () {
          var dom = $('[data-name="cookie_analytics"]');
          if (dom.hasClass("active")) {
            addSdk();
            localStorage.setItem("cookie_analytics", 1);
            localStorage.setItem("Cookie-Num", "agree");
          } else {
            removeSdk();
            localStorage.setItem("Cookie-Num", null);
            localStorage.setItem("cookie_analytics", 0);
          }
          $(".cookie_setting_detail").removeClass("active");
          $(".cookie_box").remove();
        });
        // cookie detail
        $("body").on(
          "click",
          ".cookie_setting_detail .tcr_line_3",
          function () {
            $(".cookie_unfold_box").removeClass("active");
            $(this).parent().find(".cookie_unfold_box").addClass("active");
          }
        );
        // cookie check button
        $("body").on("click", ".cookie_setting_detail .tc_left", function () {
          if ($(this).hasClass("active")) {
            $(this).removeClass("active");
          } else {
            $(this).addClass("active");
          }
        });
        // 插入 cookieHtml 之后添加这段
        setTimeout(() => {
          $(".cookie_box a").each(function () {
            const href = $(this).attr("href");
            if (href && href.includes("cookiespolicy/index.shtml")) {
              const hash = href.split("#")[1] || "";
              $(this).attr("href", `/cookiesPolicy`);
              // $(this).attr('href', `/cookiesPolicy${hash ? '#' + hash : ''}`);
            }
          });
        }, 0);
      });
    }

    initCookieManager();
  }
});
