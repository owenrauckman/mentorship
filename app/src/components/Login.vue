<template transition="fade">
  <div class="login">
    <!-- pass specific API endpoint -->
    <div id="button" @click="login()">LOGIN</div>
    <div id="out" @click="logout()">LOGOUT</div>
    <input v-model="user.username" id="username">
    <input v-model="user.password" id="password">
    <div id="status">{{isAuthenticated}}</div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      user: {
        username: "",
        password: ""
      },
      isAuthenticated: ""
    }
  },
  methods: {
    // --- Login User --- //
    login(){
      var that = this;
      $.ajax({method: "POST", data: this.user, url: "http://localhost:3000/api/auth/login", context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          if(response.user){
            this.isAuthenticated = response.message;
          }
          else{
            this.isAuthenticated = response.message;
          }
      });
    },
    // --- Logout User --- //
    logout(){
      $.ajax({method: "GET", url: "http://localhost:3000/api/auth/logout", context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          this.isAuthenticated = response.msg;
      });
    },
    // --- Check Authentication --- //
    checkAuthentication(){
      $.ajax({method: "GET", url: "http://localhost:3000/api/auth/isLoggedIn", context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          if(response.user){
            this.isAuthenticated = response.user.username + ', you are logged in';
          }
          else{
            this.isAuthenticated = response.state + ', you are OUT!';
          }
      });
    }
  },
  // --- On page load (mounted) --- //
  mounted(){
    this.$nextTick(function () {
      this.checkAuthentication();
    })
  }

}
</script>
