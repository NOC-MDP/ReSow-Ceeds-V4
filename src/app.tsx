import * as React from 'react';
import {useState,useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{
  NavigationControl,
  GeolocateControl
} from 'react-map-gl';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import MAP_STYLE from '../mapstyle.json';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {
  const [mapStyle, setMapStyle] = useState(null); 
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
    <>
      <Map
        initialViewState={{
          latitude: 50.7028,
          longitude: -1.5442,
          zoom: 9}}
        mapStyle={mapStyle && mapStyle.toJS()}
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        interactiveLayerIds={interactiveLayerIds}>
        <GeolocateControl position="bottom-left" />
        <NavigationControl position="bottom-left" />
      </Map>
      <LeftPanel onChange={setMapStyle}/>
      <RightPanel Record2={Record2}/>    
      </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
