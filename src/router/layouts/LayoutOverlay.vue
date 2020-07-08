<template>
  <section :class="$style.container">
    <slot />
  </section>
</template>

<script>
export default {
  components: {},
}
</script>

<style lang="scss" module>
@import '@design';

.container {
  width: 100%;
  height: 100%;
  background: #3d3d3d;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
