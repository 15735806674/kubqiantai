<template>
	<div class="kub_footer">
		<div class="me-foot" v-if="lang == 'zh'">
			<div class="left">
				<p class="top">友情链接：/ 
				  <a href="https://diai.tmall.com/index.htm" target="_blank">
				    <span style="color:#fff">&nbsp;蒂爱母婴&nbsp; /</span>
				  </a>
				  <a href="http://www.baho.cn/" target="_blank">
				    <span style="color:#fff"> &nbsp;贝豪集团</span>
				  </a>
				</p>
				<p class="bottom">Copyright © 2018 可优比母婴用品有限公司 版权所有</p>
			</div>
			<div class="right">
				<p class="top">备案号： 浙ICP备32165465号 </p>
                <div class="kub_icon">
                   <a id="met-weixin">
                       <div class="code">
						    <div class="border"></div>
							<img src="http://47.99.165.110:9038/photos/erweima.png" alt="可优比官方网站-可优比母婴用品有限公司">
						</div>
                	   <i class="fa fa-weixin"></i>
                   </a>
                   <!-- <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=0000000&amp;site=qq&amp;menu=yes" rel="nofollow" target="_blank"> 
                  	   <i class="fa fa-qq"></i> 
                   </a> -->
                   <a href="http://weibo.com/u/3843333331" rel="nofollow" target="_blank"><i class="fa fa-weibo"></i></a>
                   <!-- <a href="http://weibo.com/u/3843333331" rel="nofollow" target="_blank"><i class="fa fa-twitter"></i></a> -->
                </div>
			</div>
		<!-- 	<div class="code">
			    <div class="border"></div>
				<img src="http://media.kubbaby.com/erweima.png" alt="可优比官方网站-可优比母婴用品有限公司">
			</div> -->
		</div> 
		<div class="me-foot" v-else>
			<div class="left">
				<p class="top">link：/ 
				  <a href="https://diai.tmall.com/index.htm" target="_blank">
				    <span style="color:#fff">&nbsp;DiAi Baby&nbsp; /</span>
				  </a>
				  <a href="http://www.baho.cn/" target="_blank">
				    <span style="color:#fff"> &nbsp;BAHO</span>
				  </a>
				</p>
				<p class="bottom">Copyright © 2018 Hangzhou KUB Baby Products Co., Ltd, Copyright ownership </p>
			</div>
			<div class="right">
				<p class="top">Record number : zheICPbei32165465hao</p>
                <div class="kub_icon">
                   <a id="met-weixin">
                       <div class="code coded">
						    <div class="border"></div>
							<img src="http://47.99.165.110:9038/photos/erweima.png" alt="">
						</div>
                	   <i class="fa fa-weixin"></i>
                   </a>
                   <!-- <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=0000000&amp;site=qq&amp;menu=yes" rel="nofollow" target="_blank"> 
                  	   <i class="fa fa-qq"></i> 
                   </a> -->
                   <a href="http://weibo.com/u/3843333331" rel="nofollow" target="_blank"><i class="fa fa-weibo"></i></a>
                   <!-- <a href="http://weibo.com/u/3843333331" rel="nofollow" target="_blank"><i class="fa fa-twitter"></i></a> -->
                </div>
			</div>
		<!-- 	<div class="code">
			    <div class="border"></div>
				<img src="http://media.kubbaby.com/erweima.png" alt="可优比官方网站-可优比母婴用品有限公司">
			</div> -->
		</div>                                                                                                                                                                                   
	</div>
</template>

<script>
	export default {
		data() {
			return {
               lang:'zh'
			}
		},
		mounted() {
           this.lang = this.$.getStore('lang') ? this.$.getStore('lang'):'zh'
           this.$Bus.$on('changeLanguage', lang => {
	          this.lang = lang
	       })
		},
		created() {

		},
	}
</script>

<style scoped lang="scss">
    .kub_footer {
    	.me-foot {
	        height: auto !important;
		    background-color: #34c5be;
		    color: rgba(255,255,255,1);
		    display: block !important;
		    width: 100%;
		    border: none;
		    padding: 25px 40px;
		    overflow: visible !important; 
		    float: left;
		    position: relative;
		    .left {
		       float: left;
               .top {
               	  margin-bottom: 15px;
               	  padding-left: 55px;
               }
               .bottom {
               	  margin-bottom: 5px;
               }
		    }
		    .right {
		    	float: right;
		    	.top {
		    		margin-bottom: 15px;
		    		padding-right: 85px;
		    	}
		    	.kub_icon {
		    	   padding-left: 55px;
		    	   #met-weixin {
		    	   	  .code {
				    	position: absolute;
				    	top:-115px;
				    	right:180px;
					    z-index: 1800;
					    display: none;
					    width: 150px;
					    min-height: 32px;
					    padding: 0 5px;
					    text-align: left;
					    white-space: normal;
					    background-color: #fff;
					    -webkit-background-clip: padding-box;
					    background-clip: padding-box;
					    border: 1px solid #e4eaec;
					    border: 1px solid rgba(204,213,219,.8);
					    border-radius: 4px;
					    -webkit-box-shadow: 0 2px 6px rgba(0,0,0,.05);
					    box-shadow: 0 2px 6px rgba(0,0,0,.05);
					    .border {
						    display: inline-block;
						    width: 0;
						    height: 0;
						    border-style: solid;
						    border-width: 10px;
						    border-color: #fff transparent transparent transparent;
						    position: absolute;
						    left:50%;
						    bottom:-20px;
						}
					    img {
					    	width: 150px;
					    	margin:auto;
					    }
					  }
					  .coded {
					  	right:250px;
					  }
		    	   	  &:hover {
					      .code {
					      	 display: block;
					      }
					  }
		    	   }
                   i {
	               	    font-size: 20px;
	                    margin: 0 5px;
	                    cursor:pointer;
	                    color:#fff;
	                    &:hover {
					        color:rgba(255,255,255,0.75);
					    }
                   }
		    	}
		    }
		}
    }
@-webkit-keyframes codes /* Safari 和 Chrome */
{
	100% {
      width: 100%;
      height:50%
	}
	50% {
		width: 50%;
		height: 50%;
	}
}
</style>


