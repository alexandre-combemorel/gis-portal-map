export const state = {
  items: null
};

export const mutations = {
  SET_USER_ITEMS(state, newValue) {
    state.items = newValue;
  }
}

export const actions = {
  init({
    dispatch
  }) {
    dispatch('getUserItems')
  },
  async getUserItems({
    commit,
    rootGetters
  }) {
    if (rootGetters['portal/loggedIn']) {
      const portal = rootGetters['portal/getPortalInstance'];
      // Create query parameters for the portal search
      // This object autocasts as new PortalQueryParams()
      var queryParams = {
        query: "owner:" + portal.user.username,
        sortField: "numViews",
        sortOrder: "desc",
        num: 20
      }
      // Query the items based on the queryParams created from portal above
      const data = await portal.queryItems(queryParams).catch((error) => {
        commit('SET_USER_ITEMS', null)
        throw error;
      })
      commit('SET_USER_ITEMS', data.results)
    } else {
      commit('SET_USER_ITEMS', null)
    }
  },
};
