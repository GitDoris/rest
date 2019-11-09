<template>
  <div>
    <hx-table
      ref="hxtableComponent"
      :tableItems="tableParam"
      @btn-click="method"
      @operate-column-click="columnClick"
    ></hx-table>
    <!--播放视频 @close="closePlay"-->
    <el-dialog
      title="视频播放"
      :visible.sync="dialogVisible"
      width="900px"
      custom-class="vplayer"
      :before-close="handleClose"
    >
      <div
        id="videoBox"
        ref="videoBoxRef"
      >
        <!-- <video controls="controls"  poster preload="auto" width="840"  ref="videoRef" height="474"   muted >
        <source :src="videoSource" type="video/mp4" ref="videoSource">
        <track :src="videoSrt" kind="subtitle" srclang="zh" label="Chinese" ref="videoSrt">
        您的浏览器版本过低，不支持在线播放！.
      </video> -->
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
    <!-- <a  target="_blank" :download="href">下载{{href}}</a> -->

  </div>
</template>

<script>
import {
  media,
  
} from "@/api/getTable.js";
import HxTable from "@/components/huaxia/HxTable/queryTableCollection";
import DialogTable from "@/components/huaxia/HxTable/dialogTable";
import searchLabel from "./json/searchLabel";
import tableLabel from "./json/tableLabel";
import cloneDeep from "lodash/cloneDeep";
import { Message, MessageBox } from "element-ui";
// import download from "@/utils/download.js";
import { saveAs } from 'file-saver';


export default {
  components: {
    DialogTable,
    HxTable
  },
  data() { 
    return {
      value:'',
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
        tableData: [],
        queryTables: {
          queryParas: cloneDeep(searchLabel),
          param: {
            pageNum: 1,
            pageSize: 10
          }
        },
        downloadUrl: {},
      },
      handleDownloadCode: [],
      handleDownloadLable: [],
      href: "",
      videoSource: "",
      videoSrt: "",
      videoEle: null,
      videoBox: null,
      videoId: null,
    };
  },
  created() {
    this.getSearch(this.tableParam.queryTables.param);
    // this.getConfgiBase("video_type");
  },
  methods: {
    handleClose(done) {
      this.closePlay();
      done();

    },
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
      param.mediaType = '0'
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
      let _this = this;
      if (operateType == "play") {

        this.dialogVisible = true;
        // let param = {
        //   tenantId: row.tenantId,
        //   videoType: row.videoType,
        //   fileName: row.videoName,
        //   category: row.businessNo
        // };
        // let paramSrt = {
        //   tenantId: row.tenantId,
        //   videoType: row.videoType,
        //   fileName: row.videoName + ".srt",
        //   category: row.businessNo
        // };
        // getFilePath(param).then(data => {
        //   if (data.code == 0) {
        //     var videoSource = data.data;
            var videoEle = document.createElement('video');
            videoEle.setAttribute("controls", "controls")
            videoEle.setAttribute("width", "840")
            videoEle.setAttribute("height", "474")
            videoEle.setAttribute("autoplay", "autoplay")
            videoEle.setAttribute("id", "videoId")
            videoEle.setAttribute("ref", "videoRef")
        //     console.log(videoEle)
        //     getFilePath(paramSrt).then(data => {
        //       if (data.code == 0) {
        //         var videoSrt = data.data;
                
                

                videoEle.innerHTML = '<source src="' + row.imageUrl + '" type="video/mp4" ref="videoSource">';
                // videoEle.innerHTML += '<track src="' + videoSrt + '" kind="subtitle" srclang="zh" label="Chinese" ref="videoSrt">您的浏览器版本过低，不支持在线播放！.';
                document.getElementById("videoBox").appendChild(videoEle);
                require("@/utils/videosub-0.9.9.js");

                

        //         setTimeout(() => {
        //          func.videosub_main() 
        //         }, 500);
        //       } else {
        //         this.$message.error("视频字幕加载失败！");
        //       }
        //     });
        //   } else {
        //     this.$message.error("视频加载失败！");
        //   }
        // });
      }
      if (operateType == "download") {
        let param = {
          videoType: row.videoType,
          fileName: row.videoName,
          tenantId: row.tenantId,
          category: row.businessNo
        };
        getFilePath(param).then(response => {
          // window.open(response.data,'_blank')
          // var FileSaver = require('file-saver');
          // var blob = new Blob([row.videoName], {type: "video/mp4"});
          // console.log(blob);

          // FileSaver.saveAs(blob, row.videoName+".mp4");
          _this.tableParam.downloadUrl = {
            downName: row.videoName,
            downUrl: response.data
          }
          let newUrl = URL.createObjectURL(response.data)
          console.log(newUrl);
          
          let blob = new Blob([newUrl], { type: 'video/mp4' });
          var filename = row.videoName+".mp4";
          var a = document.createElement('a');
          var url = window.URL.createObjectURL(blob);
          a.href = url;
          a.download = filename;
          var body = document.getElementsByTagName('body')[0];
          body.appendChild(a);
          a.click();
          body.removeChild(a);
          window.URL.revokeObjectURL(url)



          // download(response.data, row.videoName, "video/mp4");
          //location.assign(response.data)
        });
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
