// pages/forgetPassword/index.js
const app = getApp()

import {
  reso
} from '../../utils/configRequest.js'
// import { getNVCVal } from '../../utils/guide.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uName: 'HQ170078',
    newPwd: '1q2w3e',
    smsCode: '',
    regNewPwd: false,
    newpwdtype: true,
    eye2: true,
    getCodeShow: false,
    access_token: '',
    refresh_token: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 新密码切换显示
   */
  toggleEyeNew: function() {
    this.setData({
      newpwdtype: !this.data.newpwdtype,
      eye2: !this.data.eye2

    })
  },

  /*
   *验证新密码
   */
  checkNewPWD: function(e) {
    //只判断位数
    this.setData({
      newPwd: e.detail.value
    })
    if (this.data.newPwd.length < 6) {
      this.setData({
        regNewPwd: false
      })
    } else {
      this.setData({
        regNewPwd: true
      })

    }
  },
  //设置值
  setUname: function(e) {
    this.setData({
      uName: e.detail.value,
    })
  },

  //getToken

  getToken() {
    let _this = this;
    let requestData = {
      clientId: "carloan_app",
      grantType: "password",
      userName: this.data.uName,
      password: this.data.newPwd
    }
    wx.request({
      url: "http://incsit.huaxiafinance.com/carloan-gateway/oauth/token",
      method: 'POST',
      data: requestData,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        _this.setData({
          access_token: res.data.data.access_token,
          refresh_token: res.data.data.refresh_token
        })
        app.globalData.token = res.data.data.access_token;
      
        _this.signIn(res.data.data.access_token, res.data.data.refresh_token)
      }

    });
  },

  signIn: function(atoken, reftoken) {
   
    let _this = this;
    if (atoken != '') {
      let requestData = {
        clientId: "carloan_app",
        token: atoken,
        userCode: this.data.uName
      }
      reso(requestData, '/user/getUserInfo').then(
        function(res) {
          if (res.code == "0000") {
            // app.globalData = res.data;
            let appData = app.globalData;
            let resData = res.data;
            app.globalData = Object.assign(appData, resData);
            wx.showToast({
              title: " 登录成功 ^_^ ",
              icon: 'success',
              duration: 1000,
              mask: true
            })
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
          if (res.code != "0000") {
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
    }else{
      wx.showToast({
        title: "登录失败 未成功获取token!",
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
  },
  /**
   * 忘记密码
   * 
   */
  forgetPwd: function(e) {
    wx.redirectTo({
      url: '/pages/forgetPassword/index'
    })
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