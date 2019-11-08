// pages/vehicleEvaluation/index.js
const app = getApp()
const { $Toast } = require('../../dist/base/index');
import { reso } from '../../utils/configRequest.js';
import { getApi } from '../../utils/configRequest.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navH:'',
    //预估值
    evalPrice: '',
    //车型id
    modelId: '',
    modelCheck: false,
    //车型名字
    modelName: '请选择车型',
    //上牌时间
    regDate: '请选择首次上牌时间',
    regDateCheck: false,
    //估价城市
    region: '请选择估价城市',
    regionCheck: false,
    zone: '',
    //错误提示
    errorTip: '',
    //车架号
    vin: 'LB1WA5884A8008781',
    vinCheck: false,
    //里程数
    mile: '',
    mileCheck: false,
    //按钮不可点
    disabled: true,
    //热门车型
    hot_model_list: [],
    choose_model_list: [],
    choose_model_list_list: [],
    modelShow: false,
    animation: {},
    brandsShow: true,
    verticalCurrent: 0,
    hot: true,
    seriesShow: false,
    carSeriesDivideList: [],
    typeShow: false,
    carTypeDivideList: [],
    brandName: '',
    seriesName: '',
    //所有车型
    my_choose: false,
    my_seriesShow: false,
    my_carSeriesDivideList: [],
    my_typeShow: false,
    my_carTypeDivideList: [],
    my_brandName: '',
    my_seriesName: '',
    HotBrandIndex: 0,
    wrap: false,
    chooseBrandIndex: 0,
    initialIndex: 0,
    //地区选择
    addressShow: false,
    animationAddress: {},
    proShow: false,
    //热门地区
    hotCityList: [],

    //全部地区
    allAddressList: [],
    cityShow: false,
    proName: '',
    cityList: [],
  },
  //车架号填写
  vinHandler(e) {
    //测试数据，不为大写字母则返回null
    var vinNo_check = /^[a-zA-Z0-9]{17}$/;

    this.setData({
      vinCheck: vinNo_check.test(e.detail.value)
    })
    if (this.data.vinCheck) {
      this.setData({
        errorTip: '',
        vin: e.detail.value
      })
    } else {
      this.setData({
        errorTip: '请输入17位车架号，由数字和英文字母组成',
        vin: e.detail.value
      })
    }
    //console.log(this.data.vinCheck , this.data.regDateCheck , this.data.regionCheck , this.data.mileCheck)
    this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
  },
  //时间变化函数
  bindDateChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      regDate: e.detail.value,
      regDateCheck: true,
    })
    //console.log(this.data.regDate)
    //console.log(this.data.vinCheck , this.data.regDateCheck , this.data.regionCheck , this.data.mileCheck)
    this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
  },

  /*--------------城市 start--------------*/
  //城市选择
  addressShowHandler() {
    this.setData({
      addressShow: true,
      proShow: true,
    })
    this.animation.bottom(0).step({ duration: 400 })
    this.setData({ animationAddress: this.animation.export() })
  },
  //城市选择弹框关闭
  addressHideHandler() {
    this.setData({
      addressShow: false,
      animationAddress: {},
    })
  },
  //热门城市点击方法
  HotCityHandler(e) {
    this.setData({
      zone: e.currentTarget.dataset.citycode,
      addressShow: false,
      region: e.currentTarget.dataset.cityname,
      regionCheck: true,
      animationAddress: {}
    })
    //console.log(this.data.vinCheck , this.data.regDateCheck , this.data.regionCheck , this.data.mileCheck)
    this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
    //console.log(this.data.zone)
  },
  //省份点击
  allProHandler(e) {
    //console.log(e)
    var provInitial = e.currentTarget.dataset.provinitial
    this.setData({
      cityShow: true,
      proShow: false,
      proName: e.currentTarget.dataset.provname
    })
    for (var i = 0; i < this.data.allAddressList.length; i++) {
      var item = this.data.allAddressList[i]
      if (provInitial == item.titleName) {
        //console.log(item)
        this.setData({
          cityList: item.provinceInfoList[e.currentTarget.dataset.index]
        })
      }
    }
    //console.log(this.data.cityList)
  },
  //市 点击
  allCityHandler(e) {
    this.setData({
      addressShow: false,
      cityShow: false,
      proShow: true,
      region: e.currentTarget.dataset.cityname,
      zone: e.currentTarget.dataset.citycode,
      regionCheck: true,
      animationAddress: {}
    })
    this.getEval(this.data.vinCheck , this.data.modelCheck , this.data.regDateCheck , this.data.regionCheck , this.data.mileCheck)
    //console.log(this.data.zone)
  },
  //公共方法，判断按钮是否可用
  getEval(vinCheck, modelCheck, regDateCheck, regionCheck, mileCheck){
    if (vinCheck&&modelCheck&&regDateCheck&&regionCheck&&mileCheck) {
      this.setData({
        disabled: false,
      })
    }
    else {
      this.setData({
        disabled: true,
      })
    }
  },
  /*--------------城市 end--------------*/
  //里程数填写
  mileHandler(e) {
    if (e.detail.value != '' && (!isNaN(e.detail.value)) && parseInt(e.detail.value)<100) {
      this.setData({
        errorTip: '',
        mile: e.detail.value,
        mileCheck: true
      })

    } else if (e.detail.value == '') {
      this.setData({
        errorTip: '',
        mile: e.detail.value,
        mileCheck: false
      })
    }
    else if (isNaN(e.detail.value)) {
      this.setData({
        errorTip: '请输入数字',
        mile: e.detail.value,
        mileCheck: false
      })
    }
    else if (parseInt(e.detail.value)>100) {
      //console.log('ee')
      this.setData({
        errorTip: '里程数不能超过101',
        mile: e.detail.value,
        mileCheck: false
      })
    }
    //console.log(this.data.vinCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
    this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
  },
  //匹配按钮
  matchCarBrand() {
    var that = this
    var vinNo_check = /^[a-zA-Z0-9]{17}$/;
    if (that.data.vin === "" || !vinNo_check.test(that.data.vin)) {
      $Toast({
        content: '请核查车架号!',
        type: 'error'
      });
      return false
    }
    $Toast({
      content: '匹配中',
      type: 'loading',
      duration: 0,
      mask: false
    });
    var requestData = {
      vin: that.data.vin,
      token: app.globalData.token,
      clientId: app.globalData.clientId 
    };
    reso(requestData, 'car-info/matchCarBrand').then(
      function (data) {
        if (data.code == '0000') {
          $Toast.hide();
          that.setData({
            modelName: data.data.modelName,
            modelId: data.data.modelId,
            modelCheck: true,
          })
          if (data.data.modelName.length >= 26) {
            that.setData({
              wrap: true,
            })
          }
          else {
            that.setData({
              wrap: false
            })
          }
          // console.log('that.data.modelId', that.data.modelCheck)
          this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)

        }
        else {
          $Toast({
            content: data.message,
            type: 'error'
          });
        }
      }
    ).catch(function (reason) {
      //console.log(reason);
    });

  },
  //估价按钮
  evalHandler() {
    // var vinNo_check = /^[a-zA-Z0-9]{17}$/;
    // if (this.data.vin === "" || !vinNo_check.test(this.data.vin)) {
    //   $Toast({
    //     content: '请核查车架号!',
    //     type: 'error'
    //   });
    //   return false
    // }
    // if (this.data.regDate =='请选择首次上牌时间') {
    //   $Toast({
    //     content: '请选择上牌时间!',
    //     type: 'error'
    //   });
    //   return false
    // }
    // if (!this.data.region[1]) {
    //   $Toast({
    //     content: '请选择估价城市!',
    //     type: 'error'
    //   });
    //   return false
    // }
    // console.log(this.data.mile)
    // if (this.data.mile == '' || isNaN(this.data.mile)) {
    //   $Toast({
    //     content: '请核查表显里程!',
    //     type: 'error'
    //   });
    //   return false
    // }
    if (this.data.disabled) return
    $Toast({
      content: '获取中',
      type: 'loading',
      duration: 0,
      mask: false
    });
    var requestData = {
      modelId: this.data.modelId,
      regDate: this.data.regDate,
      //zone: this.data.zone,
      zone: '210',
      mile: this.data.mile,
      token: app.globalData.token, 
      clientId: app.globalData.clientId 
      
    };
    var that = this;
    reso(requestData, 'car-info/assessment').then(
      function (data) {
        if (data.code == '0000') {
          $Toast.hide();
          that.setData({
            evalPrice: data.data.evalPrice,
          })
        }
        else {
          $Toast({
            content: data.message,
            type: 'error'
          });
        }
      }
    ).catch(function (reason) {
      // console.log(reason);
    });


  },


  //车型选择
  //车型弹出框
  modelHideHandler() {
    this.setData({
      modelShow: false,
      animation: {},
      brandsShow: true,
      seriesShow: false
    })

  },
  modelShowHandler() {
    this.setData({
      // modelBottom:-1000+'rpx', 
      modelShow: true,
      brandsShow: true,
    })
    this.animation.bottom(0).step({ duration: 400 })
    this.setData({ animation: this.animation.export() })
  },
  chooseHotBrandHandler(e) {
    for (var i = 0; i < this.data.hot_model_list.length; i++) {
      var item = this.data.hot_model_list[i]
      if (item.carSeriesDivideList) {
        this.setData({
          HotBrandIndex: e.currentTarget.dataset.index,
          brandsShow: false,
          seriesShow: true,
          carSeriesDivideList: this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList,
          brandName: this.data.hot_model_list[this.data.HotBrandIndex].bandName
        })
      }
      else {
        this.setData({
          modelShow: false,
          modelName: this.data.hot_model_list[e.currentTarget.dataset.index].bandName,
          wrap: false
        })
      }
    }
  },
  chooseHotSeriesHandler(e) {
    //console.log(e.currentTarget.dataset)
    var seriesgroupname = e.currentTarget.dataset.seriesgroupname
    var seriesname = e.currentTarget.dataset.seriesname
    var index = e.currentTarget.dataset.index
    this.setData({ seriesShow: false, typeShow: true })
    for (var i = 0; i < this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList.length; i++) {
      var item = this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i];
      if (seriesgroupname == item.titleName) {
        for (var j = 0; j < this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList.length; j++) {
          var item_item = this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j];
          if (seriesname == item_item.seriesName) {
            //console.log(i, j)
            //console.log(this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j].carTypeDivideList)
            if (this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j].carTypeDivideList) {
              this.setData({
                carTypeDivideList: this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j].carTypeDivideList,
                seriesName: this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j].seriesName
              })
            }
            else {
              this.setData({ seriesShow: false, typeShow: false, modelShow: false, modelName: this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j].seriesName, wrap: false })
            }

          }
        }

      }
    }

  },
  chooseBrandHandler(e) {
    //console.log(e)
    var initial = e.currentTarget.dataset.initial
    //console.log('initial', initial)
    for (var i = 0; i < this.data.choose_model_list.length; i++) {
      var item = this.data.choose_model_list[i]
      if (item.titleName == initial) {
        //console.log(item.carInfoList[e.currentTarget.dataset.index])
        if (item.carInfoList[e.currentTarget.dataset.index].carSeriesDivideList) {
          this.setData({
            initialIndex: i,
            chooseBrandIndex: e.currentTarget.dataset.index,
            brandsShow: false,
            my_seriesShow: true,
            my_choose: true,
            hot: false,
            my_carSeriesDivideList: this.data.choose_model_list[i].carInfoList[e.currentTarget.dataset.index].carSeriesDivideList,
            my_brandName: this.data.choose_model_list[i].carInfoList[e.currentTarget.dataset.index].bandName,
            choose_model_list_list: this.data.choose_model_list[i]
          })
        }
        else {
          this.setData({
            modelShow: false,
            modelName: this.data.choose_model_list[i].carInfoList[e.currentTarget.dataset.index].bandName,
            wrap: false
          })
        }
      }
    }
  },
  chooseSeriesHandler(e) {
    //console.log(this.data.initialIndex, this.data.chooseBrandIndex)
    //console.log(e.currentTarget.dataset)
    var seriesgroupname = e.currentTarget.dataset.seriesgroupname
    var seriesname = e.currentTarget.dataset.seriesname
    var index = e.currentTarget.dataset.index
    this.setData({ my_seriesShow: false, my_typeShow: true })

    //console.log(this.data.choose_model_list_list)
    for (var i = 0; i < this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList.length; i++) {
      //console.log(item)
      var item = this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i];
      if (seriesgroupname == item.titleName) {
        for (var j = 0; j < this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList.length; j++) {
          var item_item = this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j];
          if (seriesname == item_item.seriesName) {
            // console.log(i,j)
            //console.log(this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j].carTypeDivideList)
            if (this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j].carTypeDivideList) {
              this.setData({
                my_carTypeDivideList: this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j].carTypeDivideList,
                my_seriesName: this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j].seriesName
              })
            }
            else {
              this.setData({ my_seriesShow: false, my_typeShow: false, modelShow: false, modelName: this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j].seriesName, wrap: false })
            }

          }
        }

      }
    }

  },
  chooseHotTypeHandler(e) {
    //console.log(e.currentTarget.dataset.modelname.length)
    this.setData({
      typeShow: false,
      modelName: e.currentTarget.dataset.modelname,
      modelId: e.currentTarget.dataset.modelid,
      modelShow: false,
      modelCheck: true,
      animation: {},
    })
    if (e.currentTarget.dataset.modelname.length >= 27) {
      this.setData({
        wrap: true
      })
    }
    else if (e.currentTarget.dataset.modelname.length < 27) {
      this.setData({
        wrap: false
      })
    }
    this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
  },
  chooseTypeHandler(e) {
    console.log(e.currentTarget.dataset.modelname.length)
    this.setData({
      my_typeShow: false,
      modelName: e.currentTarget.dataset.modelname,
      modelId: e.currentTarget.dataset.modelid,
      modelShow: false,
      modelCheck: true,
      animation: {},
    })
    if (e.currentTarget.dataset.modelname.length >= 27) {
      this.setData({ wrap: true })
    }
    else if (e.currentTarget.dataset.modelname.length < 27) {
      this.setData({ wrap: false })
    }
    this.getEval(this.data.vinCheck, this.data.modelCheck, this.data.regDateCheck, this.data.regionCheck, this.data.mileCheck)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight
    })
    var that = this
    let resData = { token: app.globalData.token, clientId: app.globalData.clientId }
    reso(resData, 'home/gain-car-list').then(
      function (data) {
        if (data.code == '0000') {
          that.setData({
            hot_model_list: data.data.carInfoList,
            choose_model_list: data.data.carInfo,
          })
        }
        else {
          // $Toast({
          //   content: data.message,
          //   type: 'error'
          // });
        }
      }
    ).catch(function (reason) {
      // console.log(reason);
    });
    reso(resData, 'home/gain-province-list').then(
      function (data) {
        if (data.code == '0000') {
          that.setData({
            hotCityList: data.data.cityInfoList,
            allAddressList: data.data.provinceInfo
          })
        }
        else {
          // $Toast({
          //   content: data.message,
          //   type: 'error'
          // });
        }
      }
    ).catch(function (reason) {
      // console.log(reason);
    });
  },
















  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation()
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
