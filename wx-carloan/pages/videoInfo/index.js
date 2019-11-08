// pages/videoInfo/index.js
import { reso } from '../../utils/configRequest.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight:'',
    videoInfo:{
      arrow: "",
      title: '影像信息'
    },
    currentTab: 0, //预设当前项的值
    necessaryInfo:[{
      id: 0,
      bigText: "申请表",
      smallText: '至少上传一张',
      imageItems:[]
    },{
      id: 1,
      bigText: "身份证明",
      smallText: '至少上传一张，正反面都需要',
      imageItems: []
    }, {
      id: 2,
      bigText: "行驶证",
      smallText: '至少上传一张，正反面都需要',
      imageItems: []
    }, {
      id: 3,
      bigText: "驾驶证",
      smallText: '抵押产品：至少上传一张，正反面都需要；',
      secondText:'质押产品：非必须',
      imageItems: []
    }, {
      id: 4,
      bigText: "车辆登记证",
      smallText: '至少上传一张',
      imageItems: []
    }],
    correlationInfo: [{
      id: 0,
      bigText: "征信报告",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 1,
      bigText: "工作证明",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 2,
      bigText: "收入证明",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 3,
      bigText: "住址证明",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 4,
      bigText: "房产证明",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 5,
      bigText: "社保资料",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 6,
      bigText: "面谈记录表",
      smallText: '非必填',
      imageItems: []
    }, {
      id: 7,
      bigText: "其他材料",
      smallText: '非必填',
      imageItems: []
    }]
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
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
  getImage: function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    let tabName = e.currentTarget.dataset.tabname;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        if (tabName === 'necessaryInfoTab'){
          let list = that.data.necessaryInfo;
          list[index].imageItems.push(tempFilePaths[0]);
          that.setData({
            necessaryInfo: list
          })
        } else if (tabName === 'correlationInfoTab'){
          let list = that.data.correlationInfo;
          list[index].imageItems.push(tempFilePaths[0]);
          that.setData({
            correlationInfo: list
          })
        }
      }
    })
  },
  deleteImage: function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    let tabName = e.currentTarget.dataset.tabname;
    let indexImage = e.currentTarget.dataset.indeximage;
    if (tabName === 'necessaryInfoTab') {
      let list = that.data.necessaryInfo;
      list[index].imageItems.splice(indexImage, 1);
      that.setData({
        necessaryInfo: list
      })
    } else if (tabName === 'correlationInfoTab') {
      let list = that.data.correlationInfo;
      list[index].imageItems.splice(indexImage, 1);
      that.setData({
        correlationInfo: list
      })
    }
  },
  previewImg: function(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    let tabName = e.currentTarget.dataset.tabname;
    let indexImage = e.currentTarget.dataset.indeximage;
    if (tabName === 'necessaryInfoTab') {
      let list = that.data.necessaryInfo;
      wx.previewImage({
        current: list[index].imageItems[indexImage],
        urls: list[index].imageItems
      })
    } else if (tabName === 'correlationInfoTab') {
      let list = that.data.correlationInfo;
      wx.previewImage({
        current: list[index].imageItems[indexImage],
        urls: list[index].imageItems
      })
    }  
  },
  gainClassCode: function(){
    reso({}, '/image-info/gain-class-code').then(
      function (res) {
        if (res.code == "0000") {
          console.log(11111,res)
          
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
    ).catch(function (reason) {
      console.log(reason);
    });
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
    var that = this;
    let viewHeight = wx.getSystemInfoSync().windowHeight -38- 40;
    that.setData({
      scrollHeight: viewHeight*2+'rpx'
    })
    that.gainClassCode();
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