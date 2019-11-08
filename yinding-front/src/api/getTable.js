import request from '@/utils/request'

//查询
export function getTableData(param){
    return request({
        //https://easy-mock.com/mock/5b875b7db762eb26e90eb8f8/huaxiafinance-api/
        url:'/getTableData',
        method:'post',
        data:param
    })
}

 