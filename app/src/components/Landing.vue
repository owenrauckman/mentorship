<template>
  <div class="landing">
    <div class="m__landing">
      <div class="m__landing__container">
        <h1 class="m__landing__heading">
          Sail With
          <span class="m__landing__heading--bold">Mentorship</span>
        </h1>
        <p class="m__landing__copy">Learn something new or help others learn something new. Sail with Mentorship today.</p>
        <button class="m__landing__cta">Sign Up</button>
        <router-link to="/login" exact class="m__landing__login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'landing',
  data () {
    return {
    }
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
// ----- LANDING PAGE STYLES ----- //
.m__landing{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  @include breakpoint(tablet){
    height: calc(100vh - 60px);
  }
  &__container{
    padding: 2rem;
    max-width: 100%;
    @include breakpoint(tablet){
      max-width: 500px;
    }
  }
  &__heading{
    font-size: 1.5rem;
    font-family: $lato;
    color: $white;
    font-weight: 300;
    letter-spacing: 0.1rem;
    font-style: italic;
    display: block;
    text-transform: uppercase;
    &--bold{
      display: block;
      font-style: normal;
      font-size: 2rem;
      font-weight: 700;
    }
  }
  &__copy{
    font-family: $lato;
    color: $white;
    font-style: italic;
    font-size: 1rem;
    margin-top: 2rem;
  }
  &__cta{
    width: auto;
    border: solid 1px $white;
    padding: 0.5rem 1.75rem;
    text-transform: uppercase;
    font-family: $lato;
    font-size: 1rem;
    color: $white;
    font-weight: 700;
    border-radius: 5px;
    margin-top: 2rem;
    background: transparent;
    transition: background 0.2s ease-out, color 0.2s ease-out;
    &:hover{
      cursor: pointer;
      background: $white;
      color: $teal;
      border: solid 1px transparent;
    }
  }
  &__login{
    font-family: $lato;
    font-size: 0.75rem;
    letter-spacing: 0.1rem;
    color: $white;
    text-transform: uppercase;
    font-weight: 400;
    position: absolute;
    top: 2rem;
    right: 1rem;
    background: transparent;
    border: none;
    text-decoration: none;
  }
}

</style>
