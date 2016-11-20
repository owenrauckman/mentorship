<template>
  <div class="inbox">
    <div class='m__inbox'>
      <div class="m__inbox__container">
        <ul class="m__inbox__list">

          <li v-touch:tap="showChat" class="m__inbox__list__item"  v-for="(conversation, index) in conversations">
            <span class="m__inbox__list__item__container" v-for="message in conversation">
              <div class="m__inbox__list__item--dot">
                <span v-if="message.unread"class="m__inbox__list__item--dot--circle m__inbox__list__item--dot--circle--unread"></span>
                <span v-else class="m__inbox__list__item--dot--circle"></span>

              </div>
              <div class="m__inbox__list__item--info">
                <h2 v-if="message.from == loggedInUser" class="m__inbox__list__item__name">{{message.to}}</h2>
                <h2 v-else class="m__inbox__list__item__name">{{message.from}}</h2>
                <p class="m__inbox__list__item__copy">{{message.body}}</p>
                <div class="m__conversationId" style="display:none">{{message.conversationId}}</div>
              </div>
            </span>
          </li>

        </ul>
      </div>
    </div>

    <!-- chat popup-->
    <div class="m__chat">
      <div class="m__chat__header">
        <button v-touch:tap="hideChat" class="m__chat__header__arrow">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="1.5"><g fill="none" stroke="#fff" stroke-width="4"><path d="M80.362 167.044L13.315 99.996 80.362 32.95M13.315 99.996h173.37" stroke-width="18.9638"/></g></svg>
        </button>
        <div class="m__chat__header__name">{{messageWith}}</div>

      </div>

      <div class="m__chat__messages">
        <div v-for="message in chat">
          <div v-if="message.author._id != loggedInUserId" class="m__chat__messages__message m__chat__messages__message--opposite">
            <div class="m__chat__messages__message__time">{{ message.createdAt.toLocaleTimeString('en-US', {month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(',', '') }}</div>
            <div class="m__chat__messages__message__text">{{message.body}}</div>
          </div>
          <div v-else class="m__chat__messages__message">
            <div class="m__chat__messages__message__time">{{ message.createdAt.toLocaleTimeString('en-US', {month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'}).replace(',', '') }}</div>
            <div class="m__chat__messages__message__text">{{message.body}}</div>
          </div>
        </div>
      </div>

      <div class="m__chat__input">
        <input class="m__chat__input__text" v-model="inputMessage" v-bind:placeholder="'Say something to ' + messageWith + '...'"></input>
        <div v-touch:tap="sendChat" class="m__chat__input__send">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M130.4 191.01l-53.846-53.846L130.4 69.418l-67.746 53.846L8.808 69.418 191.194 8.622 130.4 191.01z" fill="#fff"/></svg>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
// var socket = io.connect('http://sailmentorship.com:3000');

export default {
  name: 'inbox',
  data () {
    return {
      conversations: "",
      chat: "",
      loggedInUser: "",
      loggedInUserId: "",
      messageWith: "",
      conversationId: "",
      inputMessage: "",
      test: ""
    }
  },
  methods: {
    showChat(e){
      this.messageWith = $(e.target).parent().find('.m__inbox__list__item__name').text();
      this.conversationId = $(e.target).parent().find('.m__conversationId').text()

      $.ajax({method: "GET", url: `http://sailmentorship.com:3000/api/chat/${this.conversationId}`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          $('.m__chat').animate({'right': 0}, 250);
          this.chat = response.conversation;
          $.each(this.chat, function(index, message){
            message.createdAt = new Date(message.createdAt); // turn the UTC string to an actual date
          });

      }.bind(this));

    },
    hideChat(){
      $('.m__chat').animate({'right': '-100%'}, 250);
    },
    sendChat(){
      // socket.emit('chat message', 'test');
      // socket.on('chat message', function(msg){
      //   $('.m__chat__messages').append('<div class="m__chat__messages__message"><div class="m__chat__messages__message__text">' + msg + '</div></div>');
      // });

      $.ajax({method: "POST", data: {composedMessage: this.inputMessage}, url: `http://sailmentorship.com:3000/api/chat/new/${this.messageWith}`, context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          $('.m__chat__input__text').val('');
          // $('.m__chat__messages').scrollTop(1000);
          // socket.emit('chat message', 'test');
      }.bind(this));
    }
  },
  mounted(){
    this.$nextTick(function () {
      // check if is logged in
      $.ajax({method: "GET", url: "http://sailmentorship.com:3000/api/auth/isLoggedIn", context: this, xhrFields: {withCredentials: true}, crossDomain: true})
        .done(function(response) {
          if(response.user == null){
            window.location = `/#/login`;
          }

          this.loggedInUser = response.user.username;
          this.loggedInUserId = response.user._id;


          // Populate the inbox
          $.ajax({method: "GET", url: "http://sailmentorship.com:3000/api/chat/", context: this, xhrFields: {withCredentials: true}, crossDomain: true})
            .done(function(response) {
              this.conversations = response.conversations;

          }.bind(this));

      }.bind(this));

      // END TODO

    });
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
  overflow-x: hidden;
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
      &::-webkit-scrollbar {
        display: none;
      }

    }
    &__list{
      padding: 0;
      margin: 0;
      width: 100%;
      font-family: $lato;
      &__item{
        &__container{
          display: flex;
          &:hover{
            cursor: pointer;
          }
        }
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
  // Chat Styles
  &__chat{
    top:0;
    position: absolute;
    height: 100vh;
    width: 100%;
    background: $light-gray;
    z-index: +3;
    display: flex;
    flex-direction: column;
    right: -100%;
    &__header{
      position: relative;
      padding: 1rem;
      height: 50px;
      width: calc(100% - 2rem);
      display: flex;
      background: $medium-gray;
      font-family: $lato;
      color: $white;
      &__arrow{
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        background: none;
        border: none;
        &:hover{
          cursor: pointer;
        }
        svg{
          height: 25px;
          width: 25px;
        }
      }
      &__name{
        width: calc(100% - 50px - 3rem);
        justify-content: center;
        align-self: center;
        text-align: center;
        text-transform: uppercase;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        padding: 2rem 1rem;
      }
    }
    &__messages{
      height: calc(100% - 50px - 50px - 2rem - 2rem - 2rem);
      padding: 1rem 2rem;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      position: relative;
      font-family: $lato;
      &::-webkit-scrollbar {
        display: none;
      }
      &__message{
        padding: 0.5rem 0;

        &--opposite{
          text-align: right;
          .m__chat__messages__message__text{
            background: $teal;
            color: $white;
            border-radius: 10px 0px 10px 10px;
          }
        }
        &__time{
          display: block;
          font-size: 0.75rem;
          margin-bottom: 0.25rem;
          color: $medium-gray;
        }
        &__text{
          padding: 0.75rem;
          background: $white;
          color: $dark-gray;
          border-radius: 0px 10px 10px 10px;
          display: inline-block;
          width: auto;
        }
      }
    }
    &__input{
      width: 100%;
      height: 50px;
      display: flex;
      &__text{
        background: $white;
        padding: 2rem 1rem;
        width: calc(100% - 50px - 2rem);
        height: calc(100% - 2rem);
        font-family: $lato;
        font-size: 0.75rem;
        color: $dark-gray;
        border:none;
        &:focus{
          outline: none;
        }

      }
      &__send{
        padding: 1rem;
        padding: 1rem;
        width: 50px;
        height: 100%;
        background: $teal;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          cursor: pointer;
        }
        svg{
          height: 30px;
          width: 30px;
        }
      }
    }
  }
}


</style>
