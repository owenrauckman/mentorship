<template>
  <div id="app">
    <!-- TODO: add nav and stuff here -->
    <!-- maybe move this idk -->
    <router-view></router-view>
    <Navigation></Navigation>
  </div>
</template>

<script>

// Import needed components
import Landing from './components/Landing'
import Search from './components/Search'
import Profile from './components/Profile'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Register from './components/Register'

export default {
  name: 'app',
  components: {
    Search,
    Landing,
    Profile,
    Login,
    Register,
    Navigation
  }
}
</script>
