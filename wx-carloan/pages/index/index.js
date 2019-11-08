//index.js
//获取应用实例
const app = getApp()
var json = require('mockjson.js')
var order = ['red', 'yellow', 'blue', 'green', 'red']
import { reso } from '../../utils/configRequest.js'

// var template = require('../../template/tabBarJson.js');

Page({
  data: {
    motto: '车贷',
    userInfo: { nickName:"peyton"},
    // list: json.json.data,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/banner1.png',
      'https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/banner2.png',
      'https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/banner3.png',
      'https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/banner4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor:"rgba(255,255,255,0.6)",
    indicatorActiveColor:"#fff",
    day:2,
    monthyear:'',
    gday:'',
    notice:'消息提醒.....',
    toView: 'red',
    scrollTop: 100,
    currentTab:0,
    productLongList:[],
    productShortList:[] 

  },
  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
   //初始获取产品列表
  initProList() {
    var that = this;
    let resData = { token: app.globalData.token, clientId: app.globalData.clientId}
    reso(resData,'/home/productList').then(
      function (res) {
        let resData = res.data.list;
        that.setData({
          productLongList: resData.longPeroid,
          productShortList: resData.shortPeriod
        });
      }
    ).catch(function (reason) {
      console.log(reason);
    });

  },
  onLoad: function () {    
    this.initProList();
    // template.tabbar("tabBar", 0, this)//1表示第二个tabbar
    let d = new Date()
    let weekday = new Array(7)
    weekday[0] = "星期天"
    weekday[1] = "星期一"
    weekday[2] = "星期二"
    weekday[3] = "星期三"
    weekday[4] = "星期四"
    weekday[5] = "星期五"
    weekday[6] = "星期六"
    
    this.setData({
      day : (d.getDate()).toString(),
      monthyear: (d.getFullYear() + "." + parseInt(d.getMonth() + 1)  ).toString(),
      gday : (weekday[d.getDay()]).toString()
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  
  
 
})
