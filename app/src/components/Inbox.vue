<template>
  <div class="inbox">
    <div class='m__inbox'>
      <div class="m__inbox__container">
        <ul class="m__inbox__list">

          <li class="m__inbox__list__item">
            <div class="m__inbox__list__item--dot">
              <span class="m__inbox__list__item--dot--circle"></span>
            </div>
            <div class="m__inbox__list__item--info">
              <h2 class="m__inbox__list__item__name">Ron Namingly</h2>
              <p class="m__inbox__list__item__copy">This is a part of a message. Add a limit...</p>
            </div>
          </li>

          <li class="m__inbox__list__item">
            <div class="m__inbox__list__item--dot">
              <span class="m__inbox__list__item--dot--circle m__inbox__list__item--dot--circle--unread"></span>
            </div>
            <div class="m__inbox__list__item--info">
              <h2 class="m__inbox__list__item__name">Ron Namingly</h2>
              <p class="m__inbox__list__item__copy">This is a part of a message. Add a limit...</p>
            </div>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'inbox',
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
// ----- INBOX STYLES ----- //
.m{
  &__inbox{
    position: relative;
    background: $white;
    width: 100%;
    height: 100%;
    min-height: calc(100vh - 50px);
    @include breakpoint(tablet){
      min-height: calc(100vh - 60px);
    }
    &__container{
      max-width: 680px;
      margin: 0 auto;
      padding: 2rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;

    }
    &__list{
      padding: 0;
      margin: 0;
      width: 100%;
      font-family: $lato;
      &__item{
        list-style: none;
        display: flex;
        width: 100%;
        margin: 2rem 0;
        &:first-child{
          margin: 0 0 2rem 0;
        }
        &--dot{
          width: 30px;
          position: relative;
          &--circle{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            height: 10px;
            width: 10px;
            background: $medium-gray;;
            border-radius: 50%;
            &--unread{
              background: $teal;
            }
          }
        }
        &--info{
          width: calc(100% - 30px);
        }
        &__name{
          font-size: 1.0rem;
          color: $dark-gray;
          letter-spacing: 0.05rem;
        }
        &__copy{
          font-size: 0.75rem;
          margin: 0.5rem 0;
          color: $medium-gray;
          letter-spacing: 0.01rem;
        }
      }
    }
  }
}


</style>
