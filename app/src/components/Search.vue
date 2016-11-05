<template>
  <div class="search">
    <input v-model="searchData.skills">
    <input v-model="searchData.location">
    <input v-model="user.username">

    <!-- <button v-on:click="performSearch">Perform Search</button> -->

    <router-link :to="{ path: '/search', query: { skills: searchData.skills, location: searchData.location, username: user.username }}" >Perform Serach</router-link>

    <br>
    <!-- <router-link :to="{ path: '/search', query: { skills: searchData.skills, location: searchData.location, username: user.username }}">/search?skills={{searchData.skills}}&location={{searchData.location}}&username={{user.username}}</router-link> -->
    {{user.email}}
    {{user._id}}
  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchData: {
        skills: " ",
        location: " ",
        username: " ",
      },
      //at a minimum, this schema needs the fields for searching
      user: {
        username: ""
      }
    }
  },
  methods: {
    performSearch(){
      // build an API route that is sent a JSON object with the options (location, skills, etc) and performs search. Logic on backend
      // this.$router.go('/');
      this.$http.get(`http://localhost:3000/api/users/${this.user.username}`).then((response) => {this.user = response.data; }).bind(this);
      // this.$route.query.username = this.user.username;
    }
  },
  /// test
  mounted(){
    this.$nextTick(function () {
      // this.$router.go('/');
      // code that assumes this.$el is in-document
      this.searchData.skills = this.$route.query.skills;
      this.searchData.location = this.$route.query.location;
      this.user.username = this.$route.query.username;
      // alert(this.$route.query.username);

      this.$http.get(`http://localhost:3000/api/users/${this.user.username}`).then((response) => {this.user = response.data; }).bind(this);

    })
  }


}
// dont need this stuff proba
// this.$http.post({email: this.email, hp: this.address}).then(function(){console.log('dog')}, errorCallback);
</script>
