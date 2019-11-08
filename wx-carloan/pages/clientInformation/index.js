// pages/list/index.js
const app = getApp()
import WxValidate from '../../utils/WxValidate';

import { reso } from '../../utils/configRequest.js'
Page({
  data: {
    // 个人信息
    personageInfoJson:{
      phoneNo:'',
      education:'',
      educationCode: '',
      marriage:'',
      marriageCode: '',
      childrenCount:'',
      childrenCountCode: '',
      provideCount:'',
      provideCountCode: '',
      expenditure: '',
      province: '',
      provinceCode: '',
      city: '',
      cityCode: '',
      county: '',
      countyCode: '',
      detailSite: '',
      placeAndCensus: '',
      placeAndCensusCode: '',
      nowProvince: '',
      nowProvinceCode: '',
      nowCity: '',
      nowCityCode: '',
      nowCounty: '',
      nowCountyCode: '',
      nowDetailSite: '',
      nowDwellDate: '',
      comeCityDate: '',
      standbyPhoneNo: '',
      residencePhone: '',
      sesameCredit: '',
      alipayAccount: '',
    },
    currentTab: 0,
    educationList: [],
    marriageList: [],
    childrenList: [],
    provideList: [],
    placeAndRegisterList: [],
    hireType: '',
    hireTypeList: [],
    unitNature: '',
    unitNatureList: [],
    industry: '',
    industryList: [],
    security: '',
    securityList: [],
    entryTime: '',
    borrowMoney: '',
    borrowMoneyList: [],
    kinsfolk: '',
    kinsfolkList: [],
    borrowMoney1: '',
    borrowMoneyList1: [],
    borrowMoney2: '',
    borrowMoneyList2: [],
    otherRelation: '',
    otherRelationList: [],
    borrowMoney3: '',
    borrowMoneyList3: [],
    placeValue:'',
    //户口所在地
    region: '',
    zone: '',
    nowRegion: '',
    nowZone: '',
    workPlaceRegion: '',
    workPlaceZone: '',
    regionCheck: false,
    //地区选择
    addressShow: false,
    animationAddress: {},
    proShow: false,
    //热门地区
    hotCityList: [],
    //全部地区
    allAddressList: [],
    cityShow: false,
    proName: '',
    proCode:'',
    nowProName: '',
    nowProCode: '',
    workPlaceProName: '',
    workPlaceProCode: '',
    cityList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.initValidate();
    // 获取客户信息
    reso({ 'businessNo': 'H015201811290011' }, 'client-info/gain-client-info').then(
      function (data) {
        if (data.code == '0000') {
          console.log('data',data.data)
        }
        else {
          $Toast({
            content: data.message,
            type: 'error'
          });
        }
      }
    ).catch(function (reason) {
      // console.log(reason);
    });
    let resData = { token: app.globalData.token, clientId: app.globalData.clientId }
    // 获取客户信息选项列表
    reso(resData, 'client-info/gain-client-option').then(
      function (data) {
        let resData = data.data;
        console.log(data.data)
        that.setData({
          educationList: resData.educationList,
          marriageList: resData.marriageList,
          childrenList: resData.childrenList,
          provideList: resData.provideList,
          placeAndRegisterList: resData.placeAndRegisterList,
          hireTypeList: resData.hireTypeList,
          unitNatureList: resData.unitNatureList,
          industryList: resData.industryList,
          securityList: resData.securityList,
          borrowMoneyList: resData.borrowMoneyList,
          borrowMoneyList1: resData.borrowMoneyList,
          borrowMoneyList2: resData.borrowMoneyList,
          kinsfolkList: resData.kinsfolkList,
          otherRelationList: resData.otherRelationList,
          borrowMoneyList3: resData.borrowMoneyList,
        })
      }
    ).catch(function (reason) {
      console.log(reason);
    });
    reso(resData, 'home/gain-province-list').then(
      function (data) {
        if (data.code == '0000') {
          that.setData({
            hotCityList: data.data.cityInfoList,
            allAddressList: data.data.provinceInfo
          })
        }
        else {
          // $Toast({
          //   content: data.message,
          //   type: 'error'
          // });
        }
      }
    ).catch(function (reason) {
      // console.log(reason);
    });
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
  },

  /**
   * 表单-验证字段
   */
  initValidate() {

    /**
     * 4-2(配置规则)
     */
    const rules = {
      phoneNumber: {
        required: true,
        tel: true
      },
      education: {
        required: true
      },
      marry:{
        required: true
      },
      children: {
        required: true
      },
      provide: {
        required: true
      },
      expenditure: {
        required: true
      },
      placeAndRegister: {
        required: true
      },
      newAddressTime: {
        required: true
      },
      cityTime: {
        required: true
      },
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      phoneNumber: {
        required: '请输入手机号码',
      },
      education: {
        required: '请选择最高学历'
      },
      marry: {
        required: '请选择婚姻状况'
      },
      children: {
        required: '请选择子女数目'
      },
      provide: {
        required: '请选择人数'
      },
      expenditure: {
        required: '请输入家庭支出金额'
      },
      placeAndRegister: {
        required: '请选择是否一致'
      },
      newAddressTime: {
        required: '请选择现居住时间'
      },
      cityTime: {
        required: '请选择来本市时间'
      },

      
    }

    this.WxValidate = new WxValidate(rules, messages)

  },
  // 报错提示
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //提交
  personFormSubmit: function (e) {
    console.log(e)
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    this.showModal({
      msg: '提交成功'
    })
  },

  //swiper切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  //下拉列表事件
  bindPickerChange: function (e) {
    var that = this;
    switch (e.target.dataset.num) {
      case '0':
        that.setData({ 'personageInfoJson.educationCode': e.detail.value })
        break;
      case '1':
        that.setData({ 'personageInfoJson.marriageCode': e.detail.value })
        break;
      case '2':
        that.setData({ 'personageInfoJson.childrenCountCode': e.detail.value })
        break;
      case '3':
        that.setData({ 'personageInfoJson.provideCountCode': e.detail.value })
        break;
      case '4':
        that.setData({ 'personageInfoJson.placeAndCensusCode': e.detail.value })
        break;
      case '5':
        that.setData({ hireType: e.detail.value })
        // console.log(that.data.hireTypeList[e.detail.value].code)
        break;
      case '6':
        that.setData({ unitNature: e.detail.value })
        // console.log(that.data.unitNatureList[e.detail.value].code)
        break;
      case '7':
        that.setData({ industry: e.detail.value })
        // console.log(that.data.industryList[e.detail.value].code)
        break;
      case '8':
        that.setData({ security: e.detail.value })
        // console.log(that.data.securityList[e.detail.value].code)
        break;
      case '9':
        that.setData({ borrowMoney: e.detail.value })
        // console.log(that.data.borrowMoneyList[e.detail.value].code)
        break;
      case '10':
        that.setData({ kinsfolk: e.detail.value })
        // console.log(that.data.kinsfolkList[e.detail.value].code)
        break;
      case '11':
        that.setData({ borrowMoney1: e.detail.value })
        // console.log(that.data.borrowMoneyList1[e.detail.value].code)
        break;
      case '12':
        that.setData({ borrowMoney2: e.detail.value })
        // console.log(that.data.borrowMoneyList2[e.detail.value].code)
        break;
      case '13':
        that.setData({ otherRelation: e.detail.value })
        // console.log(that.data.otherRelationList[e.detail.value].code)
        break;
      case '14':
        that.setData({ borrowMoney3: e.detail.value })
        // console.log(that.data.borrowMoneyList3[e.detail.value].code)
        break;
    }
  },
  // 时间选择器
  bindTimeChange: function (e) {
    var that = this;
    // console.log(e.target.dataset.time)
    switch (e.target.dataset.time) {
      case '0':
        that.setData({ 'personageInfoJson.nowDwellDate': e.detail.value })
        break;
      case '1':
        that.setData({ 'personageInfoJson.comeCityDate': e.detail.value })
        console.log('来本市时间', e.detail.value)
        break;
      case '2':
        that.setData({ entryTime: e.detail.value })
        console.log('现入职时间', e.detail.value)
        break;
    }
  },
  /*--------------城市 start--------------*/
  //城市选择
  addressShowHandler(value) {
    let idName = value.currentTarget.id;
    this.setData({
      addressShow: true,
      proShow: true,
      placeValue: idName
    })
    this.animation.bottom(0).step({ duration: 400 })
    this.setData({ animationAddress: this.animation.export() })
  },
  //城市选择弹框关闭
  addressHideHandler() {
    this.setData({
      addressShow: false,
      animationAddress: {},
    })
  },
  //热门城市点击方法
  HotCityHandler(e) {
    if (this.data.placeValue == 'household') {
      this.setData({
        proName: '',
        region: e.currentTarget.dataset.cityname,
        zone: e.currentTarget.dataset.citycode,
      })
    } else if (this.data.placeValue == 'nowPlace') {
      this.setData({
        nowProName: '',
        nowRegion: e.currentTarget.dataset.cityname,
        nowZone: e.currentTarget.dataset.citycode,
      })
    } else if (this.data.placeValue == 'workPlace') {
      this.setData({
        workPlaceProName: '',
        workPlaceRegion: e.currentTarget.dataset.cityname,
        workPlaceZone: e.currentTarget.dataset.citycode,
      })
    }
    this.setData({
      addressShow: false, 
      regionCheck: true,
      animationAddress: {}
    })
  },
  //省份点击
  allProHandler(e) {
    console.log(1111111,e)
    var provInitial = e.currentTarget.dataset.provinitial
    if (this.data.placeValue =='household' ){
      this.setData({
        proName: e.currentTarget.dataset.provname,
        proCode: e.currentTarget.dataset.provCode,
      })
    } else if (this.data.placeValue == 'nowPlace') {
      this.setData({
        nowProName: e.currentTarget.dataset.provname,
        nowProCode: e.currentTarget.dataset.provCode
      })
    } else if (this.data.placeValue == 'workPlace') {
      this.setData({
        workPlaceProName: e.currentTarget.dataset.provname,
        workPlaceProCode: e.currentTarget.dataset.provCode
      })
    }
    this.setData({
      cityShow: true,
      proShow: false,
    })
    for (var i = 0; i < this.data.allAddressList.length; i++) {
      var item = this.data.allAddressList[i]
      if (provInitial == item.titleName) {
        this.setData({
          cityList: item.provinceInfoList[e.currentTarget.dataset.index]
        })
      }
    }
  },
  //市 点击
  allCityHandler(e) {
    if (this.data.placeValue == 'household') {
      this.setData({
        region: e.currentTarget.dataset.cityname,
        zone: e.currentTarget.dataset.citycode,
      })
    } else if (this.data.placeValue == 'nowPlace') {
      this.setData({
        nowRegion: e.currentTarget.dataset.cityname,
        nowZone: e.currentTarget.dataset.citycode,
      })
    } else if (this.data.placeValue == 'workPlace') {
      this.setData({
        workPlaceRegion: e.currentTarget.dataset.cityname,
        workPlaceZone: e.currentTarget.dataset.citycode,
      })
    }
    this.setData({
      addressShow: false,
      cityShow: false,
      proShow: true,
      regionCheck: true,
      animationAddress: {}
    })
  },
  /*--------------城市 end--------------*/
})