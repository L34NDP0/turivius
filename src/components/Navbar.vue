<template>
  <b-navbar class="navbar-layout">
    <b-navbar-brand>
      <img src="../assets/turivius.jpg" alt="logo" width="150" class="logo" />
    </b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: "Default-Navbar",
};
</script>

<style scoped>
.navbar-layout {
  padding: 3rem;
  margin-bottom: 2rem;
  justify-content: center;
  background: #f8f8f8;
}
.logo {
  mix-blend-mode: multiply;
}
</style>
