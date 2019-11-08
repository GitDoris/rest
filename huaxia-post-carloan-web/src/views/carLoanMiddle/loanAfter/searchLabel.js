/*车贷贷后财务信息搜索*/
import store from '@/store/index'

let globDictData = store.state.glabdatas.globDictData
export default [
  {'column': 'applyNo', 'type': 'equals', 'lable': '申请编号'},
  {'column': 'contractNo', 'type': 'equals', 'lable': '合同编号'},
  {'column': 'customerName', 'type': 'equals', 'lable': '客户姓名'},
  {'column': 'cardNo', 'type': 'equals', 'lable': '身份证号'},
/*  {
    'column': 'applyType',
    'type': 'select',
    'lable': '申请类型',
    'options': globDictData.applyStatus
  },
  {
    'column': 'auditStatus',
    'type': 'select',
    'lable': '审批状态',
    'options': globDictData.ApprovalStatus
  },
  {'column': 'applyUser', 'type': 'equals', 'lable': '申请人'},*/
]

