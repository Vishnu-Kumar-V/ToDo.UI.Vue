<template>
  <div id="app" class="container">
    <span style="float:left; margin-top:30px; margin-left:160px;"><img width="50px" src="./assets/logo.png"></span>
    <span style="float:left; margin-left:20px; margin-top:10px;"><h3>Vue Todo list</h3></span>
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login'
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    Login,
    TodoList
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
</style>
