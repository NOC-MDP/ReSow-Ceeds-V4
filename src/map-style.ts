import type {FillLayer} from 'react-map-gl';

export const fillLayer: FillLayer = {
  id: 'seagrass',
  type: 'fill',
  paint: {
    'fill-color': '#0080ff',
    'fill-opacity': 0.8,}
};
