<template>
  <div class="app-container">

    <!-- 新增dialog -->
    <el-dialog
      title="新增属性"
      :visible.sync="addDialogVisible"
      width="30%"
      center
    >
      <el-form ref="addForm" :model="addForm" :rules="addRule">
        <el-form-item label-width="100px" label="属性名称:" prop="attrName">
          <el-input v-model="addForm.attrName" />
        </el-form-item>
        <el-form-item label-width="100px" label="属性类型:" prop="attrType">
          <el-select v-model="addForm.attrType">
            <el-option label="销售属性" value="0" />
            <el-option label="规格参数" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item label="值类型:" label-width="100px" prop="valueType">
          <el-radio-group v-model="addForm.valueType">
            <el-radio label="0">单值</el-radio>
            <el-radio label="1">多值</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="可选值:" label-width="100px" prop="valueSelect">
          <el-select
            v-model="addForm.valueSelect"
            multiple
            filterable
            allow-create
            default-first-option
          /></el-form-item>

        <el-form-item label-width="100px" label="商品分类:" prop="cateIds">
          <Cascader :options="options" :belong="1" :valuedata="addForm.cateIds" @choose="chooseCascade" />
        </el-form-item>
        <el-form-item label-width="100px" label="快速展示:" prop="showDesc">
          <el-switch
            v-model="addForm.showDesc"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label-width="100px" label="启用状态:" prop="enable">
          <el-switch
            v-model="addForm.enable"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label-width="100px" label="快速展示:" prop="searchType">
          <el-switch
            v-model="addForm.searchType"
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
      title="修改属性"
      :visible.sync="modifyDialogVisible"
      width="30%"
      center
    >
      <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRule">
        <el-form-item label-width="100px" label="属性名称:" prop="attrName">
          <el-input v-model="modifyForm.attrName" />
        </el-form-item>
        <el-form-item label-width="100px" label="属性类型:" prop="attrType">
          <el-select v-model="modifyForm.attrType">
            <el-option label="销售属性" :value="0" />
            <el-option label="规格参数" :value="1" />
          </el-select>
        </el-form-item>

        <el-form-item label="值类型:" label-width="100px" prop="valueType">
          <el-radio-group v-model="modifyForm.valueType">
            <el-radio :label="0">单值</el-radio>
            <el-radio :label="1">多值</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="可选值:" label-width="100px" prop="valueSelect">
          <el-select
            v-model="modifyForm.valueSelect"
            multiple
            filterable
            allow-create
            default-first-option
          /></el-form-item>

        <el-form-item label-width="100px" label="商品分类:" prop="cateIds">
          <Cascader :options="options" :belong="2" :valuedata="modifyForm.cateIds" @choose="chooseCascade" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModify">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label-width="80px">
        <el-input v-model="form.attrId" placeholder="属性ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.attrName" placeholder="属性名称" />
      </el-form-item>
      <el-form-item label-width="80px">
        <Cascader :options="options" :belong="0" :valuedata="form.cateIds" :check-strictly="true" @choose="chooseCascade" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-select v-model="form.searchType" placeholder="是否检索">
          <el-option label="检索" value="1" />
          <el-option label="不检索" value="0" />
        </el-select>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-select v-model="form.attrType" placeholder="属性类型">
          <el-option label="销售属性" value="0" />
          <el-option label="规格参数" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label-width="80px">
        <el-select v-model="form.enable" placeholder="是否启用">
          <el-option label="禁用" value="0" />
          <el-option label="启用" value="1" />
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
    >新增规格参数 & 销售属性</el-button>

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

      <el-table-column align="center" label="属性ID">
        <template slot-scope="scope">
          <span>{{ scope.row.attrId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="属性名称">
        <template slot-scope="scope">
          <span>{{ scope.row.attrName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="属性类型">
        <template slot-scope="scope">
          <span>{{ scope.row.attrType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="值类型">
        <template slot-scope="scope">
          <span>{{ scope.row.valueType }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="可选值列表">
        <template slot-scope="scope">
          <span>{{ scope.row.valueSelect }}</span>
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

      <el-table-column align="center" label="是否启用" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enable"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.attrId,scope.row.enable==0?0:1,1)"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否检索" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.searchType"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.attrId,scope.row.searchType==0?0:1,0)"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="是否快速展示" width="120">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showDesc"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.attrId,scope.row.showDesc==0?0:1,2)"
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
            @click="deleteAttr(scope.row)"
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
import * as attrAPI from '@/api/goods/attr'
import * as cateAPI from '@/api/goods/category'
import moment from 'moment'
import { Message } from 'element-ui'
export default {
  components: {
    Cascader
  },
  data: function() {
    return {
      options: null,
      list: null,
      total: null,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      addDialogVisible: false,
      modifyDialogVisible: false,
      form: {
        attrId: null,
        attrName: '',
        searchType: null,
        attrType: null,
        enable: null,
        catId: null, // 传参使用
        cateIds: null
      },
      addForm: {
        attrName: '',
        searchType: null,
        valueType: null,
        valueSelect: null,
        attrType: null,
        enable: null,
        catId: null,
        cateIds: null,
        showDesc: null
      },
      modifyForm: {
        attrId: null,
        attrName: '',
        searchType: null,
        valueType: null,
        valueSelect: null,
        attrType: null,
        enable: null,
        catId: null,
        cateIds: null,
        showDesc: null
      },

      addRule: {
        attrName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ],
        valueType: [
          { required: true, message: '请选择属性值类型', trigger: 'blur' }
        ],
        attrType: [
          { required: true, message: '请选择属性类型', trigger: 'blur' }
        ],
        cateIds: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      modifyRule: {
        attrName: [
          { required: true, message: '请输入属性名称', trigger: 'blur' }
        ],
        valueType: [
          { required: true, message: '请选择属性值类型', trigger: 'blur' }
        ],
        attrType: [
          { required: true, message: '请选择属性类型', trigger: 'blur' }
        ]
      }

    }
  },
  created() {
    this.getData()
    this.getPage()
  },
  methods: {
    getData() {
      cateAPI.getCascadeList().then(res => {
        this.options = res
      }).catch(err => {
        console.log(err)
      })
    },
    getPage() {
      this.listLoading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        attrId: this.form.attrId,
        attrName: this.form.attrName,
        searchType: this.form.searchType,
        attrType: this.form.attrType,
        enable: this.form.enable,
        catId: this.form.catId
      }
      attrAPI.getAttrPage(params).then(response => {
        const data = response.list
        data.map(item => {
          item.cateIds = JSON.parse(item.cateIds).join()
          item.valueSelect = item.valueSelect === '' ? '' : JSON.parse(item.valueSelect).join()
          item.attrType = item.attrType === 0 ? '销售属性' : '规格参数'
          item.valueType = item.valueType === 0 ? '单值' : '多值'
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
    submitForm() {
      this.pageNo = 1
      this.getPage()
    },
    resetForm() {
      this.form.attrId = null
      this.form.attrName = ''
      this.form.searchType = null
      this.form.attrType = null
      this.form.enable = null
      this.form.catId = null
      this.form.cateIds = []
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
    chooseCascade(belong, val) {
      switch (belong) {
        case 0:
          this.form.catId = val[val.length - 1]
          this.form.cateIds = val
          break
        case 1:
          this.addForm.catId = val[val.length - 1]
          this.addForm.cateIds = val
          break
        case 2:
          this.modifyForm.catId = val[val.length - 1]
          this.modifyForm.cateIds = val
          break
        default:
          break
      }
    },
    confirmAdd() {
      const list = this.addForm
      list.valueSelect = JSON.stringify(list.valueSelect)
      list.cateIds = JSON.stringify(list.cateIds)
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          attrAPI.addAttr(this.addForm).then(res => {
            this.addDialogVisible = false
            this.$refs.addForm.resetFields()
            this.addForm.cateIds = []
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
    switchStatus(attrId, status, type) {
      console.log('type:' + type)
      const params = {
        'type': type
      }
      attrAPI.switchStatus(attrId, status, params).then(res => {
        this.getPage()
        Message({
          message: '切换成功',
          type: 'success',
          duration: 2 * 1000
        })
      }).catch(err => {
        console.log(err)
        Message({
          message: '切换失败',
          type: 'error',
          duration: 2 * 1000
        })
      })
    },
    handleEdit(row) {
      this.modifyForm.attrId = row.attrId
      this.modifyDialogVisible = true
      attrAPI.getAttr(row.attrId).then(response => {
        this.modifyForm.attrType = response.attrType
        this.modifyForm.attrName = response.attrName
        this.modifyForm.valueType = response.valueType
        this.modifyForm.valueSelect = response.valueSelect === '' ? [] : JSON.parse(response.valueSelect)
        this.modifyForm.catId = response.catelogId
        this.modifyForm.cateIds = JSON.parse(response.cateIds)
        console.log(this.modifyForm)
      }).catch(error => {
        console.log(error)
      })
    },
    confirmModify() {
      const params = this.modifyForm
      params.cateIds = JSON.stringify(params.cateIds)
      params.valueSelect = params.valueSelect === null ? null : JSON.stringify(params.valueSelect)
      attrAPI.putAttr(params.attrId, params).then(res => {
        Message({
          type: 'success',
          message: '修改成功',
          duration: 2 * 1000
        })
        this.modifyDialogVisible = false
        this.getPage()
      }).catch(err => {
        console.log(err)
      })
    },
    deleteAttr(row) {
      this.$confirm('此操作将会删除该属性以及关联数据，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        attrAPI.deleteAttr(row.attrId).then(response => {
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

<style>

</style>
