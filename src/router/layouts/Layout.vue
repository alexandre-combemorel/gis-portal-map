<template>
  <section :class="$style.container">
    <header>My header <Login /></header>
    <section :class="$style.mainContainer">
      <section :class="$style.sidebar">My side bar <ListItems /></section>
      <slot />
    </section>
    <footer>My Footer</footer>
  </section>
</template>

<script>
import Login from '@components/Login.vue'
import ListItems from '@components/ListItems.vue'

export default {
  components: { Login, ListItems },
}
</script>

<style lang="scss" module>
@import '@design';
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  header,
  footer {
    width: 100%;
    height: 80px;
    background: #e0e0e0;
  }
  .mainContainer {
    display: flex;
    flex: 1 1 auto;
    .sidebar {
      width: 400px;
      background: rgb(81, 156, 255);
    }
  }
}
</style>
