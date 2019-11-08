/*案件分配*/
import store from '@/store/index'

let globDictData = store.state.glabdatas.globDictData
export default [
  {'column': 'trailerNo', 'type': 'equals', 'lable': '拖车编号'},
  {'column': 'contractNo', 'type': 'equals', 'lable': '合同编号'},
  {'column': 'customerName', 'type': 'equals', 'lable': '客户姓名'},
  {'column': 'customerMobile', 'type': 'equals', 'lable': '手机号'},
  {
    'column': 'assignStatus',
    'type': 'select',
    'lable': '处理状态',
    'options': globDictData.trailCarStatus
  },
  {
    'column': 'trailerPeople',
    'type': 'select',
    'lable': '拖车员',
    'options': []
  },
  {
    'lable': '拖车期限',
    'children': [
      {
        'column': 'trailerDeadlineCondition',
        'lable': '请选择',
        'type': 'select',
        'options': globDictData.sizeSymbol
      },
      {
        'column': 'trailerDeadline',
        'lable': '拖车期限',
        'type': 'equals',
      },
    ]
  },
]

