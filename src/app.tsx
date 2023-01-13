import * as React from 'react';
import {useState,useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{
  NavigationControl,
  GeolocateControl
} from 'react-map-gl';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {
  const [mapStyle, setMapStyle] = useState(null); 
  const [cursor, setCursor] = useState<string>('');
  const interactiveLayerIds = ["seagrass"];

  const onClick = useCallback(event => {
    const feature = event.features && event.features[0];
    console.log(event.features)

    if (feature) {
      window.alert(`Bio Class of Seaweed: ${feature.properties.BIO_CLASS}`); // eslint-disable-line no-alert
    }}, []);

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
      <RightPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
