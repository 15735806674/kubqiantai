<template>
  <div class="fullpage-container">
    <nav class="kub_nav" :class="active == 0 ? 'firstPage':''">
      <div class="nav-logo">
        <a href class="logo" title="可优比官方网站-可优比母婴用品有限公司" @click="toHome">
          <img
            class="logo1"
            src="../../../assets/img/kub.png"
            alt="可优比官方网站可优比母婴用品有限公司"
            title="可优比官方网站可优比母婴用品有限公司"
          >
        </a>
      </div>
      <div class="nav-box">
        <ul class="nav-ul">
          <li class="nav-li" v-for="(item,index) in nav" @click="moveTo(index)">
            <a :title="item.name">
              <p :class="index == active?'active':''" class="select"></p>
              <b :class="index == active?'actives':''">{{item.name}}</b>
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
          <img src="../../../assets/img/kub.png" alt="可优比母婴用品有限公司比官方网站-可优比母婴用品有限公司">
        </div>
      </transition>
      <div class="navlist">
        <transition-group enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
          <li
            class="nav-item animated"
            v-for="(item,index) in nav"
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
        <div class="side-foot">
          <div class="side-qrcode">
            <img src="../../../assets/img/erweima.png" alt="可优比官方网站-可优比母婴用品有限公司">
          </div>
          <div class="side-phone">
            <p>{{lang=='zh' ? '官方热线':'Official hotline'}}：kubgroup@baho.cn</p>
          </div>
          <div
            class="side-text"
          >{{lang=='zh' ? '可优比母婴用品有限公司 版权所有':'Hangzhou KUB Maternal and Child Products Co., Ltd.'}}</div>
        </div>
      </div>
    </div>
    <div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
      <div class="page-1 page">
        <video loop="loop" autoplay class="videos">
          <source src="../../../assets/img/video.mp4" type="video/mp4">
        </video>
        <div class="banner-bgs"></div>
        <div class="banner-bg"></div>
        <div v-if="homeInfo.length>0">
          <swiper :options="swiperOption">
            <swiper-slide class="back1" :style="{backgroundImage: 'url(' + slideImg +')'}" :key="1"></swiper-slide>
            <swiper-slide
              class="back2"
              :style="{backgroundImage: 'url(' + homeInfo[1].homePhoto +')'}"
              :key="2"
            >
              <h4
                class="ani title"
                swiper-animate-effect="fadeInLeft"
                swiper-animate-duration="1s"
                swiper-animate-delay="0.3s"
                v-html="homeInfo[1].homeConten"
              ></h4>
              <div class="ani line" swiper-animate-effect="fadeIn" swiper-animate-delay="0.6s"></div>
              <p class="ani" swiper-animate-effect="fadeInLeft" swiper-animate-delay="0.9s">
                <img
                  src="../../../assets/img/email.png"
                  style="width:20px;margin-top:8px;float:left"
                >
                &nbsp;{{homeInfo[1].homeMail}}
              </p>
              <div
                class="ani more"
                swiper-animate-effect="fadeInUp"
                swiper-animate-delay="1.2s"
                @click="jumpKub"
              >
                <span :data-more="lang == 'zh' ? '了解更多' : 'MORE'">{{lang == 'zh' ? '了解更多' : 'MORE'}}</span>
              </div>
            </swiper-slide>
            <swiper-slide
              class="back3"
              :style="{backgroundImage: 'url(' + homeInfo[2].homePhoto +')'}"
              :key="3"
            >
              <h4
                class="ani title"
                swiper-animate-effect="zoomIn"
                swiper-animate-delay="0.6s"
                v-html="homeInfo[2].homeConten"
              ></h4>
              <div class="ani line" swiper-animate-effect="zoomIn" swiper-animate-delay="0.9s"></div>
              <p class="ani" swiper-animate-effect="zoomIn" swiper-animate-delay="1.2s">
                <i class="fa fa-phone"></i>
                {{homeInfo[2].homeMail}}
              </p>
              <div
                class="ani more"
                swiper-animate-effect="zoomIn"
                swiper-animate-delay="1.5s"
                @click="jumpKub"
              >
                <span :data-more="lang == 'zh' ? '了解更多' : 'MORE'">{{lang == 'zh' ? '了解更多' : 'MORE'}}</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="arrow" @click="toSecond">
          <img src="../../../assets/img/aeeoww.png">
        </div>
      </div>
      <div class="page-2 page">
        <div
          :style="{backgroundImage: 'url(' + kubInfo[0].kubBackground +')'}"
          v-if="kubInfo.length>0"
          style="width:100%;height:100%;"
        >
          <div class="page-bg"></div>
          <div class="product-content">
            <div class="containers">
              <div class="head"></div>
              <h2 class="title">{{lang == 'zh' ? '可优比' : 'KUB'}}</h2>
              <span class="line">About küb</span>
              <div class="product-li">
                <p class="title">{{kubInfo[0].kubTitle}}</p>
                <p class="desc" v-html="kubInfo[0].kubContent"></p>
                <!-- <p class="desc">erertet</p> -->
                <div class="mores" @click="jumpKub" v-if="lang == 'zh'">
                  <span
                    :data-more="lang == 'zh' ? '了解更多' : 'MORE'"
                  >{{lang == 'zh' ? '了解更多' : 'MORE'}}</span>
                </div>
                <div class="mores" @click="jumpKub" v-else style="margin-top:0%">
                  <span
                    :data-more="lang == 'zh' ? '了解更多' : 'MORE'"
                  >{{lang == 'zh' ? '了解更多' : 'MORE'}}</span>
                </div>
              </div>
            </div>
            <div class="anim_box" v-if="active == 1"></div>
            <div class="anim_line" v-if="active == 1"></div>
          </div>
        </div>
      </div>
      <div class="page-3 page" :style="{backgroundImage: 'url(' + productImg +')'}">
        <div class="container2" v-if="productInfo.length>0">
          <div class="head">
            <h2 class="title">{{lang == 'zh' ? '产品系列' : 'Product Series'}}</h2>
            <span class="line">Product Series</span>
          </div>
          <div class="partner-swiper">
            <ul class="partner-ul">
              <li class="partner-li animated" v-for="(item,index) in productInfo">
                <transition-group enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
                  <a
                    :title="item.productTitle"
                    :key="item.productTitle"
                    :animate-delay="item.postpone"
                    animate-duration="1.5s"
                    v-if="active == 2"
                    class="animated"
                    @click="jumpBrand(item)"
                  >
                    <div class="partner-img">
                      <img :src="item.productWaiPhoto">
                    </div>
                  </a>
                </transition-group>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-4 page">
        <div class="container3">
          <div class="head">
            <h2 class="title">{{lang == 'zh' ? '资讯' : 'News Introduce'}}</h2>
            <span class="line">News Introduce</span>
          </div>
          <div class="news-swiper" v-if="news.length>0">
            <swiper :options="swiperOption2">
              <swiper-slide v-for="(item,index) in news" :key="index">
                <ul class="news-ul">
                  <transition-group
                    enter-active-class="fadeInUpBig"
                    v-on:before-enter="beforeEnter"
                  >
                    <li
                      class="news-li animated"
                      v-for="(item,index) in item"
                      :key="item.title"
                      :animate-delay="item.postpone"
                      animate-duration="1.15s"
                      v-if="active == 3"
                    >
                      <a :title="item.title" @click="jumpNews(item)">
                        <div style="width:100%;height:510px;" v-if="index%2==0">
                          <div class="news">
                            <div class="content">
                              <p class="date">{{item.newsDate}}</p>
                              <p class="title">{{item.title}}</p>
                              <p class="description">{{item.newDescr}}</p>
                            </div>
                            <div class="arrow">
                              <i class="fa fa-angle-right"></i>
                            </div>
                          </div>
                          <div
                            class="news-img"
                            :style="{backgroundImage: 'url(' + item.newsPhotoUrl +')'}"
                          >
                            <div class="border"></div>
                          </div>
                        </div>
                        <div style="width:100%;height:510px;" v-if="index%2==1">
                          <div
                            class="news-img"
                            :style="{backgroundImage: 'url(' + item.newsPhotoUrl +')'}"
                          >
                            <div class="border"></div>
                          </div>
                          <div class="news">
                            <div class="content">
                              <p class="date">{{item.newsDate}}</p>
                              <p class="title">{{item.title}}</p>
                              <p class="description">{{item.newDescr}}</p>
                            </div>
                            <div class="arrow">
                              <i class="fa fa-angle-right"></i>
                            </div>
                          </div>
                        </div>
                      </a>
                    </li>
                  </transition-group>
                </ul>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev">
                <i class="fa fa-angle-left"></i>
              </div>
              <div class="swiper-button-next" slot="button-next">
                <i class="fa fa-angle-right"></i>
              </div>
            </swiper>
          </div>
        </div>
      </div>
      <div class="page-5 page">
        <div id="container"></div>
        <transition enter-active-class="slideInRight" v-on:before-enter="beforeEnter">
          <div
            class="contact-cont animated"
            animate-delay="0.5s"
            animate-duration="0.5"
            v-if="active==4"
          ></div>
        </transition>
        <div class="contact-text">
          <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
            <div class="head animated" animate-delay="1s" animate-duration="0.5" v-if="active==4">
              <h3 class="title">
                {{lang == 'zh' ? '联系我们' : 'Contact Us'}}
                <span class="line"></span>
              </h3>
              <p class="subtitle">Contact Us</p>
            </div>
          </transition>
          <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
            <ul
              class="details animated"
              animate-delay="1.5s"
              animate-duration="0.5"
              v-if="active==4"
            >
              <li
                class
              >{{lang == 'zh' ? '浙江省杭州市滨江区江陵路88号5幢4F' : '4F, Building 5, 88 Jiangling Road, Binjiang District, Hangzhou, Zhejiang, China'}}</li>
              <li
                class="mark"
              >ADD：4F,Building No.5,No.88,Jiangling Road,Binjiang Dis.,Hangzhou,Zhejiang</li>
              <li class>{{lang == 'zh' ? '官方邮箱' : 'Email'}}：kubgroup@baho.cn</li>
              <li class>{{lang == 'zh' ? '联系电话' : 'Contact Information'}}：400-113-0012</li>
            </ul>
          </transition>
        </div>
        <footers class="footers" v-animate="{value: 'fadeInUp', delay: 2500}"></footers>
      </div>
    </div>
  </div>
</template>
 <style type="text/css">
.amap-info-content {
  border-radius: 5px;
  padding: 0px;
}
.amap-info-contentContainer {
  float: left;
  position: absolute;
  top: -145px;
}
</style>
<script>
// import Swiper from 'swiper'
import animate from "animate.css";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import * as swiperAni from "../../../basic/swiper.animate.min.js";
export default {
  name: "app",
  data() {
    var that = this;
    return {
      slideImg: "",
      lang: "zh",
      slide: false, //侧边蓝
      close: false, //关闭按钮
      active: 0,
      pageNum: 0,
      nav: [],
      homeInfo: [],
      kubInfo: [],
      productInfo: [],
      news: [],
      zixun: [
        {
          time: "2018-10-26",
          title: "吴尊代言KUB可优比 助力品牌全新战略升级",
          desc:
            "吴尊在一举囊括路虎Discovery、LAB朗仕、SKECHERS斯凯奇等多个国际大牌之后,近日签约成为母婴行...",
          img: "http://media.kubbaby.com/uploads/180914/1-1P91411262IY.jpg",
          delay: "0s"
        },
        {
          time: "2018-10-26",
          title: "吴尊代言KUB可优比 助力品牌全新战略升级",
          desc:
            "吴尊在一举囊括路虎Discovery、LAB朗仕、SKECHERS斯凯奇等多个国际大牌之后,近日签约成为母婴行...",
          img: "http://media.kubbaby.com/uploads/180914/1-1P91411262IY.jpg",
          delay: "0.2s"
        },
        {
          time: "2018-10-26",
          title: "吴尊代言KUB可优比 助力品牌全新战略升级",
          desc:
            "吴尊在一举囊括路虎Discovery、LAB朗仕、SKECHERS斯凯奇等多个国际大牌之后,近日签约成为母婴行...",
          img: "http://media.kubbaby.com/uploads/180914/1-1P91411262IY.jpg",
          delay: "0.4s"
        },
        {
          time: "2018-10-26",
          title: "吴尊代言KUB可优比 助力品牌全新战略升级",
          desc:
            "吴尊在一举囊括路虎Discovery、LAB朗仕、SKECHERS斯凯奇等多个国际大牌之后,近日签约成为母婴行...",
          img: "http://media.kubbaby.com/uploads/180914/1-1P91411262IY.jpg",
          delay: "0.6s"
        }
      ],
      opts: {
        start: 0,
        dir: "v",
        loop: false,
        duration: 100,
        movingFlag: false,
        beforeChange: function(ele, current, next) {
          that.active = next;
          // if(next == 1) {
          //    that.getKubInfo()
          // }
        },
        afterChange: function(ele, current) {
          that.active = current;
        }
      },
      swiperOption: {
        loop: true,
        speed: 1000,
        autoplay: true,
        // autoplay:10000000,
        initialSlide: 0,
        // 滑动方向，水平horizontal，垂直vertical
        direction: "horizontal",
        on: {
          init: function() {
            swiperAni.swiperAnimateCache(this);
            swiperAni.swiperAnimate(this);
          },
          slideChange: function() {
            swiperAni.swiperAnimate(this);
          }
        }
      },
      swiperOption2: {
        allowTouchMove: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      addressText:
        "<div><img src='http://47.99.165.110:9038/photos/erweima.png' style='width:60px;height:60px;float:left;margin-left:50px;margin-right:15px;margin-top:15px;margin-bottom:15px;font-size:16px;color:#444'><p style='width:100px;float:left;margin-left:128px;padding-right:0px;margin-top:-66px;'>可优比</p><p style='float:left;margin-top:-37px;margin-left:129px;font-size:12px;color:#7d7d7d'>婴童品牌</p></div>",
      productImg: ""
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    if (this.lang == "zh") {
      this.getMap("zh_cn", this.addressText);
    } else {
      this.getMap(
        "en",
        "<div><img src='http://47.99.165.110:9038/photos/erweima.png' style='width:60px;height:60px;float:left;margin-left:50px;margin-right:15px;margin-top:15px;margin-bottom:15px;font-size:16px;color:#444'><p style='width:100px;float:left;margin-left:128px;padding-right:0px;margin-top:-66px;'>KUB</p><p style='float:left;margin-top:-37px;margin-left:129px;font-size:12px;color:#7d7d7d'>Baby Brand</p></div>"
      );
    }
    // this.getMap('zh_cn',this.addressText)
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.homeInfo = [];
      this.getNav();
      this.getHomeInfo();
      this.getKubInfo();
      this.getProductInfo();
      this.getNewsInfo();
      this.getImg();
      // this.getKubInfo()
      // this.getProductInfo()
      if (this.lang == "zh") {
        this.getMap("zh_cn", this.addressText);
      } else {
        this.getMap(
          "en",
          "<div><img src='http://47.99.165.110:9038/photos/erweima.png' style='width:60px;height:60px;float:left;margin-left:50px;margin-right:15px;margin-top:15px;margin-bottom:15px;font-size:16px;color:#444'><p style='width:100px;float:left;margin-left:128px;padding-right:0px;margin-top:-66px;'>KUB</p><p style='float:left;margin-top:-37px;margin-left:129px;font-size:12px;color:#7d7d7d'>Baby Brand</p></div>"
        );
      }
    });
  },
  created() {
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.getKubInfo();
    this.getProductInfo();
    this.getNewsInfo();
    this.getImg();
    this.getNav();
    this.getHomeInfo();
  },
  activated() {
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
  },
  methods: {
    //跳转到首页
    toHome() {
      window.reload();
    },
    // 获取产品背景图
    getImg() {
      this.$.Post(
        "/kubgw/page/kubgw/home/kubNavigatPhoto/getKubBackgroundInfo",
        { type: 1 },
        res => {
          this.productImg = res.background;
        }
      );
    },
    jumpNews(item) {
      this.$router.push("/news?type=4" + "&id=" + item.id);
    },
    jumpBrand(item) {
      this.$router.push("/brand?type=3" + "&name=" + item.productTitle);
    },
    //调到kub
    jumpKub() {
      this.$router.push("/kub?type=2");
    },
    //首页信息
    getHomeInfo() {
      this.$.Post(
        "/kubgw/page/kubgw/home/kubNavigatHome/getKubNavigatHomeInfo",
        {},
        res => {
          this.homeInfo = res;
          this.slideImg = res[0].homePhoto;
        }
      );
    },
    //获取kub信息

    getKubInfo() {
      this.$.Post(
        "/kubgw/page/kubgw/kub/kubNavigatKub/getKubNavigatKubInfo11",
        {},
        res => {
          this.kubInfo = res;
        }
      );
    },
    //获取产品信息接口
    getProductInfo() {
      this.$.Post(
        "/kubgw/page/kubgw/product/kubNavigatProduct/getKubNavigatProductInfo",
        {},
        res => {
          this.productInfo = res;
        }
      );
    },
    getNewsInfo() {
      this.$.Post(
        "/kubgw/page/kubgw/news/kubNavigatNews/getKubNewsInfo",
        {},
        res => {
          this.news = res;
        }
      );
    },
    getNav() {
      this.$.Post("/kubgw/page/kubgw/user/kubmenu/getKubMenuInfo", {}, res => {
        this.nav = res;
        this.$.setStore("getNav", JSON.stringify(this.nav));
      });
    },
    getMap(lang, addressText) {
      var map = new AMap.Map("container", {
        resizeEnable: true,
        center: [120.21874, 30.17899],
        lang: lang, //可选值：en，zh_en, zh_cn
        zoom: 16,
        features: ["bg", "road", "building", "point"],
        mapStyle: "amap://styles/whitesmoke",
        zoomEnable: false
      });
      // map.setMapStyle('amap://styles/whitesmoke');
      map.clearMap();
      var marker = new AMap.Marker({
        map: map,
        position: [120.21874, 30.17899],
        icon: new AMap.Icon({
          size: new AMap.Size(40, 50), //图标大小
          image: "http://47.99.165.110:9038/photos/point.png",
          imageOffset: new AMap.Pixel(0, 0)
        })
      });
      window.AMap.plugin("AMap.ToolBar", function() {
        var toolbar = new window.AMap.ToolBar();
        map.addControl(toolbar);
      });
      var content = [];
      content.push(addressText);
      var infoWindow = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: content.join("<br/>"),
        offset: new AMap.Pixel(16, -45)
      });
      var infoWindow = new window.AMap.InfoWindow({
        content: content.join("")
      });
      infoWindow.open(map, map.getCenter());
      //鼠标点击marker弹出自定义的信息窗体
      AMap.event.addListener(marker, "click", function() {
        infoWindow.open(map, marker.getPosition());
      });
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
      // this.$.router.push('/')
    },
    //侧边栏点击跳转
    jumpTo(item) {
      if (item.url == "home") {
        window.reload();
        this.$router.push("/" + item.url);
      }
      this.$router.push("/" + item.url + "?type=" + item.type);
    },
    //点击出现侧边栏
    slideNav() {
      this.slide = true;
      let move = document.querySelector(".slide-nav");
      move.style.right = "0px";
    },
    slideOut() {
      this.slide = false;
      document.querySelector(".slide-nav").style.right = "-21%";
    },
    moveTo(active) {
      console.log(active);
      this.$refs.fullpage.$fullpage.moveTo(active, true);
    },
    toSecond() {
      this.moveTo(1);
    },
    onSlideChangeStart(currentPage) {
      // console.log('onSlideChangeStart', currentPage);
    },
    onSlideChangeEnd(currentPage) {
      // console.log('onSlideChangeEnd', currentPage);
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
  },
  beforeDestroy() {
    this.$Bus.$off("changeLanguage");
  }
};
</script>

<style scoped lang="scss">
@import "../../../basic/home.scss";
</style>

 
