<template>
  <div class="app-component" style="margin-left:20px;margin-top:20px">

    <!-- 修改dialog -->
    <el-dialog
      title="修改属性分组"
      :visible.sync="modifyDialogVisible"
      width="30%"
      center
    >
      <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRule">
        <el-form-item label-width="120px" label="属性分组名称:" prop="attrGroupName">
          <el-input v-model="modifyForm.attrGroupName" />
        </el-form-item>
        <el-form-item label-width="120px" label="排序:" prop="sort">
          <el-input v-model.number="modifyForm.sort" />
        </el-form-item>
        <el-form-item label-width="120px" label="描述:" prop="description">
          <el-input v-model.number="modifyForm.description" />
        </el-form-item>
        <el-form-item label-width="120px" label="商品分类:" prop="cateIds">
          <Cascader :options="options" :valuedata="modifyForm.cateIds" :belong="2" :title="queryTitle" @choose="chooseCascade" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModify">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 新增dialog -->
    <el-dialog
      title="新增属性分组"
      :visible.sync="addDialogVisible"
      width="30%"
      center
    >
      <el-form ref="addForm" :model="addForm" :rules="addRule">
        <el-form-item label-width="120px" label="属性分组名称:" prop="attrGroupName">
          <el-input v-model="addForm.attrGroupName" />
        </el-form-item>
        <el-form-item label-width="120px" label="排序:" prop="sort">
          <el-input v-model.number="addForm.sort" />
        </el-form-item>
        <el-form-item label-width="120px" label="描述:" prop="description">
          <el-input v-model.number="addForm.description" />
        </el-form-item>
        <el-form-item label-width="120px" label="商品分类:" prop="cateIds">
          <Cascader :options="options" :belong="1" :title="queryTitle" @choose="chooseCascade" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
        <el-button @click="addDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label-width="80px">
        <el-input v-model="form.groupId" placeholder="属性分组ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.attrGroupName" placeholder="属性分组名称" />
      </el-form-item>
      <el-form-item label-width="80px">
        <Cascader :options="options" :belong="0" :valuedata="form.cateIds" :check-strictly="true" :title="queryTitle" @choose="chooseCascade" />
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
    >新增属性分类</el-button>

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

      <el-table-column align="center" label="属性分组ID">
        <template slot-scope="scope">
          <span>{{ scope.row.attrGroupId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="属性分组名称">
        <template slot-scope="scope">
          <span>{{ scope.row.attrGroupName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="描述">
        <template slot-scope="scope">
          <span>{{ scope.row.descript }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="所属分类列表">
        <template slot-scope="scope">
          <span>{{ scope.row.cateIds }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
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
            @click="deleteAttrGroup(scope.row)"
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
import Cascader from '@/components/Cascader/index.vue'
import * as cateAPI from '@/api/goods/category'
import * as attrAPI from '@/api/goods/attr'
import moment from 'moment'
import { Message } from 'element-ui'
export default {
  components: {
    Cascader
  },
  data() {
    return {
      queryTitle: '商品分类',
      options: null,
      list: null,
      total: null,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      addDialogVisible: false,
      modifyDialogVisible: false,
      form: {
        catId: null,
        groupId: null,
        attrGroupName: '',
        cateIds: null
      },
      addForm: {
        attrGroupName: '',
        sort: null,
        description: '',
        catId: null, // 3级分类id
        cateIds: null
      },
      modifyForm: {
        attrGroupId: null,
        attrGroupName: '',
        sort: null,
        description: '',
        catId: null, // 3级分类id
        cateIds: null
      },
      addRule: {
        attrGroupName: [
          { required: true, message: '请输入属性分组名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字' }
        ],
        cateIds: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      modifyRule: {
        attrGroupName: [
          { required: true, message: '请输入属性分组名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { type: 'number', message: '排序必须为数字' }
        ]
      }

    }
  },
  created() {
    this.getData()
    this.getPage()
  },
  methods: {
    getPage() {
      this.listLoading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        catId: this.form.catId,
        groupId: this.form.groupId,
        attrGroupName: this.form.attrGroupName
      }
      attrAPI.getPage(params).then(response => {
        const data = response.list
        data.map(item => {
          item.cateIds = JSON.parse(item.cateIds).join()
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
    getData() {
      cateAPI.getCascadeList().then(res => {
        this.options = res
      }).catch(err => {
        console.log(err)
      })
    },
    chooseCascade(belong, val) {
      // belong: [0:query,1:add,2:modify]
      switch (belong) {
        case 0:
          this.form.catId = val[val.length - 1]
          this.form.cateIds = val
          break
        case 1:
          this.addForm.catId = val[val.length - 1]
          this.addForm.cateIds = JSON.stringify(val)
          break
        case 2:
          this.modifyForm.catId = val[val.length - 1]
          this.modifyForm.cateIds = JSON.stringify(val)
          break
        default:
          break
      }
    },
    add() {
      this.addForm.attrGroupName = ''
      this.addForm.sort = null
      this.addForm.description = ''
      this.addForm.catId = null
      this.addForm.cateIds = null
      this.addDialogVisible = true
    },
    submitForm() {
      this.pageNo = 1
      this.getPage()
      // console.log(this.form)
    },
    resetForm() {
      this.form.catId = null
      this.form.groupId = null
      this.form.attrGroupName = ''
      this.form.cateIds = []
    },
    handleEdit(row) {
      this.modifyDialogVisible = true
      attrAPI.getAttrGroup(row.attrGroupId).then(response => {
        this.modifyForm.attrGroupId = row.attrGroupId
        this.modifyForm.attrGroupName = response.attrGroupName
        this.modifyForm.description = response.descript
        this.modifyForm.sort = response.sort
        this.modifyForm.catId = response.catId
        this.modifyForm.cateIds = JSON.parse(response.cateIds)
        console.log(this.modifyForm)
      }).catch(error => {
        console.log(error)
      })
    },
    deleteAttrGroup(row) {
      this.$confirm('此操作将会删除该属性分组，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        attrAPI.deleteAttrGroup(row.attrGroupId).then(response => {
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
    confirmAdd() {
      console.log(this.addForm)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          attrAPI.addAttrGroup(this.addForm).then(res => {
            this.addDialogVisible = false
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
    confirmModify() {
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          attrAPI.modifyAttrGroup(this.modifyForm).then(res => {
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
    getCascaderObj(val, opt) {
      return val.map(function(value, index, array) {
        for (var itm of opt) {
          if (itm.catId === value) { opt = itm.children; return itm }
        }
        return null
      })
    }
  }
}
</script>

<style>

</style>
