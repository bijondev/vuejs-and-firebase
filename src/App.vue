<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <div id="app">
    <NavBar/>
      <router-view />
    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import DataEntry from './components/DataEntry.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
