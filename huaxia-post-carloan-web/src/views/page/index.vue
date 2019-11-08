<!--  routerList-->
<template>
  <div style="padding:20px;">
    <div style="padding:20px;" v-for="item in routerList" v-if="!item.hidden&&item.children">
      <h3>{{item.meta.title}}</h3>
      <ul>
        <li class="page-index-span" v-for="child in item.children" v-if="!child.hidden">
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
  import { mapGetters } from 'vuex'
  import { constantRouterMap } from '@/router'
  export default {
    props: {},
    data() {
      return {
        routerList:constantRouterMap
      };
    },

    created() {
      console.log(constantRouterMap)
    },

    methods: {},
    // computed: {
    //   ...mapGetters([
    //     'permission_routers',
    //     'sidebar'
    //   ])
    // }
  }
</script>
