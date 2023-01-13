import * as React from 'react';
import {useState} from 'react';
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

  return (
    <>
      <Map
        initialViewState={{
          latitude: 50.7028,
          longitude: -1.5442,
          zoom: 9
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        mapboxAccessToken={MAPBOX_TOKEN}>

        <GeolocateControl position="top-right" />
        <NavigationControl position="top-right" />

      </Map>
      <LeftPanel onChange={setMapStyle}/>
      <RightPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
