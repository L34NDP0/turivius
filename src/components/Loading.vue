<template>
  <BlockUI v-show="show" message="Aguarde...">
    <font-awesome-icon icon="cog" class="fa-spin fa-3x fa-fw" />
  </BlockUI>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import BlockUI from "vue-blockui";

Vue.use(BlockUI);

export default {
  name: "Default-Loading",
  computed: {
    ...mapGetters("loading", ["message"]),
    show() {
      return this.message != false;
    },
  },
};
</script>
