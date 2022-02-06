import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/brand/page',
    method: 'get',
    params
  })
}

export function addBrand(params) {
  return request({
    url: '/brand',
    method: 'post',
    data: params
  })
}

export function deleteBrand(brandId) {
  return request({
    url: `/brand/${brandId}`,
    method: 'delete'
  })
}

export function modifyBrand(brandId, params) {
  return request({
    url: `/brand/${brandId}`,
    method: 'put',
    data: params
  })
}

export function getBrandById(brandId) {
  return request({
    url: `/brand/${brandId}`,
    method: 'get'
  })
}

export function switchStatus(brandId, status) {
  return request({
    url: `/brand/${brandId}/status/${status}`,
    method: 'put'
  })
}

export function getBrandCategoryRelation(brandId) {
  return request({
    url: `/brand/${brandId}/relateCategory`,
    method: 'get'
  })
}

export function deleteBrandCategoryRelation(ids) {
  return request({
    url: `/brand/relateCategory`,
    method: 'delete',
    data: ids
  })
}

export function addBrandCategoryRelatioin(brandId, catId) {
  return request({
    url: `/brand/${brandId}/relateCategory/${catId}`,
    method: 'post'
  })
}
