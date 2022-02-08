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

// 获取属性（分页）
export function getAttrPage(params) {
  return request({
    url: '/goods/attr/page',
    method: 'get',
    params
  })
}

// 获取属性
export function getAttr(attrId) {
  return request({
    url: `/goods/attr/${attrId}`,
    method: 'get'
  })
}

// 新增属性
export function addAttr(params) {
  return request({
    url: '/goods/attr',
    method: 'post',
    data: params
  })
}

// 修改属性
export function putAttr(attrId, params) {
  return request({
    url: `/goods/attr/${attrId}`,
    method: 'put',
    data: params
  })
}

export function deleteAttr(attrId) {
  return request({
    url: `/goods/attr/${attrId}`,
    method: 'delete'
  })
}

export function switchStatus(attrId, status, params) {
  return request({
    url: `/goods/attr/${attrId}/status/${status}`,
    method: 'put',
    params
  })
}

export function relateAttribute(attrGroupId, attrIds) {
  return request({
    url: `/goods/attrGroup/${attrGroupId}/relateAttribute`,
    method: 'post',
    data: attrIds
  })
}

export function getRelation(attrGroupId) {
  return request({
    url: `/goods/attrGroup/${attrGroupId}/relateAttribute`,
    method: 'get'
  })
}

export function deleteRelation(ids) {
  return request({
    url: `/goods/attrGroup/relateAttribute`,
    method: 'delete',
    data: ids
  })
}

