const hxconst = {
  state: {
    
    /* 交易明细 */
    surveyDistributionLables: [{
      'code': 'loanserialno', 'lable': '借据号'
    }, {
      'code': 'tradeDate', 'lable': '交易日期'
    }, {
      'code': 'chargeDate', 'lable': '记账日期'
    }, {
      'code': 'tradeType', 'lable': '交易类型'
    }, {
      'code': 'tradeAmount', 'lable': '交易金额'
    }, {
      'code': 'operatePerson', 'lable': '操作人'
    }, {
      'code': 'operateTime', 'lable': '操作日期'
    }],


    /*财务列表还款计划表*/
    actionTable: [
      {'code': 'seqid', 'lable': '还款期次'},
      {'code': 'payDate', 'lable': '还款日期'},
      {'code': 'beginAmout', 'lable': '期初余额'},
      {'code': 'pmtAmount', 'lable': '月还款额'},
      {'code': 'payPrincipal', 'lable': '本金'},
      {'code': 'payInterest', 'lable': '利息'},
      {'code': 'finalAmout', 'lable': '期末余额'},
      {'code': 'prepAyment', 'lable': '提前还款金额'},
      // {
      //   'code': 'remark', 'lable': '备注', 'width': "130px",
      //   'btns': [
      //     {'name': '备注', 'type': 'text', 'operateType': 'remarkDetail'}
      //   ]
      // },
      // {
      //   'code': 'operateColumn', 'lable': '录音',
      //   'btns': [
      //     {'name': '播放', 'type': 'text', 'operateType': 'play'},
      //     {'name': '暂停', 'type': 'text', 'operateType': 'pause'},
      //     {'name': '停止', 'type': 'text', 'operateType': 'stop'},
      //   ], 'width': '180px'
      // }
    ],
    /*承诺历史*/
    commitmentHistoryTable: [
      {'code': 'actionCode', 'lable': '行动代码'},
      {'code': 'contractNo', 'lable': '合同编号'},
      {'code': 'promiseRepayDay', 'lable': '承诺还款时间'},
      {'code': 'promiseRepayAmount', 'lable': '承诺还款金额'},
      {'code': 'realpromiseRepayDay', 'lable': '实际还款时间'},
      {'code': 'realRepayAmount', 'lable': '实际还款金额'}
    ],
    /*短信流水*/
    messageFlowTable: [
      {'code': 'sendTime', 'lable': '发送时间'},
      {'code': 'phoneNumber', 'lable': '发送号码'},
      {'code': 'relSerialNo', 'lable': '短信名称'},
      {'code': 'sendContent', 'lable': '发送内容'},
      {'code': 'sendStatus', 'lable': '发送结果'},
      {'code': 'updateUser', 'lable': '操作人'}
    ],



  

  

  }
}
export default hxconst
