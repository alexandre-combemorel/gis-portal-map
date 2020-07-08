import {
  buildMapAndView,
  getMap,
  getView
} from '../arcgisapi';
import {
  loadModules
} from 'esri-loader';

export const state = {
  layersInfo: [],
};

export const mutations = {
  // ADD_LAYER(state, layer) {
  //   state.map.add(layer);
  // },
  // REMOVE_LAYER(state, layer) {
  //   state.map.remove(layer);
  // }
  REFRESH_LAYER_LIST(state) {
    const layersInfo = [];
    getMap().layers.items.forEach(layer => {
      const layerFound = state.layersInfo.find(layerInfo => layerInfo.id === layer.id)
      if (layerFound) {
        layersInfo.push(layerFound);
      } else {
        layersInfo.push({
          id: layer.id,
          listOfActions: [
            "Manger des caniche",
            "Zoom to extent",
            "Open meta data"
          ]
        })
      }
    });
    state.layersInfo = layersInfo;
  }
}

export const actions = {
  init() {},
  async initMap({
    commit
  }, viewDiv) {
    await buildMapAndView(viewDiv);
    getView().on("layerview-create", event => {
      commit('REFRESH_LAYER_LIST');
    })
    getView().on("layerview-destroy", event => {
      commit('REFRESH_LAYER_LIST');
    })
  },
  async addLayer({
    state
  }, portalItem) {
    const [Layer] = await loadModules([
      'esri/layers/Layer',
    ])
    getMap().add(await Layer.fromPortalItem(portalItem))
  },
  async removeLayer({
    state
  }, layerId) {

    getMap().remove(getMap().findLayerById(layerId))
  },
};

export const getters = {
  getLayer: () => layerId => {
    return getMap().findLayerById(layerId);
  },
};
