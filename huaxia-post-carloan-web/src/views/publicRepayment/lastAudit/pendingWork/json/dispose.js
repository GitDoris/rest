/* 拖车处理 */
export default {
  labelWidth: "10em",
  type: "1",
  title: "评估价处理",
  formCells: [
    {
      'column': 'futurePrice',
      'lable': '处理预估价',
      'type': 'equals',
      'rules': [
        {required: true, message: '请输入处理预估价', trigger: 'blur'},
      ],
    },
    {
      'column': 'trailerRegion',
      'lable': '实际拖车区域',
      'type': 'cascader',
      'rules': [
        {required: true, message: '请选择实际拖车区域', trigger: 'blur'},
      ],
    },
    {
      'column': 'trailerAddress',
      'lable': '实际拖车地址',
      'type': 'equals',
      'rules': [
        {required: true, message: '请输入实际拖车地址', trigger: 'blur'},
      ],
    },
    {
      'column': 'fee',
      'lable': '费用',
      'type': 'equals',
      'rules': [
        {required: true, message: '请输入费用', trigger: 'blur'},
      ],
    },
  ]
}
