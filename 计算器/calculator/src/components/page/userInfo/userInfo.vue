<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i>    用户信息 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box" style="margin-top:20px">
                <el-button size="small" class="el-button el-button--primary el-button--small" @click="addSector">添加用户</el-button>
            </div>
            <el-table v-loading="loading" :data="tableData" border style="width: 100%;margin-top:20px;" ref="multipleTable">
                <el-table-column prop="user_name" label="用户名">
                </el-table-column>
                <el-table-column prop="login_id" label="登录名">
                </el-table-column>
                <el-table-column prop="user_phone" label="手机号">
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template slot-scope="scope">
                        <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <div class="pagination"  style="text-align:center" v-if="tableData.length>0">
                <el-pagination @current-change="handleCurrentChange" layout="total,prev, pager, next" :total="total">
                </el-pagination>
            </div> -->
        </div>
         <!-- 编辑弹出框 -->
        <el-dialog :title="alertTile" :visible.sync="editVisible" width="30%" v-if="form">
            <el-form ref="form" :model="form" label-width="70px">
                 <el-form-item label="用户名">
                        <el-input v-model="form.user_name"></el-input>
                 </el-form-item>
                 <el-form-item label="登录名">
                        <el-input v-model="form.login_id"></el-input>
                 </el-form-item>
                 <el-form-item label="密码">
                        <el-input v-model="form.login_pwd" type="password"></el-input>
                 </el-form-item>
                 <el-form-item label="手机号">
                        <el-input v-model="form.user_phone" type="text"></el-input>
                 </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

         <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'baseform',
        data: function(){
            return {
                sector:"",
                sectorId:"",
                type:1,
                alertTile:"添加用户",
                loading:false,
                pageNo:1,
                delVisible: false,
                editVisible:false,
                userid:"",
                idx:-1,
                form: {
                    user_name:"",
                    login_id:"",
                    user_phone:'',
                    login_pwd:'',
                    id:"",
                },
                idx:'',
                tableData:[],
                rules: {
                    
                }
            }
        },
        created() {
           this.getData()
        },
        methods: {
            change(val) {
               this.sectorId = val
               this.getData()
            },
            getData() {
               this.$.Post("/union-operation-0.0.1-SNAPSHOT/aduser/getAduserList",{},res=>{
                  this.tableData = res.data
               })
            },
            handleDelete(index, row) {
                this.idx = row.login_id;
                this.delVisible = true;
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.getData()
            },
            deleteRow() {
                console.log(this.idx)
                this.$.Post("/union-operation-0.0.1-SNAPSHOT/aduser/AduserDelete",{login_id: this.idx},res=>{
                   this.tableData.splice(this.idx,1);
                   this.delVisible = false;
                   this.getData()
               })
            },
            handleEdit(index,row) {
                this.alertTile = "编辑用户信息"
                this.type = 2
                let self = this 
                this.userid = row.id
                this.$.Post("/kubInfo/page/kub/user/kubUser/updata",{id:row.id},res=>{
                     self.form = res.body.kubUser
                })
                this.editVisible = true;
            },
            //新增部门
            addSector() {
               this.alertTile = "添加用户"
               this.editVisible = true;
               this.form = {
               }
            },
            saveEdit() {
                // this.form.id = this.userid
                this.$.Post("/union-operation-0.0.1-SNAPSHOT/aduser/InsertAduser",this.form,res=>{
                    // this.$message.success(res.msg);
                    this.editVisible = false;
                    this.getData()
                })
            },
        }
    }
</script>