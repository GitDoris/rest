// pages/certification/index.js
// 定义app 调用 getApp()
import {
  reso
} from '../../utils/configRequest.js'

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: '',
    disabled: false,
    plain: false,
    loading: false,
    RuleChinese: '',
    RuleIdcard: '',//341201198506129702
    RuleNum: 'WVWPR13C6AE170920',
    regChinese: false,
    regIdcard: false,
    regNum: false
  },
  //查询方法
  searchAC: function(e) {
    var that = this;
    this.regChinesed(this.data.RuleChinese);
    this.regIdcard(this.data.RuleIdcard);
    this.regCarCode(this.data.RuleNum);
    console.log(this.data.regChinese + "\n\r" + this.data.regIdcard + "\n\r" + this.data.regNum)

    if (this.data.regChinese && this.data.regIdcard && this.data.regNum) {

      let requestData = {
        customerName: this.data.regChinese,
        customerIdCard: this.data.regIdcard,
        vin: this.data.regNum,
        userId: '2',
        token: app.globalData.token,
        clientId: app.globalData.clientId 
      }
      reso(requestData, 'finance/auth').then(
        function(res) {
          if(res.code == "0000"){
            if (res.data.authResult == 1) {
              wx.redirectTo({
                url: '/pages/acSuccess/index'
              })
            }
            if (res.data.authResult == 0) {
              wx.redirectTo({
                url: '/pages/acNone/index'
              })
            }
          }else{
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
          
        }
      ).catch(function(reason) {
        console.log(reason);
      });


    } else {
      wx.showToast({
        title: '信息未填写正确！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }

  },
  /*
   *验证中文
   */
  regChinesed: function(val) {
    var RuleChinese = new RegExp('[\u4e00-\u9fa5]', 'g')
    RuleChinese = RuleChinese.test(val)
    this.setData({
      regChinese: RuleChinese,
    })
  },
  /*
   * 失焦验证
   */
  checkChinese: function(e) {
    //判断用户输入的是否为中文
    //测试数据，不为大写字母则返回null
    console.log(this.data.RuleChinese)
    
    console.log(e.detail.value)
    this.regChinesed(e.detail.value);
    
    if (this.data.regChinese) {
      this.setData({
        inputValue: '',
        RuleChinese: e.detail.value
      })
    } else {
      this.setData({
        inputValue: '请输入中文姓名'
      })
    }
  },
  //验证是否为身份证
  regIdcard: function(val) {
    var RuleIdcard = new RegExp(/^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|30|31)\d{3}[0-9Xx]$/, 'g');
    RuleIdcard = RuleIdcard.test(val)
    this.setData({
      regIdcard: RuleIdcard
    })
  },
  /*
   * 失焦验证 
   */
  checkIdcard: function(e) {
    //判断用户输入的是否为中文
    //测试数据，不为大写字母则返回null
    this.regIdcard(e.detail.value)
    if (this.data.regIdcard) {
      this.setData({
        inputValue: '',
        RuleIdcard: e.detail.value
        
      })
    } else {
      this.setData({
        inputValue: '请输入18位数字或X'
      })
    }
  },
  /*
   * 验证是否为车架号
   */
  regCarCode: function(val) {
    var RuleNum = new RegExp('[A-Za-z0-9]{17}', 'g');
    RuleNum = RuleNum.test(val)
    this.setData({
      regNum: RuleNum
    })
  },
  /*
   * 失焦验证 
   */
  checkCarCode: function(e) {
    //判断用户输入的是否为中文
    //测试数据，不为大写字母则返回null
    this.regCarCode(e.detail.value)
    if (this.data.regNum) {
      this.setData({
        inputValue: '',
        RuleNum: e.detail.value,
      })
    } else {
      this.setData({
        inputValue: '请输入17位车架号，由数字和英文字母组成'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})