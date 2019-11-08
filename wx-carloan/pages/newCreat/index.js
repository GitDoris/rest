// pages/newCreat/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newCreatInfo:{
      arrow: "",
      title: '新建进件'
    },
    items: [{
        index:0,
        iscomplete: 0,
      },{
        index: 1,
        iscomplete: 0,
      }, {
        index: 2,
        iscomplete: 0,
      }, {
        index: 3,
        iscomplete: 0,
    }],
    infoItmes: [{
        imgUrl: 'http://creditsit.huaxiafinance.com/huaxiapuhui/markdownPic/applyInfo.png',
        title: '申请信息'
      },{
        imgUrl: 'http://creditsit.huaxiafinance.com/huaxiapuhui/markdownPic/carInfo.png',
        title: '车辆信息'
      }, {
        imgUrl: 'http://creditsit.huaxiafinance.com/huaxiapuhui/markdownPic/clientInfo.png',
        title: '客户信息'
      }, {
        imgUrl: 'http://creditsit.huaxiafinance.com/huaxiapuhui/markdownPic/videoInfo.png',
        title: '影像信息'
    }]
  },
  pageTurn: function(e){
    console.log(e.target.id)
    switch (e.target.id){
      case "0":
        wx.navigateTo({
          url: '../applyForInfo/index'
        })
        break;

      case "1":
        wx.navigateTo({
          url: '../carInfo/index'
        })
        break;

      case "2":
        wx.navigateTo({
          url: '../clientInformation/index'
        })
        break;

      case "3":
        wx.navigateTo({
          url: '../videoInfo/index'
        })
        break;

    }
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