import {
  loadModules
} from 'esri-loader';

const arcgisapi = {
  map: null,
  view: null
};

export const getMap = () => arcgisapi.map;
export const getView = () => arcgisapi.view;
export const buildMapAndView = async (viewDiv) => {
  const [Map, MapView, Extent] = await loadModules([
    'esri/Map',
    'esri/views/MapView',
    'esri/geometry/Extent',
  ])
  arcgisapi.map = new Map({
    basemap: 'streets',
  })

  arcgisapi.view = new MapView({
    map: arcgisapi.map,
    container: viewDiv,
    extent: new Extent({
      xmin: 17033225.143698107,
      ymin: -3184686.6784156896,
      xmax: 17036617.03682835,
      ymax: -3180974.705229493,
      spatialReference: {
        wkid: 102100,
      },
    }),
  })
  window.mapView = arcgisapi.view;
};
