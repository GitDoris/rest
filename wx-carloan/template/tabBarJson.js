//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/index/index",
      "iconPath": "https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/index.png",
      "selectedIconPath": "https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/index_on.png",
      "text": "主页"
    },
    
    {
      "current": 0,
      "pagePath": "/pages/category/category",
      "iconPath": "https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/order.png",
      "selectedIconPath": "https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/order_on.png",
      "text": "进件订单"
    },
    {
      "current": 0,
      "pagePath": "/pages/personCenter/index",
      "iconPath": "https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/home.png",
      "selectedIconPath": "https://raw.githubusercontent.com/zhoupeihuang/markdownPic/master/home_on.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
// function tabbarmain(bindName = "tabdata", id, target) {
//   var that = target;
//   var bindData = {};
//   var otabbar = tabbarinit();
//   otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
//   otabbar[id]['current'] = 1;
//   bindData[bindName] = otabbar
//   that.setData({ bindData });
// }

// module.exports = {
//   tabbar: tabbarmain
// }
 