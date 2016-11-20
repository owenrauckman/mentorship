// NPM Includes
import Vue from 'vue'
import VueRouter from 'vue-router'
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;
// My Includes
import App from './App'

// Include all of the Components (also in App.Vue)
import Landing from './components/Landing'
import Search from './components/Search'
import Profile from './components/Profile'
import Inbox from './components/Inbox'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Register from './components/Register'

// Use Vue Touch
var VueTouch = require('vue-touch')
Vue.use(VueTouch)

// Instantiate the Router
Vue.use(VueRouter)
const router = new VueRouter({

  base: '/',
  routes: [
    {path: '/', component: Landing},
    {path: '/search', component: Search},
    {path: '/login', component: Login},
    {path: '/inbox', component: Inbox},
    {path: '/register', component: Register},
    {path: '/profile', component: Profile}
  ]
})

// Create and mount root instance of router. Make sure to inject the router.
// Route components will be rendered inside <router-view>.
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
}).$mount('#app')
