<template>
    <div>
        <div class="container">
            <div class="handle-box" style="margin-top:20px">
                <el-button size="small" class="el-button el-button--primary el-button--small" @click="deleteSector">删除部门</el-button>
                <el-button size="small" class="el-button el-button--primary el-button--small" @click="addSector">同步部门</el-button>
                <el-button size="small" class="el-button el-button--primary el-button--small" @click="selfSector">自动同步</el-button>
                <el-input-number v-model="hour" @change="handleChange" :min="1" :max="24" label="描述文字"></el-input-number>
            </div>
            <el-table v-loading="loading" :data="tableData" border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="departId" label="部门id">
                </el-table-column>
                <el-table-column prop="departName" label="部门名称">
                </el-table-column>
                <el-table-column prop="parentId" label="父部门id">
                </el-table-column>
            </el-table>
            <div class="handle-box" style="margin-top:20px" v-if="tableData.length>0">
                <el-pagination
                  background
                  layout="total,prev, pager, next"
                  :total="count"
                  @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                tableData:[],
                loading:false,
                count:'',
                pageNo:1,
                pageSize:15,
                hour:1
            }
        },
        created() {
           this.getData()
        },
        methods: {
            handleChange() {

            },
            selfSector() {
               this.loading = true
               this.$.Post('/bahoinfo/page/bahoinfo/bahoUser/autoSave',{hour:this.hour},res=>{
                   this.loading = false
                   this.$message.success(res.msg)
                   this.getData()
               })
            },
            addSector() {
               this.loading = true
               this.$.Post('/bahoinfo/page/bahoinfo/bahoDepartment/saveAll',{},res=>{
                   this.loading = false
                   this.getData()
               })
            },
            handleCurrentChange(val) {
               this.pageNo = val
               this.getData()
            },
            getData() {
               this.loading = true
               this.$.Post("/bahoinfo/page/bahoinfo/bahoDepartment/list",{pageSize:this.pageSize,pageNo:this.pageNo},res=>{
                  this.tableData = res.body.list
                  this.count = res.body.count
                  this.loading = false
               })
            },
            deleteSector() {
              this.loading = true
              this.$.Post('/bahoinfo/page/bahoinfo/bahoDepartment/deleteAll',{},res=>{
                 this.loading = false
                 this.getData()
                 this.$message.success(res.msg)
              })
            },
        }
    }
</script>