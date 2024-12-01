import Vue from "vue";
import Vuex from "vuex";

import loading from "./modules/loading";
import tarefas from "./modules/tarefas";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loading,
    tarefas,
  },
});
