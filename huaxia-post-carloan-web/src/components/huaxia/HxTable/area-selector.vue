<template>
  <el-row type="flex" :model="areaData">
    <el-col v-if="!isRead">
      <el-input style="width:100%" ref="addrSelect" id="addrSelect" :readonly="true" v-model="areaText"
                :placeholder="placeholderAddrSelect" :suffix-icon="selectArrow" @focus="changeArrow()">
      </el-input>

      <div class="areaBox" v-show="showTab">
        <a ref="tabswarp" id="tabswarp" v-show="showTab" tabindex="0" @focus="outTabs(true)" @blur="outTabs(false)"
           style="background-color: red; width:50%;">
          <el-tabs size="mini" v-show="showTab" type="border-card" style="width:100%" v-model="currTab">
            <el-tab-pane label="省份" size="mini" style="width:85%">
              <div class="city-select province" data-count="province">
                <dl ref="provGroup" v-for="(vals, key) in provList" :key='key' class="clearfix">
                  <dt>{{key}}</dt>
                  <dd>
                    <a v-for="provItem in vals" :key='provItem.code' :title="provItem.address"
                       :data-code="provItem.code" :class="[currPro==provItem.code ? 'active' : '']"
                       @click="doActCurrPro($event)">{{provItem.address}}</a>
                  </dd>
                </dl>
              </div>
            </el-tab-pane>

            <el-tab-pane size="mini" label="城市">
              <div class="city-select city" data-count="city" style="display: block;">
                <dl class="clearfix">
                  <dd>
                    <a v-for="(val,key) in cityList" :key='key' :title="val" :data-code="key"
                       :class="[currCit==key ? 'active' : '']" @click="doActCurrCit($event)">{{val}}</a>
                  </dd>
                </dl>
              </div>
            </el-tab-pane>

            <el-tab-pane size="mini" label="区县">
              <div class="city-select district" data-count="district" style="display: block;">
                <dl class="clearfix">
                  <dd>
                    <a v-for="(val,key) in distrtList" :key='key' :title="val" :data-code="key"
                       :class="[currDis==key ? 'active' : '']" @click="doActCurrDis($event)">{{val}}</a>

                  </dd>
                </dl>
              </div>
            </el-tab-pane>

          </el-tabs>
        </a>
      </div>
    </el-col>
    <el-col v-else>
      {{areaLable[0]}}{{areaLable[1]}}{{areaLable[2]}}{{currStr}}
    </el-col>

    <el-col v-if="!isRead && isShowMore">
      &nbsp;&nbsp;
      <el-input :placeholder="placeholderStreInput" v-model.lazy="currStr" class="lay-input lay-input-normal"
                style="width:80%" @change="onChange" :maxlength="50">
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
  //import  '@/plate-city-picker.data.js'
  import ChineseDistricts from '@/city-picker.data'

  export default {
    name: 'areaSelector',
    data() {
      return {
        isRead: this.$props.readonly,
        showTab: false,
        currTab: '0',
        currPro: '',
        currCit: '',
        currDis: '',
        provList: ChineseDistricts[86],
        cityList: {},
        distrtList: {},
        selectArrow: 'el-icon-arrow-down',
        areaLable: [],
      };
    },
    props: {
      readonly: [Boolean],
      isShowMore: [Boolean],
      areaData: {
        type: [Object, Array],
        default() {
          return {areaCode: []};
        }
      },
      placeholderAddrSelect: {
        type: [String],
        default() {
          return '请选择省/市/区';
        }
      },
      placeholderStreInput: {
        type: [Array, String],
        default() {
          return '请填写具体地址';
        }
      },

      size: {
        type: String,
        default: 'default'
      },

      // [地址组件校验]
      modelName: {
        type: String, default: () => {
          return "";
        }
      },
    },
    model: {
      prop: 'areaData'
    },

    created() {
    },
    computed: {
      value: {
        set: function (value) {
          if (this.areaData == null) {
            return null;
          }
          this.areaData.areaCode = value;
        },
        get: function () {
          if (this.areaData == null) {
            return null;
          }
          return this.areaData.areaCode;
        }
      },
      currStr: {
        set: function (value) {
          if (this.areaData == null) {
            return null;
          }
          this.areaData.currStrText = value;
        },
        get: function () {
          if (this.areaData == null) {
            return null;
          }
          return this.areaData.currStrText;
        }
      },
      areaText: {
        set: function (value) {
          if (!value) {
            // 当用户删除输入框的全部字符串时，进行清空处理
            this.areaLable = [];
            // 发送变化事件
            this.onChange();
          }
        },
        get: function () {
          let v = "";
          if (this.areaLable) {
            v = this.areaLable.slice(0, 3).join("/");
          }
          return v;
        }
      },

    },

    watch: {
      currStr: function (val, oldval) {
      },
      value: function (val, oldval) {
        this.value = val
        this.init()
      }
    },

    methods: {
      getValue() {
        let data = this.areaData;
        this.$info("getValue: data=" + JSON.stringify(data));
        return this.currStr;
      },
      init() {
        // this.$debug("init: areaData="+JSON.stringify(this.areaData) );
        if (this.value && this.value.length > 0) {
          this.areaLable = [];
          this.currPro = this.value[0];
          for (var keyCode in this.provList) {
            for (var item of this.provList[keyCode]) {
              if (item.code == this.currPro) {
                this.areaLable.push(item.address);
                this.$emit("change", null, this.modelName);
              }
            }
          }
          this.cityList = ChineseDistricts[this.currPro];

          if (this.value[1] && this.value[1].length > 0) {
            this.currCit = this.value[1];
            this.areaLable.push(ChineseDistricts[this.currPro][this.currCit]);
            this.distrtList = ChineseDistricts[this.currCit];
            this.$emit("change", null, this.modelName);
          }

          if (this.value[2] && this.value[2].length > 0) {
            if (this.distrtList) {
              this.currDis = this.value[2];
              this.areaLable.push(ChineseDistricts[this.currCit][this.currDis]);
            }

            // 发送变化事件
            this.onChange();
          }
        }
      },

      outTabs(show) {
        this.showTab = show;
        // console.info("------outTabs-------"+show);
      },
      changeArrow: function (t) {
        // console.info("------changeArrow-------"+t);
        this.showTab = !this.showTab;
        if (this.showTab) {
          this.selectArrow = 'el-icon-arrow-up';
          document.getElementById('tabswarp').focus();
        }

        if (!this.showTab) {
          this.selectArrow = 'el-icon-arrow-down';
        }
      },

      doActCurrPro: function (e) {
        this.areaLable = [];
        this.areaCode = [];

        this.currPro = e.target.dataset.code;
        this.value[0] = this.currPro;
        this.areaLable[0] = e.target.innerText;
        this.cityList = ChineseDistricts[this.currPro];
        this.currTab = '1';
      },
      doActCurrCit: function (e) {
        this.currCit = e.target.dataset.code;
        this.value.splice(1, 2, this.currCit);
        this.areaLable.splice(1, 2, e.target.innerText);
        this.distrtList = ChineseDistricts[this.currCit];
        this.currTab = '2';
      },

      doActCurrDis: function (e) {
        this.currDis = e.target.dataset.code;
        this.value.splice(2, 1, this.currDis);
        this.areaLable.splice(2, 1, e.target.innerText);
        this.areaCode = this.value;
        this.changeArrow();
        // 发送变化事件
        this.onChange();
      },

      // 发送变化事件
      onChange() {
        this.areaData.areaText = this.areaText;
        this.$emit("change", this.areaData, this.modelName);
      },

      /*getStreText: function() {
          this.$emit('getStre',this.currStr);
      }*/
    },
    mounted() {
      this.init();
    }

  };
</script>
<style>
  .city-picker-input {
    opacity: 0 !important;
    top: -9999px;
    left: -9999px;
    position: absolute;
  }

  .city-picker-span {
    position: relative;
    display: block;
    outline: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    border-bottom: 1px solid #ccc;
    background-color: #fff;
    color: #ccc;
    cursor: pointer;
  }

  .city-picker-span > .placeholder {
    color: #aaa;
  }

  .city-picker-span > .arrow {
    position: absolute;
    top: 50%;
    right: 8px;
    width: 10px;
    margin-top: -3px;
    height: 5px;

  }

  .city-picker-span.focus,
  .city-picker-span.open {
    border-bottom-color: #46A4FF;
  }

  .city-picker-span.open > .arrow {
    background-position: -10px -10px;
  }

  .city-picker-span > .title > span {
    color: #333;
    padding: 5px;
    border-radius: 3px;
  }

  .city-picker-span > .title > span:hover {
    background-color: #f1f8ff;
  }

  .city-picker-dropdown {
    position: absolute;
    width: 315px;
    left: -9999px;
    top: -9999px;
    outline: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    z-index: 999999;
    display: none;
    min-width: 330px;
    margin-bottom: 20px;
  }

  .city-select-wrap {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  }

  .city-select-tab {
    border-bottom: 1px solid #ccc;
    background: #f0f0f0;
    font-size: 13px;
  }

  .city-select-tab > a {
    display: inline-block;
    padding: 8px 22px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid transparent;
    color: #4D4D4D;
    text-align: center;
    outline: 0;
    text-decoration: none;
    cursor: pointer;
    font-size: 14px;
    margin-bottom: -1px;
  }

  .city-select-tab > a.active {
    background: #fff;
    border-bottom: 1px solid #fff;
    color: #46A4FF;
  }

  .city-select-tab > a:first-child {
    border-left: none;
  }

  .city-select-tab > a:last-child.active {
    border-right: 1px solid #ccc;
  }

  .city-select-content {
    width: 100%;
    min-height: 10px;
    background-color: #fff;
    padding: 10px 15px;
  }

  .city-select {
    font-size: 13px;
  }

  .city-select dt {
    position: absolute;
    width: 2.5em;
    font-weight: 500;
    text-align: right;
    line-height: 2;
    color: #666;
  }

  .city-select dd {
    margin-left: 0;
    line-height: 2;
  }

  .city-select.province dd {
    margin-left: 3em;
  }

  .city-select a {
    display: inline-block;
    padding: 0 10px;
    outline: 0;
    text-decoration: none;
    white-space: nowrap;
    margin-right: 2px;
    text-decoration: none;
    color: #333;
    cursor: pointer;
  }

  .city-select a:hover,
  .city-select a:focus {
    background-color: #f1f8ff;
    border-radius: 2px;
    color: #46A4FF;
  }

  .city-select a.active {
    background-color: #46A4FF;
    color: #fff;
    border-radius: 2px;
  }
</style>
