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
      user: {}
    }
  },
  methods: {
    // --- Check Authentication --- // //TODO: MOVE THIS TO MAIN VIEW (can be seen on all pages)
    checkAuthentication(){
      $.ajax({method: "GET", url: `http://localhost:3000/api/users/${this.$route.params.username}`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          console.log(this.$route.params.username)
          this.user = {
            "username": response.username,
            "email": response.email,
            "name": response.name
          }
      });
    }
  },
  mounted(){
    this.$nextTick(function () {
      this.checkAuthentication();
    })
  }

}
</script>
