import request from '@/utils/request'

export function getPage(params) {
  console.log(params)
  return request({
    url: '/role/page',
    method: 'get',
    params
  })
}

export function switchStatus(roleId, status) {
  return request({
    url: `/role/${roleId}/status/${status}`,
    method: 'put'
  })
}

export function modifyRole(roleId, params) {
  return request({
    url: `/role/${roleId}`,
    method: 'put',
    data: params
  })
}
export function addRole(params) {
  return request({
    url: '/role',
    method: 'post',
    data: params
  })
}

export function deleteRole(roleId) {
  return request({
    url: `/role/${roleId}`,
    method: 'delete'
  })
}

export function getRoleById(roleId) {
  return request({
    url: `/role/${roleId}`,
    method: 'get'
  })
}

export function getMenuTree() {
  return request({
    url: `/menu/tree`,
    method: 'get'
  })
}

export function assignMenuToRole(params) {
  return request({
    url: `/menu/assign`,
    method: 'post',
    data: params
  })
}

export function getMenu() {
  return request({
    url: `menu`,
    method: 'get'
  })
}
