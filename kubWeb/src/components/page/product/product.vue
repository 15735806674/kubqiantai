 <template>
	<div class="kub_product">
		<headers></headers>
		<div class="header_di"></div>
		<section class="met-product-class1" ref="allProduct">
			<div class="item" v-for="(item,index) in list">
			    <div style="width:100%;height:100%;" v-if="index%2 == 0">
			    	<div class="left">
						<div class="conents">
						  <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
								<h3 class="title animated" animate-delay="0.1s" animate-duration="1s" v-if="loading"> {{item.productTitle}} <span class="keywords"></span> </h3>
						  </transition>
								<span class="line"></span>
						  <transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
								<div class="animated" animate-delay="0.1s" animate-duration="1s" v-if="loading">
									<div class="desc"> {{item.introduce}} </div>
									<a class="more" @click="jumpBrand(item)">
										<span data-more="MORE">MORE</span>
									</a>
								</div>
						  </transition>
						</div>
				    </div>
					<div class="right">
						<img :src="item.productWaiPhoto">
					</div>
			    </div>
			    <div style="width:100%;height:100%;" v-if="index%2 == 1">
			       <div class="leftImg">
						<img :src="item.productWaiPhoto">
				   </div>
			       <div class="rightContent">
						<div class="conents">
							<transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
								<h3 class="title animated" animate-delay="0.1s" animate-duration="1s" v-if="loading"> {{item.productTitle}} <span class="keywords"></span> </h3>
						    </transition>
							<span class="line"></span>
							<transition enter-active-class="fadeInUp" v-on:before-enter="beforeEnter">
								<div class="animated" animate-delay="0.1s" animate-duration="1s" v-if="loading">
									<div class="desc"> {{item.introduce}} </div>
									<a class="more" @click="jumpBrand(item)">
										<span data-more="MORE">MORE</span>
									</a>
								</div>
						    </transition>
						</div>
				   </div> 
			    </div>
			</div>
		</section>
		<footers></footers>
	</div>
</template>
<script>
    import animate from 'animate.css'
    export default {
       data() {
          return {
             loading:false,
             lang:'zh',
             list:[{
             	id:0,
             	name:'睡眠系列',
             	desc:'好的睡眠能促进智力和生长发育',
             	delay:'0s',
             	img:require('../../../assets/img/brand1.jpg')
             },{
             	id:1,
             	name:'玩教系列',
             	desc:'满足宝贝0-6岁全阶段的优秀成长需求',
             	delay:'0s',
             	img:require('../../../assets/img/brand2.jpg')
             },{
             	id:2,
             	name:'喂哺系列',
             	desc:'照顾好宝宝的每一餐',
             	delay:'0s',
             	img:require('../../../assets/img/brand3.jpg')
             },{
             	id:3,
             	name:'用品系列',
             	desc:'呵护宝宝成长的每一处细节',
             	delay:'0s',
             	img:require('../../../assets/img/brand4.jpg')
             }],
             children:[],
          }
       },
       mounted() {
           this.loading = true
           document.documentElement.scrollTop = 0
           // let position = document.documentElement.scrollTop
           // this.children = document.querySelectorAll(".met-product-class1")[0].childNodes
       },
       created() {
       	   this.scroll()
       	   this.getProductInfo()
       	   this.lang = this.$.getStore('lang') ? this.$.getStore('lang'):'zh'
       	   this.$Bus.$on('changeLanguage', lang => {
	          this.lang = lang
	          this.getProductInfo()
	       })
       },
       methods:{
       	    getProductInfo() {
               this.$.Post('/kubgw/page/kubgw/product/kubNavigatProduct/getKubNavigatProductInfo',{},res=>{
                   this.list = res
               })
       	    },
       	    jumpBrand(item) {
               this.$router.push('/brand?type=' + HGetHashUrl('type')+'&name='+ item.productTitle)
       	    },
            scroll() {
               window.addEventListener('scroll', () => {
                   // this.list.forEach((item,index)=>{
                   //     let top = this.children[index].getBoundingClientRect().top
                   // })
               }, false)
            },
       	    beforeEnter: function(el) {
	            var delay = el.getAttribute('animate-delay'),
	                duration = el.getAttribute('animate-duration');
	            console.log('attr:' + delay, duration);
	            var cssObj = {
	                "animation-delay": delay,
	                "-webkit-animation-delay": delay,
	                "animation-duration": duration,
	                "-webkit-animation-duration": duration,
	                "visibility": "visible"
	            }
	            var getCssText = function(obj) {
	                var text = [];
	                for(var o in obj) {
	                    text.push(o + ":" + obj[o])
	                }
	                return text.join(';')
	            }
	            el.style.cssText = getCssText(cssObj);
	       },
       }
    }
</script>

<style scoped lang="scss">
    @import '../../../basic/product.scss';
</style>