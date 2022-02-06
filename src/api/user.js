import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

export function getUplodParam(fileExt) {
  return request({
    url: `/upload?fileExt=${fileExt}`,
    method: 'get'
  })
}

export function getPage(params) {
  return request({
    url: '/page',
    method: 'get',
    params
  })
}

export function switchStatus(operatorId, status) {
  return request({
    url: `/${operatorId}/status/${status}`,
    method: 'put'
  })
}

export function deleteUser(operatorId) {
  return request({
    url: `/${operatorId}`,
    method: 'delete'
  })
}

export function modifyUser(operatorId, params) {
  return request({
    url: `/${operatorId}`,
    method: 'put',
    data: params
  })
}

export function getOperator(operatorId) {
  return request({
    url: `/${operatorId}`,
    method: 'get'
  })
}

export function addUser(params) {
  return request({
    url: 'register',
    method: 'post',
    data: params
  })
}
