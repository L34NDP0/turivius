/* eslint-disable no-empty-pattern */
import axios from "../../axios.js";

const getDefaultState = () => {
  return {
    tarefasList: [],
  };
};

const state = getDefaultState();

const getters = {
  tarefasList: (state) => state.tarefasList,
};

const mutations = {
  setTarefasList(state, list) {
    state.tarefasList = list;
  },
};

const actions = {
  async getTarefasList({ commit }) {
    const { data } = await axios.get("/tarefas");
    commit("setTarefasList", data);
    return data;
  },
  async postTarefa({}, { nome, tipo, dataTarefa }) {
    const body = { nome, tipo, data: dataTarefa };
    const { data } = await axios.post("/tarefas", body);
    return data;
  },
  async getByIdTarefa({}, { id }) {
    const { data } = await axios.get(`/tarefas/${id}`);
    return data;
  },
  async putTarefa({}, { id, nome, tipo, dataTarefa }) {
    const body = { nome, tipo, data: dataTarefa };
    const { data } = await axios.put(`/tarefas/${id}`, body);
    return data;
  },
  async deleteTarefa({}, { id }) {
    const { data } = await axios.delete(`/tarefas/${id}`);
    return data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
