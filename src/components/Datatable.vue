<template>
  <b-container class="my-3">
    <b-row>
      <b-col>
        <h4>
          <font-awesome-icon icon="tasks" />
          Tarefas
        </h4>
      </b-col>
      <b-col class="btn-right">
        <b-button variant="primary" @click="onClickAdd"> 
          <font-awesome-icon icon="plus" class="mr-1" />
          NOVO 
        </b-button>
      </b-col>
    </b-row>
    <b-row class="mt-1">
      <b-col md="4">
        <b-input placeholder="Pesquisa" @input="debouncedPesquisa" />
      </b-col>
    </b-row>
    <b-card class="mt-3">
      <b-table
        striped
        :fields="fields"
        hover
        :items="filteredTarefasList"
        :per-page="perPage"
        :current-page="currentPage"
        responsive
        class="mt-3"
      >
        <template #head()="{ column }">
          {{ formatColumnName(column) }}
        </template>
        <template #cell(id)="row">
          <b-button variant="link" size="sm" @click="onClickEdit(row.item.id)">
            <font-awesome-icon icon="edit" />
          </b-button>
          <b-button variant="link" size="sm" @click="onClickDelete(row.item.id)">
            <font-awesome-icon icon="trash" />
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="filteredTarefasList.length"
        :per-page="perPage"
        aria-controls="my-table"
        align="right"
        size="sm"
        class="mt-4 mb-0"
      />
    </b-card>
    <b-modal
      v-model="showModal"
      title="Tarefa"
      cancelVariant="danger"
      hide-footer
    >
      <b-form @submit.prevent="submit(form)">
        <b-row>
          <b-col>
            <b-form-group label="Nome:" label-for="nome">
              <b-form-input v-model="form.nome" placeholder="Nome"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Tipo:" label-for="tipo">
              <b-form-input v-model="form.tipo" placeholder="Tipo"></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group label="Data:" label-for="data">
              <b-form-datepicker
                id="data"
                v-model="form.data"
                placeholder="Data"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="btn-right mt-3">
          <b-button variant="danger" @click="clearForm"> LIMPAR </b-button>
          <b-button type="submit" variant="primary" class="mx-1">
            SALVAR
          </b-button>
        </div>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import debounce from "lodash/debounce";
import filter from "lodash/filter";

export default {
  name: "Default-Datatable",
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      fields: [
        {
          key: "nome",
          sortable: true,
          formatter: (value) => {
            return value || "-";
          },
        },
        {
          key: "tipo",
          sortable: true,
          formatter: (value) => {
            return value || "-";
          },
        },
        {
          key: "data",
          formatter: (value) => {
            return moment(value).format("DD/MM/YYYY");
          },
        },
        { key: "id" },
      ],
      showModal: false,
      form: {
        nome: null,
        tipo: null,
        data: null
      },
      pesquisa: null,
    };
  },
  computed: {
    ...mapGetters("tarefas", ["tarefasList"]),
    filteredTarefasList() {
      const pesquisa = (this.pesquisa || "").toLowerCase();
      if (pesquisa) {
        return filter(this.tarefasList, function (o) {
          return Object.keys(o).some(function (k) {
            return o[k]
              ? o[k].toString().toLowerCase().indexOf(pesquisa) != -1
              : false;
          });
        });
      } else return this.tarefasList;
    },
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapActions("loading", ["loading"]),
    ...mapActions("tarefas", ["getTarefasList", "postTarefa", "getByIdTarefa", "putTarefa", "deleteTarefa"]),
    debouncedPesquisa: debounce(function (e) {
      this.pesquisa = e;
    }, 500),
    async getList() {
      try {
        this.loading();
        await this.getTarefasList();
      } catch (err) {
        this.$noty.error("Erro ao obter dados das tarefas.");
      } finally {
        this.loading(false);
      }
    },
    formatColumnName(col) {
      const obj = {
        nome: "Nome",
        tipo: "Tipo",
        data: "Data/hora",
        id: "Ação",
      };
      return obj[col];
    },
    onClickAdd() {
      this.clearForm();
      this.showModal = true;
    },
    async onClickEdit(id) {
      try {
        this.loading();
        const data = await this.getByIdTarefa({ id });
        this.form = {
          ...this.form,
          id: data.id,
          nome: data.nome,
          tipo: data.tipo,
          data: data.data
        }
        this.showModal = true;
      } catch (error) {
        this.$noty.error("Erro ao obter dados da tarefa.");
      } finally {
        this.loading(false);
      }
    },
    async onClickDelete(id) {
      try {
        this.loading();
        await this.deleteTarefa({ id });
        await this.getList();
        this.showModal = false;
        this.$noty.success("Tarefa excluída com sucesso.");
      } catch (error) {
        this.$noty.error("Erro ao excluir tarefa.");
      } finally {
        this.loading(false);
      }
    },
    async submit(form) {
      const { id, nome, tipo, data } = form;
      if (!nome || !tipo || !data) {
        this.$noty.warning("Favor preencher todos os campos.");
        return;
      }
      
      try {
        this.loading();
        const dataFormatada = moment(data).format("YYYY-MM-DD");
        if (id) await this.putTarefa({ id, nome, tipo, dataTarefa: dataFormatada });
        else await this.postTarefa({ nome, tipo, dataTarefa: dataFormatada });
        await this.getList();
        this.showModal = false;
        this.$noty.success("Tarefa salva com sucesso.");
      } catch (error) {
        this.$noty.error("Erro ao salvar tarefa.");
      } finally {
        this.loading(false);
      }
    },
    async clearForm() {
      this.form = {
        id: null,
        nome: null,
        tipo: null,
        data: null
      };
    },
  },
};
</script>

<style scoped>
h4 {
  text-align: left;
}
.btn-right {
  text-align: right;
}
</style>
