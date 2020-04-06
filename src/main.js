// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Login from './components/Login'
import TodoList from './components/TodoList'

Vue.config.productionTip = false

Vue.use(VueRouter);

const routes = [
  {path: '/', component: Login},
  {path: '/todos', component: TodoList}
];

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
