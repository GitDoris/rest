import request from '@/utils/tagConfig'



export function getPage(data) {
  return request({
    url: '/getPage',
    method: 'post',
    data:data
  })
}
export function initNewParam(params) {
  return request({
    url: '/initConfigPage',
    method: 'post',
    params
  })
}
export function add(data) {
  return request({
    url: '/add',
    method: 'post',
    data:data
  })
}
export function delet(data) {
  return request({
    url: '/delete',
    method: 'post',
    data:data
  })
}
export function edit(data) {
  return request({
    url: '/edit',
    method: 'post',
    data:data
  })
}
export function loadConfigDetail(data) {
  return request({
    url: '/loadConfigDetails',
    method: 'post',
    data:data
  })
}
 
