<template>
  <div class="app-container">
    <!-- 修改dialog -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="modifyDialogVisible"
      width="30%"
      center
    >
      <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRule">
        <el-form-item label-width="100px" label="分类名称:" prop="name">
          <el-input v-model="modifyForm.name" />
        </el-form-item>
        <el-form-item label-width="100px" label="排序:" prop="productUnit">
          <el-input v-model="modifyForm.productUnit" />
        </el-form-item>
        <el-form-item label-width="100px" label="排序:" prop="sort">
          <el-input v-model.number="modifyForm.sort" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModify">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 新增dialog -->
    <el-dialog
      title="新增商品分类"
      :visible.sync="addDialogVisible"
      width="30%"
      center
    >
      <el-form ref="addForm" :model="addForm" :rules="addRule">
        <el-form-item label-width="100px" label="分类名称:" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label-width="100px" label="计量单位:" prop="productUnit">
          <el-input v-model="addForm.productUnit" />
        </el-form-item>
        <el-form-item label-width="100px" label="排序:" prop="sort">
          <el-input v-model.number="addForm.sort" />
        </el-form-item>
        <el-form-item label-width="100px" label="是否显示:" prop="showStatus">
          <el-switch
            v-model="addForm.showStatus"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label-width="100px" label="层级:" prop="catLevel">
          <el-select v-model="addForm.catLevel">
            <el-option label="1级" value="1" />
            <el-option label="2级" value="2" />
            <el-option label="3级" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item v-if="addForm.catLevel==2 ||addForm.catLevel==3" label-width="100px" label="上一级ID:" prop="parentCid">
          <el-input v-model.number="addForm.parentCid" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 转移dialog -->
    <el-dialog
      title="转移商品分类"
      :visible.sync="transferDialogVisible"
      width="30%"
      center
    >
      <el-form ref="transferForm" :model="transferForm" :rules="transformRule">
        <el-form-item label-width="100px" label="上一级ID:" prop="parentCatId">
          <el-input v-model.number="transferForm.parentCatId" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmTransfer">确 定</el-button>
        <el-button @click="transferDialogVisible = false;$refs.transferForm.resetFields()">取 消</el-button>
      </span>
    </el-dialog>

    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label-width="80px">
        <el-input v-model="form.catId" placeholder="分类ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.name" placeholder="分类名称" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.parentCid" placeholder="上一级ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-select v-model="form.catLevel" placeholder="层级">
          <el-option label="1级" value="1" />
          <el-option label="2级" value="2" />
          <el-option label="3级" value="3" />
        </el-select>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-select v-model="form.showStatus" placeholder="是否显示">
          <el-option label="显示" value="1" />
          <el-option label="不显示" value="0" />
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
      @click="add"
    >新增商品分类</el-button>

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
      >
      <!-- <el-table-column align="center" label="编号" width="60">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column> -->

      <el-table-column align="center" label="分类ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.catId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="分类名称" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="层级" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.catLevel }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="上级分类ID" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.parentCid }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品数量" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.productCount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="计量单位" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.productUnit }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否显示" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.catId,scope.row.showStatus==0?0:1)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="transfer(scope.row)"
          >转移商品分类</el-button>
          <el-button
            size="mini"
            type="text"
            @click="deleteCategory(scope.row)"
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
import * as categoryAPI from '@/api/goods/category'
import moment from 'moment'
import { Message } from 'element-ui'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: null,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      multipleSelection: [],
      modifyDialogVisible: false,
      addDialogVisible: false,
      transferDialogVisible: false,
      form: {
        catId: null,
        name: '',
        parentCid: '',
        catLevel: null,
        showStatus: null
      },
      modifyForm: {
        catId: '',
        productUnit: '',
        name: '',
        sort: ''
      },
      modifyRule: {
        name: [
          { required: true, message: '请输入商品分类名称', trigger: 'blur' }
        ],
        productUnit: [
          { required: true, message: '请输入计量单位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字值' }
        ]
      },
      addForm: {
        name: '',
        productUnit: null,
        sort: null,
        showStatus: null,
        catLevel: null,
        // 当catLevel=1，则parentCid传0
        parentCid: null
      },
      addRule: {
        name: [
          { required: true, message: '请输入商品分类名称', trigger: 'blur' }
        ],
        productUnit: [
          { required: true, message: '请输入计量单位', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字值' }
        ],
        showStatus: [
          { required: true, message: '请选择是否显示', trigger: 'blur' }
        ],
        catLevel: [
          { required: true, message: '请选择层级', trigger: 'blur' }
        ],
        parentCid: [
          { required: true, message: '请输入上一级ID', trigger: 'blur' },
          { type: 'number', message: '上一级ID必须为数字值' }
        ]
      },
      transferForm: {
        childCatId: null,
        parentCatId: null
      },
      transformRule: {
        parentCatId: [
          { required: true, message: '请输入上一级ID', trigger: 'blur' },
          { type: 'number', message: '上一级ID必须为数字值' }
        ]
      }
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
        catId: this.form.catId,
        name: this.form.name,
        parentCid: this.form.parentCid,
        catLevel: this.form.catLevel,
        showStatus: this.form.showStatus
      }
      categoryAPI.getPage(params).then(response => {
        const data = response.list
        data.map(item => {
          item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
          item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
          item.catLevel = item.catLevel + '级'
          return item
        })
        this.list = data
        this.total = response.total
        this.listLoading = false
      }, (error) => {
        console.log(error)
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
    // 切换显示按钮
    switchStatus(catId, status) {
      categoryAPI.switchStatus(catId, status).then(response => {
        this.getPage()
        Message({
          message: '切换成功',
          type: 'success',
          duration: 3 * 1000
        })
      }, error => {
        console.log(error)
        Message({
          message: '切换失败',
          type: 'error',
          duration: 3 * 1000
        })
      })
    },
    // 重置表单
    resetForm() {
      this.form.catId = null
      this.form.name = ''
      this.form.parentCid = ''
      this.form.catLevel = null
      this.form.showStatus = null
    },
    // 条件查询
    submitForm() {
      this.pageNo = 1
      this.getPage()
    },
    add() {
      this.addDialogVisible = true
      this.$refs.addForm.resetFields()
    },
    confirmAdd() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.addForm.parentCid = this.addForm.parentCid == null ? 0 : this.addForm.parentCid
          categoryAPI.addCategory(this.addForm).then(res => {
            this.addDialogVisible = false
            // 清空表单
            this.$refs.addForm.resetFields()
            Message({
              message: '新增成功',
              type: 'success',
              duration: 3 * 1000
            })
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
    // 编辑商品分类
    handleEdit(row) {
      this.modifyDialogVisible = true
      categoryAPI.getModifyCategoryVO(row.catId).then(response => {
        this.modifyForm.name = response.name
        this.modifyForm.productUnit = response.productUnit
        this.modifyForm.sort = response.sort
        this.modifyForm.catId = response.catId
      }).catch(error => {
        console.log(error)
      })
    },
    // 确认修改
    confirmModify() {
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          const catId = this.modifyForm.catId
          categoryAPI.modifyCategory(catId, this.modifyForm).then(res => {
            Message({
              message: '修改成功',
              type: 'success',
              duration: 3 * 1000
            })
            this.getPage()
          }).catch(err => {
            console.log(err)
          })

          this.modifyDialogVisible = false
        } else {
          Message({
            message: '请正确填写表单',
            type: 'warning',
            duration: 3 * 1000
          })
        }
      })
    },
    transfer(row) {
      this.transferDialogVisible = true
      console.log(row)
      this.transferForm.childCatId = row.catId
    },
    // 转移商品分类
    confirmTransfer() {
      this.$refs.transferForm.validate(valid => {
        if (valid) {
          categoryAPI.transferCategory(this.transferForm).then(res => {

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
    // 逻辑删除商品分类
    deleteCategory(row) {
      this.$confirm('此操作将会级联删除商品分类，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        categoryAPI.deleteCategory(row.catId).then(response => {
          this.getPage()
          Message({
            message: '删除成功',
            type: 'success',
            duration: 3 * 1000
          })
        }, error => {
          console.log(error)
        })
      }).catch(() => {
        Message({
          type: 'info',
          duration: 2 * 1000,
          message: '已取消删除'
        })
      })
    }

  }
}
</script>
