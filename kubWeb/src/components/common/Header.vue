<template>
  <div class="nav_header">
    <nav class="kub_nav">
      <div class="nav-logo">
        <a href class="logo" title="可优比官方网站-可优比母婴用品有限公司" @click="toHome">
          <img
            class="logo1"
            src="../../assets/img/kub.png"
            alt="可优比官方网站-可优比母婴用品有限公司"
            title="可优比官方网站-可优比母婴用品有限公司"
          >
        </a>
      </div>
      <div class="nav-box">
        <ul class="nav-ul">
          <li class="nav-li" v-for="(item,index) in meun" @click="jumpTo1(item,index)">
            <a :title="item.name">
              <p :class="item.type == active?'active':''" class="select"></p>
              <b :class="item.type == active?'activeColor':''">{{item.name}}</b>
            </a>
          </li>
        </ul>
        <div class="nav-side side-nofirst" @click="slideNav">
          <hr>
          <hr>
          <hr>
        </div>
      </div>
    </nav>
    <div class="mask" v-if="slide" @click="slideOut"></div>
    <div class="slide-nav">
      <div class="slide-close" @click="slideOut"></div>
      <transition enter-active-class="zoomIn" v-on:before-enter="beforeEnter">
        <div class="logo-2 animated" animate-delay="0.3s" animate-duration="0.5s" v-if="slide">
          <img src="../../assets/img/kub.png" alt="可优比母婴用品有限公司比官方网站-可优比母婴用品有限公司">
        </div>
      </transition>
      <div class="navlist">
        <transition-group enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
          <li
            class="nav-item animated"
            v-for="(item,index) in navs"
            :key="item.name"
            :animate-delay="item.postpone"
            animate-duration="0.5s"
            v-if="slide"
          >
            <a :title="item.name" class="link" @click="jumpTo(item)">{{item.name}}</a>
          </li>
        </transition-group>
        <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
          <li class="nav-item animated" animate-delay="1s" animate-duration="0.5s" v-if="slide">
            <a class="linkEn">
              <span @click="setLang('zh')">中</span>/
              <span @click="setLang('en')">EN</span>
            </a>
          </li>
        </transition>
        <div class="side-foot" v-if="lang=='zh'">
          <div class="side-qrcode">
            <img src="../../assets/img/erweima.png" alt="可优比官方网站-可优比母婴用品有限公司">
          </div>
          <div class="side-phone">
            <p>官方热线：kubgroup@baho.cn</p>
          </div>
          <div class="side-text">Copyright © 2018 可优比母婴用品有限公司</div>
        </div>
        <div class="side-foot" v-else>
          <div class="side-qrcode">
            <img src="../../assets/img/erweima.png">
          </div>
          <div class="side-phone">
            <p>Official hotline：kubgroup@baho.cn</p>
          </div>
          <div
            class="side-text"
          >Copyright © 2018 Hangzhou KUB Baby Products Co., Ltd, Copyright ownership</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: -1,
      lang: "zh",
      slide: false,
      navs: [],
      meun: []
    };
  },
  created() {
    this.active = HGetHashUrl("type");
    this.getNav();
    this.getMenu();
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.getNav();
      this.getMenu();
    });
  },
  methods: {
    toHome() {
      this.$router.push("/home");
    },
    getNav() {
      this.$.Post("/kubgw/page/kubgw/user/kubmenu/getKubMenuInfo", {}, res => {
        this.navs = res;
        this.$.setStore("getNav", JSON.stringify(this.navs));
      });
    },
    getMenu() {
      this.meun = JSON.parse(this.$.getStore("getNav"));
    },
    setLang(lang) {
      if (lang == "zh") {
        this.lang = "zh";
      } else {
        this.lang = "en";
      }
      this.$.setStore("lang", this.lang);
      this.$Bus.$emit("changeLanguage", this.lang);
      this.slide = false;
      document.querySelector(".slide-nav").style.right = "-21%";
      // window.location.href = ''
      this.$router.push("/");
    },
    slideNav() {
      this.slide = true;
      let move = document.querySelector(".slide-nav");
      move.style.right = "0px";
    },
    slideOut() {
      this.slide = false;
      document.querySelector(".slide-nav").style.right = "-21%";
    },
    jumpTo(item, index) {
      if (item.url == "home") {
        this.$router.push("/" + item.url);
      } else {
        this.$router.push("/" + item.url + "?type=" + item.type);
      }
    },
    jumpTo1(item) {
      if (item.url == "home") {
        this.$router.push("/" + item.url);
      } else {
        this.$router.push("/" + item.url + "?type=" + item.type);
      }
    },
    moveTo() {},
    beforeEnter: function(el) {
      var delay = el.getAttribute("animate-delay"),
        duration = el.getAttribute("animate-duration");
      console.log("attr:" + delay, duration);
      var cssObj = {
        "animation-delay": delay,
        "-webkit-animation-delay": delay,
        "animation-duration": duration,
        "-webkit-animation-duration": duration,
        visibility: "visible"
      };
      var getCssText = function(obj) {
        var text = [];
        for (var o in obj) {
          text.push(o + ":" + obj[o]);
        }
        return text.join(";");
      };
      el.style.cssText = getCssText(cssObj);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../basic/header.scss";
</style>