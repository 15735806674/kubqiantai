 <template>
  <div class="kub_message">
    <headers></headers>
    <div class="header_di"></div>
    <div class="banner">
      <div class="banner-warpper">
        <div class="banner-item" :style="{backgroundImage: 'url(' + productImg +')'}">
          <div class="banner-text">
            <div class="containerM">
              <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
                <h4
                  class="title animated"
                  animate-delay="0.1s"
                  animate-duration="1s"
                  v-if="loading"
                >{{title}}</h4>
              </transition>
              <span class="line"></span>
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
                <a class="link" :class="item.value == active?'active' : ''">{{item.label}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <section class="met-news" v-if="newsList.length>0">
      <div class="containerNew">
        <div class="row">
          <div class="met-news-body">
            <div class="row">
              <div class="met-news-list">
                <ul class="met-page-ajax">
                  <li class="news-list" v-for="item in newsList" v-if="newsList.length>0">
                    <div class="news-box clearfix">
                      <el-row>
                        <el-col :span="6">
                          <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
                            <div
                              class="left animated"
                              animate-delay="0.1s"
                              animate-duration="0.8s"
                              v-if="loading"
                            >
                              <img :src="item.newsPhotoUrl" class="cover-img">
                            </div>
                          </transition>
                        </el-col>
                        <el-col :span="18">
                          <div class="right">
                            <transition
                              enter-active-class="fadeInUp"
                              v-on:before-enter="beforeEnter"
                            >
                              <h4
                                class="media-heading animated"
                                animate-delay="0.3s"
                                animate-duration="0.8s"
                                v-if="loading"
                              >
                                <a>{{item.newTitle}}</a>
                              </h4>
                            </transition>
                            <transition
                              enter-active-class="fadeInUp"
                              v-on:before-enter="beforeEnter"
                            >
                              <div
                                class="clearfix animated"
                                animate-delay="0.5s"
                                animate-duration="0.8s"
                                v-if="loading"
                              >
                                <p class="desc">{{item.newDescr}}</p>
                                <a class="more" @click="jumpNew(item)">
                                  <span class data-more="MORE">MORE</span>
                                </a>
                              </div>
                            </transition>
                            <transition
                              enter-active-class="fadeInUp"
                              v-on:before-enter="beforeEnter"
                            >
                              <p
                                class="info animated"
                                animate-delay="0.8s"
                                animate-duration="0.8s"
                                v-if="loading"
                              >
                                <span>{{item.newsDate.substr(5,9)}}</span>
                                <span>/</span>
                                <span>{{item.newsDate.substr(0,4)}}</span>
                              </p>
                            </transition>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </li>
                </ul>
                <div class="met_pager" v-if="total<=pageSize">
                  <span class="pageinfo" v-if="lang=='zh'">共
                    <strong>1</strong> 页
                    <strong>{{total}}</strong> 条记录
                  </span>
                  <span class="pageinfo" v-else>total
                    <strong>1</strong> page
                    <strong>{{total}}</strong> record
                  </span>
                </div>
                <div class="met_pager" v-else>
                  <a class="NextA" @click="firstPage">{{lang == 'zh' ? '首页' : 'home'}}</a>
                  <a
                    v-for="item in news"
                    :class="item == pageNo ? 'active' : ''"
                    @click="current(item)"
                  >{{item}}</a>
                  <a
                    class="NextA"
                    @click="nextPage"
                    v-if="pageNo!==news.length"
                  >{{lang == 'zh' ? '下一页' : 'next'}}</a>
                  <a class="NextA" @click="lastPage">{{lang == 'zh' ? '末页' : 'last'}}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footers></footers>
  </div>
</template>
<script>
import animate from "animate.css";
export default {
  inject: ["reload"],
  data() {
    return {
      lang: "zh",
      title: "",
      active: -1,
      loading: false,
      slide: [],
      news: [],
      newsList: [
        {
          id: 0,
          delay: "0s"
        },
        {
          id: 1,
          delay: "0s"
        },
        {
          id: 2,
          delay: "0s"
        },
        {
          id: 3,
          delay: "0s"
        }
      ],
      pageNo: 1,
      pageSize: 5,
      id: "",
      total: 0,
      productImg: ""
    };
  },
  mounted() {
    this.loading = true;
    document.documentElement.scrollTop = 0;
    if (this.lang == "zh" && this.active == -1) {
      this.title = "资讯";
    } else if (this.lang == "en" && this.active == -1) {
      this.title = "information";
    }
  },
  created() {
    this.scroll();
    this.getTitle();
    this.getNewList();
    this.getImg();
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.getTitle();
      this.getNewList();
      this.getImg();
    });
  },
  methods: {
    // getMonth(date) {
    //    // var year = ""
    //    return date.substr(5,9)
    // },
    // getYear(date) {
    //    // var year = ""
    //    return date.substr(0,4)
    // },
    getImg() {
      this.$.Post(
        "/kubgw/page/kubgw/home/kubNavigatPhoto/getKubBackgroundInfo",
        { type: 2 },
        res => {
          this.productImg = res.background;
        }
      );
    },
    getTitle() {
      this.$.Post(
        "/kubgw/page/kubgw/news/kubNavigatNews/getNewsTypeDict",
        {},
        res => {
          this.slide = res;
          this.slide.forEach((item, index) => {
            if (this.id == item.value) {
              this.title = item.label;
            }
          });
        }
      );
    },
    getNewList() {
      this.id = HGetHashUrl("id");
      this.$.Post(
        "/kubgw/page/kubgw/news/kubNavigatNews/getKubNewsInfo2",
        { pageNo: this.pageNo, pageSize: this.pageSize, newsType: this.id },
        res => {
          this.newsList = res.body.list;
          this.active = this.id;
          this.total = res.body.count;
          // if(this.lang == 'zh' && this.active == -1) {
          //      this.title = '资讯'
          //  } else if(this.lang == 'en' && this.active == -1) {
          //      this.title = 'information'
          //  }
          let all = Math.ceil(res.body.count / this.pageSize);
          for (var i = 0; i < all; i++) {
            this.news.push(i + 1);
          }
        }
      );
    },
    page() {
      document.documentElement.scrollTop = 0;
      this.$.Post(
        "/kubgw/page/kubgw/news/kubNavigatNews/getKubNewsInfo2",
        { pageNo: this.pageNo, pageSize: this.pageSize, newsType: this.id },
        res => {
          this.newsList = res.body.list;
          this.total = res.body.count;
        }
      );
    },
    // 翻页
    current(item) {
      this.pageNo = item;
      this.page();
    },
    //下一页
    nextPage() {
      this.pageNo += 1;
      this.page();
    },
    //首页
    firstPage() {
      this.pageNo = this.news[0];
      this.page();
    },
    //末页
    lastPage() {
      this.pageNo = this.news.length;
      this.page();
    },
    jumpNew(item) {
      this.$router.push("/news?type=" + HGetHashUrl("type") + "&id=" + item.id);
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
    select(item) {
      this.active = item.value;
      this.title = item.label;
      // this.id = item.value
      this.id = HGetHashUrl("id");
      this.pageNo = 1;
      let url = window.location.href;
      let newurl = this.changeURLArg(url, "id", item.value);
      let stateObject = {};
      let title = "";
      history.pushState(stateObject, title, newurl);
      this.page();
      this.reload();
    },
    scroll() {
      window.addEventListener("scroll", () => {}, false);
    },
    beforeEnter: function(el) {
      var delay = el.getAttribute("animate-delay"),
        duration = el.getAttribute("animate-duration");
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
@import "../../../basic/message.scss";
</style>