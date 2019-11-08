/* 查询条件 */
export default [
  {'column': 'bzApplyNo', 'type': 'equals', 'label': '进件编号','queryValue':''},
  {'column': 'assureBzCode', 'type': 'equals', 'label': '担保业务编号','queryValue':''},
  {'column': 'batchTime', 'type': 'datePicker', 'label': '系统跑批时间','queryValue':''},
  {'column': 'customerName', 'type': 'equals', 'label': '姓名','queryValue':''},
  {'column': 'certId', 'type': 'equals', 'label': '证件号码','queryValue':''},
  {'column': 'workCorpName', 'type': 'select', 'label': '上报状态','queryValue':'',
    'options':[
      {'value':'1','label':'待审批'},
      {'value':'0','label':'123'},
    ]
  },
]
