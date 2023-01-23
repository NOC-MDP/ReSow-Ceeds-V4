import * as React from 'react';
import {useState, useCallback, useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{NavigationControl,GeolocateControl} from 'react-map-gl';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import MAP_STYLE from '../mapstyle.json';
import AppContext from './AppContext';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {

  /**
   * neither states are updated asynchronously and so do not use the setState function.
   */
  const [mapStyle, setMapStyle] = useState(MAP_STYLE);
  const [layers, setLayers] = useState(mapStyle.layers);
  const [Record2, setRecord2] = useState(null);
  const [cursor, setCursor] = useState<string>('');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(null);
  const mapRef = useRef()

  const categories = ['Seagrass','Labels','Roads','Buildings','Parks','Water','Background'];

  // Layer id patterns by category
  const layerSelector = {
    Seagrass: /seagrass/,
    Background: /background/,
    Water: /water/,
    Roads: /bridge|road|tunnel/,
    Parks: /park/,
    Buildings: /building/,
    Labels: /label|place|poi/
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

  /**
   * effect to update the mapStyle when visibility or color is updated.
   */
  
  useEffect(() => {
    if(layers) {
      setMapStyle({...mapStyle, layers: layers.filter(layer => {
        return categories.every(name => visibility[name] || !layerSelector[name].test(layer.id));
      })})
    }
    // TODO need to change this so interactive boolean in mapstyle is used rather than layerselector
    const newIds = layers.reduce((filtered, layer) => {
      if(categories.every(name => visibility[name] || !layerSelector[name].test(layer.id))) {
      if(layer.id !== "water") 
        filtered.push(layer.id)
      }

      return filtered

    }, [])

    setInteractiveLayerIds(newIds);

  }, [visibility])

  // TODO need to use interactivelayerIDs to remove and set features rather than hardcoding
  const onClick = useCallback(event => {
    mapRef.current.removeFeatureState({source:"CEEDS",sourceLayer:"reprojectedseagrass"})
    const feature2 = event.features && event.features[0];
    if (feature2) {
      setRecord2([feature2.properties]); // eslint-disable-line no-alert
      mapRef.current.setFeatureState({source:"CEEDS", 
                                      sourceLayer: "reprojectedseagrass", 
                                      id: feature2.id}, 
                                      {select:true})
    }
    else{
      setRecord2(null);
    }}, [Record2]);
  
  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(''), []);

  useEffect(() => {
  }, [mapStyle])

  useEffect(() => {
  }, [interactiveLayerIds])

  return (
    <AppContext.Provider value={{
      visibility,
      setVisibility,
      categories,
    }}>
      <Map
      {...visualViewport} ref={ref => mapRef.current = ref && ref.getMap()}
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
      <LeftPanel/>
      <RightPanel Record2={Record2}/>
      </AppContext.Provider>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
