<template>
    <el-card class="lay-box-cord">
        <div>
          <div slot="header" class="clearfix layui-elem-quote2" :id="formKey">
             {{this.schemaDt.formTitle}}
            <el-button   class="lay-btn layui-btn-primary lay-btn-mini"
                v-for="item in this.schemaDt.titleButtons" :key="item.key" @click="titleButtonClick($event,item.key)">
                {{item.value}}
            </el-button>
            <!-- 保存功能 -->
            <el-button style="float: right;" ref="actref" class="lay-btn layui-btn-primary lay-btn-mini"
                v-for="item in this.schemaDt.saveBtn" :key="item.key" @click="onButtonClick('actBtn',$event,item.key)" :disabled="buttonDisabled">
                {{item.value}}
            </el-button>
            <!-- 测算功能 -->
              <el-button  style="float: right;" ref="actref" class="lay-btn layui-btn-primary lay-btn-mini"
                  v-for="item in this.schemaDt.actButton" :key="item.key" @click="measureClick('actBtn',$event,item.key)" :disabled="buttonDisabled">
                  {{item.value}}
              </el-button>
          </div>

            <el-form v-if="this.schemaDt.type==='commonform'" ref="actBtn" :model="modelDt" label-position="top"  :inline="true" :rules="computRules" :id="'ID'+formKey">
                <el-row v-for="(formRow,index) in formRows" :key='index'>
                    <template v-for="itemData in formRow" >
                        <el-col v-if="itemData.type==='hidden'" :key="itemData.model">
                            <el-input :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model="modelDt[itemData.model]" type="hidden" style="display:none">
                            </el-input>
                        </el-col>
                        <!--type==tips 带警示 -->
                        <el-col v-if="itemData.type==='warning'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline">{{itemData.label}}
                                    <el-tooltip popper-class="tooltipDanger" v-if="modelDt['warnObj'] && modelDt['warnObj'][itemData.model]">
                                        <div slot="content">
                                            {{itemData.warninfo}}
                                        </div>
                                        <i style="border:0px;margin-left:2px;color:#ff2222" class="el-icon-warning"></i>
                                    </el-tooltip>
                                </div>
                                <div>
                                    {{modelDt[itemData.model]}}
                                </div>
                            </el-form-item>
                        </el-col>

                        <!--type==text. by:qinanyang,当文本存在修改记录是展示三角提示符-->
                        <el-col v-if="itemData.type==='text'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item v-if="warnShow" :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline"> {{itemData.label}} </div>

                                <el-input v-if="!itemData.disabled" class="lay-input lay-input-normal" style="width: 90%;" :required="itemData.required"
                                        :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model.trim="modelDt[itemData.model]"
                                        :placeholder="itemData.placeholder || '请输入内容'" :maxlength="itemData.maxlength || 50">
                                </el-input>

                                <el-tooltip v-if="!itemData.disabled" class="item" effect="light"  placement="bottom">
                                    <div slot="content" style="background:#dd4d39;font:14px;color:#fff;padding:10px 20px 10px 10px;">{{itemData.warnInfo}}</div>
                                    <i style="margin-left:2px;" class="el-icon-warning"></i>
                                </el-tooltip>

                                <div v-else >
                                    {{modelDt[itemData.model] | formatNumber}}
                                </div>
                            </el-form-item>

                            <el-form-item v-else  :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline">{{itemData.label}}
                                </div>

                                <el-input v-if="!itemData.disabled" class="lay-input lay-input-normal" :required="itemData.required" :data-mm="modelDt[itemData.model]"
                                            :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model="modelDt[itemData.model]"
                                            :placeholder="itemData.placeholder || '请输入内容'" :maxlength="itemData.maxlength || 50">
                                </el-input>

                                <div v-else>
                                    {{modelDt[itemData.model]}}
                                </div>
                            </el-form-item>
                        </el-col>
                        <!-- 带按钮的input框 -->
                        <el-col v-if="itemData.type==='textButton'" :span="itemData.colSpan" :key="itemData.model" style="position: relative;">
                            <el-form-item v-if="warnShow" :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" :style="{width:itemData.formWidth+'%'}">
                                <div slot='label' style="display:inline"> {{itemData.label}} </div>

                                <el-input v-if="!itemData.disabled" class="lay-input lay-input-normal" style="width: 90%;" :required="itemData.required"
                                        :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model.trim="modelDt[itemData.model]"
                                        :placeholder="itemData.placeholder || '请输入内容'" :maxlength="itemData.maxlength || 50">
                                </el-input>

                                <el-tooltip v-if="!itemData.disabled" class="item" effect="light"  placement="bottom">
                                    <div slot="content" style="background:#dd4d39;font:14px;color:#fff;padding:10px 20px 10px 10px;">{{itemData.warnInfo}}</div>
                                    <i style="margin-left:2px;" class="el-icon-warning"></i>
                                </el-tooltip>

                                <div v-else >
                                    {{modelDt[itemData.model] | formatNumber}}
                                </div>
                            </el-form-item>

                            <el-form-item v-else  :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" :style="{width:itemData.formWidth+'%'}">
                                <div slot='label' style="display:inline">{{itemData.label}}
                                </div>

                                <el-input v-if="!itemData.disabled" class="lay-input lay-input-normal" :required="itemData.required" :data-mm="modelDt[itemData.model]"
                                            :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model="modelDt[itemData.model]"
                                            :placeholder="itemData.placeholder || '请输入内容'" :maxlength="itemData.maxlength || 50">
                                </el-input>

                                <div v-else>
                                    {{modelDt[itemData.model]}}
                                </div>
                            </el-form-item>

                            <div style="position: absolute;bottom: 10px;" :style="{left:itemData.formWidth+2+'%'}">
                              <el-button class="lay-btn layui-btn-primary lay-btn-mini"
                                  v-for="item in itemData.actButton" :key="item.key"  @click="formButtonClick('formButton',$event,item.key)" :disabled="item.disabled">
                                  {{item.value}}
                              </el-button>
                            </div>
                        </el-col>

                         <!--type==text. by:qinanyang,当文本存在修改记录是展示三角提示符-->
                        <el-col v-if="itemData.type==='number'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item v-if="warnShow" :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline"> {{itemData.label}} </div>

                                <el-input type="number" v-if="!itemData.disabled" class="lay-input lay-input-normal" style="width: 90%;" :required="itemData.required"
                                        :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model.number.trim="modelDt[itemData.model]"
                                        :placeholder="itemData.placeholder || '请输入内容'" :maxlength="itemData.maxlength || 50">
                                </el-input>

                                <el-tooltip v-if="!itemData.disabled" class="item" effect="light"  placement="bottom">
                                    <div slot="content" style="background:#dd4d39;font:14px;color:#fff;padding:10px 20px 10px 10px;">{{itemData.warnInfo}}</div>
                                    <i style="margin-left:2px;" class="el-icon-warning"></i>
                                </el-tooltip>

                                <div v-else >
                                    {{modelDt[itemData.model] | formatNumber}}
                                </div>
                            </el-form-item>

                            <el-form-item v-else  :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline">{{itemData.label}}
                                </div>

                                <el-input v-if="!itemData.disabled" class="lay-input lay-input-normal" :required="itemData.required" :data-mm="modelDt[itemData.model]"
                                            :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model="modelDt[itemData.model]"
                                            :placeholder="itemData.placeholder || '请输入内容'" :maxlength="itemData.maxlength || 50">
                                </el-input>

                                <div v-else>
                                    {{modelDt[itemData.model]}}
                                </div>
                            </el-form-item>
                        </el-col>

                        <!--type==select. createBy:shilei,modify:qinanyang 下拉选择框,若有变更记录，展示三角提示图标 -->
                        <el-col v-else-if="itemData.type==='select'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item   :label="itemData.label" :title="itemData.label" class="twoLine"  :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                <div slot='label' style="display:inline" >{{itemData.label}}
                                </div>
                                <el-select v-if="!itemData.disabled" class="lay-select " :key="itemData.model"
                                :id="itemData.model" :name="itemData.model" :required="itemData.required"
                                            v-model="modelDt[itemData.model]"
                                            @change="onSelectChange(modelDt[itemData.model],itemData.model)">
                                    <el-option v-for="(item,index) in modelDt[itemData.model + 'List']"  :key="index" :label="item.label" :value="item.value"
                                              >
                                    </el-option>
                                </el-select>

                                <el-select v-else disabled class="lay-select " :key="itemData.model"
                                :id="itemData.model" :name="itemData.model" :required="itemData.required"
                                            v-model="modelDt[itemData.model]"
                                            @change="onSelectChange(modelDt[itemData.model],itemData.model)">
                                    <el-option v-for="(item,index) in modelDt[itemData.model + 'List']"  :key="index" :label="item.label" :value="item.value"
                                              >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <!--type==radio, 单选框控件 -->
                        <el-col v-else-if="itemData.type==='radio'" :span="itemData.colSpan" :key="itemData.model">
                            <!-- 上下布局 -->
                            <el-form-item v-if="itemData.labelPosition == 'top'"  :label="itemData.label" class="twoLine"  :title="itemData.label"    :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                <el-radio-group  v-if="!itemData.disabled" :key="itemData.model" :id="itemData.model" :name="itemData.model" :required="itemData.required"
                                                 v-model="modelDt[itemData.model]">
                                    <el-radio  v-for="(item ,index) in globDictData[itemData.selectCode]" :key='index'  :label="item.value" title="item.label">
                                        {{item.label}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                             <!-- 左右布局 -->
                            <el-form-item v-else class="colLeft twoLine"  :label="itemData.label"  :title="itemData.label" :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-radio-group  v-if="!itemData.disabled" :key="itemData.model" :id="itemData.model" :name="itemData.model" :required="itemData.required"
                                                 v-model="modelDt[itemData.model]">
                                    <el-radio  v-for="(item ,index) in globDictData[itemData.selectCode]" :key='index'  :label="item.value" title="item.label">
                                        {{item.label}}
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>

                        <!--type==checkbox, 多选框控件 -->
                        <el-col v-else-if="itemData.type==='checkbox'" :span="itemData.colSpan" :key="itemData.model">
                            <!-- 上下布局 -->
                            <el-form-item v-if="itemData.labelPosition == 'top'" :label="itemData.label" :title="itemData.label" :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                <el-checkbox-group :key="itemData.model" :disabled="itemData.disabled" :id="itemData.model" :name="itemData.model" :required="itemData.required" v-model="modelDt[itemData.model]">
                                    <el-checkbox v-for="item in globDictData[itemData.selectCode]" :label="item.value" title="item.label" :key="item.value">
                                        {{item.label}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>

                            <!-- 左右布局 -->
                            <el-form-item v-else class="colLeft" :label="itemData.label" :title="itemData.label" :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                <el-checkbox-group :key="itemData.model" :id="itemData.model" :name="itemData.model" :required="itemData.required" v-model="modelDt[itemData.model]">
                                    <el-checkbox v-for="(item,index) in globDictData[itemData.selectCode]" :label="item.value" :key="index" title="item.label">{{item.label}}</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>

                        <!--type==area. createBy:shilei,modify:qinanyang地址级联 -->
                        <el-col v-else-if="itemData.type==='area'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" :required="itemData.required" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline">{{itemData.label}}
                                </div>

                                <!-- <al-cascader v-model.trim="res_s"  /> -->
                            </el-form-item>
                        </el-col>

                        <!--type==area. createBy:qinanyang,多行文本域控件-->
                        <el-col v-else-if="itemData.type==='textarea'"   :span="itemData.colSpan" :key="itemData.model">
                            <!-- 上下布局 -->
                            <el-form-item v-if="itemData.labelPosition == 'top'" :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 90%;">
                                <el-input type="textarea" :rows="4"  :disabled="itemData.disabled"
                                            :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model.trim="modelDt[itemData.model]" placeholder="请输入内容" :maxlength="itemData.maxlength || 150">
                                </el-input>
                            </el-form-item>
                            <!-- 左右布局 -->
                            <el-form-item v-else class="colLeft"  :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 90%;">
                                <el-input type="textarea" :rows="4" :disabled="itemData.disabled"
                                            :id="itemData.model" :name="itemData.model" :key="itemData.model" v-model.trim="modelDt[itemData.model]" placeholder="请输入内容" :maxlength="itemData.maxlength || 150">
                                </el-input>
                            </el-form-item>
                        </el-col>

                        <el-col v-else-if="itemData.type==='date'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item v-if="!itemData.disabled" :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 65%;">
                                <el-date-picker :editable="false" value-format="yyyy-MM-dd" :key="itemData.model" :id="itemData.model" :name="itemData.model"
                                             style="width: 98%;"  v-model="modelDt[itemData.model]" type="date" placeholder="选择日期" :picker-options="pickerDateOptions">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item v-else :label="itemData.label" :title="itemData.label">
                                {{modelDt[itemData.model] | formatDate }}
                            </el-form-item>
                        </el-col>

                        <el-col v-else-if="itemData.type==='datetime'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item v-if="!itemData.disabled" :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <el-date-picker :editable="false" value-format="yyyy-MM-dd HH:mm:ss"  :key="itemData.model" :id="itemData.model" :name="itemData.model"
                                                v-model="modelDt[itemData.model]" type="datetime" placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>

                            <el-form-item v-else :label="itemData.label" :title="itemData.label">
                                {{modelDt[itemData.model]}}
                            </el-form-item>
                        </el-col>

                        <!--type==datetime. createBy:shilei,modify:qinanyang 时间选择控件 -->
                        <el-col v-else-if="itemData.type==='datetimeWarning'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div slot='label' style="display:inline">{{itemData.label}}
                                 </div>
                                <el-date-picker value-format="yyyy-MM-dd" :key="itemData.model" :id="itemData.model" :name="itemData.model"
                                                v-model="modelDt[itemData.model].value" type="date" placeholder="选择日期时间"
                                                v-on:blur="check(modelDt[itemData.model].endtime,modelDt[itemData.model].value,modelDt[itemData.model].difference,itemData)">
                                </el-date-picker>

                                <el-tooltip  class="item" effect="light"  placement="bottom">
                                    <div slot="content" style="background:#dd4d39;font:14px;color:#fff;padding:10px 20px 10px 10px;">{{itemData.label}}已临近</div>
                                    <i v-show="itemData.warning" style="margin-left:2px;" class="el-icon-warning"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>

                        <!--type==homePhone. 自定义控件（createBy:qinanyang）,固定电话控件，默认展示两个输入框 -->
                        <el-col v-else-if="itemData.type==='homePhone'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                                <div v-if="!itemData.disabled">
                                    <el-col :span="6"><el-input  v-model.trim="modelDt[itemData.model].areaCode" :maxlength="5"></el-input>
                                    </el-col>
                                    <el-col :span="1">&nbsp;</el-col>
                                    <el-col :span="10"><el-input  v-model.trim="modelDt[itemData.model].phoneNo" :maxlength="10"></el-input>
                                    </el-col>
                                </div>
                                <div v-else>
                                    {{modelDt[itemData.model].areaCode}} - {{modelDt[itemData.model].phoneNo}}
                                </div>
                            </el-form-item>
                        </el-col>

                        <!--type==companyPhone. 自定义控件（createBy:qinanyang）,固定电话控件，默认展示三个输入框 -->
                        <el-col v-else-if="itemData.type==='companyPhone'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" :prop="itemData.model" style="width: 85%;">
                              <div slot='label' style="display:inline">{{itemData.label}}
                                <el-tooltip class="tooltip">
                                    <div slot="content" style="width:200px;overflow:auto;height:200px;word-wrap:break-word;">{{itemData.tooltip}}<br/>{{itemData.value}}</div>
                                    <i v-if="itemData.explain" class="el-icon-question"></i>:
                                </el-tooltip>
                              </div>
                              <el-col :span="3"><el-input  v-model.trim="modelDt[itemData.model].areaCode" :maxlength="5"></el-input>
                              </el-col>
                              <el-col :span="1">&nbsp;</el-col>
                              <el-col :span="8"><el-input  v-model.trim="modelDt[itemData.model].phoneNo" :maxlength="10"></el-input>
                              </el-col>
                              <el-col :span="1">&nbsp;</el-col>
                              <el-col :span="3"><el-input  v-model.trim="modelDt[itemData.model].extensionNum" :maxlength="5"></el-input>
                              </el-col>
                              <el-tooltip class="item" effect="dark"  placement="bottom">
                                  <div slot="content" style="width:200px;overflow:auto;height:200px;word-wrap:break-word;">{{itemData.tooltip}}<br/>{{itemData.hPhone1+" "+itemData.hPhone2+" "+itemData.hPhone3}}</div>
                                  <i v-if="itemData.ischange" style="margin-left:2px;" class="el-icon-star-on"></i>
                              </el-tooltip>
                            </el-form-item>
                        </el-col>


                        <!-- 省市区县级联 -->
                        <el-col v-else-if="itemData.type==='areaCity'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item   :label="itemData.label" :title="itemData.label" :key="itemData.model" style="width: 85%;">
                                <!-- <AreaSelector ref="areaselform"  v-model="modelDt[itemData.model]" :readonly="itemData.disabled" :modelName="itemData.model"></AreaSelector> -->
                            </el-form-item>
                        </el-col>

                        <el-col v-else-if="itemData.type==='prodParentSelect'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                <el-select v-if="!itemData.disabled" class="lay-select" :key="itemData.model" :id="itemData.model" :name="itemData.model" :required="itemData.required"
                                            v-model="modelDt[itemData.model]"  placeholder="请选择">
                                    <el-option v-for="item in prodParentAll" :key="item.value" :label="item.label" :title="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col v-else-if="itemData.type==='childParentSelect'" :span="itemData.colSpan" :key="itemData.model">
                            <el-form-item :label="itemData.label" :title="itemData.label" :key="itemData.model" style="width: 85%;" :prop="itemData.model">
                                <el-select v-if="!itemData.disabled" class="lay-select" :key="itemData.model" :id="itemData.model" :name="itemData.model" :required="itemData.required"
                                            v-model="modelDt[itemData.model]"  placeholder="请选择">
                                    <el-option v-for="item in prodChildAll" :key="item.value" :label="item.label" :title="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>


                    </template>
                </el-row>
            </el-form>
            <!-- 基本列表 -->
            <div v-if="this.schemaDt.type=='simpleTable'">
                <simple-table :inData="modelDt" :inSchema="schemaDt.fields" ref="simpleTableRef" id="IDsimpleTable"></simple-table>
            </div>
        </div>
    </el-card>
</template>

<script type="text/babel">
    import moment from 'moment'
    // import AlSelector from '@/components/huaxia/AlSelector/al-selector.vue'
    // import AlCascader from '@/components/huaxia/AlCascader/al-cascader.vue'
    // import AreaSelector from '@/components/huaxia/AreaSelector/area-selector.vue'
    // import CarSelector from '@/components/huaxia/CarSelector/carSelector.vue'
    // import ContactInfo from '@/components/huaxia/ContactInfo/ContactInfo.vue'
    // import MobileAuth from '@/components/huaxia/ThirdPartyAuth/MobileAuth.vue'
    // import RemarkInfo from '@/components/huaxia/RemarkInfo/RemarkInfo.vue'
    // import ProfessionInfo from '@/components/huaxia/ProfessionInfo/ProfessionInfo.vue'
    // import MyCarInfo from '@/components/huaxia/MyCarInfo/MyCarInfo.vue'
    // import CarInfo from '@/components/huaxia/CarInfo/CarInfo.vue'
    // import Backfill from '@/components/huaxia/Backfill/Backfill.vue'
    import SimpleTable from '@/components/huaxia/Table/SimpleTable.vue'
    // import SimpleTableEx from '@/components/huaxia/Table/SimpleTableEx.vue'
    // import HistoryAssessTable from '@/components/huaxia/Table/HistoryAssessTable.vue'
    // import CarConfig from '@/components/huaxia/CarConfig/CarConfig.vue'
    // import PhoneVerification from '@/components/huaxia/PhoneVerification/PhoneVerification.vue'
    // import CallRecord from '@/components/huaxia/ApplyInfo/CallRecord.vue'
    // import HouseInfo from '@/components/huaxia/House/HouseInfo.vue'
    // import accounting from 'accounting'

    export default {
        props: {
            id : {type:String},
            readonly: {type: Boolean, default: ()=>{return false;} },
            formKey : {type:String},
            schemaData : {
                type:Object
            },
            modelData : {type:[Array,Object]},
            toggleStore:{
                type:Boolean
            },
            allParentData : {type:[Array,Object]},
            allChildData : {type:[Array,Object]},
            warnShow: {
              type:Boolean,
              default: false
            },
            // [防止重复提交] 用于提交保存时，把button disabled，返回前禁止再次提交
            buttonDisabledFormKey: {type: String, default: ()=>{return ""} },
        },

        data: function() {
            const that = this;
            return {
                modelDddd:'',
                businessNo : this.$props.id,
                prodParentAll : this.$props.allParentData,
                prodChildAll : this.$props.allChildData,
                formType : '',
                togState:this.$props.toggleStore,
                res_s:[],
                schemaDt : this.$props.schemaData,
                modelDt : this.$props.modelData,
                globDictData :  this.$store.state.glabdatas.globDictData,
                formProperties : {},
                myData: [],
                pickerDateOptions : {
                    disabledDate(time) {
                        if(that.modelData.certNo) {
                            const birthday = that.getBirthdayFromIdCard(that.modelDt.certNo);
                            return time.getTime() > Date.now() - 8.64e6 || time.getTime() < (new Date(birthday)).getTime()- 24 * 3600 * 1000;
                        }
                    }
                },
                // [地址组件校验]
                areaSelectorDataPostfix: "__AreaSelectorData",
                showPhoneVeriDownloadBtn: false,
                // 用于保存时，1秒内禁止多次保存，等待父组件设置buttonDisabled。
                buttonClickTimeSecond: 0,
            };
        },
        computed: {
            // [防止重复提交] 用于提交保存时，把button disabled，返回前禁止再次提交
            buttonDisabled(){
                return (this.buttonDisabledFormKey == this.formKey);
            },

            formRows : function () { // 计算列样式,渲染出页面布局
                let arrayFields = this.schemaDt.fields;
                let arrayRows = [];
                  let rowColSpan = 0;
                  let itemsTemp = [];
                  for(let i=0;i<arrayFields.length;i++){
                      let field = arrayFields[i];
                      let colSpan = field.colSpan ? field.colSpan : 0;
                    rowColSpan = rowColSpan + colSpan;
                    if (rowColSpan<=24){
                        itemsTemp.push(field);
                        if (i==arrayFields.length-1){
                            let arrayObj = new Array();
                            arrayRows.push(arrayObj.concat(itemsTemp));
                            itemsTemp=[];
                            rowColSpan = 0 + colSpan;
                        }
                    } else {
                        let arrayObj = new Array();
                        arrayRows.push(arrayObj.concat(itemsTemp));
                        itemsTemp=[];
                        itemsTemp.push(field);
                        rowColSpan = 0 + colSpan;
                        if (i==arrayFields.length-1){
                            let arrayObj1 = new Array();
                            arrayRows.push(arrayObj1.concat(itemsTemp));
                            itemsTemp=[];
                            rowColSpan = 0;
                        }
                    }
                 }
                // this.$debug("formRows: schema="+JSON.stringify(this.schemaDt));
                // this.$debug("formRows: rows="+JSON.stringify(arrayRows) );
                return arrayRows;
            },
            computRules : function(){ // 计算校验规则
                let rules = {};
                let arrayFields = this.schemaDt.fields;
                let len = arrayFields.length;
                for(let i=0; i<len; i++){
                    rules[arrayFields[i].model] = arrayFields[i].rule;
                }
                return rules;
            }
        },
        filters: {
            formatNumber: function (value) {
                if (typeof value === 'number') {
                    return accounting.formatNumber(value);
                } else {
                    return value;
                }
            },
            formatDate: function (value) {
                if (value && value != '') {
                    return moment(value).format('YYYY-MM-DD')
                } else {
                    return value;
                }
            }
        },
        mounted(){
            /** 未渲染完成时调用 */
            this.formType = this.$props.schemaData.type;
            //**
        },
        watch: {
            /** 当props参数改变的时候刷新 */
            id(){
                this.businessNo = this.id
            },
            schemaData(){
                this.schemaDt = this.schemaData
            },
            modelData(){
                this.modelDt = this.modelData
            },
            allParentData(){
                this.prodParentAll = this.allParentData
            },
            allChildData(){
                this.prodChildAll = this.allChildData
            }
        },
        methods:{
            submitForm(type){
                this.$refs[type].validate((valid) => {
                    if (valid && flag) {
                        // this.$emit("btnClick", key, e, this.modelDt)
                        alert("submit!")
                    } else {
                        alert('表单校验不通过!!');
                    }
                });
            },
           onSelectChange(val,key){
             this.$emit("selectResult",val,key)
           },
            //保存按钮功能
            onButtonClick : function(type, e, key){
                // 1秒内禁止多次保存
                // this.$debug("onButtonClick: key="+key+", formKey="+this.formKey);
                let nowSecond = new Date().getTime() / 1000;
                let delta = (nowSecond - this.buttonClickTimeSecond);
                if(delta >=0 && delta <=1){
                    this.$info("onButtonClick: forbid double click in one second. return.");
                    return;
                }
                this.buttonClickTimeSecond = nowSecond;
                /** 保存按钮 */
                if('commonform' === this.formType){
                    let flag = true;
                    const areaselRef = this.$refs['areaselform'];
                    if(areaselRef) {
                      if(areaselRef instanceof Array) {
                        for(let i=0;  i < areaselRef.length; i++) {
                          const areaselvalid = areaselRef[i].validate();
                          if(!areaselvalid) {
                            flag = false;
                          }
                        }
                      } else {
                        const areaselvalid = areaselRef.validate();
                        if(!areaselvalid) {
                          flag = false;
                        }
                      }
                    }

                    this.$refs[type].validate((valid) => {
                        if (valid && flag) {
                            this.$emit("btnClick", key, e, this.modelDt)
                        } else {
                            //console.log('表单校验不通过!!');
                        }
                    });

                }else if('contact' === this.formType&&'phoneVeriDownload'!=key){  //联系人信息
                    let myValid = this.$refs.contactInfo.validate();
                    if(!myValid){
                        this.$info("contact validate results false. return.");
                        return;
                    }
                    const resDt = this.$refs.contactInfo.getValue()
                    if(!resDt){
                        this.$info("contact validate results false. return.");
                        return;
                    }
                    this.$emit("btnClick", key, e, ((resDt && resDt.length>0) ? resDt: null) )

                }else if('remark' === this.formType){   //备注
                    const resDt = this.$refs.remarkInfoRef.getValue()
                    this.$emit("btnClick", key, e, resDt)
                }else if('professionInfo' === this.formType){   //职业信息
                    const resDt = this.$refs.professionInfo.getValue()
                    this.$emit("btnClick", key, e, resDt)

                }else if('simpleTable'===this.formType){
                    this.$emit("btnClick", key, e, key)
                }else if(key == 'downloadPhoneList'){
                  this.$refs.phoneVerificationRef.showDownloadList();
                }else if(key == 'phoneVeriDownload'){
                  this.$emit("btnClick", key, e, type);
                }else{
                    this.$emit("btnClick", key, e, type);
                }
            },
            measureClick: function(type, e, key){
              // console.log(type,e,key);
              this.$emit("calculte", key, e, type);
            },
            formButtonClick: function(type, e, key){
              // console.log(type,e,key);
              this.$emit("formButtonClick", key, e, type);
            },
            titleButtonClick : function(e, key){
                window.open(key, '_blank')
            },
            check : function(data,data2,difference,itemData){
                const end  = new Date(data);    //截止时间
                const start  = new Date(data2);//选择的时间
                const time  = end.getTime()-start.getTime();
                if(time<difference && time>0-difference){
                    itemData.warning = true;
                }else{
                   itemData.warning = true;
                }
            },

            /**
             * Backfill的change事件返回数据格式:
             * {
             *   id,
             *   label,
             *   managerId, // 团队经理
             *   managerLabel,
             *   orgId, // 门店
             *   orgLabel,
             * }
             */
            onChange(item, modelName){
                this.$info("onChange: itemSelect="+JSON.stringify(item)+", modelName="+modelName);
                // 客户经理和团队经理，单独设置
                if(modelName){
                    this.modelDt[modelName] = item.label;
                }
                // 设置团队经理姓名。所属门店是登录人员的组织机构，新增的时候从服务器读取。
                // 暂时硬编码teamManagerName。@see ApplyInfoDto.java
                //this.modelDt.customerManagerName = item.label;
                if(item.managerLabel){
                    this.modelDt.teamManagerName = item.managerLabel;
                }
            },

            /**
             * 子组件的required校验
             */
            getRequiredRules(schema){
                let rules = [];
                if(schema && schema.required){
                    rules =  {required: true, message: schema.label + '不能为空', trigger: 'change'};
                }
                // this.$debug("getRequiredRules: modelName="+schema.model+", rules="+JSON.stringify(rules) );
                return rules;
            },

            /**
             * 使用一个带后缀的名称，保存子组件的数据，用于校验。
             * [地址组件校验]
             */
            getAreaSelectorProp(modelName){
                let modelNameData = modelName + this.areaSelectorDataPostfix;
                // this.$debug("getAreaSelectorProp: modelName="+modelName+", modelNameData="+modelNameData);
                return modelNameData;
            },

            /**
             * 当选择地址后，才设置model的data。
             * [地址组件校验]
             */
            onAreaSelectorChange(value, modelName){
                // this.$debug("onAreaSelectorChange: value="+JSON.stringify(value)+", modelName="+modelName);
                let modelNameDataValue = null;
                if(value){
                    modelNameDataValue = value.areaText;
                }
                let prop = this.getAreaSelectorProp(modelName);
                this.modelDt[prop] = modelNameDataValue;
            },


            setCarAssessFlag() {
              if(this.$refs.mycarInfoRef) {
                this.$refs.mycarInfoRef.setCarAssessFlag();
              }
            },


            phoneVerificationClick(e) {
              this.$emit('btnClick','phone-verification', e, this.$refs.phoneVerificationRef.getValue());
            },

            getBirthdayFromIdCard : function(idCard) {
                var birthday = "";
                if(idCard != null && idCard != ""){
                    if(idCard.length == 15){
                        birthday = "19"+idCard.substr(6,6);
                    } else if(idCard.length == 18){
                        birthday = idCard.substr(6,8);
                    }

                    birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
                }

                return birthday;
            },
            phoneVeriDownloadBtn: function() {
              this.showPhoneVeriDownloadBtn = true;
            },
        },
        // components: {
        //     AlCascader, AlSelector, AreaSelector, CarSelector, ContactInfo, MobileAuth, RemarkInfo,  ProfessionInfo,
        //     MyCarInfo,  CarInfo, Backfill, SimpleTable, SimpleTableEx, HistoryAssessTable, CarConfig, PhoneVerification,
        //     CallRecord, HouseInfo
        // }
        components:{
          SimpleTable
        }
    };
</script>
<style scoped>
.el-row {
    margin-bottom: 12px !important;
}
</style>

<style>
    .tip {
        padding: 8px 5px;
        background-color: #F7F7F7;
        border-radius: 4px;
        border-left: 5px solid #3EAA22;
        margin: 20px 0;
    }
    /* 覆盖, *号提示在字段后显示 */
	.el-form-item.is-required .el-form-item__label:before {
	    content: '' !important;
	}
	.el-form-item.is-required .el-form-item__label:after {
		content: '*';
		color: #f56c6c;
	}
  .is-light{
    border: 0px;
    margin-left: 0px;
    padding: 0px;
  }
  .tooltip{
     position: relative;
    float: right;
    top: 6px;
  }
</style>
