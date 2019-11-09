<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | -->
      <!-- <router-link to="/videoPlayer">视频列表</router-link> |  -->
      <!-- <router-link to="/config">步骤配置列表</router-link> | -->
      <!-- <router-link to="/configOperateInfo">configOperateInfo</router-link> | -->
      <!-- <router-link to="/configSignInfo">configSignInfo</router-link> | -->
      <!-- <router-link to="/permissionSet">视频类型的角色配置</router-link> | -->
      <!-- <router-link to="/preview">预览</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
    text-align: center;
  }
</style>
