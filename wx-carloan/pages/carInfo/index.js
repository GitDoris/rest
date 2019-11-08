// pages/carInfo/index.js
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');
import {
  reso
} from '../../utils/configRequest.js';
import {
  getApi
} from '../../utils/configRequest.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //swiper
    currentTab: 0,
    carInfoDone:false,
    dataInfoDone:false,
    //swiper:0
    //车架号
    vin: '',
    vinCheck: false,
    //车牌号
    plateNumber:'',
    plateNumberCheck:false,
    uppercase:true,
    //过户次数
    transferCount: '',
    transferCountCheck: false,
    //车身颜色
    carColour: '请选择车身颜色',
    carColourList:[],
    carColourCode: 0,
    carColourCheck: false,
    //车辆保险
    carInsurance: '请选择车辆保险',
    carInsuranceList: [],
    carInsuranceCode: 0,
    carInsuranceCheck: false,
    //车辆评估方式
    carAssess: '请选择评估方式',
    carAssessList: [],
    carAssessCheck:false,
    //是否有评估师
    appraiser: '请选择是否有评估师',
    appraiserList: [],
    appraiserCode: 0,
    appraiserCheck: false,

    //车型id
    modelId: '',
    modelCheck: false,
    //车型名字
    modelName: '请选择车型',
    //车品牌/车系/车型
    carModels :'',    
    //车牌归属省份CODE
     placeProvinceCode:'',
    //车牌归属地
    region: '请选择车牌归属地',
    regionCheck: false,
    zone: '',
    //错误提示
    errorTip: '',
   
   
    //按钮不可点
    carInfoDisabled: true,
    //热门车型
    hot_model_list: [],
    choose_model_list: [],
    choose_model_list_list: [],
    modelShow: false,
    animation: {},
    brandsShow: true,
    verticalCurrent: 0,
    //hot: true,
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


    //swiper:1
    //出厂时间
    carLeaveDate: '请选择时间',
    carLeaveDateCheck: false,
    //登记时间
    carFirstRegisterDate: '请选择时间',
    carFirstRegisterDateCheck: false,
    //上牌时间
    carLicenseDate: '请选择时间',
    carLicenseDateCheck: false,
    //年检有效期
    carPeriodDate: '请选择时间',
    carPeriodDateCheck: false,
    //交强险有效期
    carCompulsoryDate: '请选择时间',
    carCompulsoryDateCheck: false,
    //商业险有效期
    carCommercialDate: '请选择时间',
    carCommercialDateCheck: false,
    //按钮不可点
    dataInfoDisabled: true,
   


   //submit
   submit:false,
   businessNo:'H016201811260008'
  },
  //swiper切换
  tabsHandler (e) {
    var that = this;
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }
  },
  swiperTab (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  carInfobtnCheck (vinCheck,modelCheck,plateNumberCheck,transferCountCheck,regionCheck,carColourCheck,carInsuranceCheck,carAssessCheck,appraiserCheck) {
    if (vinCheck && modelCheck && plateNumberCheck && transferCountCheck && regionCheck && carColourCheck && carInsuranceCheck && carAssessCheck && appraiserCheck) {
      this.setData({
        carInfoDisabled: false,
      })
    } else {
      this.setData({
        carInfoDisabled: true,
      })
    }
  },
  dataInfobtnCheck (carLeaveDateCheck,carFirstRegisterDateCheck,carLicenseDateCheck,carPeriodDateCheck,carCompulsoryDateCheck,carCommercialDateCheck) {
    if (carLeaveDateCheck && carFirstRegisterDateCheck && carLicenseDateCheck && carPeriodDateCheck && carCompulsoryDateCheck && carCommercialDateCheck) {
      this.setData({
        dataInfoDisabled: false,
      })
    } else {
      this.setData({
        dataInfoDisabled: true,
      })
    }
  },
  //车架号填写
  vinHandler (e) {
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
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
    
  },
  //车牌号
  plateNumberHandler (e){
    var plate_check = /^[\u4e00-\u9fa5]{1}[A-HJ-NP-Za-hj-np-z]{1}[\dA-HJ-NP-Za-hj-np-z]{5}$|^[\u4e00-\u9fa5]{1}[A-HJ-NP-Za-hj-np-z]{1}[\dA-HJ-NP-Za-hj-np-z]{6}$/;

    this.setData({
      plateNumberCheck: plate_check.test(e.detail.value)
    })
    if (this.data.plateNumberCheck) {
      this.setData({
        errorTip: '',
        plateNumber: e.detail.value.toUpperCase()
      })
      
    } else {
      this.setData({
        errorTip: '请输入车牌号，以汉字开头',
        plateNumber: e.detail.value.toUpperCase()
      })
    }
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
    //console.log(this.data.plateNumber)
  },
  //过户
  transferCountHandler(e) {
    //console.log(e.detail.value)
    if (e.detail.value != '' && (!isNaN(e.detail.value)) && parseInt(e.detail.value) < 100) {
      this.setData({
        errorTip: '',
        transferCount: e.detail.value,
        transferCountCheck: true
      })

    } else if (e.detail.value == '') {
      this.setData({
        errorTip: '',
        transferCount: e.detail.value,
        transferCountCheck: false
      })
    } else if (isNaN(e.detail.value)) {
      this.setData({
        errorTip: '请输入数字',
        transferCount: e.detail.value,
        transferCountCheck: false
      })
    } else if (parseInt(e.detail.value) > 100) {
      //console.log('ee')
      this.setData({
        errorTip: '过户次数不能超过101',
        transferCount: e.detail.value,
        transferCountCheck: false
      })
    }
    //console.log(this.data.vinCheck, this.data.regDateCheck, this.data.regionCheck, this.data.transferCountCheck)
      this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
  },
  
  //车身颜色
  carColourHandler (e) {
    this.setData({
      carColour: this.data.carColourList[e.detail.value].name,
      carColourCode: this.data.carColourList[e.detail.value].code,
      carColourCheck:true
    })
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)

  },
  //车辆保险
  carInsuranceHandler (e) {
    this.setData({
      carInsurance: this.data.carInsuranceList[e.detail.value].name,
      carInsuranceCode: this.data.carInsuranceList[e.detail.value].code,
      carInsuranceCheck:true
    })
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)

  },
  //评估方式
  carAssessHandler (e) {
    this.setData({
      carAssess: this.data.carAssessList[e.detail.value].name,
      carAssessCode: this.data.carAssessList[e.detail.value].code,
      carAssessCheck:true
    })
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)

  },
  //门店是否有评估师
  appraiserHandler (e) {
    //console.log(e)
    this.setData({
      appraiser: this.data.appraiserList[e.detail.value].name,
      appraiserCode: this.data.appraiserList[e.detail.value].code,
      appraiserCheck:true
    })
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)

  },
  
  //保存车辆信息按钮
  saveCarInfo(){
    if (this.data.carInfoDisabled) return
    $Toast({
      content: '保存成功',
      type: 'success'
    });
    wx.setStorageSync('carInfoJson', {        
      carframeNo: this.data.vin,
      carModels: this.data.carModels,
      // 车型ID 
      carTypeId: this.data.modelId,
      //车牌号
      plateNumber:this.data.plateNumber,
      //过户次数
      transferCount:this.data.transferCount,
      //车牌归属省份
      placeProvince:this.data.proName,
      //车牌归属省份CODE
      placeProvinceCode:this.data.placeProvinceCode,
      //车牌归属城市
      placeCity:this.data.region,
      //车牌归属城市CODE
      placeCityCode:this.data.zone,
      carColour:this.data.carColour,
      carColourCode:this.data.carColourCode,
      carInsurance:this.data.carInsurance,
      carInsuranceCode:this.data.carInsuranceCode,
      carAssess:this.data.carAssess,
      carAssessCode:this.data.carAssessCode,
      appraiser:this.data.appraiser,
      appraiserCode:this.data.appraiserCode,
    });
    //console.log(wx.getStorageSync('carInfoJson'))
    this.setData({currentTab:1,carInfoDone:true})
    if(this.data.carInfoDone && this.data.dataInfoDone){
      this.setData({submit:true})
    }
  },







 submitCarInfo() {
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
    //console.log(this.data.carInfoDone,this.data.dataInfoDone)
    if(!this.data.carInfoDone){
      $Toast({
        content: '车辆信息未保存',
        type: 'error'
      });
      return false
    }
    if(!this.data.dataInfoDone){
      $Toast({
        content: '时间信息未保存',
        type: 'error'
      });
      return false
    }
     $Toast({
      content: '提交中',
      type: 'loading',
      duration: 0,
      mask: false
    });
    var requestData = {
      userUuid:app.globalData.userId,
      businessNo:this.data.businessNo,
      carInfoJson:wx.getStorageSync('carInfoJson'),
      dateInfoJson:wx.getStorageSync('dateInfoJson'),
      token: app.globalData.token,
      clientId: app.globalData.clientId
    };
    reso(requestData, 'car-info/submit-car-info').then(
       data => {
        if (data.code == '0000') {
          $Toast({
            content: '提交成功',
            type: 'success',
          });
          wx.navigateTo({
            url: '/pages/clientInformation/index'
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
  //车辆出产时间
  carLeaveDateHandler(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carLeaveDate: e.detail.value,
      carLeaveDateCheck: true,
    })
    this.dataInfobtnCheck(this.data.carLeaveDateCheck,this.data.carFirstRegisterDateCheck,this.data.carLicenseDateCheck,this.data.carPeriodDateCheck,this.data.carCompulsoryDateCheck,this.data.carCommercialDateCheck)
  },
  //车辆初次登记时间
  carFirstRegisterDateHandler(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carFirstRegisterDate: e.detail.value,
      carFirstRegisterDateCheck: true,
    })
    this.dataInfobtnCheck(this.data.carLeaveDateCheck,this.data.carFirstRegisterDateCheck,this.data.carLicenseDateCheck,this.data.carPeriodDateCheck,this.data.carCompulsoryDateCheck,this.data.carCommercialDateCheck)

  },
  //首次上牌时间
  carLicenseDateHandler(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carLicenseDate: e.detail.value,
      carLicenseDateCheck: true,
    })
    this.dataInfobtnCheck(this.data.carLeaveDateCheck,this.data.carFirstRegisterDateCheck,this.data.carLicenseDateCheck,this.data.carPeriodDateCheck,this.data.carCompulsoryDateCheck,this.data.carCommercialDateCheck)

  },
  //年检有效期
  carPeriodDateHandler(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carPeriodDate: e.detail.value,
      carPeriodDateCheck: true,
    })
    this.dataInfobtnCheck(this.data.carLeaveDateCheck,this.data.carFirstRegisterDateCheck,this.data.carLicenseDateCheck,this.data.carPeriodDateCheck,this.data.carCompulsoryDateCheck,this.data.carCommercialDateCheck)

  },
  //交强险有效期
  carCompulsoryDateHandler(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carCompulsoryDate: e.detail.value,
      carCompulsoryDateCheck: true,
    })
    this.dataInfobtnCheck(this.data.carLeaveDateCheck,this.data.carFirstRegisterDateCheck,this.data.carLicenseDateCheck,this.data.carPeriodDateCheck,this.data.carCompulsoryDateCheck,this.data.carCommercialDateCheck)

  },
  //商业险有效期
  carCommercialDateHandler(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      carCommercialDate: e.detail.value,
      carCommercialDateCheck: true,
    })
    this.dataInfobtnCheck(this.data.carLeaveDateCheck,this.data.carFirstRegisterDateCheck,this.data.carLicenseDateCheck,this.data.carPeriodDateCheck,this.data.carCompulsoryDateCheck,this.data.carCommercialDateCheck)

  },
  //时间信息保存
   saveDataInfo(){
    if (this.data.dataInfoDisabled) return
    $Toast({
      content: '保存成功',
      type: 'success'
    });
    wx.setStorageSync('dateInfoJson', {        
      carLeaveDate: this.data.carLeaveDate,
      carFirstRegisterDate:this.data.carFirstRegisterDate,
      carLicenseDate: this.data.carLicenseDate,
      carLicenseDate: this.data.carLicenseDate,
      carPeriodDate:this.data.carPeriodDate,
      carCompulsoryDate:this.data.carCompulsoryDate,
      carCommercialDate:this.data.carCommercialDate,
    });
    console.log(wx.getStorageSync('dateInfoJson'))
    this.setData({dataInfoDone:true})
    if(this.data.carInfoDone && this.data.dataInfoDone){
      this.setData({submit:true})
    }
  },


  //城市
  //城市选择
  addressShowHandler() {
    let resData = {
      token: app.globalData.token,
      clientId: app.globalData.clientId
    }
    reso(resData, 'car-info/gain-car-option').then(data => {
      if (data.code == '0000') {
        //console.log(data.data)
        this.setData({
          
          hotCityList: data.data.cityInfoList,
          allAddressList: data.data.provinceInfo,
        })
      } else {
        // $Toast({
        //   content: data.message,
        //   type: 'error'
        // });
      }
    }).catch(function (reason) {
      // console.log(reason);
    });
    this.setData({
      addressShow: true,
      proShow: true,
    })
    this.animation.bottom(0).step({
      duration: 400
    })
    this.setData({
      animationAddress: this.animation.export()
    })
  },
  //城市选择弹框关闭
  addressHideHandler() {
    this.setData({
      addressShow: false,
      animationAddress: {},
    })
  },
  HotCityHandler(e) {
    this.setData({
      zone: e.currentTarget.dataset.citycode,
      addressShow: false,
      region: e.currentTarget.dataset.cityname,
      regionCheck: true,
      darkColor3: true,
      animationAddress: {},
      proName:e.currentTarget.dataset.provincename,
      placeProvinceCode:e.currentTarget.dataset.provincecode
    })
    //console.log(this.data.vinCheck , this.data.regDateCheck , this.data.regionCheck , this.data.mileCheck)
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
  
    //console.log(this.data.zone)
  },
  allProHandler(e) {
    //console.log(e)
    var provInitial = e.currentTarget.dataset.provinitial
    this.setData({
      cityShow: true,
      proShow: false,
      proName: e.currentTarget.dataset.provname,
      placeProvinceCode:e.currentTarget.dataset.provcode
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
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
   
    //console.log(this.data.zone)
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
      function(data) {
        if (data.code == '0000') {
          $Toast.hide();
          that.setData({
            modelName: data.data.modelName,
            modelId: data.data.modelId,
            modelCheck: true,
            darkColor1: true,
            carModels:data.data.brandName+'/'+data.data.seriesName+'/'+data.data.modelName
          })
          if (data.data.modelName.length >= 26) {
            that.setData({
              wrap: true,
            })
          } else {
            that.setData({
              wrap: false
            })
          }
          //console.log('that.data.modelId', that.data.modelCheck)
          this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
          

        } else {
          $Toast({
            content: data.message,
            type: 'error'
          });
        }
      }
    ).catch(function(reason) {
      //console.log(reason);
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
    let resData = {
      token: app.globalData.token,
      clientId: app.globalData.clientId
    }
    reso(resData, 'car-info/gain-car-option').then(data => {
      if (data.code == '0000') {
        this.setData({
          // carColourList: data.data.colourList,
          // carInsuranceList: data.data.carInsuranceList,
          // carAssessList: data.data.carAssessList,
          // appraiserList: data.data.appraiserList,
         // hot_model_list: data.data.carInfoList,
          choose_model_list: data.data.carInfo,
          // hotCityList: data.data.cityInfoList,
          // allAddressList: data.data.provinceInfo,
        })
      } else {
      }
    }).catch(function (reason) {

    });
    this.setData({
      // modelBottom:-1000+'rpx', 
      modelShow: true,
      brandsShow: true,
    })
    this.animation.bottom(0).step({
      duration: 400
    })
    this.setData({
      animation: this.animation.export()
    })
  },
  chooseHotBrandHandler(e) {
    for (var i = 0; i < this.data.hot_model_list.length; i++) {
      var item = this.data.hot_model_list[i]
      if (item.carSeriesDivideList) {
        this.setData({
          HotBrandIndex: e.currentTarget.dataset.index,
          brandsShow: false,
          seriesShow: true,
          //hot:true,
          carSeriesDivideList: this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList,
          brandName: this.data.hot_model_list[this.data.HotBrandIndex].bandName
        })
      } else {
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
    this.setData({
      seriesShow: false,
      typeShow: true
    })
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
            } else {
              this.setData({
                seriesShow: false,
                typeShow: false,
                modelShow: false,
                modelName: this.data.hot_model_list[this.data.HotBrandIndex].carSeriesDivideList[i].carSeriesList[j].seriesName,
                wrap: false
              })
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
            //hot: true,
            my_carSeriesDivideList: this.data.choose_model_list[i].carInfoList[e.currentTarget.dataset.index].carSeriesDivideList,
            my_brandName: this.data.choose_model_list[i].carInfoList[e.currentTarget.dataset.index].bandName,
            choose_model_list_list: this.data.choose_model_list[i]
          })
        } else {
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
    this.setData({
      my_seriesShow: false,
      my_typeShow: true
    })

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
            } else {
              this.setData({
                my_seriesShow: false,
                my_typeShow: false,
                modelShow: false,
                modelName: this.data.choose_model_list_list.carInfoList[this.data.chooseBrandIndex].carSeriesDivideList[i].carSeriesList[j].seriesName,
                wrap: false
              })
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
      darkColor1: true,
      animation:{},
      carModels:this.data.brandName+'/'+this.data.seriesName+'/'+e.currentTarget.dataset.modelname
    })
    if (e.currentTarget.dataset.modelname.length >= 26) {
      this.setData({
        wrap: true
      })
    } else if (e.currentTarget.dataset.modelname.length < 26) {
      this.setData({
        wrap: false
      })
    }
    //console.log(this.data.carModels)
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
    
  },
  chooseTypeHandler(e) {
    //console.log(e.currentTarget.dataset.modelname.length)
    this.setData({
      my_typeShow: false,
      modelName: e.currentTarget.dataset.modelname,
      modelId: e.currentTarget.dataset.modelid,
      modelShow: false,
      modelCheck: true,
      darkColor1: true,
      animation:{},
      carModels:this.data.my_brandName+'/'+this.data.my_seriesName+'/'+e.currentTarget.dataset.modelname
    })
    if (e.currentTarget.dataset.modelname.length >= 26) {
      this.setData({
        wrap: true
      })
    } else if (e.currentTarget.dataset.modelname.length < 26) {
      this.setData({
        wrap: false
      })
    }
    this.carInfobtnCheck(this.data.vinCheck,this.data.modelCheck,this.data.plateNumberCheck,this.data.transferCountCheck,this.data.regionCheck,this.data.carColourCheck,this.data.carInsuranceCheck,this.data.carAssessCheck,this.data.appraiserCheck)
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(wx.getStorageSync('dateInfoJson')){
      var dateInfo=wx.getStorageSync('dateInfoJson')
        this.setData({
          carCommercialDate:dateInfo.carCommercialDate,
          carCommercialDateCheck:true,
          carCompulsoryDate:dateInfo.carCompulsoryDate,
          carCompulsoryDateCheck:true,
          carFirstRegisterDate:dateInfo.carFirstRegisterDate,
          carFirstRegisterDateCheck:true,
          carLeaveDate:dateInfo.carLeaveDate,
          carLeaveDateCheck:true,
          carLicenseDate:dateInfo.carLicenseDate,
          carLicenseDateCheck:true,
          carPeriodDate:dateInfo.carPeriodDate,
          carPeriodDateCheck:true,
          dataInfoDisabled:false,
          dataInfoDone:true,
        })
    }
    if(wx.getStorageSync('carInfoJson')){
      //console.log(wx.getStorageSync('carInfoJson'))
      var carInfo=wx.getStorageSync('carInfoJson')
      if (carInfo.carModels.split('/')[2].length >= 26) {
        this.setData({
          wrap: true
        })
      } else if (carInfo.carModels.split('/')[2].length < 26) {
        this.setData({
          wrap: false
        })
      }
        this.setData({
          appraiser:carInfo.appraiser,
          appraiserCode:carInfo.appraiserCode,
          appraiserCheck:true,
          carAssess:carInfo.carAssess,
          carAssessCode:carInfo.carAssessCode,
          carAssessCheck:true,
          carColour:carInfo.carColour,
          carColourCode:carInfo.carColourCode,
          carColourCheck:true,
          carInsurance:carInfo.carInsurance,
          carInsuranceCode:carInfo.carInsuranceCode,
          carInsuranceCheck:true,
          carModels:carInfo.carModels,
          modelId:carInfo.carTypeId,
          modelName:carInfo.carModels.split('/')[2],
          modelCheck:true,
          vin:carInfo.carframeNo,
          vinCheck:true,
          region:carInfo.placeCity,
          zone:carInfo.placeCityCode,
          regionCheck:true,
          proName:carInfo.placeProvince,
          placeProvinceCode:carInfo.placeProvinceCode,
          plateNumber:carInfo.plateNumber,
          plateNumberCheck:true,
          transferCount:carInfo.transferCount,
          transferCountCheck:true,
          carInfoDisabled:false,
          carInfoDone:true
        })
    }
    if(wx.getStorageSync('carInfoJson')&&wx.getStorageSync('dateInfoJson')){
      this.setData({submit:true})
    }
    //console.log(wx.getStorageSync('dateInfoJson'))
    //console.log(options)
    //this.setData({businessNo:options.businessNo})
    let resData = {
      token: app.globalData.token,
      clientId: app.globalData.clientId
    }
    reso(resData, 'car-info/gain-car-option').then(data => {
      if (data.code == '0000') {
        this.setData({
          carColourList: data.data.colourList,
          carInsuranceList: data.data.carInsuranceList,
          carAssessList: data.data.carAssessList,
          appraiserList: data.data.appraiserList,
          hot_model_list: data.data.carInfoList,
          // choose_model_list: data.data.carInfo,
          // hotCityList: data.data.cityInfoList,
          // allAddressList: data.data.provinceInfo,
        })
      } else {
      }
    }).catch(function(reason) {
     
    });
   
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.animation = wx.createAnimation()
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