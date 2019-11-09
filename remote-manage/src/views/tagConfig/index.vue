<template>
  <div class="tagConfig">
    <div class="btnGroup">
      <el-button @click="newHandler('ruleForm')">新增</el-button>
      <el-button @click="deleteHandler" :disabled="select.length==0">删除</el-button>
      <el-button @click="editHandler" :disabled="select.length==0||select.length>1">编辑</el-button>
    </div>
    <hx-table
      ref="hxtableComponent"
      :tableItems="tableParam"
      @btn-click="method"
      @getSelections="getSelections"
      @getAllSelections="getAllSelections"
    ></hx-table>
    <el-dialog title="远程订单配置" :visible.sync="newDialogVisible" width="50%" center>
      <div>
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="客户标签*" prop="customerTypeList">
            <el-checkbox
              :indeterminate="customer"
              v-model="customerAll"
              @change="customerAllHandler"
            >全选</el-checkbox>
            <el-checkbox-group v-model="ruleForm.customerTypeList" @change="customerHandler">
              <el-checkbox
                v-for="item in customerTypeList"
                :label="item.customerTypeNo"
                :key="item.customerTypeNo"
              >{{item.customerTypeName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="产品名称*" prop="p2pList" style="border:none;padding:0;margin:0">
            <div class="item" style="padding-top:0;">
              <p>p2p</p>
              <div class="right">
                <el-checkbox :indeterminate="p2p" v-model="p2pAll" @change="p2pAllHandler">全选</el-checkbox>
                <el-checkbox-group v-model="ruleForm.p2pList" @change="p2pHandler">
                  <el-checkbox
                    v-for="item in p2pList"
                    :label="item.typeNo"
                    :key="item.typeNo"
                  >{{item.typeName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item label prop="trustList" style="border:none;padding:0">
            <div class="item">
              <p>信托</p>
              <div class="right">
                <el-checkbox :indeterminate="trust" v-model="trustAll" @change="trustAllHandler">全选</el-checkbox>
                <el-checkbox-group v-model="ruleForm.trustList" @change="trustHandler">
                  <el-checkbox
                    v-for="item in trustList"
                    :label="item.typeNo"
                    :key="item.typeNo"
                  >{{item.typeName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item label prop="chunxianList">
            <div class="item" style="border:none;padding:0;">
              <p>纯线</p>
              <div class="right">
                <el-checkbox
                  :indeterminate="chunxian"
                  v-model="chunxianAll"
                  @change="chunxianAllHandler"
                >全选</el-checkbox>
                <el-checkbox-group v-model="ruleForm.chunxianList" @change="chunxianHandler">
                  <el-checkbox
                    v-for="item in chunxianList"
                    :label="item.typeNo"
                    :key="item.typeNo"
                  >{{item.typeName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="进件门店*" prop="storeList" class="scroll">
            <el-checkbox :indeterminate="store" v-model="storeAll" @change="storeAllHandler">全选</el-checkbox>
            <el-checkbox-group v-model="ruleForm.storeList" @change="storeHandler">
              <el-checkbox
                v-for="item in storeList"
                :label="item.orgId"
                :key="item.orgId"
              >{{item.orgName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="进件渠道*" prop="channelList" class="scroll">
            <el-checkbox
              :indeterminate="channel"
              v-model="channelAll"
              @change="channelAllHandler"
            >全选</el-checkbox>
            <el-checkbox-group v-model="ruleForm.channelList" @change="channelHandler">
              <el-checkbox
                v-for="item in channelList"
                :label="item.channelNo"
                :key="item.channelNo"
              >{{item.channelName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="newDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, initNewParam, add , delet ,edit ,loadConfigDetail} from "@/api/tagConfig.js";
import HxTable from "@/components/huaxia/HxTable/queryTableCollection";
import DialogTable from "@/components/huaxia/HxTable/dialogTable";
import searchLabel from "./json/searchLabel";
import tableLabel from "./json/tableLabel";
import cloneDeep from "lodash/cloneDeep";
import { Message, MessageBox } from "element-ui";
// import download from "@/utils/download.js";
import { saveAs } from "file-saver";

export default {
  components: {
    DialogTable,
    HxTable
  },
  data() {
    return {
      value: "",
      dialogVisible: false,
      videoDisble: false,
      videoType: "",
      tableParam: {
        isShoweds: {
          // 是否显示集合
          pageIsShow: true, // 分页是否显示
          tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
          isSearch: false, // 搜索框是否显示
          showToolTitle: false, //是否显示路由中定义的title
          tableIsAllChange: true //多选
        },
        pageHelpers: {
          pageSizes: [10, 20, 30, 40, 50, 100], // 每页条数下拉选项
          pageSize: 10, // 每页条数
          totalSum: 10, // 表格数据总数
          currentPage: 1 // 默认当前页
        },
        tableLables: cloneDeep(tableLabel),
        tableData: [],
        queryTables: {
          queryParas: cloneDeep(searchLabel),
          param: {
            pageNum: 1,
            pageSize: 10
          }
        }
      },
      select:[],
      newDialogVisible: false,
      ruleForm: {
        customerTypeList: [],
        storeList: [],
        channelList: [],
        p2pList: [],
        chunxianList: [],
        trustList: []
      },
      rules: {
        customerTypeList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个客户标签",
            trigger: "change"
          }
        ],
        storeList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个进件门店",
            trigger: "change"
          }
        ],
        channelList: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个进件渠道",
            trigger: "change"
          }
        ]
      },
      checked:false,
      customer: false,
      customerAll: false,
      customerTypeList: [],

      p2p: false,
      p2pAll: false,
      p2pList: [],
      chunxian: false,
      chunxianAll: false,
      chunxianList: [],
      trust: false,
      trustAll: false,
      trustList: [],
      channel: false,
      channelAll: false,
      channelList: [],
      store: false,
      storeAll: false,
      storeList: [],
      initParam:{},
      isAdd:true,
      id:''
    };
  },
  created() {
    this.initNewParam();
    this.getSearch(this.tableParam.queryTables.param);
  },
  methods: {
    /* 根据条件查找 */
    getSearch(param) {
      getPage(param).then(data => {
        if (data.returnCode == "0000") {
          if (data.respObj.resultData.length > 0) {
            this.tableParam.isShoweds.tableIsShow = 1;
            this.tableParam.isShoweds.pageIsShow = true;
            let obj={}, arr=[]
            data.respObj.resultData.forEach(item=>{
              obj ={customer:'',product:'',store:'',channel:''}
              item.customerTypeList.forEach(itemLi=>{
                  // if(itemLi.subLabelName==null) itemLi.subLabelName=''
                   obj.customer+=itemLi.subLabelName+'、'
                  
              })
              obj.customer=obj.customer.slice(0,obj.customer.length-1)
              item.p2pList.forEach(itemLi=>{
                  obj.product+=itemLi.subLabelName+'、'
                  
              })
              item.chunxianList.forEach(itemLi=>{
                obj.product+=itemLi.subLabelName+'、'
                  
              })
              item.trustList.forEach(itemLi=>{
                obj.product+=itemLi.subLabelName+'、'
                  
              })
               obj.product=obj.product.slice(0,obj.product.length-1)
              item.storeList.forEach(itemLi=>{
                  obj.store+=itemLi.subLabelName+'、'
                 
              })
              obj.store=obj.store.slice(0,obj.store.length-1)
              item.channelList.forEach(itemLi=>{
                  obj.channel+=itemLi.subLabelName+'、'
                 
              })
              obj.channel=obj.channel.slice(0,obj.channel.length-1)
              obj.id = item.id
              obj.creator = item.creator
              obj.createdTime = item.createdTime
              // console.log(obj);
            //  console.log(Reflect.enumerate(obj));
             
            arr.push(obj)
            })
            this.tableParam.tableData = arr
            this.tableParam.pageHelpers.totalSum = data.respObj.pagination.totalCount;
          } else {
            this.tableParam.tableData = [];
            this.tableParam.isShoweds.pageIsShow = false;
          }
        }
      });
    },
    initNewParam() {
      initNewParam().then(res => {
        if (res.returnCode == "0000") {
          this.customerTypeList = res.respObj.customerTypeList;
          this.p2pList = res.respObj.productDtoMap.p2p;
          this.chunxianList = res.respObj.productDtoMap.chunxian;
          this.trustList = res.respObj.productDtoMap.trust;
          this.channelList = res.respObj.channelList;
          this.storeList = res.respObj.storeList;
          this.initParam = res.respObj
        }
      });
    },
    customerAllHandler(val) {
      let arr = [];
      this.customerTypeList.forEach(item => {
        arr.push(item.customerTypeNo);
      });
      this.ruleForm.customerTypeList = val ? arr : [];
      this.customer = false;
    },
    customerHandler(value) {
      let checkedCount = value.length;
      this.customerAll = checkedCount === this.customerTypeList.length;
      this.customer =
        checkedCount > 0 && checkedCount < this.customerTypeList.length;
    },
    p2pAllHandler(val) {
      let arr = [];
      this.p2pList.forEach(item => {
        arr.push(item.typeNo);
      });
      this.ruleForm.p2pList = val ? arr : [];
      this.p2p = false;
    },
    p2pHandler(value) {
      let checkedCount = value.length;
      this.p2pAll = checkedCount === this.p2pList.length;
      this.p2p = checkedCount > 0 && checkedCount < this.p2pList.length;
    },
    chunxianAllHandler(val) {
      let arr = [];
      this.chunxianList.forEach(item => {
        arr.push(item.typeNo);
      });
      this.ruleForm.chunxianList = val ? arr : [];
      this.chunxian = false;
    },
    chunxianHandler(value) {
      let checkedCount = value.length;
      this.chunxianAll = checkedCount === this.chunxianList.length;
      this.chunxian =
        checkedCount > 0 && checkedCount < this.chunxianList.length;
    },
    trustAllHandler(val) {
      let arr = [];
      this.trustList.forEach(item => {
        arr.push(item.typeNo);
      });
      this.ruleForm.trustList = val ? arr : [];
      this.trust = false;
    },
    trustHandler(value) {
      let checkedCount = value.length;
      this.trustAll = checkedCount === this.trustList.length;
      this.trust = checkedCount > 0 && checkedCount < this.trustList.length;
    },
    channelAllHandler(val) {
      let arr = [];
      this.channelList.forEach(item => {
        arr.push(item.channelNo);
      });
      this.ruleForm.channelList = val ? arr : [];
      this.channel = false;
    },
    channelHandler(value) {
      let checkedCount = value.length;
      this.channelAll = checkedCount === this.channelList.length;
      this.channel = checkedCount > 0 && checkedCount < this.channelList.length;
    },
    storeAllHandler(val) {
      let arr = [];
      this.storeList.forEach(item => {
        arr.push(item.orgId);
      });
      this.ruleForm.storeList = val ? arr : [];
      this.store = false;
    },
    storeHandler(value) {
      let checkedCount = value.length;
      this.storeAll = checkedCount === this.storeList.length;
      this.store = checkedCount > 0 && checkedCount < this.storeList.length;
    },

    getSelections(data) {
      // console.log(data);
      this.select = data
    },
    getAllSelections(data) {},
    newHandler(formName) {
      this.isAdd = true
      this.newDialogVisible = true;
      // console.log(this.$refs[formName]);
        this.$refs[formName].resetFields();
        this.customerAll = false
        this.customer = false
        this.p2pAll = false
        this.p2p = false
        this.trustAll = false
        this.trust = false
        this.chunxianAll = false
        this.chunxian = false
        this.storeAll = false
        this.store = false
        this.channelAll = false
        this.channel = false
    },
    addSure() {
      console.log(this.ruleForm);
      // console.log(this.customerAll);
      if (this.ruleForm.customerTypeList.length == 0) {
        this.$message.error("请至少选择一个客户标签！");
        return;
      }
      if (
        this.ruleForm.p2pList.length == 0 &&
        this.ruleForm.trustList.length == 0 &&
        this.ruleForm.chunxianList.length == 0
      ) {
        this.$message.error("请至少选择一个产品名称！");
        return;
      }
      if (this.ruleForm.storeList.length == 0) {
        this.$message.error("请至少选择一个进件门店！");
        return;
      }
      if (this.ruleForm.channelList.length == 0) {
        this.$message.error("请至少选择一个进件渠道！");
        return;
      }
      if(this.customerAll) this.ruleForm.customerTypeList = ['all']
      if(this.p2pAll) this.ruleForm.p2pList = ['all']
      if(this.trustAll) this.ruleForm.trustList = ['all']
      if(this.chunxianAll) this.ruleForm.chunxianList = ['all']
      if(this.storeAll) this.ruleForm.storeList = ['all']
      if(this.channelAll) this.ruleForm.channelList = ['all']
      // console.log(this.ruleForm);
      if(this.isAdd){
        add(this.ruleForm).then(res=>{
        if(res.returnCode == '0000'){
          this.$message.success('新增成功')
          this.newDialogVisible = false
          this.getSearch(this.tableParam.queryTables.param);
        }
        else{
           this.$message.error(res.returnMsg)
        }
      })
      }
      else{
         edit({id:this.id,param:this.ruleForm}).then(res=>{
        if(res.returnCode == '0000'){
          this.$message.success('修改成功')
          this.newDialogVisible = false
          this.getSearch(this.tableParam.queryTables.param);
        }
        else{
           this.$message.error(res.returnMsg)
        }
      })
      }
      
    },
    deleteHandler() {
      let param = []
      this.select.forEach(item=>{
        param.push(item.id)
      })
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           delet({ids:param}).then(res=>{
            if(res.returnCode == '0000'){
              this.$message.success('删除成功')
              this.getSearch(this.tableParam.queryTables.param);
            }
          })
        })
     
    },
    editHandler() {
        this.isAdd = false
        this.id=this.select[0].id
      loadConfigDetail({configId:this.id}).then(res=>{
      this.newDialogVisible = true
      res.respObj.customerTypeList.forEach(item=>{
        if(item.subLabelId=='all'){
          this.customerAll = true
          this.initParam.customerTypeList.forEach(itemli=>{
            this.ruleForm.customerTypeList.push(itemli.customerTypeNo)
          })
          return
        }
        else{
          this.customerAll = false
          this.customer = true
          this.ruleForm.customerTypeList.push(item.subLabelId)
        }
      })
      res.respObj.p2pList.forEach(item=>{
        if(item.subLabelId=='all'){
          this.p2pAll = true
          this.initParam.productDtoMap.p2p.forEach(itemli=>{
            this.ruleForm.p2pList.push(itemli.typeNo)
          })
          return
        }
        else{
          this.p2pAll = false
          this.p2p = true
          this.ruleForm.p2pList.push(item.subLabelId)
        }
      })
      res.respObj.trustList.forEach(item=>{
        if(item.subLabelId=='all'){
          this.p2pAll = true
          this.initParam.productDtoMap.trust.forEach(itemli=>{
            this.ruleForm.trustList.push(itemli.typeNo)
          })
          return
        }
        else{
          this.trustAll = false
          this.trust = true
          this.ruleForm.trustList.push(item.subLabelId)
        }
      })
      res.respObj.chunxianList.forEach(item=>{
        if(item.subLabelId=='all'){
          this.chunxianAll = true
          this.initParam.productDtoMap.chunxian.forEach(itemli=>{
            this.ruleForm.chunxianList.push(itemli.typeNo)
          })
          return
        }
        else{
          this.chunxianAll = false
          this.chunxian = true
          this.ruleForm.chunxianList.push(item.subLabelId)
        }
      })
      res.respObj.storeList.forEach(item=>{
        if(item.subLabelId=='all'){
          this.storeAll = true
          this.initParam.storeList.forEach(itemli=>{
            this.ruleForm.storeList.push(itemli.orgId)
          })
          return
        }
        else{
          this.storeAll = false
          this.store = true
          this.ruleForm.storeList.push(item.subLabelId)
        }
      })
      res.respObj.channelList.forEach(item=>{
        if(item.subLabelId=='all'){
          this.channelAll = true
          this.initParam.channelList.forEach(itemli=>{
            this.ruleForm.channelList.push(itemli.channelNo)
          })
          return
        }
        else{
          this.channelAll = false
          this.channel = true
          this.ruleForm.channelList.push(item.subLabelId)
        }
      })
      
      console.log(this.ruleForm);
      })
    },
    method(key, data) {
      switch (key) {
        case "current_change": // 当前页数修改
          this.tableParam.pageHelpers.currentPage = data;
          this.tableParam.queryTables.param.pageNum = this.tableParam.pageHelpers.currentPage;
          this.getSearch(this.tableParam.queryTables.param);
          break;

        case "size_change": // 每页数据条数修改
          this.tableParam.pageHelpers.pageSize = data;
          this.tableParam.queryTables.param.pageSize = this.tableParam.pageHelpers.pageSize;
          this.getSearch(this.tableParam.queryTables.param);
          break;
      }
    }
  }
};
</script>

<style lang='less'>
.tagConfig{
.vplayer {
  background-color: #31302f !important;
}
.btnGroup {
  margin: 20px 20px 0;
}
.el-checkbox-group {
  display: inline;
}
.el-dialog__body {
  position: relative;
}
.el-form-item {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 10px;
  margin-bottom: 10px !important;
}
.el-form-item__label {
  color: #ff0000 !important;
  margin-right: 10px;
}
.el-form-item__content {
  position: static !important;
}
.scroll .el-form-item__content {
  max-height: 120px;
  overflow-y: scroll;
  overflow-x: visible;
}
.el-form-item__error {
  top: unset !important;
  bottom: 20px;
  left: 50% !important;
  margin-left: -66px;
  background: #fff;
}
.item {
  overflow: hidden;
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 10px;
  padding-top: 10px;
  > p {
    float: left;
    margin: 0;
    color: #0055ff;
  }
  .right {
    margin-left: 40px;
    max-height: 80px;
    overflow-y: scroll;
  }
}
}
</style>
