import {
  getSeller
} from '@/api/login'

const hxconst = {
  state: {
    globDictData: {
      "wealthPlatform": [{"value": "1", "label": "花虾"}, {"value": "2", "label": "线下平台"}, {
        "value": "3",
        "label": "信托"
      }, {"value": "5", "label": "聚财猫"}, {"value": "7", "label": "平安存管"}],
      "assignStatus": [{"value": "0", "label": "未分配"}, {"value": "1", "label": "已分配"}],
      "isLockCase": [{"value": "0", "label": "未保案"}, {"value": "1002", "label": "已保案"}],
      "yesOrNo": [{"value": "1", "label": "是"}, {"value": "0", "label": "否"}],
      // 全部选项
      "allSelectOption": {
        "value": "99999",
        "label": "全部"
      },
      /*大小符号*/
      "sizeSymbol": [
        {"value": "<", "label": "<"},
        {"value": "<=", "label": "<="},
        {"value": "=", "label": "="},
        {"value": ">", "label": ">"},
        {"value": ">=", "label": ">="},
      ],
      /*审核状态*/
      "auditStatus": [
        {"value": "0", "label": "初始"},
        {"value": "1", "label": "申请"},
        {"value": "2", "label": "通过"},
        {"value": "3", "label": "拒绝"},
        {"value": "4", "label": "回退"},
      ],
      /*审批状态*/
      "ApprovalStatus": [
        {"value": "1", "label": "等审核"},
        {"value": "2", "label": "已通过"},
        {"value": "3", "label": "已拒绝"},
        {"value": "4", "label": "已回退"},
      ],
      /*公告状态*/
      "noticeStatus": [
        {"value": "1", "label": "草稿"},
        {"value": "2", "label": "发布"},
        {"value": "3", "label": "下架"},
      ],
      /*申请类型*/
      "applyStatus": [
        {"value": "1", "label": "费用减免"},
        {"value": "2", "label": "申请拖车"},
        {"value": "3", "label": "申请取消拖车"},
        {"value": "4", "label": "申请车辆赎回"},
        {"value": "5", "label": "处理价格调整"},
      ],
      /*原因组名称*/
      "reasonGroup": [
        {"value": "1", "label": "费用减免"},
        {"value": "2", "label": "申请拖车"},
        {"value": "3", "label": "申请取消拖车"},
        {"value": "4", "label": "申请车辆赎回"},
        {"value": "5", "label": "处理价格调整"},
        {"value": "6", "label": "强制入催"},
      ],
      /*分配状态*/
      "allotStatus": [
        {"value": "0", "label": "待分配"},
        {"value": "1", "label": "已分配"},
      ],
      submitTo: [
        {"value": "0", "label": " 委外"},
        {"value": "1", "label": "拖车员"},
      ],
      /*分案方式*/
      "divisionWay": [
        {"value": "0", "label": "手动分案"},
        {"value": "1", "label": "自动分案"},
      ],
      /*分案类型*/
      "divisionType": [
        {"value": "normal_balance", "label": "剩余本金"},
        {"value": "overdue_amount", "label": "逾期总额"},
        {"value": "addup_amount", "label": "累计总额"},
      ],
      /*商户类型*/
      "merchantType": [
        {"value": "1", "label": "消金绿通"},
        {"value": "0", "label": "消金正常"},
      ],
      /*渠道*/
      "channel": [
        {"value": "CX001", "label": "速贷"},
        {"value": "CX002", "label": "花财"},
        {"value": "CX003", "label": "摩尔龙"},
      ],
      /*适用阶段---信贷*/
      "creditSuitStage": [
        {"value": "M1", "label": "C-M1"},
        {"value": "M2", "label": "M1-M2"},
        {"value": "M3", "label": "M2-M3"},
        {"value": "M4", "label": "M3-M4"},
        {"value": "M5", "label": "M4-M5"},
        {"value": "M6", "label": "M5-M6"},
        {"value": "M7", "label": "M6-M7"},
        {"value": "M8", "label": "M7-M8"},
        {"value": "RepaymentRemind", "label": "还款提醒"},
      ],
      /*适用阶段---车贷*/
      "carSuitStage": [
        {"value": "S1", "label": "S1"},
        {"value": "S2", "label": "S2"},
        {"value": "CM2", "label": "CM2"},
        {"value": "CM3", "label": "CM3"},
        {"value": "CM4", "label": "CM4"},
        {"value": "RepaymentRemind", "label": "还款提醒"},
      ],
      /*信贷逾期天数*/
      creditOverdue: {
        M1: {startNum: 1, endNum: 29},
        M2: {startNum: 30, endNum: 59},
        M3: {startNum: 60, endNum: 89},
        M4: {startNum: 90, endNum: 119},
        M5: {startNum: 120, endNum: 149},
        M6: {startNum: 150, endNum: 179},
        M7: {startNum: 180, endNum: 209},
        M8: {startNum: 210, endNum: 289},
      },
      /*车贷逾期天数*/
      carOverdue: {
        S1: {startNum: 1, endNum: 5},
        S2: {startNum: 6, endNum: 30},
        CM2: {startNum: 31, endNum: 60},
        CM3: {startNum: 61, endNum: 90},
        CM4: {startNum: 90, endNum: 10000},
      },
      /*法务处理阶段*/
      legalProcessStage: [
        {"value": "1", "label": "资料准备"},
        {"value": "2", "label": "开庭"},
        {"value": "3", "label": "结案"},
        {"value": "4", "label": "撤案"},
        {"value": "5", "label": "强制执行"},
      ],
      /*风险等级*/
      "riskGrade": [
        {"value": "L", "label": "低风险"},
        {"value": "M", "label": "中风险"},
        {"value": "H", "label": "高风险"},
      ],
      /*拖车状态*/
      trailCarStatus: [
        {"value": "1", "label": "拖车申请通过"},
        {"value": "2", "label": "拖车成功"},
        {"value": "3", "label": "拖车失败"},
        {"value": "4", "label": "总部评估价确认"},
        {"value": "5", "label": "车辆处理价确认"},
        {"value": "6", "label": "车辆处理成功"},
        {"value": "7", "label": "拖车赎回中"},
        {"value": "8", "label": "拖车赎回成功"},
      ],
      /*行动描述*/
      "actionDescription": [
        {"value": "01", "label": "电话声称已还款"},
        {"value": "02", "label": "约定再联系"},
        {"value": "03", "label": "承诺还款"},
        {"value": "04", "label": "食言"},
        {"value": "05", "label": "无诚意还款"},
        {"value": "06", "label": "电话号码空号"},
        {"value": "07", "label": "电话号码停机"},
        {"value": "08", "label": "电话无人接听"},
        {"value": "09", "label": "查无此人"},
        {"value": "10", "label": "已离开公司"},
        {"value": "11", "label": "怀疑欺诈"},
        {"value": "12", "label": "卡人死亡"},
        {"value": "13", "label": "留言转告"},
      ],
      //产品线
      "businessCategory": [
        {"value": "2001", "label": "P2P产品"},
        {"value": "2003", "label": "消费分期"},
        {"value": "2004", "label": "车贷类产品"},
        {"value": "2005", "label": "纯线类产品"},
      ],
      //产品类型2001
      "businessType2001": [
        {"value": "A001", "label": "精英汇", "parent": "2001"},
        {"value": "A310", "label": "保无忧", "parent": "2001"},
        {"value": "A309", "label": "华优房", "parent": "2001"},
        {"value": "A308", "label": "公社帮", "parent": "2001"},
        {"value": "A307", "label": "群英汇", "parent": "2001"},
        {"value": "A301", "label": "华薪派", "parent": "2001"},
        {"value": "A018", "label": "华优保", "parent": "2001"},
        {"value": "A017", "label": "公积菁", "parent": "2001"},
        {"value": "A016", "label": "华楼宝", "parent": "2001"},
        {"value": "A002", "label": "华楼通", "parent": "2001"},
        {"value": "A003", "label": "社保族", "parent": "2001"},
        {"value": "A004", "label": "保单乐", "parent": "2001"},
        {"value": "A005", "label": "车主帮", "parent": "2001"},
        {"value": "A010", "label": "核算产品", "parent": "2001"},
      ],
      "businessType2003": [
        {"value": "A3001", "label": "消费金融产品", "parent": "2003"},
        {"value": "C103", "label": "混合资金成本", "parent": "2003"},
        {"value": "C102", "label": "花虾资金成本", "parent": "2003"},
      ],
      "businessType2004": [
        {"value": "D006", "label": "分期9期-1.88", "parent": "2004"},
        {"value": "D007", "label": "分期12期-1.68", "parent": "2004"},
        {"value": "D008", "label": "分期18期-1.48", "parent": "2004"},
        {"value": "D009", "label": "分期24期-1.48", "parent": "2004"},
        {"value": "D010", "label": "分期36期-1.38", "parent": "2004"},
        {"value": "D011", "label": "渠道分期12期-1.28", "parent": "2004"},
        {"value": "D012", "label": "渠道分期18期-1.28", "parent": "2004"},
        {"value": "D013", "label": "渠道分期24期-1.18", "parent": "2004"},
        {"value": "D005", "label": "分期6期-1.88", "parent": "2004"},
        {"value": "D004", "label": "移交3期-1.9", "parent": "2004"},
        {"value": "D014", "label": "渠道分期36期-1.18", "parent": "2004"},
        {"value": "D003", "label": "GPS3期-2.48", "parent": "2004"},
      ],

      "businessType2005": [
        {"value": "C104", "label": "测试", "parent": "2005"},
        {"value": "A343", "label": "花财-保单贷", "parent": "2005"},
        {"value": "A342", "label": "花财-账单贷", "parent": "2005"},
        {"value": "A334", "label": "借吧-账单贷", "parent": "2005"},
        {"value": "A333", "label": "借吧-公积金贷", "parent": "2005"},
        {"value": "A306", "label": "花财-公积金贷", "parent": "2005"},
        {"value": "A335", "label": "摩尔贷", "parent": "2005"},
      ],
      // 行动类型(行动代码配置)
      actionType4ActionCodeConf: [
        {"value": "1", "label": "联系到本人"},
        {"value": "2", "label": "无法联系"},
        {"value": "3", "label": "联系到第三方"},
      ],
      // 行动类型(原因配置)
      actionType4ReasonConf: [
        {"value": "1", "label": "拒绝"},
        {"value": "2", "label": "回退"},
        {"value": "3", "label": "申请"},
        {"value": "4", "label": "取消"},
      ],
      // 催收状态
      collectionStatus: [
        {"value": "01", "label": "首次入催"},
        {"value": "02", "label": "新进"},
        {"value": "03", "label": "有效联系"},
        {"value": "04", "label": "无效联系"},
        {"value": "05", "label": "联系到第三方"},
        {"value": "06", "label": "外包"},
        {"value": "07", "label": "法务"},
        {"value": "08", "label": "无人接听"},
      ],
    },
    searchSetting: {
      pageHelpers: {
        pageSizes: [2, 4, 6, 8], // 每页条数下拉选项
        pageSize: 10, // 每页条数
        totalSum: 0, // 表格数据总数
        currentPage: 1 // 默认当前页
      },
      defaultParam: {
       // nodeId: "collection", // 催收信息列表
        // userId: getToken(),
        pageNum: 1,
        pageSize: 10
      },
    },
    regx: {
      decimal: /^\d{1,8}(\.\d{1,2})?$/,
      number: /^[1-9]\d{0,4}$/
    },
    aa: {},
    BaseInfo: {
      'totalButtons': 8,
      'tabButtons': 2,
      'formTitle': '个人基本信息',
      'titleButtons': [
        {'key': '01', 'label': '实时划扣'},
        {'key': '02', 'label': '费用减免'},
        {'key': '03', 'label': '结清试算'},
        {'key': '04', 'label': '取消保案'},
        {'key': '05', 'label': '短信'},
        {'key': '06', 'label': '影像'},
        {'key': '07', 'label': '进件资料'},
        {'key': '08', 'label': '外访登记'}

      ],
      'urls': 'this.$store.state.tabdatas.carBaseInfo',
      'actButton': []
    },
    // 重要信息
    collectionoperateList: {
      "majorInfoVo": {
        "isAnchor": true,
        "type": "commonform",
        "formTitle": "重要信息",
        "titleButtons": [],
        "fields": [{
          "model": "certNo",
          "orderNum": 1,
          "type": "text",
          "colSpan": 8,
          "disabled": false,
          "label": "身份证号码"
        },
          {
            "model": "OverdueCount",
            "orderNum": 2,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "尚余期数"
          },
          {
            "model": "FineinteBalance",
            "orderNum": 3,
            "type": "text",
            "colSpan": 8,
            "disabled": false,

            "label": "罚息总额"
          },
          {
            "model": "productname",
            "orderNum": 4,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "产品名称"
          },
          {
            "model": "Balance",
            "orderNum": 5,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "剩余本金"

          },
          {
            "model": "DailyFineInteBalance",
            "orderNum": 6,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "今日罚息",

          },
          {
            "model": "SerialNo",
            "orderNum": 7,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "合同编号"

          },
          {
            "model": "OverDueDate",
            "orderNum": 8,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "逾期日期"
          },
          {
            "model": "hjadress",
            "orderNum": 9,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "户籍地址"
          },
          {
            "model": "PutoutDate",
            "orderNum": 10,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "放款日期"
          },
          {
            "model": "OverdueDays",
            "orderNum": 11,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "逾期天数"
          },
          {
            "model": "familyadress",
            "orderNum": 12,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "家庭地址"
          },
          {
            "model": "HandSUM",
            "orderNum": 13,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "到账金额"
          },
          {
            "model": "OverdueSeq",
            "orderNum": 14,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "逾期期数"
          },
          {
            "model": "workcrop",
            "orderNum": 15,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "公司名称"
          },
          {
            "model": "LoanTerm",
            "orderNum": 16,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "总期数"
          }, {
            "model": "OverdueBalance",
            "orderNum": 17,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "逾期总额"
          }, {
            "model": "workadd",
            "orderNum": 18,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "公司地址"
          }, {
            "model": "GenusStoreN",
            "orderNum": 19,
            "type": "text",
            "colSpan": 8,
            "disabled": false,
            "label": "所属门店"
          }
        ]
      }

    },
    collectionDataTest: {
      "majorInfoVo": {
        "OverdueCount": 0,//逾期次数
        "productname": "",//产品名称
        "FineinteBalance": "",//罚息总额
        "Balance": "",//罚息
        "DailyFineInteBalance": "",//今日罚息
        "SerialNo": "",//合共编号
        "OverDueDate": "",//逾期日期
        "hjadress": "",
        "PutoutDate": "",//放款日期
        "certNo": "",//证件号码
        "OverdueDays": null,//逾期天数
        "familyadress": "",
        "HandSUM": "",//到账金额
        "LoanTerm": "",//逾期期数
        "workcrop": "",//公司名称
        "workadd": 0,//公司地址
        "OverdueBalance": "",//逾期总额
        "GenusStoreN": ""
      }
    },
    getters: {
      sellers: function (state) {
        getSeller().then(response => {
          const data = response.data
          console.log(data.data);
          state.aa = data.data;
          return state.aa;
        }).catch(error => {

        });
      }
    }
  }
}
export default hxconst
