// pages/myMsg/index.js
import { reso } from '../../utils/configRequest.js'
import { formatTime } from '../../utils/util.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:2,
    size:10,
    offset:0,
    msgList:[]
  },
  initMSGlist: function (userId, size, offset){
    // init(orderPhase, userId, offset, size, condition){
      var that = this;
      //console.log(that.data)
      
      var requestData = {
        userId: userId,
        offset: offset,
        size: size,
        token: app.globalData.token,
        clientId: app.globalData.clientId 
      };
    reso(requestData, 'order/mineOrderList').then(
        function (res) {
          console.log(res)
          for(let item in res.data.list){
            //后端返回高精度 毫秒级 故截取前十位
            res.data.list[item].createdTime = (res.data.list[item].createdTime).toString().substring(0, 10)
            res.data.list[item].createdTime = formatTime(res.data.list[item].createdTime , 'Y-M-D h:m:s')
          }
          that.setData({
            msgList: res.data.list,
          })
        }
      ).catch(function (e) {
        console.log(e);
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initMSGlist(this.data.userId,this.data.size,this.data.offset);
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