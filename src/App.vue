<template>
  <div id="app">
    <Loading />
    <DefaultNavbar />
    <Datatable />
  </div>
</template>

<script>
import Loading from "./components/Loading.vue";
import DefaultNavbar from "./components/Navbar.vue";
import Datatable from "./components/Datatable.vue";

export default {
  name: "App",
  components: {
    Loading,
    DefaultNavbar,
    Datatable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
