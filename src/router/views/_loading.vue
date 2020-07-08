<template>
  <Layout>
    <section :class="$style.loadingContainer">
      <Transition appear>
        <BaseIcon :class="$style.loadingIcon" name="sync" spin />
      </Transition>
    </section>
  </Layout>
</template>

<script>
import Layout from '@layouts/Layout.vue'

export default {
  page: {
    title: 'Loading page...',
    meta: [{ name: 'description', content: 'Loading page...' }],
  },
  components: { Layout },
}
</script>

<style lang="scss" module>
@import '@design';
.loadingContainer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  .loadingIcon {
    @extend %typography-xxlarge;

    // stylelint-disable-next-line selector-class-pattern
    &:global(.v-enter-active) {
      transition: opacity 1s;
    }
    // stylelint-disable-next-line selector-class-pattern
    &:global(.v-enter) {
      opacity: 0;
    }
  }
}
</style>
