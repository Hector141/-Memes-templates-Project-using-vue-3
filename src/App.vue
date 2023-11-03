<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(to bottom, #000000, #470544);
}

#app {
  min-height: 100vh;
}
</style>
