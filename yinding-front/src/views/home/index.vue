<template>
  <div style="padding:20px;">
    <div style="padding:20px;" v-for="item in routerList" v-if="!item.hidden&&item.children">
      <h3>{{item.meta.title}}</h3>
      <ul>
        <li v-for="child in item.children" v-if="!child.hidden">
          <a target="_blank" :href="`#${item.path}/${child.path}`">{{child.meta.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .page-index-span {
    padding: 4px;
  }
</style>

<script>
import { constantRouterMap } from '@/router'
export default {
  props: {},
  data() {
    return {
      routerList: constantRouterMap
    }
  },
  created() {
  },
  methods: {}
}
</script>

