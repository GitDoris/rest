/*对公还款-对公录入-待处理-操作记录*/
export default {
	//操作记录
	operationList:[
	  {'code': 'operateTime', 'lable': '操作日期'},
	  {'code': 'applyPayAmount', 'lable': '申请还款金额','amountFormate':true},
	  {'code': 'applyPayDate', 'lable': '实际还款日'},
	  {'code': 'operator', 'lable': '操作人'},
	  {'code': 'operation', 'lable': '操作动作'},
	  {'code': 'remark', 'lable': '备注'}
	],
	//流水匹配
	matchWatcherList:[
	  {'code': 'transDate', 'lable': '交易日期'},
	  {'code': 'tranderName', 'lable': '交易方姓名'},
	  {'code': 'tranderAccount', 'lable': '交易方账号'},
	  {'code': 'transAmount', 'lable': '交易金额','amountFormate':true},
	  {'code': 'summary', 'lable': '摘要'},
	  {'code': 'remark', 'lable': '备注'},
	  {'code': 'transSerialNo', 'lable': '交易流水号'},
	  {'code': 'accoutType', 'lable': '对公账号姓名'},
	],
	//修改匹配
	modifyMatchList:[
	  {'code': 'transDate', 'lable': '交易日期'},
	  {'code': 'tranderName', 'lable': '交易方姓名'},
	  {'code': 'tranderAccount', 'lable': '交易方账号'},
	  {'code': 'transAmount', 'lable': '交易金额','amountFormate':true},
	  {'code': 'summary', 'lable': '摘要'},
	  {'code': 'remark', 'lable': '备注'},
	  {'code': 'transSerialNo', 'lable': '交易流水号'},
	],
}
