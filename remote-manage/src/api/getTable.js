import request from '@/utils/request'

//视频审核记录列表
export function videoAudit(param){
    return request({
        //https://easy-mock.com/mock/5b875b7db762eb26e90eb8f8/huaxiafinance-api/
        url:'remote/mediaAudit',
        method:'post',
        data:param
    })
}
//视频列表查看详情
export function record(mediaId){
    return request({
        url:'remote/record/'+mediaId,
        method:'post',
    })
}
//拉取视频信息
export function media(param){
    return request({
        url:'media/page',
        method:'post',
        data:param
    })
}

 