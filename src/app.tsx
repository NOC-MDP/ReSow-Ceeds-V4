import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import MapGL, {Source, Layer} from 'react-map-gl';
import LeftPanel from './left-panel';
import {fillLayer} from './map-style';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {

  return (
    <>
      <MapGL
        initialViewState={{
          latitude: 50.7028,
          longitude: -1.5442,
          zoom: 9
        }}
        mapStyle="mapbox://styles/thopri/clbw6ibpa004j14mj5wpnqjqr"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {(
          <Source type="vector" url="http://localhost:8000/services/out">
            <Layer source-layer="reprojectedseagrass" {...fillLayer}/>
          </Source>
        )}
      </MapGL>
      <LeftPanel>
      </LeftPanel>
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
