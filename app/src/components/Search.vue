<template>
  <div class="search">
    <!-- filters -->
    <div id="js__m__search__filters" class="m__search__filters">
      <button v-touch:tap="hideSearchMenu" class="m__search__filters__x">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M88.217 99.997L2.442 14.22c-.463-.503-.596-.615-.984-1.182-.58-.846-1-1.8-1.237-2.8C-.312 7.97.143 5.538 1.46 3.62c.434-.636.96-1.21 1.55-1.703.596-.49 1.254-.9 1.96-1.212.94-.413 1.953-.65 2.982-.7.254-.013.512 0 .767 0 .258.025.512.046.766.07.67.126.85.134 1.5.355.97.325 1.884.833 2.675 1.487.196.167.38.346.567.52L100 88.214l85.775-85.775c.504-.462.617-.596 1.183-.983.846-.58 1.8-1 2.8-1.238.667-.158.842-.15 1.525-.212h.767c.258.025.513.037.767.07 1.016.142 2.008.476 2.904.976.676.376 1.297.842 1.838 1.388.546.542 1.013 1.163 1.388 1.838 1.133 2.033 1.362 4.495.62 6.704-.324.97-.833 1.883-1.487 2.675-.167.196-.347.38-.522.566l-85.775 85.777 85.775 85.775c.463.504.596.616.984 1.183 1.016 1.487 1.533 3.292 1.45 5.092-.12 2.59-1.48 5.025-3.617 6.49-.633.435-1.33.785-2.058 1.026-.734.246-1.496.388-2.267.425-1.025.046-2.058-.096-3.033-.425-.97-.325-1.884-.833-2.675-1.487-.196-.167-.38-.346-.567-.52L100 111.78l-85.775 85.775c-.188.175-.37.354-.567.52-.79.655-1.704 1.163-2.675 1.488-.733.246-1.496.388-2.266.425-2.588.12-5.138-1.008-6.796-3-.49-.596-.9-1.254-1.212-1.958-.412-.942-.65-1.954-.7-2.983-.083-1.8.434-3.605 1.45-5.092.388-.567.52-.68.984-1.183l85.775-85.775z" fill="#BFBFBF"/></svg>
      </button>
      <div id="js__m__search__filter__form" class="m__search__filters__form">
        <div class="m__search__filters__form__radio">
          <label for="mentor" v-touch:tap="toggleMentorType" class="m__search__filters__form__radio__item m__search__filters__form__radio__item--active">mentor</label>
          <input type="radio" id="mentor" value="mentor" v-model="searchData.mentorType">
          <input type="radio" id="mentee" value="mentee" v-model="searchData.mentorType">
          <label for="mentee" v-touch:tap="toggleMentorType" class="m__search__filters__form__radio__item">mentee</label>
        </div>
        <input id="js__m__search__filters__form__input__skills" v-on:keyup="removeErrorState" v-model="searchData.skill" class="m__search__filters__form__input" placeholder="Skill..."/>
        <input v-model="searchData.near" class="m__search__filters__form__input" placeholder="Location..."/>
        <button v-touch:tap="performSearch" class="m__search__filters__form__go">
          <svg class="m__search__query__go" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M166.344 90.136l-52.89-52.89-.503-.538c-.41-.513-.527-.63-.877-1.188-.65-1.04-1.11-2.204-1.336-3.412-.182-.966-.222-1.957-.113-2.938.28-2.455 1.493-4.758 3.367-6.37.75-.64 1.588-1.168 2.49-1.562.903-.395 1.864-.65 2.84-.76.65-.074.82-.054 1.474-.054.242.015.49.035.735.054.734.11 1.444.242 2.15.493.93.322 1.808.79 2.602 1.372.527.39.636.518 1.114.96l69.72 69.723.01.01c.144.142.287.295.42.448.025.03.05.054.074.084.133.153.266.31.46.577.432.586.797 1.217 1.093 1.883l.044.108.08.188c1.044 2.608.92 5.605-.346 8.115l-.014.03-.01.014-.004.01-.005.015-.01.02-.01.014-.01.02-.01.016-.005.01-.01.02-.014.03-.005.01-.005.01-.005.008-.025.04-.005.01v.005c-.034.063-.074.132-.113.2l-.005.006-.025.04-.01.02v.004l-.005.005-.02.034-.014.02v.004l-.004.005-.015.028-.018.03v.005l-.005.005-.01.02-.025.04-.005.004c-.054.09-.108.173-.167.26l-.005.006-.025.035-.015.024-.005.005-.02.03-.014.03h-.005v.004l-.014.025-.025.036-.004.005c-.06.084-.123.168-.182.252l-.005.005-.03.04-.01.014-.005.006-.005.005-.02.03-.02.02-.005.01-.005.005-.014.02-.02.024-.005.01-.004.004-.015.015-.023.034-.005.01h-.005l-.005.01-.04.05c-.034.038-.064.077-.098.117l-.005.006-.006.01-.03.03-.01.01-.004.01-.01.01-.02.023-.01.01c-.02.024-.04.05-.064.073-.138.153-.276.306-.424.454l-.005.005-69.72 69.72c-.48.445-.588.573-1.115.962-.794.582-1.672 1.046-2.603 1.37-1.16.41-2.397.593-3.625.548-.98-.034-1.957-.222-2.89-.547-.926-.325-1.804-.79-2.597-1.37-2.598-1.923-4.117-5.074-4-8.303.066-1.725.588-3.416 1.505-4.88.4-.632.873-1.18 1.38-1.726l52.89-52.89H9.86c-.74-.03-.932-.015-1.667-.138-1.926-.33-3.74-1.247-5.15-2.603-.81-.77-1.48-1.68-1.983-2.677-.503-.996-.838-2.08-.976-3.19-.107-.828-.107-1.67 0-2.505.396-3.07 2.264-5.842 4.97-7.355.977-.543 2.042-.922 3.14-1.11.736-.123.928-.108 1.668-.142h156.486z" fill="#fff"/></svg>
        </button>
      </div>
    </div>

    <!-- cards -->
    <section class="m__search">
      <div class="m__search__filter">
        <button v-touch:tap="showSearchMenu" id="js__m__search__filter__icon" class="m__search__filter__icon">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M200 14.317L125.753 101.3v61.31l-1.794 3.37-42.478 28.59-8.105-4.315V100.28L0 14.318 4.1 5.43H195.9L200 14.317zM25.57 20.72l62.153 72.817.944 2.56v75.206l21.795-14.67V97.117l.944-2.56L174.43 20.72H25.57z" fill="#fff" fill-opacity=".749" fill-rule="nonzero"/></svg>        </button>
      </div>
      <div class="m__search__results">
        <div id="m__search__results__no-results" class="m__search__results__no-results">
          <span>{{noResults}}</span>
        </div>
        <div v-for="user in users" class="m__search__results__profile" v-touch:swipeleft="onSwipeLeft">
          <div class="m__search__results__profile__header">
            <img class="m__search__results__profile__face" src="../assets/face.jpg"/>
            <a href="#" class="m__search__results__profile__connect">Connect</a>
          </div>
          <!-- info -->
          <div class="m__search__results__profile__info">
            <h1 class="m__search__results__profile__info__name">{{user.name}}</h1>
            <h2 class="m__search__results__profile__info__job">{{user.profession}}</h2>
            <p class="m__search__results__profile__info__description">{{user.statement}}</p>
          </div>
          <!-- skills -->
          <div class="m__search__results__profile__skills">
            <div class="m__search__results__profile__skills__type">
              <span class="m__search__results__profile__skills__type__item m__search__results__profile__skills__type__item--active">Skills</span>
              <span class="m__search__results__profile__skills__type__item">Goals</span>
            </div>
            <ul class="m__search__results__profile__skills__list">
              <li class="m__search__results__profile__skills__list__item" v-for="item in user.skillsPossessed">
                {{item}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      searchData: {
        skill: "",
        near: "",
        mentorType: "mentor" //default
      },
      //at a minimum, this schema needs the fields for searching
      users: [],
      noResults: ""
    }
  },
  methods: {
    performSearch(e){
      e.preventDefault(); //keep form from submitting
      var that = this;

      // Make sure the user has entered a skill
      if(!$('#js__m__search__filters__form__input__skills').val()){
        $('#js__m__search__filters__form__input__skills').addClass('m__search__filters__form__input--error');
      }
      else{
        $.ajax({method: "GET", url: `http://192.168.1.66:3000/api/search?skill=${that.searchData.skill}&near=${that.searchData.near}&mentorType=${that.searchData.mentorType}`, context: this, crossDomain: true})
          .done(function(response) {
            if(response){
              if(response.noResults){
                this.noResults = response.noResults;
                $('#m__search__results__no-results').css("display", "flex");
                $('.m__search__results__profile').hide();
              }
              else{
                $('.m__search__results__profile').show();
                $('#m__search__results__no-results').hide();
                this.users = response;
              }
              // hide the search filters regardless
              $('#js__m__search__filters').hide();
            }
            else{
              console.log('not working');
            }
        });
      }
    },
    removeErrorState(e){
      $('#js__m__search__filters__form__input__skills').removeClass('m__search__filters__form__input--error');
    },
    showSearchMenu(e){
      e.preventDefault();
      $('#js__m__search__filters').show();
    },
    hideSearchMenu(e){
      e.preventDefault();
      $('#js__m__search__filters').hide();
    },
    toggleMentorType(e){
      $('.m__search__filters__form__radio__item').removeClass('m__search__filters__form__radio__item--active');
      $(e.target).addClass('m__search__filters__form__radio__item--active');
    },
    onSwipeLeft(e){
      console.log('swiped! + '+  e.target);
      // $(e.target).find('.m__search__results__profile').hide();
      // alert(e.target.className);
      // $(e.currentTarget).hide();

    }

  },
  /// test
  mounted(){
    this.$nextTick(function () {


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
  &__search{
    height: calc(100vh - 50px);
    @include breakpoint(tablet){
      height: calc(100vh - 60px);
    }
    &__filter{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      &__icon{
        background: transparent;
        border: none;
        outline: none;
        svg{
          margin-right: 1rem;
          height: 25px;
          width: 25px;
          path{
            fill: transparentize($white, 0.25);
          }
        }
        &:hover{
          cursor: pointer;
        }
      }
    }
    &__results{
      width: 100%;
      height: calc(100% - 50px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      @include breakpoint(tablet){
        height: calc(100% - 60px);
      }
      &__no-results{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        height: calc(100% - 50px);
        font-size: 1rem;
        font-family: $lato;
        color: $white;
        text-align: center;
        display: none;
        @include breakpoint(tablet){
          height: calc(100% - 60px);
        }
      }
      &__profile{
        position: relative;
        background: $white;
        height: auto;
        min-height: calc(100% - 1rem); //double padding above
        width: calc(100% - 2rem); //double padding above
        max-width: 350px;
        margin: 0 auto;
        border-radius: 10px;
        &__header{
          position: relative;
          border-radius: 10px 10px 0px 0px;
          background: linear-gradient( 45deg, rgb(43, 192, 152), rgb(36, 160, 127) );
          height: 80px;
        }
        &__face{
          position: absolute;
          margin: 0 0 0 1rem;
          bottom: calc(-80px/2); //same as height of face
          height: 80px;
          width: 80px;
          border-radius: 10px;
        }
        &__connect{
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          &:link, &:visited, &:active{
            font-family: $lato;
            text-transform: uppercase;
            font-size: 0.75rem;
            text-decoration: none;
            padding: 0.5rem 1.5rem;
            color: $white;
            border: solid 1px $white;
            border-radius: 5px;
            transition: background 0.3s ease-in, color 0.3s ease-in;
          }
          &:hover{
            background: transparentize($teal, 0.5);
          }
        }
        &__info{
          padding: 1rem 1.5rem;
          color: $dark-gray;
          font-family: $lato;
          text-align: right;
          border-bottom: solid 1px $light-gray;
          &__name{
            margin: 2rem 0 0.25rem 0 ; //same height as profile pic
            text-transform: uppercase;
            font-size: 1rem;
            letter-spacing: 1px;
          }
          &__job{
            text-transform: uppercase;
            font-size: 0.75rem;
            font-weight: 400;
            letter-spacing: 0.5px;
          }
          &__description{
            font-size: 0.75rem;
            color: $medium-dark-gray;
          }
        }
        &__skills{
          &__type{
            display: flex;
            justify-content: center;
            &__item{
              color: $medium-dark-gray;
              font-family: $lato;
              text-transform: uppercase;
              margin: 1rem 1rem 0.5rem 1rem;
              padding-bottom: 1rem;
              font-size: 1rem;
              &--active{
                color: $dark-gray;
                border-bottom: solid 1px $dark-gray;
              }
            }
          }
          &__list{
            font-family: $lato;
            color: darken($medium-gray, 20%);
            font-size: 0.75rem;
            margin: 0.5rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            &__item{
              text-transform: uppercase;
              text-align: center;
              padding: 0.5rem 1rem;
              margin: 0.5rem;
              border: solid 1px lighten($medium-gray, 10%);
              border-radius: 5px;
              list-style: none;
            }
          }
        }
      }
    }
    &__filters{
      background: $white;
      position: absolute;
      z-index: +2;
      height: 100vh;
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
        height: 100vh;
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
}
</style>
