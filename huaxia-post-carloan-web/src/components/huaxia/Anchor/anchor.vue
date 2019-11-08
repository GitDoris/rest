<template>
      <div >

        <div slot="header" :class="[ isFixed?'i':'','navHeadBox']">
             <ul> <!--:class=" [ item.actived?'navActive':'','navLiBox' ] "-->
                <li v-for="(item,key,index) in menuData" v-on:click="scollThen(index)" ref="index" :key="key"  :class='{ navActive :index==activeClass }'
                 v-bind:style="{ color: item.red?'red':'' }" >{{item.formTitle}}</li>
                 <li><el-button style="float:left" v-for="butt in buttData" size="mini" :type="butt.buttType" :key="butt.buttType" v-on:click="butt.func">{{butt.name}}</el-button></li>
            </ul>

        </div>



      </div>
</template>

<script type="text/babel">
export default {
  props: {
    buttData: {},
    menuData: {}
  },
  data: function() {
    console.log(this.$props.menuData);
    return {
      buttType: ["primary", "success", "info", "warning", "danger"],
      activeClass:0
    };
  },
  methods: {
    onMenuClick: function() {},
    scollThen(index) {

      let scollList = document.getElementsByClassName("navSection");
      let total = parseInt(scollList[index].offsetTop + 70);

      this.activeClass = index;

      // 当前的位置
      let distance =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 平滑滚动，时长500ms，每10ms一跳，共50跳
      let step = total / 50;
      if (total > distance) {
        smoothDown();
      } else {
        let newTotal = distance - total;
        step = newTotal / 50;
        smoothUp();
      }
      function smoothDown() {
        if (distance < total) {
          distance += step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothDown, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }
      function smoothUp() {
        if (distance > total) {
          distance -= step;
          document.body.scrollTop = distance;
          document.documentElement.scrollTop = distance;
          setTimeout(smoothUp, 10);
        } else {
          document.body.scrollTop = total;
          document.documentElement.scrollTop = total;
        }
      }

    }
  }
};
</script>
<style>
.tip {
  padding: 8px 5px;
  background-color: #f7f7f7;
  border-radius: 4px;
  border-left: 5px solid #3eaa22;
  margin: 20px 0;
}
.navBox {
  /* border-top: 3px solid #00a65a; */
  /* position: relative; */
  border-radius: 3px;
  margin-bottom: 20px;
  width: 100%;
  min-height: 120px;
}

.navHeadBox {
  background: #ffffff;
  height: 40px;
  border-top: 3px solid #00a65a;
  width: 100%;
  position: relative;
}
.fixedBox {
  position: fixed;
  top: 2px;
  z-index: 999;
  width: 90%;
}
.navHeadBox > ul > li {
  float: left;
  list-style: none;
  width: 140px;
  height: 38px;
  line-height: 40px;
  font-weight: bold;
  border-bottom: 2px #fff solid;
  text-align: center;
  cursor: pointer;
}
.navActive {
  border-bottom: 2px #00a65a solid !important;
}
.navSection {
  background-color: white;
  padding: 10px 5px;
  margin: 10px 0 10px 0;
}
.navBodyBox {
  min-height: 200px;
}
.navBodyMain {
  min-height: 300px;
  margin-bottom: 20px;
  border: 1px orangered dashed;
}
</style>
