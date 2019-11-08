import request from '@/utils/request'

//担保合同开立
//一级担保合同开立-列表查询
export function first(param) {
  return request({
    url: '/v1/contract/main/query-page/first',
    method: 'post',
    data: param
  })
}
//二级担保合同开立-列表查询
export function second(param) {
  return request({
    url: '/v1/contract/main/query-page/second',
    method: 'post',
    data: param
  })
}
//担保合同开立-新增/编辑
export function main(param,method) {
  return request({
    url: '/v1/contract/main',
    method: method,
    data: param
  })
}
//担保合同开立--删除
export function deletes(param) {
  return request({
    url: '/v1/contract/main/deletes',
    method: 'Delete',
    data: param
  })
}
//担保合同开立--回退
export function backs(param) {
  return request({
    url: '/v1/contract/main/backs',
    method: 'post',
    data: param
  })
}
//一级担保合同开立--提交
export function submits(param) {
  return request({
    url: '/v1/contract/main/submits',
    method: 'post',
    data: param
  })
}
//完成页担保合同开立-列表查询
export function finish(param) {
  return request({
    url: '/v1/contract/main/query-page/finish',
    method: 'post',
    data: param
  })
}
//担保合同开立-模板下载
export function download(param) {
  return request({
    url: '/v1/contract/excel/download',
    method: 'post',
    data: param
  })
}
//担保合同开立-批量上传
export function upload(param) {
  return request({
    url: '/v1/contract/excel/upload',
    method: 'post',
    data: param
  })
}



//债权人及主合同查询
//一级债权人及主合同查询-列表检索
export function queryOneCreditorList(param) {
  return request({
    url: '/creditorContract/queryOneCreditorList',
    method: 'post',
    data: param
  })
}
//二级债权人及主合同查询-列表检索
export function querySecondCreditorList(param) {
  return request({
    url: '/creditorContract/querySecondCreditorList',
    method: 'post',
    data: param
  })
}
//债权人及主合同-新增
export function addCreditor(param,method) {
  return request({
    url: '/creditorContract/addCreditor',
    method: method,
    data: param
  })
}
