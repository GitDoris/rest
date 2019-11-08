//***** 为了优化hx - table上百条数据渲染时间长的问题,推出下面解决方案（暂定）*/
//***** 方案原理:递归*/

//*****下面该方法getSearch(取自新贷后垫付管理的线上代码)是获取后端接口并渲染table的方法,

// 来看方法内部,找到”personalLoanPending_search“;

// 该方法是去请求接口,并获取列表数据 ”array“,并赋值给this.tableParam.tableData去渲染我们的table

//解决步骤如下
// 1,将下面 pagationData 方法添加到你的methods里,
// 2,然后增加一个中间变量,取名随意,这里暂定renderData,
// 3,将下面 this.tableParam.tableData = array 数据赋值这一步替换为 this.renderData=array
// 4,在this.renderData=array,其后,调用pagationData()
// 5,进行测试吧,并以此类推

// getSearch(param) {
//   this.handleDownloadCode = [];
//   this.handleDownloadLable = [];
//   param.$vueLoading = true;
//   personalLoanPending_search(param).then(response => {
//     if (response.code === '0000' && response.code !== '8888') {
//       if (response.data.records.length > 0) {
//         const array = response.data.records
//         this.tableParam.isShoweds.tableIsShow = 1
//         this.tableParam.isShoweds.pageIsShow = true
//         this.tableParam.tableData = array
//         this.tableParam.pageHelpers.totalSum = response.data.total
//         // 导出需要的
//         for (let i = 0; i < this.tableParam.tableLables.length; i++) {
//           const codeList = this.tableParam.tableLables[i].code
//           const lableList = this.tableParam.tableLables[i].lable
//           this.handleDownloadCode.push(codeList)
//           this.handleDownloadLable.push(lableList)
//         }
//       } else {
//         this.tableParam.isShoweds.tableIsShow = 2
//         this.tableParam.isShoweds.pageIsShow = false
//       }
//     }
//   })
// }

// pagationData() {
//   if (this.renderData.length >= 40) {
//     let arr = this.renderData.splice(0, 40);
//     this.tableParam.tableData = [...this.tableParam.tableData, ...arr];
//     setTimeout(() => {
//       this.pagationData();
//     }, 300);
//   } else {
//     this.tableParam.tableData = this.tableParam.tableData.concat(this.renderData);
//   }
// }
