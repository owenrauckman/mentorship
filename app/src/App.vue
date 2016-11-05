<template>
  <div id="app">
    <!-- TODO: add nav and stuff here -->
    <!-- maybe move this idk -->
    <router-view></router-view>
    <Menu2></Menu2>
  </div>
</template>

<script>

// Import needed components
import Landing from './components/Landing'
import Search from './components/Search'
import Profile from './components/Profile'
import Login from './components/Login'
import Menu2 from './components/Menu'

export default {
  name: 'app',
  components: {
    Search,
    Landing,
    Profile,
    Login,
    Menu2
  }
}
</script>
