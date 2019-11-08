// pages/updatePwd/index.js
const app = getApp()
import { reso } from '../../utils/configRequest.js'
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPwd:'',
    newPwd:'',
    regNewPwd:false,
    regOldPwd:false,
    oldpwdtype:true,
    newpwdtype: true,
    eye1:true,
    eye2: true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 老密码切换显示
  */
  toggleEyeOld: function () {
    console.log(1)
    this.setData({
      oldpwdtype: !this.data.oldpwdtype,
      eye1:!this.data.eye1
    })
  },
  /**
   * 新密码切换显示
  */
  toggleEyeNew: function () {
    this.setData({
      newpwdtype: !this.data.newpwdtype,
      eye2: !this.data.eye2

    })
  },
  /*
   *验证新密码
   */
  checkNewPWD: function (e) {
        //只判断位数
    // var RuleChinese = new RegExp(/[0-9a-zA-Z_]/, 'g')
    // RuleChinese = RuleChinese.test(e.detail.value)
    // this.setData({
    //   regChinese: RuleChinese
    // })
    this.setData({
      newPwd: e.detail.value
    })
    if (this.data.newPwd.length < 6 ) {
      this.setData({
        regNewPwd: false
      })
    } else {
      this.setData({
        regNewPwd: true 
      })
      
    }
  },
  /*
   *验证老密码
   */
  checkOldPWD: function (e) {
    //只判断位数
    // console.log(this.data.regOldPwd)
    // var RuleChinese = new RegExp(/[0-9a-zA-Z_]/, 'g')
    // RuleChinese = RuleChinese.test(e.detail.value)
    // this.setData({
    //   regChinese: RuleChinese
    // })
    this.setData({
      oldPwd: e.detail.value
    })

    //小于6 
    if (this.data.oldPwd.length < 6 ) {
      this.setData({
        regOldPwd: false
      })
    } else {
      this.setData({
        regOldPwd: true
      })

    }
  },
  /**
   * 忘记密码
   * 
   * 
  */
  forgetPwd:function(e){
    wx.redirectTo({
      url: '/pages/forgetPassword/index'
    })
  },
  /**
   * 修改密码  提交
   * 
   */
  updatePwd:function(){
    console.log(this.data.regOldPwd +"--------------"+ this.data.regNewPwd)
    if (this.data.regOldPwd==false || this.data.regNewPwd==false){
      wx.showToast({
        title: '请输入6-16位密码',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }else{
      let requestData = { userCode: app.globalData.userCode, password: this.data.newPwd, oldPassword: this.data.oldPwd  }
      reso(requestData, 'user/userPasswdModify').then(
        function (res) {
          if (res.success) {
            wx.showToast({
              title: '密码修改成功！',
              icon: 'success',
              duration: 1000,
              mask: true
            })

            wx.redirectTo({
              url: '/pages/acNone/index'
            })
          }
          if (res.success==false) {
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
        }
      ).catch(function (reason) {
        console.log(reason);
      });
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})