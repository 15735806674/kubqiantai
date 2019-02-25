<template>
    <div>
        <div class="container">
            <div class="form-box" style="width:100%">
                <el-form ref="form" :model="form" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="预售类型" :rules="[{ required: true}]">
                        <el-radio v-model="type" label="0">预售</el-radio>
                        <el-radio v-model="type" label="1">正常</el-radio>
                    </el-form-item>
                    <el-form-item label="计算定金" :rules="[
                      { required: true, message: '定金不能为空'},
                      { type: 'number', message: '定金必须为数字值'}
                     ]" prop="earnest" v-if="type == 0">
                    <!-- <el-input v-model.number="form.earnest" style="width:40%" autocomplete="off" type="earnest"></el-input> -->
                        <div class="calculator">
                            <div class="results">
                               <input class="input"  v-model="earnest" v-on:keyup.13="submits1"/>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="计算膨胀金额" :rules="[  
                      { required: true, message: '膨胀金额不能为空'},
                      { type: 'number', message: '膨胀金额必须为数字值'}
                      ]" prop="ratio" v-if="type == 0">
                      <!-- <el-input v-model.number="form.ratio" style="width:40%"></el-input> -->
                       <div class="calculator">
                            <div class="results">
                               <input class="input" v-model="ratio" v-on:keyup.13="submits2"/>
                            </div>
                        </div>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="单品满减" style="width:100%;margin-bottom:20px">
                        <template slot-scope="scope">
                            <div style="float:left">
                                 <div v-for="(item,index) in goodsParamSets2" style="margin-bottom:10px;margin-left:10px">
                                    <span>满</span>
                                    <el-input v-model="item.fullPrice" auto-complete="off" style="width:150px;position:relative;margin-left:10px"></el-input>
                                    -
                                    <el-input v-model="item.reducePrice" auto-complete="off" style="width:150px;position:relative"></el-input>
                                    <i class="el-icon-circle-close-outline" v-if="index!==0" @click="closeCode2(index)" style="cursor:pointer"></i>
                                 </div>
                                 <el-button type="text" @click="addCode2" style="float:right;margin-top:-40px;margin-right:-50px">添加</el-button>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label="预售总金额" :rules="[{ required: true}]">
                        <div class="calculator">
                            <!-- <button class="toggle-button">
                              <p  style="text-align:center">计算优惠价格</p>
                            </button> -->
                            <div class="results">
                               <input class="input" v-model="current" v-on:keyup.13="submits"/>
                            </div>
                          <!--   <div class="mode" v-if="changeMode">
                              <button class="button" @click="press">7</button>
                              <button class="button" @click="press">8</button>
                              <button class="button" @click="press">9</button>
                              <button class="button" @click="press">*</button>
                              <button class="button" @click="press">&#60;=</button>
                              <button class="button" @click="press">C</button>
                              <button class="button" @click="press">4</button>
                              <button class="button" @click="press($event)">5</button>
                              <button class="button" @click="press">6</button>
                              <button class="button" @click="press">/</button>
                              <button class="button" @click="press">(</button>
                              <button class="button" @click="press">)</button>
                              <button class="button" @click="press">1</button>
                              <button class="button" @click="press">2</button>
                              <button class="button" @click="press">3</button>
                              <button class="button" @click="press">-</button>
                              <button class="button" @click="press">x ²</button>
                              <button class="button" @click="press">±</button>
                              <button class="button" @click="press">0</button>
                              <button class="button" @click="press">.</button>
                              <button class="button" @click="press">%</button>
                              <button class="button" @click="press">+</button>
                              <button class="button equal-sign" @click="press">=</button>  
                            </div>
                            <div class="mode" v-else>
                              <button class="button" @click="press">sin</button>
                              <button class="button" @click="press">cos</button>
                              <button class="button" @click="press">tan</button>
                              <button class="button" @click="press">x^</button>
                              <button class="button" @click="press">&#60;=</button>
                              <button class="button" @click="press">C</button>
                              <button class="button" @click="press">log</button>
                              <button class="button" @click="press">ln</button>
                              <button class="button" @click="press">e</button>
                              <button class="button" @click="press">∘</button>
                              <button class="button" @click="press">rad</button>
                              <button class="button" @click="press">√</button>
                              <button class="button" @click="press">7</button>
                              <button class="button" @click="press">8   </button>
                              <button class="button" @click="press">9</button>
                              <button class="button" @click="press">/</button>
                              <button class="button" @click="press">x ²</button>
                              <button class="button" @click="press">x !</button>
                              <button class="button" @click="press">4</button>
                              <button class="button" @click="press">5</button>
                              <button class="button" @click="press">6</button>
                              <button class="button" @click="press">*</button>
                              <button class="button" @click="press">(</button>
                              <button class="button" @click="press">)</button>
                              <button class="button" @click="press">1</button>
                              <button class="button" @click="press">2</button>
                              <button class="button" @click="press">3</button>
                              <button class="button" @click="press">-</button>
                              <button class="button" @click="press">%</button>
                              <button class="button" @click="press">±</button>
                              <button class="button" @click="press">0</button>
                              <button class="button" @click="press">.</button>
                              <button class="button" @click="press">&#x003C0;</button>
                              <button class="button" @click="press">+</button>                    
                              <button class="button equal-sign" @click="press">=</button>
                            </div> -->
                        </div>
                        <div style="margin-top:20px;">
                            <el-button type="primary" plain @click="surePrice">确定计算</el-button>
                            <span style="margin-left:10px;color:red" >（请点击确定优惠价格）</span>
                        </div>
                        <div style="margin-top:20px;font-size:16px">
                            立减总金额：<span style="color:red;font-size:18px">{{result.verticalReduction}}</span>
                        </div>
                        <div style="margin-top:20px;font-size:16px">
                            实际商品金额：<span style="color:red;font-size:18px">{{result.realPrice}}</span>
                        </div>
                        <div style="margin-top:20px;font-size:16px">
                            优惠价格：<span style="color:red;font-size:18px">{{result.cheap}}</span>
                        </div>
                        <div style="margin-top:20px;font-size:16px">
                            到手价：<span style="color:red;font-size:18px">{{result.count}}</span>
                        </div>
                        <div style="margin-top:20px;font-size:16px">
                            支付尾款：<span style="color:red;font-size:18px">{{result.payMoney}}</span>
                        </div>
                      
                        <!-- <div style="margin-top:20px;">
                            <p>店铺满减、优惠卷、购物津贴 优惠后价格：<span>{{count}}</span></p>
                        </div> -->
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'baseform',
        data: function(){
            return {
               result:{
                 cheap:0,//优惠价格
                 count:0,//到手价
                 payMoney:0,//支付尾款
                 realPrice:0,//实际金额
                 verticalReduction:0,//立减金额
               },
               form:{

               },
               current:'',
               changeMode: true,
               optionLan:[
                 {
                    id:0,
                    label:'预售'
                 },
                 {
                    id:1,
                    label:'正常'
                 },
               ],
               type:'0',
               earnest:'',  
               ratio:'',
               goodsParamSets2:[],//单品满减
            }
        },
        created() {
            
        }, 
        activated() {
           
        },
        mounted() {
           this.goodsParamSets2 = [{fullPrice:'',reducePrice:''}]
        },
        methods: {
            closeCode2(index) {
               this.goodsParamSets2.splice(index,1)
            },
            addCode2() {
               this.goodsParamSets2.push({fullPrice:'',reducePrice:''})
            },
            //确定价格
            surePrice() {
              if(this.type == 0) {
                this.earnest = this.earnest
                this.ratio = this.ratio
              } else {
                this.earnest = 0
                this.ratio = 0
              }
              console.log(this.earnest)
              if(this.current == '' || this.earnest === '' || this.ratio === '') {
                   this.$message.warning('请填写必填信息')
              } else {
                   this.$.Post('/goods/page/goods/param/goodsKubParamSet/getDicountPrice', {
                    price:this.current,
                    type:this.type,
                    earnest:this.earnest,
                    ratio:this.ratio,
                    goodsParamSets2:JSON.stringify(this.goodsParamSets2),
                  } ,res=>{
                         this.result = res
                 })
              }
            },
            submits() {
               let me = this
               if ((me.current).indexOf('^') > -1) {
                  let base = (me.current).slice(0, (me.current).indexOf('^'))
                  let exponent = (me.current).slice((me.current).indexOf('^') + 1)
                  me.current = eval('Math.pow(' + base + ',' + exponent + ')')
                } else {
                  me.current = eval(me.current)
                }
            },
            submits1() {
               let me = this
               if ((me.earnest).indexOf('^') > -1) {
                  let base = (me.earnest).slice(0, (me.earnest).indexOf('^'))
                  let exponent = (me.earnest).slice((me.earnest).indexOf('^') + 1)
                  me.earnest = eval('Math.pow(' + base + ',' + exponent + ')')
                } else {
                  me.earnest = eval(me.earnest)
                }
            },
            submits2() {
               let me = this
               if ((me.ratio).indexOf('^') > -1) {
                  let base = (me.ratio).slice(0, (me.ratio).indexOf('^'))
                  let exponent = (me.ratio).slice((me.ratio).indexOf('^') + 1)
                  me.ratio = eval('Math.pow(' + base + ',' + exponent + ')')
                } else {
                  me.ratio = eval(me.ratio)
                }
            },
            press: function (event) {
              let me = this
              let key = event.target.textContent
              if (
                key != '=' && 
                key != 'C' &&
                key != '*' &&
                key != '/' &&
                key != '√' &&
                key != "x ²" &&
                key != "%" &&
                key != "<=" && 
                key != "±" && 
                key != "sin" && 
                key != "cos" && 
                key != "tan" && 
                key != "log" && 
                key != "ln" && 
                key != "x^" && 
                key != "x !" && 
                key != "π" && 
                key != "e" && 
                key != "rad" && 
                key != "∘"
              ) {
                me.current += key
              } else if (key === '=') {
                if ((me.current).indexOf('^') > -1) {
                  let base = (me.current).slice(0, (me.current).indexOf('^'))
                  let exponent = (me.current).slice((me.current).indexOf('^') + 1)
                  me.current = eval('Math.pow(' + base + ',' + exponent + ')')
                } else {
                  me.current = eval(me.current)
                }
              
              } else if (key === 'C') {
                
                me.current = ''

              } else if (key === '*') {
                
                me.current += '*'

              } else if (key === '/') {
                
                me.current += '/'

              } else if (key === '+') {
                
                me.current += '+'

              } else if (key === '-') {
                
                me.current += '-'

              } else if (key === '±') {
                
                if ((me.current).charAt(0) === '-') {
                  me.current = (me.current).slice(1)
                } else {
                  me.current = '-' + me.current
                }

              } else if (key === '<=') {
                
                me.current = me.current.substring(0, me.current.length - 1)

              } else if (key === '%') {
                
                me.current = me.current / 100

              } else if (key === 'π') {
                
                me.current = me.current * Math.PI

              } else if (key === 'x ²') {
                
                me.current = eval(me.current * me.current)

              } else if (key === '√') {
                
                me.current = Math.sqrt(me.current)

              } else if (key === 'sin') {
                
                me.current = Math.sin(me.current)

              } else if (key === 'cos') {
                
                me.current = Math.cos(me.current)

              } else if (key === 'tan') {
                
                me.current = Math.tan(me.current)

              } else if (key === 'log') {
                
                me.current = Math.log10(me.current)

              } else if (key === 'ln') {
                
                me.current = Math.log(me.current)

              } else if (key === 'x^') {
                
                me.current += '^'

              } else if (key === 'x !') {

                let number = 1
                if (me.current === 0) {
                  me.current = '1'
                } else if (me.current < 0) {
                  me.current = NaN
                } else {
                  let number = 1
                  for (let i = me.current; i > 0; i--) {
                    number *= i
                  }
                  me.current = number
                }

              } else if (key === 'e') {
                
                me.current = Math.exp(me.current)

              } else if (key === 'rad') {
                
                me.current = me.current * (Math.PI / 180)

              } else if (key === '∘') {

                me.current = me.current * (180 / Math.PI)

              }
            },
            press: function (event) {
              let me = this
              let key = event.target.textContent
              if (
                key != '=' && 
                key != 'C' &&
                key != '*' &&
                key != '/' &&
                key != '√' &&
                key != "x ²" &&
                key != "%" &&
                key != "<=" && 
                key != "±" && 
                key != "sin" && 
                key != "cos" && 
                key != "tan" && 
                key != "log" && 
                key != "ln" && 
                key != "x^" && 
                key != "x !" && 
                key != "π" && 
                key != "e" && 
                key != "rad" && 
                key != "∘"
              ) {
                me.earnest += key
              } else if (key === '=') {
                if ((me.earnest).indexOf('^') > -1) {
                  let base = (me.earnest).slice(0, (me.earnest).indexOf('^'))
                  let exponent = (me.earnest).slice((me.earnest).indexOf('^') + 1)
                  me.earnest = eval('Math.pow(' + base + ',' + exponent + ')')
                } else {
                  me.earnest = eval(me.earnest)
                }
              
              } else if (key === 'C') {
                
                me.earnest = ''

              } else if (key === '*') {
                
                me.earnest += '*'

              } else if (key === '/') {
                
                me.earnest += '/'

              } else if (key === '+') {
                
                me.earnest += '+'

              } else if (key === '-') {
                
                me.earnest += '-'

              } else if (key === '±') {
                
                if ((me.earnest).charAt(0) === '-') {
                  me.earnest = (me.earnest).slice(1)
                } else {
                  me.earnest = '-' + me.earnest
                }

              } else if (key === '<=') {
                
                me.earnest = me.earnest.substring(0, me.earnest.length - 1)

              } else if (key === '%') {
                
                me.earnest = me.earnest / 100

              } else if (key === 'π') {
                
                me.earnest = me.earnest * Math.PI

              } else if (key === 'x ²') {
                
                me.earnest = eval(me.earnest * me.earnest)

              } else if (key === '√') {
                
                me.earnest = Math.sqrt(me.earnest)

              } else if (key === 'sin') {
                
                me.earnest = Math.sin(me.earnest)

              } else if (key === 'cos') {
                
                me.earnest = Math.cos(me.earnest)

              } else if (key === 'tan') {
                
                me.earnest = Math.tan(me.earnest)

              } else if (key === 'log') {
                
                me.earnest = Math.log10(me.earnest)

              } else if (key === 'ln') {
                
                me.earnest = Math.log(me.earnest)

              } else if (key === 'x^') {
                
                me.earnest += '^'

              } else if (key === 'x !') {

                let number = 1
                if (me.earnest === 0) {
                  me.earnest = '1'
                } else if (me.earnest < 0) {
                  me.earnest = NaN
                } else {
                  let number = 1
                  for (let i = me.earnest; i > 0; i--) {
                    number *= i
                  }
                  me.earnest = number
                }

              } else if (key === 'e') {
                
                me.earnest = Math.exp(me.earnest)

              } else if (key === 'rad') {
                
                me.earnest = me.earnest * (Math.PI / 180)

              } else if (key === '∘') {

                me.earnest = me.earnest * (180 / Math.PI)

              }
            },
            press: function (event) {
              let me = this
              let key = event.target.textContent
              if (
                key != '=' && 
                key != 'C' &&
                key != '*' &&
                key != '/' &&
                key != '√' &&
                key != "x ²" &&
                key != "%" &&
                key != "<=" && 
                key != "±" && 
                key != "sin" && 
                key != "cos" && 
                key != "tan" && 
                key != "log" && 
                key != "ln" && 
                key != "x^" && 
                key != "x !" && 
                key != "π" && 
                key != "e" && 
                key != "rad" && 
                key != "∘"
              ) {
                me.ratio += key
              } else if (key === '=') {
                if ((me.ratio).indexOf('^') > -1) {
                  let base = (me.ratio).slice(0, (me.ratio).indexOf('^'))
                  let exponent = (me.ratio).slice((me.ratio).indexOf('^') + 1)
                  me.ratio = eval('Math.pow(' + base + ',' + exponent + ')')
                } else {
                  me.ratio = eval(me.ratio)
                }
              
              } else if (key === 'C') {
                
                me.ratio = ''

              } else if (key === '*') {
                
                me.ratio += '*'

              } else if (key === '/') {
                
                me.ratio += '/'

              } else if (key === '+') {
                
                me.ratio += '+'

              } else if (key === '-') {
                
                me.ratio += '-'

              } else if (key === '±') {
                
                if ((me.ratio).charAt(0) === '-') {
                  me.ratio = (me.ratio).slice(1)
                } else {
                  me.ratio = '-' + me.ratio
                }

              } else if (key === '<=') {
                
                me.ratio = me.ratio.substring(0, me.ratio.length - 1)

              } else if (key === '%') {
                
                me.ratio = me.ratio / 100

              } else if (key === 'π') {
                
                me.ratio = me.ratio * Math.PI

              } else if (key === 'x ²') {
                
                me.ratio = eval(me.ratio * me.ratio)

              } else if (key === '√') {
                
                me.ratio = Math.sqrt(me.ratio)

              } else if (key === 'sin') {
                
                me.ratio = Math.sin(me.ratio)

              } else if (key === 'cos') {
                
                me.ratio = Math.cos(me.ratio)

              } else if (key === 'tan') {
                
                me.ratio = Math.tan(me.ratio)

              } else if (key === 'log') {
                
                me.ratio = Math.log10(me.ratio)

              } else if (key === 'ln') {
                
                me.ratio = Math.log(me.ratio)

              } else if (key === 'x^') {
                
                me.ratio += '^'

              } else if (key === 'x !') {

                let number = 1
                if (me.ratio === 0) {
                  me.ratio = '1'
                } else if (me.ratio < 0) {
                  me.ratio = NaN
                } else {
                  let number = 1
                  for (let i = me.ratio; i > 0; i--) {
                    number *= i
                  }
                  me.ratio = number
                }

              } else if (key === 'e') {
                
                me.ratio = Math.exp(me.ratio)

              } else if (key === 'rad') {
                
                me.ratio = me.ratio * (Math.PI / 180)

              } else if (key === '∘') {

                me.ratio = me.ratio * (180 / Math.PI)

              }
            },
            // changeModeEvent: function() {
            //   let me = this
            //   me.changeMode = !me.changeMode
            //   console.log(me.current)
            // }
        }
    }
</script>
<style scoped>
  .calculator {
    width: 50%;
    padding: 10px;
    border-radius: 5px;
   /* margin: 3% auto;*/
    margin-top: 0%;
    font-size: 16px;
    /*background-color: hsl(0, 0%, 20%);*/
  }
  .input {
    width: 100%;   
    height: 50px;
    border-radius: 7px;
    border: 1px solid #dcdfe6;
    background-color: #fff;
    color: #333;
    padding: 0 5px 0 5px;
    margin: 0 0px 10px 0px;
    font-size: 30px;
  }
  input::-webkit-input-placeholder { 
    /* WebKit browsers */ 
    padding-left: 5px;
    font-size:16px;
    color: #dcdfe6;
  } 
 input::-moz-placeholder { 
    /* Mozilla Firefox 19+ */ 
    padding-left: 5px;
    padding-top:-10px;
    font-size:16px;
    color: #dcdfe6;
    line-height:150px;
  } 
  input:-ms-input-placeholder { 
    /* Internet Explorer 10+ */
    padding-left: 5px;
    padding-top:-10px;
    font-size:16px;
    color: #dcdfe6;
    line-height:150px;
  }
  .input:focus,
  .input:active {
    border-color: #03a9f4;
    /*box-shadow: 0 0 1px #03A9F4;*/
    outline: none 0;
  }

  .button {
    margin: 3px;
    width: 63px;
    border: 1px solid hsl(0, 0%, 5%);
    height: 30px;
    border-radius: 4px;
    color: hsl(0, 0%, 85%);
    background-color: hsl(0, 0%, 10%);
    cursor: pointer;
    outline: none;
  }

  .mode {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .equal-sign {
    background-color: hsl(120, 100%, 25%);
    width: 133px;
  }

  .toggle-button {
    border: none;
    background-color: hsl(0, 0%, 20%);
    /*cursor: pointer;*/
    outline: none;
    font-size: 1rem;
    color: #fff;
    text-shadow: 1px 1px 0 rgba(0, 0, 0, .8);
    margin-left:30%;
  }

  p {
    margin-top: -30%;
    letter-spacing: 5px;
    text-align: center;
    font-size: 20px
  }

  button::-moz-focus-inner {
    border-color: transparent;
  }
</style>
