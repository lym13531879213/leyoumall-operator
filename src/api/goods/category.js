import request from '@/utils/request'

// 获取商品分类分页列表
export function getPage(params) {
  return request({
    url: '/goods/category/page',
    method: 'get',
    params
  })
}

// 获取商品跟类cascade列表
export function getCascadeList() {
  return request({
    url: '/goods/category/cascade',
    method: 'get'
  })
}

// 切换分类显示状态
export function switchStatus(catId, status) {
  return request({
    url: `/goods/category/${catId}/status/${status}`,
    method: 'put'
  })
}

// 逻辑删除商品分类
export function deleteCategory(catId) {
  return request({
    url: `/goods/category/${catId}`,
    method: 'delete'
  })
}

// 回显修改分类数据
export function getModifyCategoryVO(catId) {
  return request({
    url: `/goods/category/${catId}`,
    method: 'get'
  })
}

// 修改商品分类信息
export function modifyCategory(catId, params) {
  return request({
    url: `/goods/category/${catId}`,
    method: 'put',
    data: params
  })
}

// 新增商品分类
export function addCategory(params) {
  return request({
    url: `/goods/category`,
    method: 'post',
    data: params
  })
}

// 迁移商品分类
export function transferCategory(params) {
  return request({
    url: `/goods/category/shift`,
    method: 'post',
    data: params
  })
}

