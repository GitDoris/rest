// dist/searchName_DEMO/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nameIpt:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindButtonTap: function (e) {
    this.setData({
      nameIpt: e.detail.value
    })
  },
  
  searchName:function(){
    let data = { name: this.data.nameIpt }
    wx.request({
      url: 'https://easy-mock.com/mock/5b875b7db762eb26e90eb8f8/huaxiafinance-api/searchName',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json;chartset=UTF-8' // 默认值
      },
      success(res) {
        console.log(res.data)
        // resolve(res.data);
      }

    });  
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