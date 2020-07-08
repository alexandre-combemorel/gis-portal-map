<template>
  <section :class="$style.sidebar">
    <div :class="$style.sidebar__loading">
      <button @click="getUserItems">Refresh User Items</button>
      <svg
        :class="[$style.sidebar__loading__circle_loader, animationToggle]"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="45" />
      </svg>
    </div>

    List of Layers:
    <ul :class="$style.sidebar__listitems">
      <li
        v-for="item in itemsLayers"
        :key="item.id"
        :class="$style.sidebar__listitems__item"
        @click="addLayer(item)"
      >
        - {{ item.title }}: {{ item.type }}
      </li>
    </ul>

    List of Layers in the map:
    <ul
      :class="[$style.sidebar__listitems, $style[`sidebar__listitems--inMap`]]"
    >
      <li
        v-for="layerInfo in layersInfo"
        :key="layerInfo.id"
        :class="[
          $style.sidebar__listitems__item,
          $style[`sidebar__listitems--inMap__item`],
        ]"
        @click="removeLayer(layerInfo.id)"
      >
        - {{ getLayer()(layerInfo.id).title }}:
        {{ getLayer()(layerInfo.id).type }}
      </li>
    </ul>
  </section>
</template>

<script>
import {
  itemsComputed,
  itemsMethods,
  portalComputed,
  mapComputed,
  mapMethods,
  mapGetters,
} from '@state/helpers'

export default {
  data() {
    return {
      animationToggle: null,
    }
  },
  computed: {
    ...itemsComputed,
    ...portalComputed,
    ...mapComputed,
  },
  watch: {
    loggedIn(isLogged) {
      if (isLogged) this.launchLoader()
    },
  },
  mounted() {
    if (this.loggedIn) this.launchLoader()
  },
  methods: {
    ...itemsMethods,
    ...mapMethods,
    ...mapGetters,
    async launchLoader() {
      if (this.loggedIn) {
        this.animationToggle = null
        await this.getUserItems()
        this.animationToggle = this.$style.animate
        // setTimeout(this.launchLoader, 5000)
      }
    },
  },
}
</script>

<style lang="scss" module>
@import '@design';

.sidebar {
  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    &__circle_loader {
      width: 25px;
      margin: 5px;
      circle {
        fill: transparent;
        stroke: #2f3d4c;
        stroke-width: 10;
        stroke-dasharray: 283;
        stroke-dashoffset: 0;
      }
      &.animate circle {
        animation: circle--animation 5s linear 1;
      }
    }
  }

  &__listitems {
    padding: 0 5px;
    list-style: 0;
    color: black;
    &__item {
      padding: 3px;
      border-radius: 5px;
      margin: 5px 0;
      &:nth-child(odd) {
        background: rgba(0, 89, 255, 0.7);
      }
      &:nth-child(even) {
        background: rgba(51, 129, 255, 0.7);
      }
      &:hover {
        background: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
    &--inMap {
      &__item {
        background: rgb(0, 0, 0) !important;
        color: white;
        cursor: pointer;
      }
    }
  }
}

@keyframes circle--animation {
  0% {
    stroke-dashoffset: 283;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>
