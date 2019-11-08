import request from '@/utils/request'

// 
export function getES(param) {
  return request({
    url: '/query/es',
    method: 'post',
    data: param,
  })
}
export function getHive(param) {
  return request({
    url: '/query/hive',
    method: 'post',
    data: param,
  })
}
