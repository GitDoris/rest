/* 查询条件 */
export default [
  {'column': 'businessNo', 'type': 'equals', 'lable': '合同编号','queryValue':''},
  {'column': 'customerName', 'type': 'equals', 'lable': '客户姓名','queryValue':''},
  // {
  //   'column': 'videoType',
  //   'type': 'select',
  //   'lable': '视频类型',
  //   'queryValue':'',
  //   'options': [
      
  //   ]
  // },
  {'column': 'videoCreator', 'type': 'equals', 'lable': '创建人','queryValue':''},
  { 'column': 'videoCreatedBeginTime', 'type': 'dateTimePicker', 'lable': '创建开始日期' ,'queryValue':''},
  {'column': 'videoCreatedEndTime', 'type': 'dateTimePicker', 'lable': '创建结束日期','queryValue':''},
]
