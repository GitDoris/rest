import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import glabdatas from './modules/glabdatas'
import tableLables from './modules/tableLables'
import searchLables from './modules/searchLables'
import tabdatas from './modules/tabdatas'
import getters from './getters'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    glabdatas,
    tableLables,
    searchLables,
    tabdatas
  },
  getters
})

export default store
