<template transition="fade">
  <div class="profile">
    <!-- pass specific API endpoint -->
    <h1>{{user.username}}</h1>
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
    <p>{{user.profession}}</p>
    <button v-touch:tap="logout">Log Out</button>
  </div>
</template>
<script>
export default {
  name: 'profile',
  data () {
    return {
      user: {},
      isAuthenticated: ""
    }
  },
  methods: {
    // --- Check Authentication --- // //TODO: MOVE THIS TO MAIN VIEW (can be seen on all pages)
    getUserInfo(){
      $.ajax({method: "GET", url: `http://localhost:3000/api/users/${this.$route.params.username}`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          this.isAuthenticated = response.message;
          this.user = {
            "username": response.username,
            "email": response.email,
            "name": response.name,
            "profession": response.profession
          }
      });
    },
    // LOG OUT
    logout(){
      $.ajax({method: "GET", url: `http://localhost:3000/api/auth/logout`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          this.isAuthenticated = response.message;
          window.location = `/`;
      });
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.getUserInfo();
    })
  }

}
</script>
