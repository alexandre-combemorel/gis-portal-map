import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex'

// Store Helper function

// portal.js
export const portalComputed = {
  ...mapState('portal', {
    portal: (state) => state.portal,
  }),
  ...mapGetters('portal', ['loggedIn']),
}
export const portalMethods = mapActions('portal', ['logIn', 'logOut'])


// items.js
export const itemsMethods = mapActions('items', ['getUserItems'])
export const itemsComputed = {
  ...mapState('items', {
    itemsLayers: state => Array.isArray(state.items) && state.items.filter(item => item.isLayer)
  }),
}

// map.js
export const mapMethods = {
  ...mapActions('map', ['addLayer', 'removeLayer', 'initMap']),
  ...mapGetters('map', ['getLayer'])
}
// export const mapGetters =
export const mapComputed = mapState('map', {
  layersInfo: state => state.layersInfo
})
