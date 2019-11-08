/* 拖车取消 */
export default {
  labelWidth: "6em",
  formCells: [
    {
      'column': 'mainReason',
      'lable': '主原因',
      'type': 'select',
      'options': [],
      'rules': [
        {required: true, message: '请选择主原因', trigger: 'blur'},
      ],
    },
    {
      'column': 'childReason',
      'lable': '子原因',
      'type': 'select',
      'options': [],
      'rules': [
        {required: true, message: '请选择子原因', trigger: 'blur'},
      ],
    },
    {
      'column': 'remark',
      'lable': '备注',
      'type': 'textarea',
      'rules': [
        {required: true, message: '请输入费用', trigger: 'blur'},
      ],
    },
  ]
}
