<template>
  <div>
    <hx-table
      ref="hxtableComponent"
      :tableItems="tableParam"
      @btn-click="method"
      @operate-column-click="columnClick"
    ></hx-table>
    <el-dialog
      title="图片查看"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div>
        <img style="width:700px;margin:0 auto;display:block" :src="src" alt="">
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="closePlay"
        >关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
 media
} from "@/api/getTable.js";
import HxTable from "@/components/huaxia/HxTable/queryTableCollection";
import DialogTable from "@/components/huaxia/HxTable/dialogTable";
import searchLabel from "./json/searchLabel";
import tableLabel from "./json/tableLabel";
import cloneDeep from "lodash/cloneDeep";
import { Message, MessageBox } from "element-ui";
import { saveAs } from 'file-saver';


export default {
  components: {
    DialogTable,
    HxTable
  },
  data() {
    return {
      dialogVisible: false,
      videoDisble: false,
      videoType: "",
      tableParam: {
        isShoweds: {
          // 是否显示集合
          pageIsShow: true, // 分页是否显示
          tableIsShow: 1, // 表格是否显示: 1-显示表格; 0-没有符合搜索条件的单子; 2-队列中没有单子
          isSearch: true, // 搜索框是否显示
          showToolTitle: true, //是否显示路由中定义的title
          tableIsAllChange: false //多选
        },
        pageHelpers: {
          pageSizes: [10, 20, 30, 40, 50, 100], // 每页条数下拉选项
          pageSize: 10, // 每页条数
          totalSum: 10, // 表格数据总数
          currentPage: 1 // 默认当前页
        },
        tableLables: cloneDeep(tableLabel),
        tableData: [
          {
            'businessNo' : 'A3748595734933M',
            'videoName' : 'A134567M_远程审核照片_20190711121123',
            'img' : 'https://p1.ssl.qhimg.com/t0151320b1d0fc50be8.png',
            'customerName' : '里尔',
            'idCard' : '3628********1022',
            'size' : '10',
            'videoCreatedTime' : '2018-09-09 12：00：00',
            'uploadTime' : '2018-09-09 12：00：00',
            'videoCreator' : '张丹',
          },
          {
            'businessNo' : 'A3748595734933M',
            'videoName' : 'A134567M_远程审核照片_20190711121123',
            'img' : 'https://p1.ssl.qhimg.com/t0151320b1d0fc50be8.png',
            'customerName' : '里尔',
            'idCard' : '3628********1022',
            'size' : '10',
            'videoCreatedTime' : '2018-09-09 12：00：00',
            'uploadTime' : '2018-09-09 12：00：00',
            'videoCreator' : '张丹',
          },
        ],
        queryTables: {
          queryParas: cloneDeep(searchLabel),
          param: {
            pageNum: 1,
            pageSize: 10
          }
        },
        downloadUrl: {},
      },
      src:''
    };
  },
  mounted() {
    this.getSearch(this.tableParam.queryTables.param);
    // this.getConfgiBase("video_type");
  },
  methods: {
    /*字典库初始化*/
    getConfgiBase(param) {
      configBase(param).then(data => {
        this.tableParam.queryTables.queryParas[2].options = [];
        data.data.forEach(item => {
          let obj = {};
          obj["value"] = item.itemKey;
          obj["label"] = item.itemValue;
          this.tableParam.queryTables.queryParas[2].options.push(obj);
        });
      });
    },
    /* 根据条件查找 */
    getSearch(param) {
       param.mediaType = '1'
      media(param).then(data => {
        if (data.code == "0") {
          if (data.data.list.length > 0) {
            const array = data.data.list;
            array.forEach(item => {
              item["size"] = (item.videoSize / 1024).toFixed(2);
            });
            array.forEach(item => {
              item["length"] = item.videoTime / 1000;
            });
            this.tableParam.isShoweds.tableIsShow = 1;
            this.tableParam.isShoweds.pageIsShow = true;
            this.tableParam.tableData = array;
            this.tableParam.pageHelpers.totalSum = data.data.total;
          } else {
            this.tableParam.tableData = [];
            this.tableParam.isShoweds.pageIsShow = false;
          }
        }
      });
    },

    /* 操作栏点击 */
    columnClick(operateType, row) {
      if (operateType == "play") {
        this.dialogVisible = true;
        this.src = row.imageUrl
           
      }
      if (operateType == "download") {
        
          var a = document.createElement('a');
          a.href = row.imageUrl;
          a.download = row.mediaName;
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(a);
          a.click();
          body.removeChild(a);
        



          // download(response.data, row.videoName, "video/mp4");
          //location.assign(response.data)
        }
      },
    
    closePlay() {
      this.videoEle = null;
      this.dialogVisible = false;
      var videoBoxDom = document.getElementById("videoBox")
      var videoIdDom = document.getElementById("videoId");

      while (videoBoxDom.hasChildNodes()) //当div下还存在子节点时 循环继续
      {
        videoBoxDom.removeChild(videoBoxDom.firstChild);
      }

    },
    method(key, data) {
      switch (key) {
        case "search": // 搜索事件
          this.getSearch(data);
          break;
        case "reSet": // 检索重置
          this.tableParam.pageHelpers = {
            pageSizes: [10, 20, 30, 40, 50, 100], // 每页条数下拉选项
            pageSize: 10, // 每页条数
            totalSum: 10, // 表格数据总数
            currentPage: 1 // 默认当前页
          };
          this.tableParam.queryTables.param = {
            pageNum: 1,
            pageSize: 10
          };
          this.getSearch(this.tableParam.queryTables.param);
          break;
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

<style scoped>
.vplayer {
  background-color: #31302f !important;
}
</style>
