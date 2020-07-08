<template>
  <LayoutOverlay>
    <section :class="$style.mainContainer">
      {{ message }}
      <button @click="redirect">Load the App</button>
    </section>
  </LayoutOverlay>
</template>

<script>
import LayoutOverlay from '@layouts/LayoutOverlay.vue'
export default {
  components: { LayoutOverlay },
  data() {
    return {
      message: 'Welcome page, edit this component.',
    }
  },
  methods: {
    redirect: function() {
      this.$cookies.set('user_visited', true)
      this.$router.go('/')
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';

.mainContainer {
  background: rgb(199, 199, 199);
  border-radius: 10px;
  padding: 10px;
}
</style>
