 <template>
  <div class="kub_news">
    <headers></headers>
    <div class="header_di"></div>
    <section class="met-shownews">
      <div class="newcontainer">
        <div class="row">
          <div class="header">
            <h1>{{news.newTitle}}</h1>
            <div class="info">
              <span>{{news.newsDate}}</span>
            </div>
          </div>
          <div class="met-editor">
            <div v-html="news.content"></div>
          </div>
        </div>
      </div>
    </section>
    <footers></footers>
  </div>
</template>
<style>
.ql-align-center {
  text-align: center;
}
.ql-align-center img {
  width: 100%;
}
</style>
<script>
import animate from "animate.css";
export default {
  data() {
    return {
      news: {},
      content: "",
      lang: "zh"
    };
  },
  mounted() {},
  created() {
    this.scroll();
    this.getNews();
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.getNews();
    });
  },
  methods: {
    getNews() {
      this.$.Post(
        "/kubgw/page/kubgw/news/kubNavigatNews/getKubNewsDetailsInfo",
        { id: HGetHashUrl("id") },
        res => {
          this.news = res[0];
        }
      );
    },
    select(item) {},
    scroll() {
      window.addEventListener("scroll", () => {}, false);
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
  }
};
</script>

<style scoped lang="scss">
@import "../../../basic/news.scss";
</style>