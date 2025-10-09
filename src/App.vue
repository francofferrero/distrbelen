<template>
  <div>
    <!-- Header -->
    <header class="p-d-flex p-ai-center p-jc-between p-p-3" style="background-color:#007ad9; color:white">
      <h2>Distribuidora Belén</h2>
    </header>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
