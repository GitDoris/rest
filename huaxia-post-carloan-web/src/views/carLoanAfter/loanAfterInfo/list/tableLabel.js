export default {

    /*交易明细*/
    messageFlowTable: [
        { 'code': 'dueBillSerialno', 'lable': '借据号' },
        { 'code': 'applyDate', 'lable': '交易日期' },
        { 'code': 'exchangeHour', 'lable': '记账日期' },
        { 'code': 'deductType', 'lable': '交易类型' },
        { 'code': 'actualAmount', 'lable': '交易金额', 'amountFormate': true },
        { 'code': 'inputUser', 'lable': '操作人' },
        { 'code': 'inputDate', 'lable': '操作日期' },
        { 'code': 'tradeResult', 'lable': '交易结果' },
    ],
    /*逾期明细*/
    overDueDetail: [
        { 'code': 'payDate', 'lable': '还款日' },
        { 'code': 'seqid', 'lable': '期次' },
        { 'code': 'payPrincipal', 'lable': '本金', 'amountFormate': true },
        { 'code': 'payInterest', 'lable': '利息', 'amountFormate': true },
        { 'code': 'payFee', 'lable': '逾期违约金', 'amountFormate': true },
        { 'code': 'payFineAmt', 'lable': '罚息', 'amountFormate': true },
        { 'code': 'overdueDays', 'lable': '逾期天数' },
        { 'code': 'sumAmt', 'lable': '总额' },
    ],
    // 还款计划表
    actionTable: [
        { 'code': 'seqid', 'lable': '还款期次' },
        { 'code': 'payDate', 'lable': '还款日期' },
        { 'code': 'beginAmout', 'lable': '期初余额', 'amountFormate': true },
        { 'code': 'pmtAmount', 'lable': '月还款额', 'amountFormate': true },
        { 'code': 'payPrincipal', 'lable': '本金', 'amountFormate': true },
        { 'code': 'payInterest', 'lable': '利息', 'amountFormate': true },
        { 'code': 'finalAmout', 'lable': '期末余额', 'amountFormate': true },
        { 'code': 'prepAyment', 'lable': '提前还款金额', 'amountFormate': true },
    ],

}