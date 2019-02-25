 <template>
  <div class="kub_contact">
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
                >{{lang=='zh'?'联系':'Contact'}}</h4>
              </transition>
              <span class="line"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="met-show">
      <div class="containerCon">
        <div class="row">
          <div class="met-editor">
            <p class="logo">
              <img src="../../../assets/img/kub.png">
            </p>
            <p
              class="title"
            >{{lang=='zh'?'可优比母婴用品有限公司':'Hangzhou KUB Maternal and Child Products Co., Ltd.'}}</p>
            <p
              class="address"
            >{{lang=='zh'?'浙江省杭州市滨江区江陵路88号5幢4F':'4F, Building 5, 88 Jiangling Road, Binjiang District, Hangzhou, Zhejiang, China'}}</p>
            <p
              class="enAddress"
            >ADD：4F,Building No.5,No.88,Jiangling Road,Binjiang Dis.,Hangzhou,Zhejiang</p>
            <p class="phone">{{lang=='zh'?'官方热线':'Official hotline'}}：400-113-0012</p>
          </div>
        </div>
      </div>
      <div class="mceneter">
        <form>
          <div class="inputs">
            <span class="name">{{lang=='zh'?'姓名':'name'}}：</span>
            <input type name v-model="form.name">
          </div>
          <div class="inputs">
            <span class="name">{{lang=='zh'?'手机':'phone'}}：</span>
            <input type name v-model="form.phone" v-on:input="inputPhone">
            <p class="tip" v-if="tipsPhone">
              <span v-if="lang=='zh'">请输入正确手机号！</span>
              <span v-else style="margin-left:135px;">Please enter the correct phone number</span>
            </p>
          </div>
          <div class="inputs">
            <span class="name">{{lang=='zh'?'邮箱':'email'}}：</span>
            <input type name v-model="form.mail" v-on:input="inputEmail">
            <p class="tip" v-if="tipsEmail">
              <span v-if="lang=='zh'">请输入正确邮箱！</span>
              <span v-else style="margin-left:135px;">Please enter the correct email address！</span>
            </p>
          </div>
          <div class="inputs">
            <span class="name texts" v-if="lang=='zh'">留言：</span>
            <span class="name texts" v-else style="margin-left:18px;">message：</span>
            <textarea type="text" v-model="form.bbs"></textarea>
          </div>
          <div class="btn">
            <span class="submit" @click="submit" v-if="lang=='zh'">提交</span>
            <span class="submit" @click="submit" v-if="lang=='en'" style="width:62px">submit</span>
            <span class="submit repat" @click="repeat" v-if="lang=='zh'">重置</span>
            <span class="submit" @click="repeat" v-else style="width:62px">reset</span>
          </div>
        </form>
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
      loading: false,
      lang: "zh",
      form: {
        name: "",
        phone: "",
        mail: "",
        bbs: ""
      },
      tipsPhone: false,
      tipsEmail: false,
      productImg: ""
    };
  },
  mounted() {
    this.loading = true;
    document.documentElement.scrollTop = 0;
  },
  created() {
    this.scroll();
    this.getImg();
    this.lang = this.$.getStore("lang") ? this.$.getStore("lang") : "zh";
    this.$Bus.$on("changeLanguage", lang => {
      this.lang = lang;
      this.getImg();
    });
  },
  methods: {
    getImg() {
      this.$.Post(
        "/kubgw/page/kubgw/home/kubNavigatPhoto/getKubBackgroundInfo",
        { type: 3 },
        res => {
          this.productImg = res.background;
        }
      );
    },
    // 判断手机号
    inputPhone() {
      if (!this.isPoneAvailable(this.form.phone) && this.form.phone != "") {
        this.tipsPhone = true;
      } else {
        this.tipsPhone = false;
      }
    },
    //验证邮箱
    inputEmail() {
      if (!this.isEmailAvailable(this.form.mail) && this.form.mail != "") {
        this.tipsEmail = true;
      } else {
        this.tipsEmail = false;
      }
    },
    isPoneAvailable(str) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    isEmailAvailable(str) {
      var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(str)) {
        return false;
      } else {
        return true;
      }
    },
    repeat() {
      this.form = {};
    },
    submit() {
      if (
        this.isEmailAvailable(this.form.mail) &&
        this.isPoneAvailable(this.form.phone)
      ) {
        this.$.Post(
          "/kubgw/page/kubgw/relation/kubNavigatRelation/save",
          this.form,
          res => {
            this.form = {};
            this.$router.push("/home");
          }
        );
      }
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
@import "../../../basic/contact.scss";
</style>