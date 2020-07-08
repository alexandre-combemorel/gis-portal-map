import appConfig from '@src/app.config'
import { loadModules } from 'esri-loader'

export const state = {
  portal: newPortalInstance(),
}

export const mutations = {
  SET_CURRENT_PORTAL(state, newValue) {
    state.portal = newValue
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.portal.user
  },
  getPortalInstance(state) {
    return state.portal
  },
}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  init() {
    // Action to execute on load of the app
  },

  // Logs in the current user.
  async logIn({ commit, dispatch }) {
    var portal = await newPortalInstance()
    // Setting authMode to immediate signs the user in once loaded
    portal.authMode = 'immediate'

    // Once portal is loaded, user signed in
    await portal.load() // error will be throw if the promise fail
    commit('SET_CURRENT_PORTAL', portal) // if promise respond we store the new portal instance
    dispatch('items/getUserItems', null, {
      root: true,
    })
    return portal.user !== null
  },

  // Logs out the current user.
  async logOut({ commit, dispatch }) {
    commit('SET_CURRENT_PORTAL', await newPortalInstance())
    dispatch('items/getUserItems', null, {
      root: true,
    })
  },
}

// ===
// Private helpers
// ===

async function newPortalInstance() {
  const [Portal] = await loadModules(['esri/portal/Portal'])
  return new Portal({
    url: appConfig.portalUrl,
  })
}
