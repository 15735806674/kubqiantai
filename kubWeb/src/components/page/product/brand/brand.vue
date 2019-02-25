 <template>
  <div class="kub_brand">
    <headers></headers>
    <div class="header_di"></div>
    <div class="banner">
      <div class="banner-warpper">productMainPhoto
        <div
          class="banner-item"
          :style="{backgroundImage: 'url(' + detailInfo.productMainPhoto +')'}"
        >
          <div class="banner-text">
            <div class="containerM">
              <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
                <h4
                  class="title animated"
                  animate-delay="0.1s"
                  animate-duration="1s"
                  v-if="loading"
                >{{detailInfo.productTitle}}</h4>
              </transition>
              <!-- <span class="line"></span> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="met-column-nav">
      <div class="slide">
        <div class="row">
          <div class="slide-title">
            <ul class="met-column-nav-ul">
              <li v-for="(item,index) in slide" @click="select(item)">
                <a
                  class="link"
                  :class="item.productTitle == active?'active' : ''"
                >{{item.productTitle}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="brandShow">
      <div class="containershow">
        <div class="row">
          <div class="met-editor">
            <p class="imgs">
              <img :src="detailInfo.productBackground">
            </p>
            <p class="title">
              <strong>{{detailInfo.productTitle}}</strong>
            </p>
            <p class="desc" v-html="detailInfo.productContent"></p>
            <p class="tableTitle">{{detailInfo.title}}</p>
            <table class="tableImg">
              <tbody>
                <tr class="imgs">
                  <td v-for="item in detailInfo.list">
                    <a :href="item.productUrl" target="_blank">
                      <img :src="item.productPhoto">
                    </a>
                  </td>
                </tr>
                <tr class="name">
                  <td v-for="item in detailInfo.list">
                    <a :href="item.productUrl" target="_blank">{{item.productName}}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <footers style="margin-top:50px;"></footers>
  </div>
</template>
<script>
import animate from "animate.css";
export default {
  inject: ["reload"],
  data() {
    return {
      lang: "zh",
      active: HGetHashUrl("name"),
      loading: false,
      title: "",
      slide: [],
      detailInfo: {},
      id: "",
      content:
        '<p>贝豪，是国内领先的母婴公司，旗下拥有可优比、蒂爱、米歌、麦可适、贝豪优选等众多知名母婴品牌，核心专注自主优质母婴产品研发、母婴品牌运作，目前已实现自有母婴品牌运作、销售、管理、工厂、仓储、物流一体化，同时已辐射全国所有省、市、自治区。</p><p><br></p><p>拥有业内首屈一指的研发中心，现有产品已实现专利化，拥有100多个专利设计，通过多项国际权威质检测试，并获得包括德国红点设计奖、IF设计奖等国内外顶尖奖项。</p><p><br></p><p><span style="color: rgb(25, 31, 37); background-color: rgb(255, 255, 255);">旗下产品体系涵盖睡眠用品、出行用品、洗浴用品、幼教玩具、洗护产品、孕产用品、哺乳喂养、服饰鞋帽等8大品类。</span></p>'
    };
  },
  mounted() {
    this.loading = true;
    this.title = this.active;
    document.documentElement.scrollTop = 0;
  },
  created() {
    this.scroll();
    this.getTitle();
    // this.getDetail()
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.getTitle();
    });
  },
  methods: {
    getTitle() {
      this.$.Post(
        "/kubgw/page/kubgw/product/kubNavigatProduct/getKubProductTitleInfo",
        {},
        res => {
          this.slide = res;
          this.slide.forEach((item, index) => {
            if (item.productTitle == this.active) {
              this.id = item.id;
              this.getDetail();
            }
            // item.select = false
            // this.loading = item.select
          });
        }
      );
    },
    getDetail() {
      this.$.Post(
        "/kubgw/page/kubgw/product/kubNavigatProduct/getKubNavigatProductDetailsInfo",
        { id: this.id },
        res => {
          this.detailInfo = res[0];
        }
      );
    },
    select(item) {
      this.active = item.productTitle;
      this.title = item.productTitle;
      this.id = item.id;
      // item.select = true
      // this.loading = item.select
      this.getDetail();
      let url = window.location.href;
      let newurl = this.changeURLArg(url, "name", item.productTitle);
      let stateObject = {};
      let title = "";
      history.pushState(stateObject, title, newurl);
      this.reload();
    },
    changeURLArg(url, arg, arg_val) {
      var pattern = arg + "=([^&]*)";
      var replaceText = arg + "=" + arg_val;
      if (url.match(pattern)) {
        var tmp = "/(" + arg + "=)([^&]*)/gi";
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
      } else {
        if (url.match("[?]")) {
          return url + "&" + replaceText;
        } else {
          return url + "?" + replaceText;
        }
      }
      return url + "\n" + arg + "\n" + arg_val;
    },
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
@import "../../../../basic/brand.scss";
</style>