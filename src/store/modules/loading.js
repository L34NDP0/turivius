const getDefaultState = () => {
  return {
    msg: false,
  };
};

const state = getDefaultState();

const getters = {
  message: (state) => state.msg,
};

const mutations = {
  setMessage(state, msg) {
    state.msg = msg;
  },
};

const actions = {
  loading({ commit }, msg) {
    commit("setMessage", msg);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
