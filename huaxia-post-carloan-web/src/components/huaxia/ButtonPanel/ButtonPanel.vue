 <template>

      <!--<div style="text-align:center;position: fixed; width:80%; z-index: 20;" :offsetTop="90">-->
             <!--<el-row :gutter="20">-->
                 <!--<el-col :span="14">-->
                      <!--<template v-for="value in totalData.totalButtons"  v-if="value!=0">-->
                               <!--<el-button size="mini" class="lay-btn "  @click="test($event,totalData.titleButtons[value-1].key)" >{{totalData.titleButtons[value-1].label}}</el-button>-->
                     <!--</template>-->
                 <!--</el-col>-->
              <!--</el-row>-->
      <!--</div>-->
      <div>
        <template v-for="value in totalData.totalButtons" v-if="value!=0">
          <el-button size="mini" class="lay-btn " @click="test($event,totalData.titleButtons[value-1].key)">
            {{totalData.titleButtons[value - 1].label}}
          </el-button>
        </template>
        <slot name="next">

        </slot>
      </div>
</template>

<script>
export default {
	props: {
		tabData: {}
	},

	data() {
		return {
			totalData: this.$props.tabData.BaseInfo,
			nowIndex: 0,
		};
	},
	methods: {
		test(e, item) {
			this.$emit('actions', e, item);
		},
		toggleTabs: function(index) {
			this.nowIndex = index;
		}
	},
};
</script>
 <style>
   .el-button.lay-btn{
     margin-bottom: 10px;
     margin-left: 0;
     margin-right: 10px;
   }
 </style>
