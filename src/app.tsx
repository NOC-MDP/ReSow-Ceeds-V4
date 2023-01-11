import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import MapGL, {Source, Layer} from 'react-map-gl';
import LeftPanel from './left-panel';
import {fillLayer} from './map-style';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {
  const [mapStyle, setMapStyle] = useState(null);

  return (
    <>
      <MapGL
        initialViewState={{
          latitude: 50.7028,
          longitude: -1.5442,
          zoom: 9
        }}
        mapStyle={mapStyle && mapStyle.toJS()}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      >
      </MapGL>
      <LeftPanel onChange={setMapStyle}/>
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
