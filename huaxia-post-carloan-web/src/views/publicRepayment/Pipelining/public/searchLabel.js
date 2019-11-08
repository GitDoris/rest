/*车贷贷后对公还款列表*/

export default [
    { 'column': 'transSerialNo', 'type': 'equals', 'lable': '交易流水号' },
    { 'column': 'importDate', 'type': 'daterange', 'lable': '导入日期' },
    { 'column': 'transDate', 'type': 'daterange', 'lable': '交易日期' },
    { 'column': 'transAmount', 'type': 'equals', 'lable': '交易金额' },
    { 'column': 'tranderName', 'type': 'equals', 'lable': '交易方姓名' },
    { 'column': 'tranderAccount', 'type': 'equals', 'lable': '交易方账号' },
    {
        'column': 'isMatched',
        'type': 'select',
        'lable': '是否已匹配',
        'options': [
            { "value": "1", "label": "已匹配" },
            { "value": "0", "label": "未匹配" },
        ]
    },
    { 'column': 'summary', 'type': 'equals', 'lable': '摘要' },
    { 'column': 'remark', 'type': 'equals', 'lable': '备注' },

]