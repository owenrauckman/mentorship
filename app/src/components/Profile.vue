<template transition="fade">
  <div class="profile">
    <!-- pass specific API endpoint -->
    <h1>{{user.username}}</h1>
    <p>{{user.name}}</p>
    <p>{{user.email}}</p>
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
    authenticationCheck(){
      $.ajax({method: "GET", url: "http://localhost:3000/api/auth/isLoggedIn", context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          this.isAuthenticated = response.message;
          if(response.state == "success"){
            window.location = `/${response.user.username}`;
          }
          else{
            window.location = `/login`;
          }
      });
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.authenticationCheck();
    })
  }

}
</script>
