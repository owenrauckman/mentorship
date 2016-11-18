<template>
  <div id="app">
    <router-view></router-view>
    <Navigation></Navigation>
  </div>
</template>

<script>

// Import needed components
import Landing from './components/Landing'
import Search from './components/Search'
import Profile from './components/Profile'
import Inbox from './components/Inbox'
import Login from './components/Login'
import Navigation from './components/Navigation'
import Register from './components/Register'

export default {
  name: 'app',
  components: {
    Search,
    Landing,
    Profile,
    Inbox,
    Login,
    Register,
    Navigation
  }
}
</script>
