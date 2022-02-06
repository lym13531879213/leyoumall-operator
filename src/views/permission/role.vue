<template>
  <div class="app-container">
    <el-dialog
      title="修改角色"
      :visible.sync="modifyDialogVisible"
      width="30%"
      center
    >
      <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRule">
        <el-form-item label-width="100px" label="角色名称:" prop="roleName">
          <el-input v-model="modifyForm.roleName" />
        </el-form-item>
        <el-form-item label-width="100px" label="备注:" prop="remark">
          <el-input v-model="modifyForm.remark" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModify">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>

    </el-dialog>

    <!-- 新增dialog -->
    <el-dialog
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="30%"
      center
    >
      <el-form ref="addForm" :model="addForm" :rules="addRule">
        <el-form-item label-width="100px" label="角色名称:" prop="roleName">
          <el-input v-model="addForm.roleName" />
        </el-form-item>
        <el-form-item label-width="100px" label="备注:" prop="remark">
          <el-input v-model="addForm.remark" />
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

    <el-dialog
      title="分配菜单"
      :visible.sync="menuTreeDialog"
      width="30%"
      center
    >
      <el-tree
        ref="tree"
        :data="treeData"
        show-checkbox
        node-key="id"
        default-expand-all
      />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAssignMenu">确 定</el-button>
        <el-button @click="menuTreeDialog = false">取 消</el-button>
      </span>

    </el-dialog>

    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label-width="80px">
        <el-input v-model="form.roleId" placeholder="角色ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.roleName" placeholder="角色名称" />
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

    <el-button
      size="mini"
      type="success"
      @click="addDialogVisible=true"
    >新增角色</el-button>

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

      <el-table-column align="center" label="角色ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.roleId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="角色名称" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="备注" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="用户数" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.userCount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <!-- 状态 0：禁用 1：正常 -->
      <el-table-column align="center" label="是否启用" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.roleId,scope.row.status==0?0:1)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">

        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="assignMenu(scope.row)"
          >分配菜单</el-button>
          <el-button
            size="mini"
            type="text"
            @click="assignPermission(scope.row)"
          >分配权限</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="deleteRole(scope.row)"
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
import moment from 'moment'
import { Message } from 'element-ui'
import * as roleAPI from '@/api/role/index'
import { removeMenu } from '@/utils/auth'
export default {
  data() {
    return {
      currentRoleId: null,
      list: null,
      total: null,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      addDialogVisible: false,
      modifyDialogVisible: false,
      form: {
        roleId: null,
        roleName: '',
        status: null
      },
      addForm: {
        roleName: '',
        status: 0,
        remark: ''
      },
      addRule: {
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      modifyForm: {
        roleId: null,
        roleName: '',
        remark: ''
      },
      modifyRule: {
        roleName: [{ required: true, trigger: 'blur', message: '请输入角色名称' }]
      },
      treeData: [],
      menuTreeDialog: false
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
        roleId: this.form.roleId,
        roleName: this.form.roleName,
        status: this.form.status
      }
      roleAPI.getPage(params).then(res => {
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
    // 切换页面大小
    handleSizeChange(value) {
      this.pageSize = value
      this.getPage()
    },
    // 切换页码
    handlePageNoChange(value) {
      this.pageNo = value
      this.getPage()
    },
    switchStatus(roleId, status) {
      roleAPI.switchStatus(roleId, status).then(res => {
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
    resetForm() {
      this.form.roleId = null
      this.form.roleName = ''
      this.form.status = null
    },
    // 条件查询
    submitForm() {
      this.pageNo = 1
      this.getPage()
    },
    confirmAdd() {
      this.$refs.addForm.validate(valid => {
        roleAPI.addRole(this.addForm).then(res => {
          this.addDialogVisible = false
          this.getPage()
          Message({
            message: '新增角色成功',
            type: 'success',
            duration: 3 * 1000
          })
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    deleteRole(row) {
      this.$confirm('此操作将会删除该角色，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        roleAPI.deleteRole(row.roleId).then(res => {
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
    handleEdit(row) {
      roleAPI.getRoleById(row.roleId).then(res => {
        this.modifyDialogVisible = true
        this.modifyForm.roleName = res.roleName
        this.modifyForm.remark = res.remark
        this.modifyForm.roleId = res.roleId
      }).catch(err => {
        console.log(err)
      })
    },
    confirmModify() {
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          roleAPI.modifyRole(this.modifyForm.roleId, this.modifyForm).then(res => {
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
    assignMenu(row) {
      this.currentRoleId = row.roleId
      this.menuTreeDialog = true
      roleAPI.getMenuTree().then(res => {
        this.treeData = res
      }).catch(err => {
        console.log(err)
      })
    },
    confirmAssignMenu() {
      console.log(this.treeData)
      const selected = this.$refs.tree.getCheckedKeys(true)
      const params = {
        ids: selected,
        id: this.currentRoleId
      }
      roleAPI.assignMenuToRole(params).then(res => {
        this.menuTreeDialog = false
        removeMenu()
        Message({
          message: '分配菜单成功',
          type: 'success',
          duration: 3 * 1000
        })
        window.reload()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
