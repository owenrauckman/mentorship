<template>
  <div class="login">
    <div id="js__m__login" class="m__login">
      <div id="js__m__login__form" class="m__login__form">
        <h1 class="m__login__heading">Login</h1>
        <input id="js__m__login__form__input__username" v-model="user.username" class="m__login__form__input" placeholder="Username"/>
        <input type="password" v-model="user.password" class="m__login__form__input" placeholder="Password"/>
        <p class="m__login__error">{{isAuthenticated}}</p>
        <router-link to="/register" exact class="m__login__no-account">Don't have an account? Create one</router-link>
        <button @click="login" class="m__login__form__go">
          <svg class="m__search__query__go" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M166.344 90.136l-52.89-52.89-.503-.538c-.41-.513-.527-.63-.877-1.188-.65-1.04-1.11-2.204-1.336-3.412-.182-.966-.222-1.957-.113-2.938.28-2.455 1.493-4.758 3.367-6.37.75-.64 1.588-1.168 2.49-1.562.903-.395 1.864-.65 2.84-.76.65-.074.82-.054 1.474-.054.242.015.49.035.735.054.734.11 1.444.242 2.15.493.93.322 1.808.79 2.602 1.372.527.39.636.518 1.114.96l69.72 69.723.01.01c.144.142.287.295.42.448.025.03.05.054.074.084.133.153.266.31.46.577.432.586.797 1.217 1.093 1.883l.044.108.08.188c1.044 2.608.92 5.605-.346 8.115l-.014.03-.01.014-.004.01-.005.015-.01.02-.01.014-.01.02-.01.016-.005.01-.01.02-.014.03-.005.01-.005.01-.005.008-.025.04-.005.01v.005c-.034.063-.074.132-.113.2l-.005.006-.025.04-.01.02v.004l-.005.005-.02.034-.014.02v.004l-.004.005-.015.028-.018.03v.005l-.005.005-.01.02-.025.04-.005.004c-.054.09-.108.173-.167.26l-.005.006-.025.035-.015.024-.005.005-.02.03-.014.03h-.005v.004l-.014.025-.025.036-.004.005c-.06.084-.123.168-.182.252l-.005.005-.03.04-.01.014-.005.006-.005.005-.02.03-.02.02-.005.01-.005.005-.014.02-.02.024-.005.01-.004.004-.015.015-.023.034-.005.01h-.005l-.005.01-.04.05c-.034.038-.064.077-.098.117l-.005.006-.006.01-.03.03-.01.01-.004.01-.01.01-.02.023-.01.01c-.02.024-.04.05-.064.073-.138.153-.276.306-.424.454l-.005.005-69.72 69.72c-.48.445-.588.573-1.115.962-.794.582-1.672 1.046-2.603 1.37-1.16.41-2.397.593-3.625.548-.98-.034-1.957-.222-2.89-.547-.926-.325-1.804-.79-2.597-1.37-2.598-1.923-4.117-5.074-4-8.303.066-1.725.588-3.416 1.505-4.88.4-.632.873-1.18 1.38-1.726l52.89-52.89H9.86c-.74-.03-.932-.015-1.667-.138-1.926-.33-3.74-1.247-5.15-2.603-.81-.77-1.48-1.68-1.983-2.677-.503-.996-.838-2.08-.976-3.19-.107-.828-.107-1.67 0-2.505.396-3.07 2.264-5.842 4.97-7.355.977-.543 2.042-.922 3.14-1.11.736-.123.928-.108 1.668-.142h156.486z" fill="#fff"/></svg>
        </button>
      </div>
    </div>
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
      // ensure username and password are in
      if(this.user.username && this.user.password){
        var that = this;
        $.ajax({method: "POST", data: this.user, url: `${window.location.origin}/api/auth/login`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
          .done(function(response) {
            if(response.user){
              this.isAuthenticated = response.message;
              window.location = `/#/profile`; //send them to their profile (will need to add auth to this route)
            }
            else{
              this.isAuthenticated = response.message;
            }
        });
      }
    },
    // --- Logout User --- //
    logout(){
      $.ajax({method: "GET", url: `${window.location.origin}/api/auth/logout`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          this.isAuthenticated = response.message;
      });
    },
    authenticationCheck(){
      $.ajax({method: "GET", url: `${window.location.origin}/api/auth/isLoggedIn`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          this.isAuthenticated = response.message;
          if(response.state == "success"){
            window.location = `/#/profile`;
          }
      });
    }
  },
  // --- On page load (mounted) --- //
  mounted(){
    this.$nextTick(function () {
      // this.authenticationCheck(); //redirect if logged in
    })
  }

}
</script>
<style lang="scss">
//TODO: // remove these....they need to go somewhere global
// GLOBAL (temporarily here because its on all pages)
$light-gray: rgba(242,242,242,1);
$medium-gray: rgba(191,191,191,1);
$medium-dark-gray: rgba(153,153,153,1);
$dark-gray: rgba(77,77,77,1);
$white: rgba(255,255,255,1);
$teal: rgba(6,214, 160, 1);
$pink: rgba(239,71,111,1);

// Import Fonts
@import url('https://fonts.googleapis.com/css?family=Lato:300,300i,400,700');

$lato: 'Lato', sans-serif;

@mixin breakpoint($point) {
@if $point == tablet {
  @media (min-width: 680px) { @content ; }
 }
 //  @else if $point == laptop {
 //    @media (min-width: 64em) { @content ; }
 // }
}


html, body{
  height: 100%;
}
body{
  margin: 0 auto;
  font-size: 16px;
}
.m__background{
  position: fixed;
  content: "";
  height: 100%;
  width: 100%;
  z-index: -1;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  &:after{
    position: absolute;
    top: 0;
    content: "";
    height: 100%;
    width: 100%;
    background-color: transparentize($teal, 0.1);
  }
}

// RESETS
h1, h2, h3, h4, h5{
  margin: 0;
}
ul, ol{
  margin: 0;
  padding: 0;
}

// Styles for Profile / Popup
.m{
  &__login{
    &__heading{
      font-family: $lato;
      text-transform: uppercase;
      background: transparent;
      font-size: 1rem;
      border: none;
      color: $dark-gray;
      text-align: center;
      padding-bottom: 2rem;
    }
    &__no-account{
      font-family: $lato;
      color: $medium-gray;
      font-size: 0.75rem;
      text-align: center;
      margin-bottom: 2rem;
      text-decoration: none;
    }
    &__error{
      font-family: $lato;
      color: $pink;
      font-size: 0.75rem;
      text-align: center;
    }
    background: $white;
    position: absolute;
    z-index: +2;
    height: calc(100vh - 50px);
    @include breakpoint(tablet){
      height: calc(100vh - 60px);
    }
    width: 100%;
    &__x{
      height: 40px;
      width: 40px;
      right: 1rem;
      top: 1rem;
      position: absolute;
      border: none;
      background: transparent;
      svg{
        path{
          fill: $medium-gray;
        }
      }
      &:hover{
        cursor: pointer;
        svg{
          path{
            fill: $dark-gray;
          }
        }
      }
    }
    &__form{
      max-width: 350px;
      height: calc(100vh - 50px);
      @include breakpoint(tablet){
        height: calc(100vh - 60px);
      }
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      &__input{
        font-family: $lato;
        text-transform: uppercase;
        background: transparent;
        font-size: 1rem;
        border: none;
        color: $medium-gray;
        border-bottom: solid 1px $medium-gray;
        margin: 3rem 0;
        padding: 0 0 2rem 2rem;
        &:last-child{
          margin-bottom: 1rem;
        }
        &--error{
          border-bottom: solid 1px $pink;
        }
        &:focus{
          color: $dark-gray;
          border-bottom: solid 1px $dark-gray;
          outline: 0;
        }
        &::-webkit-input-placeholder {
           color: $medium-gray;
        }
      }
      &__radio{
        display: flex;
        flex-direction: row;
        input{
          display: none;
        }
        &__item{
          flex-basis: 50%;
          color: $medium-gray;
          text-align: center;
          padding: 1rem 2rem;
          font-family: $lato;
          text-transform: uppercase;
          font-size: 1rem;
          transition: background 0.3s ease-in;
          &:first-child{
            margin: 1rem 1rem 1rem 0;
          }
          &:last-child{
            margin: 1rem 0 1rem 1rem;
          }
          &:hover{
            cursor: pointer;
            background: $light-gray;
          }
          &--active{
            color: $dark-gray;
            border: solid 1px $dark-gray;
            background: transparent;
            &:hover{
              background: transparent;
            }
          }
        }
      }
      &__go{
        height: 40px;
        width: 40px;
        align-self: center;
        background: transparent;
        outline: 0;
        border: none;
        transition: transform 0.3s ease-in;
        &:hover{
          cursor: pointer;
          transform: translateX(0.5rem);
          svg{
            path{
              fill: darken($pink, 10%);
            }
          }
        }
        svg{
          path{
            fill: $pink;
          }
        }
      }
    }
  }
}
</style>
