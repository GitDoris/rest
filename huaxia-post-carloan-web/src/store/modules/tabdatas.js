
import { getSeller} from '@/api/login'
import { getToken } from '@/utils/auth'
const hxconst = {
  state: {
    BaseInfo :{
      'totalButtons':3,
      'tabButtons':2,
      'formTitle': '个人基本信息',
      'tabButtons': [{ 'key': 'carBaseInfo', 'label': '车贷个人基本信息', 'context':'s'}, { 'key': 'p2pBaseInfo',  'label': '信贷个人基本信息', 'context':'s'}],
      'titleButtons': [{ 'key': '01', 'label': '车辆情况' },{ 'key': '02', 'label': '贷款情况' },{ 'key': '03', 'label': '评估报告' }],
      'urls':'this.$store.state.tabdatas.p2pBaseInfo',
      'actButton': []
    },
    carBaseInfo :{
      'type': 'commonform',
      'formName': 'hx_baseInfo_car',
      'formTitle': '车贷个人基本信息',
      'urls':'this.$store.state.tabdatas.carBaseInfo',
      'titleButtons': [],
      'actButton': [],
      'fields': [
        {
          'keyName': 'name',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 1,
          'type': 'text',
          'required': true,
          'lable': '客户姓名',
          'value': '王石'
        },
        {
          'keyName': 'idNumber',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 2,
          'type': 'text',
          'required': true,
          'lable': '证件号码',
          'value': '341233198710109203'
        },
        {
          'keyName': 'phoneNumer',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 3,
          'type': 'text',
          'required': false,
          'lable': '手机号',
          'ischange': false,
          'value': '13218293849'
        }, {
          'keyName': 'sexCode',
          'colSpan': 8,
          'orderNum': 4,
          'type': 'select',
          'disabled': true,
          'lable': '性别',
          'value': '01'
        }, {
          'keyName': 'age',
          'colSpan': 4,
          'orderNum': 5,
          'type': 'text',
          'disabled': true,
          'lable': '年龄',
          'value': 24
        }, {
          'keyName': 'education',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 6,
          'type': 'select',

          'lable': '最高学历',
          'value': '01'
        }, {
          'keyName': 'marryStatus',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 7,
          'type': 'select',
          'lable': '婚姻状况',
          'value': '02'
        }, {
          'keyName': 'childNumber',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 8,
          'type': 'select',
          'lable': '子女数目',
          'value': '02'
        }, {
          'keyName': 'support',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 9,
          'type': 'select',
          'lable': '供养人数',
          'value': '02'
        }, {
          'keyName': 'familyOut',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 10,
          'type': 'text',
          'lable': '每月家庭支出',
          'value': '5,000.00'
        }, {
          'keyName': 'sameLiveAddr',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 11,
          'type': 'select',

          'lable': '居住地址是否与户籍地一致',
          'value': '01'

        }, {
          'keyName': 'zhimafen',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 12,
          'type': 'text',
          'lable': '芝麻信用评分',
          'value': 655
        }, {
          'keyName': 'weixin',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 13,
          'type': 'text',
          'lable': '微信账号',
          'value': '288888888'
        }, {
          'keyName': 'applyPay',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 14,
          'type': 'text',
          'lable': '支付宝账号',
          'value': '18929379137'
        }, {
          'keyName': 'liveTime',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 16,
          'type': 'datetime',
          'lable': '现住地居住时间',
          'value': '1985-01-01'
        }, {
          'keyName': 'cityTime',
          'colSpan': 7,
          'disabled': false,
          'orderNum': 17,
          'type': 'datetime',
          'lable': '现住地居住时间',
          'value': '1985-01-01'
        }, {
          'keyName': 'address',
          'colSpan': 8,
          'disabled': false,
          'orderNum': 15,
          'type': 'area',
          'lable': '现居住地址',
          'value': ''
        }
      ]
    },
    p2pBaseInfo : {
      'type': 'commonform',
      'formName': 'hx_baseInfo_car',
      'urls':'this.$store.state.tabdatas.p2pBaseInfo',
      'formTitle': '信贷个人基本信息',
      'titleButtons': [],
      'actButton': [],
      'fields': [
        {
          'keyName': 'name',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 1,
          'type': 'text',
          'required': true,
          'lable': '客户姓名',
          'value': '王石'
        },
        {
          'keyName': 'idNumber',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 2,
          'type': 'text',
          'required': true,
          'lable': '证件号码',
          'value': '341233198710109203'
        },
        {
          'keyName': 'phoneNumer',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 3,
          'type': 'text',
          'required': true,
          'lable': '手机号',
          'ischange': false,
          'value': '13218293849'
        }, {
          'keyName': 'sexCode',
          'colSpan': 4,
          'orderNum': 4,
          'type': 'select',
          'disabled': true,
          'lable': '性别',
          'value': '01'
        }, {
          'keyName': 'age',
          'colSpan': 4,
          'orderNum': 5,
          'type': 'text',
          'disabled': true,
          'lable': '年龄',
          'value': 24
        }, {
          'keyName': 'education',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 6,
          'type': 'select',

          'lable': '最高学历',
          'value': '01'
        }, {
          'keyName': 'marryStatus',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 7,
          'type': 'select',
          'lable': '婚姻状况',
          'value': '02'
        }, {
          'keyName': 'childNumber',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 8,
          'type': 'select',
          'lable': '子女数目',
          'value': '02'
        }, {
          'keyName': 'support',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 9,
          'type': 'select',
          'lable': '供养人数',
          'value': '02'
        }, {
          'keyName': 'familyOut',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 10,
          'type': 'text',
          'lable': '每月家庭支出',
          'value': '5,000.00'
        }, {
          'keyName': 'sameLiveAddr',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 11,
          'type': 'select',

          'lable': '居住地址是否与户籍地一致',
          'value': '01'

        }, {
          'keyName': 'zhimafen',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 12,
          'type': 'text',
          'lable': '芝麻信用评分',
          'value': 655
        }, {
          'keyName': 'weixin',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 13,
          'type': 'text',
          'lable': '微信账号',
          'value': '28938190478'
        }, {
          'keyName': 'applyPay',
          'colSpan': 4,
          'disabled': false,
          'orderNum': 14,
          'type': 'text',
          'lable': '支付宝账号',
          'value': '18929379137'
        }
      ]
    }
  },

  mutations: {

  },

  actions: {

  },
  getters :{
    sellers: function (state){
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

export default hxconst
