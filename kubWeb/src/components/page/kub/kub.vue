<template>
  <div class="kub">
    <headers style="headera"></headers>
    <div class="header_di"></div>
    <section class="aboutKub" v-if="kubInfos">
      <div class="item" :style="{backgroundImage: 'url(' + kubInfos.kubDetailsBackground +')'}">
        <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
          <div
            class="containerkub animated"
            animate-delay="0.2s"
            animate-duration="0.8s"
            v-if="loading"
          >
            <h2 class="title">
              {{kubInfos.kubTitle}}
              <span class="line"></span>
            </h2>
            <div class="desc" v-html="kubInfos.kubContent"></div>
          </div>
        </transition>
      </div>
    </section>
    <section class="met-show" v-if="kubInfos">
      <div class="containerCon">
        <div class="met-editor">
          <div v-html="kubInfos.kubDetailsContent"></div>
        </div>
      </div>
    </section>
    <section class="met-show-class1" v-if="kubInfos">
      <div class="item" :style="{backgroundImage: 'url(' + kubInfos.boosPhoto +')'}">
        <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
          <div
            class="containerYang animated"
            animate-delay="0.2s"
            animate-duration="0.8s"
            v-if="people"
          >
            <h2 class="title">
              {{lang=='zh'?'关于创始人':'About the founder'}}
              <span class="line"></span>
            </h2>
            <div class="desc" v-html="kubInfos.boosIntroduce"></div>
          </div>
        </transition>
      </div>
    </section>
    <footers></footers>
  </div>
</template>
<script>
import animate from "animate.css";
export default {
  data() {
    return {
      lang: "zh",
      loading: false,
      people: false,
      kubInfos: [],
      content: ""
    };
  },
  mounted() {
    // this.people = true
    this.loading = true;
    document.documentElement.scrollTop = 0;
  },
  created() {
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.scroll();
    this.getKubInfos();
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.getKubInfo();
    });
  },
  methods: {
    //获取kub信息
    getKubInfos() {
      this.$.Post(
        "/kubgw/page/kubgw/kub/kubNavigatKub/getKubNavigatKubInfo11",
        {},
        res => {
          this.kubInfos = res[0];
        }
      );
    },
    scroll() {
      window.addEventListener(
        "scroll",
        () => {
          let top = document
            .querySelector(".met-show-class1")
            .getBoundingClientRect().top;
          console.log(top);
          let position = document.documentElement.scrollTop;
          if (top < 700) {
            this.people = true;
          }
        },
        false
      );
    },
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
  },
  beforeDestroy() {
    this.$Bus.$off("changeLanguage");
  },
  destroyed() {
    this.$Bus;
  }
};
</script>

<style scoped lang="scss">
@import "../../../basic/kub.scss";
</style>