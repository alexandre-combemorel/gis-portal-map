<template>
  <section :class="$style.mapContainer">
    <div :id="$style.viewDiv" ref="viewDiv"></div>
  </section>
</template>

<script>
import { mapMethods } from '@state/helpers'

export default {
  async mounted() {
    // INIT MAP
    this.initMap(this.$refs['viewDiv'])
  },
  methods: {
    ...mapMethods,
  },
}
</script>

<style lang="scss" module>
@import '@design';
@import url('https://js.arcgis.com/4.13/esri/themes/light/main.css');

.mapContainer,
#viewDiv {
  width: 100%;
  height: 100%;
}
</style>
