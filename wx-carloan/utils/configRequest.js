var host = "http://incsit.huaxiafinance.com/carloan-gateway/mobile/carapp/";//基础api地址
// https://uat-huacai.huaxiafinance.com/carapp/huaxia-car-loan/order/mineOrderList
// http://192.168.11.137:8081/huaxia-car-loan/   
// http://incsit.huaxiafinance.com/carloan-gateway/mobile/
// 去掉 huaxia-car-loan

export var reso = function(data,url){
  var responseData = new Promise(function (resolve, reject){
    
    wx.request({
      url: host + url, 
      method : 'POST',
      data: data,
      header: {
        'content-type': 'application/json;chartset=UTF-8' // 默认值
      },
      success(res) {
        //console.log(res.data)
        resolve(res.data);
      } 
    
    });  
  });
  return responseData;  
}