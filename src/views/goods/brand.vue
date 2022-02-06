<template>
  <div class="app-container">

    <!-- 新增dialog -->
    <el-dialog
      title="新增品牌"
      :visible.sync="addDialogVisible"
      width="30%"
      center
    >
      <el-form ref="addForm" :model="addForm" :rules="addRule">
        <el-form-item label-width="100px" label="品牌:" prop="name">
          <el-input v-model="addForm.name" />
        </el-form-item>
        <el-form-item label-width="100px" label="检索首字母:" prop="firstLetter">
          <el-input v-model="addForm.firstLetter" />
        </el-form-item>
        <el-form-item label-width="100px" label="排序:" prop="sort">
          <el-input v-model="addForm.sort" />
        </el-form-item>
        <el-form-item label-width="100px" label="品牌logo:" prop="logo">
          <el-upload
            v-loading="addLogoLoading"
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            action="#"
            :limit="1"
          >
            <img v-if="addForm.logo" :src="addForm.logo" class="avatar">

            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label-width="100px" label="介绍:" prop="description">
          <el-input v-model.number="addForm.description" />
        </el-form-item>
        <el-form-item label-width="100px" label="是否显示:" prop="showStatus">
          <el-switch
            v-model="addForm.showStatus"
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
      title="修改品牌"
      :visible.sync="modifyDialogVisible"
      width="30%"
      center
    >
      <el-form ref="modifyForm" :model="modifyForm" :rules="modifyRule">
        <el-form-item label-width="100px" label="品牌:" prop="name">
          <el-input v-model="modifyForm.name" />
        </el-form-item>
        <el-form-item label-width="100px" label="检索首字母:" prop="firstLetter">
          <el-input v-model="modifyForm.firstLetter" />
        </el-form-item>
        <el-form-item label-width="100px" label="排序:" prop="sort">
          <el-input v-model="modifyForm.sort" />
        </el-form-item>
        <el-form-item label-width="100px" label="品牌logo:" prop="logo">
          <el-upload
            v-loading="modifyLogoLoading"
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            action="#"
            :limit="1"
          >
            <img v-if="modifyForm.logo" :src="modifyForm.logo" class="avatar">

            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item label-width="100px" label="介绍:" prop="description">
          <el-input v-model.number="modifyForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmModify">确 定</el-button>
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="品牌-分类关联"
      :visible.sync="relationDialogVisible"
      width="35%"
      center
    >
      <cascade style="display:inline-block !important;margin-right:10px !important;" :belong="1" :options="options" title="商品分类" :valuedata="[]" @choose="chooseCascade" />
      <el-button
        size="mini"
        type="success"
        @click="addBrandCategoryRelatioin"
      >添加关联</el-button>
      <el-button
        size="mini"
        type="danger"
        @click="deleteRelation"
      >删除关联</el-button>

      <el-table
        v-loading="relationLoading"
        :data="relation"
        element-loading-text="Loading"
        border
        fit
        height="400"
        highlight-current-row
        stripe
        style="margin-top:15px !important;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        />
        <el-table-column align="center" label="编号" width="60">
          <template slot-scope="scope">
            {{ scope.$index+1 }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="关联ID">
          <template slot-scope="scope">
            <span>{{ scope.row.categoryBrandRelationId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="品牌ID">
          <template slot-scope="scope">
            <span>{{ scope.row.brandId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="品牌名称">
          <template slot-scope="scope">
            <span>{{ scope.row.brandName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分类ID">
          <template slot-scope="scope">
            <span>{{ scope.row.catelogId }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="分类名称">
          <template slot-scope="scope">
            <span>{{ scope.row.catelogName }}</span>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>

    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline">
      <el-form-item label-width="80px">
        <el-input v-model="form.brandId" placeholder="品牌ID" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-input v-model="form.name" placeholder="品牌名称" />
      </el-form-item>
      <el-form-item label-width="80px">
        <el-select v-model="form.firstLetter" placeholder="品牌首字母">
          <el-option v-for="(item,index) in firstLetterList" :key="index" :label="item" :value="item" />
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
    >新增品牌</el-button>
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

      <el-table-column align="center" label="品牌ID">
        <template slot-scope="scope">
          <span>{{ scope.row.brandId }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="品牌名称">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="品牌logo">
        <template slot-scope="scope">
          <el-image
            :lazy="true"
            style="width: 100px; height: 100px"
            :preview-src-list="scope.row.logo.split()"
            :src="scope.row.logo"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline" />
            </div>
            />
          </el-image>
        </template>
      </el-table-column>

      <el-table-column align="center" label="品牌首字母">
        <template slot-scope="scope">
          <span>{{ scope.row.firstLetter }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="排序">
        <template slot-scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="介绍">
        <template slot-scope="scope">
          <span>{{ scope.row.description }}</span>
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

      <el-table-column align="center" label="是否显示">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showStatus"
            :active-value="1"
            :inactive-value="0"
            @change="switchStatus(scope.row.brandId,scope.row.showStatus==0?0:1)"
          />
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="handleRelate(scope.row)"
          >关联分类</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleEdit(scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="deleteBrand(scope.row)"
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
import * as brandAPI from '@/api/goods/brand'
import * as cateAPI from '@/api/goods/category'
import moment from 'moment'
import { Message } from 'element-ui'
import { getFirstLetterListUtil } from '@/utils/index'
import * as qiniu from '@/utils/qiniu'
import * as userAPI from '@/api/user'
import cascade from '@/components/Cascader/index.vue'
export default {
  components: {
    cascade
  },
  data() {
    return {
      list: null,
      total: null,
      pageSize: 10,
      pageNo: 1,
      listLoading: true,
      firstLetterList: [],
      addDialogVisible: false,
      modifyDialogVisible: false,
      form: {
        brandId: null,
        name: '',
        showStatus: null,
        firstLetter: ''
      },
      modifyForm: {
        brandId: null,
        name: '',
        firstLetter: '',
        sort: null,
        logo: '',
        description: ''
      },
      modifyRule: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        firstLetter: [
          { required: true, message: '请输入检索首字母', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传品牌logo', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ]
      },
      modifyLogoLoading: false,
      addForm: {
        name: '',
        firstLetter: '',
        sort: null,
        logo: '',
        description: '',
        showStatus: null
      },
      addRule: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        firstLetter: [
          { required: true, message: '请输入检索首字母', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: '请上传品牌logo', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入介绍', trigger: 'blur' }
        ]
      },
      addLogoLoading: false,
      operate: 'add',
      relation: [],
      relationDialogVisible: false,
      relationLoading: false,
      options: [],
      addRelation: {
        brandId: null,
        cateId: null
      },
      deleteRelationIds: []
    }
  },
  created() {
    this.getPage()
    this.getData()
    this.getFirstLetterList()
  },
  methods: {
    handleSelectionChange(val) {
      const ids = []
      val.forEach(item => {
        ids.push(item.categoryBrandRelationId)
      })
      this.deleteRelationIds = ids
    },
    deleteRelation() {
      console.log(this.deleteRelationIds)
      this.$confirm('此操作将会删除关联，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        brandAPI.deleteBrandCategoryRelation(this.deleteRelationIds).then(res => {
          Message({
            message: '删除成功',
            type: 'success',
            duration: 3 * 1000
          })
          brandAPI.getBrandCategoryRelation(this.addRelation.brandId).then(res => {
            this.relation = res
          }).catch(err => {
            console.log(err)
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
    getData() {
      cateAPI.getCascadeList().then(res => {
        this.options = res
      }).catch(err => {
        console.log(err)
      })
    },
    // 0-query 1-添加关联
    chooseCascade(belong, val) {
      switch (belong) {
        case 0:

          break
        case 1:
          this.addRelation.cateId = val[val.length - 1]
          break
        default:
          break
      }
    },
    getPage() {
      this.listLoading = true
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        brandId: this.form.brandId,
        name: this.form.name,
        showStatus: this.form.showStatus,
        firstLetter: this.form.firstLetter
      }
      brandAPI.getPage(params).then(res => {
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
    switchStatus(brandId, status) {
      brandAPI.switchStatus(brandId, status).then(res => {
        this.getPage()
        Message({
          message: '切换成功',
          type: 'success',
          duration: 3 * 1000
        })
      }).catch(err => {
        console.log(err)
        Message({
          message: '切换失败',
          type: 'error',
          duration: 3 * 1000
        })
      })
    },
    handleSizeChange(value) {
      this.pageSize = value
      this.getPage()
    },
    handlePageNoChange(value) {
      this.pageNo = value
      this.getPage()
    },
    getFirstLetterList() {
      this.firstLetterList = getFirstLetterListUtil()
    },
    submitForm() {
      this.getPage()
    },
    resetForm() {
      this.pageNo = 1
      this.form.brandId = null
      this.form.name = ''
      this.form.showStatus = null
      this.form.firstLetter = ''
    },
    handleEdit(row) {
      this.operate = 'modify'
      brandAPI.getBrandById(row.brandId).then(res => {
        this.modifyDialogVisible = true
        this.modifyForm.brandId = res.brandId
        this.modifyForm.name = res.name
        this.modifyForm.sort = res.sort
        this.modifyForm.logo = res.logo
        this.modifyForm.description = res.description
        this.modifyForm.firstLetter = res.firstLetter
      }).catch(err => {
        console.log(err)
      })
    },
    confirmModify() {
      this.$refs.modifyForm.validate(valid => {
        if (valid) {
          brandAPI.modifyBrand(this.modifyForm.brandId, this.modifyForm).then(res => {
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

    deleteBrand(row) {
      this.$confirm('此操作将会删除改品牌，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        brandAPI.deleteBrand(row.brandId).then(res => {
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
    add() {
      this.addDialogVisible = true
      this.operate = 'add'
      this.$refs.addForm.resetFields()
    },
    confirmAdd() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          brandAPI.addBrand(this.addForm).then(res => {
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      if (this.operate === 'add') {
        this.addLogoLoading = true
      } else if (this.operate === 'modify') {
        this.modifyLogoLoading = true
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
          key: 'pms_' + res.url,
          token: res.token,
          putExtra: { fname: res.url },
          compress: false
        }
        qiniu.upload(params).then(res => {
          if (this.operate === 'add') {
            this.addForm.logo = 'http://r5sgy1tel.hn-bkt.clouddn.com/' + res.key
            this.addLogoLoading = false
          } else if (this.operate === 'modify') {
            this.modifyForm.logo = 'http://r5sgy1tel.hn-bkt.clouddn.com/' + res.key
            this.modifyLogoLoading = false
          }
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleRelate(row) {
      this.relationDialogVisible = true
      this.relationLoading = true
      this.addRelation.brandId = row.brandId
      brandAPI.getBrandCategoryRelation(row.brandId).then(res => {
        this.relation = res
        this.relationLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    addBrandCategoryRelatioin() {
      brandAPI.addBrandCategoryRelatioin(this.addRelation.brandId, this.addRelation.cateId).then(res => {
        brandAPI.getBrandCategoryRelation(this.addRelation.brandId).then(res => {
          Message({
            type: 'success',
            duration: 2 * 1000,
            message: '添加成功'
          })
          this.relation = res
        }).catch(err => {
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
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
  .relation{
    height: 300rpx;
  }
</style>

