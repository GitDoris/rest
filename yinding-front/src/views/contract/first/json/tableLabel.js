/* tableData */
export default [
  {'width':'180px','code': 'bzApplyNo', 'label': '进件编号'},
  {'width':'200px','code': 'assureBzCode', 'label': '担保业务编号'},
  {'width':'130px','code': 'contractNumber', 'label': '担保合同号码'},
  {'width':'130px','code': 'customerName', 'label': '被担保人名称'},
  {'width':'180px','code': 'certId', 'label': '被担保人证件号码'},
  {'width':'100px','code': 'putoutSum', 'label': '担保金额'},
  {'width':'150px','code': 'putoutDate', 'label': '担保起始日期'},
  {'width':'150px','code': 'maturityDate', 'label': '担保到期日期'},
  {'width':'150px','code': 'compensationRatio', 'label': '约定再担保补偿比例'},
  {'width':'100px','code': 'annualizedRates', 'label': '年化费率'},
  {'width':'150px','code': 'relieveDate', 'label': '担保责任解除日期'},
  {'width':'100px','code': 'inBalance', 'label': '在保余额'},
  {'width':'150px','code': 'balanceChangeDate', 'label': '余额变化日期'},
  {'width':'150px','code': 'batchTime', 'label': '系统跑批时间'},
  {'width':'120px','code': 'phaseNo', 'label': '上报状态'},
  {'width':'120px','code': 'creator', 'label': '操作人'},
  {'width':'150px','code': 'createdTime', 'label': '操作时间'},
  // {'code': 'updateUserId', 'label': '影像上传'},
  {
    'code': 'operateColumn', 'label': '影像上传',
    'btns': [
      {'name': '已上传', 'type': 'text', },
      {'name': '立即上传', 'type': 'text', 'operateType': 'upload'}
    ],
    'width': '140px'
  }
]
   