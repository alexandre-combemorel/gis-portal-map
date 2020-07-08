<template>
  <Layout>
    <Map />
  </Layout>
</template>

<script>
import appConfig from '@src/app.config'
import Layout from '@layouts/Layout.vue'
import Map from '@components/Map.vue'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: appConfig.description }],
  },
  components: { Layout, Map },
}
</script>

<style lang="scss" module>
@import '@design';
</style>
