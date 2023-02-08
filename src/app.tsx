import * as React from 'react';
import {useState, useCallback, useEffect,useRef} from 'react';
import {createRoot} from 'react-dom/client';
import Map,{NavigationControl,GeolocateControl} from 'react-map-gl';
import GeocoderControl from './geocoder-control';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import DrawControl from './draw-control';
import MapStyle from './mapstyle.json';
import AppContext from './AppContext';
import {dataLayers} from './data-layers';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKE;

export default function App() {
  /**
   * layers states are updated asynchronously and so do not use the setState function.
   */
  const [mapStyle, setMapStyle] = useState(MapStyle);
  const [layers, setLayers] = useState(mapStyle.layers);
  const [Record2, setRecord2] = useState(null);
  const [cursor, setCursor] = useState<string>('');
  const [interactiveLayerIds, setInteractiveLayerIds] = useState(null);
  const [features, setFeatures] = useState({});
  const mapRef = useRef()


  /**
   *   build required objects from imported datalayer file this defines the layer selectors
   *   and initial visible layers as well as the categories that define the layer sets 
   *   (i.e more than one map layer can be part of a single data layer)
   */
  const categories = []
  const layerSelector = {};
  const visibleLayers = {};
  dataLayers.filter(function (el){
    categories.push(el.category);
    layerSelector[el.category]=el.layerSelector
    visibleLayers[el.category]=el.visible
  });

  const [visibility, setVisibility] = useState(visibleLayers);

  /**
   * effect to update the mapStyle when visibility is updated. 
   * LayerInteractiveIds are also filtered and updated based on 
   * their visibility and interactive boolean in map style file.
   */
  
  useEffect(() => {
    if(layers) {
      setMapStyle({...mapStyle, layers: layers.filter(layer => {
        return categories.every(name => visibility[name] || !layerSelector[name].test(layer.id));
      })})
    }
    const newIds = layers.reduce((filtered, layer) => {
      if(categories.every(name => visibility[name] || !layerSelector[name].test(layer.id))) {
      if(layer.interactive) 
        filtered.push(layer.id)
      }

      return filtered

    }, [])

    setInteractiveLayerIds(newIds);

  }, [visibility])
  
  /** when clicking on interactive layer, update right hand panel with feature info
      remove any feature states that may be present (remove existing highlighted features)
      if layer has "select" boolean as feature state set it to true (enables highlighted style for feature)
  */
   const onClick = useCallback(event => {
    const feature2 = event.features && event.features[0];
    if (feature2) {
      mapRef.current.removeFeatureState({source:feature2.source,sourceLayer:feature2.sourceLayer})
      setRecord2([feature2.properties]); // eslint-disable-line no-alert
      mapRef.current.setFeatureState({source:feature2.source, 
                                      sourceLayer: feature2.sourceLayer, 
                                      id: feature2.id}, 
                                      {select:true})
    }
    else{
      setRecord2(null);
    }}, [Record2]);
  
  const onMouseEnter = useCallback(() => setCursor('pointer'), []);
  const onMouseLeave = useCallback(() => setCursor(''), []);

  // Polygon updating, deleting callbacks
  const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

  const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

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
          zoom: 4}}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        cursor={cursor}
        interactiveLayerIds={interactiveLayerIds}>
        <GeolocateControl position="bottom-left" />
        <NavigationControl position="bottom-left" />
        <GeocoderControl mapboxAccessToken={MAPBOX_TOKEN} position="bottom-right" />
        <DrawControl position="bottom-right"
                     displayControlsDefault={false}
                     controls={{
                            polygon: true,
                            trash: true}}
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
        />
      </Map>
      <LeftPanel polygons={Object.values(features)} />
      <RightPanel Record2={Record2}/>
      </AppContext.Provider>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
