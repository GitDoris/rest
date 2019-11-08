/*挂账撤销登记待处理任务*/
export default [
  {'code': 'contractId', 'lable': '合同编号', 'linked': true, "width": "220px"},
  {'code': 'userName', 'lable': '客户姓名'},
  {'code': 'idCard', 'lable': '身份证号'},
  // {'code': 'wealthPlatform', 'lable': '财富平台'},//财富平台(1：花虾；2：线下平台；3：信托；5：聚财猫；7：平安存管；8：线下御承)
  {'code': 'suspendBalance', 'lable': '已挂账金额','amountFormate':true},
  // {'code': 'exceedMoney', 'lable': '溢缴款','amountFormate':true},
  {'code': 'repealAmounts', 'lable': '挂账撤销金额','amountFormate':true},
  {'code': 'orgName', 'lable': '门店'},
  {'code': 'productName', 'lable': '产品名称'},
  {'code': 'applyUser', 'lable': '申请人'},
  {'code': 'applyDate', 'lable': '申请时间'},
  {'code': 'repealStatusShow', 'lable': '状态'},
]

  // {'code': 'realPayAmount', 'lable': '上次还款金额','amountFormate':true},
  // {'code': 'payAmount', 'lable': '上次应还金额','amountFormate':true},
  // {'code': 'actualPayDate', 'lable': '上次还款日期'},