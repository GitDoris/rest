// pages/list/index.js
const app = getApp()

import { reso } from '../../utils/configRequest.js'
Page({
  data: {
    currentTab: 0,
    education: '',
    educationList: [],
    marry: '',
    marriageList: [],
    children: '',
    childrenList: [],
    provide: '',
    provideList: [],
    placeAndRegister: '',
    placeAndRegisterList: [],
    newAddressTime: '请选择时间',
    cityTime: '请选择时间',
    hireType: '',
    hireTypeList: [],
    unitNature: '',
    unitNatureList: [],
    industry: '',
    industryList: [],
    security: '',
    securityList: [],
    entryTime: '请选择时间',
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
    region: ['请选择省', '市', '区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // wx.getSystemInfo({
    //   success: function (res) {
    //     // console.log(res.windowHeight)
    //     // let clientHeight = res.windowHeight,
    //     //     clientWidth = res.windowWidth,
    //     //     rpxR = 750 / clientWidth;
    //     // var calc = clientHeight * rpxR;
    //     // that.setData({
    //     //   windowHeight: calc
    //     // });
    //     // console.log(calc)
    //   }
    // });
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
        that.setData({ education: e.detail.value })
        console.log(that.data.educationList[e.detail.value].code)
        break;
      case '1':
        that.setData({ marry: e.detail.value })
        console.log(that.data.marriageList[e.detail.value].code)
        break;
      case '2':
        that.setData({ children: e.detail.value })
        console.log(that.data.childrenList[e.detail.value].code)
        break;
      case '3':
        that.setData({ provide: e.detail.value })
        console.log(that.data.provideList[e.detail.value].code)
        break;
      case '4':
        that.setData({ placeAndRegister: e.detail.value })
        console.log(that.data.placeAndRegisterList[e.detail.value].code)
        break;
      case '5':
        that.setData({ hireType: e.detail.value })
        console.log(that.data.hireTypeList[e.detail.value].code)
        break;
      case '6':
        that.setData({ unitNature: e.detail.value })
        console.log(that.data.unitNatureList[e.detail.value].code)
        break;
      case '7':
        that.setData({ industry: e.detail.value })
        console.log(that.data.industryList[e.detail.value].code)
        break;
      case '8':
        that.setData({ security: e.detail.value })
        console.log(that.data.securityList[e.detail.value].code)
        break;
      case '9':
        that.setData({ borrowMoney: e.detail.value })
        console.log(that.data.borrowMoneyList[e.detail.value].code)
        break;
      case '10':
        that.setData({ kinsfolk: e.detail.value })
        console.log(that.data.kinsfolkList[e.detail.value].code)
        break;
      case '11':
        that.setData({ borrowMoney1: e.detail.value })
        console.log(that.data.borrowMoneyList1[e.detail.value].code)
        break;
      case '12':
        that.setData({ borrowMoney2: e.detail.value })
        console.log(that.data.borrowMoneyList2[e.detail.value].code)
        break;
      case '13':
        that.setData({ otherRelation: e.detail.value })
        console.log(that.data.otherRelationList[e.detail.value].code)
        break;
      case '14':
        that.setData({ borrowMoney3: e.detail.value })
        console.log(that.data.borrowMoneyList3[e.detail.value].code)
        break;
    }
  },
  // 时间选择器
  bindTimeChange: function (e) {
    var that = this;
    // console.log(e.target.dataset.time)
    switch (e.target.dataset.time) {
      case '0':
        that.setData({ newAddressTime: e.detail.value })
        console.log('现在居住地时间', e.detail.value)
        break;
      case '1':
        that.setData({ cityTime: e.detail.value })
        console.log('来本市时间', e.detail.value)
        break;
      case '2':
        that.setData({ entryTime: e.detail.value })
        console.log('现入职时间', e.detail.value)
        break;
    }
  },
  // 户口所在地
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

})