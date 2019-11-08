// pages/forgetPassword/index.js
import { reso } from '../../utils/configRequest.js'
// import { getNVCVal } from '../../utils/guide.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uName:'',
    newPwd: '',
    smsCode:'',
    regNewPwd: false,
    newpwdtype: true,
    eye2: true,
    getCodeShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  /**
   * 获取验证码
  */
  getauthCode:function(e){
    if (this.data.uName == '' || this.data.newPwd == '' || !this.data.regNewPwd){
      wx.showToast({
        title: '用户名或密码缺少或密码少于6位！',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }else{
      //验证成功
      let data ={
        userCode: this.data.uName,
        sessionId: "93kd9j39sjd923jf",
        nvcVal: "%7B%22a%22%3A%22CF_APP_1%22%2C%22c%22%3A%221542180319445%3A0.40557069807102564%22%2C%22d%22%3A%22nvc_register%22%2C%22h%22%3A%7B%22key1%22%3A%22code0%22%2C%22nvcCode%22%3A400%7D%2C%22j%22%3A%7B%22test%22%3A1%7D%2C%22b%22%3A%22113%23k4EzQafFfuKvba4AhBSw16F6bOk6DQxvDskCk6x9o9KbbYoYkWIc16f6bFiYgDaXDYDWkpxsoYbxKx9fkF5ofyvRGp7WsokXDXk6xWbwoYbkbYoYk0Rxb6F6bDv2DSiboYD6k3onoYhjh71BMW5DbKf680iOs5VRouoXk0inoxIfeyKCCVltwEXo1m7cIvazzbDN9rhvrYeM6YKC%2B90c46ruNGvl9S4mD7vlp9%2F9oFUr5KX81sGUOwZOfdnzhrb1tJC95mJk0uZoAMHF1lo2HJVmoxVxyvvjmzy55CaUk9bmyw9NhYUs0JuKjuzQxmCqkXt7PrUQTM4AXTPxWqtznidLKqxozZq67Nk5%2F0UP7J7DRXbtu3SQborQEaf32vzf6UkA7b1qNZ5qnWuT%2FzWRunQyDurdFlo1fId7meiU5G9QIMF2%2BywGXgCEfEuLUiqyroxESy8E0osFVxQYTW8HqztuCCqDjVAZEuHa%2B40dTR5Li%2FHWqkJspT%2BN8sJJ%22%2C%22e%22%3A%22snDKfCMdFZy4E_sF3mROx74OE7yMQVXc6y4xD0dS0O8ZlBWRa2tQbjrw7NKKFgF2v87JO56t4hpz2lD5ccsnJoCKwuB4NqKUn1IJoBBHvpljHEVFhXj6trnEgu9rWCT-eBS-Ipj8Gw13r2qia87G0dABpkCVNstlx_qIQ52IdvPoT2NJMKOwxiuCWQq4GbST1i-jaDk0BasNF30Qnm6CF6qoL4EO5t4YPFVXkLT-o58%22%2C%22i%22%3Atrue%7D",
        valFlag: "0"
      }
      wx.request({
        url: "http://192.168.15.161:32018/mobile/authapp/huaxia-app-auth/check/sendMessage",
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          //console.log(res.data)
          resolve(res.data);
        }

      });  
  //     wx.showToast({
  //       title: 'true',
  //       icon: 'none',
  //       duration: 1000,
    }
  },

  setUname:function(e){
    this.setData({
      uName: e.detail.value
    })
    
  },
  /*
   *验证新密码
   */
  checkNewPWD: function (e) {
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
  //16位随即数列
  //生成16位随机数
  randomWord: function (randomFlag, min, max) {
    var str = "",
      pos = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1));
      str += arr[pos];
    }
    // console.log(str)
    return str;
  },
  //时间倒数
  getCode:function(e){
     
      this.data.getCodeShow = true;
      let timer = setInterval(() => {
        if (this.count == 0) {
          this.getCodeShow = true;
          this.count = 60;
          clearInterval(timer);
        } else {
          this.count--;
        }
      }, 1000);
    
  },
  /*阿里无痕验证*/
  //第一次获取验证码
  getMessageCode:function(e) {
    var sessionId = this.randomWord(true, 16, 16);
    var userCode = this.data.uName;
    // var params = 'requestStr=' + getNVCVal();
    var params = getNVCVal()
    let sendData = {
      userCode: userCode,
      sessionId: sessionId,
      nvcVal: params,
      valFlag: "0"
    }
    // console.log(sendData)
    // console.log(typeof(sendData))
    if (this.data.uName == "") {
      Toast({
        message: "请输入登陆账户",
        position: 'bottom',
        duration: 2000
      });
    } else {
      sendMessage(sendData).then(data => {
        console.log(data.code)
        console.log(typeof (data.code))

        if (data.code == 400 || data.code == "000") {
          //唤醒滑动验证
          getNC().then(function () {
            NoCaptcha.upLang('cn', {
              'LOADING': "加载中...", //加载
              'SLIDER_LABEL': "请向右滑动验证", //等待滑动
              'CHECK_Y': "验证通过", //通过
              'ERROR_TITLE': "非常抱歉，这出错了...", //拦截
              'CHECK_N': "验证未通过", //准备唤醒二次验证
              'OVERLAY_INFORM': "经检测你当前操作环境存在风险，请输入验证码", //二次验证
              'TIPS_TITLE': "验证码错误，请重新输入" //验证码输错时的提示
            });
            _nvc_nc.reset();
          })
        } else if (data.code == 600) {
          //唤醒刮刮卡
          getSC().then(function () { })
        } else if (data.code == 100 || data.code == 200 || data.code == "0000") {
          //注册成功
          this.getCode();
          alert("register success!")
          nvcReset()
        } else if (data.code == 800 || data.code == 900) {
          //直接拦截
          nvcReset();
          alert("register failed!")
          Toast({
            message: '获取验证码失败',
            position: 'bottom',
            duration: 2000
          });
        } else {
          Toast({
            message: data.message,
            position: 'bottom',
            duration: 2000
          });
        }
        this.btn = true;
      })
    }
  },
  /**
   * 忘记密码
   * 
  */
  forgetPwd:function(e){
       //userCode password msgCode
      let requestData = { userCode: this.data.uName, password: this.data.newPwd, msgCode: this.data.regNum}
      reso(requestData, 'finance/auth').then(
        function (res) {
          if (res.data.authResult == 1) {
            wx.redirectTo({
              url: '/pages/acSuccess/index'
            })
          }
          if (res.data.authResult == 0) {
            wx.redirectTo({
              url: '/pages/acNone/index'
            })
          }
        }
      ).catch(function (reason) {
        console.log(reason);
      });
  },
  /**
     * 创建html
     * 
    */
  parseScript: function (htmlBlock) {
    var parser = new DOMParser();
    return parser.parseFromString(htmlBlock, "text/html");
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // document.head.appendChild(script);
    // scriptStr = "<script src='//g.alicdn.com/sd/nvc/1.1.112/guide.js'></script>"
    // this.parseHtml(scriptStr);
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