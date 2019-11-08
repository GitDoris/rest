import glabdatas from './glabdatas'
let globDictData = glabdatas.state.globDictData
const hxconst = {
  state: {
    /* 进行资料 */
    applyInformation: [
      {'column': 'contractNo', 'lable': '常用手机号使用时间（月）', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerName', 'lable': '学历', 'fixed': 'left', 'width': '80px'},
      {'column': 'wealthPlatform', 'lable': '婚姻'},
      {'column': 'productTypeCode', 'lable': '户籍与居住城市是否一致'},
      {'column': 'repayDays', 'lable': '还款日', 'width': '120px'},
      {'column': 'Type', 'lable': '以还期数', 'width': '80px'},
      {'column': 'repayDate', 'lable': '逾期次数', 'width': '80px'},
      {'column': 'signCustomer', 'lable': '产品线', 'width': '80px'},
      {'column': 'overdueDays', 'lable': '最长逾期天数', 'width': '120px'},
      {'column': 'overdueBalance', 'lable': '签约客户', 'width': '80px'},
      {'column': 'overdueTerm', 'lable': '上一次催收员', 'width': '80px'},
      {'column': 'alreadyPayTerm', 'lable': '分配状态', 'width': '80px'}],
    /*电话催收*/
    CollectionPhone: [
      {'column': 'applyNo', 'lable': '进行编号', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerName', 'lable': '客户姓名', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerCardNo', 'lable': '身份证号', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerMobile', 'lable': '手机号码', 'fixed': 'left', 'width': '80px'},
      {'column': 'contractNo', 'lable': '合同编号', 'fixed': 'left', 'width': '80px'},
      {'column': 'businessCategory', 'type': 'select', 'lable': '产品线', 'options': []},
      {'column': 'businessType', 'type': 'select', 'lable': '产品类型', 'options': []},
      {'column': 'wealthPlatform', 'type': 'select', 'lable': '财富平台', 'options': globDictData.wealthPlatform},
      {
        'lable': '还款日',
        'children': [
          {
            'column': 'repayDateCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'repayDate',
            'lable': '还款日',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '已还期数',
        'children': [
          {
            'column': 'alreadyPayTermCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'alreadyPayTerm',
            'lable': '已还期数',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '逾期次数',
        'children': [
          {
            'column': 'overdueSumCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueSum',
            'lable': '逾期次数',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '逾期天数',
        'children': [
          {
            'column': 'overdueDaysCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueDays',
            'lable': '逾期天数',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '最长逾期天数',
        'children': [
          {
            'column': 'overdueDaysCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueDays',
            'lable': '最长逾期天数',
            'type': 'equals',
          },
        ]
      },
      {'column': 'signCustomer', 'type': 'select', 'lable': '签约客服', 'options': []},
      {'column': 'followUpUser', 'type': 'select', 'lable': '上一次催收员', 'options': []},
      {'column': 'overdueBalance', 'lable': '逾期金额', 'width': '80px'},
      {'column': 'queueNo', 'type': 'select', 'lable': '所属队列', 'options': []},
      {
        'column': 'isLockCase',
        'type': 'select',
        'lable': '保案状态',
        'options': globDictData.yesOrNo
      },
      {'column': 'inputRegion', 'type': 'select', 'lable': '所属分部', 'options': []},
      {'column': 'inputOrgid', 'type': 'select', 'lable': '所属门店', 'options': []},
      {'column': 'userName', 'type': 'select', 'lable': '催收员', 'options': []},
      {'column': 'actionCode', 'type': 'select', 'lable': '行动代码', 'options': []},
      {
        'lable': '剩余本金',
        'children': [
          {
            'column': 'normalBalanceCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'normalBalance',
            'lable': '剩余本金',
            'type': 'equals',
          },
        ]
      }],
    /* 还款提醒-拨打电话 */
    CallPhone: [
      {'column': 'contractNo', 'lable': '合同编号', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerName', 'lable': '客户姓名', 'fixed': 'left', 'width': '80px'},
      {'column': 'wealthPlatform', 'type': 'select', 'lable': '财富平台', 'options': globDictData.wealthPlatform},
      {'column': 'businessCategory', 'type': 'select', 'lable': '产品线', 'options': []},
      {'column': 'businessType', 'type': 'select',  'lable': '产品类型', 'options': []},
      {
        'lable': '还款日',
        'children': [
          {
            'column': 'repayDateCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'repayDate',
            'lable': '还款日',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '已还期数',
        'children': [
          {
            'column': 'alreadyPayTermCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'alreadyPayTerm',
            'lable': '已还期数',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '逾期次数',
        'children': [
          {
            'column': 'overdueSumCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueSum',
            'lable': '逾期次数',
            'type': 'equals',
          },
        ]
      },
      {
        'lable': '最长逾期天数',
        'children': [
          {
            'column': 'overdueDaysCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueDays',
            'lable': '最长逾期天数',
            'type': 'equals',
          },
        ]
      },
      {'column': 'signCustomer', 'type': 'select', 'lable': '签约客服', 'options': []},
      {'column': 'followUpUser', 'type': 'select',  'lable': '上一次催收员', 'options': []},
      {
        'column': 'assignStatus',
        'type': 'select',
        'lable': '分配状态',
        'options': globDictData.allotStatus
      }],
    /* C-M1 */
    CMOne: [
      {'column': 'contractNo', 'lable': '合同编号', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerName', 'lable': '客户姓名', 'fixed': 'left', 'width': '80px'},
      {'column': 'wealthPlatform', 'type': 'select',  'lable': '财富平台'},
      {'column': 'normalBalance', 'lable': '产品线', 'width': '80px'},
      {
        'column': 'productTypeCode',
        'type': 'select',
        'lable': '产品类型',
        'width': '80px'
      },
      {'column': 'overdueDays', 'lable': '所属队列', 'width': '120px'},
      {'column': 'Type', 'lable': '保案状态', 'width': '80px'},
      {'column': 'repayDate', 'lable': '所属门店', 'width': '80px'},
      {'column': 'signCustomer', 'lable': '催收员', 'width': '80px'},
      {'column': 'followUpUser', 'lable': '上一次催收员', 'width': '120px'},
      {'column': 'followUpComment', 'lable': '行动代码', 'width': '80px'},
      {'column': 'wealthPlatform', 'lable': '还款日', 'width': '80px'},
      {'column': 'productCategoryCode', 'lable': '剩余本金', 'width': '80px'},
      {'column': 'NumberData', 'type': 'select', 'lable': '逾期天数', 'width': '80px'},
      {'column': 'overdueDays', 'lable': '最长逾期天数', 'width': '120px'},
      {'column': 'overdueBalance', 'lable': '逾期金额', 'width': '80px'},
      {'column': 'overdueTerm', 'lable': '逾期期数', 'width': '80px'},
      {'column': 'alreadyPayTerm', 'lable': '已还期数', 'width': '80px'}],
    /* 通讯录 */
    telecominfo: [
      {'column': 'mobile', 'type': 'equals', 'lable': '电话'},
      {'column': 'customerName', 'type': 'equals', 'lable': '客户姓名'}
    ],
    /*委外催收*/
    collectionoutsideTable: [
      {'column': 'contractNo', 'lable': '合同编号', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerName', 'lable': '客户姓名', 'fixed': 'left', 'width': '80px'},
      {'column': 'customercardNo', 'lable': '身份证号'},
      {'column': 'submitOrganName', 'lable': '委外公司'},
      {'column': 'submitOrganTime', 'lable': '委外时间', 'type': 'dateTimePicker',},
      {'column': 'businessCategory', 'type': 'select', 'lable': '产品线', 'options': []},
      {'column': 'businessType', 'type': 'select', 'lable': '产品类型', 'options': []},
      {
        'lable': '逾期天数',
        'children': [
          {
            'column': 'overdueSumCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueDays',
            'lable': '逾期天数',
            'type': 'equals',
          },
        ]
      },
    ],
    /*法务催收*/
    collectionforensicTable: [
      {'column': 'contractNo', 'lable': '合同编号', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerName', 'lable': '客户姓名', 'fixed': 'left', 'width': '80px'},
      {'column': 'customerMobile', 'lable': '手机号码'},
      {
        'column': 'wealthPlatform',
        'type': 'select',
        'lable': '财富平台',
        'options': globDictData.wealthPlatform
      },
      {'column': 'businessCategory', 'type': 'select', 'lable': '产品线', 'options': []},
      {'column': 'businessType', 'type': 'select', 'lable': '产品类型', 'options': []},
      {
        'lable': '逾期天数',
        'children': [
          {
            'column': 'overdueSumCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'overdueDays',
            'lable': '逾期天数',
            'type': 'equals',
          },
        ]
      },
      {'column': 'overdueBalanceCondition', 'lable': '逾期金额'},
      {
        'lable': '还款日',
        'children': [
          {
            'column': 'repayDateCondition',
            'lable': '请选择',
            'type': 'select',
            'options': globDictData.sizeSymbol
          },
          {
            'column': 'repayDate',
            'lable': '还款日',
            'type': 'equals',
          },
        ]
      },
    ],

    /*催收操作行动流水*/
    actionTable: [
      {'column': 'phoneNumber', 'lable': '电话号码'},
      {'column': 'productTypeCode', 'type': 'select', 'lable': '催收状态'}
    ],
    /*队列参数*/
    queueParams: [
      {'column': 'queueNo', 'lable': '所属队列', 'type': 'select'},
      {'column': 'policyNo', 'lable': '策略编号', 'type': 'select'},
      {'column': 'policyName', 'lable': '策略名称', 'type': 'select'},
    ]
  }
}
export default hxconst
