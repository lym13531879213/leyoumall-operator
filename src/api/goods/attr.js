import request from '@/utils/request'

// 获取商品分类分页列表
export function getPage(params) {
  return request({
    url: '/goods/attrGroup/page',
    method: 'get',
    params
  })
}

// 新增属性分组
export function addAttrGroup(params) {
  return request({
    url: '/goods/attrGroup',
    method: 'post',
    data: params
  })
}

// 回显属性分组信息
export function getAttrGroup(attrGroupId) {
  return request({
    url: `/goods/attrGroup/${attrGroupId}`,
    method: 'get'
  })
}

// 修改属性分组
export function modifyAttrGroup(params) {
  return request({
    url: '/goods/attrGroup',
    method: 'put',
    data: params
  })
}

// 删除属性分组
export function deleteAttrGroup(attrGroupId) {
  return request({
    url: `/goods/attrGroup/${attrGroupId}`,
    method: 'delete'
  })
}

