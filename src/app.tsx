import * as React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{NavigationControl,GeolocateControl} from 'react-map-gl';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import MAP_STYLE from '../mapstyle.json';
import {fromJS} from 'immutable';
import AppContext from './AppContext';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {

  /**
   * neither states are updated asynchronously and so do not use the setState function.
   */
  const [mapStyle, setMapStyle] = useState(fromJS(MAP_STYLE));
  const [layers, setLayers] = useState(mapStyle.get('layers'));

  const categories = ['Seagrass','Labels','Roads','Buildings','Parks','Water','Background'];

  // Layer id patterns by category
  const layerSelector = {
    Seagrass: /seagrass/,
    Background: /background/,
    Water: /water/,
    Parks: /park/,
    Buildings: /building/,
    Roads: /bridge|road|tunnel/,
    Labels: /label|place|poi/
  };

  // Layer color class by type
  const colorClass = {
    line: 'line-color',
    fill: 'fill-color',
    background: 'background-color',
    symbol: 'text-color'
  };

  const [visibility, setVisibility] = useState({
    Seagrass: true,
    Background: true,
    Water: true,
    Parks: true,
    Buildings: true,
    Roads: true,
    Labels: true
  });

  const [color, setColor] = useState({
    Seagrass: "#0080ff",
    Background: "#dedede",
    Water: '#a0cfdf',
    Parks: '#E6EAE9',
    Buildings: '#c0c0c8',
    Roads: '#ffffff',
    Labels: '#78888a'
  });

  /**
   * effect to update the mapStyle when visibility or color is updated.
   */
  useEffect(() => {
    const activeLayers = []

    mapStyle.set('layers', layers
    .filter(layer => {
      const id = layer.get('id');
      return categories.every(name => visibility[name] || !layerSelector[name].test(id));
    })
    .map(layer => {
      const id = layer.get('id');
      const type = layer.get('type');
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        activeLayers.push(id)
        return layer.setIn(['paint', colorClass[type]], color[category]);
      }
      return layer;
    }))

    console.log('active layers:', activeLayers)

  }, [visibility, color])

  const [Record2, setRecord2] = useState(null);
  const [cursor, setCursor] = useState<string>('');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(["seagrass"]);
  
  const onClick = useCallback(event => {
    const feature = event.features && event.features[0];

    if (feature) {
      setRecord2([feature.properties]); // eslint-disable-line no-alert
    }
    else{
      setRecord2(null);
    }}, [Record2]);

  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(''), []);


  return (
    <AppContext.Provider value={{
      visibility,
      setVisibility,
      color,
      setColor,
    }}>
      <Map
        initialViewState={{
          latitude: 50.7028,
          longitude: -1.5442,
          zoom: 9}}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        interactiveLayerIds={interactiveLayerIds}>
        <GeolocateControl position="bottom-left" />
        <NavigationControl position="bottom-left" />
      </Map>
      <LeftPanel />
      <RightPanel Record2={Record2}/>
      </AppContext.Provider>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
