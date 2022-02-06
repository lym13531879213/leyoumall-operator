<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label-width="80px">
        <el-input v-model="form.operatorId" placeholder="运营用户ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.realName" placeholder="真实姓名" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.mobile" placeholder="手机号码" />
      </el-form-item>

      <!-- 状态 0：禁用 1：正常 -->
      <el-form-item label-width="80px">
        <el-select v-model="form.status" placeholder="是否启用">
          <el-option label="正常" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增dialog -->
    <el-dialog
      top="2%"
      title="新增运营用户"
      :visible.sync="addDialogVisible"
      width="30%"
      center
    >
      <el-form ref="addForm" :model="addForm" :rules="addRule">
        <el-form-item label-width="100px" label="用户名:" prop="username">
          <el-input v-model="addForm.username" />
        </el-form-item>
        <el-form-item label-width="100px" label="真实姓名:" prop="realName">
          <el-input v-model="addForm.realName" />
        </el-form-item>
        <el-form-item label-width="100px" label="邮箱:" prop="email">
          <el-input v-model="addForm.email" />
        </el-form-item>
        <el-form-item label-width="100px" label="手机号码:" prop="mobile">
          <el-input v-model.number="addForm.mobile" />
        </el-form-item>
        <el-form-item label-width="100px" label="密码:" prop="password">
          <el-input v-model.number="addForm.password" />
        </el-form-item>
        <el-form-item label-width="100px" label="头像:" prop="headImg">
          <el-upload
            v-loading="addHeadImgLoading"
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            action="#"
            :limit="1"
          >
            <img v-if="addForm.headImg" :src="addForm.headImg" class="avatar">

            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label-width="100px" label="是否启用:" prop="status">
          <el-switch
            v-model="addForm.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>

    </el-dialog>

    <!-- 修改dialog -->
    <el-dialog
      title="修改运营用户"
      :visible.sync="modifyDialogVisible"
      width="30%"
      center
    >
      <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRule">
        <el-form-item label-width="100px" label="用户名:" prop="username">
          <el-input v-model="modifyForm.username" />
        </el-form-item>

        <el-form-item label-width="100px" label="真实姓名:" prop="realName">
          <el-input v-model="modifyForm.realName" />
        </el-form-item>
        <el-form-item label-width="100px" label="邮箱:" prop="email">
          <el-input v-model="modifyForm.email" />
        </el-form-item>
        <el-form-item label-width="100px" label="手机号码:" prop="mobile">
          <el-input v-model.number="modifyForm.mobile" />
        </el-form-item>
        <el-form-item label-width="100px" label="头像:" prop="headImg">
          <el-upload
            v-loading="modifyHeadImgLoading"
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            action="#"
            :limit="1"
          >
            <img v-if="modifyForm.headImg" :src="modifyForm.headImg" class="avatar">

            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModify">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-button
      size="mini"
      type="success"
      @click="add"
    >新增运营用户</el-button>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      stripe
      style="margin-top:15px"
    >

      <el-table-column align="center" label="运营用户ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户名" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="姓名" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.realName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="头像" width="150">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 100px; height: 100px"
            :preview-src-list="scope.row.headImg.split()"
            :src="scope.row.headImg"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
            />
          </el-image>
        </template>
      </el-table-column>

      <el-table-column align="center" label="邮箱" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="手机号码" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" width="160">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <!-- 状态 0：禁用 1：正常 -->
      <el-table-column align="center" label="是否显示" width="130">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.userId,scope.row.status==0?0:1)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">

        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="assignRole(scope.row)"
          >分配角色</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="deleteUser(scope.row)"
          >删除</el-button>
        </template>

      </el-table-column>

    </el-table>
    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 15, 20, 25]"
      :page-size="10"
      :current-page="pageNo"
      style="float:right;margin-right:20px;margin-top:10px;margin-bottom:10px"
      @size-change="handleSizeChange"
      @current-change="handlePageNoChange"
    />
  </div>
</template>

<script>
import * as userAPI from '@/api/user'
import moment from 'moment'
import { Message } from 'element-ui'
import * as qiniu from '@/utils/qiniu'
export default {
  data() {
    return {
      list: null,
      total: null,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      addDialogVisible: false,
      modifyDialogVisible: false,

      form: {
        operatorId: null,
        realName: '',
        mobile: '',
        status: null
      },
      addForm: {
        username: '',
        realName: '',
        email: '',
        mobile: '',
        password: '',
        headImg: '',
        status: null
      },
      addRule: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        headImg: [{ required: true, message: '请上传头像', trigger: 'blur' }]
      },
      modifyForm: {
        operatorId: null,
        username: '',
        realName: '',
        email: '',
        mobile: '',
        headImg: ''
      },
      modifyRule: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        headImg: [{ required: true, message: '请上传头像', trigger: 'blur' }]
      },
      addHeadImgLoading: false,
      modifyHeadImgLoading: false
    }
  },
  created() {
    this.getPage()
  },
  methods: {
    getPage() {
      this.listLoading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        operatorId: this.form.operatorId,
        realName: this.form.realName,
        mobile: this.form.mobile,
        status: this.form.status
      }
      userAPI.getPage(params).then(res => {
        const data = res.list
        data.map(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          return item
        })
        this.list = data
        this.total = res.total
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    assignRole() {

    },
    deleteUser(row) {
      this.$confirm('此操作将会删除该运营用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        userAPI.deleteUser(row.userId).then(res => {
          this.getPage()
          Message({
            message: '删除成功',
            type: 'success',
            duration: 3 * 1000
          })
        })
      }).catch(() => {
        Message({
          type: 'info',
          duration: 2 * 1000,
          message: '已取消删除'
        })
      })
    },
    switchStatus(operatorId, status) {
      userAPI.switchStatus(operatorId, status).then(res => {
        this.getPage()
        Message({
          message: '切换成功',
          type: 'success',
          duration: 3 * 1000
        })
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.pageNo = 1
      this.getPage()
    },
    resetForm() {
      this.form.operatorId = null
      this.form.realName = ''
      this.form.mobile = ''
      this.form.status = null
    },
    add() {
      this.addDialogVisible = true
      this.operate = 'add'
      this.$refs.addForm.resetFields()
    },
    handleEdit(row) {
      this.operate = 'modify'
      userAPI.getOperator(row.userId).then(res => {
        this.modifyDialogVisible = true
        this.modifyForm.operatorId = res.userId
        this.modifyForm.username = res.username
        this.modifyForm.realName = res.realName
        this.modifyForm.email = res.email
        this.modifyForm.mobile = res.mobile
        this.modifyForm.headImg = res.headImg
      }).catch(err => {
        console.log(err)
      })
    },
    confirmAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          userAPI.addUser(this.addForm).then(res => {
            Message({
              message: '新增成功',
              type: 'success',
              duration: 3 * 1000
            })
            this.addDialogVisible = false
            this.getPage()
          }).catch(err => {
            console.log(err)
          })
        } else {
          Message({
            message: '请正确填写表单',
            type: 'warning',
            duration: 3 * 1000
          })
        }
      })
    },
    confirmModify() {
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          userAPI.modifyUser(this.modifyForm.operatorId, this.modifyForm).then(res => {
            Message({
              message: '修改成功',
              type: 'success',
              duration: 3 * 1000
            })
            this.modifyDialogVisible = false
            this.getPage()
          }).catch(err => {
            console.log(err)
          })
        } else {
          Message({
            message: '请正确填写表单',
            type: 'warning',
            duration: 3 * 1000
          })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      if (this.operate === 'add') {
        this.addHeadImgLoading = true
      } else if (this.operate === 'modify') {
        this.modifyHeadImgLoading = true
      }
      const type = file.type.split('/')
      console.log(type[0])
      // this.actionUrl = process.env.VUE_APP_BASE_API + '/operator/upload?'+
      const isImg = type[0] === 'image'
      // 限制图片大小 - 10M
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isImg) {
        Message({
          type: 'error',
          message: '请上传图片',
          duration: 3 * 1000
        })
        return
      }
      if (!isLt10M) {
        Message({
          type: 'error',
          message: '图片大小限制10M以内',
          duration: 3 * 1000
        })
        return
      }
      userAPI.getUplodParam(type[1]).then(res => {
        console.log(res)
        const params = {
          file,
          key: 'operator_' + res.url,
          token: res.token,
          putExtra: { fname: res.url },
          compress: false
        }
        qiniu.upload(params).then(res => {
          if (this.operate === 'add') {
            this.addForm.headImg = 'http://r5sgy1tel.hn-bkt.clouddn.com/' + res.key
            this.addHeadImgLoading = false
          } else if (this.operate === 'modify') {
            this.modifyForm.headImg = 'http://r5sgy1tel.hn-bkt.clouddn.com/' + res.key
            this.modifyHeadImgLoading = false
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    // 切换页面大小
    handleSizeChange(value) {
      this.pageSize = value
      this.getPage()
    },
    // 切换页码
    handlePageNoChange(value) {
      this.pageNo = value
      this.getPage()
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
