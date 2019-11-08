// pages/category.js
const { $Toast } = require('../../dist/base/index');
import { reso } from '../../utils/configRequest.js'
const app = getApp()

Page({
  data: {
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    testData:[],
    orderPhase: 0,
    userId: '25719',
    offset: 0,
    size: 10,
    condition: "",
    showCondition:true,

  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    wx.showLoading();
    var cur = e.target.dataset.current;
    //  console.log(typeof(cur))
    // if (this.data.currentTab == cur) { return false; }
    // else { 
    // }
    switch (cur) {
      case "0":
        this.data.orderPhase = 0;
        break;
      case "1":
        this.data.orderPhase = 5;
        break;
      case "2":
        this.data.orderPhase = 3;
        break;
      case "3":
        this.data.orderPhase = 4;
        break;
      case "4":
        this.data.orderPhase = 1;
        break;
      default:
        break;
    }
    this.setData({
      testData: [],
      offset: 0
    });
    this.init(this.data.orderPhase, this.data.userId, this.data.offset, this.data.size, this.data.condition);
    this.setData({
      currentTab: cur
    })
    // this.checkCor();
  },
  // 滚动切换标签样式
  // switchTab: function (e) {
  //   // console.log(111)
  //   // console.log(e.detail.current)
  //   // 0 - 初始（全部） 1 - 已完成 3 - 需补件 4 - 处理中 5 - 草稿箱
  //   switch (e.detail.current){
  //     case "0":
  //       this.data.orderPhase = 0;
  //       break;
  //     case "1":
  //       this.data.orderPhase = 5;        
  //       break;
  //     case "2":
  //       this.data.orderPhase = 3;   
  //       break;
  //     case "3":
  //       this.data.orderPhase = 4;     
  //       break;
  //     case "4":
  //       this.data.orderPhase = 1;
  //       break;
  //     default:
  //       break;
  //   }
  //   this.setData({
  //     testData: [],
  //     offset:0
  //   });
  //   this.init(this.data.orderPhase, this.data.userId, this.data.offset, this.data.size, this.data.condition);
    
  //   this.setData({
  //     currentTab: e.detail.current
  //   });
  //   // this.checkCor();
  // },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    console.log(123)
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  //设置值
  setContidion: function (e) {
    this.setData({
      condition: e.detail.value,
    })
  },
  searchData:function(e){
    wx.showLoading();
    this.setData({
      testData: [],
      offset: 0
    });
    this.init(this.data.orderPhase, this.data.userId, this.data.offset, this.data.size, this.data.condition); 
  },
  searchCancel:function(e){
    wx.showLoading();
    this.setData({
      testData: [],
      offset: 0,
      condition: "",
    });
    this.init(this.data.orderPhase, this.data.userId, this.data.offset, this.data.size, this.data.condition);     
  },
  cgxCancel:function(e){
    wx.showLoading();
    // this.setData({
    //   testData: [],
    //   offset: 0,
    //   condition: "",
    // });

  },
  init(orderPhase, userId, offset, size, condition){
    var that = this;
    //console.log(that.data)
    var requestData = {
      orderPhase: orderPhase,
      userId: userId,
      offset: offset,
      size: size,
      condition: condition,
      token: app.globalData.token, 
      clientId: app.globalData.clientId
    };
    reso(requestData, 'order/list').then(
      function(data){
        // console.log(data)
        if (data.code == "0000"){
          wx.hideLoading();
          if (!data.data.list){
            that.setData({
              showCondition: false
            })
          }else{
            let resData = data.data.list;
            that.data.testData.push(...resData);
            // console.log(data.data.list)
            that.setData({
              testData: that.data.testData,
            })  
          }
        }else{
          $Toast({
            content: data.message,
            type: 'error',
            duration: 2000,
            mask: false
          });
        }


      }
    ).catch(function (reason){
      console.log(reason);
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    this.init(this.data.orderPhase, this.data.userId, this.data.offset, this.data.size, this.data.condition);
    // var that =this;
    // setTimeout(function(){
    //   console.log(that.data)
    // },300)  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
    // 处理完成后，终止下拉刷新
    this.data.offset += 10;
    this.init(this.data.orderPhase, this.data.userId, this.data.offset, this.data.size, this.data.condition);
    wx.stopPullDownRefresh()
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})