<template>
    <div class="baseform">
        <div class="container">
            <div class="form-box" style="width:100%;">
                <el-form ref="form" :model="form" label-width="100px">
                    <!-- <el-form-item label="定金" :rules="[{ required: true}]">
                        <el-input v-model="earnest" style="width:40%"></el-input>
                    </el-form-item>
                    <el-form-item label="膨胀系数" :rules="[{ required: true}]">
                        <el-input v-model="ratio" style="width:40%"></el-input>
                    </el-form-item> -->
                    <el-form-item label="店铺满减：" style="width:100%;margin-bottom:30px">
                        <template slot-scope="scope">
                            <div style="float:left">
                                 <div v-for="(item,index) in goodsParamSets1" style="margin-bottom:12px">
                                    <span>满</span>
                                    <el-input v-model="item.fullPrice" auto-complete="off" style="width:150px;position:relative;margin-left:10px"></el-input>
                                    -
                                    <el-input v-model="item.reducePrice" auto-complete="off" style="width:150px;position:relative"></el-input>
                                    <el-switch v-model="item.ifSuperp" style="margin-left:6px"></el-switch>
                                    <i class="el-icon-circle-close-outline" v-if="index!==0" @click="closeCode1(index)" style="cursor:pointer"></i>
                                 </div>
                                 <el-button type="text" @click="addCode1" style="float:right;margin-top:-42px;margin-right:-50px">添加</el-button>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label="优惠劵：" style="width:100%;margin-bottom:30px">
                        <template slot-scope="scope">
                            <div style="float:left">
                                 <div v-for="(item,index) in goodsParamSets3" style="margin-bottom:12px">
                                    <span>满</span>
                                    <el-input v-model="item.fullPrice" auto-complete="off" style="width:150px;position:relative;margin-left:10px"></el-input>
                                    -
                                    <el-input v-model="item.reducePrice" auto-complete="off" style="width:150px;position:relative"></el-input>
                                    <el-switch v-model="item.ifSuperp" style="margin-left:6px"></el-switch>
                                    <i class="el-icon-circle-close-outline" v-if="index!==0" @click="closeCode3(index)" style="cursor:pointer"></i>
                                 </div>
                                 <el-button type="text" @click="addCode3" style="float:right;margin-top:-42px;margin-right:-50px">添加</el-button>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label="购物津贴：" style="width:100%;margin-bottom:30px">
                        <template slot-scope="scope">
                            <div style="float:left">
                                 <div v-for="(item,index) in goodsParamSets4" style="margin-bottom:12px">
                                    <span>满</span>
                                    <el-input v-model="item.fullPrice" auto-complete="off" style="width:150px;position:relative;margin-left:10px"></el-input>
                                    -
                                    <el-input v-model="item.reducePrice" auto-complete="off" style="width:150px;position:relative"></el-input>
                                    <el-switch v-model="item.ifSuperp" style="margin-left:6px"></el-switch>
                                    <i class="el-icon-circle-close-outline" v-if="index!==0" @click="closeCode4(index)" style="cursor:pointer"></i>
                                 </div>
                                 <el-button type="text" @click="addCode4" style="float:right;margin-top:-42px;margin-right:-50px">添加</el-button>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item label="品类劵：" style="width:100%;margin-bottom:15px">
                        <template slot-scope="scope">
                            <div style="float:left">
                                 <div v-for="(item,index) in goodsParamSets5" style="margin-bottom:12px">
                                    <span>满</span>
                                    <el-input v-model="item.fullPrice" auto-complete="off" style="width:150px;position:relative;margin-left:10px"></el-input>
                                    -
                                    <el-input v-model="item.reducePrice" auto-complete="off" style="width:150px;position:relative"></el-input>
                                    <el-switch v-model="item.ifSuperp" style="margin-left:6px"></el-switch>
                                    <i class="el-icon-circle-close-outline" v-if="index!==0" @click="closeCode5(index)" style="cursor:pointer"></i>
                                 </div>
                                 <el-button type="text" @click="addCode5" style="float:right;margin-top:-42px;margin-right:-50px">添加</el-button>
                            </div>
                        </template>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit" style="margin-top:30px">提交</el-button> 
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                form: {
                },
                tableData:[],
                goodsParamSets1:[{fullPrice:'',reducePrice:'',discounType:1,ifSuperp:false}],
                goodsParamSets3:[{fullPrice:'',reducePrice:'',discounType:3,ifSuperp:false}],
                goodsParamSets4:[{fullPrice:'',reducePrice:'',discounType:4,ifSuperp:false}],
                goodsParamSets5:[{fullPrice:'',reducePrice:'',discounType:5,ifSuperp:false}],
                add1:false,
                add2:false,
                add3:false,
                add4:false,
                // earnest:'',//定金
                // ratio:''//膨胀系数
            }
        },
        created() {
          this.getInfo()
        }, 
        mounted() {
          
        },
        methods: {
            getInfo() {
                 this.$.Post('/goods/page/goods/param/goodsKubParamSet/listInfo', {}, res=>{
                    res.forEach((item,index)=>{
                        if(item.discounType == 1) {
                            this.goodsParamSets1 = item.tempList
                        } else if(item.discounType == 3) {
                            this.goodsParamSets3 = item.tempList
                        } else if(item.discounType == 4) {
                            this.goodsParamSets4 = item.tempList
                        } else if(item.discounType == 5) {
                            this.goodsParamSets5 = item.tempList
                        }
                    })
                 })
            },
            getValue1(item) {
               this.add1 = item.ifSuperp
            },
            // getValue2(val) {
            //    this.add2 = val
            // },
            getValue3(val) {
               this.add3 = val
            },
            getValue4(val) {
               this.add4 = val
            },
            closeCode1(index) {
               this.goodsParamSets1.splice(index,1)
            },
            // closeCode2(index) {
            //    this.goodsParamSets2.splice(index,1)
            // },
            closeCode3(index) {
               this.goodsParamSets3.splice(index,1)
            },
            closeCode4(index) {
               this.goodsParamSets4.splice(index,1)
            },
            closeCode5(index) {
               this.goodsParamSets5.splice(index,1)
            },
            addCode1() {
               this.goodsParamSets1.push({fullPrice:'',reducePrice:'',discounType:1,ifSuperp:false})
            },
            addCode3() {
               this.goodsParamSets3.push({fullPrice:'',reducePrice:'',discounType:3,ifSuperp:false})
            },
            addCode4() {
               this.goodsParamSets4.push({fullPrice:'',reducePrice:'',discounType:4,ifSuperp:false})
            },
            addCode5() {
               this.goodsParamSets5.push({fullPrice:'',reducePrice:'',discounType:5,ifSuperp:false})
            },
            onSubmit() {
                console.log(JSON.stringify(this.goodsParamSets1))
                this.$.Post('/goods/page/goods/param/goodsKubParamSet/save',{
                         goodsParamSets1:JSON.stringify(this.goodsParamSets1),
                         // goodsParamSets2:JSON.stringify(this.goodsParamSets2),
                         goodsParamSets3:JSON.stringify(this.goodsParamSets3),
                         goodsParamSets4:JSON.stringify(this.goodsParamSets4),
                         goodsParamSets5:JSON.stringify(this.goodsParamSets5)
                },
                res=>{
                      if(res.success == true) {
                         this.$message.success(res.msg)
                         this.getInfo()
                      } else {
                         this.$message.warning(res.msg)
                      }
                })
            }
        }
    }
</script>
<style scoped>
    .el-form-item__label {
        width:83px !important;
    }
    .upload {
        width: 362px;
        height: 180px;
        border-radius: 20px;
        border: 1px dashed #ccc;
        cursor: pointer;
        background-position: center;
        background-repeat: no-repeat;
        position: relative;
    }
    .upload input[type="file"] {
        opacity: 0;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
        position: absolute;
        z-index: 100000;
        top: 0;
        left: 0;
    }
    .upload img {
        display: block;
        margin: 0 auto;
        width: 80%;
        height: 100%;
    }
</style>