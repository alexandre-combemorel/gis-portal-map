<template>
  <section :class="$style.loginContainer">
    <section v-if="loggedIn" :class="$style.userLogged">
      Connected as: {{ portal.user.fullName }}
      <button @click="logOut">Log out</button>
    </section>
    <section v-else-if="tryingToLogIn">
      <p :class="$style.loading">Loading...</p>
    </section>
    <section v-else :class="$style.loginForm">
      <form @submit.prevent="tryToLogIn">
        <input type="submit" value="Login" :class="$style.button" />
      </form>
    </section>
  </section>
</template>

<script>
import { portalMethods, portalComputed } from '@state/helpers'

export default {
  data() {
    return {
      tryingToLogIn: false,
    }
  },
  computed: {
    ...portalComputed,
  },
  methods: {
    ...portalMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      this.logIn()
        .then(() => {
          this.tryingToLogIn = false
        })
        .catch(() => {
          this.tryingToLogIn = false
        })
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';

.loginContainer {
  padding: 5px;
  input {
    width: 60px;
    padding: 5px;
    border-radius: 5px;
    border: solid rgb(190, 190, 190) 1px;
    &.button {
      margin-left: 5px;
    }
  }
  .loading {
    animation-duration: 1s;
    animation-name: changeOpacity;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
  .authError {
    color: red;
  }
}
@keyframes changeOpacity {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
