import request from '@/utils/request'

//车贷贷后-对公还款流水列表
export function publicFlowList(data) {
    return request({
        url: '/refund/corporate/2/account/list',
        method: 'post',
        data: data
    })
}
//车贷贷后-重复导入流水列表
export function repeatFlowList(data) {
    return request({
        url: '/refund/corporate/2/account/templist',
        method: 'post',
        data: data
    })
}
//车贷贷后-模板导入
export function importExcel(data) {
    return request({
        url: '/refund/corporate/2/account/upload',
        method: 'post',
        timeout: 180000,
        data: data,
    })
}
//车贷贷后-模板导出
/*export function exportExcel(data) {
  return request({
    url: '/refund/corporate/2/account/download',
    method: 'post',
    data: data
  })
}*/

//对公还款-新增提前结清查询
export function dgEarlyClearanceInfo(data) {
    return request({
        url: '/refund/corporate/2/account/detail/earlyClearanceInfo',
        method: 'post',
        data: data
    })
}
//挂账申请复核-详情-挂账信息新增一个接口
export function dgSuspendinfo(data) {
    return request({
        url: '/suspend/cancel/detail/suspendinfo',
        method: 'post',
        data: data
    })
}
//对公还款-对公还款流水导出
export function refundDownload(data) {
    return request({
        url: '/refund/download',
        method: 'post',
        data: data,
        responseType:'blob'
    })
}
//对公还款-对公录入-待处理任务列表
export function toDoTasks(data) {
    return request({
        url: '/refund/corporate/2/account/lr/toDoTasks',
        method: 'post',
        data: data
    })
}

//对公还款-对公录入-已经处理任务列表
export function doneTasks(data) {
    return request({
        url: '/refund/corporate/2/account/lr/doneTasks',
        method: 'post',
        data: data
    })
}

//对公还款-对公录入-待处理新增弹窗搜索功能
export function searchTasks(data) {
    return request({
        url: '/refund/corporate/2/account/searchTasks',
        method: 'post',
        data: data
    })
}
//对公还款-对公录入-待处理新增弹窗-确认功能
export function newTask(data) {
    return request({
        url: '/refund/corporate/2/account/detail/newTask',
        method: 'post',
        data: data
    })
}
//对公还款-对公录入-待处理详情-操作记录
export function oprLogs(data) {
    return request({
        url: '/refund/corporate/2/account/detail/oprLogs',
        method: 'post',
        data: data
    })
}
//对公还款-对公录入-待处理详情-测算结果
export function calculate(data) {
    return request({
        url: '/refund/corporate/2/account/detail/calculate',
        method: 'post',
        data: data
    })
}
export function actualCalculate(data) {
    return request({
        url: '/refund/corporate/2/account/detail/actualCalculate',
        method: 'post',
        data: data
    })
}
//对公还款-对公录入-待处理详情-还款信息
export function payInfo(data) {
    return request({
        url: '/refund/corporate/2/account/detail/payInfo',
        method: 'post',
        data: data
    })
}
//对公还款-对公录入-待处理详情-实还信息实际还款
export function actualPayInfo(data) {
    return request({
        url: '/refund/corporate/2/account/detail/actualPayInfo',
        method: 'post',
        data: data
    })
}
//对公还款-对公录入-待处理详情-影像平台
export function imgePlatformUrl(data) {
    return request({
        url: '/image/platform/url',
        method: 'post',
        data: data
    })
}

//对公还款-详情-取消按钮
export function cancel(data) {
    return request({
        url: '/refund/corporate/2/account/detail/cancel',
        method: 'post',
        data: data
    })
}
//对公还款-详情-保存按钮
export function save(data) {
    return request({
        url: '/refund/corporate/2/account/detail/save',
        method: 'post',
        data: data
    })
}
//对公还款-详情-提交按钮
export function submit(data) {
    return request({
        url: '/refund/corporate/2/account/detail/submit',
        method: 'post',
        data: data
    })
}
//对公还款-详情-回退
export function goback(data) {
    return request({
        url: '/refund/corporate/2/account/detail/goback',
        method: 'post',
        data: data
    })
}

/*export function imagePlatform(flowId, businessNo) {
  return request({
    url: '/ecms/' + flowId + '/' + businessNo,
    method: 'get',
    // data: data
  })
}*/
//对公还款-对公初审-已处理任务
export function initialAuditHandled(data) {
    return request({
        url: '/refund/corporate/2/account/cs/doneTasks',
        method: 'post',
        data: data
    })
}
//对公还款-对公初审-待处理任务
export function initialAuditPending(data) {
    return request({
        url: '/refund/corporate/2/account/cs/toDoTasks',
        method: 'post',
        data: data
    })
}
//对公还款-对公终审-待处理任务
export function finalAuditPending(data) {
    return request({
        url: '/refund/corporate/2/account/zs/toDoTasks',
        method: 'post',
        data: data
    })
}
//对公还款-对公终审-已处理任务
export function finalAuditHanded(data) {
    return request({
        url: '/refund/corporate/2/account/zs/doneTasks',
        method: 'post',
        data: data
    })
}
//对公还款-对公终审-处理中任务
export function finalAuditHanding(data) {
    return request({
        url: '/refund/corporate/2/account/zs/doingTasks',
        method: 'post',
        data: data
    })
}
//对公还款-对公初审-待处理任务-提交
export function initialAuditSubmit(data) {
    return request({
        url: '/refund/corporate/2/account/detail/submit',
        method: 'post',
        data: data
    })
}
//对公还款-初审-详情-合同信息接口
export function contractInfo(data) {
    return request({
        url: '/refund/corporate/2/account/detail/contractInfo',
        method: 'post',
        data: data
    })
}
//对公还款-详情-对公还款信息接口
export function corPayInfo(data) {
    return request({
        url: '/refund/corporate/2/account/detail/corPayInfo',
        method: 'post',
        data: data
    })
}
//对公还款-详情-流水列表接口
export function tRecords(data) {
    return request({
        url: '/refund/corporate/2/account/detail/tRecords',
        method: 'post',
        data: data
    })
}
//初审-详情-流水匹配接口 匹配保存
export function recordMatch(data) {
    return request({
        url: '/refund/corporate/2/account/detail/recordMatch',
        method: 'post',
        data: data
    })
}
//初审-详情-修改匹配接口
export function editMatch(data) {
    return request({
        url: '/refund/corporate/2/account/detail/editMatch',
        method: 'post',
        data: data
    })
}
//初审-详情-流水匹配记录接口
export function mRecords(data) {
    return request({
        url: '/refund/corporate/2/account/detail/mRecords',
        method: 'post',
        data: data
    })
}


// 财务信息查询接口
// 列表明细
export function financeList(data) {
    return request({
        url: '/account/list',
        method: 'post',
        data: data
    })
}
// 详情
export function financeDetail(data) {
    return request({
        url: '/account/detail',
        method: 'post',
        data: data
    })
}
// 还款计划表
export function repaymentList(data) {
    return request({
        url: '/account/detail/ps',
        method: 'post',
        data: data
    })
}
//交易明细
export function transcationList(data) {
    return request({
        url: '/account/detail/rp',
        method: 'post',
        data: data
    })
}
//逾期明细
export function overDueList(data) {
    return request({
        url: '/account/detail/ov',
        method: 'post',
        data: data
    })
}

//提前结清模块

//车贷罚息调整模块

//车贷罚息调整模块----车贷罚息违约金调整penaltyAdjustment
//待处理任务列表
export function pApplyTodoList(data) {
    return request({
        url: '/fine/applyTodoList',
        method: 'post',
        data: data
    })
}
//新增查询列表
export function applyTodoAddSearch(data) {
    return request({
        url: '/fine/applyTodoAdd/search',
        method: 'post',
        data: data
    })
}
//批量新增
export function pBatchInsert(data) {
    return request({
        url: '/fine/applyTodoAdd/batchInsert',
        method: 'post',
        data: data
    })
}
//待处理列表提交
export function batchSubmit(data) {
    return request({
        url: '/fine/applyTodoList/batchSubmit',
        method: 'post',
        data: data
    })
}
//待处理列表取消
export function pCancel(data) {
    return request({
        url: '/fine/applyTodoList/cancel',
        method: 'post',
        data: data
    })
}
//待处理列表点击合同号详情
export function pDetail(data) {
    return request({
        url: '/fine/applyTodoList/detail',
        method: 'post',
        data: data
    })
}
//罚息调整、复核已处理列表点击合同号详情
export function pDetailAlready(data) {
    return request({
        url: '/fine/applyTodoList/detail/already',
        method: 'post',
        data: data
    })
}
//待处理列表点击合同号保存
export function applyTodoListUpdate(data) {
    return request({
        url: '/fine/applyTodoList/update',
        method: 'post',
        data: data
    })
}
//待处理列表点击合同号提交
export function applyTodoListSubmit(data) {
    return request({
        url: '/fine/applyTodoList/submit',
        method: 'post',
        data: data
    })
}
//罚息减免-车贷罚息违约金调整-已处理申请列表
export function applyDoneList(data) {
    return request({
        url: '/fine/applyDoneList',
        method: 'post',
        data: data
    })
}
//罚息减免-车贷罚息违约金调整复核—>待处理任务列表
export function reviewTodoList(data) {
    return request({
        url: '/fine/reviewTodoList',
        method: 'post',
        data: data
    })
}
//罚息减免-车贷罚息违约金调整复核—>待处理批量提交冲账
export function reviewTodoListBatchSubmit(data) {
    return request({
        url: '/fine/reviewTodoList/batchSubmit',
        method: 'post',
        data: data
    })
}
//罚息减免-车贷罚息违约金调整复核—>已处理任务列表
export function reviewDoneList(data) {
    return request({
        url: '/fine/reviewDoneList',
        method: 'post',
        data: data
    })
}
//罚息减免-车贷罚息违约金调整复核—>待处理任务列表->回退
export function batchReturn(data) {
    return request({
        url: '/fine/reviewTodoList/return',
        method: 'post',
        data: data
    })
}
//罚息减免-车贷罚息违约金调整复核—>待处理任务列表->拒绝
export function batchReject(data) {
    return request({
        url: '/fine/reviewTodoList/reject',
        method: 'post',
        data: data
    })
}
// 挂账撤销
//待处理列表、已处理列表
export function repealList(data) {
    return request({
        url: '/repeal/list',
        method: 'post',
        data: data
    })
}
//待处理详情、已处理详情
export function detailRepeal(data) {
    return request({
        url: '/repeal/detailRepeal',
        method: 'post',
        data: data
    })
}
//复核待处理任务
export function refhTodoTasks(data) {
    return request({
        url: '/suspend/cancel/fh/todoTasks',
        method: 'post',
        data: data
    })
}
//登记已处理任务
export function reDoneTasks(data) {
    return request({
        url: '/suspend/cancel/lr/doneTasks',
        method: 'post',
        data: data
    })
}
//复核已处理任务
export function refhDoneTasks(data) {
    return request({
        url: '/suspend/cancel/fh/doneTasks',
        method: 'post',
        data: data
    })
}
//新增搜索
export function reSearchTasks(data) {
    return request({
        url: '/repeal/addSearch',
        method: 'post',
        data: data
    })
}
//新增确认
export function reNewTask(data) {
    return request({
        url: '/repeal/addConfirm',
        method: 'post',
        data: data
    })
}
//取消
export function reCancel(data) {
    return request({
        url: '/repeal/repealCancel',
        method: 'post',
        data: data
    })
}
//挂账撤销申请-详情-财务信息接口
export function reAcctinfo(data) {
    return request({
        url: '/suspend/cancel//detail/acctinfo',
        method: 'post',
        data: data
    })
}
//挂账撤销申请-详情-历史挂账撤销操作
export function repealHistoryList(data) {
    return request({
        url: '/repeal/repealHistoryList',
        method: 'post',
        data: data
    })
}
//挂账撤销申请-详情-录入阶段提交
export function repealSubmit(data) {
    return request({
        url: '/repeal/repealSubmit',
        method: 'post',
        data: data
    })
}
//挂账撤销申请-详情-复核阶段提交
export function reSubmit4FH(data) {
    return request({
        url: '/suspend/cancel/submit4FH',
        method: 'post',
        data: data
    })
}
//挂账撤销--回退
export function reGoback(data) {
    return request({
        url: '/suspend/cancel/detail/goback',
        method: 'post',
        data: data
    })
}


//提前结清
//待处理或者已处理
export function eClearanceProcessing(data) {
    return request({
        url: '/earlyclearance/entry/earlyclearanceProcessing',
        method: 'post',
        data: data
    })
}
//可申请提前结清(新增的查询)
export function eNewlyAdded(data) {
    return request({
        url: '/earlyclearance/entry/newlyAdded',
        method: 'post',
        data: data
    })
}
//新增或保存
export function eAddEarlyclearance(data) {
    return request({
        url: '/earlyclearance/entry/addEarlyclearance',
        method: 'post',
        data: data
    })
}
// 试算
export function eTrial(data) {
    return request({
        url: 'earlyclearance/entry/trial',
        method: 'post',
        data: data
    })
}
// 详情
export function eEarlyclearanceDetails(data) {
    return request({
        url: 'earlyclearance/entry/earlyclearanceDetails',
        method: 'post',
        data: data
    })
}
// 提交回退取消
export function eEarlyclearanceOperation(data) {
    return request({
        url: 'earlyclearance/entry/earlyclearanceOperation',
        method: 'post',
        data: data
    })
}


//二期新增
// 对公流水删除
export function publicBatchDelete(data) {
    return request({
        url: 'refund/corporate/2/account/batchDelete',
        method: 'post',
        data: data
    })
}


//银行限额
export function bankLimit(data) {
    return request({
        url: '/bankLimit/list',
        method: 'post',
        data: data
    })
}
//银行限额
export function updateBankLimit(data) {
    return request({
        url: '/bankLimit/updateBankLimit',
        method: 'post',
        data: data
    })
}


//报表查看
//逾期列表
export function overdueList(data) {
    return request({
        url: '/carLoanReport/overdueList',
        method: 'post',
        data: data
    })
}

//展期操作
export function exSubmit(data) {
    return request({
        url: '/extendContract/exSubmit',
        method: 'post',
        data: data
    })
}